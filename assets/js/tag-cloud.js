(function () {
  const cloud = document.querySelector('.tag-cloud');
  if (!cloud) return;
  const filter = document.querySelector('.tag-filter-input');
  const sortBtn = document.querySelector('.tag-sort-btn');
  const empty = document.querySelector('.tag-cloud-empty');
  const items = Array.from(cloud.querySelectorAll('.tag-cloud-item'));

  if (filter) {
    filter.addEventListener('input', () => {
      const q = filter.value.trim().toLowerCase();
      let shown = 0;
      for (const el of items) {
        const match = el.dataset.name.includes(q);
        el.hidden = !match;
        if (match) shown++;
      }
      if (empty) empty.hidden = shown !== 0;
    });
  }

  if (sortBtn) {
    sortBtn.addEventListener('click', () => {
      const next = sortBtn.dataset.mode === 'alpha' ? 'count' : 'alpha';
      sortBtn.dataset.mode = next;
      sortBtn.setAttribute('aria-pressed', next === 'count' ? 'true' : 'false');
      sortBtn.textContent = next === 'alpha'
        ? sortBtn.dataset.labelAlpha
        : sortBtn.dataset.labelCount;
      const sorted = items.slice().sort((a, b) =>
        next === 'alpha'
          ? a.dataset.name.localeCompare(b.dataset.name)
          : parseInt(b.dataset.count, 10) - parseInt(a.dataset.count, 10)
      );
      for (const el of sorted) cloud.appendChild(el);
    });
  }
})();
