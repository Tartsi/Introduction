// NAVBAR MODULE - Handles navigation interactions

export function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const navbarToggle = document.querySelector(".navbar__toggle");
  const navbarMenu = document.querySelector(".navbar__menu");
  const navLinks = document.querySelectorAll(".navbar__link");

  if (!navbar || !navbarToggle || !navbarMenu) return;

  // Mobile menu toggle
  navbarToggle.addEventListener("click", () => {
    navbarToggle.classList.toggle("active");
    navbarMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbarToggle.classList.remove("active");
      navbarMenu.classList.remove("active");
    });
  });

  // Add shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      navbarToggle.classList.remove("active");
      navbarMenu.classList.remove("active");
    }
  });
}
