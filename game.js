/**
 * game.js v0.1
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

var canvas, ctx;
var width = 1024, height = 512;

var grid, agents, guards, terminals, bombs;
var playerColours;
var cursor1, cursor2;
var directionCommands, actionCommands;
var objective;
var paused;
var commands;

function init() {
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');

    commands = new Array();
   
    gridSize = initLevel();
    cursor1 = new Cursor(0,2,2,gridSize,gridSize);
    grid.entities.push(cursor1);
    cursor2 = new Cursor(1,3,5,gridSize,gridSize);
    grid.entities.push(cursor2);

    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;

    playerColours = ['#0000FF','#FF0000'];

    directionCommands = commandGrid(gridSize);
    actionCommands = commandGrid(gridSize);

    paused = true;
    return setInterval(draw, 50) && setInterval(step, 500);
}

function initLevel() {
    var gridSize = 10;

    agents = new Array(2);
    guards = new Array();
    terminals = new Array();
    bombs = new Array();

    grid = new Grid(gridSize,gridSize,50,50);
    for(var i = 0; i < level.guards.length; i++) {
	var g = new Guard(level.guards[i].x,level.guards[i].y,level.guards[i].dir,gridSize,gridSize,level.guards[i].rule);
	guards.push(g);
	grid.entities.push(g);
    }
    for(var i = 0; i < level.terminals.length; i++) {
	var t = new Terminal(i,level.terminals[i].x,level.terminals[i].y);
	var doorA = new TDoor(i,level.terminals[i].doorA.x,level.terminals[i].doorA.y,50,50,true);
	grid.cells[doorA.x][doorA.y] = doorA;
	var doorB = new TDoor(i,level.terminals[i].doorB.x,level.terminals[i].doorB.y,50,50,false);
	grid.cells[doorB.x][doorB.y] = doorB;	
	terminals.push({term:t,doorA:doorA,doorB:doorB});
	grid.entities.push(t);
    }
    objective = new Objective(level.objective.x,level.objective.y);
    grid.entities.push(objective);
    start = new Start(level.start.x,level.start.y);
    grid.entities.push(start);

    document.getElementById('error').innerHTML = ""
    return gridSize;
}

function resetLevel() {
    var oldDc = directionCommands;
    var oldAc = actionCommands;
    gridSize = initLevel();
    directionCommands = oldDc;
    actionCommands = oldAc;
    for(var i = 0; i < commands.length; i++) {
	if(commands[i]) {
	    var c = commands[i];
	    c = 
	    grid.entities.push(c);
	}
    }
    grid.entities.push(cursor1);
    grid.entities.push(cursor2);
    /*for(var i = 0; i < level.guards.length; i++) {
	guards[i].x = level.guards[i].x;
	guards[i].y = level.guards[i].y;
	guards[i].dir = level.guards[i].dir;
    }
    for(var i = 0; i < terminals.length; i++) {
	terminals[i].doorA.impassable = true;
	terminals[i].doorB.impassable = false;
    }
    bombs = [];
    objective.x = level.objective.x;
    objective.y = level.objective.y;*/
    paused = !paused;
    if(!paused) {
	agents[0] = new Agent(0,start.x,start.y,UP,grid.cells.length,grid.cells[0].length);
	agents[1] = new Agent(1,start.x,start.y,UP,grid.cells.length,grid.cells[0].length);
	grid.entities.push(agents[0]);
	grid.entities.push(agents[1]);
    }
}

function commandGrid(width) {
    var nPlayers = 2;
    var grid = new Array(nPlayers);
    for(var i = 0; i < nPlayers; i++) {
	grid[i] = new Array(width);
	for (var x = 0; x < width; x++) {
	    grid[i][x] = new Array(height);
	}
    }
    return grid;
}

function draw() {
    ctx.clearRect(0,0,width,height);
    grid.draw(5,5);
}

function step() {
    if(!paused) {
	for(var i = 0; i < agents.length; i++) {
	    if(agents[i]) {
		agents[i].update();
	    }
	}
	for(var i = 0; i < guards.length; i++) {
	    if(guards[i]) {
		guards[i].update();
	    }
	}
	for(var i = 0; i < bombs.length; i++) {
	    bombs[i].time++
	    if(bombs[i].time >= 3) {
		var x = bombs[i].bomb.x;
		var y = bombs[i].bomb.y;
		explode(x-1,y-1);
		explode(x-1,y);
		explode(x-1,y+1);
		explode(x,y-1);
		explode(x,y);
		explode(x,y+1);
		explode(x+1,y-1);
		explode(x+1,y);
		explode(x+1,y+1);
		for(var j = 0; j < grid.entities.length; j++) {
		    if(grid.entities[j] === bombs[i].bomb) {
			console.log(j);
			grid.entities.splice(j,1);
		    }
		}
	    }
	}
    }
}

