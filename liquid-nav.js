
/* Portfolio 2.0 — Neon Punk & Neon Futurism Navigation */

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".navbar");
    const modeBar = document.querySelector(".design-bar");

    if (!nav || !modeBar) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let previousMerged = false;

    function updateLiquidNav() {
        const isLight = document.body.dataset.theme === "light";

        // Both themes can now dock when scrolling.
        const shouldMerge = window.scrollY > 110;

        document.body.classList.toggle(
            "liquid-nav-merged",
            shouldMerge
        );

        // Keep the original bounce exclusive to light mode.
        if (
            isLight &&
            shouldMerge &&
            !previousMerged &&
            !reducedMotion.matches
        ) {
            nav.classList.remove("liquid-nav-bounce");

            // Restart the entrance animation.
            void nav.offsetWidth;

            nav.classList.add("liquid-nav-bounce");
        }

        if (!shouldMerge) {
            nav.classList.remove("liquid-nav-bounce");
        }

        previousMerged = shouldMerge;
    }

    /* =========================================
       ACTIVE SECTION TRACKING
       ========================================= */

    const navLinks = Array.from(
        nav.querySelectorAll('a[href^="#"]')
    );

    const sections = navLinks
        .map((link) => {
            const id = link.getAttribute("href").slice(1);

            return {
                link,
                section: document.getElementById(id)
            };
        })
        .filter((item) => item.section);

    function updateActiveSection() {
        const scrollPosition = window.scrollY + 180;

        let activeLink = navLinks[0];

        sections.forEach(({ link, section }) => {
            if (section.offsetTop <= scrollPosition) {
                activeLink = link;
            }
        });

        // Highlight the final section at the bottom.
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 10
        ) {
            activeLink = sections[sections.length - 1]?.link || activeLink;
        }

        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link === activeLink
            );
        });
    }

    function updateNavigation() {
        updateLiquidNav();
        updateActiveSection();
    }

    window.addEventListener("scroll", updateNavigation, {
        passive: true
    });

    // Respond when the visitor changes themes.
    const themeButtons = document.querySelectorAll(
        "[data-set-theme]"
    );

    themeButtons.forEach((button) => {
        button.addEventListener("click", updateNavigation);
    });

    window.addEventListener("resize", updateNavigation);

    updateNavigation();
});
