# Changelog

All notable changes to the Tarvo Lilja Portfolio Website will be documented in this file.

## [1.0.0] - 2025-11-24

### Added

- Initial portfolio website implementation
- Full-viewport hero section with fade-in animations
- Auto-hiding navbar (appears after scrolling 50% of hero section)
- Unified background color (#dedede) across all sections
- Section separators with gradient thinning effect
- Smooth scroll navigation with easeInOutQuad easing (1500ms duration)
- Active link highlighting based on viewport center position
- Top-to-bottom fade-in animations for sections
- Card and skills animations using Intersection Observer
- Responsive design with mobile hamburger menu
- Language selector (FIN | ENG) in header
- Modular ES6 JavaScript architecture

### Removed

- All snap-scroll functionality (scroll-snap CSS properties and JavaScript snap behavior)
- Complex typing animations for section headers
- Scroll locking mechanism
- Education link snap-back behavior

### Technical Details

- Vanilla JavaScript (no frameworks or libraries)
- CSS custom properties for theming
- Intersection Observer API for scroll-triggered animations
- Performance-optimized scroll event handling
- Modular file structure with separate concerns

### Started

- Work on MVP (Due date 28.11.2025)
- Work on Header + Hero-section
