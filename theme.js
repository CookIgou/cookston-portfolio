
// Portfolio 2.0 — Theme System

// Check whether the visitor previously selected a theme.
const savedTheme = localStorage.getItem("portfolio-theme");

// Detect the visitor's device appearance preference.
const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
).matches;

// Choose the appropriate theme.
const initialTheme =
    savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : prefersDark
            ? "dark"
            : "light";

// Apply the selected theme.
document.body.dataset.theme = initialTheme;


// ==================================
// CHANGE MODE DROPDOWN
// ==================================

const themeToggle = document.getElementById("theme-toggle");
const themeOptions = document.getElementById("theme-options");

// Open or close the dropdown when clicked.
themeToggle.addEventListener("click", () => {
    const isOpen = !themeOptions.hidden;

    themeOptions.hidden = isOpen;
    themeToggle.setAttribute("aria-expanded", String(!isOpen));
});

// Close the dropdown when clicking outside it.
document.addEventListener("click", (event) => {
    if (!event.target.closest(".theme-selector")) {
        themeOptions.hidden = true;
        themeToggle.setAttribute("aria-expanded", "false");
    }
});


// ==================================
// LIGHT AND DARK MODE SELECTION
// ==================================

// Find the theme selection buttons.
const themeButtons = document.querySelectorAll("[data-set-theme]");

// Listen for a visitor selecting a theme.
themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedTheme = button.dataset.setTheme;

        // Apply the selected theme.
        document.body.dataset.theme = selectedTheme;

        // Remember the visitor's selection.
        localStorage.setItem("portfolio-theme", selectedTheme);

        // Close the dropdown.
        themeOptions.hidden = true;
        themeToggle.setAttribute("aria-expanded", "false");
    });
});
