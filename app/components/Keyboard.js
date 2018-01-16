import React from 'react';
import Key from './Key.js';

//Global variables
function keyboardStyle(){
	this.position = 'absolute';
	this.width = '80%';
	this.height = '20%';
	this.left = '5%';
	this.top = '80%';
}

class Keyboard extends React.Component{
	
	
	render(){
		var allKeys = [];
		var xPositionIndex = 0;
		for(var keyIndex = 0; keyIndex < 49; keyIndex++){
			var keyType = "white";
			var tempKeyIndex = keyIndex;
			while(tempKeyIndex > 12){
				tempKeyIndex -= 12;
			}
			if(tempKeyIndex === 1 || tempKeyIndex === 3 || tempKeyIndex === 6 || tempKeyIndex === 8 || tempKeyIndex === 10){
				keyType = "black";
			}
			allKeys.push(<Key keyNumber={keyIndex + 1} type = {keyType} xPosition = {xPositionIndex} />);
			if(keyType === "white"){
				xPositionIndex++;
			}
		}
		return <div style={new keyboardStyle()}>{allKeys}</div>;
	}
}

export default Keyboard;