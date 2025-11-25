// SMOOTH SCROLL MODULE - Handles smooth scrolling to sections

export function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".navbar__link");
  const contactButtons = document.querySelectorAll('a[href="#contact"]');

  // Function to handle smooth scroll with locking
  function handleSmoothScroll(e, targetId) {
    e.preventDefault();

    // Redirect About/Intro to Hero section
    if (targetId === "#about") {
      targetId = "#hero";
    }

    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      let targetPosition = targetSection.offsetTop - navbarHeight;

      // Special handling for Education link - scroll well past the snap threshold
      if (targetId === "#education") {
        const heroSection = document.querySelector("#hero");
        const heroBottom = heroSection.offsetHeight;
        // Scroll to 90% of hero height to be well past the snap threshold
        // This ensures we don't trigger snap-back behavior
        const safePosition = heroBottom * 0.9;
        targetPosition = Math.max(targetPosition, safePosition);
      }

      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500;

      // Lock scrolling during animation
      if (window.setScrollLock) {
        window.setScrollLock(true);
      }

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
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          // Unlock scrolling after animation completes
          if (window.setScrollLock) {
            window.setScrollLock(false);
          }
        }
      }

      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }
  }

  // Add event listeners to nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      handleSmoothScroll(e, targetId);
    });
  });

  // Add event listeners to Contact Me buttons
  contactButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const targetId = button.getAttribute("href");
      handleSmoothScroll(e, targetId);
    });
  });
}
