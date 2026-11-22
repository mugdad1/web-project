# settings.html — Settings (after login)

Holds the appearance switch. It uses the same workspace shell (sidebar +
topbar + avatar menu) as home, dashboard, chat and profile.

## Appearance section

```html
<div class="theme-switch" role="group" aria-label="Colour theme">
    <button type="button" class="theme-btn is-active" data-theme-btn="light" aria-pressed="true">Light</button>
    <button type="button" class="theme-btn" data-theme-btn="dark" aria-pressed="false">Dark</button>
</div>
<p class="demo-note">Current theme: <strong id="theme-label">Light</strong></p>
```

- `wireThemeSwitch()` in `js/app.js` sets `data-theme="light|dark"` on `<body>`,
  updates the active button, its `aria-pressed` state and `#theme-label`.
- The choice is saved in `localStorage` (wrapped in `try/catch` so blocked
  storage cannot break the page) and is applied on every page load.
- `css/style.css` overrides the colour tokens and a few fixed surfaces under
  `body[data-theme="dark"]`.

## Account section

- Static text only — the Edit Profile link was removed. Real account/role
  settings arrive with the PHP backend.

## Reaching this page

Every authed page nav (including the sidebar on home/dashboard) links to
`settings.html`; `layout.html` lists it in its shared nav as well.
