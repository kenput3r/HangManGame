function Game() {
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
			if(this.lives === 0) {
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