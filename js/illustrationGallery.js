(function () {
    var filters = document.querySelector('.sh-gallery-filters');
    var items = document.querySelectorAll('.sh-gallery-item');

    if (!filters || !items.length) return;

    filters.addEventListener('click', function (event) {
        var button = event.target.closest('.sh-filter-chip');
        if (!button) return;

        var filter = button.dataset.filter;

        filters.querySelectorAll('.sh-filter-chip').forEach(function (chip) {
            chip.classList.toggle('is-active', chip === button);
            chip.setAttribute('aria-pressed', chip === button ? 'true' : 'false');
        });

        items.forEach(function (item) {
            var show = filter === 'all' || item.dataset.region === filter;
            item.hidden = !show;
        });
    });

    filters.querySelectorAll('.sh-filter-chip').forEach(function (chip, index) {
        chip.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    });
})();
