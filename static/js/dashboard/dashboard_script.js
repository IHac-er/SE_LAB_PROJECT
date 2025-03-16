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

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".category-button");
    const cards = document.querySelectorAll(".card");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            // Hide all cards
            cards.forEach(card => {
                card.style.display = "none";
            });

            // Show only the relevant category cards
            document.querySelectorAll(`.card[data-category="${category}"]`).forEach(card => {
                card.style.display = "block";
            });
        });
    });

    // Show Python cards by default on page load
    document.querySelector('.category-button[data-category="python"]').click();
});

function redirectToProfile() {
    window.location.href = '/view-profile';
}