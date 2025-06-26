// ====================
// 1. Helper Functions
// ====================

// Function to update the live time and date (Cebu City, Philippines)
function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Use 12-hour format with AM/PM
        timeZone: 'Asia/Manila' // Specific timezone for Cebu City
    };
    document.getElementById("dateTime").innerText = now.toLocaleString('en-US', options);
}

// Function to set the theme (light-mode or dark-mode)
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

// Function to toggle the visibility of the About Me section
function toggleAboutSection() {
    const aboutSection = document.getElementById("about");
    const toggleBtn = document.getElementById("about-toggle");

    // Toggle the 'about-hidden' class.
    // toggle() returns true if the class is now present (i.e., section is now hidden)
    const isNowHidden = aboutSection.classList.toggle("about-hidden");

    if (isNowHidden) {
        toggleBtn.innerText = "Show About Me"; // Section is now hidden, so button should offer to show it
    } else {
        toggleBtn.innerText = "Hide About Me"; // Section is now visible, so button should offer to hide it
    }
}

// Function to handle fade-in effect on scroll for sections
function fadeInOnScroll() {
    document.querySelectorAll("section:not(#about)").forEach(section => { // Exclude #about section as its visibility is toggled by button
        const rect = section.getBoundingClientRect();
        // Trigger animation when the top of the section is within 100px from the bottom of the viewport
        if (rect.top < window.innerHeight - 100) {
            section.classList.add("visible");
        }
    });
}

// ====================
// 2. DOMContentLoaded Event Listener
//    (All main script logic runs here after HTML is loaded)
// ====================
document.addEventListener('DOMContentLoaded', () => {

    // --- Date and Time ---
    updateDateTime(); // Call once immediately on load
    setInterval(updateDateTime, 1000); // Update every second

    // --- Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Check for saved theme in localStorage on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme); // Apply the saved theme
    } else {
        // If no theme saved, DEFAULT TO DARK MODE
        setTheme('dark-mode'); 
    }

    // Add event listener to the theme toggle button
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            setTheme('light-mode'); // Switch to light
        } else {
            setTheme('dark-mode'); // Switch to dark
        }
    });

    // --- Show/Hide About Section ---
    // Get reference to the about toggle button
    const aboutToggleBtn = document.getElementById('about-toggle');
    // Add event listener to toggle the about section
    aboutToggleBtn.addEventListener('click', toggleAboutSection);

    // --- Scroll Animation ---
    // Add fade-in class initially to all sections (prepares them for animation)
    // IMPORTANT: Exclude the #about section here as its visibility is handled by the toggle button
    document.querySelectorAll("section:not(#about)").forEach(section => section.classList.add("fade-in"));
    
    // Attach scroll event listener
    window.addEventListener("scroll", fadeInOnScroll);
    
    // Run on load to check initial visibility for sections already in view
    fadeInOnScroll();

    // --- Glow on Click Effect ---
    // Apply the 'clicked' class temporarily on click for visual feedback
    document.querySelectorAll('.glow-on-click').forEach(element => {
        element.addEventListener('click', () => {
            element.classList.add('clicked');
            setTimeout(() => {
                element.classList.remove('clicked');
            }, 400); // Remove 'clicked' class after 400ms (matches CSS transition)
        });
    });
});