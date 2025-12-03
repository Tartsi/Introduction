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
  const educationSection = document.querySelector("#education");
  const seeMoreTrigger = document.querySelector("#see-more-trigger");

  // Make navbar initially hidden
  navbar.classList.remove("visible");

  // Scroll handler for auto-hiding navbar
  function handleScroll() {
    const currentScrollY = window.scrollY;
    const heroBottom = heroSection.offsetHeight;

    // Determine if we're in hero section - disappear when hero is barely visible
    if (currentScrollY < heroBottom * 0.85) {
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

  // Handle See More button click with snap-scroll to Education (slowed by 40%)
  if (seeMoreTrigger && educationSection) {
    seeMoreTrigger.addEventListener("click", () => {
      const targetPosition = educationSection.offsetTop;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 2100; // Slowed down by 40% (original ~1500ms * 1.4 = 2100ms)
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function
        const easeInOutQuad =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startPosition + distance * easeInOutQuad);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    });
  }

  // Initial check
  handleScroll();
}
