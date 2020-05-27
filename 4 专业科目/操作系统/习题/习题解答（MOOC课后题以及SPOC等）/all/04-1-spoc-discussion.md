#lec8 虚拟内存spoc练习


NOTICE
- 有"w4l2"标记的题是助教要提交到学堂在线上的。
- 有"w4l2"和"spoc"标记的题是要求拿清华学分的同学要在实体课上完成，并按时提交到学生对应的git repo上。
- 有"hard"标记的题有一定难度，鼓励实现。
- 有"easy"标记的题很容易实现，鼓励实现。
- 有"midd"标记的题是一般水平，鼓励实现。


## 个人思考题

### 内存访问局部性的应用程序例子
---
(1)(w4l2)下面是一个体现内存访问局部性好的简单应用程序例子，请参考，在linux中写一个简单应用程序，体现内存局部性差，并给出其执行时间。
```
#include <stdio.h>
#define NUM 1024
#define COUNT 10
int A[NUM][NUM];
void main (void) {
  int i,j,k;
  for (k = 0; k<COUNT; k++)
  for (i = 0; i < NUM; i++)
  for (j = 0; j	 < NUM; j++)
      A[i][j] = i+j;
  printf("%d count computing over!\n",i*j*k);
}
```
可以用下的命令来编译和运行此程序：
```
gcc -O0 -o goodlocality goodlocality.c
time ./goodlocality
```
可以看到其执行时间。

> 执行上述代码的输出为
```
0.01s user 0.01s system 42% cpu 0.039 total
```

> 改成如下的程序
```
#include <stdio.h>
#define NUM 1024
#define COUNT 10
int A[NUM][NUM];
void main (void) {
  int i,j,k;
  for (k = 0; k<COUNT; k++)
  for (j = 0; j  < NUM; j++)
  for (i = 0; i < NUM; i++)
      A[i][j] = i+j;
  printf("%d count computing over!\n",i*j*k);
}
```

> 输出为
```
0.18s user 0.00s system 93% cpu 0.193 total
```

> 可以看到依据空间局部性对数据进行访问可以大幅度节省时间开销。

## 小组思考题目
----

### 缺页异常嵌套

（1）缺页异常可用于虚拟内存管理中。如果在中断服务例程中进行缺页异常的处理时，再次出现缺页异常，这时计算机系统（软件或硬件）会如何处理？请给出你的合理设计和解释。

### 缺页中断次数计算
（2）如果80386机器的一条机器指令(指字长4个字节)，其功能是把一个32位字的数据装入寄存器，指令本身包含了要装入的字所在的32位地址。这个过程最多会引起几次缺页中断？
> 提示：内存中的指令和数据的地址需要考虑地址对齐和不对齐两种情况。需要考虑页目录表项invalid、页表项invalid、TLB缺失等是否会产生中断？

### 虚拟页式存储的地址转换

（3）(spoc) 有一台假想的计算机，页大小（page size）为32 Bytes，支持8KB的虚拟地址空间（virtual address space）,有4KB的物理内存空间（physical memory），采用二级页表，一个页目录项（page directory entry ，PDE）大小为1 Byte,一个页表项（page-table entries
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
VALID==1表示，表示映射存在；VALID==0表示，表示内存映射不存在（有两种情况：a.对应的物理页帧swap out在硬盘上；b.既没有在内存中，页没有在硬盘上，这时页帧号为0x7F）。
PFN6..0:页帧号或外存中的后备页号
PT6..0:页表的物理基址>>5
```

已经建立好了1个页目录表和8个页表，且页目录表的index为0~7的页目录项分别对应了这8个页表。

在[物理内存模拟数据文件](./04-1-spoc-memdiskdata.md)中，给出了4KB物理内存空间和4KBdisk空间的值，PDBR的值。

请回答下列虚地址是否有合法对应的物理内存，请给出对应的pde index, pde contents, pte index, pte contents，the value of addr in phy page OR disk sector。
```
Virtual Address 6653:
Virtual Address 1c13:
Virtual Address 6890:
Virtual Address 0af6:
Virtual Address 1e6f:
```

**提示:**
```
页大小（page size）为32 Bytes(2^5)
页表项1B

8KB的虚拟地址空间(2^13)
一级页表：2^5
PDBR content: 0xd80（1101_100 0_0000, page 0x6c）

page 6c: e1(1110 0001) b5(1011 0101) a1(1010 0001) c1(1100 0001)
         b3(1011 0011) e4(1110 0100) a6(1010 0110) bd(1011 1101)
二级页表：2^5
页内偏移：2^5

4KB的物理内存空间（physical memory）(2^12)
物理帧号：2^7

Virtual Address 0330(0 00000 11001 1_0000):
  --> pde index:0x0(00000)  pde contents:(0xe1, 11100001, valid 1, pfn 0x61(page 0x61))
  page 6c: e1 b5 a1 c1 b3 e4 a6 bd 7f 7f 7f 7f 7f 7f 7f 7f
           7f 7f 7f 7f 7f 7f 7f 7f 7f 7f 7f 7f 7f 7f 7f 7f
  page 61: 7c 7f 7f 4e 4a 7f 3b 5a 2a be 7f 6d 7f 66 7f a7
           69 96 7f c8 3a 7f a5 83 07 e3 7f 37 62 30 7f 3f 
    --> pte index:0x19(11001)  pte contents:(0xe3, 1 110_0011, valid 1, pfn 0x63)
  page 63: 16 00 0d 15 00 1c 1d 16 02 02 0b 00 0a 00 1e 19
           02 1b 06 06 14 1d 03 00 0b 00 12 1a 05 03 0a 1d
      --> To Physical Address 0xc70(110001110000, 0xc70) --> Value: 02

Virtual Address 1e6f(0 001_11 10_011 0_1111):
  --> pde index:0x7(00111)  pde contents:(0xbd, 10111101, valid 1, pfn 0x3d)
  page 6c: e1 b5 a1 c1 b3 e4 a6 bd 7f 7f 7f 7f 7f 7f 7f 7f
           7f 7f 7f 7f 7f 7f 7f 7f 7f 7f 7f 7f 7f 7f 7f 7f
  page 3d: f6 7f 5d 4d 7f 04 29 7f 1e 7f ef 51 0c 1c 7f 7f
           7f 76 d1 16 7f 17 ab 55 9a 65 ba 7f 7f 0b 7f 7f 
    --> pte index:0x13  pte contents:(0x16, valid 0, pfn 0x16)
  disk 16: 00 0a 15 1a 03 00 09 13 1c 0a 18 03 13 07 17 1c 
           0d 15 0a 1a 0c 12 1e 11 0e 02 1d 10 15 14 07 13
      --> To Disk Sector Address 0x2cf(0001011001111) --> Value: 1c
```

> 代码如下：

```
PDE_BASE = 0xd80

def read_storage(filename):
    mem = []
    for line in open(filename):
        inputs = line.strip().split(':')[1].strip().split()
        for cont in inputs: mem.append(int(cont, 16))
    return mem

def get_cont(base, index, mem):
    return mem[base + index]

def handle_virtual(va):
    print 'Virtual Address 0x%x:' %va

    mem = read_storage('memory.in')
    disk = read_storage('disk.in')

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
        if phys_base != 0x7f:
            disk_content = get_cont(phys_base << 5, offset, disk)
            print '\t\t\t--> Translated to Disk Address 0x%x --> Value 0x%x' % ((phys_base << 5) + offset, disk_content)
        else:
            print '\t\t\t -> Fault (page table entry not valid)'
        return

    phys_content = get_cont(phys_base << 5, offset, mem)
    print '\t\t\t--> Translated to Physical Address 0x%x --> Value: 0x%x' % ((phys_base << 5) + offset, phys_content)

if __name__ == '__main__':
    for line in open('request.in'):
        handle_virtual(int(line.strip().split()[2], 16))
```

> 输出的结果为

```
Virtual Address 0x6653:
	--> pde index: 0x19 pde contents: (valid 0x0, pfn 0x7f)
		--> Fault (page directory entry not valid)
Virtual Address 0x1c13:
	--> pde index: 0x7 pde contents: (valid 0x1, pfn 0x3d)
		--> pte index: 0x0 pte contents: (valid 0x1, pfn 0x76)
			--> Translated to Physical Address 0xed3 --> Value: 0x12
Virtual Address 0x6890:
	--> pde index: 0x1a pde contents: (valid 0x0, pfn 0x7f)
		--> Fault (page directory entry not valid)
Virtual Address 0xaf6:
	--> pde index: 0x2 pde contents: (valid 0x1, pfn 0x21)
		--> pte index: 0x17 pte contents: (valid 0x0, pfn 0x7f)
			 -> Fault (page table entry not valid)
Virtual Address 0x1e6f:
	--> pde index: 0x7 pde contents: (valid 0x1, pfn 0x3d)
		--> pte index: 0x13 pte contents: (valid 0x0, pfn 0x16)
			--> Translated to Disk Address 0x2cf --> Value 0x1c
```

> 此代码在之前作业的基础上进行修改，增加了第二级页表中VALID位的判断。当第二级页表不合法时，根据页帧号的内容判断该页在外存中还是不存在。

## 扩展思考题
---
(1)请分析原理课的缺页异常的处理流程与lab3中的缺页异常的处理流程（分析粒度到函数级别）的异同之处。

(2)在X86-32虚拟页式存储系统中，假定第一级页表的起始地址是0xE8A3 B000，进程地址空间只有第一级页表的4KB在内存。请问这4KB的虚拟地址是多少？它对应的第一级页表项和第二级页表项的物理地址是多少？页表项的内容是什么？

