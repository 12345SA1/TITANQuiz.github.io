// [] - list



const quizData = [
    {
        question: "who is my favorite youtuber?",
        options: ["mc naveed", "mr beast", "jj and mikey", "jelly"],
        answer: "mc naveed"
    },

    {
        question: "How long does singapore soldier have to work?",
        options: ["2 year", "1 year", "3 year", "none"],
        answer: "2 year"
    },

    {
        question: "what app do i use to type code?",
        options: ["scratch.com", "Visual studio code", "pycham", "none"],
        answer: "Visual studio code"
    },

    {
        question: "what mech arena strongest robot?",
        options: ["killshot", "Arachnos", "panther", "zephyr "],
        answer: "killshot"
    },
];

const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const timerElement = document.getElementById('timer');
const timerText = document.getElementById('countdown');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');
const optionsElement = document.getElementById('options-container');
const resultElement = document.getElementById('result');


progressBar.style.width = '0%';

let currentQuestion = 0;
let score = 0;
startButton.addEventListener('click', startQuiz);

function startQuiz()
{
    startButton.style.display = 'none';
    loadQuestion();
}

function loadQuestion()
{
    clearInterval(timer);
    if(currentQuestion < quizData.length)
    {
        // Update progress bar
        progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;

        // create a variable for the current question
        const currentQuizData = quizData[currentQuestion];
        questionElement.textContent = currentQuizData.question;

        // Set initial countdown value
        timerText.textContent = 15;

        // remove previous buttons
        optionsElement.innerHTML = '';

        // Clone 4 option buttons here
        currentQuizData.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            optionsElement.appendChild(button);

            button.addEventListener('click', () => {
                checkAnswer(option);
            });
        });


        // Start the countdown here
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                // reset the timer
                clearInterval(timer);

                // update currentQuestion variable
                currentQuestion++;

                loadQuestion();
            }
        }, 1000);
    } else 
    {
        endQuiz();
    }
}


function checkAnswer(option)
{
    //load current qustion set
    const currentQuizData = quizData[currentQuestion]

    if(option === currentQuizData.answer)
    {
        score++;
    }

    resultElement.textContent = `You scored ${score} points`;
    currentQuestion++;
    loadQuestion();
}
function endQuiz()
{
    progressBarContainer.style.display = 'none';
    questionElement.textContent = "Quiz has ended! Horray!";
    optionsElement.style.display = 'none';
    timerElement.style.display = 'none';
}