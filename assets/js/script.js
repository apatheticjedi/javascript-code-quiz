/* PSEUDOCODE:
When "Start Quiz" button is pressed:
    1. Hide intro div and display quiz div, inserting question and possible answers
    2. Start timer
When correct answer is pressed, display "Correct answer" message and insert a different question and answers. Repeat a determined number of times.
When incorrect answer is pressed, deduct 10 seconds from time and display another question. 
When all answers are complete or timer reaches zero, hide quiz div and display quiz-over div.
When initials are submitted, hide quiz-over div and display high-scores div. If "Go back" button is pressed, hide quiz over div and display intro div.
If Clear high scores button is pressed, all initials are removed.
If "View High Scores" is clicked, intro div is hidden and high-scores div is displayed. */

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above",
        ],
        answer: "all of the above",
    },
    {
        title:
            "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
    },
    {
        title:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log",
    },
];
var timeLeft = 60;
var questionIndex = 0;
var timeInterval;
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// start timer when "Start Quiz" button is clicked
function setTimer() {
    var timerEl = document.getElementById('timer');

    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timeLeft--;
            timerEl.textContent = 'Time Left: ' + timeLeft + ' seconds';
        } else if (timeLeft === 1) {
            timeLeft--;
            timerEl.textContent = 'Time Left: ' + timeLeft + ' second';
        } else {
            timerEl.textContent = "Time's Up!";
            endGame();
        }
    }, 1000);
}

// Hide intro and display quiz div when "Start Quiz" button is clicked
var startQuiz = document.querySelector('.start-btn').addEventListener('click', function () {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    setTimer();
    showQuestions();
});

// display questions when "Start Quiz" button is clicked
function showQuestions() {
    document.getElementById('quiz').innerHTML =
        `<div class="question">
                <h2>${questions[questionIndex].title}</h2>
            </div>
            <div class="answers">
                <button class="choices">${questions[questionIndex].choices[0]}</button>
                <button class="choices">${questions[questionIndex].choices[1]}</button>
                <button class="choices">${questions[questionIndex].choices[2]}</button>
                <button class="choices">${questions[questionIndex].choices[3]}</button>
            </div>`
};

// Check answer against clicked answer button
document.getElementById('quiz').onclick = function (e) {
    e.preventDefault();

    if (e.target.matches(".choices")) {
        if (e.target.innerText === questions[questionIndex].answer) {
            document.getElementById("response").innerHTML =
                "<h3>Correct</h3>"
        } else {
            document.getElementById("response").innerHTML =
                "<h3>Wrong</h3>";
            timeLeft = timeLeft - 10;
        }
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestions();
        } else {
            endGame();
        }
    }
};

// end quiz and display the quiz-over div
function endGame() {
    clearInterval(timeInterval);
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('quiz-over').style.display = 'block';
    document.getElementById('score').textContent = timeLeft;
}

// View high scores when "View High Scores" element is clicked
var viewHighScores = document.getElementById('view-hs').addEventListener('click', function (e) {
    e.preventDefault();

    document.getElementById('intro').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('quiz-over').style.display = 'none';
    document.getElementById('high-scores').style.display = 'block';
    document.getElementById('response').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    loadScores();
});

// submit high score
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    var initialsEl = document.getElementById('initials').value.toUpperCase();

    document.getElementById('score').textContent = timeLeft;

    document.getElementById('quiz-over').style.display = 'none';
    document.getElementById('high-scores').style.display = 'block';

    var newScore = {
        initials: initialsEl,
        score: timeLeft
    };

    highScores.push(newScore);
    saveScores();
    loadScores();
});

// save high scores to localStorage
var saveScores = function () {
    localStorage.setItem('highScores', JSON.stringify(highScores));
};

// load highScores from localStorage
var loadScores = function () {
    highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var block = "";
    for (var i = 0; i < highScores.length; i++) {
        block += `<div class="scores">${highScores[i].initials}: ${highScores[i].score}</div>`;
    }
    document.getElementById('score-list').innerHTML =
        block;
};

// clear high scores
document.getElementById('clear-hs').addEventListener('click', function () {
    localStorage.clear();
    document.getElementById('score-list').innerHTML = "";
    highScores = [];
});

// go back button, refresh page
var goToStart = document.getElementById('go-back').addEventListener('click', function () {
    location.reload();
});