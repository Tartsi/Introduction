// ANIMATIONS MODULE - Handles scroll-based animations

/**
 * Initializes animations for various elements on the page using Intersection Observer API.
 *
 * This function sets up multiple types of animations:
 * 1. Typing effect for section titles that animates letter-by-letter
 * 2. Fade-in animations for entire sections as they scroll into view
 * 3. Fade-in and slide-up animations for content cards within sections
 * 4. Staggered scale animations for individual skill items
 *
 * @function initAnimations
 * @returns {void}
 */
export function initAnimations() {
  // Observer for sections with fade-in from top
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("animated")
        ) {
          entry.target.classList.add("animated");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe all sections (except hero)
  const sections = document.querySelectorAll("section:not(#hero):not(#about)");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(-30px)";
    section.style.transition = "opacity 1.0s ease, transform 1.0s ease";
    sectionObserver.observe(section);
  });

  // Observer for cards and content elements
  const contentObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  // Observe cards and content elements (excluding skills__category as it has its own observer)
  const animatedElements = document.querySelectorAll(
    ".education__card, .project-card, .contact__content"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.75s ease, transform 0.75s ease";
    contentObserver.observe(element);
  });

  // Skills categories animation - both sides animate simultaneously
  const skillsCategories = document.querySelectorAll(".skills__category");
  const skillsCategoriesObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("animated")
        ) {
          entry.target.classList.add("animated");
          skillsCategoriesObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  skillsCategories.forEach((category) => {
    skillsCategoriesObserver.observe(category);
  });
}
