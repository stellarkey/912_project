From 网上资源"操作系统之PV金典" 感谢作者 王昭礼

1. 生产者一消费者问题 (producer-consumer problem)，也称有限缓冲问题 (Bounded-buffer problem)，是指若干进程通过有限的共享缓冲区交换数据时的缓冲区资源使用问题。
假设“生产者”进程不断向共享缓冲区写人数据(即生产数据)，而“消费者”进程不断从共享缓冲区读出数据(即消费数据)；共享缓冲区共有n个；任何时刻 只能有一个进程可对共享缓冲区进行操作。所有生产者和消费者之间要协调，以完成对共享缓冲区的操作。  
	```
	Semaphore 方法
	可把共享缓冲区中的n个缓冲块视为共享资源，生产者写人数据的缓冲块成为消费者可用资源，而消费者读出数据后的缓冲块成为生产者的可用资源。为此，可设 置三个信号量：itemCounter、vacancyCounter和mutex。其中：
	 * itemCounter表示有数据的缓冲块数目，初值是0;
	 * vacancyCounter表示空的缓冲块数初值是n;
	 * mutex用于访问缓冲区时的互斥，初值是1。
	producer 伪码

	procedure producer() {
	    while (true) {
		item = produceItem();
		vacancyCounter->P();
		    mutex->P();
			Add item to buffer;
		    mutex->V();
		itemCounter->V();
	    }
	}

	consumer 伪码

	procedure consumer() {
	    while (true) {
		itemCounter->P();
		    mutex->P();
			Remove from buffer;
		    mutex->V();
		vacancyCounter->V();
	    }
	}

	Monitor 方法
	设置一个管程，内有两个condition variable：notFull和notEmpty。其中，notFull表示缓存满，notEmpty表示缓存空
	producer 伪码

	procedure producer() {
	    lock->Acquire();
	    while (count == n)
		notFull.Wait(&lock);
	    Add c to the buffer;
	    count++;
	    notEmpty.Signal();
	    lock->Release();
	}

	consumer 伪码

	procedure consumer() {
	    lock->Acquire();
	    while (count == 0)
		notEmpty.Wait(&lock);
	    Remove c from buffer;
	    count--;
	    notFull.Signal();
	    lock->Release();
	}
	```
	
2. 有一个许多进程共享的数据区，有一些只读这个数据区的进程(reader)和一些只往数据区中写数据的进程(writer)；此外还必须满足以下条件
 * 任意多的读进程可以同时读这个文件
 * 一次只有一个写进程可以往文件中写
 * 如果一个写进程正在往文件中写时，则禁止任何读进程和其他写进程。
读者写者问题又分为“读者优先”和“写者优先”
 * 读者优先：要求指一个读者试图进行读操作时，如果这时正有其他读者在进行操作，他可以直接开始读操作，直到某个时刻没有任何读者。读者之间不互斥，写者之间互斥，只能一个写，可以多个读；读者写者之间互斥，有写者则不能有读者。所以只需要当前第一个读者和写者竞争，竞争成功则后面的读者因为已经有读者在读，可以直接读。
 * 写者优先：一个读者试图进行读操作时，如果有其他写者在等待进行写操作或者正在进行写操作，他要等待写者完成写操作后才开始读操作。  

    - 信号量实现：
      - 读者优先：两个信号量sem_wsem和sem_x。信号量sem_wsem用于实施互斥，只要一个写进程正在访问共享数据区，其他的写进程和读进程都不能访问它。读进程也使用sem_wsem实施互斥，但是只需要第一个读进程在sem_wsem上等待;全局变量readcount用于记录读进程的数目,信号量sem_x用于确保readcount被正确更新。
      - 写者优先：除了上述两个sem_wsem和sem_x两个信号量外，增加三个新的信号量:sem_rsem, sem_y, sem_z。sem_rsem用于当至少有一个写进程准备访问数据区时，禁止其他所有的读进程；sem_y用于控制writecount被正确更新；sem_z用于读者竞争sem_rsem失败后，后续读者在此信号上排队。
    - 管程实现：
	两种问题实现方法基本类似，以读者优先为例：定义条件变量r表示可以对缓冲区读，条件变量w表示可以对缓冲区写;布尔类型变量IsWriting表示当前有写者进程在缓冲区写数据；整型变量read_count表示读数据的个数；

3. 5个哲学家围绕一张圆桌而坐，桌子上放着5支筷子，每两个哲学家之间放一支；哲学家的动作包括思考和进餐，进餐时需要同时拿起他左边和右边的筷子，思考时则同时将两支筷子放回原处。如何保证哲学家们的动作有序进行？   
	```
	信号量实现：
	每个哲学家都有一个信号量与之对应，同时有一个实现临界区互斥的信号量，还有一个状态数组来标记每个哲学家的当前状态：思考、饥饿或者吃面。每次一个哲学家想要吃面时，首先进入互斥区，不让其他哲学家进入，然后标记为饥饿状态；接着检查两边的筷子是否可用，如果可用的话就标记为吃面状态，然后把自己的信号量加一，开始吃面；吃完面后离开互斥区，然后把自己的信号量减一。当然如果拿不到筷子，那么直接离开互斥区，然后把自己的信号量减一，进入阻塞状态。当吃完面后，哲学家会放回自己的筷子，这时仍需要进入互斥区，改为思考状态，然后检查两边的哲学家是否还在饥饿，如果有的哲学家还在饥饿中而且筷子可用，那么就让该哲学家修改自己的信号量变为可执行，等待当前哲学家离开互斥区后再执行。
	管程实现：
	管程与信号量类似，它实现了信号量的封装。monitor的成员变量cv会对每个哲学家建立一个信号量，mutex信号量是一个二值信号量，每次只允许一个进程进入管程,确保了互斥访问性质。next保存的是因为唤醒其他进程而进入睡眠状态的进程，next_count保存next链表的长度。信号量sem用于让发出wait(程序中为down)操作的等待某个条件的为真的进程睡眠，而让发出signal(程序中为up)的进程来唤醒睡眠进程。count表示等待在这个条件上的睡眠进程个数，owner表示此条件变量宿主是哪个管程。
	```

4. 理发店理有一位理发师、一把理发椅和n把供等候理发的顾客坐的椅子。如果没有顾客，理发师便在理发椅上睡觉一个顾客到来时，它必须叫醒理发师，如果理发师正在理发时又有顾客来到，则如果有空椅子可坐，就坐下来等待，否则就离开。
要求：
 (1) 每个顾客进入理发室后，即时显示“Entered” 及其线程标识，还同时显示理发室共有几名顾客及其所坐的位置；  
 (2) 至少有10个顾客，每人理发至少3秒钟；  
 (3) 多个顾客须共享操作函数代码   
	```
	总体设计：需要两类进程Barber ()和Customer()分别描述理发师和顾客的行为。当理发师睡觉时顾客进来需要唤醒理发师为其理发，当有顾客时理发师为其理发，没有的时候理发师睡觉。因此理发师和顾客之间是同步的关系，由于每次理发师只能为一个人理发，且可供等侯的椅子有限只有n个，即理发师和椅子是临界资源，所以顾客之间是互斥的关系。
	信号量及控制变量：引入三个信号量和一个控制量，如下：  控制变量waiting用来记录等候理发的顾客数，初值均为0；  信号量customers用来记录等候理发的顾客数，并用作阻塞理发师进程，初值为0；  信号量barbers用来记录正在等候顾客的理发师数，并用作阻塞顾客进程，初值为0；  信号量mutex用于互斥，初值为1。
	椅子定义为5个，用waitingID[0-4]来表示，用两个变量first和last来记录下一个理发的顾客和下一个空闲椅子(目前为止最后一个理发的顾客)。
	三个随机函数flat，normal，bursty是用来控制顾客到来的随机情况的，这更符合实际生活中的实际情况。根据个人理解，flat和normal情况下顾客到来的时间比较平均，而bursty随机函数下顾客会比较集中地到来，然后一段时间空闲，又会来比较密集的一批。
	时间设定：本次实验中，我设定的程序运行总时间为10s，理发师理一次发的时间为4s,故在程序运行期间内，顾客到来的时间因为由随机数控制，所以不同次运行程序所得到的顾客数及到达理发店的时间都不定，但是平均下来程序一次运行中共可到达约20位顾客，即平均1人/0.5s。并且在每位顾客到达以及理发师开始理发时都会输出系统时间来进行对比观察 .
	```
5. 三个吸烟者在一间房间内，还有一个香烟供应者。为了制造并抽掉香烟，每个吸烟者需要三样东西：烟草、纸和火柴。供应者有丰富的货物提供。三个吸烟者中，第一个有自己的烟草，第二个有自己的纸，第三个有自己的火柴。供应者将两样东西放在桌子上，允许一个吸烟者进行对健康不利的吸烟。当吸烟者完成吸烟后唤醒供应者，供应者再放两样东西（随机地）在桌面上，然后唤醒另一个吸烟者。试为吸烟者和供应者编写程序解决问题。 
	 ```
	用信号量和P、V操作：
	一个供应者和三个吸烟者各有一个信号量，供应者的信号量初始化为1，吸烟者为0。他们各起一个进程，对于供应者进程，若其信号量为1则随机提供两种材料，并把供应者信号量置0，需要该材料的吸烟者信号量置1，唤醒该吸烟者进程；否则，供应者进程阻塞。对于吸烟者进程，若其信号量为1则表明该吸烟者得到了想要的材料，可以制烟并吸烟，然后要将该吸烟者信号量置0，供应者信号量置1，唤醒供应者进程。
	用管程：
	一个供应者和三个吸烟者各有一个条件量，然后用一标志位flag来标记桌上是否有物品，初始化为0。对于供应者进程，如果桌上有物品，则等待；否则，供应两样物品，置flag为1，并唤醒需要该材料的吸烟者进程；对于吸烟者进程，如果桌上无物品，则等待；否则，吸烟者吸烟，置flag为0，再唤醒供应者进程。
	```

6. 设有一个可以装A、B两种物品的仓库，其容量无限大，但要求仓库中A、B两种物品的数量满足下述不等式： -M≤A物品数量-B物品数量≤N 其中M和N为正整数。试用信号量和PV操作描述A、B两种物品的入库过程。  
	```
	Semaphore：一共需要2个Semaphore，A、B各一个，表示A、B在差值满足要求的情况下各还可以放入多少个。同时用depot保证往仓库里面放置物品是互斥的。
	Monitor：首先用1个变量表示A与B的差值，然后判断A-B是否满足-M&lt;=A-B&lt;=N。在达到右临界值时就开始等待条件变量，在B往仓库里面加的时候就发送signal。
	```

7. 设有一个可以装A、B两种物品的仓库,其容量有限(分别为N),但要求仓库中A、B两种物品的数量满足下述不等式: -M≤A物品数量-B物品数量≤N 其中M和N为正整数。另外,还有一个进程消费A,B,一次取一个A,B组装成C。 试用信号量和PV操作描述A、B两种物品的入库过程。
	```
	semaphore mutex=1,a,empty1=m,b,empty2=N,full1,full2=0;
	cobegin
	    process(A);
	    process(B);
	    process(C)
	coend
	// A物品入库
	process A
	begin
	    while(TRUE)
	    begin
		p(empty1);
		P(a);
		p(mutex);
		A物品入库;
		v(mutex);
		V(b);
		v(full1);
	    end
	end
	// B物品入库：
	process B
	begin
	    while(TRUE)
	    begin
		p(empty2);
		P(b);
		p(mutex);
		B物品入库;
		v(mutex);
		V(a);
		p(full2);
	    end
	end
	// process C
	begin
	    while(TRUE)
	    begin
		p(full1);
		p(full2);
		p(a);
		P(b);
		组装;
		V(a);
		v(b);
		v(empty1);
		v(empty2);
	    end
	end
	```

8. 设P,Q,R共享一个缓冲区,P,Q构成一对生产者-消费者,R既为生产者又为消费者。使用P,V 实现其同步。
	```
	Semaphore 方法

	设置三个信号量：full(itemCounter)、empty(vacancyCounter)和mutex。
	full表示有数据的缓冲块数目，初值是0；empty表示空的缓冲块数初值是n；mutex用于访问缓冲区时的互斥，初值是1。
	三种进程，consumer,producer,both，both表示既是producer又是consumer。

	producer 伪码


	while true 
	p(empty);
	P(mutex);
	produce one;
	v(mutex);
	v(full);
	end while
	consumer 伪码


	while true
	p(full);
	P(mutex);
	consume one;
	v(mutex);
	v(empty);
	end while
	both 伪码


	 if empty>=1 then
	   begin
	   p(empty);
		p(mutex);
		product one;
		v(mutex);
		v(full);
	  end
	 if full>=1 then
	   begin
		p(full);
		p(mutex);
		consume one;
		v(mutex);
		v(empty);
	  end
	Monitor 方法

	设置一个monitor，内有两个条件变量：notFull和notEmpty。其中，notFull表示缓存满，notEmpty表示缓存空

	producer 伪码


	lock.Acquire();
	while (count == n)
	notFull.Wait(&lock);
	produce one;
	count++;
	notEmpty.Signal();
	end while
	lock.Release();
	consumer 伪码


	lock.Acquire();
	while (count == 0);
	notEmpty.Wait(&lock);
	consume one;
	count--;
	notFull.Signal();
	end while
	lock.Release();
	both 伪码


	lock.Acquire();
	notEmpty.Wait(&lock);
	consume one;
	count--;
	notFull.Signal();

	notFull.Wait(&lock);
	produce one;
	count++;
	notEmpty.Signal();
	lock.Release();
	```

9. 此问题是对读者-写者问题的一个扩展，既如果读者写者均是平等的即二者都不优先情况下。
此问题的一个更高的版本是说，每个资源可以同时读取的人的个数也是有限的（限制数RN）。
	```
	为了达到公平的目的，即在读者进行读取的时候，如果有写者在排队，后面的读者不能够加入到读取的队列中来，应该等待写者执行完写操作之后再进行读取。 针对上面一种情况引入一个排队信号量q,每次有操作必须等待这个信号量释放再进行操作（如果有写操作在排队，q没有释放，下一个读操作没有办法进入并进行读操作）

	算法流程

	 q,s, mutex <=1, ReadCount <= 0

	Reader:

	while True:

	wait(q)

	    wait(mutex)

	    if ReadCount ==0 wait(s)

	    ReadCount++
	    
	    signal(mutex)
	    
	    signal(q)
	    
	    READING..........
	    
	    signal(mutex)
	    
	    ReadCount--
	    
	    if ReadCount==0 signal(s)
	    
	    signal(mutex)

	end while
	Writer:
	While True:

	     wait(q)

	     wait(s)

	     WRITING.........

	     singal(s)

	     singal(w)
	问题二使用一个计数器计算当前还有几个剩下的读者名额，当写者掌控时，直接进行0/RN级别的替换。
	```

10. 有一个许多进程共享的数据区，有一些只读这个数据区的进程(reader)和一些只往数据区中写数据的进程(writer)；此外还需满足如下条件： 
(1)任意多的读进程可以同时读这个文件。  
(2)一次只有一个写进程可以往文件中写。  
(3)如果一个写进程正在往文件中写时，则禁止任何读进程和其他写进程。  
实现基于先来先服务策略的读者－写者的问题，具体要求描述如下：
(1)存在m个读者和n个写者，共享同一个缓冲区。
(2)当没有读者在读，写者在写时，读者写者均可进入读或写。
(3)当有读者在读时：
   * 写者来了，则写者等待。
   * 读者来了，则分两种情况处理：无写者等待，则读者可以直接进入读操作，如果有写者等待，则读者必须依次等待。  
(4)当有写者在写时，写者或读者来了，均需等待。  
(5)当写者写完后，如果等待队列中第一个是写者，则唤醒该写者；如果等待队列中第一个是读者，则唤醒该队列中从读者开始连续的所有读者。  
(6)当最后一个读者读后，如果有写者在等待，则唤醒第一个等待的写者。
	```
	前面的实现方法中可能出现多个写和读同时等待同一个锁打开，一旦锁打开，会随机挑选一个操作执行，但我们知道在写操作之后加入的读操作是不能在写操作之前执行的，所以上述的方法会 有错误产生。 可以考虑建立一个读写操作队列，给队列设置两个队列锁（read锁锁定read操作，write锁锁定write操作），每次挑选队列中最早加入的操作执行，由于数组删除很复杂，所以采用循环数组。以信号量实现为例，管程的实现方法也是对前一位同学的代码做出相应类似的修改即可。贴出主要代码(读写队列操作部分，monitor不再赘述，跟很多人是一样的)：
	变量定义

	#define OP_NUM 200; //操作队列上限 
	int op_num = 0; //队列当前等待数目
	int op_list[OP_NUM]; //等待队列，奇数为读，偶数为写
	int start=0;//队首位置
	int end=-1;//队尾位置
	semaphore_t op_sem;//队首和队尾位置,等待数目锁
	semaphore_t list_read_sem;//队列读互斥锁
	semaphore_t list_write_sem;//队列写互斥锁
	读操作

	int read_op(int id){ 
	    down(&list_write_sem);//只锁写操作
	    cprintf(""No.%d Reader is reading\n"",i); do_sleep(50);
	    cprintf(""No.%d Reader finished reading\n"",i);
	    up(&list_write_sem);
	    cprintf(""No.%d Reader Sem Proc Quit\n"",i);
	    return 0;
	}
	写操作

	int write_op(int id){ 
	    down(&list_write_sem);
	    down(&list_read_sem);//同时锁定读写操作
	    cprintf(""No.%d Writer is writing\n"",i); do_sleep(50);
	    cprintf(""No.%d Writer finished writing\n"",i);
	    up(&list_write_sem);
	    up(&list_read_sem);//同时解锁
	    cprintf(""No.%d Writer Sem Proc Quit\n"",i);
	    return 0;
	}
	加入操作

	int add_op(int id){ 
	    down(&op_sem);//锁定队列信息   
	    if(op_num>OP_NUM)
		return -1;//队列已满
	    end=(end+1)%OP_NUM;
	    op_list[end]=id;
	    op_num_sem++;
	    up(&op_sem);
	    return 0;
	}
	队列执行操作

	int run_op(){ 
	    if(op_num==0)
		return -1;//队列为空
	    if(op_list[start]%2==1){//读操作
		read_op(op_list[start]);
	    }
	    else{
		write_op(op_list[start]);
	    }
	    down(&op_sem);//锁住队列信息
	    start=(start+1)%OP_NUM;
	    op_num--;
	    up(&op_sem);
	    return 0;
	}
	```

11. 在一间酒吧里有三个音乐爱好者队列，第一队的音乐爱好者只有随身听，第二队的只有音乐磁带，第三队只有电池。而要听音乐就必须随身听，音乐磁带和电池这三种物品俱全。酒吧老板依次出售这三种物品中的任意两种。当一名音乐爱好者得到这三种物品并听完一首乐曲后，酒吧老板才能再一次出售这三种物品中的任意两种。于是第二名音乐爱好者得到这三种物品，并开始听乐曲。全部买卖就这样进行下去。试用P，V操作正确解决这一买卖。
	```
	#include <stdio.h>
	#include <proc.h>
	#include <sem.h>
	#include <monitor.h>
	#include <assert.h>


	#define ROUND 10


	const char GOODS[3][20] = {
		""Walkman"",
		""Tape"",
		""Battery""
	};
	const char WANT[3][20] = {
		""Tape&Battery"",
		""Walkman&Battery"",
		""Walkman&Tape""
	};


	int sema_flag;
	int condvar_flag;
	semaphore_t listener[3];
	semaphore_t seller;

	struct proc_struct* listener_sema_proc[3];

	struct proc_struct* seller_sema_proc;



	void listener_sema(void* arg){
		int i = (int) arg;
		while(sema_flag){
		        down(&listener[i]);
		        if (sema_flag){
		                        cprintf(""No %d listener has %s, and bought %s.  sema \n"",i,GOODS[i],WANT[i]);
		                        up(&seller);
		        }
		}
		cprintf(""No %d listener quit! sema\n"",i);
		
	}

	void seller_sema(void* arg){

		int i;
		int pos;
		for(i=0;i<ROUND;i ++){
		        pos = rand() % 3;
		        cprintf(""Iter %d : Seller is selling: %s. sema \n"",i,WANT[pos]); 
		        up(&listener[pos]);
		        down(&seller);
		}
		sema_flag = 0;
		for(i = 0;i < 3;i ++)
		        up(&listener[i]);
		cprintf(""Seller quit!  sema\n"");

	}

	monitor_t lmt, *mtp2= &lmt;

	struct proc_struct* listener_condvar_proc[3];

	struct proc_struct* seller_condvar_proc;




	void seller_condvar(void* arg){
		int i;
		int pos;
		for(i = 0;i < ROUND;i ++){
		        down(&mtp2->mutex);
		        pos = rand() % 3;
		        cprintf(""Iter %d : Seller is selling: %s. condvar\n"",i,WANT[pos]);
		        cond_signal(&mtp2->cv[pos + 1]);
		        cond_wait(&mtp2->cv[0]);
		        if (mtp2->next_count > 0)
		                up(&mtp2->next);
		        else
		                up(&mtp2->mutex);
		        
		        
		}
		condvar_flag = 0;
		down(&mtp2->mutex);
		for(i = 0;i < 3;i ++)
		        cond_signal(&mtp2->cv[i + 1]);
		cprintf(""Seller_condvar quit! \n"");
		if (mtp2->next_count > 0)
		                up(&mtp2->next);
		        else
		                up(&mtp2->mutex);
		
	}

	void listener_condvar(void* arg){
		int num = (int)arg;
		        down(&mtp2->mutex);
		        cprintf(""No %d listener is waiting\n"", num);
		        cond_wait(&mtp2->cv[num+1]);
		        if (mtp2->next_count > 0)
		        up(&mtp2->next);
		else
		    up(&mtp2->mutex);
		while(condvar_flag){
		        down(&mtp2->mutex);
		        if(condvar_flag){
		                                        
		                cprintf(""No %d listener has %s, and bought %s and is listening music now.condvar \n"",num,GOODS[num],WANT[num]);
		                cond_signal(&mtp2->cv[0]);
		                cond_wait(&mtp2->cv[num + 1]);
		        }
		        if (mtp2->next_count > 0)
		                up(&mtp2->next);
		        else
		                up(&mtp2->mutex);
		}
		cprintf(""No %d listener quit! condvar \n"",num);

	}
	void check_sync(void) {/* 吸烟者问题拓展一（北大1999) */
	   int i, pid;   
	   //check semaphore
	   sem_init(&seller, 0);   
	   pid = kernel_thread(seller_sema, NULL, 0);
	   if (pid <= 0) {
	     panic(""create seller_sema failed.\n"");
	   }
	   seller_sema_proc = find_proc(pid);
	   set_proc_name(seller_sema_proc, ""seller_sema_proc"");
	   sema_flag = 1;
	   
	   for(i = 0; i < 3; ++i){
	     sem_init(&listener[i], 0);
	     pid = kernel_thread(listener_sema, (void *)i, 0);
	     if (pid <= 0) {
	       panic(""create No.%d listener_sema failed.\n"", i);
	     }
	     listener_sema_proc[i] = find_proc(pid);
	     set_proc_name(listener_sema_proc[i], ""listener_sema_proc"");
	   }   
	   
	   //check condition variable
	   monitor_init(&lmt, 4);
	   
	   pid = kernel_thread(seller_condvar, NULL, 0);
	   if (pid <= 0) {
	     panic(""create seller_condvar failed.\n"");
	   }   seller_condvar_proc = find_proc(pid);
	   set_proc_name(seller_condvar_proc, ""seller_condvar_proc"");
	   condvar_flag = 1;
	   
	   for(i = 0; i < 3; ++i){
	      pid = kernel_thread(listener_condvar, (void *)i, 0);
	      if (pid <= 0) {
		panic(""create No.%d listener_condvar failed.\n"");
	      }
	      listener_condvar_proc[i] = find_proc(pid);
	      set_proc_name(listener_condvar_proc[i], ""listener_condvar_proc"");
	    }
	}
	```

12. 假设一个录像厅有0,1，2三种不同的录像片可由观众选择放映，录像厅的放映规则为:
任一时刻最多只能放映一种录像片，正在放映的录像片是自动循环放映的，最后一个观众主动离开时结束当前录像片的放映；
选择当前正在放映的录像片的观众可立即进入，允许同时有多位选择同一种录像片的观众同时观看，同时观看的观众数量不受限制；
等待观看其他录像片的观众按到达顺序排队，当一种新的录像片开始放映时，所有等待观看该录像片的观众可依次序进入录像厅同时观看。用一个进程代表一个观众。
要求:用信号量方法PV实现，并给出信号量定义和初始值。（最好也能写出录像厅的进程)
	```
	#include <stdio.h>
	#include <proc.h>
	#include <sem.h>
	#include <monitor.h>
	#include <assert.h>
	int cinema=-1;
	int people=0;
	semaphore_t mov[num]; /* 每个电影一个信号量 */
	int wait[3];
	void semaphore_test(i) /* i：影片编号 */
	{ 
	    if(cinema==-1 || (cinema==i && people>0))
	    {
		cinema=i;
		up(&mov[i]);
	    }
	}
	void semaphore_movie_play(int i)
	{
		down(&mutex);
		semaphore_test(i);
		int ifwait=0; 
		if (i!=cinema) ifwait=1;
		wait[i]+=ifwait;
		//cprintf(""testing %d %d %d\n"",cinema,i,mov[i].value);
		up(&mutex);
		down(&mov[i]);
		down(&mutex);
		wait[i]-=ifwait;        
		people++;
		cinema=i;
	cprintf(""No.%d movie_sema is playing,remain people num:%d \n"",i,people); /*电影放映*/
		//cprintf(""testING %d %d %d %d\n"",cinema,i,mov[i].value,wait[i]);
		if (wait[i]!=0) up(&mov[i]);
		up(&mutex);
		//if (bf==people) down(&mov[i]);
	}

	void semaphore_cinema_end(int i) /* i：影片编号从0到N-1 */
	{ 
		down(&mutex); /* 进入临界区 */
		people--;
		cprintf(""No.%d movie_sema quit,remain people num: %d \n"",i,people);
		if(people==0)  cinema=-1;
		semaphore_test(left);
		semaphore_test(right); /* 看一下其他影片可否播放 */
		up(&mutex); /* 离开临界区 */
	}

	int semaphore_movie(void * arg) /* i：电影编号，从0到N-1 */
	{
	    int i, iter=0;
	    i=(int)arg;
	    cprintf(""I am No.%d movie_sema\n"",i);
		
		cprintf(""Iter %d, No.%d movie_sema is ready\n"",iter,i);
		do_sleep(SLEEP_TIME);
		semaphore_movie_play(i);
		/* 开始电影放映 */
		
		do_sleep(SLEEP_TIME);
		semaphore_cinema_end(i);
		/* 结束放映 */

	    cprintf(""No.%d movie_sema quit\n"",i);
	    return 0;    
	}
	```

13. 银行有n个柜员,每个顾客进入银行后先取一个号,并且等着叫号,当一个柜员空闲后,就叫下一个号.
	```
	将顾客号码排成一个队列,顾客进入银行领取号码后,将号码由队尾插入;柜员空闲
	时,从队首取得顾客号码,并且为这个顾客服务,由于队列为若干进程共享, 所以需要互
	斥.柜员空闲时,若有顾客,就叫下一个顾客为之服务.因此,需要设置一个信号量来记录等
	待服务的顾客数.
	begin
	var mutex=1,customer_count=0:semaphore;
	cobegin
	process customer
	begin
	repeat
	取号码；
	p(mutex);
	进入队列；
	v(mutex);
	v(customer_count);
	end
	process serversi(i=1,...,n)
	begin
	repeat
	p(customer_count);
	p(mutex);
	从队列中取下一个号码；
	v(mutex);
	为该号码持有者服务；
	end
	```

14. 假设缓冲区buf1和缓冲区buf2无限大，进程p1向buf1写数据，进程p2向buf2写数据， 要求buf1数据个数和buf2数据个数的差保持在(m,n)之间(m<n,m,n都是正数)。
	```
	题中没有给出两个进程执行顺序之间的制约关系，只给出了一个数量上的制约
	关系，即m≤|buf1数据个数－buf2数据个数≤n．不需要考虑缓冲区的大小，只需要考
	虑两个进程的同步和互斥．p2向buf2写数据比p1向buf1写数据的次数最少不超过m次，
	最多不能超过n次，反之也成立．所以是一个生产者和消费者问题。将等式展开得：
	(1)m≤(buf1数据个数－buf2数据个数)≤n; (2)m≤(buf2数据个数－buf1数据个数)≤n;由
	于m,n都是正数，等式只有一个成立，不妨设(1)成立．在进程p1和p2都没有运行时，
	两个缓冲区数据个数之差为0,因此，p1必须先运行，向buf1至少写m+1个数据后再唤
	醒p2运行．信号量s1表示p1一次写入的最大量,初值为n，s2表示p2一次写入的最大量,初
	值为-m.
	begin
	var mutex1=1,mutex2=1,s1=n,s2=-m:semaphore;
	cobegin
	process p1
	begin
	repeat
	get data;
	p(s1);
	p(mutex1);
	写数据到buf1;
	v(mutex1);
	v(s2);
	end
	process p2
	begin
	repeat;
	get data;
	p(s2);
	p(mutex2);
	写数据到buf2;
	v(mutex2);
	v(s1);
	end
	```

22. 在南开大学至天津大学间有一条弯曲的路，每次只允许一辆自行车通过，但中间有小的安全岛M（同时允许两辆车），可供两辆车在已进入两端小车错车，设计算法并使用P，V实现。
	```
	由于安全岛M仅仅允许两辆车停留,本应该作为临界资源而要设置信号量, 但根据题意,任意时刻进入安全岛的车不会超过两辆(两个方向最多各有一辆), 因此，不需要为M设置信号量,在路口s和路口t都需要设置信号量,以控制来自两个方向的车对路口资源的争夺.这两个信号量的初值都是1.此外，由于从s到t的一段路只允许一辆车通过,所以还需要设置另外的信号量用于控制,由于M的存在,可以为两端的小路分别设置一个互斥信号量.

	  var T2N, N2T,L,M,K:semaphore;
	  T2N:=1;
	  N2T:=1;
	  L:=1;
	  K:=1;
	  M:=2;
	cobegin
	  Procedure Bike T2N
	  begin
	    p(T2N);
	    p(L);
	      go T to L;
	    p(M);
	      go into M;
	    V(L);
	    P(k);
	      go K to s;
	    V(M);
	    V(k);
	    V(T2N);
	  end
	  Procedure Bike N2T
	  begin
	    P(N2T);
	    p(k);
	      go v to k;
	    p(M);
	      go into M;
	    V(k);
	    P(L);
	      go L to T;
	    V(M);
	    V(L);
	    V(N2T);
	  end
	coend
	```

23. 在一个盒子里，混装了数量相等的黑白围棋子·现在用自动分拣系统把黑子、白子分开，设分拣系统有二个进程P1 和P2 ，其中P1 拣白子；P2 拣黑子。规定每个进程每次拣一子；当一个进程在拣时，不允许另一个进程去拣；当一个进程拣了一子时，必须让另一个进程去拣．试写出两进程P1 和P2 能并发正确执行的程序。
	```
	大家熟悉了生产-消费问题(PC)，这个问题很简单。题目较为新颖，但是本质非常简单即：生产-消费问题的简化或者说是两个进程的简单同步问题。答案如下：

	设信号量s1 和s2 分别表示可拣白子和黑子;
	不失一般性，若令先拣白子。
	var S1 , S2 : semaphore;
	S1 : = l; S2 ：=0;
	cobegin
	  process P1            process P2
	  begin                 begin
	    repeat                repeat
	      P(S1);                p(S2);
	      pick The white;       pick the black;
	      V(S2);                v(s1);
	    until false;          until false;
	  end                   end
	coend
	```
24. 设公共汽车上，司机和售票员的活动分别如下：司机的活动：启动车辆：正常行车；到站停车。售票员的活动：关车门；售票；开车门。在汽车不断地到站、停车、行驶过程中，这两个活动有什么同步关系？用信号量和P 、V 操作实现它们的同步。
	```
	在汽车行驶过程中，司机活动与售票员活动之间的同步关系为：售票员关车门后，向司机发开车信号，司机接到开车信号后启动车辆，在汽车正常行驶过程中售票员售票，到站时司机停车，售票员在车停后开门让乘客上下车。因此，司机启动车辆的动作必须与售票员关车门的动作取得同步；售票员开车门的动作也必须与司机停车取得同步。应设置两个信号量：S1 、S2 ; 
	·  S1表示是否允许司机启动汽车（其初值为0 )
	·  S2表示是否允许售票员开门（其初值为0 ）
	用P 、v 原语描述如下：

	var S1,S2 : semaphore ;
	    S1=0；S2=0；
	cobegin
	Procedure driver    Procedure Conductor
	  begin               begin
	  while TRUE            while TRUE
	  begin                 begin
	    P(S1);                关车门；
	    Start;                v(s1);
	    Driving;              售票；
	    Stop;                 p(s2);
	    V(S2);                开车门；
	  end                     上下乘客；
	end                       end
		                end
	coend
	```

25. 某寺庙，有小和尚、老和尚若干．庙内有一水缸，由小和尚提水入缸，供老和尚饮用。水缸可容纳10桶水，每次入水、取水仅为1桶，不可同时进行。水取自同一井中，水井径窄，每次只能容纳一个水桶取水。设水桶个数为3个，试用信号灯和PV操作给出老和尚和小和尚的活动。
	```
	从井中取水并放入水缸是一个连续的动作可以视为一个进程，从缸中取水为另一个进程。
	设水井和水缸为临界资源，引入mutex1,mutex2；三个水桶无论从井中取水还是放入水缸中都一次一个，应该给他们一个信号量count，抢不到水桶的进程只好为等待，水缸满了时，不可以再放水了。设empty控制入水量，水缸空了时，不可取水设full。

	var mutex1,mutex2,empty,full,count:semaphore;
	mutex1:=mutex2:=1;
	empty:=10;
	full:=0;
	count:=3;

	cobegin
	  Procedure Fetch_Water     Procedure Drink_Water
	    begin                     begin
	    while true                  while true
	      p(empty);                   p(full);
	      P(count);                   p(count);
	      P(mutex1);                  p(mutex2);
		Get Water;                  Get water and
	      v(mutex1);                    Drink water;
	      P(mutex2);                  p(mutex2);
	      pure water into the jar;    v(empty);
	      v(mutex2);                  v(count);
	      v(count);                 end
	      v(full);
	    end
	coend
	coend
	```

26. 一座小桥(最多只能承重两个人)横跨南北两岸，任意时刻同一方向只允许一人过桥，南侧桥段和北侧桥段较窄只能通过一人，桥中央一处宽敞，允许两个人通过或歇息。试用信号灯和PV操作写出南、北两岸过桥的同步算法。
	```
	桥上可能没有人，也可能有一人，也可能有两人。
	·  两人同时过桥
	·  两人都到中间
	·  南(北)来者到北(南)段

	共需要三个信号量，load用来控制桥上人数，初值为2，表示桥上最多有2人；north用来控制北段桥的使用，初值为1，用于对北段桥互斥；south用来控制南段桥的使用，初值为1，用于对南段桥互斥。

	var load,north,south:semaphore;
	load=2;
	north=1;
	south=1;
	    GO_South()
	      P(load);
	      P(north);
		过北段桥;
		到桥中间;
	      V(north);
	      P(south);
		过南段桥;
		到达南岸;
	      V(south);
	      V(load);
	    GO_North()
	      P(load);
	      P(south);
		过南段桥;
		到桥中间
	      V(south);
	      P(north);
		过北段桥;
		到达北岸
	      V(north);
	      V(load);
	```

27. 两人公用一个账号，每次限存或取10元；
	```
	begin
	var mutex=1:semaphore;
	amount =0:integer;
	cobegin
	  process save
	    m1: integer;
	    begin
	    repeat
	    p(mutex);
	    m1= amount ;
	    m1 = m1 +10;
	    amout = m1;
	    v(mutex);
	    end
	  process take
	    m2: integer;
	    begin
	    repeat;
	    p(mutex);
	    m2= amount ;
	    m2 = m2 -10;
	    amout = m2;
	    v(mutex);
	    end
	coend
	```

28. 某高校计算机系开设网络课并安排上机实习，假设机房共有2m台机器，有2n名学生选课（m，n均大于等于1），规定：
(1)每两个学生组成一组，各占一台及其协同完成上机实习；
(2)只有一组两个学生到齐，并且此时机房有空闲机器时，该组学生才能进入机房；
(3)上机实习由一名教师检查，检查完毕，一组学生同时离开机房
试用P、V实现其过程。
注意：
本题目隐含一个进程(Guard )。
	```
	var stu,computer,enter,finish,test:semaphore;
	ste:=2N;
	computer:=2M;
	enter:=0;
	finish:=0;
	test:=0;

	cobegin
	Procedure Student   Procedure Teacher   Procedure Guard
	  begin               begin               begin
	  p(computer);        p(finish);            p(stu);
	  p(stu);              Test the work;       p(stu);
	    Start computer;   v(test);               Enter;
	  v(finish);          v(test);              v(enter);
	  v(test);            end                   v(enter);
	  v(computer);                            end
	  end
	coend
	```

29. 设有A、B、C三组进程，它们互斥地使用某一独占型资源R，使用前申请，使用后释放。资源 分配原则如下：
当只有一组申请进程时，该组申请进程依次获得R；
(1)当有两组申请进程时，各组申请进程交替获得R，组内申请进程交替获得R；
(2)当有三组申请进程时，各组申请进程轮流获得R，组内申请进程交替获得R。
(3)试用信号灯和PV操作分别给出各组进程的申请活动程序段和释放活动程序段。
	```
	Int Free=1;                  // 设备状态标志
	 semaphore mutex=1;
	 semaphore qa=qb=qc=0;         // 各组等待队列
	 Int counta=countb=countc= 0; // 等待队列长度
	A组申请： P(mutex); if Free==1 then begin Free=0; V(mutex); end else begin counta++; V(mutex); P(qa); end
	A组释放： if countb>0 then begin countb--; V(qb); end else begin if countc>0 then begin countc--; V(qc); end else begin if counta > 0 then begin counta--; V(qa); end else begin Free=1; end end end
	A组进程活动可以给出B组和C组进程活动。
	```

30. 进程A1、A2、...、An1通过m个缓冲区向进程B1、B2、...、Bn2不断发送消息。发送和接收 工作遵循下列规则：
每个发送进程一次发送一个消息，写入一个缓冲区，缓冲区大小等于消息长度；
对每个消息，B1，B2，Bn2都须各接收一次，读入各自的数据区内；
m个缓冲区都满时，发送进程等待，没有可读消息时，接收进程等待。
试用P、V操作组织正确的发送和接收工作。
	```
	每个缓冲区只要写一次但要读n2次，因此，可以看成n2组缓冲区，每个发送者要同时写n2 个缓冲区，而每个接收者只要读它自己的缓冲区。
	 Sin[n2]=m Sout[n2]=0;
	     cobegin
		 procedure Aj:
		     while (1) begin
		         for(i=1;i<=n2;i++)
		             P(Sin[i]);
		         P(mutex);
		         // 将数据放入缓冲区
		         V(mutex);
		         for(i=1;i<=n2;i++)
		             V(Sout[2]);
		     end
		 procedure Bi:
		     while (1) begin
		         P(Sout[i]);
		         P(mutex);
		         // 从缓冲区取数据
		         V(mutex);
		         V(Sin[i]);
		     end
	     coend
	```

31. 设有8个程序prog1，prog2，...，prog8。它们在并发系统中执行时有如下所示的制约关系， 使用P、V操作实现这些程序间的同步。

	```
	-----------     ----------> ----------
	   Prog1   \   /   Prog3      Prog6   \
	            \ /                        \
	             +--------------------------> ---------->
	            / \          Prog4         /     Prog8
	           /   \                      /
	-----------     ----------> ----------
	   Prog2           Prog5      Prog7
	```

	```
	本题目是用来检查考生对使用P、V操作实现进程间同步的掌握情况。一般地，若要求进程 B在进程A之后方可执行时，只需在进程P操作，而在进程A执行完成时对同一信号量进行V 操作即可。本题要求列出8个进程（程序）的控制关系，使题目显得较为复杂。但当对进 程间的同步理解透彻后，应不难写出对应的程序。解这一类问题还应注意的一点是，要看 清图示的制约关系，不要漏掉或多处制约条件。
	 BEGIN
	 var s13, s14, s15, s23, s24, s25,s36, s48, s57, s68, s78: semaphore;
	 s13 :=0; s14 :=0; s15 :=0; s23 :=0; s24 :=0; s25 :=0; s36 :=0;
	 s48 :=0; s57 :=0; s68 :=0; s78 :=0;
	 COBEGIN
	   prog1:         prog2:        prog3:        prog4:
	     BEGIN          BEGIN         BEGIN         BEGIN
	       do work;       do work;      V(S13);       P(S14);
	       V(s13);        V(s23);       V(S23);       P(S24);
	       V(s14);        V(s24);       do work;      do work;
	       V(s15);        V(s25);       V(s36);       V(s48);
	     END            END           END           END
	   prog5:         prog6         prog7         prog8
	     BEGIN          BEGIN         BEGIN         BEGIN
	       P(s15);        P(s36);       P(s57);       P(s48);
	       P(s25);        do work;      do work;      P(s68);
	       do work;       V(s68);       V(S78);       P(s78);
	       V(57);       END           END             do work;
	     END                                        END
	 COEND
	 END
	```
32. 把学生和监考老师都看做进程，学生有N个人，教师1人，考场门口每次只能进出一个人，进 考场原则是先来先进，当N个学生都进入考场后，教师才能发试卷。学生交卷后可以离开考 场，教师要等收上来全部试卷并封装试卷后才能离开考场。问共需设置几个进程？使用P，V 操作解决上述问题中的同步和互斥关系。
	```
	var mutex,Beginready,Testready,Endready:semaphore;
	     //mutex用以标示教室门这个临界资源
	     //beginready等待考生来全，标示考试开始
	     mutex:=1;
	     Beginready:=-(N-1);
	     Testready:=0;
	     Endready:=-(N-1);
	     cobegin
		 Procedure Student       Procedure Teacher
		     P(mutex);               P(mutex);
		         // Enter;               // Enter;
		     V(mutex);               V(mutex);
		         // Waiting;
		     P(Beginready);
	 --------------------------------------------------
		                             P(Beginready);
		                             // Hand Out;
		                             V(Beginready);
	 --------------------------------------------------
		     P(Testready);
		     V(Testready);
		     // 答题
		     // 交卷
		     // 离开
		     V(Endready);
	 --------------------------------------------------
		                             P(Endready);
		                             // 封卷离开
	```

33. 我们将只读数据的进程称为“读者”进程，而写或者修改数据的进程称为“写者”进程，允许多 个“读者”同时读数据，但不运行写者与其它读者或者写者进程同时访问数据。另外，要保证： 一旦有写者等待，新到达的读者必须等待，直到该写者完成数据访问为止，用P,V 操作实现 读者，写者同步。
	```
	互斥资源：读写者问题，隐含一个互斥资源-读写的问件
	互斥锁：读文件时不能写，写文件时不能读文件
	读进程：允许多个文件读，读进程时> 0时，锁定文件，读文件进程< 1时，解锁；读进程 数> 0时，说明读进程拥有锁
	写进程:拥有锁时写文件
	 增加一个信号量w：=1，用以在写进程到达时封锁后续进程
	   cobegin
	   procedure Reader            procedure Writer
	     begin                       begin
		                         P(w);
	       P(rmutex);                P(wmutex);
	       if rcount==0 then         // 写数据；
		 P(wmutex);              V(wmutex);
		 V(rmutex);              V(w)
		 V(w);                 end
		 // 读数据；
		 P(rmutex);
		 rcount:=rcount-1;
		 if rcount==0 then
		  V(rmutex);
		   V(rmutex);
		   end
	   coend
	```

34. 三个吸烟者在一间房间内，还有一个香烟供应者。为了制造并抽掉香烟，每个吸烟者需要三 样东西：烟草、纸和火柴。供应者有丰富的货物提供。三个吸烟者中，第一个有自己的烟草， 第二个有自己的纸，第三个有自己的火柴。供应者将两样东西放在桌子上，允许一个吸烟者 进行对健康不利的吸烟。当吸烟者完成吸烟后唤醒供应者，供应者再放两样东西（随机地） 在桌面上，然后唤醒另一个吸烟者。试为吸烟者和供应者编写程序解决问题。
	```
	每个吸烟者需要一个进程，分别和经销商进行同步
	互斥资源：桌子
	A,B,C,D四个进程，A表示烟草拥有者，B是纸拥有者，C火柴拥有者，D经销商
	S实现互斥，表示桌子上是否放有东西
	Sad,Sbd,Scd分别表示进程AD,BD,CD之间的同步
	 cobegin
	 经销商              烟草拥有者          纸拥有者              火柴拥有者
	   begin               begin               begin                 begin
	     P(s);               P(Sad);             P(Sbd);               P(Scd);
	     // 放原料；         // 取纸和火柴；     // 取烟草和火柴；     // 取纸和烟草；
	     if(纸和火柴)        V(s);               V(s);                 V(s);
	       V(Sad);           // 吸烟；           // 吸烟；             // 吸烟；
	     else              end                 end                    end
	       if(烟草和火柴)
		 V(Sbd);
	      else
		V(Scd);
	     end
	 coend
	```

35. 有n+1个进程A1，A2，... ,An和B：
A1,A2,... ,An通过同一个缓冲池各自不断地向B发送消息，B不断地取消息，它必须取走 发来的每个消息，刚开始时缓冲区为空，使用P,V操作实现之。
若缓冲区个数增至M个，试用P,V实现正确通讯。
	```
	 var full,empty,mutex:semaphore;
	     full=0;
	     empty=1;
	     mutex=1;
	   cobegin
	     procedure A_i(i=1,...,n)           procedure  B:
	       begin                              begin
		 P(empty);                          P(full);
		 P(mutex);                          P(mutex);
		 // put message to the buffer;      // Get the message;
		 V(mutex);                          V(mutex);
		 V(full);                           V(empty);
	     end                                end
	   coend
	```

36. 阅览室问题
有一个阅览室，共有100个座位，读者进入时必须先在一张登记表上登记，该表为每一个座位列一表目，包括座号和读者姓名等，读者离开时要消掉登记的信息，试问；
(1)为描述读者的动作，应编写几个程序，设置几个进程？
(2)试用PV操作描述各个进程之间的同步互斥关系。
	```
	读者动作有两个，一个时填表进入阅览室，这时要考虑阅览室里是否有空位；一是读者阅读完毕，离开阅览室，这时的操作要考虑阅览室里是否有读者。读者在阅览室读书时，由于没有引起资源的变动，不算动作变化。 算法的信号量有三个：seats-表示阅览室时否有座位(初值为100)；readers-表示阅览室里的读者数，初值为0；用于互斥的mutex，初值为1。
	var seats, raaders, mutex:semaphore;
	    seats:=100;
	    readers:=0;
	    mutex:=1;

	cobegin
	   procedure Enter
	   begin
	       while TRUE
	       begin
		   p(seats);   //没有座位则离开
		   p(mutex);   //进入临界区
		   填写登记表;
		   进入阅览室阅读;
		   v(mutex);   //离开临界区 v(readers);
	       end
	   end
	   procedure Leave
	   begin
	       while TRUE
	       begin
		   p(readers);
		   p(mutex);
		   消掉登记;
		   离开阅览室;
		   v(mutex); 
		   v(seats); 
	       end
	   end
	coend。
	```

37. P,V改错(2001)
设有两个优先级相同的进程P1，P2如下。令信号S1，S2的初值为0，已知z=2，试问P1，P2并发运行结束后x=？y=？z=？
进程P1	进程P2
y:=1;	x:=1;
y:=y+2;	x:=x+1;
V(S1);	P(S1);
z:=y+1;	x:=x+y;
P(S2);	V(S2);
y:=z+y;	z:=x+z;
	```
	受信号量S1和S2的控制，进程P1和P2中P,V操作的顺序应明确。但当进程P2执行V(S2)调用后，可能会产生这种情形，即P2中的语句“z:=x+z”可以在P1中的语句“y:=z+y”前面或后面执行，因而P1和P2并发运行结束后，有两种可能的结果。即： x=5、y=12、z=9或x=5、y=7、z=9。
	```

38. 面包店(2001)
面包师有很多面包，由n个销售人员推销。每人顾客进店后先取一个号，并且等待叫号。当一个销售人员空闲下来时，就叫下一个号。试设计一个使销售人员和顾客同步的算法。

39. 公交车问题(2002)
在一辆公共汽车上，司机和售票员各行其职，司机负责开车和到站停车；售票员负责售票和开、关门，当售票员关好车门后，司机才能继续开车行驶。试用P、V操作实现司机与售票员之间的同步。

40. 打印机问题
设系统中有5台类型相同的打印机，依次编号为1～5。又设系统中有n个使用打印机的进程，使用前申请，使用后释放。每个进程有一个进程标识，用于区别不同的进程。每个进程还有一个优先数，不同进程的优先数各异。当有多个进程同时申请时，按照进程优先数由高到低的次序实施分配。试用信号灯和PV操作实现对于打印机资源的管理，即要求编写如下函数和过程:
(1)函数require(pid，pri): 申请一台打印机。参数pid为进程标识，其值为1到n的整数; pri为进程优先数，其值为正整数; 函数返回值为所申请到打印机的编号，其值为1到5的整数;
(2)过程return(prnt): 释放一台打印机。参数prnt为所释放打印机的编号，其值为1到5的整数。
	```
	#define N 5
	Int flag[N+1]; //flag[0]表示可用打印机数,
	//flag表示第i号打印机的状态（1<=i<=N），0表示占用，1表示空闲
	PCB *queue=NULL;//进程阻塞队列
	semaphore mutex_flag=1;//用于对flag数组的互斥操作
	semaphore mutex_queue=1;//用于对阻塞队列的互斥操作
	int require(int pid,int priority)
	{
	   P(mutex_flag);
	   if(flag[0]>0)
	   {
	       flag[0]--;
	       for(int  i=1;i<N+1;i++)
		   if(flag=  =1)
		   {
		       flag=0;
		       break;
		   }
	       V(mutex_flag);
	       return i;
	   }
	   else
	   {
	       V(mutex_flag);
	       p(mutex_queue);
	       将进程pid按其优先数插入到等待队列queue中;
	       V(mutex_queue);
	   }
	}
	return(int print)
	{
	   P(mutex_flag);
	   if(queue==NULL)
	   {
	       flag[0]++;
	       flag[print]=1;
	       V(mutex_flag);
	   }
	   else
	   {
	       V(mutex_flag);
	       p(mutex_queue);
	       将print分配给queue队首进程;
	       queue下移;
	       V(mutex_queue);
	   }
	}
	```

41. 批处理系统问题
设某个批处理系统中，有三个进程：卡片输入进程、作业调度进程、作业控制进程。他们之间的合作关系是：
只要卡片输入机上有作业信息输入，进程把作业逐个输入至输出井并为每个作业建立一个JCB块并把它插入至后备作业队列(JCB链表)中。
当内存中无作业运行时，作业调度进程从JCB中选一个作业，把该作业装入内存。
作业控制进程负责处理已调入内存的作业。
(1)P,V写出输入和调度进程的同步。
(2)用消息缓冲痛惜，写出调度进程与作业控制进程间的同步算法。
	```
	procedure 输入：
	begin
	   L1:
	   如果有卡片 then L2
	   等待卡片;
	   L2:
	   把作业输入至输出井并建立JCB块;
	   p(s);
	   把JCB插入链中;
	   v(mutex);
	   v(s);
	   Goto L1;
	end

	procedure 调度：
	begin
	   M:
	   P(s);
	   p(mutex);
	   查JCB;
	   v(s);
	   send();//向控制进程发信息
	   receive();//接受信息
	   Goto M;
	end

	procedure 作业控制：
	begin
	   N:
	   receive();
	   处理; send();//向调度发信息
	   Goto N;
	end
	```

42. 桔子汁生产线问题
现有三个生产者P1 、P2 、P3，他们都要生产水，每个生产者都已分别购得两种不同原料，待购得第三种原料后就可配制成桔子水，装瓶出售。有一供应商能源源不断地供应糖、水、桔子精，但每次只拿出一种原料放入容器中供给生产者。当容器中有原料时需要该原料的生产者可取走，当容器空时供应商又可放入一种原料。假定：生产者P1已购得糖和水；生产者P2 已购得水和桔子精；生产者P3已购得糖和桔子精；试用：信号量与P、V操作，写出供应商和三个生产者之间能正确同步的程序。

43. 保管员问题
有一材料保管员，他保管纸和笔若干。有A 、B 两组学生，A 组学生每人都备有 纸，B 组学生每人都备有笔．任一学生只要能得到其他一种材料就可以写信。有一个可 以放一张纸或一支笔的小盒，当小盒中无物品时，保管员就可任意放一张纸或一支笔 供学生取用，每次允许一个学生从中取出自己所需的材料，当学生从盒中取走材料后 允许保管员再存放一件材料，请用信号量与P 、v 操作
	```
	var
	s, Sa.Sb, mutexa, mutexb: semaphore;
	s: = mutexa ：=mutexb: = 1;
	sa: = sb: = 0;
	box: (PaPer, Pen);
	cobegin
		process 保管员
			begin
				repeat
				P(S);
				take a material intobox ;
				if (box)=Paper then V(Sa);
				else V(Sb);
				untile false ;
			end

	Process A组学生
		begin
			repeat
			P(Sa);
			P(mutexa);
			take the pen from box ;
			V(mutexa);
			V(S);
			write a letter;
			untile false ;
		end
	
	Process B组学生
		begin
			repeat
			P(Sb);
			P(mutexb);
			take the paper from box ;
			V(mutexb);
			V(S);
			wnte a letter ;
			untile false ;
		end
	Coend.
	```

44. 招聘问题
现有100名毕业生去甲、乙两公司求职，两公司合用一间接待室，其中甲公司招 收10 人，乙公司准备招收10人，招完为止。两公司各有一位人事主管在接待毕业生， 每位人事主管每次只可接待一人，其他毕业生在接待室外排成一个队伍等待。试用信 号量和P 、v 操作实现人员招聘过程。
	```
	由于毕业生仅排成一队，故用如图的一个队列数据结构表示。在队列中不含甲、乙公司.

	A	B	A	A	B	Sm
	A	B	Sn
	B	A	...	 	 	 

	都接待过的毕业生和己被录用的毕业生。只含标识为A （被甲接待过）或只含标识为B （被乙接待过）及无标识的毕业生队列。此外，sm 和Sn 分别为队列中甲、乙正在面试的毕业生i ( i = 1 , 2 ，…，100 ）标识、即此刻另一方不得面试该毕业生i 。K1和K2 为甲、乙所录取的毕业生数，C1 、C2 为互斥信号量。注意，如果甲录取了一人，且该生没有被乙面试的话，则乙面试的毕业生将减1 。办法是：如果甲录取了一人，且该生没有被乙面试可把乙的面试计数器C2加1 （相当于乙己面试了他），从而，保证乙面试的人数值为100 。反之对甲亦然。

	var Sa,Sb,mutex:semaphore;
	Sa:=Sb:=mnutex:=1;
	C1,C2,K1,K2：integer;
	C1:=C2:=K1:=K2:=0;
	cobegin
		process 甲公司
			begin
			L1: P(mutex);
			P(Sa);
			C1:==C1+1 ;
			V(Sa);
			If C1≤100 then
			｛
				从标识为B 且不为Sn 或
				无标识的毕业生队列中选
				第i 个学生，将学生i 标
				识为A 和Sm
			｝
			V(mutex) ;
			面试；
			P(mutex);
			if 合格then
			{
				K1:=K1+1;
				if 学生i 的标识不含B then
				{
					P (Sb);
					C2:=C2+1;
					V(Sb);
					将学生i 从队列摘除；
				}
				else 将学生i 从队列摘除；
			}
			else if 学生i 的标识含B then
					将学生i 从队列摘除;
				else
					取消学生i 的Sm 标识；
			V(mutex);
			If(K1<10)&(C2<100) then
				goto L1;
	end

	process 乙公司
	begin
		L2:P(mutex);
		P(Sb);
		C2:=C2+1;
		V(Sb);
		if C2≤100 then
			从标识为A 且不为sm 或无标识的
			毕业生队列中选第i个学生将学生i
			标识为B和Sn
		V(mutex);
		面试；
		P(mutex);
		if 合格then
		{
			K2:=K2+1;
			if 学生i 的标识不含A then
			{
			P(Sa)
			C1:=C1+1;
			V(Sa);
			将学生i 从队列摘除；
			}
			else 将学生i 从队列摘除；
		}
		else if 学生i 的标识含A then
				将学生i 从队列摘除；
			else
				取消学生i 的Sn 标识；
		V(mutex);
		if(K2<10)&(c1<100）then
			goto L2;
	end
	coend
	```

45. 博物馆-公园问题
Jurassic公园有一个恐龙博物馆和一个花园，有m 个旅客租卫辆车，每辆车仅能乘 一个一旅客。旅客在博物馆逛了一会，然后，排队乘坐旅行车，挡一辆车可用喊飞它载 入一个旅客，再绕花园行驶任意长的时间。若n 辆车都己被旅客乘坐游玩，则想坐车的 旅客需要等待。如果一辆车己经空闲，但没有游玩的旅客了，那么，车辆要等待。试用 信号量和P 、V 操作同步m 个旅客和n 辆车子。
	```
	这是一个汇合机制，有两类进程：顾客进程和车辆进程，需要进行汇合、即顾客要坐进车辆后才能游玩，开始时让车辆进程进入等待状态

	解答:

	var sc1 , sck , sc ，Kx,xc ，mutex : semaphore ;
	sck:=kx:=sc:=xc:=0；
	sc1:=n ；mutex : = 1 ;
	sharearea ：一个登记车辆被服务乘客信息的共享区；
	cobegin
		process 顾客i ( i = 1 , 2 ，… ）
		begin
			P (sc1) ; /*车辆最大数量信号量
			P (mutex) ; /*封锁共享区，互斥操作
			在共享区sharearea登记被服务的顾客的信息：
			起始和到达地点，行驶时间
			V (sck) ; /* 释放一辆车 ,即顾客找到一辆空车
			P(Kx); /* 待游玩结束之后，顾客等待下车
			V(sc1) ; /*空车辆数加1
		End
		Process 车辆j(j=1,2,3…)
		Begin
			L:P(sck); /*车辆等待有顾客来使用
			在共享区sharearea登记一辆车被使用，并与顾客进程汇合；
			V(mutex); /*这时可开放共享区，让另一顾客雇车
			V(kx); /*允许顾客用此车辆
			车辆载着顾客开行到目的地；
			V(xc); /*允许顾客下车
			Goto L;
		End
	coend
	```

46. 生产流水线问题
设自行车生产线上有一只箱子，其中有N 个位置( N ≥3)，每个位置可存放一个车架或一个车轮; 又设有三个工人，其活动分别为:
工人1活动: do{ 加工一个车架; 车架放入箱中; }while(1) 	工人2活动： do{ 加工一个车轮; 车轮放入箱中; }while(1) 	工人1活动： do{ 箱中取一个车架; 箱中取两个车轮; 组装为一台车; }while(1) 
试分别用信号灯与PV 操作实现三个工人的合作，要求解中不含死锁。
	```
	问题分析：
	用信号灯与PV 操作实现三个工人的合作首先不考虑死锁问题，工人1与工人3、工 人2与工人3构成生产者与消费者关系，这两对生产/消费关系通过共同的缓冲区相联 系。从资源的角度来看，箱字中的空位置相当于工人1和工人2的资源，而车架和车轮相 当于工人3的资源。定义三个信号灯如下：
	---------------The P,V code Using Pascal--------------------
	semaphore empty=N; semaphore wheel=0; semaphore frame=0; 三位工人的活动分别为: 
	procedure 工人1: do{ 加工一个车架; P(empty); 车架放入箱中; V(frame); }while(1) 	工人2活动： do{ 加工一个车轮; P(empty); 车轮放入箱中; V(wheel); }while(1) 	工人1活动： do{ P(frame); 箱中取一个车架; V(empty); P(wheel); P(wheel); 箱中取两个车轮; V(empty); V(empty); 组装为一台车; }while(1) 
	分析上述解法易见，当工人1推进速度较快时，箱中空位置可能完全被车架占满或只留 有一个存放车轮的位置，而当此时工人3同时取2个车轮时将无法得到，而工人2又无法 将新加工的车轮放入箱中；当工人2推进速度较快时，箱中空位置可能完全被车轮占满， 而当此时工人3同取车架时将无法得到，而工人1又无法将新加工的车架放入箱中。上述 两种情况都意味着死锁。为防止死锁的发生，箱中车架的数量不可超过N-2，车轮的数 量不可超过N-1，这些限制可以用两个信号灯来表达。如此，可以给出不含死锁的完整 解法如下：
	---------------The P,V code Using Pascal--------------------
	semaphore s1=N-2; semaphore s2=N-1; 
	procedure 工人1: do{ 加工一个车架; P(s1); P(empty); 车架放入箱中; V(frame); }while(1) 	工人2活动： do{ 加工一个车轮; P(s2); P(empty); 车轮放入箱中; V(wheel); }while(1) 	工人1活动： do{ P(frame); 箱中取一个车架; V(empty); V(s1); P(wheel); P(wheel); 箱中取两个车轮; V(empty); V(empty); V(s2); V(s2); 组装为一台车; }while(1) 
	详细描述还应考虑对箱子单元的描述以及访问互斥问题。建议车架放在箱子的一端，车 轮放在箱子的另一端，车架与车轮都采用后进先出的管理方式。
	---------------The P,V code Using Pascal--------------------
	Semaphore s1=N-2，s2=N-1，mutex=1; int in1=0，in2=N-1; int buf[N]; 
	procedure 工人1: do{ 加工一个车架; P(s1); P(empty); P(mutex); Buf[in1] = 车架; in1 = in1 + 1; V(mutex); V(frame); }while(1) 	工人2活动： do{ 加工一个车轮; P(s2); P(empty); P(mutex); Buf[in2] = 车轮; in2 = in2 - 1; V(mutex); V(wheel); }while(1) 	工人1活动： do{ P(frame); P(mutex); Temp1 = Buf[in1-1]; in1 = in1 - 1; V(mutex); V(empty); V(s1); P(wheel); P(wheel); P(mutex); Temp2 = Buf[in2+1]; in2 = in2 + 1; Temp3 = Buf[in2 + 1]; in2 = in2 + 1; V(mutex); V(empty); V(empty); V(s2); V(s2); 组装为一台车; }while(1) 
	```

47. 知错能改
进程p0,p1共享变量flag,turn;他们进入临界区的算法如下:
	```
	var flag:array[0..1] of boolean;//初值为false
	turn:01
	process i (0或1)
		while true
		do begin
			flag[i] =true;
			while turn!=i
			do begin
				while flag[j]==false
				do skip;//skip为空语句
				turn = i
			end
			临界区;
			flag[i] = false;
			出临界区;
		end
	```
该算法能否正确地实现互斥?若不能,应该如何修改(假设flag,turn单元内容的修改和访问 是互斥的).
	```
	不能正确实现互斥.考虑如下情况:process0先执行到flag[0] =true,process1开始执行,进入内循环时,将turn设置为1;此时进程调度转到process0, process0可以进入内循环,由于flag[1]的值为true,所以process0再次将turn的值设置为0,重复上述操作,两个进程谁也不能进入临界区.

	var flag:array[0..1] of boolean;//初值为false
		turn:0 1
	cobegin
		process 0
			while true
			do begin
			flag[0] =true;
			turn = 1
			while flag[1]==true and turn = 1
			do skip;//skip为空语句
			临界区;
			flag[0] = false;
			出临界区;
			end
		process 1
			while true
			do begin
			flag[1] =true;
			turn = 0
			while flag[0]==true and turn = 0
			第四章 福尔摩斯探案之网络搜捕 73
			do skip;//skip为空语句
			临界区;
			flag[1] = false;
			出临界区;
			end
	coend

	容易证明这种方法保证了互斥,对于进程0,一旦它设置flag[0]为true,进程1就不能进入其临界段.若进程1已经在其临界段中，那么flag [1]=true并且进程0被阻塞进入临界段.另一方面,防止了相互阻塞,假设进程0阻塞于while循环,这意味着flag[1]为true,而且turn=1,当flag[1]为false或turn为0时,进程0就可进入自己的临界段了.
	```
