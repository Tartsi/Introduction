// CONTACT MODULE - Handles contact interactions

export function initContact() {
  // Add smooth hover effects for contact items
  const contactItems = document.querySelectorAll(".contact__item");

  contactItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateY(-5px)";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateY(0)";
    });
  });

  // Handle CV download button
  const cvButton = document.querySelector(".btn--download-cv");
  if (cvButton) {
    cvButton.addEventListener("click", (e) => {
      // Placeholder for CV download functionality
      console.log("CV download clicked");
      // You can implement actual download logic here later
      // e.g., window.open('/path/to/cv.pdf', '_blank');
    });
  }
}
