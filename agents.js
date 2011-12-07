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
	    if(grid.cells[this.x][this.y].impassable) this.x += 1;
	    break;
	case UP:
	    this.y -= 1
	    if(this.y < 0) this.y = 0;
	    if(grid.cells[this.x][this.y].impassable) this.y += 1;
	    break;
	case RIGHT:
	    this.x += 1
	    if(this.x > this.xMax) this.x = this.xMax;
	    if(grid.cells[this.x][this.y].impassable) this.x -= 1;
	    break;
	case DOWN:
	    this.y += 1
	    if(this.y > this.yMax) this.y = this.yMax;
	    if(grid.cells[this.x][this.y].impassable) this.y -= 1;
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
			terminals[i].doorA.impassable = !terminals[i].doorA.impassable;
			terminals[i].doorB.impassable = !terminals[i].doorB.impassable;
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
}

Start.prototype.draw = function(gridX,gridY,width,height) {
    ctx.fillStyle = '#DD00DD';
    var x = gridX+(this.x + 0.5)*width;
    var y = gridY+(this.y + 0.5)*width;
    ctx.beginPath();
    ctx.arc(x,y,12,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
    
}