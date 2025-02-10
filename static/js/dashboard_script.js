function showTime() {
	document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
showTime();
setInterval(function () {
	showTime();
}, 1000);
// Example JS for handling interactions (optional)
document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard loaded successfully!");
});

