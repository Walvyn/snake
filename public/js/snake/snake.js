/******************************************************************************
 *                       PROPRIETARY & CONFIDENTIAL                           *
 *                  Copyright (c) - All rights reserved.                      *
 *  Unauthorized copying of this file, via any medium is strictly prohibited. *
 ******************************************************************************
 *  Programmers:  - Malvyn Le Bohec                                           *
 *****************************************************************************/
 
'use strict';

app.factory('Snake', function(){

  const directions = ['LEFT', 'RIGHT', 'TOP', 'BOTTOM'];
  const modes = ['NORMAL', 'PORTAL'];
  const defaultMode = 'NORMAL';

	// Constructor
	function Snake({canvas, speed, size, start, tile, mode = 'NORMAL', color = 'green'}){
		this.ctx = canvas.getContext('2d');
    this.speed = speed;
    this.size = size;
    this.pos = start;
    this.color = color;
    this.tile = tile;
    this.direction = null;

    if(modes.indexOf(mode) != -1){
      this.mode = mode;
    } else {
      this.mode = defaultMode;
    }

		this.init();
  }

  Snake.prototype.init = function(){
  	this.body = [];

    for(let i = 0; i < this.size; i++){
      this.body[i] = { x: this.pos.x, y: this.pos.y, direction: null };
    }
  };

  Snake.prototype.move = function({input}){
    let direction = null;

    for(let dir of directions){
      if(input.isDown({input: dir})){
        direction = dir;
        break;
      }
    }

    if(direction != null && directions.indexOf(direction) != -1){
      if((direction == 'LEFT' && this.direction != 'RIGHT') || 
         (direction == 'RIGHT' && this.direction != 'LEFT') || 
         (direction == 'TOP' && this.direction != 'BOTTOM') || 
         (direction == 'BOTTOM' && this.direction != 'TOP')){
        this.direction = direction;
      }
    }

    let prevDirection = this.direction;

    for(let i = 0; i < this.size; i++){
      let tmp = this.body[i].direction;

      switch(prevDirection) {
        case 'LEFT':
          this.body[i].direction = prevDirection;
          this.body[i].x -= 1;
          break;

        case 'RIGHT':
          this.body[i].direction = prevDirection;
          this.body[i].x += 1;
          break;

        case 'TOP':
          this.body[i].direction = prevDirection;
          this.body[i].y -= 1;
          break;
          
        case 'BOTTOM':
          this.body[i].direction = prevDirection;
          this.body[i].y += 1;
          break;
      }

      prevDirection = tmp;
    }
  };

  Snake.prototype.stop = function(){
    for(let i = 0; i < this.size; i++){
      this.body[i].direction = null;
    }
  };

  Snake.prototype.collision = function({board}){
    for(let i = 0; i < this.size; i++){
      switch(this.mode){
        case 'NORMAL':
          if(this.body[i].x < 0 || this.body[i].x > board.width || this.body[i].y < 0 || this.body[i].y > board.height){
            return true;
          }

        case 'PORTAL':
          if(this.body[i].x < 0) this.body[i].x = board.width;
          else if(this.body[i].x > board.width) this.body[i].x = 0;
          else if(this.body[i].y < 0) this.body[i].y = board.height;
          else if(this.body[i].y > board.height) this.body[i].y = 0;
          break;
      }
    }

    return false;
  };

  Snake.prototype.draw = function(){
  	for(let i = 0; i < this.size; i++){
			this.ctx.fillStyle = this.color;
			this.ctx.fillRect(this.body[i].x * this.tile.width, this.body[i].y * this.tile.height, this.tile.width, this.tile.height);
  	}
  };

  return Snake;
});