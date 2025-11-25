// SCROLL SNAP MODULE - Handles auto-hiding header and scroll-snap behavior

export function initScrollSnap() {
  const navbar = document.querySelector(".navbar");
  const heroSection = document.querySelector("#hero");
  const educationSection = document.querySelector("#education");
  const seeMoreTrigger = document.querySelector("#see-more-trigger");

  let lastScrollY = window.scrollY;
  let isInHero = true;

  // Make navbar initially hidden
  navbar.classList.remove("visible");

  // See More click handler
  if (seeMoreTrigger) {
    seeMoreTrigger.addEventListener("click", () => {
      educationSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Scroll handler for auto-hiding navbar and snap behavior
  function handleScroll() {
    const currentScrollY = window.scrollY;
    const heroBottom = heroSection.offsetHeight;
    const educationTop = educationSection.offsetTop;
    const educationBottom = educationTop + educationSection.offsetHeight;
    const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";

    // Determine if we're in hero section
    if (currentScrollY < heroBottom * 0.5) {
      isInHero = true;
      navbar.classList.remove("visible");
    } else {
      isInHero = false;
      navbar.classList.add("visible");
    }

    // Snap behavior for hero section when scrolling up from education
    if (
      scrollDirection === "up" &&
      currentScrollY < educationTop &&
      currentScrollY > heroBottom * 0.3
    ) {
      // User is scrolling up from education towards hero
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Snap behavior for education section when scrolling down from hero
    if (
      scrollDirection === "down" &&
      currentScrollY > heroBottom * 0.7 &&
      currentScrollY < educationTop + 100
    ) {
      // User is scrolling down from hero towards education
      window.scrollTo({
        top: educationTop,
        behavior: "smooth",
      });
    }

    lastScrollY = currentScrollY;
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
}
