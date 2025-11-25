// SMOOTH SCROLL MODULE - Handles smooth scrolling to sections

export function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".navbar__link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      let targetId = link.getAttribute("href");

      // Redirect About/Intro to Hero section
      if (targetId === "#about") {
        targetId = "#hero";
      }

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        let targetPosition = targetSection.offsetTop - navbarHeight;

        // Special handling for Education link - scroll past the snap threshold
        if (targetId === "#education") {
          const heroSection = document.querySelector("#hero");
          const heroBottom = heroSection.offsetHeight;
          // Ensure we scroll comfortably past the hero snap threshold (70%)
          targetPosition = Math.max(targetPosition, heroBottom * 0.75);
        }

        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1500;

        // Start animation immediately
        const startTime = performance.now();

        function animation(currentTime) {
          const timeElapsed = currentTime - startTime;
          const run = easeInOutQuad(
            timeElapsed,
            startPosition,
            distance,
            duration
          );
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
      }
    });
  });
}
