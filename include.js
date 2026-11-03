// Loads shared fragments (nav, footer) into placeholders and runs their scripts.
(function () {
    function include(id, url) {
        var el = document.getElementById(id);
        if (!el) return;
        fetch(url).then(function (r) { return r.ok ? r.text() : ''; }).then(function (html) {
            el.innerHTML = html;
            el.querySelectorAll('script').forEach(function (old) {
                var s = document.createElement('script');
                s.textContent = old.textContent;
                old.replaceWith(s);
            });
        }).catch(function () { });
    }
    include('nav-placeholder', '/nav.html?v=20261104b');
    include('footer-placeholder', '/footer.html?v=20261104b');
})();
