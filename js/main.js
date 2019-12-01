const sequenceComputer = [];
const sequenceUser = [];
let rounds = 0;

document.querySelector("#start-button").onclick = () => {
	blockUserInput();
};

function lockUserInput() {
	document.querySelectorAll("color-button").forEach($button => {
		$button.onclick = function() {};
	});
}
function unlockUserInput() {
	document.querySelectorAll("color-button").forEach($button => {
		$button.onclick = handleUserInput();
	});
}

function handleUserInput(e) {}
