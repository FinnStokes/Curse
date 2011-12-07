/**
 * interface.js v0.1
 *
 * Copyright (c) 2011 Finn Stokes
 * Licensed under MIT license
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var LEFT = 0;
var UP = 1;
var RIGHT = 2;
var DOWN = 3;
var WAIT = 4;
var USE = 5;

function onKeyDown(evt) {
    switch(event.keyCode) {
    case 37:  cursor1.left(); break; // left key
    case 38:  cursor1.up(); break; // up key
    case 39:  cursor1.right(); break; // right key
    case 40:  cursor1.down(); break; // down key
    case 76:  addCommand(cursor1,LEFT); break; // l key
    case 80:  addCommand(cursor1,UP); break; // p key
    case 222: addCommand(cursor1,RIGHT); break; // ' key
    case 186: addCommand(cursor1,DOWN); break; // ; key
    case 219: addCommand(cursor1,WAIT); break; // [ key
    case 79:  addCommand(cursor1,USE); break; // o key

    case 65:  cursor2.left(); break; // a key
    case 87:  cursor2.up(); break; // w key
    case 68:  cursor2.right(); break; // d key
    case 83:  cursor2.down(); break; // s key
    case 70:  addCommand(cursor2,LEFT); break; // f key
    case 84:  addCommand(cursor2,UP); break; // t key
    case 72:  addCommand(cursor2,RIGHT); break; // h key
    case 71:  addCommand(cursor2,DOWN); break; // g key
    case 82:  addCommand(cursor2,WAIT); break; // r key
    case 89:  addCommand(cursor2,USE); break; // y key

    case 32: // space key
	resetLevel();
	//toggleAgent(0,start.x,start.y,0);
	//toggleAgent(1,start.x,start.y,1);
	break;
    }
}

function onKeyUp(evt) {
}

function addCommand(cursor,command) {
    if(!paused) return;
    if(grid.cells[cursor.x][cursor.y].impassable) return;
    var c;
    switch(command){
    case LEFT:
	c = new LeftCommand(cursor.player,cursor.x,cursor.y);
	c = checkDirectionCommand(c,cursor.player);
	break;
    case UP:
	c = new UpCommand(cursor.player,cursor.x,cursor.y);
	c = checkDirectionCommand(c,cursor.player);
	break;
    case RIGHT:
	c = new RightCommand(cursor.player,cursor.x,cursor.y);
	c = checkDirectionCommand(c,cursor.player);
	break;
    case DOWN:
	c = new DownCommand(cursor.player,cursor.x,cursor.y);
	c = checkDirectionCommand(c,cursor.player);
	break;
    case WAIT:
	c = new WaitCommand(cursor.player,cursor.x,cursor.y);
	c = checkActionCommand(c,cursor.player);
	break;
    case USE:
	c = new UseCommand(cursor.player,cursor.x,cursor.y);
	c = checkActionCommand(c,cursor.player);
	break;
    }
    if(c) {
	commands.push(c);
	grid.entities.push(c);
    }	
}

function checkDirectionCommand(command,player) {
    if(directionCommands[player][command.x][command.y]) {
	for(i = 0; i < grid.entities.length; i++) {
	    if(grid.entities[i] == directionCommands[player][command.x][command.y]) {
		grid.entities.splice(i,1);
		break;
	    }
	}
	for(i = 0; i < commands.length; i++) {
	    if(commands[i] == directionCommands[player][command.x][command.y]) {
		commands.splice(i,1);
		break;
	    }
	}
        if(command.action != directionCommands[player][command.x][command.y].action) {
	    directionCommands[player][command.x][command.y] = command;
	    return command;
	} else {
	    directionCommands[player][command.x][command.y] = null;
	    return null;
	}
    }
    directionCommands[player][command.x][command.y] = command;
    return command;
}

function checkActionCommand(command,player) {
    if(actionCommands[player][command.x][command.y]) {
	for(i = 0; i < grid.entities.length; i++) {
	    if(grid.entities[i] == actionCommands[player][command.x][command.y]) {
		grid.entities.splice(i,1);
		for(j = 0; j < commands.length; j++) {
		    if(commands[j] === actionCommands[player][command.x][command.y]) {
			commands.splice(j,1);
			break;
		    }
		}
		actionCommands[player][command.x][command.y] = null;
		return null;
	    }
	}
    }
    actionCommands[player][command.x][command.y] = command;
    return command;
}

function Cursor(player,x,y,gridWidth,gridHeight) {
    this.x = x;
    this.y = y;
    this.player = player;
    this.xMax = gridWidth-1;
    this.yMax = gridHeight-1;
}

Cursor.prototype.draw = function(gridX,gridY,width,height) {
    var oldStroke = ctx.strokeStyle;
    var oldWidth = ctx.lineWidth;
    ctx.strokeStyle = playerColours[this.player];
    ctx.lineWidth = 4;
    
    var x = gridX+this.x*width;
    var y = gridY+this.y*width;
    ctx.beginPath();
    ctx.moveTo(x,y+width/3);
    ctx.lineTo(x,y);
    ctx.lineTo(x+width/3,y);
    ctx.moveTo(x+width*2/3,y);
    ctx.lineTo(x+width,y);
    ctx.lineTo(x+width,y+width/3);
    ctx.moveTo(x+width,y+width*2/3);
    ctx.lineTo(x+width,y+width);
    ctx.lineTo(x+width*2/3,y+width);
    ctx.moveTo(x+width/3,y+width);
    ctx.lineTo(x,y+width);
    ctx.lineTo(x,y+width*2/3);
    ctx.stroke();

    ctx.strokeStyle = oldStroke;
    ctx.lineWidth = oldWidth;    
}

Cursor.prototype.up = function() {
    this.y -= 1;
    if (this.y < 0) this.y = 0;
}

Cursor.prototype.down = function() {
    this.y += 1;
    if (this.y > this.yMax) this.y = this.yMax;
}

Cursor.prototype.left = function() {
    this.x -= 1;
    if (this.x < 0) this.x = 0;
}

Cursor.prototype.right = function() {
    this.x += 1;
    if (this.x > this.xMax) this.x = this.xMax;
}

function LeftCommand(player, x, y) {
    this.x = x;
    this.y = y;
    this.player = player;
}

LeftCommand.prototype.action = LEFT;

LeftCommand.prototype.draw = function(gridX,gridY,width,height) {
    ctx.fillStyle = playerColours[this.player];
    var x = gridX+this.x*width;
    var y = gridY+(this.y + (1.1+this.player*0.8)/3)*width;
    ctx.beginPath();
    ctx.moveTo(x+3,y);
    ctx.lineTo(x+8,y-5);
    ctx.lineTo(x+8,y+5);
    ctx.closePath();
    ctx.fill();
}

function UpCommand(player, x, y) {
    this.x = x;
    this.y = y;
    this.player = player;
}

UpCommand.prototype.action = UP;

UpCommand.prototype.draw = function(gridX,gridY,width,height) {
    ctx.fillStyle = playerColours[this.player];
    var x = gridX+(this.x + (1.1+this.player*0.8)/3)*width;
    var y = gridY+this.y*width;
    ctx.beginPath();
    ctx.moveTo(x,y+3);
    ctx.lineTo(x-5,y+8);
    ctx.lineTo(x+5,y+8);
    ctx.closePath();
    ctx.fill();
}

function RightCommand(player, x, y) {
    this.x = x;
    this.y = y;
    this.player = player;
}

RightCommand.prototype.action = RIGHT;

RightCommand.prototype.draw = function(gridX,gridY,width,height) {
    ctx.fillStyle = playerColours[this.player];
    var x = gridX+(this.x+1)*width;
    var y = gridY+(this.y + (1.1+this.player*0.8)/3)*width;
    ctx.beginPath();
    ctx.moveTo(x-3,y);
    ctx.lineTo(x-8,y-5);
    ctx.lineTo(x-8,y+5);
    ctx.closePath();
    ctx.fill();
}

function DownCommand(player, x, y) {
    this.x = x;
    this.y = y;
    this.player = player;
}

DownCommand.prototype.action = DOWN;

DownCommand.prototype.draw = function(gridX,gridY,width,height) {
    ctx.fillStyle = playerColours[this.player];
    var x = gridX+(this.x + (1.1+this.player*0.8)/3)*width;
    var y = gridY+(this.y+1)*width;
    ctx.beginPath();
    ctx.moveTo(x,y-3);
    ctx.lineTo(x-5,y-8);
    ctx.lineTo(x+5,y-8);
    ctx.closePath();
    ctx.fill();
}

function WaitCommand(player, x, y) {
    this.x = x;
    this.y = y;
    this.player = player;
}

WaitCommand.prototype.action = WAIT;

WaitCommand.prototype.draw = function(gridX,gridY,width,height) {
    ctx.fillStyle = playerColours[this.player];
    var x = gridX+(this.x + (1.1+this.player*0.8)/3)*width;
    var y = gridY+(this.y + (1.1+this.player*0.8)/3)*width;
    ctx.beginPath();
    ctx.arc(x,y,9,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

function UseCommand(player, x, y) {
    this.x = x;
    this.y = y;
    this.player = player;
}

UseCommand.prototype.action = USE;

UseCommand.prototype.draw = function(gridX,gridY,width,height) {
    ctx.fillStyle = playerColours[this.player];
    var x = gridX+(this.x + (1.1+this.player*0.8)/3)*width;
    var y = gridY+(this.y + (1.1+this.player*0.8)/3)*width;
    ctx.beginPath();
    ctx.moveTo(x,y-9);
    ctx.lineTo(x+6,y);
    ctx.lineTo(x,y+9);
    ctx.lineTo(x-6,y);
    ctx.closePath();
    ctx.fill();
}
