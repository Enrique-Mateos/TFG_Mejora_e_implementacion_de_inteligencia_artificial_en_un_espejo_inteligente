import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
# Setup GPIO Pins

GPIO.setup(40, GPIO.OUT)

# Set PWM instance and their frequency

pwm40 = GPIO.PWM(40, 50)

pwm40.stop()
GPIO.output(40, False)
GPIO.cleanup()
