let level = 1;
const challenges = [
    { 
        text: "Make the box red by using CSS!", 
        check: css => css.includes("background-color: red"), 
        transformation: () => document.getElementById("box").style.backgroundColor = "red" 
    },
    { 
        text: "Make the box a circle!", 
        check: css => css.includes("border-radius: 50%"), 
        transformation: () => document.getElementById("box").style.borderRadius = "50%" 
    },
    { 
        text: "Increase the circle size!", 
        check: css => css.includes("width: 150px") && css.includes("height: 150px"), 
        transformation: () => {
            const box = document.getElementById("box");
            box.style.width = "150px";  // Increase width
            box.style.height = "150px"; // Increase height
            box.style.borderRadius = "50%"; // Keep it square
        }
    },
    { 
        text: "Add a border to the box!", 
        check: css => css.includes("border-radius: 0%;") && css.includes("border: 5px solid black"), 
        transformation: () => {
            const box = document.getElementById("box");
            box.style.border = "5px solid black";
            box.style.borderRadius = "0%";
        }
    },
    { 
        text: "Center the box!", 
        check: css => css.includes("margin: auto"), 
        transformation: () => {
            const box = document.getElementById("box");
            box.style.margin = "auto";
        }
    },
    { 
        text: "Make the box shadow appear!", 
        check: css => css.includes("box-shadow: 10px 10px 15px rgba(0,0,0,0.3)"), 
        transformation: () => {
            const box = document.getElementById("box");
            box.style.boxShadow = "10px 10px 15px rgba(0,0,0,0.3)";
        }
    },
    { 
        text: "Change the background color to blue!", 
        check: css => css.includes("background-color: blue"), 
        transformation: () => document.getElementById("box").style.backgroundColor = "blue" 
    },
    { 
        text: "Make the box smaller!", 
        check: css => css.includes("width: 80px") && css.includes("height: 80px"), 
        transformation: () => {
            const box = document.getElementById("box");
            box.style.width = "80px"; // Smaller size
            box.style.height = "80px"; // Smaller size
        }
    },
    { 
        text: "Add a border radius to make it elliptical!", 
        check: css => css.includes("border-radius: 50% 25%"), 
        transformation: () => document.getElementById("box").style.borderRadius = "50% 25%" 
    },
    { 
        text: "Change the border color to green!", 
        check: css => css.includes("border: 5px solid green"), 
        transformation: () => document.getElementById("box").style.border = "5px solid green" 
    }
];

function checkCSS() {
    let inputCSS = document.getElementById("cssInput").value;
    let box = document.getElementById("box");
    if (challenges[level - 1].check(inputCSS)) {
        document.getElementById("feedback").innerText = "✅ Correct!";
        challenges[level - 1].transformation();
        document.querySelector(".next-btn").style.display = "inline-block"; // Show the "Next Level" button
    } else {
        document.getElementById("feedback").innerText = "❌ Try again!";
    }
}

function nextLevel() {
    if (level < challenges.length) {
        level++;
        document.getElementById("challengeText").innerText = challenges[level - 1].text;
        document.getElementById("feedback").innerText = "";
        document.getElementById("cssInput").value = "";
        document.querySelector(".next-btn").style.display = "none"; // Hide the "Next Level" button again
    } else {
        alert("🎉 Congrats! You completed all levels!");
    }
}