#!/usr/bin/python
#coding=utf-8

import sys
import random
import re
import os
import shutil
import json

reload(sys)  
sys.setdefaultencoding('utf8')


if len(sys.argv)!=2:
   print "usage:%s %s" %(sys.argv[0], "<filepath>")
   exit(-1)


try:
   for parent,dirnames,filenames in os.walk(sys.argv[1]):
        for filename in filenames:
            if re.match('^(\d+)(.md)$', filename)==None:
               continue
            else:
                result=[]
                i=0
                fr=open(parent + "/"+ filename, 'rb')
                for line in fr.readlines():
                     i=i+1
                     a={"context": line, "line":i}
                     result.append(a)
                fr.close()
                xx1=0 #多选标志
                xx2=0 #单选标志
                kn=0
                cc=0
                js=0
                nd=0
                i=''
                if len(result)<8:
                   print filename,"文件内容不完整"
                   continue
                for j in range(len(result)):
                    b=result[j]
                    if j==0:
                      if re.match('^([1-5]\n)',b["context"])==None:
                        print filename,'第',j+1,'行，题目类型出错'
                        continue
                      else:
                        i=b["context"].strip('\n')
                        continue
                    if j==1:
                      if re.match('^(- \[)|^(- \()|^(> )',b["context"])!=None:
                        print filename,'第',j+1,'行，题干有错误'
                        continue
                    
                    if re.match('^(- \[)', b["context"])!=None:
                        xx1=1
                        continue
                    if re.match('^(- \()', b["context"])!=None:
                        xx2=1
                        continue
                    if re.match('^(> 知识点：)', b["context"])!=None:
                        kn=1
                        if result[j-1]["context"]!='\n':
                           print filename,'第',j+1,'行少一个空行'
                        continue
                    if re.match('^(> 出处：)', b["context"])!=None:
                        cc=1
                        if re.match('^(> 知识点：)', result[j-1]["context"])==None:
                           print filename,'第',j+1,'少知识点'
                        continue
                    if re.match('^(> 难度：)', b["context"])!=None:
                        nd=1
                        continue
                    if re.match('^(> )', b["context"])!=None:
                       js=1


                if xx1==0 and xx2==0:
                    print filename,'没有找到选择项' 
                if xx1==1 and xx2==1:
                    print filename,'选择项内容混淆(单选和多选混淆)'      
                if kn==0:
                    print filename,'没有找到知识点'
                if cc==0:
                    print filename,'没有找到出处'
                if nd==0:
                    print filename,'没有找到难度'
                if js==0:
                    print filename,'没有找到答案解释'

                if i=='2' and xx2==1 and xx1==0:
                    print filename,'题目类型和选择项不对应(题目类型是多选，选择项是单选)'
                if i=='3' and xx1==1 and xx2==0:
                    print filename,'题目类型和选择项不对应(题目类型判断题，选择项是多选)'
                  
except Exception,e:
    print e          
