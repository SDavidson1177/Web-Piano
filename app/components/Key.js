import React from 'react';
import Keyboard from './Keyboard.js';

//Global variables for state of the app
	//state of the mouse
var mouseIsDown = false;

document.onmousedown = function (){
	mouseIsDown = true;
}

document.onmouseup = function (){
	mouseIsDown = false;
}

//Live Instrument Variables
if (typeof(Storage) !== "undefined") {
    window.sessionStorage.webSynthMasterVolume = 0.9;
	window.sessionStorage.webSynthUpdateVolume = false;
} else {
    alert("As a result of your browser not supporting session storage, this synth will not function properly.");
}

var masterRelease = 0.5;

//colours for the piano keys
const whiteKeyShades = ["#FFFFF2", "#D1D1D1", "#2CF22C"];
const blackKeyShades = ["#000000", "#1C1C1C", "#2CF22C"];
var shadeIndex = 0;

//Sounds of the piano
var piano = [new Pz.Sound('../app/Data/Samples/PianoA0.mp3'), new Pz.Sound('../app/Data/Samples/PianoAS0.mp3'), new Pz.Sound('../app/Data/Samples/PianoB0.mp3'), new Pz.Sound('../app/Data/Samples/PianoC1.mp3'), new Pz.Sound('../app/Data/Samples/PianoCS1.mp3'), new Pz.Sound('../app/Data/Samples/PianoD1.mp3'), new Pz.Sound('../app/Data/Samples/PianoDS1.mp3'), new Pz.Sound('../app/Data/Samples/PianoE1.mp3')
, new Pz.Sound('../app/Data/Samples/PianoF1.mp3'), new Pz.Sound('../app/Data/Samples/PianoFS1.mp3'), new Pz.Sound('../app/Data/Samples/PianoG1.mp3'), new Pz.Sound('../app/Data/Samples/PianoGS1.mp3'), new Pz.Sound('../app/Data/Samples/PianoA1.mp3')
, new Pz.Sound('../app/Data/Samples/PianoAS1.mp3'), new Pz.Sound('../app/Data/Samples/PianoB1.mp3'), new Pz.Sound('../app/Data/Samples/PianoC2.mp3'), new Pz.Sound('../app/Data/Samples/PianoCS2.mp3'), new Pz.Sound('../app/Data/Samples/PianoD2.mp3')
, new Pz.Sound('../app/Data/Samples/PianoDS2.mp3'), new Pz.Sound('../app/Data/Samples/PianoE2.mp3'), new Pz.Sound('../app/Data/Samples/PianoF2.mp3'), new Pz.Sound('../app/Data/Samples/PianoFS2.mp3'), new Pz.Sound('../app/Data/Samples/PianoG2.mp3')
, new Pz.Sound('../app/Data/Samples/PianoGS2.mp3'), new Pz.Sound('../app/Data/Samples/PianoA2.mp3'), new Pz.Sound('../app/Data/Samples/PianoAS2.mp3'), new Pz.Sound('../app/Data/Samples/PianoB2.mp3'), new Pz.Sound('../app/Data/Samples/PianoC3.mp3')
, new Pz.Sound('../app/Data/Samples/PianoCS3.mp3'), new Pz.Sound('../app/Data/Samples/PianoD3.mp3'), new Pz.Sound('../app/Data/Samples/PianoDS3.mp3'), new Pz.Sound('../app/Data/Samples/PianoE3.mp3'), new Pz.Sound('../app/Data/Samples/PianoF3.mp3')
, new Pz.Sound('../app/Data/Samples/PianoFS3.mp3'), new Pz.Sound('../app/Data/Samples/PianoG3.mp3'), new Pz.Sound('../app/Data/Samples/PianoGS3.mp3'), new Pz.Sound('../app/Data/Samples/PianoA3.mp3'), new Pz.Sound('../app/Data/Samples/PianoAS3.mp3')
, new Pz.Sound('../app/Data/Samples/PianoB3.mp3'), new Pz.Sound('../app/Data/Samples/PianoC4.mp3'), new Pz.Sound('../app/Data/Samples/PianoCS4.mp3'), new Pz.Sound('../app/Data/Samples/PianoD4.mp3'), new Pz.Sound('../app/Data/Samples/PianoDS4.mp3')
, new Pz.Sound('../app/Data/Samples/PianoE4.mp3'), new Pz.Sound('../app/Data/Samples/PianoF4.mp3'), new Pz.Sound('../app/Data/Samples/PianoFS4.mp3'), new Pz.Sound('../app/Data/Samples/PianoG4.mp3'), new Pz.Sound('../app/Data/Samples/PianoGS4.mp3')
, new Pz.Sound('../app/Data/Samples/PianoA4.mp3'), new Pz.Sound('../app/Data/Samples/PianoAS4.mp3'), new Pz.Sound('../app/Data/Samples/PianoB4.mp3'), new Pz.Sound('../app/Data/Samples/PianoC5.mp3'), new Pz.Sound('../app/Data/Samples/PianoCS5.mp3')
, new Pz.Sound('../app/Data/Samples/PianoD5.mp3'), new Pz.Sound('../app/Data/Samples/PianoDS5.mp3'), new Pz.Sound('../app/Data/Samples/PianoE5.mp3'), new Pz.Sound('../app/Data/Samples/PianoF5.mp3'), new Pz.Sound('../app/Data/Samples/PianoFS5.mp3')
, new Pz.Sound('../app/Data/Samples/PianoG5.mp3'), new Pz.Sound('../app/Data/Samples/PianoGS5.mp3'), new Pz.Sound('../app/Data/Samples/PianoA5.mp3'), new Pz.Sound('../app/Data/Samples/PianoAS5.mp3'), new Pz.Sound('../app/Data/Samples/PianoB5.mp3')
, new Pz.Sound('../app/Data/Samples/PianoC6.mp3'), new Pz.Sound('../app/Data/Samples/PianoCS6.mp3'), new Pz.Sound('../app/Data/Samples/PianoD6.mp3'), new Pz.Sound('../app/Data/Samples/PianoDS6.mp3'), new Pz.Sound('../app/Data/Samples/PianoE6.mp3')
, new Pz.Sound('../app/Data/Samples/PianoF6.mp3'), new Pz.Sound('../app/Data/Samples/PianoFS6.mp3'), new Pz.Sound('../app/Data/Samples/PianoG6.mp3'), new Pz.Sound('../app/Data/Samples/PianoGS6.mp3'), new Pz.Sound('../app/Data/Samples/PianoA6.mp3')
, new Pz.Sound('../app/Data/Samples/PianoAS6.mp3'), new Pz.Sound('../app/Data/Samples/PianoB6.mp3'), new Pz.Sound('../app/Data/Samples/PianoC7.mp3'), new Pz.Sound('../app/Data/Samples/PianoCS7.mp3'), new Pz.Sound('../app/Data/Samples/PianoD7.mp3')
, new Pz.Sound('../app/Data/Samples/PianoDS7.mp3'), new Pz.Sound('../app/Data/Samples/PianoE7.mp3'), new Pz.Sound('../app/Data/Samples/PianoF7.mp3'), new Pz.Sound('../app/Data/Samples/PianoFS7.mp3'), new Pz.Sound('../app/Data/Samples/PianoG7.mp3')
, new Pz.Sound('../app/Data/Samples/PianoGS7.mp3'), new Pz.Sound('../app/Data/Samples/PianoA7.mp3'), new Pz.Sound('../app/Data/Samples/PianoAS7.mp3'), new Pz.Sound('../app/Data/Samples/PianoB7.mp3'), new Pz.Sound('../app/Data/Samples/PianoC8.mp3')];
for(var pianoKeysSounds = 0; pianoKeysSounds < piano.length; pianoKeysSounds++){
	piano[pianoKeysSounds].release = masterRelease;
}

function draw(){
	for(var pianoKeysSounds = 0; pianoKeysSounds < piano.length; pianoKeysSounds++){
		piano[pianoKeysSounds].volume = parseFloat(window.sessionStorage.webSynthMasterVolume);
	}
	window.requestAnimationFrame(draw);
}

//midi variables
var log = console.log.bind(console), keyData = document.getElementById('key_data'), 
				deviceInfoInputs = document.getElementById('inputs'), deviceInfoOutputs = document.getElementById('outputs'), midi;
var activeNotes = [];
var btnBox = document.getElementById('content'), btn = document.getElementsByClassName('button');
var data, cmd, channel, type, note, velocity;

// request MIDI access
if(navigator.requestMIDIAccess){
	navigator.requestMIDIAccess({sysex: false}).then(onMIDISuccess, onMIDIFailure);
}
else {
	alert("No MIDI support in your browser.");
}

// midi functions
		function onMIDISuccess(midiAccess){
			midi = midiAccess;
			var inputs = midi.inputs.values();
			// loop through all inputs
			for(var input = inputs.next(); input && !input.done; input = inputs.next()){
				// listen for midi messages
				input.value.onmidimessage = onMIDIMessage;

				listInputs(input);
			}
			// listen for connect/disconnect message
			midi.onstatechange = onStateChange;
		}

function onMIDIMessage(event){
			data = event.data,
			cmd = data[0] >> 4,
			channel = data[0] & 0xf,
			type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
			note = data[1],
			velocity = data[2];
			log('MIDI data', data);
			switch(type){
				case 144:
					piano[note - 21].play();
					break;
				case 128: // noteOff message (not working)
				break;
				case 176:
					window.sessionStorage.webSynthMasterVolume = velocity/127;
				break;
			}
			if(velocity == 0){
				piano[note - 21].stop();
			}
		}
		
		function onStateChange(event){
			showMIDIPorts(midi);
			var port = event.port, state = port.state, name = port.name, type = port.type;
			if(type == "input")
				log("name", name, "port", port, "state", state);

		}
		
		function onMIDIFailure(e){
			log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
		}
		
		/*function frequencyFromNoteNumber( note ) {
			return 440 * Math.pow(2,(note-81)/12);
		}
//----------------

function playNote(keyCode, frequency, wave){
	var playing = false;
	for(var i = 0; i < polyphony.length; i++){
		if(polyphony[i][0] == keyCode){
			playing = true;
		}
	}*/

function keyStyles (type, colour, width, height, xPosition = 0){
	//non-css elements
	this.type = type;
	
	//css elements
	this.display = 'block';
	this.position = 'absolute';
	this.backgroundColor = colour;
	this.borderRadius = '5%';
	this.width = width;
	this.height = height;
	this.zIndex = '0';
	var tempLeft = (xPosition*'4').toString().concat('%');
	if(this.type === "black"){
		tempLeft = (parseInt(tempLeft) - '1').toString().concat('%');
		this.zIndex = '1';
	}
	this.left = tempLeft;
}

class Key extends React.Component{
	constructor(props){
		super(props);
		this.state = {hover: false, down: false};
	}
	
	mouseEnter(){
		this.state = this.setState({hover: true});
	}
	
	mouseLeave(){
		this.state = this.setState({hover: false});
		piano[this.props.keyNumber + 16].stop();
	}
	
	mouseDown(){
		this.state = this.setState({down: true, hover: true});
	}
	
	mouseUp(){
		this.state = this.setState({down: false, hover: false});
		piano[this.props.keyNumber + 16].stop();
	}
	
	
	render(){
		//make changes depending on the state of the key
		shadeIndex = this.state.hover ? 1 : 0;
		if(this.state.hover && mouseIsDown === true){
			shadeIndex = 2;
			piano[this.props.keyNumber + 16].play();
		}
		
		return(
			<div style = {new keyStyles(this.props.type, this.props.type === "white" ? whiteKeyShades[shadeIndex] : blackKeyShades[shadeIndex], this.props.type === "white" ? '4%' : '2%', this.props.type === "white" ? '100%' : '50%', this.props.xPosition)} 
			onMouseEnter = {this.mouseEnter.bind(this)} onMouseLeave = {this.mouseLeave.bind(this)} onMouseDown = {this.mouseDown.bind(this)} onMouseUp = {this.mouseUp.bind(this)}></div>
		)
	};
}

window.requestAnimationFrame(draw);
export default Key;