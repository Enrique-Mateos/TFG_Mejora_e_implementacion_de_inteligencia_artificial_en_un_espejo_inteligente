#!/usr/bin/python2.7

import datetime
import telepot
import time
import requests
import os
import glob
import re
import requests
from telepot.loop import MessageLoop


def webcontrol(chat_id, type, cmd):
    req = 'http://localhost:8082/0/'+type+'/'+cmd
    res = requests.get(req)
    bot.sendMessage(chat_id, res.text)

def handle(msg):
    chat_id = msg['chat']['id']
    command = msg['text']
    #should work thanks to Winston
    if msg['from']['id'] != 333190865:
        bot.sendMessage(chat_id, "Disculpe, solo puedo responder al usuario del espejo inteligente.")
        exit(1)

    print ('Got command: %s' % command)

    if command == '/snapshot':
        requests.get('http://localhost:8082/0/action/snapshot')
        time.sleep(5)
        bot.sendPhoto(333190865,photo=open('/home/pi/motion/captures/lastsnap.jpg','rb'), caption='ultima captura - '+str(datetime.datetime.now()))
    elif command == '/status':
        webcontrol(chat_id, 'detection', 'status')
    elif command == '/check':
        webcontrol(chat_id, 'detection', 'connection')
    elif command == '/pause':
        webcontrol(chat_id, 'detection', 'pause')
        bot.sendMessage(chat_id, "Sistema de deteccion DESACTIVADO")
        #req = 'http://localhost:8082/0/detection/pause'
        #requests.get(req)
    elif command == '/resume':
        webcontrol(chat_id, 'detection', 'start')
        bot.sendMessage(chat_id, "Sistema de deteccion ACTIVADO")
        #req = 'http://localhost:8082/0/detection/start'
        #requests.get(req)
    elif command == '/time':
        bot.sendMessage(chat_id, 'now is '+str(datetime.datetime.now()))
    elif command == '/video':
        # the most recent video in this particular folder of complete vids
        video = max(glob.iglob('/home/pi/motion/captures/*.mkv'), key=os.path.getctime)
        # send video, adapt the the first argument to your own telegram id
        bot.sendVideo(333190865, video=open(video, 'rb'), caption='Ultimo video - '+str(datetime.datetime.now()))
    elif command == '/help':
        bot.sendMessage(chat_id, "funciones: /snapshot, /status, /pause, /resume, /check, /time, /video, /borrar_videos, /borrar_fotos, /enviar_all_videos, /enviar_all_pics, /apagar_espejo, /mensaje")
    elif command == '/start':
        bot.sendMessage(chat_id, "Hola, soy el bot del espejo inteligente, para saber que puedo hacer por ti escribe /help")
    elif command == '/borrar_fotos':
        archivosBorrados = []
        for archivo_jpg in glob.glob('/home/pi/motion/captures/*.jpg'): 
            archivosBorrados.append(archivo_jpg)
            os.unlink(archivo_jpg)  
        if archivosBorrados != []:
            bot.sendMessage(chat_id,'Imagenes eliminadas: '+str(archivosBorrados))
        else:
            bot.sendMessage(chat_id,'No hay imagenes que eliminar')               
    elif command == '/borrar_videos':
        archivosBorrados = []
        for archivo_mkv in glob.glob('/home/pi/motion/captures/*.mkv'): 
            archivosBorrados.append(archivo_mkv)
            os.unlink(archivo_mkv)  
        if archivosBorrados != []:
            bot.sendMessage(chat_id,'Videos eliminados: '+str(archivosBorrados))
        else:
            bot.sendMessage(chat_id,'No hay videos que eliminar')
    
    elif command == '/enviar_all_pics':
        archivosAlmacenados = []
        i=0
        for archivo_jpg in glob.glob('/home/pi/motion/captures/*.jpg'): 
            archivosAlmacenados.append(archivo_jpg)
            bot.sendPhoto(333190865,photo=open(archivosAlmacenados[i],'rb'), caption=archivosAlmacenados[i])
            #bot.sendMessage(chat_id,archivosAlmacenados[i])
            #bot.sendMessage(chat_id,i)
            i=i+1
    elif command == '/enviar_all_videos':
        archivosAlmacenados = []
        i=0
        for archivo_mkv in glob.glob('/home/pi/motion/captures/*.mkv'): 
            archivosAlmacenados.append(archivo_mkv)
            bot.sendVideo(333190865,video=open(archivosAlmacenados[i],'rb'), caption=archivosAlmacenados[i])
            #bot.sendMessage(chat_id,archivosAlmacenados[i])
            #bot.sendMessage(chat_id,i)
            i=i+1
    elif command == '/apagar_espejo':
        bot.sendMessage(chat_id, "Apagando sistema...")
        os.system('sudo shutdown now')
    elif '/mensaje' in command:
        message = re.sub ("/mensaje","",command)
        print ("mensaje en comando %s" % message)
        datos = {'Content-Type' : 'aplication/json' , 'message' : message, 'title' : 'Mensaje de Telegram'}
        resp = requests.post("http://localhost:8080/webhook?templateName=SimpleAlert" , data=datos)
        bot.sendMessage(chat_id,"Mensaje: '" + message + "' enviado con exito")
    else:
        bot.sendMessage(chat_id, "Comando desconocido: "+command+", para conocer los comandos disponibles escriba /help ")
# adapt the following to the bot_id:bot_token
bot = telepot.Bot('656511792:AAEQA26wPPa4qHv1Prt204vyum22lau9D1M')

MessageLoop(bot, handle).run_as_thread()
print ('I am listening ...')

while 1:
    time.sleep(10)
