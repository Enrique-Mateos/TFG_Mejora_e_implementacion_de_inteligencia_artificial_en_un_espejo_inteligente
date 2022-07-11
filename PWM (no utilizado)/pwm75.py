import RPi.GPIO as GPIO
import  time

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(38, GPIO.IN)
GPIO.setup(40, GPIO.OUT)
GPIO.output(40,GPIO.LOW)

global PWM
global t_on
global t_off
global t_ciclo
PWM = 0.75
t_on = 0
t_off = 0
t_ciclo = 0.0095

def my_callback(channel):
	GPIO.output(40,GPIO.HIGH)
	time.sleep(t_on)
	
	GPIO.output(40,GPIO.LOW)
	time.sleep(t_off)
	print (t_on*100*100)
    
 
try:
    
    t_on = t_ciclo * PWM
    t_off = t_ciclo - t_on - 0.001
    GPIO.add_event_detect(38, GPIO.FALLING, callback=my_callback)

    message = input('\nPress any key to exit.\n')
    
	
 
finally:
    GPIO.cleanup()
 
print("Goodbye!")
