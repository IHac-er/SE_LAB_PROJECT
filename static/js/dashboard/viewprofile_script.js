function editprofile() {
    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;

    fetch('/edit-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, bio: bio })
    })
    .then(response => {
        if (response.ok) {
            alert('Profile updated successfully!');
            window.location.reload(); // Optional, to refresh the page after update
        } else {
            alert('Failed to update profile.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });
}
