/******************************************************************************
 *                       PROPRIETARY & CONFIDENTIAL                           *
 *                  Copyright (c) - All rights reserved.                      *
 *  Unauthorized copying of this file, via any medium is strictly prohibited. *
 ******************************************************************************
 *  Programmers:  - Malvyn Le Bohec                                           *
 *****************************************************************************/
 
'use strict';

app.factory('Board', function(){

	// Constructor
	function Board({canvas, width, height, tile, color = 'black'}){
		this.ctx = canvas.getContext('2d');
		this.width = width;
  	this.height = height;
  	this.tile = tile;
  	this.color = color;

		this.init();
  }

  Board.prototype.init = function(){
  	this.board = [];
  	this.rezise({width: this.width * this.tile.width, height: this.height * this.tile.height});

  	for(let y = 0; y < this.height; y++){
  		this.board[y] = [];
  		for (let x = 0; x < this.width; x++) {
  			this.board[y][x] = this.color;
  		}
  	}
  };

  Board.prototype.rezise = function({width, height}){
  	this.ctx.canvas.width = width;
  	this.ctx.canvas.height = height;
  };

  Board.prototype.draw = function(){
  	for(let y = 0; y < this.board.length; y++){
  		for (let x = 0; x < this.board[y].length; x++) {
  			this.ctx.fillStyle = this.board[y][x];
				this.ctx.fillRect(x * this.tile.width, y * this.tile.height, this.tile.width, this.tile.height);
  		}
  	}
  };

  Board.prototype.clear = function(){
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  return Board;
});