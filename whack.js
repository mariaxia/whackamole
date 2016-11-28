	<script>
		
	var Game = function(){
	
		var lowerCanvas = document.getElementById("screen");
		var upperCanvas = document.getElementById("overlay");
		var base = lowerCanvas.getContext('2d');
		var overlay = upperCanvas.getContext('2d');
		this.canvas = upperCanvas;
		this.overlay = overlay;
		this.base = base;
		this.level = 5; // future players will be able to customize level...
	
		// draw screen		
		base.fillStyle = "CadetBlue";
		
		for (var j = 0; j < this.level; j++){
			for (var i = 0; i < this.level; i++){
				base.fillRect(
					70 * i, // position x
					70 * j, // position y
					50, 	// size x
					50  	// size y
				);
			};
		};		
		
		// start the moles and wait for whacking
		function start(){
			for (var i = 0; i < 9; i++){
				this.moles.push(new Mole(this, i));
				// set moles to appear randomly
				setTimeout(() => {
					this.moles[Math.floor(Math.random()*9)].appear();
				}, Math.random() * 9000);
			}
			this.canvas.addEventListener('click', this.whack.bind(this));
		};		
		
		start.call(this);
	};
	
	Game.prototype = {
		// set up for multi-colored moles
		moles: [],
		colors: ["CornflowerBlue", 
					  "Brown", 
					  "DarkGoldenRod", 
					  "DarkOliveGreen", 
					  "DarkSeaGreen", 
					  "DarkSlateGray", 
					  "IndianRed", 
					  "GoldenRod", 
					  "LightSalmon"],
		count: 0,
		whack: function(ev){			
			// we use getImageData to find out if we hit a mole, 
			// taking into account our canvas offset 
			var data = this.overlay.getImageData(ev.pageX - 110, ev.pageY - 250, 1, 1).data;
			if (data[0]){
				this.count++;
				document.getElementById("counter").innerHTML = this.count;
			}
		}
	};	
	
	var Mole = function(game, number){
		this.game = game;
		this.color = game.colors[number];
		this.x = 70 * Math.floor(Math.random() * this.game.level);
		this.y = 70 * Math.floor(Math.random() * this.game.level);
	};
	
	Mole.prototype = {
		appear: function(){
					this.x = 70 * Math.floor(Math.random() * this.game.level);
					this.y = 70 * Math.floor(Math.random() * this.game.level);
					this.game.overlay.fillStyle = this.color;
					this.game.overlay.fillRect(this.x, this.y, 50, 50);
					setTimeout(() => {this.disappear()}, 800);
				},
		disappear: function(){
					this.game.overlay.clearRect(this.x, this.y, 50, 50);
					setTimeout(() => {this.appear()}, 8000);
				}
	};
	
	window.addEventListener('load', function(){
		new Game();
	});
	
	</script>
