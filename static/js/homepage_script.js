function redirectToLogin(signUp = false) {
    if (signUp) {
        window.location.href = "/login?signup=true";
    } else {
        window.location.href = "/login";
    }
}

function redirectToPython() {
    window.location.href = "/python";
}

function redirectToC() {
    window.location.href = "/C";
}

function redirectToCpp() {
    window.location.href = "/Cpp";
}

function redirectToHtml() {
    window.location.href = "/HTML";
}

function redirectToCss() {
    window.location.href = "/CSS";
}

// Typing Animation
var typed = new Typed(".typing-text", {
    strings: ["Level up your skills as you game through the world of programming."],
    typeSpeed: 20,
    backSpeed: 10,
    loop: true
});

// Category Button Click Event
document.querySelectorAll(".category-button").forEach(button => {
    button.addEventListener("click", function() {
        let category = this.getAttribute("data-category");
        document.querySelectorAll(".card").forEach(card => {
            card.style.display = card.getAttribute("data-category") === category ? "block" : "none";
        });
    });
});

document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute("href"));
        targetSection.scrollIntoView({ behavior: "smooth" });
    });
});