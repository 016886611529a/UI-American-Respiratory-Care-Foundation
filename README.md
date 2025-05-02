# American Respiratory Care Foundation Website

A responsive website for the American Respiratory Care Foundation built with HTML, CSS, and vanilla JavaScript.

## Features

- Responsive design that works across all devices
- SVG-based graphics and animations
- Custom animation library for respiratory-themed elements
- Interactive lung visualization in the hero section
- Smooth animations and transitions
- Modular design with reusable header and footer components

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- SVG for graphics and animations

## Project Structure

```
.
├── index.html                   # Main HTML file
├── about.html                   # About page
├── assets/                      # Project assets
│   ├── css/                     # CSS styles
│   │   ├── base.css             # Base styles and global components
│   │   └── main.css             # Main page styles 
│   ├── js/                      # JavaScript functionality
│   └── images/                  # SVG image assets
├── script.js                    # General JavaScript functionality
├── includes/                    # Reusable HTML components
│   ├── header.html              # Global header component
│   └── footer.html              # Global footer component
└── README.md                    # This file
```

## Modular Structure

The website uses a modular component structure where header and footer HTML components are stored separately and loaded dynamically into each page:

1. **Base Styles**: Header and footer styles are defined in `assets/css/base.css`
2. **Page Styles**: Content specific to each page is defined in page-specific CSS files
3. **Component Loading**: JavaScript loads the header and footer into placeholder divs

This allows for easier maintenance as header and footer changes only need to be made in one place.

## Setup

This is a pure HTML/CSS/JavaScript project, so it doesn't require any build tools or package managers. Simply open the `index.html` file in a web browser to view the website.

## Animations

The project includes custom SVG animations that provide:

- Breathing effects for iconography
- Path drawing animations for lung visualization
- Floating effects for elements
- Pulsing and glowing highlights

## Browser Compatibility

The website is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration and education purposes.
