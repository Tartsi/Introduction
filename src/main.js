// THIS FILE WORKS AS THE GLOBAL JS-FILE FOR THE APPLICATION
"use strict";

// Import all modules
import { initNavbar } from "./modules/navbar.js";
import { initSmoothScroll } from "./modules/smoothScroll.js";
import { initActiveSection } from "./modules/activeSection.js";
import { initAnimations } from "./modules/animations.js";
import { initContact } from "./modules/contact.js";
import { initScrollSnap } from "./modules/scrollSnap.js";
import { initEducation } from "./modules/education.js";

// Initialize all modules when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initSmoothScroll();
  initActiveSection();
  initAnimations();
  initContact();
  initScrollSnap();
  initEducation();

  console.log("JavaScript modules initialized succesfully");
});
