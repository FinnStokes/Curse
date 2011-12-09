/**
 * grid.js v0.1
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

function Cell(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Cell.prototype.impassable = false;
Cell.prototype.solid = false;
Cell.prototype.opaque = false;
Cell.prototype.destructible = false;
Cell.prototype.draw = function(gridX,gridY) {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(gridX + this.x*this.width, gridY + this.y*this.height, this.width, this.height);
    ctx.closePath();
    ctx.stroke();
}

function Wall(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Wall.prototype.impassable = true;
Wall.prototype.solid = true;
Wall.prototype.opaque = true;
Wall.prototype.destructible = false;
Wall.prototype.draw = function(gridX,gridY) {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#444444";
    ctx.beginPath();
    ctx.rect(gridX + this.x*this.width, gridY + this.y*this.height, this.width, this.height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function Glass(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Glass.prototype.impassable = false;
Glass.prototype.solid = true;
Glass.prototype.opaque = false;
Glass.prototype.destructible = true;
Glass.prototype.draw = function(gridX,gridY) {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#DDFFFF";
    ctx.beginPath();
    ctx.rect(gridX + this.x*this.width, gridY + this.y*this.height, this.width, this.height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function Grid(width,height,cellWidth,cellHeight) {
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.entities = new Array();
    this.cells = new Array(width);
    for (var x = 0; x < width; x++) {
	this.cells[x] = new Array(height);
	for (var y = 0; y < height; y++) {
	    if(level.cells[y][x] === 1) {
		this.cells[x][y] = new Wall(x,y,cellWidth,cellHeight);
	    } else if(level.cells[y][x] === 2) {
		this.cells[x][y] = new Glass(x,y,cellWidth,cellHeight);
	    } else {
		this.cells[x][y] = new Cell(x,y,cellWidth,cellHeight);
	    }
	}
    }
}

Grid.prototype.draw = function(xPos,yPos) {
    for (var x = 0; x < this.cells.length; x++) {
	for (var y = 0; y < this.cells[x].length; y++) {
	    this.cells[x][y].draw(xPos,yPos);
	}
    }
    for (var i = 0; i < this.entities.length; i++) {
	this.entities[i].draw(xPos,yPos,this.cellWidth,this.cellHeight)
    }
}
