#!bin/python
# coding:utf-8
# author: luofuwen

import codecs
import os
import argparse
import sys
import json
import re


def debug_print(dictObj):
    print json.dumps(dictObj, ensure_ascii=False, indent=4)


class ParseException(Exception):
    pass


class InvailExerciseException(Exception):
    pass


class ExerciseChecker:
    def __init__(self):
        self.ignoreWarning = False
        pass

    def checkJsonData(self, jsonData):
        typeStr = jsonData['type']
        jsonData['status'] = 'ok'
        if typeStr in ['single_answer', 'true_false']:
            if not len(jsonData['answer']) == 1:
                if self.ignoreWarning:
                    jsonData['status'] = 'error'
                else:
                    raise InvailExerciseException('invail json [type=%s] [answer=%s]' % (typeStr, jsonData['answer'].strip()))
        elif typeStr == 'multi_answer':
            if not len(jsonData['answer']) in range(1, 6):
                if self.ignoreWarning:
                    jsonData['status'] = 'error'
                else:
                    raise InvailExerciseException('invail json [type=%s] [answer=%s]' % (typeStr, jsonData['answer'].strip()))
        elif typeStr in ['question_answer', 'fill_in_the_blank']:
            if jsonData['answer'].strip() == u'解释' or not jsonData['answer'].strip():  # 这是一个特殊处理，因为很多题目的答案只有"解释"
                if self.ignoreWarning:
                    jsonData['status'] = 'error'
                else:
                    raise InvailExerciseException('invail json [type=%s] [answer=%s]' % (typeStr, jsonData['answer'].strip()))
        else:
            raise InvailExerciseException('invail json [type=%s]' % typeStr)


class Md2jsonParser:
    TYPE_DEF = {
        1: 'single_answer',
        2: 'multi_answer',
        3: 'true_false',
        4: 'question_answer',
        5: 'fill_in_the_blank',
    }

    def __init__(self, srcDir, dstDir, ignoreWarning=False):
        self.checker = ExerciseChecker()
        self.checker.ignoreWarning = ignoreWarning
        self.srcDir = srcDir
        self.dstDir = dstDir
        self.successCount = 0
        self.warningCount = 0
        self.failureCount = 0
        pass

    def reportStatus(self):
        print 'Done! %d success, %d warning, %d failed' % (self.successCount, self.warningCount, self.failureCount)

    def saveData(self, filePath, data):
        output = codecs.open(filePath, 'w', "utf-8")
        try:
            output.write(data)
        finally:
            output.close()

    # 遍历目录,寻找.md文件,然后进行转换
    def doParse(self):
        for parent, dirnames, filenames in os.walk(self.srcDir):
            for filename in filenames:
                filePath = os.path.join(parent, filename)
                match = re.search('([0-9]+)\.md$', str(filePath))
                if not match:
                    continue
                try:
                    tmpDict = self.md2dict(filePath)
                    tmpDict['q_number'] = int(match.group(1))
                    jsonStr = self.dict2json(tmpDict)

                    # 根据分类创建目录
                    # typeStr = self.TYPE_DEF[tmpDict['type']]
                    # dstPath = os.path.join(self.dstDir, typeStr, "%d.json" % tmpDict["q_number"])
                    # dstDir = os.path.dirname(dstPath)

                    # 根据原来的目录格式创建新目录
                    dstPath = os.path.join(self.dstDir, filePath.strip(self.srcDir))
                    dstPath = os.path.splitext(dstPath)[0] + '.json'
                    dstDir = os.path.dirname(dstPath)

                    if not os.path.exists(dstDir):
                        os.makedirs(dstDir)
                    self.saveData(dstPath, jsonStr)
                except InvailExerciseException as e:
                    print u'Warning: %s [filePath=%s]' % (e, filePath)
                    self.warningCount += 1
                except Exception as e:
                    print u'Error: %s [filePath=%s]' % (e, filePath)
                    self.failureCount += 1
                else:
                    self.successCount += 1

    # 把dict转换为json格式的字符串
    def dict2json(self, dictData):
        jsonStr = ''
        try:
            jsonData = {
                'q_number': dictData['q_number'],
                'type': self.TYPE_DEF[dictData['type']],
                'question': dictData['question'],
                'degree_of_difficulty': dictData['degree_of_difficulty'],
                'source': dictData['source'],
                'knowledge': dictData['knowledge'],
                'explain': dictData['explain']
            }
            if dictData['type'] in [1, 2, 3]:
                jsonData['answer'] = ''.join(dictData['markedOption'])
                jsonData['options'] = dictData['options']
            else:
                jsonData['answer'] = dictData['explain']
            self.checker.checkJsonData(jsonData)
            jsonStr = json.dumps(jsonData, ensure_ascii=False, indent=4, separators=(',', ':'))
        except KeyError as e:
            raise ParseException('key "%s" not found' % e)
        return jsonStr

    # 把md格式的文件转换为dict返回
    def md2dict(self, filePath):
        mdFile = codecs.open(filePath, encoding='utf-8')
        mdData = {}
        try:
            mdContent = mdFile.readlines()
            typeNo = self.mdParseType(mdData, mdContent)
            self.mdParseQuestion(mdData, mdContent)
            if typeNo in [1, 2, 3]:
                self.mdParseOptionAndAnswer(mdData, mdContent)
            else:
                self.mdEatOneLine(mdContent)
            self.mdParseExtraInfo(mdData, mdContent)
        finally:
            mdFile.close()
        return mdData

    # 处理空行
    def mdEatEmptyLine(self, mdContent):
        while not mdContent[0].strip():
            mdContent.pop(0)
        return True

    # 跳过一行
    # 该函数用于处理填空题的选项部分
    def mdEatOneLine(self, mdContent):
        mdContent.pop(0)

    # 解析题目类型,返回1-5的数值,表示题目类型
    # 题目类型为单独的一行,仅有一个数字
    def mdParseType(self, mdData, mdContent):
        self.mdEatEmptyLine(mdContent)
        line = mdContent.pop(0)
        typeNo = int(line)
        if typeNo not in range(1, 6):
            raise ParseException('parse type error [typeNo=%d]' % typeNo)
        mdData['type'] = typeNo
        return typeNo

    # 解析题干
    # 题干只有一行? 有一些题干有多行
    def mdParseQuestion(self, mdData, mdContent):
        self.mdEatEmptyLine(mdContent)
        question = ''
        while not re.match('^-\s*[\[\(][\ x][\)\]]', mdContent[0].strip()):
            question += mdContent.pop(0)
        mdData['question'] = question

    # 解析题目中的图片
    # md 中的图片格式 ![](url)
    def mdParseImage(self, mdData, mdContent):
        self.mdEatEmptyLine(mdContent)
        line = mdContent[0].strip()
        imageUrl = []
        while line.startswith('![]'):
            regx = '!\[\]\((.+)\)'
            match = re.search(regx, line)
            if not match:
                raise ParseException('parse image error [line=%s]' % line)
            imageUrl.append(match.group(1))
            mdContent.pop(0)
            if len(mdContent) == 0:
                break
            line = mdContent[0].strip()
        mdData['imageUrl'] = imageUrl

    # 解析选项和答案
    # 选项有若干行,标记有'x'的选项是正确选项
    def mdParseOptionAndAnswer(self, mdData, mdContent):
        self.mdEatEmptyLine(mdContent)
        line = mdContent[0].strip()
        options = []
        markedOption = []
        while line.startswith('-'):
            regx = '-\s?[\(\[]([\ x])[\)\]]\s([A-Z])\s*\.\s*(.+)'
            match = re.search(regx, line)
            if not match:
                raise ParseException('parse option error [line=%s]' % line)
            options.append('%s.%s' % (match.group(2).strip(), match.group(3).strip()))
            if match.group(1) == 'x':
                markedOption.append(match.group(2))
            mdContent.pop(0)
            if len(mdContent) == 0:
                break
            line = mdContent[0].strip()
        mdData['options'] = options
        mdData['markedOption'] = markedOption

    # 解析题目的额外信息
    # 包括知识点,出处,难度等
    def mdParseExtraInfo(self, mdData, mdContent):
        self.mdEatEmptyLine(mdContent)
        line = mdContent[0]
        explain = ''
        while line.strip().startswith('>'):
            regx = u'>\s*([^：]+)：(\S+)。?'  # 注意左边的字符串中冒号和句号是在中文状态下输入的
            match = re.search(regx, line)
            if match:
                infoKey = match.group(1).strip()
                infoValue = match.group(2).strip()
                if infoKey == u'知识点':
                    # raise ParseException('parse extra info error: unkown key [key=%s]' % infoKey)
                    mdData['knowledge'] = [infoValue.strip(u'。')]  # 这里的句号在中文状态输入
                elif infoKey == u'出处':
                    mdData['source'] = infoValue
                elif infoKey == u'难度':
                    mdData['degree_of_difficulty'] = int(infoValue)
                else:
                    # 若冒号左边不是上述的值，则把其当作解释的一部分
                    # 这样处理是为了解决上述正则表达式的一个特例
                    explain += line[2:] + '\n'  # 处理前面的>和空格
            else:
                explain += line[2:] + '\n'
            mdContent.pop(0)
            if len(mdContent) == 0:
                break
            line = mdContent[0].strip()
        mdData['explain'] = explain

if __name__ == '__main__':
    argParser = argparse.ArgumentParser(description='convert exercise file from .md to .json')
    argParser.add_argument('--ignore-warning', action='store_true', help='convert the excercise file witch has warnings')
    argParser.add_argument('src', help='.md file directory, convert all the md file in this directory')
    argParser.add_argument('dst', nargs='?', help='.json file directory, all .json file will be create here,\
            if src is not a directory, this option will be ignore')
    args = argParser.parse_args()
    parser = Md2jsonParser(args.src, args.dst, args.ignore_warning)
    if args.dst is None:
        tmp = parser.md2dict(sys.argv[2])
        debug_print(tmp)
        print 70 * '='
        print parser.dict2json(tmp)
    else:
        parser.doParse()
        parser.reportStatus()
