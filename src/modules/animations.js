// ANIMATIONS MODULE - Handles scroll-based animations

/**
 * Initializes animations for various elements on the page using Intersection Observer API.
 *
 * This function sets up two types of animations:
 * 1. Fade-in and slide-up animations for main content sections (education cards, skills categories, project cards, and contact content)
 * 2. Staggered scale animations for individual skill items within skills categories
 *
 * The Intersection Observer is configured with:
 * - threshold: 0.1 (triggers when 10% of element is visible)
 * - rootMargin: "0px 0px -100px 0px" (triggers 100px before element enters viewport from bottom)
 *
 * @function initAnimations
 * @returns {void}
 *
 * @example
 * // Call this function after DOM content is loaded
 * initAnimations();
 */
export function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe sections and cards
  const animatedElements = document.querySelectorAll(
    ".education__card, .skills__category, .project-card, .contact__content"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });

  // Stagger animation for skills items
  const skillsCategories = document.querySelectorAll(".skills__category");
  skillsCategories.forEach((category, categoryIndex) => {
    const items = category.querySelectorAll(".skills__item");
    items.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "scale(0.8)";

      setTimeout(() => {
        item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        item.style.opacity = "1";
        item.style.transform = "scale(1)";
      }, categoryIndex * 200 + index * 50);
    });
  });
}
