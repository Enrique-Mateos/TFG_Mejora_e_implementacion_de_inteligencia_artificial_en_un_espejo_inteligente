# USAGE
# python pi_face_recognition.py --cascade haarcascade_frontalface_default.xml --encodings encodings.pickle

# import the necessary packages
from imutils.video import FPS, VideoStream
from datetime import datetime
import face_recognition
import argparse
import imutils
import pickle
import time
import cv2
import json
import sys
import signal
import os
import numpy as np

# To properly pass JSON.stringify()ed bool command line parameters, e.g. "--extendDataset"
# See: https://stackoverflow.com/questions/15008758/parsing-boolean-values-with-argparse
def str2bool(v):
    if isinstance(v, bool):
       return v
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        raise argparse.ArgumentTypeError('Boolean value expected.')

def printjson(type, message):
	print(json.dumps({type: message}))
	sys.stdout.flush()

def signalHandler(signal, frame):
	global closeSafe
	closeSafe = True

signal.signal(signal.SIGINT, signalHandler)
closeSafe = False

# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-c", "--cascade", type=str, required=False, default="haarcascade_frontalface_default.xml",
	help = "path to where the face cascade resides")
ap.add_argument("-e", "--encodings", type=str, required=False, default="encodings.pickle",
	help="path to serialized db of facial encodings")
ap.add_argument("-p", "--usePiCamera", type=int, required=False, default=1,
	help="Is using picamera or builtin/usb cam")
ap.add_argument("-s", "--source", required=False, default=0,
	help="Use 0 for /dev/video0 or 'http://link.to/stream'")
ap.add_argument("-r", "--rotateCamera", type=int, required=False, default=1,
	help="rotate camera")
ap.add_argument("-m", "--method", type=str, required=False, default="dnn",
	help="method to detect faces (dnn, haar)")
ap.add_argument("-d", "--detectionMethod", type=str, required=False, default="hog",
	help="face detection model to use: either `hog` or `cnn`")
ap.add_argument("-i", "--interval", type=int, required=False, default=2000,
	help="interval between recognitions")
ap.add_argument("-o", "--output", type=int, required=False, default=1,
	help="Show output")
ap.add_argument("-eds", "--extendDataset", type=str2bool, required=False, default=False,
	help="Extend Dataset with unknown pictures")
ap.add_argument("-ds", "--dataset", required=False, default="../dataset/",
	help="path to input directory of faces + images")
ap.add_argument("-t", "--tolerance", type=float, required=False, default=0.6,
	help="How much distance between faces to consider it a match. Lower is more strict.")
args = vars(ap.parse_args())

# load the known faces and embeddings along with OpenCV's Haar
# cascade for face detection
printjson("status", "loading encodings + face detector...")
data = pickle.loads(open(args["encodings"], "rb").read())
detector = cv2.CascadeClassifier(args["cascade"])

# initialize the video stream and allow the camera sensor to warm up
printjson("status", "starting video stream...")

if args["source"].isdigit():
    src = int(args["source"])
else:
    src = args["source"]

if args["usePiCamera"] >= 1:
	vs = VideoStream(usePiCamera=True, rotation=args["rotateCamera"]).start()
else:
	vs = VideoStream(src=src).start()
time.sleep(2.0)

# variable for prev names
prevNames = []

# create unknown path if needed
if args["extendDataset"] is True:
	unknownPath = os.path.dirname(args["dataset"] + "unknown/")
	try:
			os.stat(unknownPath)
	except:
			os.mkdir(unknownPath)

tolerance = float(args["tolerance"])

# start the FPS counter
fps = FPS().start()

# loop over frames from the video file stream
while True:
	# grab the frame from the threaded video stream and resize it
	# to 500px (to speedup processing)
	originalFrame = vs.read()
	frame = imutils.resize(originalFrame, width=500)

	if args["method"] == "dnn":
		# load the input image and convert it from BGR (OpenCV ordering)
		# to dlib ordering (RGB)
		rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
		# detect the (x, y)-coordinates of the bounding boxes
		# corresponding to each face in the input image
		boxes = face_recognition.face_locations(rgb,
			model=args["detectionMethod"])
	elif args["method"] == "haar":
		# convert the input frame from (1) BGR to grayscale (for face
		# detection) and (2) from BGR to RGB (for face recognition)
		gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

		# detect faces in the grayscale frame
		rects = detector.detectMultiScale(gray, scaleFactor=1.1,
			minNeighbors=5, minSize=(30, 30),
			flags=cv2.CASCADE_SCALE_IMAGE)

		# OpenCV returns bounding box coordinates in (x, y, w, h) order
		# but we need them in (top, right, bottom, left) order, so we
		# need to do a bit of reordering
		boxes = [(y, x + w, y + h, x) for (x, y, w, h) in rects]

	# compute the facial embeddings for each face bounding box
	encodings = face_recognition.face_encodings(rgb, boxes)
	names = []
	minDistance = 0.0

	# loop over the facial embeddings
	for encoding in encodings:
		# compute distances between this encoding and the faces in dataset
		distances = face_recognition.face_distance(data["encodings"], encoding)

		# the smallest distance is the closest to the encoding
		minDistance = min(distances)

		# save the name if the distance is below the tolerance
		if minDistance < tolerance:
			idx = np.where(distances == minDistance)[0][0]
			name = data["names"][idx]

		else:
			name = "unknown"

		# update the list of names
		names.append(name)
		
        #INICIO codigo acciones en funcion de emocion detectada
		if name == "unknown":
			printjson("status", "mi desconocido")
		elif name == "Enfado":
			printjson("status", "mi enfado")
		elif name == "Neutral":
			printjson("status", "mi neutral")
		elif name == "Sorpresa":
			printjson("status", "mi sorpresa")
		elif name == "Felicidad":
			printjson("status", "mi felicidad")

        #FIN codigo acciones en funcion de emocion detectada

	
	# update the FPS counter
	fps.update()
	
	logins = []
	logouts = []
	for n in names:
		logins.append(n) # agregamos lo identificado a logins
	
	if not logins:  # Comprobamos si la lista logins esta vacia
		logins.append("noface") #Agregamos noface a la misma
		
	if len(logins) > 1: # Comprobamos si longitud vector logins es >1
		if "unknown" in logins:
			logins.remove("unknown") #eliminamos unknown de la lista
			if len(logins) > 1: # Comprobamos si longitud vector logins es >1
				if "unknown" in logins:
					logins.remove("unknown") #eliminamos unknown de la lista
					if len(logins) > 1: # Comprobamos si longitud vector logins es >1
						if "unknown" in logins:
							logins.remove("unknown") #eliminamos unknown de la lista
			
	# ~ printjson("status", len(logins))#DEBUG 	longitus vector logins
	# ~ printjson("status", "componentes logins: ")	#DEBUG Revisar usuarios agregados al vector logins
	# ~ printjson("status", logins)	#DEBUG Revisar usuarios agregados al vector logins	
	


	# send inforrmation to prompt, only if something has changes
	if (logins.__len__() > 0):
		printjson("login", {"names": logins})



	time.sleep(args["interval"] / 1000)

# stop the timer and display FPS information
fps.stop()
printjson("status", "elasped time: {:.2f}".format(fps.elapsed()))
printjson("status", "approx. FPS: {:.2f}".format(fps.fps()))

# do a bit of cleanup
cv2.destroyAllWindows()
vs.stop()
