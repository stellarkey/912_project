# lec5 SPOC思考题


NOTICE
- 有"w3l1"标记的题是助教要提交到学堂在线上的。
- 有"w3l1"和"spoc"标记的题是要求拿清华学分的同学要在实体课上完成，并按时提交到学生对应的git repo上。
- 有"hard"标记的题有一定难度，鼓励实现。
- 有"easy"标记的题很容易实现，鼓励实现。
- 有"midd"标记的题是一般水平，鼓励实现。


## 个人思考题
---

请简要分析最优匹配，最差匹配，最先匹配，buddy systemm分配算法的优势和劣势，并尝试提出一种更有效的连续内存分配算法 (w3l1)
```
  + 采分点：说明四种算法的优点和缺点
  - 答案没有涉及如下3点；（0分）
  - 正确描述了二种分配算法的优势和劣势（1分）
  - 正确描述了四种分配算法的优势和劣势（2分）
  - 除上述两点外，进一步描述了一种更有效的分配算法（3分）
 ```
- 最先匹配的优点是简单，在高地址空间有大块的空闲分区；缺点是存在外部碎片，分配大块内存比较慢。
- 最佳匹配的优点是当大部分分配尺寸较小时效果比较好，可以避免大的空闲分区被拆分，可以减小外部碎片的大小，而且相对简单；缺点是会产生较多的外部碎片，释放分区比较慢，容易产生很多无用的小碎片。
- 最差匹配的优点是当中等大小碎片分配较多时效果比较好，可以避免出现太多小碎片；缺点是释放分区较慢，会产生外部碎片，容易破坏较大的分区。
- buddy system的优点是可以适应不同大小的分块分配，可以减少外部碎片的产生，合并回收的效率比较高，分配的效率也比价高；缺点是内部碎片会相对比较大，可能造成空间的浪费。
- 更有效的连续内存分配算法：可以对最佳匹配进行改进，用两棵平衡二叉树对当前的分区进行维护，一棵树维护当前分区分配的地址相邻情况，一棵树维护当前空闲分区大小的情况，这样可以大幅度提升分区查找和合并的效率。

>  

## 小组思考题

请参考ucore lab2代码，采用`struct pmm_manager` 根据你的`学号 mod 4`的结果值，选择四种（0:最优匹配，1:最差匹配，2:最先匹配，3:buddy systemm）分配算法中的一种或多种，在应用程序层面(可以 用python,ruby,C++，C，LISP等高语言)来实现，给出你的设思路，并给出测试用例。 (spoc)

```

class worst_fit_memory:

    def __init__(self, size):
        self.empty = [(0, size)]    # list of empty blocks, sorted by size. each element is a 3-tuple (start, end)
        self.busy = []              # list of busy blocks. each element is a 3-tuple (index, start, end)

    def allocate(self, size, index):
        if len(self.empty) == 0: return -1, -1  # no empty blocks

        start, end = self.empty[-1][0], self.empty[-1][1]
        if end - start == size:     # fit the max block
            self.empty = self[: -1]
            self.busy.append((index, start, end))
            return start, end
        elif end - start > size:    # smaller than the max block
            self.empty[-1] = (start + size, end)
            self.empty.sort(key = lambda x: x[1] - x[0])
            self.busy.append((index, start, start + size))
            return start, start + size
        else: return -1, -1         # larger than the max block

    def release(self, index):
        for i in range(len(self.busy)):     # search for the block to be released
            if self.busy[i][0] == index: break
        start, end = self.busy[i][1], self.busy[i][2]
        self.busy = self.busy[:i] + self.busy[i + 1:]
        flag = False                        # search for merging from the left
        for i in range(len(self.empty)):
            if self.empty[i][1] == start:
                flag = True
                break
        if flag:
            start = self.empty[i][0]
            self.empty = self.empty[:i] + self.empty[i + 1:]
        flag = False                        # search for merging from the right
        for i in range(len(self.empty)):
            if self.empty[i][0] == end:
                flag = True
                break
        if flag:
            end = self.empty[i][1]
            self.empty = self.empty[:i] + self.empty[i + 1:]
        self.empty.append((start, end))     # append the released block
        self.empty.sort(key = lambda x: x[1] - x[0])    # sorting

    def _print(self):
        print 'empty blocks:', self.empty
        print 'busy blocks:', [(e[1], e[2]) for e in self.busy]

if __name__ == '__main__':
    memory = worst_fit_memory(128)
    memory._print()
    print '\n### allocate 32'
    memory.allocate(32, 0)
    memory._print()
    print '\n### allocate 30'
    memory.allocate(30, 1)
    memory._print()
    print '\n### allocate 2'
    memory.allocate(2, 2)
    memory._print()
    print '\n### release 30'
    memory.release(1)
    memory._print()
    print '\n### allocate 28'
    memory.allocate(28, 3)
    memory._print()
    print '\n### release 2'
    memory.release(2)
    memory._print()
    print '\n### release 28'
    memory.release(3)
    memory._print()
    print '\n### release 32'
    memory.release(0)
    memory._print()
```

#### 实现思路（最差分配）

- 分配空间。首先确认内存中存在空闲块，以及最大的空闲块比当前请求大，否则返回错误信息(-1,-1). 接着从最大的空闲块当中分配空间给当前请求，并更新空闲块和占用块的两个列表，且对空闲块列表进行重新排序。
- 释放空间。首先根据索引在占用块列表中寻找对应的块，然后在空闲块列表中分别寻找左右相邻的块，如果存在则进行合并。然后对空闲块和占用块的两个列表进行更新，对空闲块列表重新排序。

#### 测试样例

- 设计了一些测试样例，已经一并附在程序中。直接运行该python脚本就可以观察到内存分配和回收的情况。

```
如何表示空闲块？ 如何表示空闲块列表？ 
[(start0, size0),(start1,size1)...]
在一次malloc后，如果根据某种顺序查找符合malloc要求的空闲块？如何把一个空闲块改变成另外一个空闲块，或消除这个空闲块？如何更新空闲块列表？
在一次free后，如何把已使用块转变成空闲块，并按照某种顺序（起始地址，块大小）插入到空闲块列表中？考虑需要合并相邻空闲块，形成更大的空闲块？
如果考虑地址对齐（比如按照4字节对齐），应该如何设计？
如果考虑空闲/使用块列表组织中有部分元数据，比如表示链接信息，如何给malloc返回有效可用的空闲块地址而不破坏
元数据信息？
伙伴分配器的一个极简实现
http://coolshell.cn/tag/buddy
```

--- 

## 扩展思考题

阅读[slab分配算法](http://en.wikipedia.org/wiki/Slab_allocation)，尝试在应用程序中实现slab分配算法，给出设计方案和测试用例。

## “连续内存分配”与视频相关的课堂练习

### 5.1 计算机体系结构和内存层次
MMU的工作机理？

- [x]  

>  http://en.wikipedia.org/wiki/Memory_management_unit

L1和L2高速缓存有什么区别？

- [x]  

>  http://superuser.com/questions/196143/where-exactly-l1-l2-and-l3-caches-located-in-computer
>  Where exactly L1, L2 and L3 Caches located in computer?

>  http://en.wikipedia.org/wiki/CPU_cache
>  CPU cache

### 5.2 地址空间和地址生成
编译、链接和加载的过程了解？

- [x]  

>  

动态链接如何使用？

- [x]  

>  


### 5.3 连续内存分配
什么是内碎片、外碎片？

- [x]  

>  

为什么最先匹配会越用越慢？

- [x]  

>  

为什么最差匹配会的外碎片少？

- [x]  

>  

在几种算法中分区释放后的合并处理如何做？

- [x]  

>  

### 5.4 碎片整理
一个处于等待状态的进程被对换到外存（对换等待状态）后，等待事件出现了。操作系统需要如何响应？

- [x]  

>  

### 5.5 伙伴系统
伙伴系统的空闲块如何组织？

- [x]  

>  

伙伴系统的内存分配流程？

- [x]  

>  

伙伴系统的内存回收流程？

- [x]  

>  

struct list_entry是如何把数据元素组织成链表的？

- [x]  

>  



