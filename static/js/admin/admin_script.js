document.addEventListener("DOMContentLoaded", function () {
    fetch('/get-users')
    .then(response => response.json())
    .then(users => {
        console.log("Users received:", users); // Debugging

        const userList = document.getElementById("user-list");
        userList.innerHTML = ""; // Clear previous entries

        if (users.length === 0) {
            userList.innerHTML = "<tr><td colspan='3'>No users found</td></tr>";
            return;
        }

        users.forEach(user => {
            console.log("User object:", user); // Check if user data is correct

            // Make sure the correct keys are used
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

        console.log("User table updated successfully.");
    })
    .catch(error => console.error("Error fetching users:", error));
});

