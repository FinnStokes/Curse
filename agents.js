function Agent(player,x,y,dir,gridWidth,gridHeight) {
    this.player = player;
    this.x = x;
    this.y = y;
    this.xMax = gridWidth - 1;
    this.yMax = gridHeight - 1;
    this.dir = dir;
    this.waiting = false;
    this.carrying = null;
}

Agent.prototype.update = function() {
    var command = directionCommands[this.player][this.x][this.y];
    if(command) {
	this.dir = command.action;
    }

    if(this.waiting != true){
	switch(this.dir) {
	case LEFT:
	    this.x -= 1
	    if(this.x < 0) this.x = 0;
	    if(grid.cells[this.x][this.y].solid) this.x += 1;
	    break;
	case UP:
	    this.y -= 1
	    if(this.y < 0) this.y = 0;
	    if(grid.cells[this.x][this.y].solid) this.y += 1;
	    break;
	case RIGHT:
	    this.x += 1
	    if(this.x > this.xMax) this.x = this.xMax;
	    if(grid.cells[this.x][this.y].solid) this.x -= 1;
	    break;
	case DOWN:
	    this.y += 1
	    if(this.y > this.yMax) this.y = this.yMax;
	    if(grid.cells[this.x][this.y].solid) this.y -= 1;
	    break;
	}
    }

    command = actionCommands[this.player][this.x][this.y];
    if(command) {
	switch(command.action) {
	case WAIT:
	    if(agents[(this.player+1)%2] && agents[(this.player+1)%2].waiting === true) {
		agents[(this.player+1)%2].waiting = false;
	    } else {
		this.waiting = true
	    }
	    break;
	case USE:
	    switch(this.player) {
	    case 0:
		for(var i = 0; i < terminals.length; i++){
		    if(terminals[i].term.x === this.x && terminals[i].term.y === this.y) {
			terminals[i].doorA.solid = !terminals[i].doorA.solid;
			terminals[i].doorB.solid = !terminals[i].doorB.solid;
		    }
		}
		break;
	    case 1:
		console.log("Bomb")
		var b = new Bomb(this.x,this.y);
		grid.entities.push(b);
		bombs.push({bomb:b,time:0});
		break;
	    }
	    break;
	}
    }

    if(objective) {
	if(objective.x === this.x && objective.y === this.y) {
	    this.carrying = objective;
	}
    }

    if(this.carrying) {
	this.carrying.x = this.x;
	this.carrying.y = this.y;

	if(start.x === this.x && start.y === this.y) {
	    document.getElementById('error').innerHTML += "Success! We have secured the enemy intelligencs.<br />";
	}
    }
}

Agent.prototype.draw = function(gridX,gridY,width,height) {
    ctx.fillStyle = playerColours[this.player];
    var x = gridX+(this.x + 0.5)*width;
    var y = gridY+(this.y + 0.5)*width;
    ctx.beginPath();
    ctx.arc(x,y,12,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

function Start(x,y) {
    this.x = x;
    this.y = y;
    this.path0 = new Path(x,y,0);
    this.path1 = new Path(x,y,1);
}

Start.prototype.draw = function(gridX,gridY,width,height) {
    this.path0.draw(gridX,gridY,width,height);
    this.path1.draw(gridX,gridY,width,height);

    ctx.fillStyle = '#DD00DD';
    var x = gridX+(this.x + 0.5)*width;
    var y = gridY+(this.y + 0.5)*width;
    ctx.beginPath();
    ctx.arc(x,y,12,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

function Path(x,y,player) {
    this.x = x;
    this.y = y;
    this.player = player;
}

Path.prototype.draw = function(gridX,gridY,width,height) {
    ctx.strokeStyle = playerColours[this.player];
    ctx.lineWidth = 2;
    var x = this.x;
    var y = this.y;
    var newX = x;
    var newY = y;
    var xMax = grid.cells.length-1;
    var yMax = grid.cells[0].length-1;
    var dir = UP;
    oldCommands = new Array();
    var command;
    ctx.beginPath();
    ctx.moveTo(gridX+(x+(1.1+this.player*0.8)/3)*width,gridY+(y+(1.1+this.player*0.8)/3)*width);

    while(true){
	command = directionCommands[this.player][x][y];
	if(command) {
	    ctx.lineTo(gridX+(x+(1.1+this.player*0.8)/3)*width,gridY+(y+(1.1+this.player*0.8)/3)*width);
	    var loop = false;
	    for(c in oldCommands) {
		console.log(oldCommands[c]+", "+command);
		if(oldCommands[c] == command) {
		    console.log("loop");
		    loop = true;
		    break;
		}
	    }
	    if(loop) {
		break;
	    }
	    dir = command.action;
	    oldCommands.push(command);
	}

	switch(dir) {
	case LEFT:
	    newX = x - 1;
	    break;
	case UP:
	    newY = y - 1;
	    break;
	case RIGHT:
	    newX = x + 1;
	    break;
	case DOWN:
	    newY = y + 1;
	    break;
	}

	if(newX < 0 || newY < 0 ||newX > xMax || newY > yMax ||
	   (grid.cells[newX][newY].impassable)) {
	    ctx.lineTo(gridX+(x+(1.1+this.player*0.8)/3)*width,gridY+(y+(1.1+this.player*0.8)/3)*width);
	    break;
	} else {
	    x = newX;
	    y = newY;
	}
    }

    ctx.stroke();
}
