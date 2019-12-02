let sequenceComputer = [];
let sequenceUser = [];
let round = 0;

const $messages = document.querySelector("#messages");
const $roundCounter = document.querySelector("#round-counter");

document.querySelector("#start-button").onclick = startGame;
lockUserInput();

function startGame() {
	reset();
	document.querySelector("#start-button").innerHTML = "STOP/RESET";
	handleRound();
}

function handleRound() {
	updateText(`Round N# ${round}`, $roundCounter);
	updateText("Computer's turn!", $messages, "success");
	lockUserInput();
	const $selectedButton = getRandomColorButton();
	sequenceComputer.push($selectedButton);
	const userTurnDelay = (sequenceComputer.length + 1) * 1000;
	sequenceComputer.forEach(function($button, index) {
		const sequenceDelay = (index + 1) * 1000;
		setTimeout(function() {
			highlight($button);
		}, sequenceDelay);
	});
	setTimeout(function() {
		updateText("Your Turn!", $messages, "info");
		unlockUserInput();
	}, userTurnDelay);
	sequenceUser = [];
	round++;
	updateText(`Round N# ${round}`, $roundCounter);
}

function handleUserInput(e) {
	const $clickedButton = e.target;
	highlight($clickedButton);
	sequenceUser.push($clickedButton);
	console.log(sequenceUser);

	const $computerSelection = sequenceComputer[sequenceUser.length - 1];
	if ($clickedButton.id !== $computerSelection.id) {
		gameOver();
		return;
	}
	if (sequenceUser.length === sequenceComputer.length) {
		lockUserInput();
		setTimeout(handleRound, 1000);
	}
}

function getRandomColorButton() {
	const $colorButtons = document.querySelectorAll(".color-button");
	const buttonIndex = Math.floor(Math.random() * $colorButtons.length);
	return $colorButtons[buttonIndex];
}

function updateText(newText, elementToUpdate, color = "warning") {
	elementToUpdate.innerHTML = newText;
	elementToUpdate.className = `alert alert-${color}`;
}

function highlight(elementToHighlight) {
	elementToHighlight.style.opacity = 1;
	setTimeout(() => {
		elementToHighlight.style.opacity = 0.5;
	}, 500);
}

function lockUserInput() {
	document.querySelectorAll(".color-button").forEach($button => {
		$button.onclick = function() {};
	});
}

function unlockUserInput() {
	document.addEventListener("keydown", event => {
		switch (event.key) {
			case "1":
				document.querySelector("#button1").click();
				break;
			case "2":
				document.querySelector("#button2").click();
				break;
			case "3":
				document.querySelector("#button3").click();
				break;
			case "4":
				document.querySelector("#button4").click();
				break;
			default:
				break;
		}
	});
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
	updateText("Game over! Start again?", $messages, "danger");
	document.querySelector("#start-button").innerHTML = "START NEW GAME";
}
