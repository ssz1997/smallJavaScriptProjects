const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "how many horses?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 3
  },
  {
    question: "1+1=?",
    choice1: "1",
    choice2: "2",
    choice3: "4",
    choice4: "carrots",
    answer: 2
  }
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("end.html");
    }

    questionCounter ++;

    progressText.innerText = 'Question: '+ questionCounter + '/' + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    currentQuestion = availableQuestions[questionIndex];

    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
  choice.addEventListener('click', e =>{
    if (!acceptingAnswers){return;}
    else{
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];
      const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      if (classToApply === "correct"){
        incrementScore(CORRECT_BONUS);
      }
      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 500);


    }
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}

startGame();
