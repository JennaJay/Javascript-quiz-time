var startQuiz = document.getElementById("start-button");
var timer = document.querySelector("#Timer");
var timeLeft = 75;
var questionEl = document.querySelector(".questions");
var answerEl = document.querySelector(".answers");
var userHighScore = document.querySelector(".highscore");
var userInitials = document.querySelector("#initials");
var goBack = document.querySelector("#go-back");
var clearScores = document.querySelector("#clear-scores");
var userSubmit = document.querySelector("#submit-button");
var correctWrong = document.querySelector(".correct-wrong");
var gameEnd = document.querySelector(".game-over");
var lastScore = document.querySelector(".lastscore");
var gameWrap = document.querySelector(".game")
var putScore = document.querySelector(".putscore")

const quizQuestions = [
  {
    question: "Commonly used data types do not include:",
    choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
    correctAnswer: "3. Alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed within:",
    choices: [
      "1. Quotes",
      "2. Curly brackets",
      "3. Parentheses",
      "4. Square brackets",
    ],
    correctAnswer: "3. Parentheses",
  },
  {
    question: "Arrays in Javascript can be used to store:",
    choices: [
      "1. Numbers and strings",
      "2. Other arrays",
      "3. Booleans",
      "4. All of the above",
    ],
    correctAnswer: "4. All of the above",
  },
  {
    question:
      "String values must be enclosed within ________ when being assigned to variables:",
    choices: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parentheses"],
    correctAnswer: "3. Quotes",
  },
  {
    question: "Which array method removes the last element from the array?",
    choices: ["1. Pop", "2. Push", "3. Unshift", "4. Length"],
    correctAnswer: "1. Pop",
  },
];
var quizIndex = 0;

function startTimer() {
  window.timeInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
      gameOver();
      clearInterval(timeInterval);
    }
  }, 1000);
}
function displayQuestions() {
  questionEl.innerText = quizQuestions[quizIndex].question;
  var choiceList = quizQuestions[quizIndex].choices;
  console.log("list", choiceList);
  answerEl.dataset.answer = quizQuestions[quizIndex].correctAnswer;
  answerEl.textContent = "";
  for (var i = 0; i < choiceList.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choiceList[i];
    answerEl.appendChild(choiceButton);
  }
}

startQuiz.addEventListener("click", function (event) {
  event.preventDefault();
  startTimer();
  displayQuestions();
  startQuiz.style.display = "none"
});

answerEl.addEventListener("click", function (event) {
  var clickedEl = event.target;
  if (clickedEl.matches("button")) {
    var userAnswer = clickedEl.textContent;
    var rightAnswer = clickedEl.parentElement.dataset.answer;
    if (userAnswer === rightAnswer) {
      correctWrong.textContent = "Correct";
    } else {
      timeLeft -= 15;
      correctWrong.textContent = "Wrong";
    }
    nextQuestion();
  }
});

function nextQuestion() {
  setTimeout(function () {
    quizIndex++;
    correctWrong.textContent = "";
    if (quizIndex < quizQuestions.length) {
      displayQuestions();
    } else {
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
  gameEnd.style.display = "block";
  gameWrap.style.display = "none"
  lastScore.textContent = timeLeft;
}


function renderHighscore() {
  var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
  var initials = userInitials.value 
  var score = timeLeft
  var userScore = { initials, score}
  highScores.push(userScore)
  localStorage.setItem("highscores", JSON.stringify(highScores))
  
  putScore.textContent = "";
  for (var i = 0; i < highScores.length; i++) {
    var highscore = document.createElement('p');
    highscore.textContent = "Initials: " + highScores[i].initials + " | Score: " + highScores[i].score;
    putScore.appendChild(highscore);
  }
}

userSubmit.addEventListener("click", function () {
  //var highScore = userInitials;
  renderHighscore();
});

clearScores.addEventListener('click', function () {
  localStorage.removeItem('highscores')
  putScore.textContent = "";
})