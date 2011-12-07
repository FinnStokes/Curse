/**
 * objective.js v0.1
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

function Objective(x,y) {
    this.x = x;
    this.y = y;
}

Objective.prototype.draw = function(gridX,gridY,width,height) {
    ctx.fillStyle = '#00DD00';
    var x = gridX+(this.x+0.5)*width;
    var y = gridY+(this.y+0.5)*height;
    ctx.beginPath();
    ctx.rect(x-width/3,y-height/4,width*2/3,height/2);
    ctx.closePath();
    ctx.fill();
}
