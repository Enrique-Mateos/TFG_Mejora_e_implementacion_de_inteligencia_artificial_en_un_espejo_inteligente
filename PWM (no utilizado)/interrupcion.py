import signal
import sys
import time 

import RPi.GPIO as GPIO
import BUTTON.GPIO as GPIO

INT_GPIO = 13

def signal_handler(sif, frame):
    GPIO.cleanup()
    sys.exit(0)

def int_activated_callback(channel):
    print("INT activated")

if __name__ == '__main__':
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(INT_GPIO, GPIO.FALLING, callback=int_activated_callback, bouncetime=1000)
    signal.signal(signal.SIGINT, signal_handler)
    while 1:
        print ("Work")
        time.sleep(0.1)
