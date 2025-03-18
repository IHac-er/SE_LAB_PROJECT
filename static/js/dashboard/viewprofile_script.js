// Open Avatar Modal
function openAvatarModal() {
    document.getElementById("avatar-modal").style.display = "block";
}

// Close Avatar Modal
function closeAvatarModal() {
    document.getElementById("avatar-modal").style.display = "none";
}

// Change Avatar Function
function changeAvatar(avatarSrc) {
    document.getElementById("profile-pic").src = avatarSrc;
    document.getElementById("edit-profile-pic").src = avatarSrc;
    closeAvatarModal();
}

// Open Edit Profile Modal
function openEditProfileModal() {
    document.getElementById("edit-profile-modal").style.display = "block";
}

// Close Edit Profile Modal
function closeEditProfileModal() {
    document.getElementById("edit-profile-modal").style.display = "none";
}

// Attach event listener to "Edit Profile" button
document.getElementById("edit-profile-btn").addEventListener("click", openEditProfileModal);

function saveProfile() {
    let name = document.getElementById("name").value;
    let bio = document.getElementById("bio").value;

    fetch("/edit-profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"  // Ensure JSON content type
        },
        body: JSON.stringify({
            name: name,
            bio: bio
        })
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error("Failed to update profile");
    })
    .then(data => {
        alert(data);  // Show success message
        closeEditProfileModal();
        location.reload();
    })
    .catch(error => console.error("Error:", error));
}

function closeEditProfileModal() {
    document.getElementById("editProfileModal").style.display = "none";
}

function redirect() {
    window.location.href="/dashboard";
}