var startQuiz = document.getElementById('start-button');
var timer = document.querySelector("#Timer")
var timeLeft = 75;
var questionEl = document.querySelector(".questions")
var answerEl = document.querySelector(".answers")

const quizQuestions = [
    {
      question: "Commonly used data types do not include:",
      choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
      correctAnswer: "3. Alerts"
    },
    {
      question: "The condition in an if/else statement is enclosed within:",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      correctAnswer: "parentheses"
    },
    {
      question: "Arrays in Javascript can be used to store:",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      correctAnswer: "all of the above"
    },
  {
      question: "String values must be enclosed within ________ when being assigned to variables:",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      correctAnswer: "quotes"
    },
    {
      question: "Which array method removes the last element from the array?",
      choices: ["pop", "push", "unshift", "length"],
      correctAnswer: "pop"
    },
  ];
  var quizIndex = 0

function startTimer() {
    window.timeInterval = setInterval(() =>{
        timer.textContent = "Time: " + timeLeft
        timeLeft--;
        if(timeLeft <= 0) {
            clearInterval(timeInterval)
        }
    }, 1000)

}
function displayQuestions(){
questionEl.innerText = quizQuestions[quizIndex].question
var choiceList = quizQuestions[quizIndex].choices
let answerButtons = ""
console.log('list', choiceList)
for(var i = 0; i < choiceList.length; i++) {
    console.log('list', choiceList)
answerButtons += `<li>${choiceList[i]}</li>`
console.log(answerButtons)
answerEl.innerHTML = answerButtons
}
}

startQuiz.addEventListener('click', function(event) {
    event.preventDefault()
    startTimer()
    displayQuestions()
} )

