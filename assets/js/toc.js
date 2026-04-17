/*
    Scrollspy for Table of Contents.
    Scroll-position based for reliable bi-directional tracking.
    Handles both desktop (content container scrolls) and mobile (window scrolls).
*/

(function() {
  window.addEventListener('DOMContentLoaded', () => {
    const post = document.querySelector('.post');
    if (!post) return;

    const headings = Array.from(post.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'));
    if (!headings.length) return;

    const tocs = document.querySelectorAll('#TableOfContents, #MobileTableOfContents');
    const mobileSummary = document.querySelector('.toc-mobile-bar > summary');
    const comments = document.getElementById('comments');
    const labels = document.documentElement.lang === 'it'
      ? { top: 'Inizio', comments: 'Commenti' }
      : { top: 'Top', comments: 'Comments' };

    // Desktop: .content.container scrolls (overflow-y: auto, height: 100vh).
    // Mobile/tablet: window scrolls (overflow-y: visible on .content.container).
    const container = document.querySelector('.content.container');
    const containerScrolls = container &&
      getComputedStyle(container).overflowY !== 'visible' &&
      container.scrollHeight > container.clientHeight;
    const scrollTarget = containerScrolls ? container : window;
    const scrollEl = containerScrolls ? container : document.documentElement;

    // Activation offset: matches CSS scroll-padding-top so clicked headings
    // land exactly at the scrollspy activation line.
    const offset = (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 64) + 2;

    // Inject Top and Comments links
    tocs.forEach(toc => {
      const ul = toc.querySelector('ul');
      if (!ul) return;

      const topLi = document.createElement('li');
      topLi.innerHTML = `<a href="#">${labels.top}</a>`;
      topLi.classList.add('toc-top');
      ul.insertBefore(topLi, ul.firstChild);

      if (comments) {
        const commLi = document.createElement('li');
        commLi.innerHTML = `<a href="#comments">${labels.comments}</a>`;
        commLi.classList.add('toc-comments');
        ul.appendChild(commLi);
      }
    });

    const navItems = document.querySelectorAll('#TableOfContents li, #MobileTableOfContents li');
    let ticking = false;

    function updateScrollspy() {
      let current = null;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= offset) {
          current = h.id;
        } else {
          break;
        }
      }

      const atBottom = (scrollEl.scrollTop + scrollEl.clientHeight) >= (scrollEl.scrollHeight - 50);
      const atComments = comments && (comments.getBoundingClientRect().top <= offset || atBottom);

      navItems.forEach(n => { n.classList.remove('active'); n.classList.add('inactive'); });

      if (atComments) {
        activate('.toc-comments', labels.comments);
      } else if (current) {
        activate(`li:has(> a[href="#${current}"])`, null, current);
      } else {
        activate('.toc-top', labels.top);
      }

      ticking = false;
    }

    function activate(selector, summaryText, headingId) {
      tocs.forEach(toc => {
        const el = toc.querySelector(selector);
        if (el) { el.classList.remove('inactive'); el.classList.add('active'); }
      });
      if (mobileSummary) {
        if (summaryText) {
          mobileSummary.textContent = summaryText;
        } else if (headingId) {
          const link = document.querySelector(`#MobileTableOfContents li a[href="#${headingId}"]`);
          if (link) mobileSummary.textContent = link.textContent;
        }
      }
    }

    scrollTarget.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateScrollspy); ticking = true; }
    }, { passive: true });

    // Top link: scroll the correct container and clear any URL fragment
    document.querySelectorAll('.toc-top a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        scrollTarget.scrollTo({ top: 0, behavior: 'smooth' });
        history.replaceState(null, '', window.location.pathname + window.location.search);
      });
    });

    updateScrollspy();

    // Auto-close mobile TOC on link click
    const mobileBar = document.querySelector('.toc-mobile-bar');
    if (mobileBar) {
      mobileBar.addEventListener('click', e => {
        if (e.target.tagName === 'A') mobileBar.removeAttribute('open');
      });
    }
  });
})();
