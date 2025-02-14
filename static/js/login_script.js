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