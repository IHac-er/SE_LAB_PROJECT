document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("password-modal");
    const changePasswordBtn = document.getElementById("change-password-btn");
    const closeModal = document.querySelector(".close");

    changePasswordBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    document.getElementById("change-password-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let oldPassword = document.getElementById("old-password").value;
        let newPassword = document.getElementById("new-password").value;
        let confirmPassword = document.getElementById("confirm-password").value;

        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }

        fetch("/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                modal.style.display = "none";
            }
        })
        .catch(error => console.error("Error:", error));
    });

    document.getElementById("delete-account-btn").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            fetch("/delete-account", { method: "POST" })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    if (data.success) {
                        window.location.href = "/";
                    }
                })
                .catch(error => console.error("Error:", error));
        }
    });
});
