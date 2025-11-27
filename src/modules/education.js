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
}
