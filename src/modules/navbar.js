// NAVBAR MODULE - Handles navigation interactions

/**
 * Initializes the navigation bar functionality including:
 * - Mobile menu toggle on hamburger button click
 * - Automatic menu closure when navigation links are clicked
 * - Shadow effect on navbar when scrolling past 50px
 * - Menu closure when clicking outside the navbar
 *
 * @returns {void} Returns early if required DOM elements are not found
 *
 * @example
 * // Call this function after DOM content is loaded
 * initNavbar();
 */
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
