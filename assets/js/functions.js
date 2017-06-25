function Game() {
	this.wordBox = document.getElementById("WordBox");
	this.guesses = document.getElementById("Guesses");
	this.lifeCount = document.getElementById("LifeCount");
	this.guessList = [];
	this.words = ["invoke", "javascript", "constant", "variable", "function", "parameter", "argument"];
	this.correct = 0;
	this.lives = 6;
}

Game.prototype.randomWord = function() {
	var randomNumber = Math.floor(Math.random() * (this.words.length));
	return this.words[randomNumber];
}

Game.prototype.buildLetterBox = function() {
	this.lifeCount.innerHTML = this.lives;
	for(var i = 0; i < this.word.length; i++) {
		var char = this.word.charAt(i);
		this.wordBox.innerHTML = this.wordBox.innerHTML + '<div class="letter-box"><span class="hide">' + char + '</span></div>';
	}
}

Game.prototype.guess = function() {
	document.addEventListener("keypress", (event) => {

		let a = event.key.toLowerCase();
		if(this.guessList.indexOf(a) === -1 && this.word.indexOf(a) === -1) {
			this.lives--;
			this.guesses.innerHTML = this.guesses.innerHTML + '<span>' + a + '</span>';
			this.lifeCount.innerHTML = this.lives;
			this.guessList.push(a);
			if(this.lives === 0) {
				setTimeout(function() {
					alert('You lose');
				}, 200);
			}
		}

		this.letters = document.getElementsByClassName("hide");
		for(var i = 0; i < this.letters.length; i++) {
			if(a === this.letters[i].innerHTML) {
				this.letters[i].className = "show";
				this.correct++;
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
	game.word = game.randomWord();
	game.buildLetterBox();
	game.guess();
});