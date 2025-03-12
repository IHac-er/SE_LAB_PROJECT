function editAccount() {
    window.location.href = '/view-profile';
}

function resetProgress() {
    if (confirm('Are you sure you want to reset your progress? This action cannot be undone.')) {
        fetch('/reset-progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Progress reset successfully!');
                window.location.href = '/login'
                window.location.reload();
            } else {
                alert('Failed to reset progress.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('An error occurred.');
        });
    }
}

function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action is permanent and cannot be undone.')) {
        fetch('/delete-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Account deleted successfully!');
                window.location.href = '/login';  // Redirect to homepage after deletion
            } else {
                alert('Failed to delete account.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('An error occurred.');
        });
    }
}

// Open Change Password Modal
function openChangePassword() {
    document.getElementById('passwordModal').style.display = 'flex';
}

// Close Change Password Modal
function closeChangePassword() {
    document.getElementById('passwordModal').style.display = 'none';
}

// Handle Password Change
function changePassword() {
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        alert("New passwords do not match.");
        return;
    }

    if (newPassword === oldPassword) {
        alert("New password cannot be the same as old password!");
        return;
    }

    fetch("/change-password", {
        method: "POST",
        body: JSON.stringify({ oldPassword, newPassword }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            closeChangePassword();
        }
    })
    .catch(error => console.error("Error:", error));
}
