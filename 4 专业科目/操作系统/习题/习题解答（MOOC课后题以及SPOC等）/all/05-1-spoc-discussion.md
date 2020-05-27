#lec10 进程／线程概念spoc练习

NOTICE
- 有"w5l1"标记的题是助教要提交到学堂在线上的。
- 有"w5l1"和"spoc"标记的题是要求拿清华学分的同学要在实体课上完成，并按时提交到学生对应的git repo上。
- 有"hard"标记的题有一定难度，鼓励实现。
- 有"easy"标记的题很容易实现，鼓励实现。
- 有"midd"标记的题是一般水平，鼓励实现。

## 个人思考题

### 11.1 进程的概念

- 什么是进程？什么是程序？
- 程序和进程联系和区别是什么？

### 11.2 进程控制块

- 进程控制块的功能是什么？
- 进程控制块中包括什么信息？

### 11.3 进程状态

- 进程生命周期中的相关事件有些什么？它们对应的进程状态变化是什么？
- 进程切换过程中的几个关键代码分析
- 时钟中断触发调度函数的启动
- 当前进程的现场保存代码
- 进程切换代码
　＞　下一个运行进程的现场恢复

### 11.4 三状态进程模型

- 运行、就绪和等待三种状态的含义？
- 分析的4个相关状态转换代码和状态修改代码

### 11.5 挂起进程模型

- 引入挂起状态的目的是什么？内存中的什么内容放到外存中，就算是挂起状态？

### 11.6 线程的概念

- 引入线程的目的是什么？什么是线程？
- 进程与线程的联系和区别是什么？

### 11.8 内核线程

- 用户线程与内核线程的区别是什么？

## SPOC小组思考题

(1) (spoc)设计一个简化的进程管理子系统，可以管理并调度如下简化进程.给出了[参考代码](https://github.com/chyyuu/ucore_lab/blob/master/related_info/lab4/process-concept-homework.py)，请理解代码，并完成＂YOUR CODE"部分的内容．　可２个人一组

### 进程的状态 

 - RUNNING - 进程正在使用CPU
 - READY   - 进程可使用CPU
 - DONE    - 进程结束

### 进程的行为
 - 使用CPU, 
 - 发出YIELD请求,放弃使用CPU


### 进程调度
 - 使用FIFO/FCFS：先来先服务,
   - 先查找位于proc_info队列的curr_proc元素(当前进程)之后的进程(curr_proc+1..end)是否处于READY态，
   - 再查找位于proc_info队列的curr_proc元素(当前进程)之前的进程(begin..curr_proc-1)是否处于READY态
   - 如都没有，继续执行curr_proc直到结束

### 关键模拟变量
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
   Ｙ是执行CPU的比例(0..100) ，如果是100，表示不会发出yield操作
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

#### 例１
```
$./process-simulation.py -l 5:50
Process 0
  yld
  yld
  cpu
  cpu
  yld

Important behaviors:
  System will switch when the current process is FINISHED or ISSUES AN YIELD
Time     PID: 0 
  1     RUN:yld 
  2     RUN:yld 
  3     RUN:cpu 
  4     RUN:cpu 
  5     RUN:yld 

```

   
#### 例２
```
$./process-simulation.py  -l 5:50,5:50
Produce a trace of what would happen when you run these processes:
Process 0
  yld
  yld
  cpu
  cpu
  yld

Process 1
  cpu
  yld
  cpu
  cpu
  yld

Important behaviors:
  System will switch when the current process is FINISHED or ISSUES AN YIELD
Time     PID: 0     PID: 1 
  1     RUN:yld      READY 
  2       READY    RUN:cpu 
  3       READY    RUN:yld 
  4     RUN:yld      READY 
  5       READY    RUN:cpu 
  6       READY    RUN:cpu 
  7       READY    RUN:yld 
  8     RUN:cpu      READY 
  9     RUN:cpu      READY 
 10     RUN:yld      READY 
 11     RUNNING       DONE 
```

> 代码如下所示：

```
#! /usr/bin/env python

import sys
from optparse import OptionParser
import random

# process states
STATE_RUNNING = 'RUNNING'
STATE_READY = 'READY'
STATE_DONE = 'DONE'

# members of process structure
PROC_CODE = 'code_'
PROC_PC = 'pc_'
PROC_ID = 'pid_'
PROC_STATE = 'proc_state_'

# things a process can do
DO_COMPUTE = 'cpu'
DO_YIELD = 'yld'


class scheduler:
    def __init__(self):
        # keep set of instructions for each of the processes
        self.proc_info = {}
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
        if len(tmp) != 2:
            print 'Bad description (%s): Must be number <x:y>'
            print '  where X is the number of instructions'
            print '  and Y is the percent change that an instruction is CPU not YIELD'
            exit(1)

        num_instructions, chance_cpu = int(tmp[0]), float(tmp[1])/100.0
        for i in range(num_instructions):
            if random.random() < chance_cpu:
                self.proc_info[proc_id][PROC_CODE].append(DO_COMPUTE)
            else:
                self.proc_info[proc_id][PROC_CODE].append(DO_YIELD)
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

    #choose next proc using FIFO/FCFS scheduling, If pid==-1, then pid=self.curr_proc
    def next_proc(self, pid=-1):
        #YOUR CODE
        if pid == -1: pid = self.curr_proc
        for i in range(pid + 1, self.get_num_processes()) + range(pid) + [pid]:
            if self.proc_info[i][PROC_STATE] == STATE_READY:
                self.proc_info[i][PROC_STATE] = STATE_RUNNING
                self.curr_proc = i
                return
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

        # make first one active
        self.curr_proc = 0
        self.move_to_running(STATE_READY)

        # OUTPUT: heade`[rs for each column
        print '%s' % 'Time', 
        for pid in range(len(self.proc_info)):
            print '%10s' % ('PID:%2d' % (pid)),

        print ''

        # init statistics
        cpu_busy = 0

        while self.get_num_active() > 0:
            clock_tick += 1
            
            # if current proc is RUNNING and has an instruction, execute it
            # statistics clock_tick
            instruction_to_execute = ''
            if self.proc_info[self.curr_proc][PROC_STATE] == STATE_RUNNING and \
                   len(self.proc_info[self.curr_proc][PROC_CODE]) > 0:
                #YOUR CODE
                instruction_to_execute = self.proc_info[self.curr_proc][PROC_CODE].pop(0)

            # OUTPUT: print what everyone is up to
            print '%3d ' % clock_tick,
            for pid in range(len(self.proc_info)):
                if pid == self.curr_proc and instruction_to_execute != '':
                    print '%10s' % ('RUN:'+instruction_to_execute),
                else:
                    print '%10s' % (self.proc_info[pid][PROC_STATE]),

            print ''

            # if this is an YIELD instruction, switch to ready state
            # and add an io completion in the future
            if instruction_to_execute == DO_YIELD:
                #YOUR CODE
                self.move_to_ready(STATE_RUNNING)
                self.next_proc()

            # ENDCASE: check if currently running thing is out of instructions
            self.check_if_done()
        return (clock_tick)
        
#
# PARSE ARGUMENTS
#

parser = OptionParser()
parser.add_option('-s', '--seed', default=0, help='the random seed', action='store', type='int', dest='seed')
parser.add_option('-l', '--processlist', default='',
                  help='a comma-separated list of processes to run, in the form X1:Y1,X2:Y2,... where X is the number of instructions that process should run, and Y the chances (from 0 to 100) that an instruction will use the CPU or issue an YIELD',
                  action='store', type='string', dest='process_list')
parser.add_option('-p', '--printstats', help='print statistics at end; only useful with -c flag (otherwise stats are not printed)', action='store_true', default=False, dest='print_stats')
(options, args) = parser.parse_args()

random.seed(options.seed)

s = scheduler()

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
print '  System will switch when the current process is FINISHED or ISSUES AN YIELD'

(clock_tick) = s.run()

if options.print_stats:
    print ''
    print 'Stats: Total Time %d' % clock_tick
    print ''
```

> 在`move_to_ready`函数中，如果当前pid对应的状态为expected，则将其状态变更为ready. `move_to_running`和`move_to_done`状态同理。在`next_proc`函数中，根据proc_id顺序依次寻找状态为ready的进程，如果找到则将其状态更改为running，并且将curr_proc指针指向该进程。

> 每一个时钟周期，找到curr_proc指向的进程，然后弹出指令队列的第一条指令。如果该指令为yield，那么让当前的进程进入ready状态，然后寻找下一个进程。
