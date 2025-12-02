// NAVBAR MODULE - Handles navigation interactions

/**
 * Initializes the navigation bar functionality including:
 * - Language selector menu toggle (hover and click)
 * - Main navigation menu toggle (hover and click)
 * - Automatic menu closure when navigation links are clicked
 * - Menu closure when clicking outside
 *
 * @returns {void} Returns early if required DOM elements are not found
 *
 * @example
 * // Call this function after DOM content is loaded
 * initNavbar();
 */
export function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const langContainer = document.querySelector(".navbar__lang-container");
  const langTrigger = document.querySelector(".navbar__lang-trigger");
  const langOptions = document.querySelectorAll(".navbar__lang-option");
  const menuContainer = document.querySelector(".navbar__menu-container");
  const navbarToggle = document.querySelector(".navbar__toggle");
  const navbarMenu = document.querySelector(".navbar__menu");
  const navLinks = document.querySelectorAll(".navbar__link");

  if (!navbar || !langContainer || !menuContainer) return;

  // Language selector toggle (click)
  if (langTrigger) {
    langTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      langContainer.classList.toggle("active");
    });
  }

  // Language option selection
  langOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const lang = option.dataset.lang;
      const currentLang = document.querySelector(".navbar__lang-current");

      // Update current language display
      if (currentLang) {
        currentLang.textContent = lang.toUpperCase();
      }

      // Update active state
      langOptions.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");

      // Close menu
      langContainer.classList.remove("active");
    });
  });

  // Menu toggle (click)
  if (navbarToggle) {
    navbarToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navbarToggle.classList.toggle("active");
      menuContainer.classList.toggle("active");
    });
  }

  // Close menus when clicking a navigation link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbarToggle?.classList.remove("active");
      menuContainer.classList.remove("active");
    });
  });

  // Close menus when clicking outside
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      navbarToggle?.classList.remove("active");
      menuContainer.classList.remove("active");
      langContainer.classList.remove("active");
    }
  });

  // Handle hover interactions - keep menu open when hovering over trigger or menu
  let langHoverTimeout;
  let menuHoverTimeout;

  // Language container hover handlers
  langContainer.addEventListener("mouseenter", () => {
    clearTimeout(langHoverTimeout);
    langContainer.classList.add("hover");
  });

  langContainer.addEventListener("mouseleave", () => {
    langHoverTimeout = setTimeout(() => {
      langContainer.classList.remove("hover");
    }, 200);
  });

  // Menu container hover handlers
  menuContainer.addEventListener("mouseenter", () => {
    clearTimeout(menuHoverTimeout);
    menuContainer.classList.add("hover");
  });

  menuContainer.addEventListener("mouseleave", () => {
    menuHoverTimeout = setTimeout(() => {
      menuContainer.classList.remove("hover");
    }, 200);
  });
}
