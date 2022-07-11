import RPi.GPIO as GPIO
import time


GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
# Setup GPIO Pins

GPIO.setup(40, GPIO.OUT)

# Set PWM instance and their frequency

pwm40 = GPIO.PWM(40, 50)

pwm40.stop()
try:
  GPIO.output(40, True)
  time.sleep(50)


finally:
  GPIO.cleanup()
 
print("Goodbye!")
