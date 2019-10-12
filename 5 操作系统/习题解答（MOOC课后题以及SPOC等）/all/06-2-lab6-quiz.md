#lab6 调度算法　在线练习
## 选择题

---

lab6的调度过程包括()  s2

- [x] 触发：trigger scheduling　
- [x] 入队：‘enqueue’
- [x] 选取：pick up
- [x] 出队：‘dequeue’
- [x] 切换：process switch

> 全部


lab6中涉及到的调度点包括（） s3

- [x] proc.c:do_exit　户线程执行结束，主动放弃CPU
- [x] proc.c:do_wait　用户线程等待子进程结束，主动放弃CPU
- [x] proc.c::cpu_idle　idleproc内核线程选取一个就绪进程并切换
- [x] ｔrap.c::trap　　若时间片用完，则设置need_resched为1，让当前进程放弃CPU

> 全部

lab6调度算法支撑框架包括的函数指针有（）s4

- [x] (*enqueue)(struct run_queue *rq, …);
- [x] (*dequeue)(struct run_queue *rq, …);
- [x] (*pick_next)(struct run_queue *rq);
- [x] (*proc_tick)(struct run_queue *rq, …);

> 都包括


lab6调度算法支撑框架中与时钟中断相关的函数指针有（）s4

- [ ] (*enqueue)(struct run_queue *rq, …);
- [ ] (*dequeue)(struct run_queue *rq, …);
- [ ] (*pick_next)(struct run_queue *rq);
- [x] (*proc_tick)(struct run_queue *rq, …);

> 4

lab6中的RR调度算法在( )时对当前进程的完成时间片的递减 s5

- [ ] 等待进程结束　
- [ ] 进程退出
- [ ] 进程睡眠
- [x] 进程被时钟中断打断

> 4

 
