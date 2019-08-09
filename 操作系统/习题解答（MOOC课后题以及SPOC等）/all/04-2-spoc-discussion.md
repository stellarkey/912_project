#lec9 虚存置换算法spoc练习

## 个人思考题
1. 置换算法的功能？

2. 全局和局部置换算法的不同？

3. 最优算法、先进先出算法和LRU算法的思路？

4. 时钟置换算法的思路？

5. LFU算法的思路？

6. 什么是Belady现象？

7. 几种局部置换算法的相关性：什么地方是相似的？什么地方是不同的？为什么有这种相似或不同？

8. 什么是工作集？

9. 什么是常驻集？

10. 工作集算法的思路？

11. 缺页率算法的思路？

12. 什么是虚拟内存管理的抖动现象？

13. 操作系统负载控制的最佳状态是什么状态？

## 小组思考题目

----
(1)（spoc）请证明为何LRU算法不会出现belady现象

> 设L1和L2为两个分配给某个进程的物理内存的页面数量，并且L1<L2. 

> 对于进程运行中的任意时刻，L1算法对应的在物理内存中的页面的集合为S1，L2对应的在物理内存中的页面的集合为S2. 

> 根据LRU算法，此时我们有S1是S2的子集。对于下一次访问，I1=1表示L1出现缺页，I1=0表示L1不出现缺页；I2=1表示L2出现缺页，I2=0表示L2不出现缺页。因为S1是S2的子集，所以I1 >= I2.

> 进程运行中的缺页数 \sum_I1 >= \sum_I2，即L1对应的缺页数不小于I2. 所以LRU算法不会出现belady现象。


(2)（spoc）根据你的`学号 mod 4`的结果值，确定选择四种替换算法（0：LRU置换算法，1:改进的clock 页置换算法，2：工作集页置换算法，3：缺页率置换算法）中的一种来设计一个应用程序（可基于python, ruby, C, C++，LISP等）模拟实现，并给出测试。请参考如python代码或独自实现。
 - [页置换算法实现的参考实例](https://github.com/chyyuu/ucore_lab/blob/master/related_info/lab3/page-replacement-policy.py)
 
> 下面代码实现了改进的clock页置换算法。

```

# visited, modified, page_number

class page_manager():

    def __init__(self, size):
        self.pages = [[0, 0, -1] for _ in range(size)]
        self.ptr = 0

    def request(self, page_number, write = 0):
        print 'requesting page #', chr(ord('a') + page_number)

        for i, page in enumerate(self.pages):
            if page[2] == page_number:
                print 'page hit #', chr(ord('a') + page_number)
                self.pages[i] = [1, write, page_number]
                self.print_()
                return

        while True:
            ptr_page = self.pages[self.ptr]
            if ptr_page[0] == 0 and ptr_page[1] == 0: break
            if ptr_page[0] == 0 and ptr_page[1] == 1: ptr_page[1] = 0
            if ptr_page[0] == 1 and ptr_page[1] == 0: ptr_page[0] = 0
            if ptr_page[0] == 1 and ptr_page[1] == 1: ptr_page[0] = 0
            self.ptr = (self.ptr + 1) % len(self.pages)
        print 'page fault, replacing #', chr(ord('a') + self.pages[self.ptr][2])
        self.pages[self.ptr] = [1, write, page_number]
        self.ptr = (self.ptr + 1) % len(self.pages)
        self.print_()

    def print_(self):
        s = ""
        for i in range(len(self.pages)):
            j = (i + self.ptr) % len(self.pages)
            s += ' ' + chr(ord('a') + self.pages[j][2])
        print s, '\n'

if __name__ == '__main__':
    pm = page_manager(4)
    for page_number, write in [(2, 0), (0, 1), (3, 0), (1, 1), (4, 0), (1, 0), (0, 1), (1, 0), (2, 0), (3,0)]:
        pm.request(page_number, write)
```

> 用一个三元数组表示当前内存管理的状态 (visited, modified, page_num)，其中visited表示访问位，modified表示修改位，page_num表示页号。

> 使用课件中的例子进行测试，输出结果与课件上演示的结果一致。

## 扩展思考题
（1）了解LIRS页置换算法的设计思路，尝试用高级语言实现其基本思路。此算法是江松博士（导师：张晓东博士）设计完成的，非常不错！

参考信息：

 - [LIRS conf paper](http://www.ece.eng.wayne.edu/~sjiang/pubs/papers/jiang02_LIRS.pdf)
 - [LIRS journal paper](http://www.ece.eng.wayne.edu/~sjiang/pubs/papers/jiang05_LIRS.pdf)
 - [LIRS-replacement ppt1](http://dragonstar.ict.ac.cn/course_09/XD_Zhang/(6)-LIRS-replacement.pdf)
 - [LIRS-replacement ppt2](http://www.ece.eng.wayne.edu/~sjiang/Projects/LIRS/sig02.ppt)
