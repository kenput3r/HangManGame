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
}

Game.prototype.drawHead = function() {
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

Game.prototype.drawBody = function() {
	this.ctx.beginPath();
	this.ctx.moveTo(75, 125);
	this.ctx.lineTo(75, 340);
	this.ctx.stroke();
	this.ctx.closePath();
}

Game.prototype.drawLeftArm = function() {
	this.ctx.beginPath();
	this.ctx.moveTo(30, 160);
	this.ctx.lineTo(75, 160);
	this.ctx.stroke();
	this.ctx.closePath();
}

Game.prototype.drawRightArm = function() {
	this.ctx.beginPath();
	this.ctx.moveTo(75, 160);
	this.ctx.lineTo(120, 160);
	this.ctx.stroke();
	this.ctx.closePath();
}

Game.prototype.drawLeftFoot = function() {
	this.ctx.beginPath();
	this.ctx.moveTo(30, 370);
	this.ctx.lineTo(75, 340);
	this.ctx.stroke();
	this.ctx.closePath();
}

Game.prototype.drawRightFoot = function() {
	this.ctx.beginPath();
	this.ctx.moveTo(75, 340);
	this.ctx.lineTo(120, 370);
	this.ctx.stroke();
	this.ctx.closePath();
}

Game.prototype.randomWord = function() {
	var randomNumber = Math.floor(Math.random() * (this.words.length));
	return [this.words[randomNumber], this.hints[randomNumber]];
}

Game.prototype.buildLetterBox = function() {
	this.lifeCount.innerHTML = this.lives;
	this.hint.innerHTML = this.helper;
	for(var i = 0; i < this.word.length; i++) {
		var char = this.word.charAt(i);
		this.wordBox.innerHTML = this.wordBox.innerHTML + '<div class="letter-box"><span class="hide">' + char + '</span></div>';
	}
}

Game.prototype.guess = function() {
	document.addEventListener("keypress", (event) => {

		let a = event.key.toLowerCase();
		let error = new Audio('assets/sounds/error.wav');
		if(this.guessList.indexOf(a) === -1 && this.word.indexOf(a) === -1) {
			this.lives--;
			this.guesses.innerHTML = this.guesses.innerHTML + '<span>' + a + '</span>';
			this.lifeCount.innerHTML = this.lives;
			this.guessList.push(a);
			error.play();
			if(this.lives == 5) {
				this.drawHead();
			}else if(this.lives == 4) {
				this.drawBody();
			}else if(this.lives == 3) {
				this.drawLeftArm();
			}else if(this.lives == 2) {
				this.drawRightArm();
			}else if(this.lives === 1) {
				this.drawLeftFoot();
			}else if(this.lives === 0) {
				this.drawRightFoot();
				setTimeout(function() {
					alert('You lose');
				}, 200);
			}
		}

		let success = new Audio('assets/sounds/success.wav');
		this.letters = document.getElementsByClassName("hide");
		for(var i = 0; i < this.letters.length; i++) {
			if(a === this.letters[i].innerHTML) {
				this.letters[i].className = "show";
				this.correct++;
				success.play();
				if(this.correct === this.word.length) {
					setTimeout(function() {
						alert('You Win');
					}, 200);
				}
			}
		}
	})
}


document.addEventListener("DOMContentLoaded", function(event) {
	var game = new Game();
	const text = game.randomWord();
	game.word = text[0];
	game.helper = text[1];
	game.buildLetterBox();
	game.guess();
});