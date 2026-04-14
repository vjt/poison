/*
    Original Author: Bramus Van Damme
    Link to original: https://www.bram.us/2020/01/10/smooth-scrolling-sticky-scrollspy-navigation/

    Most of this code comes courtesy of Bramus Van Damme, with some minor tweaks
    to get it working for my use case.  Thanks, Bramus!
*/

(function() {
  let activeElement = null;
  const TOC = '#TableOfContents, #MobileTableOfContents';

  window.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll(TOC.split(', ').map(s => s + ' li').join(', '));
    if (!navItems.length) return;

    const mobileSummary = document.querySelector('.toc-mobile-bar > summary');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (activeElement) {
                navItems.forEach(node => {
                    node.classList.remove('active');
                    node.classList.add('inactive');
                });
            }
            if (entry.intersectionRatio > 0) {
                activeElement = entry.target.getAttribute('id');
            }
            if (activeElement) {
                const sel = TOC.split(', ').map(s => `${s} li a[href="#${activeElement}"]`).join(', ');
                document.querySelectorAll(sel).forEach(nav_ref => {
                    nav_ref.parentElement.classList.remove('inactive');
                    nav_ref.parentElement.classList.add('active');
                });

                if (mobileSummary) {
                    const link = document.querySelector(`#MobileTableOfContents li a[href="#${activeElement}"]`);
                    if (link) mobileSummary.textContent = link.textContent;
                }
            }
        });
    });

    const post = document.querySelector(".post");
    if (post) {
        post.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]").forEach(section => {
            observer.observe(section);
        });
    }

    // Auto-close mobile TOC on link click
    const mobileBar = document.querySelector('.toc-mobile-bar');
    if (mobileBar) {
        mobileBar.addEventListener('click', e => {
            if (e.target.tagName === 'A') mobileBar.removeAttribute('open');
        });
    }
  });
})();
