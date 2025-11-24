// ACTIVE SECTION MODULE - Highlights active nav link based on scroll position

export function initActiveSection() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar__link");

  function setActiveLink() {
    const scrollPosition = window.scrollY + 150;

    // Treat hero section as "about" for active state
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          // If we're in the hero section, highlight "About" link
          if (sectionId === "hero" && link.getAttribute("href") === "#about") {
            link.classList.add("active");
          } else if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink(); // Call once on load
}
