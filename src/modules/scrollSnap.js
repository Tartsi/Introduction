// SCROLL SNAP MODULE - Handles auto-hiding header and scroll-snap behavior

export function initScrollSnap() {
  const navbar = document.querySelector(".navbar");
  const heroSection = document.querySelector("#hero");
  const educationSection = document.querySelector("#education");
  const seeMoreTrigger = document.querySelector("#see-more-trigger");

  let lastScrollY = window.scrollY;
  let isInHero = true;
  let isScrollLocked = false;

  // Make navbar initially hidden
  navbar.classList.remove("visible");

  // Function to lock/unlock scrolling
  function setScrollLock(locked) {
    isScrollLocked = locked;
    if (locked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }

  // See More click handler
  if (seeMoreTrigger) {
    seeMoreTrigger.addEventListener("click", () => {
      const educationTop = educationSection.offsetTop;
      setScrollLock(true);
      smoothScrollTo(educationTop, 1800);
      setTimeout(() => {
        setScrollLock(false);
      }, 1800);
    });
  }

  // Scroll handler for auto-hiding navbar and snap behavior
  function handleScroll() {
    if (isScrollLocked) return; // Don't process scroll events during locked scroll

    const currentScrollY = window.scrollY;
    const heroBottom = heroSection.offsetHeight;
    const educationTop = educationSection.offsetTop;
    const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";

    // Determine if we're in hero section
    if (currentScrollY < heroBottom * 0.5) {
      isInHero = true;
      navbar.classList.remove("visible");
    } else {
      isInHero = false;
      navbar.classList.add("visible");

      // Snap to education as soon as header becomes visible when scrolling down
      if (
        scrollDirection === "down" &&
        currentScrollY < educationTop &&
        currentScrollY >= heroBottom * 0.5
      ) {
        setScrollLock(true);
        smoothScrollTo(educationTop, 1800); // 1800ms = 1500ms * 1.2 (20% slower)
        setTimeout(() => {
          setScrollLock(false);
        }, 1800);
      }
    }

    // Snap behavior for hero section when scrolling up from education
    if (
      scrollDirection === "up" &&
      currentScrollY < educationTop &&
      currentScrollY > heroBottom * 0.3
    ) {
      // User is scrolling up from education towards hero
      setScrollLock(true);
      smoothScrollTo(0, 1800); // 1800ms = 1500ms * 1.2 (20% slower)
      setTimeout(() => {
        setScrollLock(false);
      }, 1800);
    }

    lastScrollY = currentScrollY;
  }

  // Custom smooth scroll function with custom duration
  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
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
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // Use throttling to improve performance
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 50);
  });

  // Initial check
  handleScroll();

  // Export scroll lock function for use in other modules
  window.setScrollLock = setScrollLock;
}
