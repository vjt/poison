(function() {
    var body = document.body;
    var hamburger = document.querySelector('.hamburger-btn');
    var overlay = document.querySelector('.sidebar-overlay');
    var closeBtn = document.querySelector('.sidebar-close');
    var sidebar = document.querySelector('.sidebar');

    function openMenu() {
        body.classList.add('menu-open');
        hamburger.setAttribute('aria-expanded', 'true');
        sidebar.focus();
    }

    function closeMenu() {
        body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
    }

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            if (body.classList.contains('menu-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && body.classList.contains('menu-open')) {
            closeMenu();
        }
    });

    // Header search button — triggers the Pagefind modal
    var searchBtn = document.querySelector('.btn-header-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            var trigger = document.querySelector('pagefind-modal-trigger .pf-trigger-btn');
            if (trigger) trigger.click();
        });
    }
})();
