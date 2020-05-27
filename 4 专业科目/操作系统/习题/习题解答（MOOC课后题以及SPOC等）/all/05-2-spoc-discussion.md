#lec10 进程／线程控制spoc练习

## SPOC个人练习
### 进程切换

(1)ucore的进程控制块数据结构是如何组织的？主要字段分别表示什么？有哪些函数对它进行了修改？有哪些函数用到它？
```
arch_proc_struct
mm_struct
need_resched
wait_state
run_link、list_link、hash_link
```

### 进程创建

(1)fork()的返回值是唯一的吗？父进程和子进程的返回值是不同的。请找到相应的赋值代码。

(2)新进程创建时的进程标识是如何设置的？请指明相关代码。

(3)fork()的例子中进程标识的赋值顺序说明进程的执行顺序。

(4)请在ucore启动时显示空闲进程（idleproc）和初始进程（initproc）的进程标识。

### 进程加载

(1)加载进程后，新进程进入就绪状态，它开始执行时的第一条指令的位置，在elf中保存在什么地方？在加载后，保存在什么地方？

>进程等待与退出

(2)试分析wait()和exit()的结果放在什么地方？exit()是在什么时候放进去的？wait()在什么地方取到出的？

(3)试分析sleep()系统调用的实现。在什么地方设置的定时器？它对应的等待队列是哪个？它的唤醒操作在什么地方？

## SPOC小组思考题

(1) (spoc)设计一个简化的进程管理子系统，可以管理并调度如下简化进程.给出了[参考代码](https://github.com/chyyuu/ucore_lab/blob/master/related_info/lab5/process-cpuio-homework.py)，请理解代码，并完成＂YOUR CODE"部分的内容．　可２个人一组

### 进程的状态 
```
 - RUNNING - 进程正在使用CPU
 - READY   - 进程可使用CPU
 - WAIT    - 进程等待I/O完成
 - DONE    - 进程结束
```

### 进程的行为
```
 - 使用CPU, 
 - 发出YIELD请求,放弃使用CPU
 - 发出I/O操作请求,放弃使用CPU
```

### 进程调度
 - 使用FIFO/FCFS：先来先服务, 只有进程done, yield, io时才会执行切换
   - 先查找位于proc_info队列的curr_proc元素(当前进程)之后的进程(curr_proc+1..end)是否处于READY态，
   - 再查找位于proc_info队列的curr_proc元素(当前进程)之前的进程(begin..curr_proc-1)是否处于READY态
   - 如都没有，继续执行curr_proc直到结束

### 关键模拟变量
 - io_length : IO操作的执行时间
 - 进程控制块
```
PROC_CODE = 'code_'
PROC_PC = 'pc_'
PROC_ID = 'pid_'
PROC_STATE = 'proc_state_'
```
 - 当前进程 curr_proc 
 - 进程列表：proc_info是就绪进程的队列（list），
 - 在命令行（如下所示）需要说明每进程的行为特征：（１）使用CPU ;(2)等待I/O
```
   -l PROCESS_LIST, --processlist= X1:Y1,X2:Y2,...
   X 是进程的执行指令数; 
   Ｙ是执行yield指令（进程放弃CPU,进入READY状态）的比例(0..100) 
   Ｚ是执行I/O请求指令（进程放弃CPU,进入WAIT状态）的比例(0..100)
```
 - 进程切换行为：系统决定何时(when)切换进程:进程结束或进程发出yield请求

### 进程执行
```
instruction_to_execute = self.proc_info[self.curr_proc][PROC_CODE].pop(0)
```

### 关键函数
 - 系统执行过程：run
 - 执行状态切换函数:　move_to_ready/running/done　
 - 调度函数：next_proc

### 执行实例
   
#### 例1
```
$./process-simulation.py  -l 5:30:30,5:40:30 -c
Produce a trace of what would happen when you run these processes:
Process 0
  io
  io
  yld
  cpu
  yld

Process 1
  yld
  io
  yld
  yld
  yld

Important behaviors:
  System will switch when the current process is FINISHED or ISSUES AN YIELD or IO
Time     PID: 0     PID: 1        CPU        IOs 
  1      RUN:io      READY          1            
  2     WAITING    RUN:yld          1          1 
  3     WAITING     RUN:io          1          1 
  4     WAITING    WAITING                     2 
  5     WAITING    WAITING                     2 
  6*     RUN:io    WAITING          1          1 
  7     WAITING    WAITING                     2 
  8*    WAITING    RUN:yld          1          1 
  9     WAITING    RUN:yld          1          1 
 10     WAITING    RUN:yld          1          1 
 11*    RUN:yld       DONE          1            
 12     RUN:cpu       DONE          1            
 13     RUN:yld       DONE          1            
```

> 代码如下

```
#! /usr/bin/env python

import sys
from optparse import OptionParser
import random

# process switch behavior
SCHED_SWITCH_ON_IO = 'SWITCH_ON_IO'

# io finished behavior
IO_RUN_LATER = 'IO_RUN_LATER'

# process states
STATE_RUNNING = 'RUNNING'
STATE_READY = 'READY'
STATE_DONE = 'DONE'
STATE_WAIT = 'WAITING'

# members of process structure
PROC_CODE = 'code_'
PROC_PC = 'pc_'
PROC_ID = 'pid_'
PROC_STATE = 'proc_state_'

# things a process can do
DO_COMPUTE = 'cpu'
DO_YIELD = 'yld'
DO_IO = 'io'

class scheduler:
    def __init__(self, process_switch_behavior, io_done_behavior, io_length):
        # keep set of instructions for each of the processes
        self.proc_info = {}
        self.process_switch_behavior = process_switch_behavior
        self.io_done_behavior = io_done_behavior
        self.io_length = io_length
        return

    def new_process(self):
        proc_id = len(self.proc_info)
        self.proc_info[proc_id] = {}
        self.proc_info[proc_id][PROC_PC] = 0
        self.proc_info[proc_id][PROC_ID] = proc_id
        self.proc_info[proc_id][PROC_CODE] = []
        self.proc_info[proc_id][PROC_STATE] = STATE_READY
        return proc_id

    def load(self, program_description):
        proc_id = self.new_process()
        tmp = program_description.split(':')
        if len(tmp) != 3:
            print 'Bad description (%s): Must be number <x:y:z>'
            print '  where X is the number of instructions'
            print '  and Y is the percent change that an instruction is YIELD'
            print '  and Z is the percent change that an instruction is IO'
            exit(1)

        num_instructions, chance_yield, chance_io = int(tmp[0]), float(tmp[1])/100.0, float(tmp[2])/100.0
        assert(chance_yield+chance_io<1)

        #print "proc %d, num_instr %d, change_cpu %f" % (proc_id,num_instructions, chance_cpu)
        for i in range(num_instructions):
            randnum=random.random();
            if randnum < (1.0-chance_yield-chance_io):
                self.proc_info[proc_id][PROC_CODE].append(DO_COMPUTE)
            elif randnum >= (1.0-chance_yield-chance_io) and randnum < (1.0-chance_io):
                self.proc_info[proc_id][PROC_CODE].append(DO_YIELD)
            else:
                self.proc_info[proc_id][PROC_CODE].append(DO_IO)
            #print "proc %d, instr idx %d, instr cxt %s" % (proc_id, i, self.proc_info[proc_id][PROC_CODE][i])
        return

    #change to READY STATE, the current proc's state should be expected
    #if pid==-1, then pid=self.curr_proc
    def move_to_ready(self, expected, pid=-1):
        #YOUR CODE
        if pid == -1: pid = self.curr_proc
        if self.proc_info[pid][PROC_STATE] == expected:
            self.proc_info[pid][PROC_STATE] = STATE_READY
        return

    #change to RUNNING STATE, the current proc's state should be expected
    def move_to_running(self, expected):
        #YOUR CODE
        if self.proc_info[self.curr_proc][PROC_STATE] == expected:
            self.proc_info[self.curr_proc][PROC_STATE] = STATE_RUNNING
        return

    #change to DONE STATE, the current proc's state should be expected
    def move_to_done(self, expected):
        #YOUR CODE
        if self.proc_info[self.curr_proc][PROC_STATE] == expected:
            self.proc_info[self.curr_proc][PROC_STATE] = STATE_DONE
        return

    def move_to_waiting(self, expected):
        if self.proc_info[self.curr_proc][PROC_STATE] == expected:
            self.proc_info[self.curr_proc][PROC_STATE] = STATE_WAIT

    #choose next proc using FIFO/FCFS scheduling, If pid==-1, then pid=self.curr_proc
    def next_proc(self, pid=-1):
        #YOUR CODE
        if pid == -1: pid = self.curr_proc
        for i in range(pid + 1, self.get_num_processes()) + range(pid) + [pid]:
            if self.proc_info[i][PROC_STATE] == STATE_READY:
                self.proc_info[i][PROC_STATE] = STATE_RUNNING
                self.curr_proc = i
                return
        if self.proc_info[self.curr_proc][PROC_STATE] == STATE_DONE:
            for i in range(self.get_num_processes()):
                if self.proc_info[i][PROC_STATE] != STATE_DONE:
                    self.curr_proc = i
                return

    def get_num_processes(self):
        return len(self.proc_info)

    def get_num_instructions(self, pid):
        return len(self.proc_info[pid][PROC_CODE])

    def get_instruction(self, pid, index):
        return self.proc_info[pid][PROC_CODE][index]

    def get_num_active(self):
        num_active = 0
        for pid in range(len(self.proc_info)):
            if self.proc_info[pid][PROC_STATE] != STATE_DONE:
                num_active += 1
        return num_active

    def get_num_runnable(self):
        num_active = 0
        for pid in range(len(self.proc_info)):
            if self.proc_info[pid][PROC_STATE] == STATE_READY or \
                   self.proc_info[pid][PROC_STATE] == STATE_RUNNING:
                num_active += 1
        return num_active

    def get_ios_in_flight(self, current_time):
        num_in_flight = 0
        for pid in range(len(self.proc_info)):
            for t in self.io_finish_times[pid]:
                if t > current_time:
                    num_in_flight += 1
        return num_in_flight


    def space(self, num_columns):
        for i in range(num_columns):
            print '%10s' % ' ',

    def check_if_done(self):
        if len(self.proc_info[self.curr_proc][PROC_CODE]) == 0:
            if self.proc_info[self.curr_proc][PROC_STATE] == STATE_RUNNING:
                self.move_to_done(STATE_RUNNING)
                self.next_proc()
        return

    def run(self):
        clock_tick = 0

        if len(self.proc_info) == 0:
            return

        # track outstanding IOs, per process
        self.io_finish_times = {}
        for pid in range(len(self.proc_info)):
            self.io_finish_times[pid] = []

        # make first one active
        self.curr_proc = 0
        self.move_to_running(STATE_READY)

        # OUTPUT: heade`[rs for each column
        print '%s' % 'Time', 
        for pid in range(len(self.proc_info)):
            print '%10s' % ('PID:%2d' % (pid)),
        print '%10s' % 'CPU',
        print '%10s' % 'IOs',
        print ''

        # init statistics
        io_busy = 0
        cpu_busy = 0

        while self.get_num_active() > 0:
            clock_tick += 1

            # check for io finish
            io_done = False
            for pid in range(len(self.proc_info)):
                if clock_tick in self.io_finish_times[pid]:
                    # if IO finished, the should do something for related process
                    #YOUR CODE
                    self.move_to_ready(STATE_WAIT, pid)
                    if pid == self.curr_proc:
                        self.move_to_running(STATE_READY)

            if self.proc_info[self.curr_proc][PROC_STATE] != STATE_RUNNING:
                self.next_proc()
            
            # if current proc is RUNNING and has an instruction, execute it
            instruction_to_execute = ''
            if self.proc_info[self.curr_proc][PROC_STATE] == STATE_RUNNING and \
                   len(self.proc_info[self.curr_proc][PROC_CODE]) > 0:
                #pop a instruction from proc_info[self.curr_proc][PROC_CODE]to instruction_to_execute
                #YOUR CODE
                instruction_to_execute = self.proc_info[self.curr_proc][PROC_CODE].pop(0)

            # OUTPUT: print what everyone is up to
            if io_done:
                print '%3d*' % clock_tick,
            else:
                print '%3d ' % clock_tick,
            for pid in range(len(self.proc_info)):
                if pid == self.curr_proc and instruction_to_execute != '':
                    print '%10s' % ('RUN:'+instruction_to_execute),
                else:
                    print '%10s' % (self.proc_info[pid][PROC_STATE]),
            if instruction_to_execute == '':
                print '%10s' % ' ',
            else:
                print '%10s' % 1,
            num_outstanding = self.get_ios_in_flight(clock_tick)
            if num_outstanding > 0:
                print '%10s' % str(num_outstanding),
                io_busy += 1
            else:
                print '%10s' % ' ',
            print ''

            # if this is an YIELD instruction, switch to ready state
            # and add an io completion in the future
            if instruction_to_execute == DO_YIELD:
                #YOUR CODE
                self.move_to_ready(STATE_RUNNING)
                self.next_proc()
            # if this is an IO instruction, switch to waiting state
            # and add an io completion in the future
            elif instruction_to_execute == DO_IO:
                #YOUR CODE
                self.move_to_waiting(STATE_RUNNING)
                self.io_finish_times[self.curr_proc].append(clock_tick + self.io_length + 1)
                self.next_proc()

            # ENDCASE: check if currently running thing is out of instructions
            self.check_if_done()
        return (cpu_busy, io_busy, clock_tick)
        
#
# PARSE ARGUMENTS
#

parser = OptionParser()
parser.add_option('-s', '--seed', default=0, help='the random seed', action='store', type='int', dest='seed')
parser.add_option('-l', '--processlist', default='',
                  help='a comma-separated list of processes to run, in the form X1:Y1:Z1,X2:Y2:Z2,... where X is the number of instructions that process should run, and Y/Z the chances (from 0 to 100) issue an YIELD/IO',
                  action='store', type='string', dest='process_list')
parser.add_option('-L', '--iolength', default=4, help='how long an IO takes', action='store', type='int', dest='io_length')
parser.add_option('-p', '--printstats', help='print statistics at end; only useful with -c flag (otherwise stats are not printed)', action='store_true', default=False, dest='print_stats')
(options, args) = parser.parse_args()

random.seed(options.seed)

process_switch_behavior = SCHED_SWITCH_ON_IO
io_done_behavior = IO_RUN_LATER
io_length=options.io_length


s = scheduler(process_switch_behavior, io_done_behavior, io_length)

# example process description (10:100,10:100)
for p in options.process_list.split(','):
    s.load(p)

print 'Produce a trace of what would happen when you run these processes:'
for pid in range(s.get_num_processes()):
    print 'Process %d' % pid
    for inst in range(s.get_num_instructions(pid)):
        print '  %s' % s.get_instruction(pid, inst)
    print ''
print 'Important behaviors:'
print '  System will switch when',
if process_switch_behavior == SCHED_SWITCH_ON_IO:
    print 'the current process is FINISHED or ISSUES AN YIELD or IO'
else:
    print 'error in sched switch on iobehavior'
    exit (-1)
print '  After IOs, the process issuing the IO will',
if io_done_behavior == IO_RUN_LATER:
    print 'run LATER (when it is its turn)'
else:
    print 'error in IO done behavior'
    exit (-1)
print ''

(cpu_busy, io_busy, clock_tick) = s.run()

print ''
print 'Stats: Total Time %d' % clock_tick
print 'Stats: CPU Busy %d (%.2f%%)' % (cpu_busy, 100.0 * float(cpu_busy)/clock_tick)
print 'Stats: IO Busy  %d (%.2f%%)' % (io_busy, 100.0 * float(io_busy)/clock_tick)
print ''
```

> 在之前实验的基础上增加`STATE_WAIT`状态。用`io_length`来设置IO操作的时间。对调度算法进行了一下改进，每次如果当前进程不处于running状态，则按顺序在进程队列当中查找处于running状态的程序并进行切换。
