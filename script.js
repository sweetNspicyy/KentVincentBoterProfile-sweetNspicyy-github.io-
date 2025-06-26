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
    const isNowHidden = aboutSection.classList.toggle("about-hidden");

    if (isNowHidden) {
        toggleBtn.innerText = "Show About Me";
    } else {
        toggleBtn.innerText = "Hide About Me";
    }
}

// Function to handle fade-in effect on scroll for sections
function fadeInOnScroll() {
    document.querySelectorAll("section:not(#about)").forEach(section => {
        const rect = section.getBoundingClientRect();
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
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // --- Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
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

    // --- Show/Hide About Section ---
    const aboutToggleBtn = document.getElementById('about-toggle');
    aboutToggleBtn.addEventListener('click', toggleAboutSection);

    // --- Buy me a Coffee / Payment Options Toggle ---
    // This section is now simpler because the button is a direct link
    // The payment options container is no longer on this page,
    // so we remove the related JS logic.
    // The `<a>` tag's `target="_blank"` handles opening the new tab.


    // --- Scroll Animation ---
    document.querySelectorAll("section:not(#about)").forEach(section => section.classList.add("fade-in"));
    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll();

    // --- Glow on Click Effect ---
    document.querySelectorAll('.glow-on-click').forEach(element => {
        element.addEventListener('click', () => {
            element.classList.add('clicked');
            setTimeout(() => {
                element.classList.remove('clicked');
            }, 400);
        });
    });
});
