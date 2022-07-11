#!/usr/bin/python2.7

import telepot
import sys

bot = telepot.Bot('656511792:AAEQA26wPPa4qHv1Prt204vyum22lau9D1M')

pic = sys.argv[1]

# change caption if it is a snapshot or motion
if pic.endswith("snapshot.jpg"):
    cap = 'snapshot'
else:
    cap = 'motion detected'

bot.sendPhoto(333190865, photo=open(pic, 'rb'), caption=cap)

exit(0)

