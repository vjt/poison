# Changelog

User-facing changes to the Sindrome theme. Consumers (sindro.me, noema, …) pull this submodule by commit, so entries are ordered newest-first by date. When pulling, read entries newer than the commit you had pinned and check whether you need to add new params, shadow templates, or adjust config.

Format: one section per dated batch of changes. "Action" lines flag work consumers may need to do; "Default" lines note the fallback behavior so existing sites don't drift unless they opt in.

## 2026-04-23

### Fix Disqus reference for Hugo v0.154+

Replaced the deprecated `.Site.DisqusShortname` template field (removed from Hugo's multilingual site type in recent releases — builds errored with `can't evaluate field DisqusShortname in type page.Site`) with the current canonical path `site.Config.Services.Disqus.Shortname`.

**Touched:** `layouts/_default/single.html`, `layouts/partials/post/comments.html`.

**Default:** unchanged behavior for sites that have `[services.disqus]` configured (the new path reads the same Disqus shortname). Sites that never used Disqus see nothing new.

**Action:** none required. If your build still breaks on the old field, pull this commit.

### Add hero post layout

New opt-in layout for image-driven posts: renders the page's cover image full-width above the title and metadata. Useful for travelogues and photo-heavy posts where the image sets the scene.

**New files:** `layouts/_default/hero.html`, CSS in `assets/css/layout.css` (`.hero-post`, `.hero-cover`).

**Touched:** `layouts/_default/single.html` (adds a conditional hero-cover block when `site.Params.hero_posts` is true).

**Params (all optional):**
- Per-post: `layout = "hero"` in front matter — uses the dedicated `hero.html`.
- Site-wide: `[params] hero_posts = true` — adds the hero cover + class to every post via `single.html`.

The layout reads `cover` first, then falls back to `featuredImage`. Bundle resource or absolute path both work.

**Default:** unchanged. Sites that don't set `layout = "hero"` or `hero_posts` render exactly as before.

**Action:** none required. Opt in only.

### Add magazine list layout

New opt-in list layout: a photo-grid index using each post's `cover` image, useful for image-driven sections (travelogues, portfolios). Falls back gracefully on posts without a cover — card renders title + date + description.

**New files:** `layouts/partials/list-magazine-body.html`, CSS in `assets/css/layout.css` (`.magazine-grid`, `.magazine-card`).

**Touched:** `layouts/_default/list.html` (wraps existing body with a dispatch on `list_layout`).

**Params:**
- Per-section (in `_index.md`): `list_layout = "magazine"`.
- Site-wide: `[params] list_layout = "magazine"`.

The dispatch reads both `.Params.list_layout` (section-scoped) and `site.Params.list_layout` (site-wide). Reads `.Params.cover` for each card; an absolute path (starting `/`) or a bundle resource both work.

**Default:** unchanged. Sections/sites without the param render with the existing year-grouped list.

**Action:** none required. Opt in only.

## 2026-04-21

### Parameterize dark-mode sidebar + moon/sun colors

Previously the dark-theme sidebar, image border, text, links, socials, and moon/sun toggle were hardcoded to neutral greys (`#1A1A1A`, `#333`, `#AAA`, `#EEE`, `#CCC`). Sites with a warm or tinted palette (e.g. noema's cream/terracotta) could not make the dark sidebar match the rest of the page.

New params (all optional, light-mode equivalents already existed):

- `sidebar_bg_color_dark` — default `#1A1A1A`
- `sidebar_img_border_color_dark` — default `#333`
- `sidebar_p_color_dark` — default `#AAA`
- `sidebar_h1_color_dark` — default `#EEE`
- `sidebar_a_color_dark` — default `#CCC`
- `sidebar_socials_color_dark` — default `#AAA`
- `moon_sun_color_dark` — default `#EEE`
- `moon_sun_background_color_dark` — default `#333`

**Default:** unchanged. Sites that don't set these params render identically to before.

**Action:** none required. Opt in only if you want a tinted dark sidebar.
