// List of coding-related questions and answers
const questions = [
    { question: "What is the output of `print(2 + 3 * 2)`?", answer: "8" },
    { question: "Which keyword is used to define a function in Python?", answer: "def" },
    { question: "What will `len([1, 2, 3])` return?", answer: "3" },
    { question: "What is the result of `5 % 2`?", answer: "1" },
    { question: "Which symbol is used for comments in Python?", answer: "#" }
];

let currentQuestionIndex = 0;
let mistakes = 0;
const maxMistakes = 6;

// Select elements
const questionText = document.querySelector(".question-text");
const answerInput = document.getElementById("answer");
const submitButton = document.getElementById("submit");
const hangmanParts = document.querySelectorAll(".hangman-part");

// Function to update question
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionText.innerHTML = questions[currentQuestionIndex].question;
        answerInput.value = ""; // Clear previous input
    } else {
        alert("Congratulations! You have completed the game.");
        resetGame();
    }
}

// Function to check answer
function checkAnswer() {
    let userAnswer = answerInput.value.trim().toLowerCase();
    let correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        drawHangman();
    }
}

// Function to draw hangman parts
function drawHangman() {
    if (mistakes < maxMistakes) {
        hangmanParts[mistakes].style.display = "block";
        mistakes++;

        // Game over only after all 6 parts are drawn
        if (mistakes === maxMistakes) {
            setTimeout(() => {
                alert("Game Over! The correct answer was: " + questions[currentQuestionIndex].answer);
                resetGame();
            }, 500); // Short delay to show the last part
        }
    }
}



// Function to reset the game
function resetGame() {
    currentQuestionIndex = 0;
    mistakes = 0;
    hangmanParts.forEach(part => part.style.display = "none"); // Hide hangman parts
    loadQuestion();
}

// Event listener for submit button
submitButton.addEventListener("click", checkAnswer);

// Load the first question on page load
loadQuestion();
