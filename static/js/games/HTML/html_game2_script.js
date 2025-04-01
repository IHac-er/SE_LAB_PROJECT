let challenges = [
    { question: "What is the correct doctype declaration for an HTML5 document?", answer: "<!DOCTYPE html>" },
    { question: "Which tag is used for the largest heading in HTML?", answer: "<h1>" },
    { question: "What tag is used to create a hyperlink in HTML?", answer: "<a>" },
    { question: "Which attribute is required in the <img> tag for specifying the image path?", answer: "src" },
    { question: "Which input type is used for a password field?", answer: "password" },
    { question: "What tag is used for an ordered list in HTML?", answer: "<ol>" },
    { question: "Which tag is used to define a table row in HTML?", answer: "<tr>" },
    { question: "Which tag is a block-level container in HTML?", answer: "<div>" },
    { question: "Which tag is used to specify a webpage’s metadata?", answer: "<meta>" },
    { question: "Which tag is used for defining navigation links in HTML5?", answer: "<nav>" }
];

let aiOrb = document.getElementById("ai-orb");
let questionText = document.getElementById("question");
let feedback = document.getElementById("feedback");
let timerDisplay = document.getElementById("timer");
let timer;

function getNewChallenge() {
    let randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    questionText.classList.remove("fade");
    setTimeout(() => {
        questionText.innerText = randomChallenge.question;
        questionText.classList.add("fade");
    }, 300);

    document.getElementById("answer").value = "";
    document.getElementById("answer").dataset.correct = randomChallenge.answer;

    aiOrb.innerText = "🙂";
    aiOrb.className = "orb waiting";
    startTimer();
}

function startTimer() {
    let timeLeft = 10; // 10 seconds per question
    timerDisplay.innerText = "⏳ Time left: " + timeLeft + "s";
    
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = "⏳ Time left: " + timeLeft + "s";
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            aiOrb.innerText = "😢";
            aiOrb.className = "orb sad";
            feedback.innerText = "⏳ Time's up! Try again!";
            setTimeout(getNewChallenge, 2000);
        }
    }, 1000);
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.trim();
    let correctAnswer = document.getElementById("answer").dataset.correct;

    clearInterval(timer);

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        aiOrb.innerText = "😃";
        aiOrb.className = "orb happy";
        feedback.innerText = "✅ Correct! Well done!";
    } else {
        aiOrb.innerText = "😢";
        aiOrb.className = "orb sad";
        feedback.innerText = "❌ Wrong answer. Try again!";
    }

    setTimeout(getNewChallenge, 2000);
}

getNewChallenge();