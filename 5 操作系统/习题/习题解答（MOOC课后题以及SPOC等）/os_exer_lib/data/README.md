# 说明

## 文件夹结构
- `json/`文件夹下用于保存json格式的题目数据
  - 由于部分题目未提供答案，因此未产生题目数据
- `markdown/`文件夹下用于保存原始的md格式备份
- `md/`文件夹下用于保存json转换为md的结果

## md2json.py 说明
执行命令完成转换*(要求Phthon2.7)*

```$ python md2json.py markdown/ json/```

更多帮助

```$ python md2json.py -h```

## json2md.py说明
执行命令完成转换*(要求python2.7)*

```$ python json2md.py json/ md/```

## Json格式说明

|字段|说明|备注|
|---|---|---|
|knowledge|知识点,为字符串数组|必选|
|degree_of_difficulty|难度,为1～5的数字|必选|
|explain|答案解释,对于填空题和问答题,答案和解释相同|可选|
|question|题干正文|必选|
|source|题目来源|必选|
|answer|答案,对于选择题则是由大写字母组成的字符串|必选|
|type|题目类型,单选题`single_answer`,多选题`multi_answer`,判断题`true_false`,问答题`question_qnswer`,填空题`fill_in_the_blank`|必选|
|option|题目选项,字符串数组,每个字符串代表一个选项,选项编号和选项内容以`.`隔开|选择题必选,填空题非必选|
|q_number|题号|必选|

### 实例
```
{
    "knowledge":[
        "操作系统概述"
    ],
    "degree_of_difficulty":1,
    "explain":"ABC 操作系统是一种软件，特定指是系统软件，其更功能是管理计算机资源，让用户和应用程序更方便高效地使用计算机。\n以ucore OS为例，其实没有用户程序，操作系统也可以正常运行。所以选项4是不对的。\n",
    "question":"关于操作系统，说法正确的是（）\n",
    "source":"网络",
    "answer":"ABC",
    "type":"multi_answer",
    "options":[
        "A.操作系统属于软件",
        "B.操作系统负责资源管理",
        "C.操作系统使计算机的使用更加方便",
        "D.操作系统必须要有用户程序才能正常启动"
    ],
    "q_number":1160
}
```

```
{
    "knowledge":[
        "操作系统概述"
    ],
    "degree_of_difficulty":1,
    "question":"操作系统的基本特征一般包括：______________ 、共享、虚拟、异步性。\n",
    "source":"网络",
    "answer":"并发\n",
    "type":"fill_in_the_blank",
    "q_number":520
}
```
