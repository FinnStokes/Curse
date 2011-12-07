/**
 * guards.js v0.1
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

function Guard(x,y,dir,gridWidth,gridHeight,rule) {
    this.x = x;
    this.y = y;
    this.xMax = gridWidth - 1;
    this.yMax = gridHeight - 1;
    this.dir = dir;
    this.rule = rule;
}

Guard.prototype.update = function() {
    var recalc = true;
    var i = 0;
    while(recalc && i < 4) {
	recalc = false;
	switch(this.dir) {
	case LEFT:
	    this.x -= 1
	    if(this.x < 0 || grid.cells[this.x][this.y].impassable) {
		this.x += 1;
		this.dir = this.rule(this.dir);
		recalc = true;
	    }
	    break;
	case UP:
	    this.y -= 1
	    if(this.y < 0 || grid.cells[this.x][this.y].impassable) {
		this.y += 1;
		this.dir = this.rule(this.dir);
		recalc = true;
	    }
	    break;
	case RIGHT:
	    this.x += 1
	    if(this.x > this.xMax || grid.cells[this.x][this.y].impassable) {
		this.x -= 1;
		this.dir = this.rule(this.dir);
		recalc = true;
	    }
	    break;
	case DOWN:
	    this.y += 1
	    if(this.y > this.yMax || grid.cells[this.x][this.y].impassable) {
		this.y -= 1;
		this.dir = this.rule(this.dir);
		recalc = true;
	    }
	    break;
	}
	i++;
    }

    var agent = this.check();
    if(agent >= 0) {
	document.getElementById('error').innerHTML += "Agent "+agent+" was spotted by a guard. </br>";
    }
}

Guard.prototype.check = function() {
    var dx, dy;
    switch(this.dir) {
    case LEFT:
	dx = -1; dy = 0;
	break;
    case UP:
	dx = 0; dy = -1;
	break;
    case RIGHT:
	dx = 1; dy = 0;
	break;
    case DOWN:
	dx = 0; dy = 1;
    }

    var x,y;
    for(x = this.x, y = this.y; x >= 0 && x <= this.xMax && y >= 0 && y <= this.yMax; x += dx, y += dy) {
	if(grid.cells[x][y].opaque) break;
	for(var i = 0; i < agents.length; i++) {
	    if(agents[i] && agents[i].x === x && agents[i].y === y) {
		console.log(dx+","+dy+": "+i+"-"+x+","+y)
		return i;
	    }
	}
    }
    return -1;
}

Guard.prototype.draw = function(gridX,gridY,width,height) {
    ctx.fillStyle = '#111111';
    var x = gridX+(this.x + 0.5)*width;
    var y = gridY+(this.y + 0.5)*width;
    ctx.beginPath();
    switch(this.dir) {
    case LEFT:
	ctx.moveTo(x-10,y);
	ctx.lineTo(x+10,y+10);
	ctx.lineTo(x+10,y-10);
	break;
    case UP:
	ctx.moveTo(x,y-10);
	ctx.lineTo(x+10,y+10);
	ctx.lineTo(x-10,y+10);
	break;
    case RIGHT:
	ctx.moveTo(x+10,y);
	ctx.lineTo(x-10,y+10);
	ctx.lineTo(x-10,y-10);
	break;
    case DOWN:
	ctx.moveTo(x,y+10);
	ctx.lineTo(x+10,y-10);
	ctx.lineTo(x-10,y-10);
	break;
    }
    ctx.closePath();
    ctx.fill();
}

function bounceRule(dir) {
    switch(this.dir) {
    case LEFT:
	return RIGHT;
	break;
    case UP:
	return DOWN;
	break;
    case RIGHT:
	return LEFT;
	break;
    case DOWN:
	return UP;
	break;
    }
}

function leftRule(dir) {
    switch(this.dir) {
    case LEFT:
	return DOWN;
	break;
    case UP:
	return LEFT;
	break;
    case RIGHT:
	return UP;
	break;
    case DOWN:
	return RIGHT;
	break;
    }
}

function rightRule(dir) {
    switch(this.dir) {
    case LEFT:
	return UP;
	break;
    case UP:
	return RIGHT;
	break;
    case RIGHT:
	return DOWN;
	break;
    case DOWN:
	return LEFT;
	break;
    }
}

function downRule(dir) {
    return DOWN;
}