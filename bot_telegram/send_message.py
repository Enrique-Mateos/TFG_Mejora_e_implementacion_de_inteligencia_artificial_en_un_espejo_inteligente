#!/usr/bin/python2.7

import telepot
import sys

bot = telepot.Bot('656511792:AAEQA26wPPa4qHv1Prt204vyum22lau9D1M')

text='** ATENCION: movimiento detectado **'
text1='Iniciando grabacion de video...'

bot.sendMessage(333190865, text)
bot.sendMessage(333190865, text1)

