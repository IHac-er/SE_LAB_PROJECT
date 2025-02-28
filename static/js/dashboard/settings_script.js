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
                window.location.href = '/';  // Redirect to homepage after deletion
            } else {
                alert('Failed to delete account.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('An error occurred.');
        });
    }
}