// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // News pagination
    const paginationButtons = document.querySelectorAll('.pagination button');
    const newsItems = document.querySelectorAll('.news-card');
    
    // Only implement pagination if there are more than 3 news items
    if (newsItems.length > 3) {
        paginationButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Hide all news items
                newsItems.forEach(item => item.style.display = 'none');
                
                // Calculate which items to show (3 per page)
                const startIndex = index * 3;
                const endIndex = startIndex + 3;
                
                // Show the relevant items
                for (let i = startIndex; i < endIndex && i < newsItems.length; i++) {
                    newsItems[i].style.display = 'block';
                }
            });
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only process if it's an internal link
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Mobile menu toggle (for responsive design)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-toggle';
    mobileMenuButton.innerHTML = '☰';
    
    const headerContainer = document.querySelector('header .container');
    headerContainer.appendChild(mobileMenuButton);
    
    mobileMenuButton.addEventListener('click', function() {
        const navMenu = document.querySelector('nav ul');
        navMenu.classList.toggle('show');
    });
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--dark-blue);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block;
            }
            
            nav ul.show {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 70px;
                left: 0;
                right: 0;
                background-color: var(--white);
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                padding: 1rem;
            }
            
            nav ul.show li {
                margin: 1rem 0;
            }
        }
    `;
    document.head.appendChild(style);
}); 