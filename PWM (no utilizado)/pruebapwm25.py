import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

# Setup GPIO Pins

GPIO.setup(40, GPIO.OUT)

# Set PWM instance and their frequency

pwm35 = GPIO.PWM(40, 100)

# Start PWM with 50% Duty Cycle

pwm35.start(0)

try:
  while True:
    for dutyCycle in range (0, 100, 1):
      
      pwm35.ChangeDutyCycle(100-dutyCycle)
      time.sleep(0.01)

    for dutyCycle in range (100, 0, -1):
     
      pwm35.ChangeDutyCycle(100-dutyCycle)
      time.sleep(0.01)



except KeyboardInterrupt:

  pwm35.stop()

# Cleans the GPIO
GPIO.cleanup()
