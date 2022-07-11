import RPi.GPIO as GPIO
import  time
import datetime

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(38, GPIO.IN)
GPIO.setup(40, GPIO.OUT)
GPIO.output(40,GPIO.LOW)

global PWM
global t_on
global t_off
global t_ciclo
PWM = 1
t_ciclo = 0.0090 #ciclo real de la semionda=10ms


def my_callback(channel):
	inicio_de_tiempo = time.time()
	time.sleep(t_off)
	tiempo_final = time.time()
	tiempo_transcurrido = tiempo_final - inicio_de_tiempo
	print ("transcurren segundos OFF." + str(tiempo_transcurrido))
	print (t_off)
	inicio_de_tiempo_ON = time.time()
	GPIO.output(40,GPIO.HIGH)
	time.sleep(t_on)
	tiempo_final = time.time()
	tiempo_transcurrido = tiempo_final - inicio_de_tiempo_ON
	print ("transcurren segundos ON." + str(tiempo_transcurrido))
	print (t_on)
	GPIO.output(40,GPIO.LOW)
	
	
	#print (t_on*100*100)
	#print (t_off)
	# tiempo_final = time.time()
	# tiempo_transcurrido = tiempo_final - inicio_de_tiempo
	# print ("transcurren segundos." + str(tiempo_transcurrido))
    
 
try:
    
    t_on = t_ciclo * PWM
    t_off = t_ciclo - t_on 
    
    GPIO.add_event_detect(38, GPIO.BOTH, callback=my_callback)
	
    message = input('\nPress any key to exit.\n')
    
	
 
finally:
    GPIO.cleanup()
 
print("Clean!")
