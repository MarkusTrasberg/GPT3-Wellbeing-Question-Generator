import openai
from time import sleep
import re
import os


with open('openaiapikey.txt', 'r') as infile:
    openai.api_key = infile.read()


## STOP is a random string to avoid random stops. 
def gpt3_completion(prompt, engine='text-davinci-002', temp=0.7, top_p=1.0, tokens=2000, freq_pen=0.0, pres_pen=0.0, stop=['inrhinrir']):
    max_retry = 5
    retry = 0
    while True:
        try:
            response = openai.Completion.create(
                engine=engine,         # use this for standard models
                #model=engine,           # use this for finetuned model
                prompt=prompt,
                temperature=temp,
                max_tokens=tokens,
                top_p=top_p,
                frequency_penalty=freq_pen,
                presence_penalty=pres_pen,
                stop=stop)
            text = response['choices'][0]['text'].strip()
            #text = re.sub('\s+', ' ', text)
            #save_gpt3_log(prompt, text)
            return text
        except Exception as oops:
            retry += 1
            if retry >= max_retry:
                return None
            print('Error communicating with OpenAI:', oops)
            sleep(1)

## MAIN
if __name__ == '__main__':
    for filename in os.listdir('covid-texts/'):
        with open('covid-texts/%s' % filename, 'r', encoding='utf-8') as infile:
            article = infile.read()
        with open('prompt.txt', 'r') as infile:
            prompt = infile.read().replace('<<TEXT>>', article)
        questions = gpt3_completion(prompt)
        new_filename = filename.replace('text', 'multipleQuestion')
        print('\n\n\n', questions)
        with open('covid-questions/%s' % new_filename, 'w', encoding='utf-8') as outfile:
            outfile.write(questions)
        # exit(0)
