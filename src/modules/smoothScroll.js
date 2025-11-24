// SMOOTH SCROLL MODULE - Handles smooth scrolling to sections

export function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".navbar__link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      let targetId = link.getAttribute("href");
      
      // Redirect About to Hero section
      if (targetId === "#about") {
        targetId = "#hero";
      }
      
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1500; // 50% slower (was ~1000ms default, now 1500ms)
        let start = null;

        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
      }
    });
  });
}
