var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

var LED = new Gpio(21, 'out'); //use GPIO pin 4, and specify that it is output

LED.writeSync(0); //set pin state to 1 (turn LED on)


