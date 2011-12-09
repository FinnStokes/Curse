/**
 * terminal.js v0.1
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

var terminalColours = ['#FFFF00','#00FFFF','#FF8800'];

function Terminal(id,x,y) {
    this.id = id;
    this.x = x;
    this.y = y;
}

Terminal.prototype.draw = function(gridX,gridY,width,height) {
    var x = gridX+(this.x + 0.5)*width;
    var y = gridY+(this.y + 0.5)*width;
    ctx.fillStyle = '#DDDDDD';
    ctx.beginPath();
    ctx.rect(x-20,y-20,40,40);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = terminalColours[this.id];
    ctx.beginPath();
    ctx.rect(x-15,y-15,30,30);
    ctx.closePath();
    ctx.fill();    
}

function TDoor(id,x,y,width,height,solid) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.solid = solid;
}

TDoor.prototype.impassable = false;
TDoor.prototype.opaque = true;
TDoor.prototype.destructible = false;
TDoor.prototype.draw = function(gridX,gridY) {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = terminalColours[this.id];
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(gridX + this.x*this.width, gridY + this.y*this.height, this.width, this.height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    if(this.solid){
    	ctx.fillStyle = '#444444';
    } else {
    	ctx.fillStyle = '#FFFFFF';
    }
    ctx.beginPath();
    ctx.rect(gridX + (this.x+1/3)*this.width, gridY + (this.y+1/3)*this.height, this.width*2/3, this.height*2/3);
    ctx.closePath();
    ctx.fill();
}
