const sequenceComputer = [];
const sequenceUser = [];
let round = 0;

const $messages = document.querySelector("#messages");
const $roundCounter = document.querySelector("#round-counter");

document.querySelector("#start-button").onclick = () => {
	lockUserInput();
	turnComputer();
};

function handleUserInput(e) {}

function turnComputer() {
	round++;
	updateText(`Round N# ${round}`, $roundCounter);
	updateText("Computer's turn!", $messages);

	let selector = Math.floor(Math.random() * 4);
	console.log(selector);
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
	document.querySelectorAll("color-button").forEach($button => {
		$button.onclick = handleUserInput();
	});
}
