const questions = [
    {
        question: "How do you write an IF statement in JavaScript?",
        answers: [
            { text: "if i = 5", correct: true },
            { text: "if(i == 5", correct: false },
            { text: "if i == 5 then", correct: false },
            { text: "if i === 5", correct: false },
        ]
    },
    {
        question: "How do you move declarations to the top of the current scope?",
        answers: [
            { text: "Jumping", correct: false },
            { text: "Sorting", correct: false },
            { text: "Rearranging", correct: false },
            { text: "Hoisting", correct: true },
        ]
    },
    {
        question: "The first index of an array is ____.",
        answers: [
            { text: "1", correct: false },
            { text: "0", correct: true },
            { text: "-1", correct: false },
            { text: "Anything", correct: false },
        ]
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: [
            { text: "onclick", correct: true },
            { text: "onchange", correct: false },
            { text: "onmouseover", correct: false },
            { text: "onmouseclick", correct: false },
        ]
    },
    {
        question: "How is a function created in JavaScript?",
        answers: [
            { text: "call myFunction()", correct: false },
            { text: "function = myFunction()", correct: false },
            { text: "function myFunction()", correct: true },
        ]
    },
    {
        question: "What HTML element is used to connect JacaScript and the HTML file?",
        answers: [
            { text: "script", correct: true },
            { text: "javascript", correct: false },
            { text: "js", correct: false },
            { text: "src", correct: false },
        ]
    },  {
        question: "A String must be enclosed with which symbols when assigned to variables",
        answers: [
            { text: "Stars * *", correct: false },
            { text: "Parenthesis ( )", correct: false },
            { text: "Curly Braces { }", correct: false },
            { text: "Quotes \" \"", correct: true },
        ]
    },
];



const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbuttons");
const nextButton = document.getElementById("nextbutton");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
    
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
        setTime();
    }
});

var timeEl = document.querySelector(".time");

function setTime() {
    var secondsLeft = 30;

    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds until the quiz ends.";

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }

    }, 1000);
};
setTime();

startQuiz();