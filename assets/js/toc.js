/*
    Scrollspy for Table of Contents.
    Uses scroll position instead of IntersectionObserver for reliable
    bi-directional tracking on mobile and desktop.
*/

(function() {
  const TOC = '#TableOfContents, #MobileTableOfContents';

  window.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll(TOC.split(', ').map(s => s + ' li').join(', '));
    if (!navItems.length) return;

    const post = document.querySelector('.post');
    if (!post) return;

    const headings = Array.from(post.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'));
    if (!headings.length) return;

    const mobileSummary = document.querySelector('.toc-mobile-bar > summary');

    let ticking = false;

    function updateScrollspy() {
      // Find the heading closest to (but above) the top of the viewport.
      // Use a generous offset so the heading activates once it's scrolled
      // past the sticky header/TOC bar area.
      const scrollTop = window.scrollY;
      const offset = window.innerHeight * 0.2;

      let current = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= offset) {
          current = heading.getAttribute('id');
        } else {
          break;
        }
      }

      // Clear all
      navItems.forEach(node => {
        node.classList.remove('active');
        node.classList.add('inactive');
      });

      if (current) {
        const sel = TOC.split(', ').map(s => `${s} li a[href="#${current}"]`).join(', ');
        document.querySelectorAll(sel).forEach(nav_ref => {
          nav_ref.parentElement.classList.remove('inactive');
          nav_ref.parentElement.classList.add('active');
        });

        if (mobileSummary) {
          const link = document.querySelector(`#MobileTableOfContents li a[href="#${current}"]`);
          if (link) mobileSummary.textContent = link.textContent;
        }
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollspy);
        ticking = true;
      }
    }, { passive: true });

    // Initial run
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
