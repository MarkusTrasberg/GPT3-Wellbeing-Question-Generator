import json
import os

if __name__ == '__main__':
    result = list()
    for filename in os.listdir('covid-questions/'):
        if filename.startswith('multiple'):
            with open('covid-questions/%s' % filename, 'r', encoding='utf-8') as infile:
                question = infile.read()
            info = {'prompt': 'TOPIC: Covid-19\nTYPE: Multiple choice question\n\nOUTPUT:\n', 'completion': question}
            result.append(info)
        with open('multipleChoice.jsonl', 'w') as outfile:
            for i in result:
                json.dump(i, outfile)
                outfile.write('\n')
