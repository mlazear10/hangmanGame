// GLOBAL VARIABLES
// =================================================
// Arrays and vairables for holding data

var wordOptions = ["elephant", "giraffe", "ostrich", "gazelle", "mongoose", "anteater", "zebra"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = []; //j __ - __ __ _ -_ 
var wrongLetters = [];

// Game counters:
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

//FUNCTIONS (Reusable blocks of code that I will call upon when needed
//===================================================

function startGame () {
	selectedWord = wordOptions[Math.floor(Math.random() *wordOptions.length)];
	lettersInWord = selectedWord.split("");
	numBlanks = lettersInWord.length;
	
	//Reset
	guessesLeft = 9;
	wrongLetters = [];
	blanksAndSuccesses = [];

	//Populate blanks and successes with right number of blanks.
	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");
	}

	//Change html to reflect round conditions
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;

	// Testing / debugging
	console.log(selectedWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
	// Check if the letter exists anywhere in the word
	var isLetterInWord = false;
	for (var i = 0; i < numBlanks; i++) {
		if(selectedWord[i] == letter) {
			isLetterInWord = true;
		}
	}

	//Check where in word letter exists, then populate out blanksAndSuccesses array.
	if(isLetterInWord) {
		for (var i = 0; i < numBlanks; i++) {
			if(selectedWord[i]  == letter) {
				blanksAndSuccesses[i] = letter;
				//Needs only one equal sign for the 
			}
		}
	}

	else {
		wrongLetters.push(letter);
		guessesLeft--;
	}

	//testing and debugging
	console.log(blanksAndSuccesses);
}

function roundComplete() {
	console.log("Win Count : " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);
	//Update the HTML to reflect the most recent count stats
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

	// Check if user won
	if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("You Win!");

		//Update the win counter in the HTML 
		document.getElementById("winCounter").innerHTML = winCount;
		startGame();
	}
	// Check if user lost

	else if (guessesLeft == 0) {
		lossCount++;
		alert("You lost");
		// Update the HTML
		document.getElementById("lossCounter").innerHTML = lossCount;
		startGame();
	}
}

//MAIN PROCESS
//===================================================
// Initiates the code the first time
startGame();

//Register key clicks
document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();

	//Testing / debugging
	console.log(letterGuessed);
}

