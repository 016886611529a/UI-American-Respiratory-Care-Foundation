/**
 * ARCF SVG Animation Library
 * A lightweight library for adding animations to SVG elements
 */

// IIFE to avoid global scope pollution
(function() {
    const ARCFAnimation = {
        /**
         * Breathe effect - simulates breathing motion
         * @param {string} selector - CSS selector for the SVG element
         * @param {number} duration - Animation duration in ms
         * @param {number} scale - Maximum scale factor
         */
        breathe: function(selector, duration = 3000, scale = 1.05) {
            const element = document.querySelector(selector);
            if (!element) return;
            
            // Save original dimensions
            const originalWidth = element.getBoundingClientRect().width;
            const originalHeight = element.getBoundingClientRect().height;
            
            // Create keyframes
            const keyframes = [
                { transform: 'scale(1)', opacity: 0.9 },
                { transform: `scale(${scale})`, opacity: 1 },
                { transform: 'scale(1)', opacity: 0.9 }
            ];
            
            // Animation options
            const options = {
                duration: duration,
                iterations: Infinity,
                easing: 'ease-in-out'
            };
            
            // Start animation
            element.animate(keyframes, options);
        },
        
        /**
         * Pulse effect - creates a pulsing highlight
         * @param {string} selector - CSS selector for the SVG element
         * @param {string} color - Highlight color
         * @param {number} duration - Animation duration in ms
         */
        pulse: function(selector, color = '#00D4B1', duration = 2000) {
            const element = document.querySelector(selector);
            if (!element) return;
            
            // For SVG elements, we need to handle them differently
            if (element.tagName.toLowerCase() === 'svg' || element.ownerSVGElement) {
                // Create a filter if it doesn't exist
                let filterId = 'pulse-filter-' + Math.random().toString(36).substring(2, 9);
                
                // Create SVG filter element
                const svgNS = "http://www.w3.org/2000/svg";
                const filter = document.createElementNS(svgNS, 'filter');
                filter.setAttribute('id', filterId);
                
                const feGaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur');
                feGaussianBlur.setAttribute('stdDeviation', '2');
                feGaussianBlur.setAttribute('result', 'blur');
                
                const feColorMatrix = document.createElementNS(svgNS, 'feColorMatrix');
                feColorMatrix.setAttribute('in', 'blur');
                feColorMatrix.setAttribute('mode', 'matrix');
                feColorMatrix.setAttribute('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7');
                feColorMatrix.setAttribute('result', 'glow');
                
                const feBlend = document.createElementNS(svgNS, 'feBlend');
                feBlend.setAttribute('in', 'SourceGraphic');
                feBlend.setAttribute('in2', 'glow');
                feBlend.setAttribute('mode', 'normal');
                
                filter.appendChild(feGaussianBlur);
                filter.appendChild(feColorMatrix);
                filter.appendChild(feBlend);
                
                // Find the SVG root
                const svgRoot = element.ownerSVGElement || element;
                const defs = svgRoot.querySelector('defs') || document.createElementNS(svgNS, 'defs');
                
                if (!svgRoot.querySelector('defs')) {
                    svgRoot.appendChild(defs);
                }
                
                defs.appendChild(filter);
                
                // Animation
                const keyframes = [
                    { filter: 'none' },
                    { filter: `url(#${filterId})` },
                    { filter: 'none' }
                ];
                
                const options = {
                    duration: duration,
                    iterations: Infinity,
                    easing: 'ease-in-out'
                };
                
                element.animate(keyframes, options);
            } else {
                // For regular HTML elements
                const keyframes = [
                    { boxShadow: '0 0 0 0px ' + color + '00' },
                    { boxShadow: '0 0 0 10px ' + color + '40' },
                    { boxShadow: '0 0 0 0px ' + color + '00' }
                ];
                
                const options = {
                    duration: duration,
                    iterations: Infinity,
                    easing: 'ease-in-out'
                };
                
                element.animate(keyframes, options);
            }
        },
        
        /**
         * Float effect - gentle floating motion
         * @param {string} selector - CSS selector for the SVG element
         * @param {number} duration - Animation duration in ms
         * @param {number} distance - Float distance in pixels
         */
        float: function(selector, duration = 3000, distance = 10) {
            const element = document.querySelector(selector);
            if (!element) return;
            
            // Create keyframes
            const keyframes = [
                { transform: 'translateY(0px)' },
                { transform: `translateY(-${distance}px)` },
                { transform: 'translateY(0px)' }
            ];
            
            // Animation options
            const options = {
                duration: duration,
                iterations: Infinity,
                easing: 'ease-in-out'
            };
            
            // Start animation
            element.animate(keyframes, options);
        },
        
        /**
         * Path drawing animation for SVG paths
         * @param {string} selector - CSS selector for the SVG path
         * @param {number} duration - Animation duration in ms
         */
        drawPath: function(selector, duration = 2000) {
            const path = document.querySelector(selector);
            if (!path || path.tagName.toLowerCase() !== 'path') return;
            
            // Get the total length of the path
            const length = path.getTotalLength();
            
            // Set up the starting position
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            
            // Create the animation
            const keyframes = [
                { strokeDashoffset: length },
                { strokeDashoffset: 0 }
            ];
            
            const options = {
                duration: duration,
                fill: 'forwards',
                easing: 'ease-in-out'
            };
            
            // Start the animation
            return path.animate(keyframes, options);
        },
        
        /**
         * Specialized animation for the lung SVG
         * @param {HTMLElement} svgDoc - The SVG document object
         */
        animateLungs: function(svgDoc) {
            if (!svgDoc || !svgDoc.contentDocument) return;
            
            const doc = svgDoc.contentDocument;
            
            // Animate trachea and bronchi
            this.drawPath(doc.querySelector('.trachea'), 1500);
            
            setTimeout(() => {
                this.drawPath(doc.querySelector('.bronchi-left'), 1200);
                this.drawPath(doc.querySelector('.bronchi-right'), 1200);
            }, 1000);
            
            // Animate branches
            setTimeout(() => {
                doc.querySelectorAll('.branch').forEach((branch, index) => {
                    setTimeout(() => {
                        this.drawPath(branch, 800);
                    }, index * 200);
                });
            }, 2000);
            
            // Animate alveoli
            setTimeout(() => {
                doc.querySelectorAll('.alveoli').forEach((alveoli, index) => {
                    setTimeout(() => {
                        this.breathe(alveoli, 3000 + (index * 500), 1.2);
                    }, index * 300);
                });
            }, 3000);
            
            // Animate lung outlines
            setTimeout(() => {
                this.drawPath(doc.querySelector('.lung-left'), 2000);
                this.drawPath(doc.querySelector('.lung-right'), 2000);
            }, 4000);
            
            // Animate oxygen particles
            setTimeout(() => {
                doc.querySelectorAll('.oxygen').forEach((particle, index) => {
                    // Random movement
                    const randomX = Math.random() * 30 - 15;
                    const randomY = Math.random() * 30 - 15;
                    
                    const keyframes = [
                        { transform: 'translate(0, 0)', opacity: 0 },
                        { transform: `translate(${randomX}px, ${randomY}px)`, opacity: 1 },
                        { transform: `translate(${randomX * 2}px, ${randomY * 2}px)`, opacity: 0 }
                    ];
                    
                    const options = {
                        duration: 3000 + (index * 500),
                        iterations: Infinity,
                        easing: 'ease-in-out',
                        delay: index * 300
                    };
                    
                    particle.animate(keyframes, options);
                });
            }, 5000);
        }
    };
    
    // Add to window object
    window.ARCFAnimation = ARCFAnimation;
    
    // Initialize animations when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Apply breathing effect to the award icons
        ARCFAnimation.breathe('.icon img', 4000, 1.1);
        
        // Apply pulse effect to donate buttons
        document.querySelectorAll('.donate-btn, .btn-teal').forEach(function(button) {
            ARCFAnimation.pulse(button, '#00D4B1', 3000);
        });
        
        // Float animation for journal cover
        ARCFAnimation.float('.conference-info img', 6000, 15);
        
        // Animate lung-related SVG paths
        document.querySelectorAll('svg path').forEach(function(path) {
            // Only animate paths related to lungs or respiratory system
            if (path.parentElement && path.parentElement.classList.contains('respiratory-icon')) {
                ARCFAnimation.drawPath(path, 3000);
            }
        });
        
        // Special animation for the hero lung SVG
        const lungSvg = document.querySelector('.hero-animation object');
        if (lungSvg) {
            lungSvg.addEventListener('load', function() {
                ARCFAnimation.animateLungs(this);
            });
        }
    });
})(); 