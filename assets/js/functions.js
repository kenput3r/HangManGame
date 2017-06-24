var WordBox = document.getElementById("WordBox");
var guesses = document.getElementById("Guesses");
var lifeCount = document.getElementById("LifeCount");
var	guessList = [];
var	words = ["html", "javascript", "php", "jquery"];
var word = randomWord(words);
var correct = 0;
var lives = 6;

function randomWord(words) {
	var randomNumber = Math.floor(Math.random() * (words.length - 1));
	return words[randomNumber];
}

function buildLetterBox(word) {
	lifeCount.innerHTML = lives;
	for(var i = 0; i < word.length; i++) {
		var char = word.charAt(i);
		WordBox.innerHTML = WordBox.innerHTML + '<div id="' + i + '" class="letter-box"><span class="hide">' + char + '</span></div>';
	}
}

function guess() {
	document.addEventListener("keypress", function(event) {

		let a = event.key.toLowerCase();
		if(guessList.indexOf(a) === -1 && word.indexOf(a) === -1) {
			lives--;
			guesses.innerHTML = guesses.innerHTML + '<span>' + a + '</span>';
			lifeCount.innerHTML = lives;
			guessList.push(a);
			if(lives === 0) {
				setTimeout(function() {
					alert('You lose');
				}, 200);
			}
		}

		let letters = document.getElementsByClassName("hide");
		for(var i = 0; i < letters.length; i++) {
			if(a === letters[i].innerHTML) {
				letters[i].className = "show";
				correct++;
				if(correct === word.length) {
					setTimeout(function() {
						alert('You Win');
					}, 200);
				}
			}
		}


	})
}



document.addEventListener("DOMContentLoaded", function(event) {
	buildLetterBox(word);
	guess();
});

