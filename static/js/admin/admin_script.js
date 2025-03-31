document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".content-section");
    const userList = document.getElementById("user-list");
    const sidebarLinks = document.querySelectorAll(".sidebar ul li");
    const modal = document.getElementById("editUserModal");
    const closeModal = document.querySelector(".close-btn");
    const editUserForm = document.getElementById("editUserForm");

    function showSection(sectionId) {
        sections.forEach(section => section.style.display = "none");
        document.getElementById(sectionId).style.display = "block";
    }

    // Show dashboard by default
    showSection("dashboard");

    // Handle sidebar clicks
    document.querySelector(".sidebar").addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            event.preventDefault();
            const sectionText = event.target.innerText.trim(); // Fixed for better accuracy

            // Remove 'active' class from all sidebar items
            sidebarLinks.forEach(li => li.classList.remove("active"));
            event.target.parentElement.classList.add("active");

            if (sectionText === "Dashboard") {
                showSection("dashboard");
            } else if (sectionText === "Manage Users") {
                showSection("manage-users");
                fetchUsers(); // Fetch users dynamically
            } else if (sectionText === "Settings") {
                showSection("settings");
            } else if (sectionText === "Logout") {
                logoutUser();
            }
        }
    });

    function fetchUsers() {
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
                        <td><button class="edit-btn" data-email="${userEmail}" data-name="${userName}">Edit</button></td>
                    `;
                    userList.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching users:", error));
    }

    // Delegate event listener for dynamically added edit buttons
    userList.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-btn")) {
            const userEmail = event.target.getAttribute("data-email");
            const userName = event.target.getAttribute("data-name");
            showModal(userEmail, userName);
        }
    });

    function logoutUser() {
        window.location.href = "/logout"; // Redirect directly after logout
    }

    function showModal(userEmail, userName) {
        document.getElementById("editEmail").value = userEmail;
        document.getElementById("editName").value = userName;
        modal.style.display = "flex";
    }

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    editUserForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("editEmail").value;
        const name = document.getElementById("editName").value;
        const newEmail = document.getElementById("editNewEmail").value;
        const password = document.getElementById("editPassword").value;

        fetch("/edit-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name, newEmail, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            modal.style.display = "none";
            fetchUsers(); // Reload the user list
        })
        .catch(error => console.error("Error:", error));
    });

    document.getElementById("resetAccount").addEventListener("click", function () {
        const email = document.getElementById("editEmail").value;
        fetch("/revert-progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            modal.style.display = "none";
        })
        .catch(error => console.error("Error:", error));
    });

    document.getElementById("deleteAccount").addEventListener("click", function () {
        const email = document.getElementById("editEmail").value;
        if (confirm("Are you sure you want to delete this account?")) {
            fetch("/delete-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                modal.style.display = "none";
                fetchUsers(); // Reload the user list
            })
            .catch(error => console.error("Error:", error));
        }
    });

    function fetchDashboardStats() {
        fetch('/dashboard-stats')
            .then(response => response.json())
            .then(data => {
                document.getElementById("totalUsers").textContent = data.total_users;
                document.getElementById("activeUsers").textContent = data.active_users;
            })
            .catch(error => console.error("Error fetching dashboard stats:", error));
    }

    function fetchServerStatus() {
        fetch('/server-status')
            .then(response => response.json())
            .then(data => {
                document.getElementById('cpu').textContent = data['CPU Usage'];
                document.getElementById('memory').textContent = data['Memory Usage'];
                document.getElementById('disk').textContent = data['Disk Usage'];
            })
            .catch(error => console.error('Error fetching server status:', error));
    }
    
    // Periodically update active user tracking
    setInterval(() => {
        fetch('/track-activity', { method: "POST" });
    }, 300000); // Every 5 minutes

    // Fetch dashboard stats on page load
    fetchDashboardStats();

    setInterval(fetchServerStatus, 1000);
    fetchServerStatus();
});

document.getElementById("addUserForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("newName").value;
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;

    fetch("/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("addUserMessage").textContent = data.message;
        if (data.success) {
            document.getElementById("addUserForm").reset(); // Clear form
        }
    })
    .catch(error => console.error("Error adding user:", error));
});

