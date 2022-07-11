/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	electronOptions:{
		webPreferences: {
			webviewTag: true,
			webSecurity: false
		}
	  },
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "es",
	locale: "es-ES",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
			classes: "always"
			
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			classes: "always",
			position: "top_left"
			
		},
		{
		    module: "MMM-Tools",
		    position: 'top_center',
		    disabled:true,
		    classes: "kike",
		    config: {
		      refresh: 1000 * 5,
		      containerSize: null,
		      itemSize: null,

		    }
		  },
		{
			module: "calendar",
			header: "US Holidays",
			disabled:true,
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"
					}
				]
			}
		},
		//{
			//module: "compliments",
			//position: "lower_third"
		//},
		
		{
	      module: 'MMM-Face-Reco-DNN',
	      disabled: false,
	      config: {
		// Logout 15 seconds after user was not detecte anymore, if they will be detected between this 15 Seconds, they delay will start again
		logoutDelay: 15000,
		// How many time the recognition starts, with a RasPi 3+ it would be good every 2 seconds
		checkInterval: 2000,
		// Module set used for strangers and if no user is detected
		defaultClass: 'default',
		// Set of modules which should be shown for every user
		everyoneClass: 'everyone',
		// XML to recognize with haarcascae
		cascade: 'modules/MMM-Face-Reco-DNN/tools/haarcascade_frontalface_default.xml',
		// Pre encoded pickle with the faces
		encodings: 'modules/MMM-Face-Reco-DNN/tools/encodings.pickle',
		// You wanna use pi camera or usb / builtin (1 = raspi camera, 0 = other camera)
		usePiCamera: 0,
		// If using another type of camera, you can choose
		// i.e. 0 = /dev/video0 or 'http://link.to/live'
		source: 'http://localhost:8081',
		// Method of face detection (dnn = deep neural network, haar = haarcascade)
		method: 'dnn',
		// Which face detection model to use. "hog" is less accurate but faster on CPUs. "cnn" is a more accurate deep-learning model which is GPU/CUDA accelerated (if available).
		detectionMethod: 'hog',
		// How fast in ms should the modules hide and show (face effect)
		animationSpeed: 0,
		// Path to Python to run the face recognition (null / '' means default path)
		pythonPath: null,
		// Should shown welcome message over alert module from MagicMirror
		welcomeMessage: true,
		// Save some pictures from recognized people, if unknown we save it in folder "unknown"
		// So you can extend your dataset and retrain it afterwards for better recognitions
		extendDataset: false,
		// if extenDataset is set, you need to set the full path of the dataset
		dataset: 'modules/MMM-Face-Reco-DNN/dataset/'
	      }
	  },
	  ////fin codigo reconocimiento facial

	  //////Inicio codigo modulo reconocimiento emociones
	  {
	      module: 'MMM-Emotion-Reco-DNN',
	      disabled: false,
	      position: 'bottom_left',
	      classes: "kike",
	      config: {
		// Logout 15 seconds after user was not detecte anymore, if they will be detected between this 15 Seconds, they delay will start again
		logoutDelay: 1000,
		// How many time the recognition starts, with a RasPi 3+ it would be good every 2 seconds
		checkInterval: 500,
		// Module set used for strangers and if no user is detected
		defaultClass: 'default',
		// Set of modules which should be shown for every user
		everyoneClass: 'everyone',
		// XML to recognize with haarcascae
		cascade: 'modules/MMM-Emotion-Reco-DNN/tools/haarcascade_frontalface_default.xml',
		// Pre encoded pickle with the faces
		encodings: 'modules/MMM-Emotion-Reco-DNN/tools/encodings.pickle',
		// You wanna use pi camera or usb / builtin (1 = raspi camera, 0 = other camera)
		usePiCamera: 0,
		// If using another type of camera, you can choose
		// i.e. 0 = /dev/video0 or 'http://link.to/live'
		source: 'http://localhost:8081',
		// Method of face detection (dnn = deep neural network, haar = haarcascade)
		method: 'dnn',
		// Which face detection model to use. "hog" is less accurate but faster on CPUs. "cnn" is a more accurate deep-learning model which is GPU/CUDA accelerated (if available).
		detectionMethod: 'hog',
		// How fast in ms should the modules hide and show (face effect)
		animationSpeed: 0,
		// Path to Python to run the face recognition (null / '' means default path)
		pythonPath: null,
		// Should shown welcome message over alert module from MagicMirror
		welcomeMessage: false,
		// Save some pictures from recognized people, if unknown we save it in folder "unknown"
		// So you can extend your dataset and retrain it afterwards for better recognitions
		extendDataset: false,
		// if extenDataset is set, you need to set the full path of the dataset
		dataset: 'modules/MMM-Emotion-Reco-DNN/dataset/',
		    
		imageSize: 200,
		    
		updateInterval: 1*60*1000
		 
	      }
	  },
	  //fin codigo reconocimiento emociones
	  
	    {
		module: "MMM-UVIndex", //solo permitidas 50 peticiones diarias al servidor
		disabled: false,
		classes: "always",
		header: "Indice rayos UV - Madrid",
		position: 'bottom_left',  // This can be any of the regions. // Best results in left or right regions.
		config: {
		    latitude: 40.40, //simply Google these values for the location you are interested in knowing the UV Index
		    longitude: -3.70, 
		    accessToken: "65b5b90469bac850a28a0194e4f76414", //You can get one for free at https://www.openuv.io
		    customHeader: "Indice UltraVioleta Madrid" //Defaults to UV Index if not provided
		}
		},
	  
	  {
		module: "MMM-AirQuality",
		classes: "always",
		header: "Calidad del aire - Madrid",
		disabled: false,
		position: "top_left", // you may choose any location
		config: {
		  location: 'Madrid' // the location to check the index for
			}
		},
	  	
	  	 {
		    module: "MMM-Globe",
		    disabled: false,
		    classes: "always",
		    position: 'top_left',
		    header: "Vista desde el satelite Himawari-8",
		    config: {
			    
			    style: 'europeDiscNat',
			    imageSize: 380,
			    ownImagePath:'',
			    updateInterval: 1*60*1000
		    }
		  },
	  	
	  	{
			module: "MMM-DarkSkyForecast",
			header: "Tiempo - Madrid",
			position: "top_right",
			classes: "default everyone",
			disabled: false,
			config: {
				apikey: "92c17adf14a8f7c5e8b6443caf9e7734",
				latitude: "40.409681",
				longitude: "-3.701644",      
				iconset: "5c",
				//concise: false,
				//language: "es",
				forecastLayout: "tiled",//"tiled""table"
				units: "auto",
				//showSummary: false,
				//showForecastTableColumnHeaderIcons: false,
				//showWind: false,
				//showInlineIcons: false
				label_days: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
			}
		},
	  	
	  	{
			module: "newsfeed",
			position: "bottom_bar",
			classes: "kike",
			config: {
				feeds: [
					{
						title: "Portada de EL PAÍS",
						url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true,
				showDescription	: true,
				updateInterval: 15000,
			}
		},
	  	
	  	{
				module: 'calendar_monthly',
				position: 'top_left',
				classes: "default everyone",
				config: {
						// The config property is optional
						// Without a config, a default month view is shown
						// Please see the 'Configuration Options' section for more information
				}
		},	
		
				{
			module: 'MMM-GmailFeed',
			position: 'top_left',
			disabled: false,
			classes: "kike",
			config: {
				username: 'tfgmm2@gmail.com',
				password: 'zaqr ehkx nyhn dvrm',
				updateInterval: 60000,
				maxEmails: 8,
				maxSubjectLength: 30,
				maxFromLength: 0,
				playSound: false,
				displayMode: "table",
			}
		      },
		
			      {
		  module: 'MMM-CoinMarketCap',
		  position: "bottom_right",
		  classes: "kike",
		  disabled: false,
		  header: "Cryptocurrencies",
		  config: {
		      apiKey: '426e50e2-18d2-44d0-8e7f-3afc246bae57',
		      currencies: ['bitcoin', 'ethereum', 'litecoin', 'xrp', "stellar","bnty"],
		      view: 'graphColored',
		      conversion: 'USD',
		      showColumnHeaders: true,
		      columns: [ 'logo',"name", 'price', 'changes', 'graph' ],
		      significantDigits: 3,
		      decimalPlaces: 3,
		      fontSize: "x-small",
		      
		      // See below for more Configuration Options
            }
        },
				
		{
		  
		  module: "MMM-AVStock",
		  position: "bottom_left",
		  classes: "kike",
		  disabled: false,
		  config: {
		    apiKey : "IMAE0AP2N386JPRL",
		    timeFormat: "DD-MM HH:mm",
		    width: null,
		    classes: 'xsmall',
		    symbols : ["AAPL", "GOOGL", "TSLA"],
		    alias: ["APPLE", "GOOGLE", "TESLA"],
		    //locale: config.language,
		    tickerDuration: 20,
		    chartDays: 60,
		    maxTableRows: null,
		    mode : "table",                  // "table" or "ticker"
		    showChart: true,
		    pureLine: false,
		    chartWidth: null,
		    showVolume: true,
		    chartInterval: "daily",          // choose from ["intraday", "daily", "weekly", "monthly"]
		    movingAverage: {
			type: 'SMA',
			periods: [200]
		    },
		    decimals : 2,
		    chartType: 'line',                // 'line', 'candlestick', or 'ohlc'
		    chartLineColor: '#eee',
		    chartLabelColor: '#eee',
		    coloredCandles: true,
		    debug: false,
		    showPurchasePrices: false,
		    showPerformance2Purchase: false,
		    
		    
		  }
		},
		
		    {
			module: "MMM-GroveGestures",
			position: "bottom_right",
			classes: "always",
			disabled: false,
			config: {
			  autoStart: true, //When Mirror starts, recognition will start.
			  verbose:false, // If set as `true`, useful messages will be logged.
			  recognitionTimeout: 1000, //Gesture sequence will be ended after this time from last recognized gesture.
			  cancelGesture: "WAVE", //If set, You can cancel gesture sequence with this gesture.
			  visible: true, //Recognized gesture sequence will be displayed on position

			  idleTimer: 1000*60*30, // `0` for disable, After this time from last gesture, onIdle will be executed.
			  onIdle: { // See command section
			    moduleExec: {
			      module: [],
			      exec: (module, gestures) => {
				module.hide(1000, null, {lockstring:"GESTURE"})
			      }
			    }
			  },
			  onDetected: {
			    notificationExec: {
			      notification: "GESTURE_DETECTED",
			    },
			    /* You can make Mirror to wake up the modules which were hidden by onIdle with any gestures.
			    moduleExec: {
			      module: [],
			      exec: (module) => {
				module.show(1000, null, {lockstring:"GESTURE"})
			      }
			    }
			    */
			  },

			  gestureMapFromTo: { //When your sensor is installed with rotated direction, you can calibrate with this.
			    "Up": "DOWN",
			    "Down": "UP",
			    "Left": "RIGHT",
			    "Right": "LEFT",
			    "Forward": "FORWARD",
			    "Backward": "BACKWARD",
			    "Clockwise": "CLOCKWISE",
			    "anti-clockwise": "ANTICLOCKWISE",
			    "wave": "WAVE"
			  },

			  defaultNotification: "GESTURE",
			  pythonPath: "/usr/bin/python3", // your python path

			  defaultCommandSet: "default",
			  commandSet: {
			    "default": {
			      
			      "UP":{
				shellExec: "node /home/pi/nodetest/ON.js",
				
			      },
			      
			      "DOWN": {
				shellExec: "node /home/pi/nodetest/OFF.js",
			      
			      },
			      "CLOCKWISE": {
				moduleExec: {
				  module: [],
				  exec: (module, gestures) => {
				    module.hide(1000, null, {lockstring:"GESTURE"})
				  }
				}
			      },
			      "ANTICLOCKWISE": {
				moduleExec: {
				  module: [],
				  exec: (module, gestures) => {
				    module.show(1000, null, {lockstring:"GESTURE"})
				  }
				}
			      },
			      "LEFT": {
				notificationExec: {
				  notification: "PAGE_DECREMENT",
				  payload: null,
				}
			      },
			      "RIGHT": {
				notificationExec: {
				  notification: "PAGE_INCREMENT",
				  payload: null,
				}
			      },
			    },
			  },
			}
		      },
		
		{
		  module: "MMM-page-indicator", //importante posicionarlo antes de MMM-pages para el correcto conteo de paginas 
		  position: 'bottom_bar',
		  classes: "default everyone",
		  disabled: false,
		  config: {
			  //activeBright: true,
			  //inactiveDimmed: true,
			  //pages: 4,
		      }
	      },

	      {
		module: "MMM-pages",
		disabled: false,
		//position: 'bottom_bar',
		//classes: "default everyone",
		config: {
			modules:
			    [["MMM-DarkSkyForecast", "newsfeed", "calendar_monthly",'MMM-GmailFeed','MMM-Emotion-Reco-DNN'],
			     ["MMM-AirQuality", "MMM-UVIndex", "MMM-DarkSkyForecast", "MMM-Globe"],
			     ["MMM-CoinMarketCap","MMM-AVStock"]],
			fixed: ["MMM-GroveGestures","clock", 
			 "MMM-page-indicator", "alert",
			  "updatenotification", "MMM-Tools"],
			hiddenPages: {
			    "screenSaver": [ , ],
			    "admin": [ , ],
			    
			      }
		      }
		  },
		
	{
        module: 'MMM-WebHookAlerts',   
        disabled:false,     
        position: 'fullscreen_above',
         //header: "Mensajes Telegram", Se enviara como metadato desde el bot de telegram
        config: {
                fadeSpeed: 30,
		displaySeconds:120,
		sound:"twip.wav",
		templates:
		[

		{
			templateName: "SimpleAlert",
			template: "{{message}}",
			title  : "{{title}}", //Fallo en la mayuscula de la t T->t
			displaySeconds:60,
			fadeSpeed:10,
			sound:"wobble.wav",
		}
		]    
        }
    },
	
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
