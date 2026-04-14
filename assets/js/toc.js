/*
    Scrollspy for Table of Contents.
    Uses scroll position instead of IntersectionObserver for reliable
    bi-directional tracking on mobile and desktop.
*/

(function() {
  const TOC = '#TableOfContents, #MobileTableOfContents';

  window.addEventListener('DOMContentLoaded', () => {
    const post = document.querySelector('.post');
    if (!post) return;

    const headings = Array.from(post.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'));
    if (!headings.length) return;

    const mobileSummary = document.querySelector('.toc-mobile-bar > summary');
    const isItalian = document.documentElement.lang === 'it';

    // Inject "Top" and "Comments" links into each TOC
    document.querySelectorAll('#TableOfContents, #MobileTableOfContents').forEach(toc => {
      const topUl = toc.querySelector('ul');
      if (!topUl) return;

      // Top link
      const topLi = document.createElement('li');
      topLi.innerHTML = `<a href="#">${isItalian ? 'Inizio' : 'Top'}</a>`;
      topLi.classList.add('toc-top');
      topUl.insertBefore(topLi, topUl.firstChild);

      // Comments link
      if (document.getElementById('comments')) {
        const commLi = document.createElement('li');
        commLi.innerHTML = `<a href="#comments">${isItalian ? 'Commenti' : 'Comments'}</a>`;
        commLi.classList.add('toc-comments');
        topUl.appendChild(commLi);
      }
    });

    const navItems = document.querySelectorAll(TOC.split(', ').map(s => s + ' li').join(', '));
    let ticking = false;

    function updateScrollspy() {
      // Activate a heading once it scrolls past the sticky header/TOC bar.
      // Measure the bar dynamically so it works on both mobile and desktop.
      // Use scroll-padding-top as the threshold — this is the same value the
      // browser uses when navigating to an anchor, so clicked headings land
      // exactly at the scrollspy activation line. Add a few px of slack.
      const spt = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 64;
      const offset = spt + 2;

      let current = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= offset) {
          current = heading.getAttribute('id');
        } else {
          break;
        }
      }

      // Check if we've scrolled to the comments section
      const comments = document.getElementById('comments');
      const atComments = comments && comments.getBoundingClientRect().top <= offset;

      // Clear all
      navItems.forEach(node => {
        node.classList.remove('active');
        node.classList.add('inactive');
      });

      if (atComments) {
        // Highlight Comments
        document.querySelectorAll('.toc-comments').forEach(el => {
          el.classList.remove('inactive');
          el.classList.add('active');
        });
        if (mobileSummary) mobileSummary.textContent = isItalian ? 'Commenti' : 'Comments';
      } else if (current) {
        // Highlight current heading
        const sel = TOC.split(', ').map(s => `${s} li a[href="#${current}"]`).join(', ');
        document.querySelectorAll(sel).forEach(nav_ref => {
          nav_ref.parentElement.classList.remove('inactive');
          nav_ref.parentElement.classList.add('active');
        });
        if (mobileSummary) {
          const link = document.querySelector(`#MobileTableOfContents li a[href="#${current}"]`);
          if (link) mobileSummary.textContent = link.textContent;
        }
      } else {
        // At the top — highlight Top
        document.querySelectorAll('.toc-top').forEach(el => {
          el.classList.remove('inactive');
          el.classList.add('active');
        });
        if (mobileSummary) mobileSummary.textContent = isItalian ? 'Inizio' : 'Top';
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
