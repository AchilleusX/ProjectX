let menuAnimationState = "closed"; // "closed", "opening", "open"
let isAnimating = false; // Flag to check if the animation is running

// Function to toggle the menu
function toggleMenu(event) {
    var menu = document.getElementById("menu");

    if (menuAnimationState === "closed") {
        // Open menu with animation
        menuAnimationState = "opening";
        isAnimating = true; // Animation is running
        menu.classList.add("active");
        menu.style.visibility = "visible";
        menu.style.opacity = "1";

        // Prevent a new animation from starting
        menu.style.animation = 'flyIn 2.5s ease-in-out';

        // After the animation is completed, set state to "open"
        menu.addEventListener("animationend", onAnimationEnd);
    } else if (menuAnimationState === "opening" && isAnimating) {
        // Second click: cancel animation and open immediately
        menuAnimationState = "open";
        isAnimating = false; // End animation immediately
        menu.classList.add("active");
        menu.style.visibility = "visible";
        menu.style.opacity = "1";
        menu.style.animation = 'none'; // Cancel animation
    } else if (menuAnimationState === "open") {
        // Third click: close menu
        menuAnimationState = "closed";
        menu.classList.remove("active");
        setTimeout(function() {
            if (menuAnimationState === "closed") {
                menu.style.visibility = "hidden";
                menu.style.opacity = "0";
            }
        }, 50); // Delay to avoid transition issues
    }

    event.stopPropagation(); // Prevent clicks on the hamburger menu from closing it
}

function onAnimationEnd() {
    if (menuAnimationState === "opening") {
        menuAnimationState = "open"; // When the animation ends, set the menu as "open"
        isAnimating = false;
        this.removeEventListener("animationend", onAnimationEnd); // Remove event listener
    }
}

// Function to show the respective section
function showSection(sectionId) {
    // Hide all sections
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        section.classList.add('hidden'); // Adds the 'hidden' class to hide the section
    });

    // Show the clicked section
    var section = document.getElementById(sectionId);
    section.classList.remove('hidden'); // Removes the 'hidden' class to show the section
}

// Event listener to close the menu when clicking anywhere outside the menu or sections
document.addEventListener('click', function(event) {
    var menu = document.getElementById("menu");
    var menuIcon = document.querySelector(".menu-icon");
    var sections = document.querySelectorAll('section');
    
    // Check if the click was outside the menu or sections
    if (!menu.contains(event.target) && !menuIcon.contains(event.target) && !isSectionContentClicked(event)) {
        if (menu.classList.contains("active")) {
            menuAnimationState = "closed";
            menu.classList.remove("active");
            menu.style.visibility = "hidden"; // Make menu invisible
            menu.style.opacity = "0"; // Make menu invisible
        }
        // Hide all sections again
        sections.forEach(function(section) {
            section.classList.add('hidden'); // Hide all sections
        });
    }
});

// Helper function to check if the click was inside one of the visible sections
function isSectionContentClicked(event) {
    var sections = document.querySelectorAll('section');
    return Array.from(sections).some(function(section) {
        return section.contains(event.target); // Check if the click was inside one of the sections
    });
}

function showTeaser(teaserId) {
    var teaser = document.getElementById(teaserId);
    teaser.classList.remove('hidden');
    teaser.classList.add('visible');
}

function hideTeaser(teaserId) {
    var teaser = document.getElementById(teaserId);
    teaser.classList.remove('visible');
    teaser.classList.add('hidden');
}

