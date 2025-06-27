// // ==========================================================================
// // Project: Kent Vincent Boter's Portfolio
// // Author: Kent Vincent Boter
// // Description: Main JavaScript for the portfolio website,
// //              including dynamic content, interactivity, and animations.
// // ==========================================================================

// /**
//  * Global Constants & DOM Elements (Cached for performance)
//  * Using const for elements that don't change.
//  */
// const DOM = {
//     body: document.body,
//     dateTimeElement: document.getElementById("dateTime"),
//     themeToggleBtn: document.getElementById('theme-toggle'),
//     mainNav: document.querySelector('.main-nav'),
//     header: document.querySelector('header'),
//     aboutToggleBtn: document.getElementById('about-toggle'),
//     aboutSection: document.getElementById('about'),
//     // floatingContactBtnAnchor: document.querySelector('#floating-contact-btn .floating-button'), // REMOVED (due to HTML removal)
//     contactFormSection: document.getElementById('contact-form'),
//     inquiryForm: document.getElementById('inquiryForm'),
//     formStatus: document.getElementById('form-status'),
//     titleTag: document.querySelector('title'), // Added for dynamic title
//     // faviconLink: document.querySelector('link[rel="icon"]') // REMOVED (favicon now handled solely by HTML)
// };

// // ==========================================================================
// // 1. Core Utility Functions
// //    These functions perform specific, reusable tasks.
// // ==========================================================================

// /**
//  * Updates the live date and time for Cebu City, Philippines.
//  */
// function updateDateTime() {
//     const now = new Date();
//     const options = {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: true,
//         timeZone: 'Asia/Manila' // Specific timezone for Cebu City
//     };

//     if (DOM.dateTimeElement) {
//         DOM.dateTimeElement.innerText = now.toLocaleString('en-US', options);
//     }
// }

// /**
//  * Sets the theme of the website (light-mode or dark-mode).
//  * Also updates the local storage and title tag.
//  * Favicon is now handled solely by the HTML <link> tag.
//  * @param {string} theme - The theme to set ('light-mode' or 'dark-mode').
//  */
// function setTheme(theme) {
//     if (theme === 'dark-mode') {
//         DOM.body.classList.add('dark-mode');
//         localStorage.setItem('theme', 'dark-mode');
//         // Update title for dark mode
//         if (DOM.titleTag) DOM.titleTag.textContent = "Kent Vincent Boter | Portfolio";
//         // No faviconLink update here, as it's now static from HTML
//     } else {
//         DOM.body.classList.remove('dark-mode');
//         localStorage.setItem('theme', 'light-mode');
//         // Update title for light mode
//         if (DOM.titleTag) DOM.titleTag.textContent = "Kent Vincent Boter | Portfolio";
//         // No faviconLink update here, as it's now static from HTML
//     }
// }

// /**
//  * Handles toggling visibility for expandable sections and scrolls smoothly to them.
//  * This function is now more generic and reusable.
//  * @param {HTMLElement} sectionElement - The section element to toggle (e.g., #about, #contact-form).
//  * @param {HTMLElement} [scrollTarget=sectionElement] - The element to scroll to within the section, if different.
//  * @param {number} [scrollBuffer=20] - The pixel buffer below the fixed header/nav for visual spacing.
//  * @param {HTMLElement|null} [toggleButton=null] - The button element whose 'clicked' class should be toggled.
//  */
// function toggleAndScrollSection(sectionElement, scrollTarget = sectionElement, scrollBuffer = 20, toggleButton = null) {
//     if (!sectionElement) {
//         console.warn('Attempted to toggle a non-existent section.');
//         return;
//     }

//     const isNowHidden = sectionElement.classList.toggle('about-hidden');

//     // Update button text for 'About Me' specifically
//     if (sectionElement.id === 'about' && DOM.aboutToggleBtn) {
//         DOM.aboutToggleBtn.textContent = isNowHidden ? 'Show About Me' : 'Hide About Me';
//     }

//     // Toggle 'clicked' class on the provided button
//     if (toggleButton) {
//         if (!isNowHidden) {
//             toggleButton.classList.add('clicked');
//         } else {
//             toggleButton.classList.remove('clicked');
//         }
//     }

//     // If the section is now visible, scroll to it
//     if (!isNowHidden) {
//         const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;
//         const navHeight = DOM.mainNav ? DOM.mainNav.offsetHeight : 0;
//         const combinedFixedHeights = headerHeight + navHeight;

//         // Calculate target scroll position relative to the document
//         const scrollTargetTop = scrollTarget.getBoundingClientRect().top + window.scrollY;
//         const targetSectionHeight = sectionElement.offsetHeight;
//         const viewportHeight = window.innerHeight;

//         let desiredScrollTop;

//         // Calculate space available below fixed header/nav
//         const availableViewportHeight = viewportHeight - combinedFixedHeights - scrollBuffer;

//         if (targetSectionHeight <= availableViewportHeight) {
//             // If the section fits completely, try to position it nicely (e.g., at the top with buffer)
//             desiredScrollTop = scrollTargetTop - (combinedFixedHeights + scrollBuffer);
//         } else {
//             // If the section is taller than the available viewport,
//             // just align its top right below the fixed elements with the buffer.
//             desiredScrollTop = scrollTargetTop - (combinedFixedHeights + scrollBuffer);
//         }

//         // A small delay ensures CSS transitions for max-height have started
//         setTimeout(() => {
//             window.scrollTo({
//                 top: desiredScrollTop,
//                 behavior: 'smooth'
//             });
//         }, 150);
//     }
// }

// // ==========================================================================
// // 2. Module: UI Initialization & Event Handlers
// //    Encapsulates all logic related to setting up the UI and attaching events.
// // ==========================================================================
// const UIManager = (function() {
//     /**
//      * Initializes the theme based on local storage or a default.
//      */
//     function initTheme() {
//         if (DOM.themeToggleBtn) {
//             const savedTheme = localStorage.getItem('theme');
//             setTheme(savedTheme || 'dark-mode'); // Default to dark mode if no preference saved
//         }
//     }

//     /**
//      * Handles clicks on the main navigation buttons for smooth scrolling.
//      */
//     function setupMainNavScrolling() {
//         DOM.mainNav?.querySelectorAll('.nav-button').forEach(anchor => {
//             anchor.addEventListener('click', function(e) {
//                 e.preventDefault();

//                 const targetId = this.getAttribute('href');
//                 const targetSection = document.querySelector(targetId);

//                 if (!targetSection) {
//                     console.warn(`Navigation target not found: ${targetId}`);
//                     return;
//                 }

//                 const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;
//                 const navHeight = DOM.mainNav ? DOM.mainNav.offsetHeight : 0;
//                 const combinedFixedHeights = headerHeight + navHeight;

//                 // Define the extra buffer/gap you want below the fixed nav.
//                 const scrollBuffer = 20; // Pixels of gap between nav and section top

//                 // Special handling for sections that might be hidden by default (like 'About Me' and 'Contact Form')
//                 if ((targetId === '#about' && targetSection.classList.contains('about-hidden')) ||
//                     (targetId === '#contact-form' && targetSection.classList.contains('about-hidden'))) {

//                     let buttonToToggle = null;
//                     if (targetId === '#about') {
//                         buttonToToggle = DOM.aboutToggleBtn;
//                     }

//                     // For toggled sections, ensure they open and then scroll with the desired buffer.
//                     // The toggleAndScrollSection function now takes care of the full offset calculation.
//                     toggleAndScrollSection(targetSection, targetSection, scrollBuffer, buttonToToggle);
//                     return; // Exit as toggleAndScrollSection will handle the scroll
//                 }

//                 // For all other sections (or already visible #about / #contact-form)
//                 const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
//                 const targetSectionHeight = targetSection.offsetHeight;
//                 const viewportHeight = window.innerHeight;

//                 let offsetPosition;

//                 // Calculate space available below fixed header/nav
//                 const availableViewportHeight = viewportHeight - combinedFixedHeights - scrollBuffer;

//                 if (targetSectionHeight <= availableViewportHeight) {
//                     // If the section fits entirely, position its top just below the fixed nav + buffer
//                     offsetPosition = elementPosition - (combinedFixedHeights + scrollBuffer);
//                 } else {
//                     // If the section is taller than the available viewport,
//                     // just align its top right below the fixed elements with the buffer.
//                     offsetPosition = elementPosition - (combinedFixedHeights + scrollBuffer);
//                 }


//                 window.scrollTo({
//                     top: offsetPosition,
//                     behavior: 'smooth'
//                 });
//             });
//         });
//     }

//     /**
//      * Sets up the Intersection Observer for fade-in animations.
//      */
//     function setupScrollFadeIn() {
//         // Target all 'section' elements EXCEPT those that are explicitly toggled
//         const fadeInElements = document.querySelectorAll(
//             'section:not(#about):not(#contact-form)'
//         );

//         const observerOptions = {
//             root: null, // The viewport is the root
//             rootMargin: '0px',
//             threshold: 0.1 // Trigger when 10% of the element is visible
//         };

//         const observer = new IntersectionObserver((entries, obs) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add('visible');
//                     obs.unobserve(entry.target); // Stop observing once visible
//                 }
//             });
//         }, observerOptions);

//         fadeInElements.forEach(el => observer.observe(el));
//     }

//     /**
//      * Sets up generic glow-on-click effect for specified elements.
//      */
//     function setupGlowOnClick() {
//         document.querySelectorAll('.glow-on-click').forEach(element => {
//             element.addEventListener('click', () => {
//                 // Skip elements that have specific click handling for 'clicked' class
//                 // Removed DOM.floatingContactBtnAnchor from this check as it's gone
//                 if (element === DOM.aboutToggleBtn || element === DOM.themeToggleBtn) {
//                     return;
//                 }

//                 element.classList.add('clicked');
//                 setTimeout(() => {
//                     element.classList.remove('clicked');
//                 }, 400); // Remove glow after 400ms
//             });
//         });
//     }

//     /**
//      * Attaches all event listeners for the page's interactive elements.
//      */
//     function attachEventListeners() {
//         // Theme toggle
//         DOM.themeToggleBtn?.addEventListener('click', () => {
//             if (DOM.body.classList.contains('dark-mode')) {
//                 setTheme('light-mode');
//             } else {
//                 setTheme('dark-mode');
//             }
//         });

//         // About Me toggle - now directly calls toggleAndScrollSection with a default extraOffset
//         DOM.aboutToggleBtn?.addEventListener('click', () => {
//             toggleAndScrollSection(DOM.aboutSection, DOM.aboutSection, 20, DOM.aboutToggleBtn); // 20px buffer
//         });

//         // Floating Contact Button - This listener is removed because the button was removed from HTML
//         // DOM.floatingContactBtnAnchor?.addEventListener('click', (e) => {
//         //     e.preventDefault();
//         //     toggleAndScrollSection(DOM.contactFormSection, DOM.contactFormSection, 50, DOM.floatingContactBtnAnchor);
//         // });

//         // Contact Form Submission (Frontend only)
//         DOM.inquiryForm?.addEventListener('submit', function(event) {
//             event.preventDefault(); // Prevent actual form submission

//             if (DOM.formStatus) {
//                 // Simulate form submission success
//                 DOM.formStatus.textContent = 'Message sent successfully! (Note: This is a demo. No actual email was sent.)';
//                 DOM.formStatus.classList.remove('error');
//                 DOM.formStatus.classList.add('success');

//                 // Clear form fields
//                 setTimeout(() => {
//                     DOM.inquiryForm.reset();
//                 }, 1000);

//                 // Hide status message after a longer delay
//                 setTimeout(() => {
//                     DOM.formStatus.classList.remove('success');
//                     DOM.formStatus.textContent = '';
//                 }, 5000);
//             }
//         });
//     }

//     // Public API for the UIManager module
//     return {
//         init: function() {
//             // Ensure page loads at the very top on refresh
//             window.scrollTo(0, 0);

//             updateDateTime();
//             setInterval(updateDateTime, 1000); // Update every second

//             initTheme();
//             setupMainNavScrolling();
//             setupScrollFadeIn();
//             setupGlowOnClick();
//             attachEventListeners();
//         }
//     };
// })();

// // ==========================================================================
// // 3. Document Ready Initialization
// //    Ensures the script runs only after the DOM is fully loaded.
// // ==========================================================================
// document.addEventListener('DOMContentLoaded', UIManager.init);


// ==========================================================================
// Project: Kent Vincent Boter's Portfolio
// Author: Kent Vincent Boter
// Description: Main JavaScript for the portfolio website,
//              including dynamic content, interactivity, and animations.
// ==========================================================================

/**
 * Global Constants & DOM Elements (Cached for performance)
 * Using const for elements that don't change.
 */
const DOM = {
    body: document.body,
    dateTimeElement: document.getElementById("dateTime"),
    themeToggleBtn: document.getElementById('theme-toggle'),
    mainNav: document.querySelector('.main-nav'),
    header: document.querySelector('header'),
    aboutToggleBtn: document.getElementById('about-toggle'),
    aboutSection: document.getElementById('about'),
    contactFormSection: document.getElementById('contact-form'),
    inquiryForm: document.getElementById('inquiryForm'),
    formStatus: document.getElementById('form-status'),
    titleTag: document.querySelector('title'),
    // NEW: Footer Elements
    currentYearElement: document.getElementById('current-year'),
    footer: document.getElementById('main-footer') // Added the footer element
};

// ==========================================================================
// 1. Core Utility Functions
//    These functions perform specific, reusable tasks.
// ==========================================================================

/**
 * Updates the live date and time for Cebu City, Philippines.
 */
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Manila' // Specific timezone for Cebu City
    };

    if (DOM.dateTimeElement) {
        DOM.dateTimeElement.innerText = now.toLocaleString('en-US', options);
    }
}

/**
 * Sets the theme of the website (light-mode or dark-mode).
 * Also updates the local storage and title tag.
 * Favicon is now handled solely by the HTML <link> tag.
 * @param {string} theme - The theme to set ('light-mode' or 'dark-mode').
 */
function setTheme(theme) {
    if (theme === 'dark-mode') {
        DOM.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        // Update title for dark mode
        if (DOM.titleTag) DOM.titleTag.textContent = "Kent Vincent Boter | Portfolio";
    } else {
        DOM.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
        // Update title for light mode
        if (DOM.titleTag) DOM.titleTag.textContent = "Kent Vincent Boter | Portfolio";
    }
}

/**
 * Updates the current year in the footer copyright.
 */
function updateCurrentYear() {
    if (DOM.currentYearElement) {
        DOM.currentYearElement.textContent = new Date().getFullYear();
    }
}


/**
 * Handles toggling visibility for expandable sections and scrolls smoothly to them.
 * This function is now more generic and reusable.
 * @param {HTMLElement} sectionElement - The section element to toggle (e.g., #about, #contact-form).
 * @param {HTMLElement} [scrollTarget=sectionElement] - The element to scroll to within the section, if different.
 * @param {number} [scrollBuffer=20] - The pixel buffer below the fixed header/nav for visual spacing.
 * @param {HTMLElement|null} [toggleButton=null] - The button element whose 'clicked' class should be toggled.
 */
function toggleAndScrollSection(sectionElement, scrollTarget = sectionElement, scrollBuffer = 20, toggleButton = null) {
    if (!sectionElement) {
        console.warn('Attempted to toggle a non-existent section.');
        return;
    }

    const isNowHidden = sectionElement.classList.toggle('about-hidden');

    // Update button text for 'About Me' specifically
    if (sectionElement.id === 'about' && DOM.aboutToggleBtn) {
        DOM.aboutToggleBtn.textContent = isNowHidden ? 'Show About Me' : 'Hide About Me';
    }

    // Toggle 'clicked' class on the provided button
    if (toggleButton) {
        if (!isNowHidden) {
            toggleButton.classList.add('clicked');
        } else {
            toggleButton.classList.remove('clicked');
        }
    }

    // If the section is now visible, scroll to it
    if (!isNowHidden) {
        const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;
        const navHeight = DOM.mainNav ? DOM.mainNav.offsetHeight : 0;
        const combinedFixedHeights = headerHeight + navHeight;

        // Calculate target scroll position relative to the document
        const scrollTargetTop = scrollTarget.getBoundingClientRect().top + window.scrollY;
        const targetSectionHeight = sectionElement.offsetHeight;
        const viewportHeight = window.innerHeight;

        let desiredScrollTop;

        // Calculate space available below fixed header/nav
        const availableViewportHeight = viewportHeight - combinedFixedHeights - scrollBuffer;

        if (targetSectionHeight <= availableViewportHeight) {
            // If the section fits completely, try to position it nicely (e.g., at the top with buffer)
            desiredScrollTop = scrollTargetTop - (combinedFixedHeights + scrollBuffer);
        } else {
            // If the section is taller than the available viewport,
            // just align its top right below the fixed elements with the buffer.
            desiredScrollTop = scrollTargetTop - (combinedFixedHeights + scrollBuffer);
        }

        // A small delay ensures CSS transitions for max-height have started
        setTimeout(() => {
            window.scrollTo({
                top: desiredScrollTop,
                behavior: 'smooth'
            });
        }, 150);
    }
}

// ==========================================================================
// 2. Module: UI Initialization & Event Handlers
//    Encapsulates all logic related to setting up the UI and attaching events.
// ==========================================================================
const UIManager = (function() {
    /**
     * Initializes the theme based on local storage or a default.
     */
    function initTheme() {
        if (DOM.themeToggleBtn) {
            const savedTheme = localStorage.getItem('theme');
            setTheme(savedTheme || 'dark-mode'); // Default to dark mode if no preference saved
        }
    }

    /**
     * Handles clicks on the main navigation buttons for smooth scrolling.
     */
    function setupMainNavScrolling() {
        DOM.mainNav?.querySelectorAll('.nav-button').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (!targetSection) {
                    console.warn(`Navigation target not found: ${targetId}`);
                    return;
                }

                const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;
                const navHeight = DOM.mainNav ? DOM.mainNav.offsetHeight : 0;
                const combinedFixedHeights = headerHeight + navHeight;

                // Define the extra buffer/gap you want below the fixed nav.
                const scrollBuffer = 20; // Pixels of gap between nav and section top

                // Special handling for sections that might be hidden by default (like 'About Me' and 'Contact Form')
                if ((targetId === '#about' && targetSection.classList.contains('about-hidden')) ||
                    (targetId === '#contact-form' && targetSection.classList.contains('about-hidden'))) {

                    let buttonToToggle = null;
                    if (targetId === '#about') {
                        buttonToToggle = DOM.aboutToggleBtn;
                    }

                    // For toggled sections, ensure they open and then scroll with the desired buffer.
                    // The toggleAndScrollSection function now takes care of the full offset calculation.
                    toggleAndScrollSection(targetSection, targetSection, scrollBuffer, buttonToToggle);
                    return; // Exit as toggleAndScrollSection will handle the scroll
                }

                // For all other sections (or already visible #about / #contact-form)
                const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                const targetSectionHeight = targetSection.offsetHeight;
                const viewportHeight = window.innerHeight;

                let offsetPosition;

                // Calculate space available below fixed header/nav
                const availableViewportHeight = viewportHeight - combinedFixedHeights - scrollBuffer;

                if (targetSectionHeight <= availableViewportHeight) {
                    // If the section fits entirely, position its top just below the fixed nav + buffer
                    offsetPosition = elementPosition - (combinedFixedHeights + scrollBuffer);
                } else {
                    // If the section is taller than the available viewport,
                    // just align its top right below the fixed elements with the buffer.
                    offsetPosition = elementPosition - (combinedFixedHeights + scrollBuffer);
                }


                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    /**
     * Sets up the Intersection Observer for fade-in animations.
     */
    function setupScrollFadeIn() {
        // Target all 'section' elements EXCEPT those that are explicitly toggled
        const fadeInElements = document.querySelectorAll(
            'section:not(#about):not(#contact-form)'
        );

        const observerOptions = {
            root: null, // The viewport is the root
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, observerOptions);

        fadeInElements.forEach(el => observer.observe(el));
    }

    /**
     * Sets up generic glow-on-click effect for specified elements.
     */
    function setupGlowOnClick() {
        document.querySelectorAll('.glow-on-click').forEach(element => {
            element.addEventListener('click', () => {
                // Skip elements that have specific click handling for 'clicked' class
                if (element === DOM.aboutToggleBtn || element === DOM.themeToggleBtn) {
                    return;
                }

                element.classList.add('clicked');
                setTimeout(() => {
                    element.classList.remove('clicked');
                }, 400); // Remove glow after 400ms
            });
        });
    }

    /**
     * Attaches all event listeners for the page's interactive elements.
     */
    function attachEventListeners() {
        // Theme toggle
        DOM.themeToggleBtn?.addEventListener('click', () => {
            if (DOM.body.classList.contains('dark-mode')) {
                setTheme('light-mode');
            } else {
                setTheme('dark-mode');
            }
        });

        // About Me toggle - now directly calls toggleAndScrollSection with a default extraOffset
        DOM.aboutToggleBtn?.addEventListener('click', () => {
            toggleAndScrollSection(DOM.aboutSection, DOM.aboutSection, 20, DOM.aboutToggleBtn); // 20px buffer
        });

        // Contact Form Submission (Frontend only)
        DOM.inquiryForm?.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            if (DOM.formStatus) {
                // Simulate form submission success
                DOM.formStatus.textContent = 'Message sent successfully! (Note: This is a demo. No actual email was sent.)';
                DOM.formStatus.classList.remove('error');
                DOM.formStatus.classList.add('success');

                // Clear form fields
                setTimeout(() => {
                    DOM.inquiryForm.reset();
                }, 1000);

                // Hide status message after a longer delay
                setTimeout(() => {
                    DOM.formStatus.classList.remove('success');
                    DOM.formStatus.textContent = '';
                }, 5000);
            }
        });
    }

    // Public API for the UIManager module
    return {
        init: function() {
            // Ensure page loads at the very top on refresh
            window.scrollTo(0, 0);

            updateDateTime();
            setInterval(updateDateTime, 1000); // Update every second

            updateCurrentYear(); // Call this function on init

            initTheme();
            setupMainNavScrolling();
            setupScrollFadeIn();
            setupGlowOnClick();
            attachEventListeners();
        }
    };
})();

// ==========================================================================
// 3. Document Ready Initialization
//    Ensures the script runs only after the DOM is fully loaded.
// ==========================================================================
document.addEventListener('DOMContentLoaded', UIManager.init);
