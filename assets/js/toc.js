/*
    Original Author: Bramus Van Damme
    Link to original: https://www.bram.us/2020/01/10/smooth-scrolling-sticky-scrollspy-navigation/

    Most of this code comes courtesy of Bramus Van Damme, with some minor tweaks
    to get it working for my use case.  Thanks, Bramus!
*/

(function() {
  let activeElement = null;

  window.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll("#TableOfContents li");
    if (!navItems.length) return;

    // Grab the mobile summary element to update with current section
    const mobileSummary = document.querySelector(".toc-mobile > summary");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (activeElement) {
                navItems.forEach((node) => {
                    node.classList.remove('active');
                    node.classList.add('inactive');
                });
            }
            if (entry.intersectionRatio > 0) {
                activeElement = entry.target.getAttribute('id');
            }
            if (activeElement) {
                const nav_ref = document.querySelector(`#TableOfContents li a[href="#${activeElement}"]`);
                if (nav_ref) {
                    nav_ref.parentElement.classList.remove('inactive');
                    nav_ref.parentElement.classList.add('active');

                    // Update mobile summary with current section name
                    if (mobileSummary) {
                        mobileSummary.textContent = nav_ref.textContent;
                    }
                }
            }
        });
    });

    const post = document.querySelector(".post");
    if (post) {
        post.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]").forEach((section) => {
            observer.observe(section);
        });
    }

    // Auto-close mobile TOC when a link is clicked
    const mobileDetails = document.querySelector(".toc-mobile");
    if (mobileDetails) {
        mobileDetails.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileDetails.removeAttribute("open");
            });
        });
    }
  });
})();
