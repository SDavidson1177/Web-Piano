import React from 'react';

var nobPosition = '0%';
var initialPosition = 0;

function volumeControlStyles (colour){
	this.position = 'absolute';
	this.width = '5%';
	this.height = '100%';
	this.right = '0%';
	this.top = '0%';
	this.backgroundColor = colour;
}

function volumeControlStylesNob (colour){
	this.position = 'absolute';
	this.width = '100%';
	this.height = '10%';
	this.top = nobPosition;
	this.backgroundColor = colour;
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
				case 176:
					nobPosition = ((parseInt($("#mainBox").css("height")) - parseInt($("#nob").css("height"))) 
					- ((parseInt($("#mainBox").css("height")) - parseInt($("#nob").css("height"))) * (velocity/127))).toString() + "px";
					//alert(parseInt($("#mainBox").css("height")));
				break;
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

class VolumeControl extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {down: false};
	}
	mouseDown(e){
		this.state = this.setState({down: true});
	}
	
	mouseUp(e){
		this.state = this.setState({down: false});
	}
	
	mouseMove(e){
		if(this.state.down === true){
			if(e.clientY > parseInt($("#mainBox").offset().top) + parseInt($("#nob").css("height"))/2 && e.clientY < parseInt($("#mainBox").offset().top) + parseInt($("#mainBox").css("height")) - (parseInt($("#nob").css("height"))/2)){
				nobPosition = ((((e.clientY - $("#mainBox").offset().top)/parseInt($("#mainBox").css("height")))*100) - (parseInt($("#nob").css("height"))/2)).toString() + "%";
				window.sessionStorage.webSynthMasterVolume = 1.00 - (((e.clientY - $("#mainBox").offset().top)/parseInt($("#mainBox").css("height")))*0.9);
				window.sessionStorage.webSynthUpdateVolume = true;
			}
		}
	}
	
	render(){
		return(
			<div id = "mainBox" style={new volumeControlStyles ("#96D0E3")} onMouseMove={this.mouseMove.bind(this)} onMouseLeave={this.mouseUp.bind(this)}>
				<div id = "nob" style={new volumeControlStylesNob("#000000")} onMouseDown={this.mouseDown.bind(this)} onMouseUp={this.mouseUp.bind(this)}></div>
			</div>
		);
	}
}

export default VolumeControl;