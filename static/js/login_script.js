const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("signup") === "true") {
        document.getElementById('container').classList.add("right-panel-active");
    }
};

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/login", {
        method: "POST",
        body: new URLSearchParams({email, password}),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "/dashboard";  // Successful login
        } else {
            alert("Invalid Credentials! Try Again")
        }
    })
    .catch(error => console.error("Error:", error));
}