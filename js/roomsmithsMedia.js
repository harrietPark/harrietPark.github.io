(() => {
    const videos = [...document.querySelectorAll('.roomsmiths-demo')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const visible = new Set();

    function load(video) {
        if (!video.getAttribute('src')) video.src = video.dataset.src;
    }

    function play(video) {
        if (!reducedMotion.matches && !document.hidden) {
            video.play().catch(() => { /* Native controls remain available. */ });
        }
    }

    if (!('IntersectionObserver' in window)) {
        videos.forEach(load);
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(({target: video, isIntersecting}) => {
            if (isIntersecting) {
                visible.add(video);
                load(video);
                play(video);
            } else {
                visible.delete(video);
                video.pause();
            }
        });
    }, { threshold: 0.15 });

    videos.forEach(video => observer.observe(video));
    document.addEventListener('visibilitychange', () => {
        visible.forEach(video => document.hidden ? video.pause() : play(video));
    });
    reducedMotion.addEventListener('change', () => {
        visible.forEach(video => reducedMotion.matches ? video.pause() : play(video));
    });
})();
