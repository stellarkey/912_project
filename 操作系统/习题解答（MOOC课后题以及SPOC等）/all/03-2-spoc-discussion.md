# lec6 SPOC思考题


NOTICE
- 有"w3l2"标记的题是助教要提交到学堂在线上的。
- 有"w3l2"和"spoc"标记的题是要求拿清华学分的同学要在实体课上完成，并按时提交到学生对应的git repo上。
- 有"hard"标记的题有一定难度，鼓励实现。
- 有"easy"标记的题很容易实现，鼓励实现。
- 有"midd"标记的题是一般水平，鼓励实现。


## 个人思考题
---

（1） (w3l2) 请简要分析64bit CPU体系结构下的分页机制是如何实现的
```
  + 采分点：说明64bit CPU架构的分页机制的大致特点和页表执行过程
  - 答案没有涉及如下3点；（0分）
  - 正确描述了64bit CPU支持的物理内存大小限制（1分）
  - 正确描述了64bit CPU下的多级页表的级数和多级页表的结构或反置页表的结构（2分）
  - 除上述两点外，进一步描述了在多级页表或反置页表下的虚拟地址-->物理地址的映射过程（3分）
 ```
- 64位CPU理论上最大可以支持16EB (2^64)的内存大小。2011年AMD 64的实现采用52位地址总线，最大可以支持4PB (2^52)物理内存，虽然很多情况下硬件不能支持这么大的物理内存。
- 64位CPU采用4级页表。在多级页表中，页表被分成多级存储。每一级的页表存储下一级页表的起始地址。
- 给定一个虚拟地址，我们首先从一级页编号对一级页表进行索引，读取二级页表的起始地址，然后再根据二级页编号在二级页表中进行索引，依次类推，直到最后一级页表中获取物理内存的地址，再利用页内偏移得到目标物理地址。

>  

## 小组思考题
---

（1）(spoc) 某系统使用请求分页存储管理，若页在内存中，满足一个内存请求需要150ns (10^-9s)。若缺页率是10%，为使有效访问时间达到0.5us(10^-6s),求不在内存的页面的平均访问时间。请给出计算步骤。 

- 设不在内存的页面的平均访问时间是x ns. 则根据上述条件我们可以得到
- 500 = 0.1x + 0.9 * 150
- 解得 x = 3650
- 所以不在内存的页面的平均访问时间是3.65us.

> 500=0.9\*150+0.1\*x

（2）(spoc) 有一台假想的计算机，页大小（page size）为32 Bytes，支持32KB的虚拟地址空间（virtual address space）,有4KB的物理内存空间（physical memory），采用二级页表，一个页目录项（page directory entry ，PDE）大小为1 Byte,一个页表项（page-table entries
PTEs）大小为1 Byte，1个页目录表大小为32 Bytes，1个页表大小为32 Bytes。页目录基址寄存器（page directory base register，PDBR）保存了页目录表的物理地址（按页对齐）。

PTE格式（8 bit） :
```
  VALID | PFN6 ... PFN0
```
PDE格式（8 bit） :
```
  VALID | PT6 ... PT0
```
其
```
VALID==1表示，表示映射存在；VALID==0表示，表示映射不存在。
PFN6..0:页帧号
PT6..0:页表的物理基址>>5
```
在[物理内存模拟数据文件](./03-2-spoc-testdata.md)中，给出了4KB物理内存空间的值，请回答下列虚地址是否有合法对应的物理内存，请给出对应的pde index, pde contents, pte index, pte contents。

- 写了如下程序来计算。首先把虚拟地址中的最高5位作为PDE的索引，然后在PDE表中找到相应的表项，判断是否合法。如果合法，则使用PDE表中的最低7位，左移5位，加上虚拟地址中的中间5位作为PTE的索引，然后在PTE表中找到相应的表项，判断是否合法。如果合法，则使用PTE表中的最低7位，左移5位，加上虚拟地址中的最低5位作为物理地址，读出相应的数值。

```

PDE_BASE = 0x220

def get_memory():
    mem = []
    for line in open('memory.in'):
        inputs = line.strip().split(':')[1].strip().split()
        for cont in inputs: mem.append(int(cont, 16))
    return mem

def get_cont(base, index, mem):
    return mem[base + index]

def handle_virtual(va):
    print 'Virtual Address 0x%x:' %va

    mem = get_memory()

    pde_index = (va & 0x7c00) >> 10
    pte_index = (va & 0x3e0) >> 5
    offset = va & 0x1f

    pde_content = get_cont(PDE_BASE, pde_index, mem)
    pde_valid = pde_content >> 7
    pte_base = pde_content - (pde_valid << 7)

    print '\t--> pde index: 0x%x pde contents: (valid 0x%x, pfn 0x%x)' % (pde_index, pde_valid, pte_base)

    if not pde_valid:
        print '\t\t--> Fault (page directory entry not valid)'
        return

    pte_content = get_cont(pte_base << 5, pte_index, mem)
    pte_valid = pte_content >> 7
    phys_base = pte_content - (pte_valid << 7)

    print '\t\t--> pte index: 0x%x pte contents: (valid 0x%x, pfn 0x%x)' % (pte_index, pte_valid, phys_base)

    if not pte_valid:
        print '\t\t\t--> Fault (page table entry not valid)'
        return

    phys_content = get_cont(phys_base << 5, offset, mem)
    print '\t\t\t--> Translated to Physical Address 0x%x --> Value: 0x%x' % ((phys_base << 5) + offset, phys_content)

if __name__ == '__main__':
    for line in open('request.in'):
        handle_virtual(int(line.strip().split()[2], 16))
        print ''
```

- 输出结果如下：

```
Virtual Address 0x6c74:
	--> pde index: 0x1b pde contents: (valid 0x1, pfn 0x20)
		--> pte index: 0x3 pte contents: (valid 0x1, pfn 0x61)
			--> Translated to Physical Address 0xc34 --> Value: 0x6

Virtual Address 0x6b22:
	--> pde index: 0x1a pde contents: (valid 0x1, pfn 0x52)
		--> pte index: 0x19 pte contents: (valid 0x1, pfn 0x47)
			--> Translated to Physical Address 0x8e2 --> Value: 0x1a

Virtual Address 0x3df:
	--> pde index: 0x0 pde contents: (valid 0x1, pfn 0x5a)
		--> pte index: 0x1e pte contents: (valid 0x1, pfn 0x5)
			--> Translated to Physical Address 0xbf --> Value: 0xf

Virtual Address 0x69dc:
	--> pde index: 0x1a pde contents: (valid 0x1, pfn 0x52)
		--> pte index: 0xe pte contents: (valid 0x0, pfn 0x7f)
			--> Fault (page table entry not valid)

Virtual Address 0x317a:
	--> pde index: 0xc pde contents: (valid 0x1, pfn 0x18)
		--> pte index: 0xb pte contents: (valid 0x1, pfn 0x35)
			--> Translated to Physical Address 0x6ba --> Value: 0x1e

Virtual Address 0x4546:
	--> pde index: 0x11 pde contents: (valid 0x1, pfn 0x21)
		--> pte index: 0xa pte contents: (valid 0x0, pfn 0x7f)
			--> Fault (page table entry not valid)

Virtual Address 0x2c03:
	--> pde index: 0xb pde contents: (valid 0x1, pfn 0x44)
		--> pte index: 0x0 pte contents: (valid 0x1, pfn 0x57)
			--> Translated to Physical Address 0xae3 --> Value: 0x16

Virtual Address 0x7fd7:
	--> pde index: 0x1f pde contents: (valid 0x1, pfn 0x12)
		--> pte index: 0x1e pte contents: (valid 0x0, pfn 0x7f)
			--> Fault (page table entry not valid)

Virtual Address 0x390e:
	--> pde index: 0xe pde contents: (valid 0x0, pfn 0x7f)
		--> Fault (page directory entry not valid)

Virtual Address 0x748b:
	--> pde index: 0x1d pde contents: (valid 0x1, pfn 0x0)
		--> pte index: 0x4 pte contents: (valid 0x0, pfn 0x7f)
			--> Fault (page table entry not valid)

```



（3）请基于你对原理课二级页表的理解，并参考Lab2建页表的过程，设计一个应用程序（可基于python, ruby, C, C++，LISP等）可模拟实现(2)题中描述的抽象OS，可正确完成二级页表转换。

- 程序请参考上题。


（4）假设你有一台支持[反置页表](http://en.wikipedia.org/wiki/Page_table#Inverted_page_table)的机器，请问你如何设计操作系统支持这种类型计算机？请给出设计方案。

 (5)[X86的页面结构](http://os.cs.tsinghua.edu.cn/oscourse/OS2015/lecture06#head-1f58ea81c046bd27b196ea2c366d0a2063b304ab)
--- 

## 扩展思考题

阅读64bit IBM Powerpc CPU架构是如何实现[反置页表](http://en.wikipedia.org/wiki/Page_table#Inverted_page_table)，给出分析报告。

--- 
