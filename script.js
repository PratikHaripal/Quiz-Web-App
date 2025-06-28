const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Madrid", "Berlin", "Paris", "Rome"],
    correct: 2
  },
  {
    question: "Which language runs in the browser?",
    answers: ["Python", "Java", "C++", "JavaScript"],
    correct: 3
  },
  {
    question: "Which company developed React?",
    answers: ["Google", "Microsoft", "Facebook", "Netflix"],
    correct: 2
  },
  {
    question: "What is 2 + 2 * 2?",
    answers: ["6", "8", "4", "2"],
    correct: 0
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    answers: ["<style>", "<script>", "<css>", "<link>"],
    correct: 0
  },
  {
    question: "Which method is used to parse a JSON string into a JavaScript object?",
    answers: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "parse.JSON()"],
    correct: 0
  },
  {
    question: "Which CSS property controls the text size?",
    answers: ["font-style", "text-size", "font-size", "text-style"],
    correct: 2
  },
  {
    question: "In JavaScript, which keyword is used to declare a variable?",
    answers: ["var", "let", "const", "All of the above"],
    correct: 3
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    answers: ["String", "Boolean", "Float", "Undefined"],
    correct: 2
  }
];


let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerList = document.getElementById("answer-list");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result");

function loadQuestion() {
  resetState();
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  q.answers.forEach((answer, index) => {
    const li = document.createElement("li");
    li.textContent = answer;
    li.classList.add("option");
    li.addEventListener("click", () => selectAnswer(li, index));
    answerList.appendChild(li);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  answerList.innerHTML = "";
  resultBox.textContent = "";
}

function selectAnswer(selectedOption, index) {
  const correctIndex = questions[currentQuestion].correct;

  if (index === correctIndex) {
    selectedOption.classList.add("correct");
    score++;
  } else {
    selectedOption.classList.add("wrong");
    answerList.children[correctIndex].classList.add("correct");
  }

  // Disable all options after answering
  Array.from(answerList.children).forEach(opt => {
    opt.style.pointerEvents = "none";
  });

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
});

function showFinalScore() {
  resetState();
  questionEl.textContent = "Quiz Completed!";
  resultBox.textContent = `Your Score: ${score} / ${questions.length}`;
  nextBtn.textContent = "Restart Quiz";
  nextBtn.style.display = "block";
  nextBtn.onclick = () => location.reload();
}

loadQuestion();
