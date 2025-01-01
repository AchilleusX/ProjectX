let menuAnimationState = "closed"; // "closed", "opening", "open"
let isAnimating = false; // Flag to check if the animation is running

// Function to toggle the menu
function toggleMenu(event) {
    var menu = document.getElementById("menu");

    if (menuAnimationState === "closed") {
        // Setze Menü in den Ursprungszustand zurück, bevor es geöffnet wird
        closeMenu(); 

        // Öffne das Menü mit Animation
        menuAnimationState = "opening";
        isAnimating = true; // Animation ist aktiv
        menu.classList.add("active");
        menu.style.visibility = "visible";
        menu.style.opacity = "1";

        // Starte die Animation
        menu.style.animation = 'flyIn 2.5s ease-in-out';

        // Setze den Zustand nach der Animation auf "open"
        menu.addEventListener("animationend", onAnimationEnd);
    } else if (menuAnimationState === "opening" && isAnimating) {
        // Zweiter Klick: Animation abbrechen und sofort öffnen
        menuAnimationState = "open";
        isAnimating = false; // Animation sofort beenden
        menu.classList.add("active");
        menu.style.visibility = "visible";
        menu.style.opacity = "1";
        menu.style.animation = 'none'; // Animation abbrechen
    } else if (menuAnimationState === "open") {
        // Dritter Klick: Menü schließen
        menuAnimationState = "closed";
        closeMenu();
    }

    event.stopPropagation(); // Verhindere, dass Klicks das Menü schließen
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
            closeMenu();
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

// Funktion, um das Dropdown-Menü zu schließen und zurückzusetzen
function closeMenu() {
    var menu = document.getElementById("menu");
    var teasers = document.querySelectorAll('.teaser');
    var menuItems = menu.querySelectorAll("a");

    // Schließe das Menü und setze den Zustand zurück
    menuAnimationState = "closed";
    menu.classList.remove("active");
    menu.style.visibility = "hidden";
    menu.style.opacity = "0";

    // Teaser zurücksetzen (alle Teaser ausblenden)
    teasers.forEach(function(teaser) {
        teaser.classList.remove('visible');
        teaser.classList.add('hidden');
    });

    // Entferne aktive Zustände von Menüelementen
    menuItems.forEach(function(item) {
        item.classList.remove("selected"); // Entfernt z. B. eine Klasse 'selected', falls verwendet
    });
}

// Event-Listener für Klicks auf Menüpunkte
var menuLinks = document.querySelectorAll("#menu a"); // Selektiere alle Links im Menü
menuLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        closeMenu(); // Schließe das Menü, wenn ein Menüpunkt geklickt wird
    });
});
