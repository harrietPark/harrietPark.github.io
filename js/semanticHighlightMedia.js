(function () {
    var PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    var gifs = document.querySelectorAll('.sh-hero-gifs img[data-gif-src], .sh-step-media img[data-gif-src]');

    if (!gifs.length) {
        return;
    }

    function playGif(img) {
        var src = img.getAttribute('data-gif-src');
        if (src && img.getAttribute('src') !== src) {
            img.setAttribute('src', src);
        }
    }

    function pauseGif(img) {
        var src = img.getAttribute('src');
        if (src && src !== PLACEHOLDER) {
            img.setAttribute('src', PLACEHOLDER);
        }
    }

    gifs.forEach(function (img) {
        var heroRow = img.closest('.sh-hero-gifs');
        var isStep = img.closest('.sh-step-media');
        var isFirstHero = heroRow && heroRow.querySelector('img') === img;

        if (isStep || (heroRow && !isFirstHero)) {
            img.setAttribute('src', PLACEHOLDER);
        }
    });

    if (!('IntersectionObserver' in window)) {
        gifs.forEach(playGif);
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                playGif(entry.target);
            } else {
                pauseGif(entry.target);
            }
        });
    }, {
        rootMargin: '80px 0px',
        threshold: 0.15
    });

    gifs.forEach(function (img) {
        observer.observe(img);
    });
})();
