// NAVBAR VISIBILITY MODULE - Handles auto-hiding header behavior

/**
 * Initializes navbar visibility behavior based on scroll position.
 *
 * This function manages:
 * - Auto-hiding navbar that appears when scrolling past the hero section
 * - Navbar visibility based on scroll position (hidden in hero, visible after 50% of hero height)
 * - Scroll event throttling for performance optimization
 *
 * @function initScrollSnap
 * @exports initScrollSnap
 * @returns {void}
 *
 * @requires DOM elements with the following selectors:
 * - `.navbar` - Navigation bar element
 * - `#hero` - Hero section element
 *
 * @sideeffects
 * - Modifies DOM element classes
 * - Attaches event listener to window scroll
 */
export function initScrollSnap() {
  const navbar = document.querySelector(".navbar");
  const heroSection = document.querySelector("#hero");

  // Make navbar initially hidden
  navbar.classList.remove("visible");

  // Scroll handler for auto-hiding navbar
  function handleScroll() {
    const currentScrollY = window.scrollY;
    const heroBottom = heroSection.offsetHeight;

    // Determine if we're in hero section
    if (currentScrollY < heroBottom * 0.5) {
      navbar.classList.remove("visible");
    } else {
      navbar.classList.add("visible");
    }
  }

  // Use throttling to improve performance
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 50);
  });

  // Initial check
  handleScroll();
}
