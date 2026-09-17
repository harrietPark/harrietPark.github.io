(function () {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const selectors = [
        ".home-hero",
        ".mind-map-section",
        ".home-section > h2",
        ".experiment-card",
        ".selected-card",
        ".home-view-all",
        ".home-contact",
        ".about-intro",
        ".about-section > h2",
        ".experience-item",
        ".skills-column",
        ".list-item",
        "#categories",
        "#projects-grid .grid-item",
        ".sh-main > .sh-title",
        ".sh-main > .sh-video-embed",
        ".sh-video-stack > .sh-video-figure",
        ".sh-overview",
        ".sh-main > .sh-section",
        ".sh-gallery-intro",
        ".sh-gallery-filters",
        ".sh-gallery-item"
    ];

    const staggeredSelectors = [
        ".experiment-card",
        ".selected-card",
        ".skills-column",
        ".grid-item",
        ".sh-gallery-item"
    ].join(",");

    function initScrollReveal() {
        if (reduceMotion.matches || !("IntersectionObserver" in window)) {
            return;
        }

        const targets = Array.from(document.querySelectorAll(selectors.join(",")));

        if (!targets.length) {
            return;
        }

        targets.forEach((element) => {
            element.setAttribute("data-scroll-reveal", "");

            if (element.matches(staggeredSelectors)) {
                const siblings = Array.from(element.parentElement.children)
                    .filter((sibling) => sibling.matches(staggeredSelectors));
                const position = siblings.indexOf(element) % 3;
                element.style.setProperty("--scroll-reveal-delay", `${position * 55}ms`);
            }
        });

        document.documentElement.classList.add("scroll-reveal-ready");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, {
            rootMargin: "0px 0px -8% 0px",
            threshold: 0.08
        });

        requestAnimationFrame(() => {
            targets.forEach((target) => observer.observe(target));
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScrollReveal, { once: true });
    } else {
        initScrollReveal();
    }
}());
