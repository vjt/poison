# Changelog

User-facing changes to the Sindrome theme. Consumers (sindro.me, noema, …) pull this submodule by commit, so entries are ordered newest-first by date. When pulling, read entries newer than the commit you had pinned and check whether you need to add new params, shadow templates, or adjust config.

Format: one section per dated batch of changes. "Action" lines flag work consumers may need to do; "Default" lines note the fallback behavior so existing sites don't drift unless they opt in.

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
