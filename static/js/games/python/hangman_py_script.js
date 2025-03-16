// List of coding-related questions and answers
const questions = [
    { 
        question: "Write a Python function to add two numbers. (Two inputs will be provided by computer when prompted)",
        testInput: "2\n3",
        expectedOutput: "5"
    },
    { 
        question: "Write a function that returns the square of a number. (Input will be provided by computer when prompted)",
        testInput: "4",
        expectedOutput: "16"
    },
    { 
        question: "Write a Python program to find the factorial of a number. (Input will be provided by computer when prompted)",
        testInput: "5",
        expectedOutput: "120"
    }
];

let currentQuestionIndex = 0;
let mistakes = 0;
const maxMistakes = 6;

// Select elements
const questionText = document.querySelector(".question-text");
const codeInput = document.getElementById("codeInput");  // Fixed missing declaration
const submitButton = document.getElementById("submit");
const hangmanParts = document.querySelectorAll(".hangman-part");

// Function to update question
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionText.innerHTML = questions[currentQuestionIndex].question;
        codeInput.value = ""; // Clear previous input
    } else {
        alert("Congratulations! You have completed the game.");
        resetGame();
    }
}

async function checkAnswer() {
    let userCode = codeInput.value;
    let testInput = questions[currentQuestionIndex].testInput;
    let expectedOutput = questions[currentQuestionIndex].expectedOutput;

    try {
        let response = await fetch("/execute-hangman", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: userCode, test_input: testInput })
        });

        let data = await response.json();
        let actualOutput = data.output.trim();

        if (actualOutput === expectedOutput) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            drawHangman();
        }
    } catch (error) {
        console.error("Error:", error);
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
                alert("Game Over! The correct answer was: " + questions[currentQuestionIndex].expectedOutput);
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
