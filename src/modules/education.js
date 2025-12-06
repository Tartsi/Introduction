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

  // Animate "Skills" trigger after bachelor card finishes
  const bachelorItem = document.querySelector(
    '[data-education-card="bachelor"]'
  );
  const skillsTriggerElement = document.getElementById("skills-trigger");
  if (bachelorItem && skillsTriggerElement) {
    const bachelorObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Bachelor card starts animating, wait for it to finish (1200ms) + stagger delay
            setTimeout(() => {
              skillsTriggerElement.classList.add("animated");
            }, 1600); // Animation duration + buffer
            bachelorObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );
    bachelorObserver.observe(bachelorItem.closest(".education__timeline-item"));
  }

  // Make arrows clickable to scroll to specific cards (hardcoded approach)
  const arrows = document.querySelectorAll(".education__arrow");
  const highschoolCard = document.querySelector(
    '[data-education-card="highschool"]'
  );
  const bachelorCard = document.querySelector(
    '[data-education-card="bachelor"]'
  );

  if (arrows.length >= 2 && highschoolCard && bachelorCard) {
    // First arrow (after elementary) -> Always scrolls to High School card (second card)
    arrows[0].style.cursor = "pointer";
    arrows[0].addEventListener("click", () => {
      // Start scroll immediately using requestAnimationFrame for instant response
      requestAnimationFrame(() => {
        smoothScrollTo(highschoolCard, 2000);
      });

      // Trigger animation after 80% of scroll duration for smooth entry
      setTimeout(() => {
        const timelineItem = highschoolCard.closest(
          ".education__timeline-item"
        );
        if (timelineItem && !timelineItem.classList.contains("animated")) {
          timelineItem.classList.add("animated");
        }
      }, 1600); // 80% of 2000ms scroll duration
    });

    // Second arrow (after high school) -> Always scrolls to Bachelor card (third card)
    arrows[1].style.cursor = "pointer";
    arrows[1].addEventListener("click", () => {
      // Start scroll immediately using requestAnimationFrame for instant response
      requestAnimationFrame(() => {
        smoothScrollTo(bachelorCard, 2000);
      });

      // Trigger animation after 80% of scroll duration for smooth entry
      setTimeout(() => {
        const timelineItem = bachelorCard.closest(".education__timeline-item");
        if (timelineItem && !timelineItem.classList.contains("animated")) {
          timelineItem.classList.add("animated");
        }
      }, 1600); // 80% of 2000ms scroll duration
    });
  }

  // Setup "Skills" navigation trigger (slow scroll like Hero -> Education)
  const skillsTrigger = document.getElementById("skills-trigger");
  if (skillsTrigger) {
    skillsTrigger.addEventListener("click", () => {
      const skillsSection = document.getElementById("skills");
      if (skillsSection) {
        // Use slow smooth scroll to mimic Hero -> Education transition
        smoothScrollTo(skillsSection, 2000, true);
      }
    });
  }
}

/**
 * Custom smooth scroll function with configurable duration
 * @param {HTMLElement} element - Target element to scroll to
 * @param {number} duration - Scroll duration in milliseconds
 * @param {boolean} toTop - If true, scroll to element top instead of center
 */
function smoothScrollTo(element, duration, toTop = false) {
  const targetPosition =
    element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;

  let distance;
  if (toTop) {
    // Scroll to element top with some offset
    distance = targetPosition - startPosition - 80;
  } else {
    // Scroll to center the element
    distance =
      targetPosition -
      startPosition -
      window.innerHeight / 2 +
      element.offsetHeight / 2;
  }

  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Smoother easing function (ease-in-out cubic)
    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}
