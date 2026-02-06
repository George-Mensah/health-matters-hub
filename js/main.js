const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const links = navLinks.querySelectorAll("a");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu when a link is clicked (mobile)
links.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

