# 机试（100）

一般在当天下午1:00-5:30。（2020改为3小时，允许查看离线板子）

机试难度大约在 【**<font color=blue>提高组</font>**，**<font color=purple>省选</font>**】 之间。

一般分为：模拟题，数学题，算法题。

可用语言：c++、java、python3。

> 2019年，编译选项有g++、javac、python3。（ubuntu和windows双系统）
>
> - windows：vs2008、codeblocks、dev c++
> - ubuntu：codeblocks、vscode
>
> PS，学堂在线开了新课：[算法设计与分析](https://www.xuetangx.com/courses/course-v1:TsinghuaX+2018122106X+2018_T2/about)。

## 基本信息

### 总时间

- `2` 小时试机赛 (一般安排在上午，但是由于复试资料审查等流程，不一定会给足 `2` 小时时间)
- `30`分钟熟悉环境
- `4`小时线下正式上机 (一般安排在下午) or `3` 或 `4` 小时线上正式上机（调剂轮次的机试一般安排在线上，线上线下机试要求可见本文件夹对应pdf文件）


### 题量

`3`道题。（含签到题）

### 黑盒测试

黑盒测试，现场给出结果。

### 提交限制

2018：每题最多32次有效提交，得分取最高的一次。

2017：每道题目可以多次提交，但只有最后一次编译通过的提交算作有效提交，其他提交均不计入成绩。

## <font color=red>特别注意事项</font>

- **<font color=red>允许携带纸质资料</font>**。 （这意味着必须**提前准备模板**）
- **<font color=red>允许使用`STL`</font>**。（**S**tandard **T**emplate **L**ibrary）
- 计入`I/O`操作时间。（这意味着大量IO时必须优化）

## 测试环境

### 语言和编译器

- `C++`：GCC 5.4.0，编译选项包括-O2 和-DONLINE_JUDGE，考生可自选-
  std=c++11
- `C`：GCC 5.4.0，编译选项包括-O2 和-DONLINE_JUDGE，考生可自选-std=c11
- `Java`：OpenJDK 1.8.0

### 评测机环境

- 操作系统：Ubuntu 16.04 64-bit
- 编译器：GCC 5.4.0、OpenJDK 1.8.0

### 工作环境

- 操作系统：Windows 7 64 位
- 集成开发环境：Microsoft Visual Studio 2008, Code::Blocks 16.01, Eclipse 2.0.1

## 2020

### 网络练习赛

#### 网络练习赛须知

1. 除提交答案题或题目本身有说明的情况，评测采取黑盒测试。每道题目会准备若干组测试数据，对于每组数据分别运行你的程序并检查是否在限制的时间、空间中正确运行得到答案，机器会根据你正确的数据组数给出这道题目的得分。这意味着任何导致机器不能顺利得到正确答案的操作都会让你丢分，甚至零分，包括但不限于：输出多余信息、访问越界、空间开得过大等，因此你需要非常关注程序的正确性。 
2. 同一个选手的同一道题目的两次提交之间的时间长度不应小于 10 秒，前一次提交后 10 秒之内的提交可能会被系统忽略。 
3. 测试的时间以评测网站为准。测试结束后无法再进行提交，但之前的有效提交将会继续评测。不接受任何以时间差异为由的补交。 
4. 评测按照提交的时间顺序进行，提交结果的返回时间长度没有严格保证，与现场的提交情况和评测机和运行情况有关。按照经验，一般会在数秒至数分钟后获得结果，临近结束时可能会较慢，甚至无法在测试结束前获得结果。 
5. 你的答案通过在线评测系统提交，有效提交指可以通过编译的提交。每道题目可以进行 **32  次有效提交**，剩余提交次数结算机制为：在提交时扣减 1，在获得编译失败的评测结果后增加 1，剩余次数为 0  时不能提交。选手可在每次提交之后获得本次提交的评测结果，选手每道题目的最终得分取决于**选手这道题目所有提交中的最高分**。 
6. 选手编写的程序应该使用标准输入输出，不应该使用任何文件操作。 
7. 评测时使用的时间为 Linux 系统的 **real time**。与 user time 相比，程序的 IO  操作等将被算入运行时间。 
8. 除非题目允许，你的程序无法使用任何非常见系统调用，包括但不限于访问网络、建立新线程等，错误使用将可能被评测系统判为零分。 

#### 评测环境和评测语言

- 操作系统：Ubuntu 18.04 64-bit 
- 编译器
  - C++：GCC 7.3.0，编译选项包括-O2 和-DONLINE_JUDGE 和 -std=c++11 
  - C：GCC 7.3.0，编译选项包括-O2 和-DONLINE_JUDGE 和-std=c11 
  - Java：OpenJDK 11.0.1 
  - Python：Python2.7 以及 Pyhton3.6 只允许使用语言自带标准库 

# OJ列表

建议有机会可以参加学堂在线`Code+`比赛。

>  [**洛谷**](https://www.luogu.org/) 训练，优先解决提高组到省选的**模版题**
>
>  [2020机试OJ](http://oj.thusaac.com/#!/) 2020年机试环境
>
>  [**TsOJ**（慕课）](https://dsa.cs.tsinghua.edu.cn/oj/foyer.shtml) 校内教学
>
>  [AcWing](https://www.acwing.com/problem/search/1/?csrfmiddlewaretoken=yJvfsrzPiXIkzRaHzGoIc6ydZpSRgI0AuFGm9OxWxA8ULa8Gq8lPp1a1aC1ZAqed&search_content=%E6%B8%85%E5%8D%8E) 清华推研机试题
>
>  [N诺](http://noobdream.com/Major/school_show/) 清华往年机试题
>
>  [牛客网](https://www.nowcoder.com/kaoyan/retest/1001) 考研专题
>
>  [牛客竞赛](https://ac.nowcoder.com/)
>
>  [Code+](https://cp.thusaac.com/) 校内比赛（失效？）
>
>  **[清橙](http://www.tsinsen.com/resources.page)** 机试环境（已失效，可下载竞赛资料）
>
>  [**Virtual Judge**（中转）](https://vjudge.net/) 
>
>  [PTA -浙大](https://pintia.cn/problem-sets)  甲级比较接近机试（稍简单）
>
>  [Codeforces](http://codeforces.com/) ACM向
>
>  [Project Euler（数论专用）](https://projecteuler.net/recent) 数学题训练
>
>  [LibreOJ](https://loj.ac/) 
>
>  [HDOJ](http://acm.hdu.edu.cn/) 
>
>  [PKU_OJ](http://poj.org/) 
>
>  [LeetCode](https://leetcode.com/) 
>
>  [LintCode 领扣](https://www.lintcode.com/)
>
>  [hihoCoder](https://hihocoder.com/hiho) 
>
>  [HackerRank](https://www.hackerrank.com/) 
>
>  [AtCoder](https://atcoder.jp/) 
>
>  [UOJ](http://uoj.ac/) 
>
>  [TUOJ.首页](https://oj.thusaac.com/#!/) 
>
>  [ZOJ](http://acm.zju.edu.cn/onlinejudge/) 
>
>  [Kick Start](https://codingcompetitions.withgoogle.com/kickstart) 
>
>  [51Nod](http://www.51nod.com/focus.html) 
>
>  [OpenJudge](http://openjudge.cn/) 
>
>  [BZOJ](https://www.lydsy.com/JudgeOnline/problemset.php) 
>
>  [Topcoder](https://www.topcoder.com/) 
>
>  [BestCoder](http://bestcoder.hdu.edu.cn/) 
>
>  [algorithm](https://stackoverflow.com/questions/5799559/how-to-make-the-sequence-a-non-decreasing-sequence-with-the-minimum-number-of-st/33865020#33865020) 
>
>  [SZKOpuł（波兰OJ，质量高）](https://szkopul.edu.pl/problemset/) 
>
>  [Timus Online Judge](http://acm.timus.ru/problemset.aspx) 
>
>  [SGU](http://acm.sgu.ru/problemset.php?show_volumes) 
>
>  [CTF夺旗](https://ctf-wiki.github.io/ctf-wiki/) 
>
>  [Coderbyte（Eg初）](https://coderbyte.com/) 
>
>  [Coding Games（Eg游戏）](https://www.codingame.com/) 
>
>  [GeeksforGeeks](https://www.geeksforgeeks.org/) 

![image-20200114215448180](README/image-20200114215448180.png)

# 真题

> [Code+程序设计大赛习题讲解](http://www.xuetangx.com/courses/course-v1:xuetangx+codeplus+2019_T1/courseware/5cf3b2b837eb4e3f90641d2a208ab922/c67c968eb5914aabb36257ea30068158/) 含2017年机试
>
> [清华机试2017-2019真题](https://xuanxuanblingbling.github.io/life/study/2019/03/11/TUOJ/) 作者已被录取，[C++机试STL、树、图](https://xuanxuanblingbling.github.io/life/study/2019/03/20/STL/)，[C++机试技巧](https://xuanxuanblingbling.github.io/life/study/2019/03/20/oj/)
>
> [清华大学历年机试真题精讲](http://www.noobdream.com/Major/article/40/)
>
> [AcWing清华近年机试题库](https://www.acwing.com/problem/search/1/?csrfmiddlewaretoken=UZ0RkRdayFYeSpH3WVUTz1gKiUVY2QydpJWP1u2OHs7zXr9TELRuA3j1ObGSscKt&search_content=%E6%B8%85%E5%8D%8E)
>
> 微信小程序"水木清研" 机试训练营部分 (链接 : #小程序://清研/ZQ5kS4vGgNLZsCv )

每年真题的风格不尽相同。但是**每道题一般会存在多个考点**。

一定要对数据范围充分分析。

