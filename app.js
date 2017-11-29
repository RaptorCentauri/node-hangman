const inquirer = require('inquirer');
let wordList = ["blue", "green", "yellow", "red", "orange", "purple", "pink", "indigo"]
let hiddenWord;
let updateWord;
let guess;
let guesses_remaining = 6;
let score = 0;

function playAgain() {
	word = new New_Word(pickRandomWord());
	// console.log(`ORGINIAL ${word.visibleWord}`);
	console.log(`Current Score: ${score}`);
	hiddenWord = word.hideWord();
	console.log(`${hiddenWord}`);
	updateWord = hiddenWord;
	playGame();
}

function pickRandomWord(){
	var randomNum = Math.floor(Math.random()*wordList.length);
	randomWord = wordList[randomNum].toLowerCase();
	return randomWord;
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, parseInt(index)) + replacement + this.substr(parseInt(index)+1);
}

function New_Word(str){
	this.visibleWord = str;
	this.hideWord = function(){
		return str.replace(/\w/gi, "#");
	}
}

function NewLetter(str){
	this.letter = str;
	this.lookup = function(str){
		return str.visibleWord.includes(this.letter);
	}
	this.replaceLetter = function(str){
			for (key in str){
				if(str[key] == guess.letter){
					updateWord = updateWord.replaceAt(key, guess.letter);
				}
			}
	}
}

let word = new New_Word(pickRandomWord());

// console.log(`ORGINIAL ${word.visibleWord}`);
console.log(`Current Score: ${score}`);
hiddenWord = word.hideWord();
console.log(`${hiddenWord}`);
updateWord = hiddenWord;



function playGame(){
	console.log(`You have ${guesses_remaining} guesses left.`);
	inquirer.prompt([
		{
			type: "input",
			message: "Guess a Letter",
			name: "letter",
		},
	]).then(function(result){
		 guess = new NewLetter(result.letter);
		 console.log(guess.letter);

		 if(guess.lookup(word)){
		 	guess.replaceLetter(word.visibleWord);
		 	console.log(`${updateWord}`);
			if(updateWord == word.visibleWord){
				console.log(`You Win!`);
				console.log(`The word was ${word.visibleWord}`);
				console.log(`=====================================================================================`);
				score++;

				inquirer.prompt([
					{
						type: "confirm",
						message: "Play Again?",
						name: "new",
					}
				]).then(function (result) {
					if(result.new){
						playAgain();
					}

				})

			}
			else {
				playGame();
			}
		 }
		 else {
		 	console.log(`That letter is not in the word`);
			guesses_remaining--;
			if (guesses_remaining > 0) {
				playGame();
			}
			else{
				console.log(`You Lose!`);
								inquirer.prompt([
									{
										type: "confirm",
										message: "Play Again?",
										name: "new",
									}
								]).then(function (result) {
									if(result.new){
										playAgain();
									}

								})
			}

		 }
	});
}
playGame();
