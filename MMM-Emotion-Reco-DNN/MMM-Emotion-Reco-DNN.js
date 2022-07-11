/* Magic Mirror
 * Module: MMM-Emotion-Reco-DNN
 *
 * 
 */
 
 // Promise based image loader with error handling
const loadImage1 = src =>
  new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve({ image, isError: false });
    image.onerror = () => resolve({ image, isError: true });
    image.src = src;
  });
'use strict';
// Store last successfully loaded image in case the next one fails to load
let successfullyLoadedImageWrapper1 = null;


Module.register('MMM-Emotion-Reco-DNN', {
  defaults: {
    // Logout 15 seconds after user was not detecte anymore, if they will be detected between this 15
    // Seconds, they delay will start again
    logoutDelay: 15000,
    // How many time the recognition starts, with a RasPi 3+ it would be good every 2 seconds
    checkInterval: 2000,
    // Module set used for when there is no face detected ie no one is in front of the camera
    noFaceClass: 'noface',
    // Module set used for when there is an unknown/unrecognised face detected 
    unknownClass: 'unknown',
    // Module set used for when there is a known/recognised face detected 
    knownClass: 'known',
    // Module set used for strangers and if no user is detected
    defaultClass: 'default',
    // Set of modules which should be shown for any user ie when there is any face detected
    everyoneClass: 'everyone',
    // Set of modules that are always shown - show if there is a face or no face detected
    alwaysClass: 'always',
    // xml to recognize with haarcascae
    cascade:
      'modules/MMM-Emotion-Reco-DNN/tools/haarcascade_frontalface_default.xml',
    // pre encoded pickle with the faces
    encodings: 'modules/MMM-Emotion-Reco-DNN/tools/encodings.pickle',
    // You wanna use pi camera or usb / builtin (1 = raspi camera, 0 = other camera)
    usePiCamera: 1,
    // if you don't use the pi camera, which stream do you want to use
    source: 0,
    // rotate camera?
    rotateCamera: 0,
    // method of face recognition (dnn = deep neural network, haar = haarcascade)
    method: 'dnn',
    // which face detection model to use. "hog" is less accurate but faster on CPUs. "cnn" is a more accurate
    // deep-learning model which is GPU/CUDA accelerated (if available). The default is "hog".
    detectionMethod: 'hog',
    // how fast in ms should the modules hide and show (face effect)
    animationSpeed: 0,
    // Path to Python to run the face recognition (null / '' means default path)
    pythonPath: null,
    // Boolean to toggle welcomeMessage
    welcomeMessage: true,
    // Save some pictures from recognized people, if unknown we save it in folder "unknown"
    // So you can extend your dataset and retrain it afterwards for better recognitions
    extendDataset: false,
    // if extenDataset is set, you need to set the full path of the dataset
    dataset: 'modules/MMM-Emotion-Reco-DNN/dataset/',
    // How much distance between faces to consider it a match. Lower is more strict.
    tolerance: 0.6,
    // allow multiple concurrent user logins, 0=no, any other number is the maximum number of concurrent logins
    multiUser: 0,
    // turn on extra debugging 0=no, 1=yes
    debug: 0,
    imageSize: 600,
    ownImagePath: "",
    updateInterval: 10 * 60 * 1000  // 10 minutes
    
  },

  timouts: {},
  users: [],
  userClasses: [],
  
  // ----------------------------------------------------------------------------------------------------
  start: function() {
    this.sendSocketNotification('CONFIG', this.config);
    Log.log('Starting module: ' + this.name);

   
    self = this;
    this.src = "file:////home/pi/MagicMirror/modules/MMM-Emotion-Reco-DNN/Emojis/desconocido.jpg";

  },
  
       
  
  getStyles: function() {
    return ["MMM-Emo.css"];
  },

  getDom: async function() {
    const { image, isError } = await loadImage1(this.src);

   
      // If the image loaded show it
      var wrapper1 = document.createElement("div");
      image.className = "MMM-Emo-image";
      image.width = this.config.imageSize.toString();
      image.height = this.config.imageSize.toString();
      wrapper1.appendChild(image);
      successfullyLoadedImageWrapper1 = wrapper1;
      return wrapper1;
    
  },
  


 
  // ----------------------------------------------------------------------------------------------------
  socketNotificationReceived: function(notification, payload) {
    var self = this;
    var user;
    //~ console.error("ESTAMOS EN SOCKETnotificacionsocket");
    //~ // somebody has logged in
    if (payload.action === 'login') {
      var loginCount=0;
      for (user of payload.users) {
        if (user != null) {
          
          // if there are currently no users logged in OR we allow multiple users
          this.config.debug && Log.log('Number of logged in users:' + this.users.length + ', Allowed Number of Users:' + this.config.multiUser);
          if (this.users.length === 0 || this.users.length < this.config.multiUser) {
            // check if the user is already logged in
            if (!this.users.includes(user)) {
              // run the login procedure
              //~ this.login_user(user);
              // increment the counter
              loginCount++;
            } else {
              this.config.debug && Log.log('Detected ' + user + ' again.');
            }
          } else {
            this.config.debug && Log.log('Detected a login event for ' + user + ' but multiple concurrent logins is limited to ' + this.config.multiUser +  ' and ' + this.users + ' is already logged in.');
          }

          // clear any timeouts the user might have so that they stay logged in
          if (this.timouts[user] != null) {
            this.config.debug && Log.log('Clearing timeouts for ' + user);
            this.config.debug && Log.log('Remaining timeouts BEFORE:')
            this.config.debug && Log.log(this.timouts);
            clearTimeout(this.timouts[user]);
            this.config.debug && Log.log('Remaining timeouts AFTER:')
            this.config.debug && Log.log(this.timouts);
          }
        }
      }

    } 
      
   
    if(user==='Felicidad'){
      this.src = "file:////home/pi/MagicMirror/modules/MMM-Emotion-Reco-DNN/Emojis/felicidad.jpg";
    }
    else if(user==='Neutral'){
      this.src = "file:////home/pi/MagicMirror/modules/MMM-Emotion-Reco-DNN/Emojis/neutral.jpg";
    }
    else if(user==='Enfado'){
      this.src = "file:////home/pi/MagicMirror/modules/MMM-Emotion-Reco-DNN/Emojis/enfado.jpg";
    }
    else if(user==='Sorpresa'){
      this.src = "file:////home/pi/MagicMirror/modules/MMM-Emotion-Reco-DNN/Emojis/sorpresa.jpg";
    }
    else if(user==='Tristeza'){
      this.src = "file:////home/pi/MagicMirror/modules/MMM-Emotion-Reco-DNN/Emojis/tristeza.jpg";
    }
    else if(user==='unknown' || user=== 'noface')
      this.src = "file:////home/pi/MagicMirror/modules/MMM-Emotion-Reco-DNN/Emojis/desconocido.jpg";
    
       //~ console.error("notificacionsocket" + user);
       //~ console.error(this.src);
       this.updateDom();// actualiza el objeto DOM
  },
  notificationReceived: function(notification, payload, sender) {
    var self = this;
    //~ console.error("ESTAMOS EN notificacionsocket");
   
  },
  
  
});
