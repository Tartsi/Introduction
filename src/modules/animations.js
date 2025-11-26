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

  // Observe cards and content elements
  const animatedElements = document.querySelectorAll(
    ".education__card, .skills__category, .project-card, .contact__content"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.75s ease, transform 0.75s ease";
    contentObserver.observe(element);
  });

  // Stagger animation for skills items
  const skillsCategories = document.querySelectorAll(".skills__category");
  skillsCategories.forEach((category) => {
    const items = category.querySelectorAll(".skills__item");
    items.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "scale(0.8)";

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                item.style.transition =
                  "opacity 0.5s ease, transform 0.5s ease";
                item.style.opacity = "1";
                item.style.transform = "scale(1)";
              }, index * 62.5);
              observer.unobserve(item);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(item);
    });
  });
}
