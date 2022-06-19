import os
import sys

from api import GPT, Example, UIConfig
from api import demo_web_app

# Construct GPT object and show some examples
gpt = GPT(engine="text-davinci-002", temperature=0.7)

# gpt.add_example(Example("answers: nut, bark", "clue: tree"))
# gpt.add_example(Example("answers: trick, spells, wizard, enchanted, mystic", "clue: magic"))
# gpt.add_example(Example("answers: football, soccer, rugby, tennis", "clue: sport"))
# gpt.add_example(Example("answers: yarn, shoe, knit, stocking", "clue: sock"))


config = UIConfig()

demo_web_app(gpt)