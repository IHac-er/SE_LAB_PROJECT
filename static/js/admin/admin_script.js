document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".content-section");
    const userList = document.getElementById("user-list");

    function showSection(sectionId) {
        sections.forEach(section => section.style.display = "none");
        document.getElementById(sectionId).style.display = "block";
    }

    // Show dashboard by default
    showSection("dashboard");

    // Handle sidebar clicks
    document.querySelector(".sidebar").addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            event.preventDefault(); // Prevent default link behavior
            const text = event.target.textContent.trim();

            if (text === "Dashboard") {
                showSection("dashboard");
            } else if (text === "Manage Users") {
                showSection("manage-users");

                // Fetch users only when "Manage Users" is clicked
                fetch('/get-users')
                    .then(response => response.json())
                    .then(users => {
                        userList.innerHTML = ""; // Clear previous entries

                        if (users.length === 0) {
                            userList.innerHTML = "<tr><td colspan='3'>No users found</td></tr>";
                            return;
                        }

                        users.forEach(user => {
                            let userName = user.name || user.Name;
                            let userEmail = user.email || user.Email;

                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td>${userName}</td>
                                <td>${userEmail}</td>
                                <td><button class="edit-btn">Edit</button></td>
                            `;
                            userList.appendChild(row);
                        });
                    })
                    .catch(error => console.error("Error fetching users:", error));
            } else if (text === "Settings") {
                showSection("settings");
            } else if (text === "Logout") {
                fetch('/logout')
                    .then(() => window.location.href = "/logout") // Redirect after logout
                    .catch(error => console.error("Logout failed:", error));
            }
        }
    });
});
