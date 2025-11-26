// ACTIVE SECTION MODULE - Highlights active nav link based on scroll position

/**
 * Initializes active section highlighting in the navigation bar based on scroll position.
 * Monitors scroll events and updates the active state of navigation links to reflect
 * the currently visible section. The hero section is treated as the "intro" section
 * for navigation highlighting purposes.
 *
 * @function initActiveSection
 * @returns {void}
 *
 * @description
 * - Selects all sections with an id attribute and all navigation links
 * - Adds a scroll event listener that determines which section is currently in view
 * - Updates the 'active' class on navigation links based on scroll position
 * - Uses a 150px offset from the top for scroll position calculation
 * - Special handling: when the hero section is in view, the "Intro" link is highlighted
 * - Executes once on initialization to set the correct active state on page load
 */
export function initActiveSection() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar__link");

  function setActiveLink() {
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY + viewportHeight / 2;

    // Treat hero section as "intro" for active state
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const sectionMiddle = sectionTop + sectionHeight / 2;

      // Check if most of the section is visible (middle point is in viewport)
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          // If we're in the hero section, highlight "Intro" link
          if (sectionId === "hero" && link.getAttribute("href") === "#intro") {
            link.classList.add("active");
          } else if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink(); // Call once on load
}
