document.addEventListener("DOMContentLoaded", function() {
  const userMenu = document.querySelector(".user-menu");
  const avatarBtn = document.querySelector(".avatar-btn");
  const logoutBtn = document.getElementById("logout");

  // Toggle dropdown on avatar button click
  avatarBtn.addEventListener("click", function(event) {
      userMenu.classList.toggle("active");
      event.stopPropagation();
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", function(event) {
      if (!userMenu.contains(event.target)) {
          userMenu.classList.remove("active");
      }
  });

  // Logout function
  logoutBtn.addEventListener("click", function() {
      fetch('/logout', { method: 'POST' })
          .then(response => {
              if (response.ok) {
                  window.location.href = '/login.html';
              }
          })
          .catch(error => console.error('Error:', error));
  });
});
