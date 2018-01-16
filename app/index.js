import React from 'react';
import ReactDOM from 'react-dom';
import Keyboard from './components/Keyboard.js';
import Key from './components/Key.js';
import RecordingStation from './components/RecordingStation.js';

var time = 0;

function draw(){
	ReactDOM.render(
		<RecordingStation />, 
		document.getElementById('appRecording')
	);
	window.requestAnimationFrame(draw);
}

ReactDOM.render(
	<Keyboard />,
	document.getElementById('app')
);

function timeUp(){
	//time++;
	//ReactDOM.render(<h1>{time}</h1>, document.getElementById('app'));
}

window.requestAnimationFrame(draw);










