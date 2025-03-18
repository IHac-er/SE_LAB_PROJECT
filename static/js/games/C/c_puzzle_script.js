const allQuestions = [
    {
        question: "Arrange this C program correctly:",
        blocks: ["#include <stdio.h>", "int main() {", "printf(\"Hello, World!\\n\");", "return 0;", "}"],
        answer: ["#include <stdio.h>", "int main() {", "printf(\"Hello, World!\\n\");", "return 0;", "}"]
    },
    {
        question: "Fix this C loop order:",
        blocks: ["int i = 0;", "for (i = 0; i < 5; i++) {", "printf(\"Iteration: %d\\n\", i);", "}"],
        answer: ["int i = 0;", "for (i = 0; i < 5; i++) {", "printf(\"Iteration: %d\\n\", i);", "}"]
    },
    {
        question: "Rearrange the factorial calculation in C:",
        blocks: ["int factorial(int n) {", "if (n == 0) return 1;", "return n * factorial(n - 1);", "}"],
        answer: ["int factorial(int n) {", "if (n == 0) return 1;", "return n * factorial(n - 1);", "}"]
    },
    {
        question: "Fix the if-else condition order:",
        blocks: ["if (x > 10) {", "printf(\"Greater than 10\");", "} else {", "printf(\"Less than or equal to 10\");", "}"],
        answer: ["if (x > 10) {", "printf(\"Greater than 10\");", "} else {", "printf(\"Less than or equal to 10\");", "}"]
    },
    {
        question: "Arrange the C program for swapping two numbers:",
        blocks: ["int temp;", "temp = a;", "a = b;", "b = temp;"],
        answer: ["int temp;", "temp = a;", "a = b;", "b = temp;"]
    },
    {
        question: "Arrange the C program to find the largest of three numbers:",
        blocks: ["if (a > b && a > c)", "printf(\"A is largest\");", "else if (b > c)", "printf(\"B is largest\");", "else", "printf(\"C is largest\");"],
        answer: ["if (a > b && a > c)", "printf(\"A is largest\");", "else if (b > c)", "printf(\"B is largest\");", "else", "printf(\"C is largest\");"]
    }
];

// Function to get 5 random questions
function getRandomQuestions() {
    let shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
}

let selectedQuestions = getRandomQuestions();
let currentQuestionIndex = 0;

function loadQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        document.getElementById("dropArea").innerHTML = "🎉 You completed all puzzles!";
        document.getElementById("result").innerText = "";
        return;
    }

    let question = selectedQuestions[currentQuestionIndex];
    let shuffledBlocks = [...question.blocks].sort(() => Math.random() - 0.5);

    document.getElementById("codeBlocks").innerHTML = "";
    document.getElementById("dropArea").innerHTML = "Drop the correct order here 👇";
    document.getElementById("result").innerText = "";

    shuffledBlocks.forEach(block => {
        let div = document.createElement("div");
        div.innerText = block;
        div.classList.add("draggable");
        div.draggable = true;
        div.addEventListener("dragstart", dragStart);
        document.getElementById("codeBlocks").appendChild(div);
    });

    document.getElementById("dropArea").dataset.correctOrder = question.answer.join("\n");
}

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.innerText);
}

document.getElementById("dropArea").addEventListener("dragover", (e) => e.preventDefault());
document.getElementById("dropArea").addEventListener("drop", drop);

function drop(event) {
    event.preventDefault();
    let text = event.dataTransfer.getData("text");

    let existing = Array.from(document.getElementById("dropArea").children).map(div => div.innerText);
    if (!existing.includes(text)) {
        let newDiv = document.createElement("div");
        newDiv.innerText = text;
        newDiv.classList.add("dropped");
        newDiv.addEventListener("click", removeBlock);
        document.getElementById("dropArea").appendChild(newDiv);
    }
}

function removeBlock(event) {
    event.target.remove();
}

document.getElementById("checkAnswer").addEventListener("click", () => {
    let userAnswer = Array.from(document.getElementById("dropArea").children).map(div => div.innerText);
    let correctOrder = document.getElementById("dropArea").dataset.correctOrder.split("\n");

    if (JSON.stringify(userAnswer) === JSON.stringify(correctOrder)) {
        document.getElementById("result").innerText = "✅ Correct!";
        currentQuestionIndex++;
        setTimeout(loadQuestion, 1000);
    } else {
        document.getElementById("result").innerText = "❌ Incorrect! Try again.";
    }
});

loadQuestion();
