let questions = [
	{
		questionText: "Quelle(s) commande(s) permet(tent) de créer un dossier ?",
		answers: [
			{
				text: "cd",
				validAnswer: false
			},
			{
				text: "mkdir",
				validAnswer: true
			},
			{
				text: "mv",
				validAnswer: false
			},
			{
				text: "ls",
				validAnswer: false
			}
		],
		userAnswersValid: false
	},
	{
		questionText: "Quelle(s) commande(s) permet(tent) de créer une nouvelle branche ?",
		answers: [
			{
				text: "git checkout -b",
				validAnswer: true
			},
			{
				text: "git pull",
				validAnswer: false
			},
			{
				text: "git checkout",
				validAnswer: false
			},
			{
				text: "git branch",
				validAnswer: true
			}
		],
		userAnswersValid: false
	}
]

// Create questions elements
function appendNewElement(typeElement, parentElement) {
	const newElement = document.createElement(typeElement);
	parentElement.appendChild(newElement);
	return (newElement);
}

function createQuestionsElements() {
	const allQuestionsContainer = document.getElementById("all-questions-container");
	let container;
	let questionTitle;
	let answersList;
	let questionAnswer;
	let checkboxAnswer;
	let labelAnswer;

	for(let i = 0; i < questions.length; i++)
	{
		container = appendNewElement("div", allQuestionsContainer);
		container.className = "question-container";
		
		questionTitle = appendNewElement("h2", container);
		questionTitle.innerText = questions[i].questionText;

		answersList = appendNewElement("ul", container);
		answersList.className = "answers-list";

		for(let j = 0; j < questions[i].answers.length; j++)
		{
			questionAnswer = appendNewElement("li", answersList);
			
			checkboxAnswer = appendNewElement("input", questionAnswer);
			checkboxAnswer.type = "checkbox";
			checkboxAnswer.id = `q${i+1}r${j+1}`;

			labelAnswer = appendNewElement("label", questionAnswer);
			labelAnswer.innerText = questions[i].answers[j].text;
			labelAnswer.htmlFor = checkboxAnswer.id;
		}
	}
}


// Parse, check and update user answers
function getAllUserAnswers() {
	const userAnswersElements = document.querySelectorAll(".answers-list");
	let userAnswers = [];

	for (let i = 0; i < userAnswersElements.length; i++) {
		userAnswers.push([]);
		for (let j = 0; j < userAnswersElements[i].children.length; j++) {
			userAnswers[i][j] = userAnswersElements[i].children[j].children[0].checked;
		}
	}
	return (userAnswers);
}

function areQuestionAnswerValid(userAnswers, answersData) {
	for (let i = 0; i < userAnswers.length; i++) {
		if (userAnswers[i] !== answersData[i].validAnswer)
			return (false);
	}
	return (true);
}

function updateQuestionsData() {
	const allUserAnswers = getAllUserAnswers();

	for (let i = 0; i < allUserAnswers.length; i++) {
		questions[i].userAnswersValid = areQuestionAnswerValid(allUserAnswers[i], questions[i].answers);
	}
}

// Display
function getValidAnswersText(answers) {
	let finalText = "Les bonnes réponses sont : ";

	for (let i = 0; i < answers.length; i++) {
		if (answers[i].validAnswer) {
			finalText += answers[i].text;
			finalText += ", ";
		}
	}
	finalText = finalText.slice(0, -2);
	finalText += ".";
	return (finalText);
}

function createTextElement(text, parentElement) {
	const element = document.createElement("p");

	element.innerText = text;
	parentElement.appendChild(element);
}

function displaySolutions() {
	const allQuestionsContainersElements = document.querySelectorAll(".question-container");
	let textSolution = "";

	for (let i = 0; i < allQuestionsContainersElements.length; i++) {
		textSolution = (questions[i].userAnswersValid ? "Bravo ! " : "Dommage ! ");
		textSolution += getValidAnswersText(questions[i].answers);
		createTextElement(textSolution, allQuestionsContainersElements[i]);
	}
}

function displayScore() {
	const mainElement = document.querySelector("main");
	let textScore = "Voici ton score final : ";
	let score = 0;
	for (let i = 0; i < questions.length; i++) {
		if (questions[i].userAnswersValid)
			score++;
	}
	textScore += score.toString() + " / " + questions.length.toString();
	createTextElement(textScore, mainElement);
}

// Sumbmit button event
const formButton = document.getElementById("form-button");
const resetButton = document.getElementById("reset-button");
resetButton.style.display = "none";

formButton.addEventListener("click", () => {
	updateQuestionsData();
	displaySolutions();
	formButton.remove();
	displayScore();
	resetButton.style.display = "initial";
});

// Start
resetButton.addEventListener("click", () => { location.reload() });
createQuestionsElements();