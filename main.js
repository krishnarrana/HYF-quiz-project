// console.log('Script loaded');
document.querySelector(".loading").classList.add("show");
const quizURL = "https://gist.githubusercontent.com/benna100/c9c38faebea1526fb4e6b6b896a1dc94/raw/8bcaf89d7ed704ff1c0e3f2efa229369ed4dd0a2/quiz-testing.json";

function renderQuiz(questionsList) {
    let htmlString = ``;
    const renderElement = document.querySelector(".questions");



    questionsList.forEach(questions => {
        let optionsHtml = `<option  disabled="disabled">--- select an option---</option>`;
        questions.options.forEach(option => {
            optionsHtml += "<option >" + option.content + "</option>";
        });

        htmlString += `
			<li>
	            <h2>${questions.title}</h2>
	            <p>${questions.content} </p>
	            <select class="options">
	            ${optionsHtml}
	            </select>
	        </li>
		`;
    });
    renderElement.innerHTML = htmlString;

}
function getUserInputValues(userInputs){
	let userInputsValues= [];
	for(let userInput in [...userInputs]){
		userInputsValues.push(userInputs[userInput].value);
	}
	return userInputsValues;
}
fetch(quizURL)
    .then(quizData => {
        return quizData.json();
    })
    .then(quizList => {
        document.querySelector(".loading").classList.remove("show");
        console.log(quizList.quiz.questions);
        renderQuiz(quizList.quiz.questions);
        document.querySelector(".getScore").addEventListener("click", e=>{
        	e.preventDefault();
        	console.log("user clicked button");
        	userInputs= document.getElementsByClassName("options");
        	console.log(getUserInputValues(userInputs))
        });
    })