
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
    question: "The pipe having outer radius(r<sub>o</sub>), inner radius(r<sub>i</sub>), and thickness (t), the pipe is called as thick cylinder, when",
    answers: {
      a: "r<sub>o</sub>/r<sub>i</sub> &lt; 10",
      b: "r<sub>i</sub>/t &gt; 10",
      c: "r<sub>i</sub>/t &lt; 10",
      d: "r<sub>o</sub>/t = 10"
    },
    correctAnswer: "c"
  },

  {
    question: "The pipe having outer radius(r<sub>o</sub>), inner radius(r<sub>i</sub>), and thickness (t), the pipe is called as thin cylinder, when",
    answers: {
      a: "r<sub>o</sub>/r<sub>i</sub> &lt; 10",
      b: "r<sub>i</sub>/t &gt; 10",
      c: "r<sub>i</sub>/t &lt; 10",
      d: "r<sub>o</sub>/t = 10"
    },
    correctAnswer: "b"
  },

  {
    question: "Working pressure is the minimum pressure a pipe may be subjected to while in-service. (Say True or False)",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "b"
  },
  {
    question: "A pipe has outer radius of 24mm, inner radius of 20mm,then the pipe is",
    answers: {
      a: "Thick cylinder",
      b: "Thin cylinder",
      c: "Plain cylinder",
      d: "None of the above"
    },
    correctAnswer: "a"
  },
  {
    question: "The stress used to compute bursting pressure in this experiment is",
    answers: {
      a: "Mohr’s pressure",
      b: "Von-mises pressure",
      c: "Normal pressure",
      d: "Shear pressure"
    },
    correctAnswer: "b"
  }
];



// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
