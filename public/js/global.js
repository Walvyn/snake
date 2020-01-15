var app = angular.module('GameApp', []);

var requestAnimFrame = (function(callback){
    return 	window.requestAnimationFrame || 
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimationFrame ||
						function(callback){
							window.setTimeout(callback, 1000 / 60);
						};
})();
