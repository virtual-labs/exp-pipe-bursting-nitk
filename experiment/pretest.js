
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

const myQuestions = [
  {
    question: "The pressure on pipe induces normal stress in",
    answers: {
      a: " Longitudinal direction",
      b: "Circumferential direction",
      c: "Radial direction",
      d: "In all direction"

    },
    correctAnswer: "d"
  },

  {
    question: "To find the bursting pressure, Von-Mises Stress is equated to",
    answers: {
      a: "Ultimate Strength",
      b: "Yield Strength",
      c: "Modulus of Elasticity",
      d: "None of the above"
    },
    correctAnswer: "a"
  },

  {
    question: "Von-Mises stress is computed using normal stress in three directions of the pipe. (Say True of False)",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "a"
  },
  {
    question: "The bursting pressure of the pipe is",
    answers: {
      a: "Maximum allowable pressure",
      b: "Maximum rupturing pressure",
      c: "Minimum rupturing pressure",
      d: "Minimum allowable pressure"
    },
    correctAnswer: "c"
  },
  {
    question: "The minimum pressure that causes irreversible damage on the pipe by bursting is _________",
    answers: {
      a: "Working pressure",
      b: "Yield pressure",
      c: "Bursting pressure",
      d: "All the above"
    },
    correctAnswer: "c"
  }
];





// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
