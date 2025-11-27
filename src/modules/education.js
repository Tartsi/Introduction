// EDUCATION MODULE - Handles triangle card rotation and interaction

/**
 * Initializes the education triangle card system
 *
 * This function manages:
 * - Triangle layout with 3 education cards
 * - Rotation animation when cards are selected
 * - Active card highlighting
 * - Responsive behavior for screens > 900px
 *
 * @function initEducation
 * @exports initEducation
 * @returns {void}
 */
export function initEducation() {
  const cards = document.querySelectorAll(".education__card");

  if (cards.length === 0) return;

  // Set initial active card (Bachelor of Science)
  const bachelorCard = document.querySelector(
    '[data-education-card="bachelor"]'
  );
  if (bachelorCard) {
    bachelorCard.classList.add("active");
  }

  // Add click handlers to all cards
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      handleCardClick(card);
    });
  });
}

/**
 * Handles card click and rotation animation
 * @param {HTMLElement} clickedCard - The card that was clicked
 */
function handleCardClick(clickedCard) {
  // Don't do anything if the card is already active
  if (clickedCard.classList.contains("active")) return;

  const cards = Array.from(document.querySelectorAll(".education__card"));
  const activeCard = document.querySelector(".education__card.active");

  if (!activeCard) return;

  // Get positions
  const clickedPosition = getCardPosition(clickedCard);
  const activePosition = getCardPosition(activeCard);

  // Determine rotation direction
  const positions = ["top", "left", "right"];
  const clickedIndex = positions.indexOf(clickedPosition);
  const activeIndex = positions.indexOf(activePosition);

  // Calculate rotation direction (clockwise or counter-clockwise)
  let direction;
  if (clickedIndex === (activeIndex + 1) % 3) {
    direction = "clockwise";
  } else if (clickedIndex === (activeIndex + 2) % 3) {
    direction = "counter-clockwise";
  } else {
    direction = "clockwise";
  }

  // Apply rotation animation
  rotateCards(direction);

  // Update active state after animation
  setTimeout(() => {
    activeCard.classList.remove("active");
    clickedCard.classList.add("active");
  }, 400);
}

/**
 * Gets the current position class of a card
 * @param {HTMLElement} card - The card element
 * @returns {string} - Position class name (top, left, or right)
 */
function getCardPosition(card) {
  if (card.classList.contains("education__card--top")) return "top";
  if (card.classList.contains("education__card--left")) return "left";
  if (card.classList.contains("education__card--right")) return "right";
  return "top";
}

/**
 * Rotates all cards in the specified direction
 * @param {string} direction - 'clockwise' or 'counter-clockwise'
 */
function rotateCards(direction) {
  const cards = Array.from(document.querySelectorAll(".education__card"));
  const positions = ["top", "left", "right"];

  // Get current positions
  const currentPositions = cards.map((card) => getCardPosition(card));

  // Calculate new positions
  const newPositions = currentPositions.map((pos, index) => {
    const posIndex = positions.indexOf(pos);
    if (direction === "clockwise") {
      return positions[(posIndex + 1) % 3];
    } else {
      return positions[(posIndex + 2) % 3];
    }
  });

  // Apply rotation class for animation
  const container = document.querySelector(".education__cards-container");
  if (container) {
    container.classList.add("rotating");
    setTimeout(() => {
      container.classList.remove("rotating");
    }, 600);
  }

  // Update card positions
  cards.forEach((card, index) => {
    // Remove all position classes
    card.classList.remove(
      "education__card--top",
      "education__card--left",
      "education__card--right"
    );
    // Add new position class
    card.classList.add(`education__card--${newPositions[index]}`);
  });
}
