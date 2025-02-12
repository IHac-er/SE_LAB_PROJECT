function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });

  document.getElementById(sectionId).classList.add('active');
}

function toggleDropdown() {
  const dropdown = document.getElementById('dropdownMenu');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function saveChanges() {
  alert('Profile changes saved successfully!');
}

document.addEventListener('DOMContentLoaded', () => {
  const chartBars = document.querySelectorAll('.chart-bar');
  chartBars.forEach(bar => {
    const completion = bar.getAttribute('data-completion');
    setTimeout(() => {
      bar.style.width = completion;
    }, 500);
  });
});
