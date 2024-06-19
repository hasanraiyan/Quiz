const pages = document.querySelectorAll(".page");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".option-container");
const nextBtn = document.querySelector(".nextBtn");
const playAgainBtn = document.querySelector(".play-again");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector(".alert");
const startBtn = document.querySelector(".start-btn");
const timer = document.querySelector(".timer");
const page1 = document.querySelector(".page-1");
const page2 = document.querySelector(".page-2");
const page3 = document.querySelector(".page-3");

// Game initial state
let currentQuestion = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;
let question = 10;

// Function to show question
const showQuestions = () => {
  console.log("showQuestions called");
  const questionDetails = quiz[currentQuestion];

  questionBox.innerHTML = questionDetails.question;

  // Clear previous choices if any
  choicesBox.innerHTML = "";

  // Loop through the choices and create div elements for each choice
  for (let i = 0; i < 4; i++) {
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement("div");
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add("choice");
    choicesBox.appendChild(choiceDiv);

    // Add event listener for click event
    choiceDiv.addEventListener("click", () => {
      const allChoices = document.querySelectorAll(".choice");
      allChoices.forEach((choice) => {
        choice.classList.remove("selected");
      });

      choiceDiv.classList.add("selected");
    });
  }

  if (currentQuestion < 10) {
    showTimer();
  }
};

// function to check answer
const checkAnswer = () => {
  console.log("checkAnswer called");
  const selectedChoice = document.querySelector(".choice.selected");
  // handle the empty selection error
  if (!selectedChoice) {
    alert.style.backgroundColor = "red";
    showAlert("Please select an answer.");
    return;
  }
  if (selectedChoice) {
    const selectedChoiceText = selectedChoice.textContent;

    if (
      selectedChoiceText ===
      quiz[currentQuestion].choices[quiz[currentQuestion].correctAnswer]
    ) {
      // alert correct answer
      alert.style.backgroundColor = "green";
      showAlert("Correct Answer!");
      score++;
    } else {
      // alert("Wrong answer");
      alert.style.backgroundColor = "red";
      showAlert(
        `Wrong Answer! ${
          quiz[currentQuestion].choices[quiz[currentQuestion].correctAnswer]
        } is the Correct Answer`
      );
    }
  }
  timeLeft = 15;
  currentQuestion++;
  if (currentQuestion < 2) {
    showQuestions();
  } else {
    stopTimer();
    showScore();
  }
};

// function to show the final score
const showScore = () => {
  home();
  page1.style.display = "none";
  page3.style.display = "flex";
  scoreCard.textContent = `Your Final Score is ${score} out of 10`;
  showAlert("You have completed this quiz!");
  nextBtn.textContent = "Play Again";
  quizOver = true;
  timer.style.display = "none";
};

// Function to Show Alert when user submit the question
const showAlert = (msg) => {
  alert.style.display = "block";
  alert.textContent = msg;
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

// Function to show timer
const showTimer = () => {
  clearInterval(timerID);

  timer.textContent = timeLeft;

  const countDown = () => {
    timeLeft--;
    timer.textContent = timeLeft;

    if (timeLeft === 0) {
      const confirmUser = confirm(
        "Time Up!!! Do you want to play the quiz again?"
      );

      if (confirmUser) {
        timeLeft = 15;
        startQuiz();
      } else {
        home();
      }

      clearInterval(timerID); // Clear the timer interval
    }
  };

  timerID = setInterval(countDown, 1000);
};

// Function to stop timer
const stopTimer = () => {
  console.log("stopTimer called");
};

// Function to shuffle question
const shuffleQuestions = () => {
  console.log("shuffleQuestions called");
  for (let i = quiz.length - 1; i > 0; i--) {
    // generate random number
    const j = Math.floor(Math.random() * (i + 1));
    // reverse the question
    const temp = quiz[i];
    quiz[i] = quiz[j];
    quiz[j] = temp;
  }
  showQuestions();
};

// Function to start Quiz
const startQuiz = () => {
  console.log("startQuiz called");
  timeLeft = 15;
  timer.style.display = "flex";
  shuffleQuestions();
};

// const home screen
const home = () => {
  alert.style.display = "none";
  timer.style.display = "none";
  pages.forEach((page) => {
    page.style.display = "none";
  });
  page1.style.display = "block";
};
// listen event to start button
startBtn.addEventListener("click", () => {
  pages.forEach((page) => {
    page.style.display = "none";
  });
  page2.style.display = "block";
  startQuiz();
});

// add event listner to the next button
nextBtn.addEventListener("click", () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (!selectedChoice && nextBtn.textContent === "Next") {
    // alert("Select your answer");
    showAlert("Select your answer");
    return;
  }
  checkAnswer();
});
playAgainBtn.addEventListener("click", () => {
  if (quizOver) {
    home();
    console.log("call");
    scoreCard.textContent = "";
    currentQuestion = 0;
    quizOver = false;
    score = 0;
    startQuiz();
  }
});
