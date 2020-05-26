#!bin/python
# coding:utf-8
# author: luofuwen

import codecs
import os
import sys
import json
import re
import argparse


def debug_print(dictObj):
    print json.dumps(dictObj, ensure_ascii=False, indent=4)


class ParseException(Exception):
    pass


class Json2mdParser:
    TYPE_DEF = {
        'single_answer': 1,
        'multi_answer': 2,
        'true_false': 3,
        'question_answer': 4,
        'fill_in_the_blank': 5,
    }

    def __init__(self, srcDir, dstDir):
        self.srcDir = srcDir
        self.dstDir = dstDir

    def saveData(self, filePath, data):
        output = codecs.open(filePath, 'w')
        try:
            output.write(data)
        finally:
            output.close()

    def parser(self, src, dst):
        jsonFile = codecs.open(src, encoding='utf-8')
        try:
            jsonData = eval(jsonFile.read())
            if (jsonData['status'] != 'ok'):
                raise Exception(u'unexcepted status \'%s\', status should be \'ok\'' % jsonData['status'])

                return
            mdData = self.json2md(jsonData)
            self.saveData(dst, mdData)
        except Exception as e:
            print u'Error: %s [filePath=%s]' % (e, src)
        finally:
            jsonFile.close()

    def doParser(self):
        for parent, dirnames, filenames in os.walk(self.srcDir):
            for filename in filenames:
                filePath = os.path.join(parent, filename)
                match = re.search('([0-9]+)\.json$', str(filePath))
                if not match:
                    continue
                jsonFile = codecs.open(filePath, encoding='utf-8')
                try:
                    jsonData = eval(jsonFile.read())
                    if (jsonData['status'] != 'ok'):
                        print u'Warning: skip error json [filePath=%s]' % filePath
                        continue
                    mdData = self.json2md(jsonData)

                    # 根据分类创建目录
                    # typeStr = jsonData['type']
                    # dstPath = os.path.join(self.dstDir, typeStr, "%d.md" % jsonData["q_number"])
                    # dstDir = os.path.dirname(dstPath)

                    # 根据原来的目录格式创建新目录
                    dstPath = os.path.join(self.dstDir, filePath.strip(self.srcDir))
                    dstPath = os.path.splitext(dstPath)[0] + '.md'
                    dstDir = os.path.dirname(dstPath)

                    if not os.path.exists(dstDir):
                        os.makedirs(dstDir)
                    self.saveData(dstPath, mdData)
                except Exception as e:
                    print u'Error: %s [filePath=%s]' % (e, filePath)
                finally:
                    jsonFile.close()
        pass

    def json2md(self, jsonData):
        mdData = ''
        typeNo = self.TYPE_DEF[jsonData['type']]
        mdData += '%d\n' % typeNo
        mdData += jsonData['question']
        if 'options' in jsonData:
            for opt in jsonData['options']:
                mdData += self.parseOpt(mdData, opt, jsonData)
        else:
            mdData += '- [x]\n'
        mdData += '\n'
        mdData += '知识点:%s\n' % ','.join(jsonData['knowledge'])
        mdData += '出处:%s\n' % jsonData['source']
        mdData += '难度:%d\n' % jsonData['degree_of_difficulty']
        if 'explain' in jsonData:
            for line in jsonData['explain'].strip().split('\n'):
                mdData += '> %s\n' % line
        return mdData

    def parseOpt(self, mdData, opt, jsonData):
        typeNo = int(self.TYPE_DEF[jsonData['type']])
        answer = jsonData['answer']
        sign = opt.split('.')[0]
        if typeNo in [1, 3]:
            return '- (%s) %s\n' % ('x' if sign in answer else ' ', opt)
        elif typeNo in [2]:
            return '- [%s] %s\n' % ('x' if sign in answer else ' ', opt)


if __name__ == '__main__':
    argParser = argparse.ArgumentParser(description='convert exercise file from .json to .md')
    argParser.add_argument('-f', action='store_true', help='convert file')
    argParser.add_argument('src', help='.json file or drectory')
    argParser.add_argument('dst', help='.md file or drectory')
    args = argParser.parse_args()
    if args.f is None:
        parser = Json2mdParser(args.src, args.dst)
        parser.doParser()
    else:
        parser = Json2mdParser(None, None)
        parser.parser(args.src, args.dst)
