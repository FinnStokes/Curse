/**
 * level.js v0.1
 *
 * Copyright (c) 2011 Finn Stokes and Saxon Douglass
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

var level = {cells: [[1,0,0,0,0,0,0,1,1,1],
		     [1,0,0,1,1,1,0,1,1,1],
		     [0,1,0,1,0,0,0,1,1,1],
		     [2,1,0,1,0,0,0,1,1,1],
		     [0,0,0,1,1,1,0,0,0,0],
		     [0,1,0,1,0,0,0,0,0,0],
		     [0,0,0,0,0,1,1,2,1,0],
		     [1,1,1,0,0,1,0,0,1,0],
		     [0,0,2,0,0,1,0,1,1,0],
		     [0,0,1,0,0,0,0,0,0,0]],
	     guards: [{x:0,y:2,dir:DOWN,rule:downRule},
		      {x:2,y:4,dir:DOWN,rule:rightRule},
		      {x:0,y:6,dir:UP,rule:rightRule},
		      {x:6,y:0,dir:DOWN,rule:bounceRule}],
	     terminals: [{x:0,y:9,doorB:{x:3,y:0},doorA:{x:6,y:8}}],
	     start: {x:1,y:0},
	     objective: {x:6, y:7} };
