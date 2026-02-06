const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const links = navLinks.querySelectorAll("a");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  document.body.classList.toggle("menu-open");
});

// Close menu when clicking a link
links.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    document.body.classList.remove("menu-open");
  });
});

// Close menu when clicking outside
document.addEventListener("click", function(e) {
  if (
    navLinks.classList.contains("show") &&
    !navLinks.contains(e.target) &&
    e.target !== hamburger
  ) {
    navLinks.classList.remove("show");
    document.body.classList.remove("menu-open");
  }
});
