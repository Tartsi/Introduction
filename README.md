# Tarvo Lilja - Portfolio Website

A professional, modern portfolio website showcasing education, skills, and projects.

## Project Structure

```
Introduction/
├── src/
│   ├── index.html          # Main HTML file
│   ├── index.css           # Global CSS with imports
│   ├── main.js             # Main JavaScript entry point
│   ├── assets/             # Images and media
│   ├── styles/             # Modular CSS files
│   │   ├── navbar.css
│   │   ├── hero.css
│   │   ├── education.css
│   │   ├── skills.css
│   │   ├── projects.css
│   │   └── contact.css
│   └── modules/            # JavaScript modules
│       ├── navbar.js
│       ├── smoothScroll.js
│       ├── activeSection.js
│       ├── animations.js
│       └── contact.js
```

## Features

- **Responsive Design**: Mobile-first approach, works on all device sizes
- **Smooth Animations**: Professional hover effects and scroll-based animations
- **Modular Architecture**: Separated CSS and JavaScript for maintainability
- **Smooth Scrolling**: Anchor navigation with smooth scroll behavior
- **Active Section Highlighting**: Navigation updates based on scroll position
- **Modern UI**: Clean, professional design with custom color palette

## Color Palette

- Background: `rgba(237, 230, 230, 1)`
- Primary Text: `#1A1A1A`
- Professional Blue: `#3667d0ff`
- Light Gray: `#E5E7EB`

## Getting Started

Simply open `src/index.html` in a web browser, or use a local development server:

```bash
# Using Python
cd src
python -m http.server 8000

# Using Node.js (http-server)
cd src
npx http-server

# Using VS Code Live Server extension
# Right-click on index.html and select "Open with Live Server"
```

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- JavaScript (ES6+ Modules)
- Modular architecture for scalability

## Sections

1. **Navigation**: Fixed navbar with smooth scroll anchors
2. **Hero/Intro**: Large intro with profile image and call-to-action buttons
3. **Education**: University credentials and thesis information
4. **Skills**: Categorized technical and soft skills
5. **Projects**: Portfolio of key projects with links
6. **Contact**: Contact information and professional links

## Customization

To customize content:

- Update personal information in `src/index.html`
- Modify colors in CSS variables in `src/index.css`
- Add/remove skills and projects as needed
- Replace profile image in `src/assets/`

## License

MIT License - See LICENSE file for details Website - Tarvo Lilja

Portfolio showcasing my skills, projects, and professional/educational journey.

## Goal

This website serves as a comprehensive introduction to my professional profile, designed to help potential employers and collaborators:

- Understand my technical skills and expertise
- Review my portfolio of projects and accomplishments
- Learn about my professional background and experience
- Connect with me for opportunities

## Features

- **About Me**: Professional biography and career highlights
- **Skills & Technologies**: Technical competencies and tools
- **Portfolio**: Showcase of projects with descriptions and demos
- **Experience**: Work history and achievements
- **Contact**: Easy ways to get in touch

## Built With

- JavaScript
- Modern web technologies
- Responsive design for all devices
- Clean, professional aesthetic

## Contact

Feel free to reach out for opportunities, collaborations, or inquiries.

## License

License provided in the repository.
