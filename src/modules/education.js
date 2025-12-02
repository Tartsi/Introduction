// EDUCATION MODULE - Handles vertical timeline animation

/**
 * Initializes the education timeline system
 *
 * This function manages:
 * - Vertical timeline layout with 3 education cards
 * - Sequential top-to-bottom animation on scroll
 * - Staggered animation with arrows between cards
 *
 * @function initEducation
 * @exports initEducation
 * @returns {void}
 */
export function initEducation() {
  const timelineItems = document.querySelectorAll(".education__timeline-item");

  if (timelineItems.length === 0) return;

  // Create Intersection Observer for timeline animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get the index to calculate stagger delay
          const index = Array.from(timelineItems).indexOf(entry.target);
          const delay = index * 400; // 400ms stagger between each item

          setTimeout(() => {
            entry.target.classList.add("animated");
          }, delay);

          // Don't observe anymore once animated
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  // Observe all timeline items
  timelineItems.forEach((item) => {
    observer.observe(item);
  });

  // Make arrows clickable to scroll to next card
  const arrows = document.querySelectorAll(".education__arrow");
  arrows.forEach((arrow) => {
    arrow.style.cursor = "pointer";
    arrow.addEventListener("click", () => {
      // Find the next education card (skip the next arrow)
      let nextElement = arrow.nextElementSibling;
      while (
        nextElement &&
        nextElement.classList.contains("education__arrow")
      ) {
        nextElement = nextElement.nextElementSibling;
      }

      if (
        nextElement &&
        nextElement.classList.contains("education__timeline-item")
      ) {
        const targetCard = nextElement.querySelector(".education__card");
        if (targetCard) {
          // Smooth scroll to the next card
          const targetPosition = nextElement.offsetTop - 100; // 100px offset for better view
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}
