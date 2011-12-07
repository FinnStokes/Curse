function Bomb(x,y) {
    this.x = x;
    this.y = y;
}

Bomb.prototype.draw = function(gridX,gridY,width,height) {
    var x = gridX+(this.x + 0.5)*width;
    var y = gridY+(this.y + 0.5)*width;
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.rect(x-5,y-15,10,35);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.rect(x-1,y-20,2,5);
    ctx.closePath();
    ctx.fill();    
}

function explode(x,y) {
    if(grid.cells[x][y].destructible) {
	grid.cells[x][y] = new Cell(x,y,grid.cells[x][y].width,grid.cells[x][y].height);
    }
}