'use strict';

app.controller('SnakeCtrl', function(Board, Snake, Input){
  const snakeCtrl = this;
  const canvas = $('#board');
  const tile = { height: 10, width: 10 };
  const board = new Board({ height: 50, width: 50, canvas: canvas[0], color: '#9acc99', tile });
  const snake = new Snake({ canvas: canvas[0], speed: 4, size: 5, mode: 'PORTAL', color: '#000600', tile, start: { x: 25, y: 25 }});
  const input = new Input();

  let lost = false;

  input.addKey({ input: 'left' });
  input.addKey({ input: 'right' });
  input.addKey({ input: 'top' });
  input.addKey({ input: 'bottom' });

  function animate(){
  	snake.move({input});

  	if(snake.collision({board})){
  		lost = true;
  		snake.stop();

  		return false;
  	}

  	board.clear();
  	board.draw();
  	snake.draw();

	  if(!lost){
	  	requestAnimFrame(function(){ animate(); });
		} 	 
  }

  animate();

});