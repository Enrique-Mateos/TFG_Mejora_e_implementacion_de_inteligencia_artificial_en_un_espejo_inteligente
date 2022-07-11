
# def on_pushdown(channel):
	# gpio.output(40,gpio.HIGH)
	# time.sleep(0.001)

	# gpio.output(40,gpio.LOW)
	# time.sleep(0.019)
# coding=utf-8
 
import RPi.GPIO as GPIO
import datetime

import  time

inicio_de_tiempo = time.time()
    


frecuencia = 0

def my_callback(channel):
	global frecuencia
	frecuencia += 1
	
	tiempo_final = time.time() 
	tiempo_transcurrido = tiempo_final - inicio_de_tiempo
	print ("%d segundos." % (tiempo_transcurrido))
	print("Frecuencia: "  + str (frecuencia/(2*tiempo_transcurrido)) + "Hz")
    
 
try:
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(40, GPIO.IN)
    GPIO.add_event_detect(40, GPIO.RISING, callback=my_callback)

    message = input('\nPress any key to exit.\n')
    
	
 
finally:
    GPIO.cleanup()
 
print("Goodbye!")
