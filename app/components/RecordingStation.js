import React from 'react';
import PlayPauseButton from './PlayPauseButton.js';
import VolumeControl from './VolumeControl.js';

function recordingStationStyles(){
	this.position = 'absolute';
	this.width = '80%';
	this.height = '20%';
	this.left = '5%';
	this.backgroundColor = '#B5B5B5';
}

class RecordingStation extends React.Component{
	render(){
		return(
			<div style={new recordingStationStyles()}>
				<VolumeControl />
			</div>
		);
	};
}

export default RecordingStation;