__author__ = 'zhangyanni'

# -*- coding:UTF-8 -*-
import codecs
import json
import os
import os.path
#遍历所有的以md格式存储的文件（即遍历题库）
def walk_md_list():

    file_dir="G:\GitHub\os_course_exercise_library\\"
    for i in range(1,16):
        fileDir=file_dir+str(i)
        for parent,dirnames,filenames in os.walk(fileDir):
            for filename in filenames:
                fileName=os.path.join(parent,filename)
                #调用md2json函数把当前文件转换为json格式存储
                json_data=md2json(fileName)
                #新建目录并保存
                dir_new=os.path.join(r"G:\md2json",str(i))
                if(os.path.exists(dir_new) is not True):
                    os.makedirs(dir_new)
                (shortname,extension) = os.path.splitext(filename)
                saveFile(dir_new,shortname,json_data)


#把md格式的文件转化为定义好的json数据格式存储
def md2json(file_name):
    fileObj=codecs.open(file_name, encoding='utf-8')
    #转化后的结果保存在result字典中
    #options: 键options的值是可选项列表
    #question:键question的值是题干
    #answer:键answer的值是参考答案
    #type:键type的是值是题目类型
    result={}
    result["options"]=""
    result["question"]=""
    try:
        num=1
        answer=""
        #按行读文件 line_num:行号，value:本行内容
        for (line_num,value) in enumerate(fileObj):
            #由第一行获得文件类型
            if(line_num==0):
                type_num=value
                result["type"]=value
            #'-'开头的行代表的是选项的内容
            elif value[0]=='-':
                result["options"]+=value[5:]
            #第一个 '>'代表的是知识点;第二个'>'代表的是题目来源;第三个'>'代表的是难度;'>'第四个代表的是答案
            elif(value[0]=='>'):
                if(num==1):
                    result["knowledge"]=value[6:]
                elif (num==2):
                    result["source"]=value [5:]
                elif(num==3):
                    result["degree_of_difficulty"]=value [5:]
                elif(num==4):
                    #单选和判断
                    if (int(type_num)==1or int(type_num)==3):
                        for i in value[2:3]:
                            if i.isupper():
                                answer+=i
                        break
                    #多选
                    elif(int(type_num)==2):
                        for i in value[2:6]:
                            if (i.isupper()):
                                answer+=i
                            elif (i.isspace()):
                                break
                    #问答
                    else:
                        answer=value[2:len(value)-2]
                    result["answer"]=answer

                num+=1
            #题干
            else:
                result["question"]+=value
        #把dict转化为json对象
        result_jsonObj=json.dumps(result)
        #处理中文
        data=json.loads(result_jsonObj)
        json_data=json.dumps(data,ensure_ascii=False)
        return json_data
    except:
        print "cannot read!"
    finally:
        fileObj.close()

def saveFile(file_path,file_name,data):
    output = codecs.open(file_path+"\\"+file_name+".json",'w',"utf-8")
    output.write(data)
    output.close()


if __name__ == '__main__':
    walk_md_list()









