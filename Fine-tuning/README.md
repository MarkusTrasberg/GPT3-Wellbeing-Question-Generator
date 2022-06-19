# Code for fine-tuning the model

The code for creating a .jsonl dataset and uploading it to GPT-3 API.

## Usage
1. Create a openaiapikey.txt file to the root directory. Paste the GPT3 API key inside of it and save.
2. Install the dependencies.
2. Run excelTool.py to generate .txt files from the Excel sheet.
3. Setup the prompt at prompt.txt
4. Run .generateQuestions.py to generate questions using the prompt. 
5. Run .generate_jsonl.py to generate the .jsonl file.
6. Run finetune.py to upload the model to OpenAI API.

## Authors
This is forked from https://github.com/daveshap/MovieScriptGenerator. Changes made by Markus Trasberg.