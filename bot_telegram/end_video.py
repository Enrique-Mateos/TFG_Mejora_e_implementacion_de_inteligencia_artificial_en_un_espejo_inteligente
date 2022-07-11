#!/usr/bin/python2.7

import telepot
import sys

bot = telepot.Bot('656511792:AAEQA26wPPa4qHv1Prt204vyum22lau9D1M')

text='Grabacion video finalizada, puede visualizarla escribiendo /video'

bot.sendMessage(333190865, text)
