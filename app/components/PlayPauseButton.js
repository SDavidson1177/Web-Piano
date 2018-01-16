import React from 'react';

//global variables for styling
const playColours = ["#15E602", "#71ED66", "#2AB01E"];
var colourIndex = 0;

function playPauseButtonStyles(colour){
	this.height = '100%';
	this.width = '8%';
	this.backgroundColor = colour;
}

class PlayPauseButton extends React.Component{
	constructor (props){
		super(props);
		this.state = {hover: false, down: false};
	}
	
	mouseEnter(){
		this.state = this.setState({hover: true});
	}
	
	mouseLeave(){
		this.state = this.setState({hover: false});
	}
	
	mouseDown(){
		this.state = this.setState({down: true, hover: true});
	}
	
	mouseUp(){
		this.state = this.setState({down: false});
	}
	
	render(){
		colourIndex = this.state.hover === true ? 1 : 0;
		if(this.state.hover === true && this.state.down === true){
			colourIndex = 2;
		}
		return(
			<div style={new playPauseButtonStyles(playColours[colourIndex])} onMouseEnter = {this.mouseEnter.bind(this)} onMouseLeave = {this.mouseLeave.bind(this)}
			onMouseDown = {this.mouseDown.bind(this)} onMouseUp = {this.mouseUp.bind(this)}>Play!</div>
		);
	}
} 

export default PlayPauseButton;