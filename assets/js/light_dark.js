(function() {
    var btns = document.querySelectorAll('.btn-light-dark');
    if (!btns.length) return;

    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    var saved = localStorage.getItem('theme');

    function applyTheme(theme) {
        var isDark = theme === 'dark';
        document.body.classList.toggle('dark-theme', isDark);
        document.documentElement.classList.toggle('dark-theme', isDark);

        var hasComments = document.getElementById('remark42');
        if (hasComments && window.REMARK42 && window.REMARK42.changeTheme) {
            window.REMARK42.changeTheme(isDark ? 'dark' : 'light');
        }
    }

    function getEffectiveTheme() {
        var saved = localStorage.getItem('theme');
        if (saved) return saved;
        return prefersDark.matches ? 'dark' : 'light';
    }

    // Apply on load (supplements the no-FOUC script in <head>)
    applyTheme(getEffectiveTheme());

    // Toggle button: bind to ALL instances (sidebar + header)
    btns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var current = getEffectiveTheme();
            var next = current === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', next);
            applyTheme(next);
        });
    });

    // Listen for system preference changes (only matters when no localStorage override)
    prefersDark.addEventListener('change', function() {
        if (!localStorage.getItem('theme')) {
            applyTheme(getEffectiveTheme());
        }
    });
})();
