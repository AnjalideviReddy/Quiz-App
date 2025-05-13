// ATS Keywords: JavaScript, Timer, DOM Manipulation, Event Handling, Score Tracking, Conditional Rendering

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "Python", "Node.js"],
    answer: "CSS"
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: "Django"
  },
  {
    question: "What keyword is used to declare a constant variable?",
    options: ["let", "var", "const", "define"],
    answer: "const"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Google", "Netscape", "Apple"],
    answer: "Netscape"
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//"
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Management", "Display Object Method", "Digital Ordinance Model"],
    answer: "Document Object Model"
  },
  {
    question: "Which method is used to add an element at the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()"
  },
  {
    question: "Which tag is used to link JavaScript to HTML?",
    options: ["<script>", "<js>", "<javascript>", "<link>"],
    answer: "<script>"
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onchange", "onmouseover", "onmouseclick", "onclick"],
    answer: "onclick"
  }
];

let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timeEl = document.getElementById("time");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  resetState();
  const currentQuestion = questions[currentIndex];
  questionEl.textContent = currentQuestion.question;

  currentQuestion.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => selectAnswer(li, option === currentQuestion.answer));
    optionsEl.appendChild(li);
  });

  startTimer();
}

function resetState() {
  clearInterval(timer);
  optionsEl.innerHTML = "";
  timeLeft = 15;
  timeEl.textContent = timeLeft;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextBtn.click();
    }
  }, 1000);
}

function selectAnswer(selectedLi, isCorrect) {
  const allLis = optionsEl.querySelectorAll("li");
  allLis.forEach(li => li.style.pointerEvents = "none");

  if (isCorrect) {
    selectedLi.classList.add("correct");
    score++;
  } else {
    selectedLi.classList.add("incorrect");
    allLis.forEach(li => {
      if (li.textContent === questions[currentIndex].answer) {
        li.classList.add("correct");
      }
    });
  }
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  scoreEl.textContent = score;
}

loadQuestion();
