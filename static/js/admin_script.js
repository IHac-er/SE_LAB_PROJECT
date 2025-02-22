document.getElementById("logout").addEventListener("click", function() {
    fetch('/logout', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                window.location.href = '/login.html';
            }
        })
        .catch(error => console.error('Error:', error));
});
