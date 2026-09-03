document.addEventListener('DOMContentLoaded', () => {
    const gifImages = document.querySelectorAll('img[data-gif-src]');

    const showAnimation = (image) => {
        if (image.dataset.gifActive === 'true') return;
        image.src = image.dataset.gifSrc;
        image.dataset.gifActive = 'true';
    };

    const showPoster = (image) => {
        if (image.dataset.gifActive !== 'true') return;
        image.src = image.dataset.posterSrc;
        image.dataset.gifActive = 'false';
    };

    if (!('IntersectionObserver' in window)) {
        gifImages.forEach(showAnimation);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                showAnimation(entry.target);
            } else {
                showPoster(entry.target);
            }
        });
    }, {
        rootMargin: '250px 0px',
        threshold: 0
    });

    gifImages.forEach((image) => observer.observe(image));
});
