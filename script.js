//timer

var total_seconds = 60 * 5;
var c_minutes = parseInt(total_seconds / 60);
var c_seconds = parseInt(total_seconds % 60);

function checkTime() {
  document.getElementById("Quiz-time-left").innerHTML =
    "Time Left:" +
    " " +
    c_minutes +
    " " +
    "minutes" +
    " " +
    c_seconds +
    " " +
    "seconds";
  if (total_seconds <= 0) {
    // alert("time up");
    return window.location.assign("./finish.html");
  } else {
    total_seconds = total_seconds - 1;
    c_minutes = parseInt(total_seconds / 60);
    c_seconds = parseInt(total_seconds % 60);
    setTimeout("checkTime()", 1000);
  }
}

setTimeout("checkTime()", 1000);

//button functions
const startButton = document.getElementById("start-btn");
const finishButton = document.getElementById("finish-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container ");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-btn");
const text = document.getElementById("text");

//score
const questionCountertext = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const maxQuestion = 5;
const correctBonus = 10;
const wrongAnswer = 5;
let score = 0;
let questionCounter = 0;

//random question
var shuffleQuestions, currentQuestions;
startButton.addEventListener("click", startGame);
finishButton.addEventListener("click", endGame);
nextButton.addEventListener("click", () => {
  currentQuestions++;
  setNextQuestion();
});

function startGame() {
  // alert("started");

  startButton.classList.add("hide");
  text.classList.add("hide");
  //to show questions eg:1/2
  questionCountertext.innerText = questionCounter + "/" + maxQuestion;

  shuffleQuestions = question.sort(() => Math.random() - 0.5);
  currentQuestions = 0;
  questionContainerElement.classList.remove("hide");

  setNextQuestion();
}

//to finish the game
function endGame() {
  localStorage.setItem("mostRecentScore", score);
  return window.location.assign("./finish.html");
}

//to display nxtquestion
function setNextQuestion() {
  resetState();
  questionCounter++;
  questionCountertext.innerText = questionCounter + "/" + maxQuestion;
  showQuestion(shuffleQuestions[currentQuestions]);
}

//increase the score when answer is correct
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

//decrease the score when answer is wrong

decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  Array.from(answerButtonElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
    button.disabled = "true";
  });

  setScore(correct);

  if (shuffleQuestions.length > currentQuestions + 1) {
    nextButton.classList.remove("hide");
  } else {
    finishButton.innerText = "Finish";
    finishButton.classList.remove("hide");
  }
}

function setScore(correct) {
  //score
  if (correct) {
    setStatusClass(document.body, correct);
    incrementScore(correctBonus);
  } else {
    setStatusClass(document.body, correct);
    decrementScore(wrongAnswer);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(document.body);

  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const question = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    answers: [
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<Scripting>", correct: false },
      { text: "<javascript>", correct: false }
    ]
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      {
        text: " Both the <head> section and the <body> section are correct",
        correct: true
      },
      { text: " The <head> section", correct: false },
      { text: " The <body> section", correct: false }
    ]
  },
  {
    question:
      "What is the correct syntax for referring to an external script called xxx.js?",
    answers: [
      { text: "<script href='xxx.js'>", correct: false },
      { text: "<script name='xxx.js'>", correct: false },
      { text: "<script src='xxx.js'>", correct: true },
      { text: "<script file='xxx.js'>", correct: false }
    ]
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    answers: [
      { text: "msgBox('Hello World');", correct: false },
      { text: "alertBox('Hello World');", correct: false },
      { text: "msg('Hello World');", correct: false },
      { text: "alert('Hello World');", correct: true }
    ]
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: " function myFunction()", correct: true },
      { text: " function:myFunction()", correct: false },
      { text: " function = myFunction()", correct: false }
    ]
  }
];
