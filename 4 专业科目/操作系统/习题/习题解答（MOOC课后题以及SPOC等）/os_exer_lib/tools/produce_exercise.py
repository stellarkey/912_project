#!/usr/bin/python
#coding=utf-8

import sys
import random
import re
import os
from optparse import OptionParser

reload(sys)  
sys.setdefaultencoding('utf8') 

editor='''<div class="active-code">
<textarea rows="10" cols="80"></textarea>
<div><input class="action-submit" type="submit" value="提交"/></div>
</div>'''

editor1='<div><input class="action-submit" type="submit" value="提交"/></div>'


usage="usage: %prog DIRECTORY [options]"
parse = OptionParser(usage=usage)
#parse.add_option("-p", "--path", default="", help="题库目录", action="store", type="string", dest="path")
parse.add_option("-s", "--single", default="", help="单选题数量", action="store", type="string", dest="single")
parse.add_option("-m", "--multiple", default="", help="多选题数量", action="store", type="string", dest="multiple")
parse.add_option("-j", "--judge", default="", help="判断题数量", action="store", type="string", dest="judge")
parse.add_option("-f", "--fill", default="", help="填空题数量", action="store", type="string", dest="fill")
parse.add_option("-q", "--question", default="", help="问答题数量", action="store", type="string", dest="question")

(options, args)=parse.parse_args()

if len(sys.argv)<2:
   print "missing operand"
   print "Try --help for more information."
   exit(-1)


def mkdir(path):
    isexist=os.path.exists('test/'+path)
    if not isexist:
       os.makedirs('test/'+path)



#各种类型题目总数量list
xz_list=[]
dzd_list=[]
pd_list=[]
tk_list=[]
wd_list=[]

#随机挑选出来的题目list
number_xz=[]
number_dzd=[]
number_pd=[]
number_tk=[]
number_wd=[]

for parent,dirnames,filenames in os.walk(sys.argv[1]):
   for filename in filenames:
      #print filename
      #print parent
      if re.match('^(\d+)(.md)$', filename)==None:
          continue
      fr=open(sys.argv[1]+'/'+filename, 'rb')
      line=fr.readline()
      #print line
      if line == '1\n':
         xz_list.append(filename)
      if line == '2\n':
         dzd_list.append(filename)
      if line == '3\n':
         pd_list.append(filename)
      if line == '5\n':
         tk_list.append(filename)
      if line == '4\n':
         wd_list.append(filename)
      fr.close()


print "xz:",len(xz_list)
print "dzd:",len(dzd_list)
print "pd",len(pd_list)
print "tk",len(tk_list)
print "wd",len(wd_list) 



if options.single!='':
  if int(options.single)>len(xz_list):
     print "单选题数量大于总数量" 
     exit(-1)
  else:
     number_xz=random.sample(xz_list, int(options.single))

if options.multiple!='':
  if int(options.multiple)>len(dzd_list):
     print "多选题数量大于总数量" 
     exit(-1)
  else:
     number_dzd=random.sample(dzd_list, int(options.multiple))

if options.judge!='':
  if int(options.judge)>len(pd_list):
     print "判断题数量大于总数量" 
     exit(-1)
  else:
     number_pd=random.sample(pd_list, int(options.judge))

if options.fill!='':
  if int(options.fill)>len(tk_list):
     print "填空题数量大于总数量" 
     exit(-1)
  else:
     number_tk=random.sample(tk_list, int(options.fill))

if options.question!='':
  if int(options.question)>len(wd_list):
     print "问答题数量大于总数量" 
     exit(-1)
  else:
     number_wd=random.sample(wd_list, int(options.question))  




mkdir('test')
fsj=open('test/SUMMARY.md', 'wb')

fsj.write('#sj\n')

print number_xz
print number_dzd
print number_pd
print number_tk
print number_wd


if len(number_xz)!=0:
  for j in range(len(number_xz)):
   fxz=open(sys.argv[1]+'/'+ number_xz[j], 'rb')
   text=fxz.read()
   text=re.sub('^([12345]\n)', '', text)
   tihao=re.sub('.md', '', number_xz[j])
   mkdir('xz'+str(tihao))
   f=open('test/xz'+str(tihao)+'/'+str(tihao)+'.md', 'wb')
   fsj.write('* [xz'+str(tihao)+'](xz' + str(tihao)+'/'+str(tihao)+'.md)')
   fsj.write('\n')
   f.write('---\n')
   f.write(text)
   f.write('\n')
   fxz.close()
   f.write('---\n')
   f.close()
#fsj.write('#填空题\n')

if len(number_dzd)!=0:
  for j in range(len(number_dzd)):
   fxz=open(sys.argv[1]+'/'+ number_dzd[j], 'rb')
   text=fxz.read()
   text=re.sub('^([12345]\n)', '', text)
   tihao=re.sub('.md', '', number_dzd[j])
   mkdir('dzd'+str(tihao))
   f=open('test/dzd'+str(tihao)+'/'+str(tihao)+'.md', 'wb')
   fsj.write('* [dzd'+str(tihao)+'](dzd' + str(tihao)+'/'+str(tihao)+'.md)')
   fsj.write('\n')
   f.write('---\n')
   f.write(text)
   f.write('\n')
   fxz.close()
   f.write('---\n')
   f.close()

if len(number_pd)!=0:
  for j in range(len(number_pd)):
   fxz=open(sys.argv[1]+'/'+ number_pd[j], 'rb')
   text=fxz.read()
   text=re.sub('^([12345]\n)', '', text)
   tihao=re.sub('.md', '', number_pd[j])
   mkdir('pd'+str(tihao))
   f=open('test/pd'+str(tihao)+'/'+str(tihao)+'.md', 'wb')
   fsj.write('* [pd'+str(tihao)+'](pd' + str(tihao)+'/'+str(tihao)+'.md)')
   fsj.write('\n')
   f.write('---\n')
   f.write(text)
   f.write('\n')
   fxz.close()
   f.write('---\n')
   f.close()

if len(number_tk)!=0:
  for k in range(len(number_tk)):
   #fsj.write(str(x)+'.')
   ftk=open(sys.argv[1]+'/'+ number_tk[k], 'rb')
   text=ftk.read()
   text=re.sub('^([12345]\n)', '', text)
   text=re.sub('^(> )', '', text, flags=re.M)
   tihao=re.sub('.md', '', number_tk[k])
   mkdir('tk'+str(tihao))
   f=open('test/tk'+str(tihao)+'/'+str(tihao)+'.md', 'wb')
   fa=open('test/tk'+str(tihao)+'/'+str(tihao)+'_answer.md', 'wb')
   fsj.write('* [tk'+str(tihao)+'](tk' + str(tihao)+'/'+str(tihao)+'.md)')
   fsj.write('\n')
   index=text.find('- [x] ')
   f.write(text[:index])
   #editor1=editor.replace('{1}', 'tk'+str(tihao))
   f.write(editor1)
   fa.write(text[index+9:])
   #text=re.sub('- \[x\] ', editor, text,  flags=re.M)
   #print text
   #fsj.write(text)
  # fsj.write('\n')
   f.close()
   fa.close()
   ftk.close()
  


if len(number_wd)!=0:
  for l in range(len(number_wd)):  
   fwd=open(sys.argv[1]+'/'+ number_wd[l], 'rb')
   text=fwd.read()
   text=re.sub('^([12345]\n)', '', text)
   text=re.sub('^(> )', '', text, flags=re.M)
   tihao=re.sub('.md', '', number_wd[l])
   mkdir('wd'+str(tihao))
   f=open('test/wd'+str(tihao)+'/'+str(tihao)+'.md', 'wb')
   fa=open('test/wd'+str(tihao)+'/'+str(tihao)+'_answer.md', 'wb')
   fsj.write('* [wd'+str(tihao)+'](wd' + str(tihao)+'/'+str(tihao)+'.md)')
   fsj.write('\n')
   index=text.find('- [x] ')
   f.write(text[:index])
   #editor2=editor.replace('{1}', 'wd'+str(tihao))
   f.write(editor)
   fa.write(text[index+9:])
   #text=re.sub('^(- \[x\] )', editor, text, flags=re.M)
   #fsj.write(text)
  # fsj.write('\n')
   fwd.close()
   f.close()
   fa.close()

fsj.close()
