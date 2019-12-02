let sequenceComputer = [];
let sequenceUser = [];
let round = 0;

const $messages = document.querySelector("#messages");
const $roundCounter = document.querySelector("#round-counter");

document.querySelector("#start-button").onclick = startGame;
lockUserInput();

function startGame() {
	reset();
	handleRound();
}

function handleRound() {
	updateText(`Round N# ${round}`, $roundCounter);
	updateText("Computer's turn!", $messages);
	const $selectedButton = getRandomColorButton();
	sequenceComputer.push($selectedButton);
	const userTurnDelay = (sequenceComputer.length + 1) * 1000;
	sequenceComputer.forEach(($button, index) => {
		const sequenceDelay = (index + 1) * 1000;
		setTimeout(() => {
			highlight($button);
		}, sequenceDelay);
	});
	setTimeout(() => {
		updateText("Your Turn!", $messages);
		unlockUserInput();
	}, userTurnDelay);
	sequenceUser = [];
	round++;
	updateText(`Round N# ${round}`, $roundCounter);
}

function highlight(elementToHighlight) {
	elementToHighlight.style.opacity = 1;
	setTimeout(() => {
		elementToHighlight.style.opacity = 0.5;
	}, 500);
}

function getRandomColorButton() {
	const $colorButtons = document.querySelectorAll(".color-button");
	const buttonIndex = Math.floor(Math.random() * $colorButtons.length);
	return $colorButtons[buttonIndex];
}

function handleUserInput(e) {
	const $clickedButton = e.target;
	highlight($clickedButton);
	sequenceUser.push($clickedButton);
	const $computerSelection = sequenceComputer[sequenceUser.length - 1];
	if ($clickedButton.id !== $computerSelection.id) {
		gameOver();
		return;
	}
	if ($clickedButton.length === $computerSelection.length) {
		lockUserInput();
		setTimeout(handleRound, 1000);
	}
}

function updateText(textToUpdate, elementToUpdate) {
	elementToUpdate.innerHTML = textToUpdate;
}

function lockUserInput() {
	document.querySelectorAll("color-button").forEach(($button, index) => {
		$button.onclick = function() {};
	});
}

function unlockUserInput() {
	document.querySelectorAll(".color-button").forEach($button => {
		$button.onclick = handleUserInput;
	});
}

function reset() {
	sequenceComputer = [];
	sequenceUser = [];
	round = 0;
}

function gameOver() {
	lockUserInput();
	updateText("Game over! Start again?", $messages);
}
