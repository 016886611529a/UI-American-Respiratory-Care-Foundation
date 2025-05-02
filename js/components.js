/**
 * Component Loader for ARCF Website
 * Handles loading modular header and footer components
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load header component
    const headerPlaceholder = document.querySelector('#header-placeholder');
    if (headerPlaceholder) {
        fetch('includes/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                // After header is loaded, initialize mobile menu
                initMobileMenu();
            })
            .catch(error => console.error('Error loading header:', error));
    }

    // Load footer component
    const footerPlaceholder = document.querySelector('#footer-placeholder');
    if (footerPlaceholder) {
        fetch('includes/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
});

// Initialize mobile menu toggle
function initMobileMenu() {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-toggle';
    mobileMenuButton.innerHTML = '☰';
    
    const headerContainer = document.querySelector('header .container');
    if (headerContainer) {
        headerContainer.appendChild(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', function() {
            const navMenu = document.querySelector('nav ul');
            navMenu.classList.toggle('show');
        });
    }
} 