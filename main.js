// Select ELement
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanCounter = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit-button");
let countdownElement = document.querySelector(".countdown");
let resultsContainer = document.querySelector(".results");

// Set Options
let currentIndex = 0;
let rightAnswer = 0;

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionObject = JSON.parse(this.responseText);
      let quCount = questionObject.length;

      // Create Bullets + Set Question Count
      createBullets(quCount);

      // Add Question Data
      addQuestionData(questionObject[currentIndex], quCount);

      // Start CountDown
      countdown(5, quCount);

      // Click Button Submit
      submitButton.onclick = () => {
        // Get Right Answer
        let rightAnswer = questionObject[currentIndex].right_answer;

        // Increse Index
        currentIndex++;

        // Check The Answer
        chackedAnswer(rightAnswer, quCount);

        // Remove Previous Question
        quizArea.innerHTML = "";
        answerArea.innerHTML = "";

        // Add Question Data
        addQuestionData(questionObject[currentIndex], quCount);

        // Handel Bullets
        handelBullets();

        // Start CountDown
        clearInterval(countdownInterval);
        countdown(5, quCount);

        // Show Result
        showResult(quCount);
      };
    }
  };

  myRequest.open("GET", "html_questios.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // Create Span
  for (let i = 0; i < num; i++) {
    let theBullets = document.createElement("span");

    // Check If Its First Span
    if (i === 0) {
      theBullets.className = "on";
    }

    // Append Bullets To Container
    bulletsSpanCounter.appendChild(theBullets);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    quizArea.innerHTML = `<h2> ${obj.title} </h2>`;

    for (let i = 1; i <= 4; i++) {
      answerArea.innerHTML += `
      <div class="answer">
          <input type="radio" id="answer_${i}" name="question" data-answer=${
        obj[`answer_${i}`]
      } />
          <label for="answer_${i}">${obj[`answer_${i}`]}</label>
      </div>`;
    }
    if (answerArea.children[0].children[0]) {
      answerArea.children[0].children[0].checked = true;
    }
  }
}

function chackedAnswer(rAnswer, num) {
  // Get The Answer
  let answers = document.getElementsByName("question");

  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswer++;
  }
}

function handelBullets() {
  let bulletsSpan = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpan = Array.from(bulletsSpan);
  arrayOfSpan.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, secounds;

    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      secounds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      secounds = secounds < 10 ? `0${secounds}` : secounds;

      countdownElement.innerHTML = `${minutes} : ${secounds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}

function showResult(count) {
  let theResult;
  if (currentIndex === count) {
    quizArea.remove();
    answerArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswer > count / 2 && rightAnswer < count) {
      theResult = `<span class="good">good</span>, ${rightAnswer} from ${count}`;
    } else if (rightAnswer === count) {
      theResult = `<span class="perfect">Perfect</span>, ${rightAnswer} from ${count}`;
    } else {
      theResult = `<span class="bad">bad</span>, ${rightAnswer} from ${count}`;
    }

    resultsContainer.innerHTML = theResult;
  }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// function getRequestions() {
//   let myRequest = new XMLHttpRequest();

//   myRequest.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//       let questionss = JSON.parse(this.responseText);
//     }
//   };

//   myRequest.open("GET", "URL", true);
//   myRequest.send();
// }
