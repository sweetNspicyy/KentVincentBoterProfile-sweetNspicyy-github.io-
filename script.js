// ==========================================================================
// Project: Kent Vincent Boter's Portfolio
// Author: Kent Vincent Boter
// Description: Main JavaScript for the portfolio website,
//              including dynamic content, interactivity, and animations.
// ==========================================================================

// ====================
// 1. Helper Functions
// ====================

/**
 * Updates the live date and time for Cebu City, Philippines.
 */
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long', // e.g., Thursday
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Use 12-hour format with AM/PM
        timeZone: 'Asia/Manila' // Specific timezone for Cebu City
    };
    const dateTimeElement = document.getElementById("dateTime");
    if (dateTimeElement) {
        dateTimeElement.innerText = now.toLocaleString('en-US', options);
    }
}

/**
 * Sets the theme of the website (light-mode or dark-mode).
 * @param {string} theme - The theme to set ('light-mode' or 'dark-mode').
 */
function setTheme(theme) {
    const body = document.body;
    if (theme === 'dark-mode') {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
    }
}

// ====================
// 2. DOMContentLoaded Event Listener
//    (All main script logic runs here after HTML is loaded)
// ====================
document.addEventListener('DOMContentLoaded', () => {

    // --- Initialize Date and Time Display ---
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second

    // --- Initialize and Handle Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        // Load saved theme on initial page load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme('dark-mode'); // Default to dark mode if no preference saved
        }

        themeToggleBtn.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                setTheme('light-mode');
            } else {
                setTheme('dark-mode');
            }
        });
    }

    // --- Show/Hide About Section with Controlled Smooth Scroll ---
    const aboutToggleBtn = document.getElementById('about-toggle');
    const aboutSection = document.getElementById('about');
    const headerElement = document.querySelector('header'); // Get the header to calculate its height

    // Ensure all necessary elements exist before adding listeners
    if (aboutToggleBtn && aboutSection && headerElement) {
        aboutToggleBtn.addEventListener('click', function() {
            // Toggle the 'about-hidden' class to show/hide the section
            const isNowHidden = aboutSection.classList.toggle('about-hidden');

            // Update button text and 'clicked' glow effect
            if (isNowHidden) {
                this.textContent = 'Show About Me';
                this.classList.remove('clicked'); // Remove glow when hidden
            } else {
                this.textContent = 'Hide About Me';
                this.classList.add('clicked'); // Add glow when visible

                // Calculate the precise scroll position
                // Get the current top position of the 'About Me' section relative to the document
                const aboutSectionTop = aboutSection.getBoundingClientRect().top + window.scrollY;
                // Get the actual height of the header
                const headerHeight = headerElement.offsetHeight;

                // Desired scroll position: Top of about section - (header height - a small buffer)
                // The '20' is a pixel buffer. Adjust this value (e.g., 10, 30) to fine-tune
                // how much of the header remains visible at the top.
                const desiredScrollTop = aboutSectionTop - (headerHeight - 20); 

                // Perform the smooth scroll with a slight delay.
                // The delay allows the CSS max-height transition to begin,
                // making the entire reveal and scroll feel perfectly synchronized.
                setTimeout(() => {
                    window.scrollTo({
                        top: desiredScrollTop,
                        behavior: 'smooth' // Provides a natural, not-too-fast scroll
                    });
                }, 150); // 150ms delay for smooth transition start
            }
        });
    }

    // --- Section Fade-in Effect on Scroll (using Intersection Observer) ---
    // Target all 'section' elements EXCEPT the '#about' section
    const fadeInElements = document.querySelectorAll('section:not(#about)'); 

    const observerOptions = {
        root: null, // The viewport is the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => observer.observe(el));


    // --- Generic Glow on Click Effect ---
    document.querySelectorAll('.glow-on-click').forEach(element => {
        element.addEventListener('click', () => {
            // Special handling for the about-toggle button: its 'clicked' state is managed
            // by its dedicated show/hide logic, so we don't interfere here.
            if (element.id === 'about-toggle') {
                return; // Exit if it's the about-toggle button
            }
            
            element.classList.add('clicked');
            setTimeout(() => {
                element.classList.remove('clicked');
            }, 400); // Remove glow after 400ms
        });
    });
});
