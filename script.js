// Common functionality for all pages
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle with accessibility improvements
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Initialize mobile menu
    function initMobileMenu() {
        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
                hamburger.setAttribute('aria-expanded', !isExpanded);
                mobileMenu.classList.toggle('active');
                
                // Update hamburger icon
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.className = isExpanded ? 'fas fa-bars' : 'fas fa-times';
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (mobileMenu.classList.contains('active') && 
                    !mobileMenu.contains(e.target) && 
                    !hamburger.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    const icon = hamburger.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            });

            // Handle focus trap in mobile menu
            const focusableElements = mobileMenu.querySelectorAll('a[href], button, input, select, textarea');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (lastFocusable) {
                lastFocusable.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab' && !e.shiftKey) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                });
            }

            if (firstFocusable) {
                firstFocusable.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab' && e.shiftKey) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                });
            }
        }
    }

    // Initialize theme toggle
    function initThemeToggle() {
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                const isDark = document.body.classList.contains('dark-theme');
                themeToggle.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
                themeToggle.setAttribute('title', isDark ? 'Toggle light mode' : 'Toggle dark mode');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });

            // Check for saved theme preference
            if (localStorage.getItem('theme') === 'dark' || 
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.body.classList.add('dark-theme');
                themeToggle.querySelector('i').className = 'fas fa-sun';
                themeToggle.setAttribute('title', 'Toggle light mode');
            }
        }
    }

    // Initialize keyboard navigation
    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }

    // Initialize forms
    function initForms() {
        // Form handling for telemedicine page
        const appointmentForm = document.getElementById('appointmentForm');
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Here you would typically send the form data to a server
                alert('Thank you for booking an appointment! We will contact you shortly.');
                this.reset();
                this.classList.remove('active');
            });
        }

        // Form handling for contact page
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Here you would typically send the form data to a server
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            });
        }

        // Toggle appointment form in telemedicine page
        const toggleFormBtn = document.getElementById('toggleFormBtn');
        if (toggleFormBtn) {
            toggleFormBtn.addEventListener('click', function() {
                const form = document.getElementById('appointmentForm');
                if (form) {
                    form.classList.toggle('active');
                }
            });
        }
    }

    // Initialize all functionality
    initMobileMenu();
    initThemeToggle();
    initKeyboardNavigation();
    initForms();
}); 