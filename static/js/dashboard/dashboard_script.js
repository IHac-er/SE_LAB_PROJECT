document.addEventListener("DOMContentLoaded", function () {
    // Profile dropdown toggle
    const profileBtn = document.getElementById("profileBtn");
    const profileDropdown = document.getElementById("profileDropdown");

    profileBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent click from bubbling up
        profileDropdown.style.display =
            profileDropdown.style.display === "block" ? "none" : "block";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!profileBtn.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.style.display = "none";
        }
    });
});

function redirectToProfile() {
    window.location.href = '/view-profile';
}

function redirectTogames() {
    window.location.href = "/games-page";
}