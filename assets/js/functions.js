function Game() {
	this.canvas = document.getElementById('HangMan');
	this.ctx = this.canvas.getContext('2d');
	this.wordBox = document.getElementById("WordBox");
	this.guesses = document.getElementById("Guesses");
	this.lifeCount = document.getElementById("LifeCount");
	this.hint = document.getElementById("Hint");
	this.guessList = [];
	this.words = ["invoked", "javascript", "constant", "variable", "function", "parameters", "arguments"];
	this.hints = [
					"A function needs to be _______",
					"_______ is a client side programming language",
					"The value of a ________ does not get reassigned during program execution",
					"The value of a ________ may get reassigned during program execution",
					"A ________ can be named or it can be anonymous",
					"Function ________ are the names listed in a function definition",
					"_________ are passed into a function when it is being invoked"];
	this.correct = 0;
	this.lives = 6;
	this.randomNumber = Math.floor(Math.random() * (this.words.length));

	this.randomWord = [this.words[this.randomNumber], this.hints[this.randomNumber]]

	this.word = this.randomWord[0];
	this.helper = this.randomWord[1];

	this.buildLetterBox = function() {
		this.lifeCount.innerHTML = this.lives;
		this.hint.innerHTML = this.helper;
		for(var i = 0; i < this.word.length; i++) {
			var char = this.word.charAt(i);
			this.wordBox.innerHTML = this.wordBox.innerHTML + '<div class="letter-box"><span class="hide">' + char + '</span></div>';
		}
	}

	this.drawHead = function() {
		this.ctx.beginPath();
		this.ctx.arc(75,75,50,0, Math.PI * 2, true);//head
		this.ctx.moveTo(102,110);
		this.ctx.arc(77, 110, 25, 0, Math.PI, true);//mouth
		this.ctx.moveTo(65,65);
		this.ctx.arc(60,65,5,0, Math.PI * 2, true);//left eye
		this.ctx.moveTo(95, 65);
		this.ctx.arc(90, 65, 5, 0, Math.PI * 2, true);//right eye
		this.ctx.stroke();
		this.ctx.closePath();
	}

	this.drawBody = function() {
		this.ctx.beginPath();
		this.ctx.moveTo(75, 125);
		this.ctx.lineTo(75, 340);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	this.drawLeftArm = function() {
		this.ctx.beginPath();
		this.ctx.moveTo(30, 160);
		this.ctx.lineTo(75, 160);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	this.drawRightArm = function() {
		this.ctx.beginPath();
		this.ctx.moveTo(75, 160);
		this.ctx.lineTo(120, 160);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	this.drawLeftFoot = function() {
		this.ctx.beginPath();
		this.ctx.moveTo(30, 370);
		this.ctx.lineTo(75, 340);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	this.drawRightFoot = function() {
		this.ctx.beginPath();
		this.ctx.moveTo(75, 340);
		this.ctx.lineTo(120, 370);
		this.ctx.stroke();
		this.ctx.closePath();
	}	

	this.guess = function() {
		let self = this
		document.addEventListener("keypress", function _guess(event) {
			let a = event.key.toLowerCase();
			let error = new Audio('assets/sounds/error.wav');
			let valid = document.getElementById('validate');
			console.log(event);
			if( event.keyCode < 97 || event.keyCode > 122) {
				valid.innerHTML = 'Not a valid key'; 
				setTimeout( function(){ 
					valid.innerHTML = ''; 
				}, 2000)
			} else {
				if(self.guessList.indexOf(a) === -1 && self.word.indexOf(a) === -1) {
					self.lives--;
					self.guesses.innerHTML = self.guesses.innerHTML + '<span>' + a + '</span>';
					self.lifeCount.innerHTML = self.lives;
					self.guessList.push(a);
					error.play();
					switch(self.lives) {
						case 5:
							self.drawHead();
							break;
						case 4:
							self.drawBody();
							break;
						case 3:
							self.drawLeftArm();
							break;
						case 2:
							self.drawRightArm();
							break;
						case 1:
							self.drawLeftFoot();
							break;
						case 0:
							self.drawRightFoot();
							setTimeout(function() {
								let replay = confirm('You lose! Would you like to play again?');
								if(replay === true) {
									document.removeEventListener('keypress', _guess);
									start();
								}
							}, 200);							
							break;	
					}
				}
			}

			let success = new Audio('assets/sounds/success.wav');
			self.letters = document.getElementsByClassName("hide");
			for(var i = 0; i < self.letters.length; i++) {
				if(a === self.letters[i].innerHTML) {
					self.letters[i].className = "show";
					self.correct++;
					success.play();
					if(self.correct === self.word.length) {
						setTimeout(function() {
							var replay = confirm('You win! Would you like to play again?');
							if(replay === true) {
								document.removeEventListener('keypress', _guess);
								start();
							}
						}, 200);
					}
				}
			}
		})
	}

	/**Start with blank canvas**/
	this.ctx.clearRect(0, 0, 150, 450);
	this.wordBox.innerHTML = '';
	this.guesses.innerHTML = 'Already guessed: ';
}

function start() {

	var game = new Game();
	game.buildLetterBox();
	game.guess();
}


document.addEventListener("DOMContentLoaded", function(event) {
	start();
});