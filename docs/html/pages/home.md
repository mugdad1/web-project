# home.html — My Home (after login)

The signed-in user's hub. It was a welcome + notifications + quick-actions page;
it now also holds the dashboard, chat and task creation so those features are
available straight from the home screen.

## Workspace shell: sidebar + topbar

```html
<body class="home-page app-shell">
<aside class="sidebar">
    <div class="workspace">...</div>
    <nav class="side-nav" aria-label="Main">
        <a href="home.html">Home</a>
        <a href="dashboard.html">Dashboard</a>
        <a href="chat.html">Chat</a>
        <a href="profile.html">Profile</a>
        <a href="settings.html">Settings</a>
    </nav>
    <div class="sidebar-foot"><a href="index.html">Sign Out</a></div>
</aside>
<div class="app-body">
    <header class="topbar">
        <h1>My Home <span class="role-badge" id="role-badge">Admin</span></h1>
        <div class="topbar-actions">search input, avatar</div>
    </header>
    ...
</div>
</body>
```

- The sidebar/topbar pattern and purple palette are inspired by common
  project-management UIs (e.g. ClickUp); the markup and CSS here are original.
- `markCurrentPage()` in `app.js` still targets `nav a`, so it marks the
  current link inside `.side-nav`.
- "Sign Out" is still just a link back to `index.html` (real sessions come with PHP).
- `#task-search` filters both the priority cards and the table rows in place;
  `wireTaskSearch()` in `app.js` shows a "No matching tasks." note when nothing matches.
- The avatar button opens a small menu with **My Profile** and **Sign Out**.

## Welcome hero

```html
<section class="hero">
    <p class="eyebrow"><span class="date-chip">Today, 22 November</span></p>
    <h2>Welcome back, Mugdad</h2>
    <p>Here is what is happening in your projects today.</p>
</section>
```

- The background is pure CSS in `css/style.css`: layered gradients plus a
  repeating diagonal pattern on `body.home-page`, and a purple-to-pink gradient
  with a dot pattern on `.hero`. No image files, no downloads.
- The name is static for now; the logged-in user's name comes with PHP.
- The date chip is static sample text for now.

## My priorities

- A compact `.task-cards` list using `.status` pills (Complete / In progress /
  To do) and `.priority` pills (High / Medium / Low).
- This is presentational only; it mirrors the rows in the dashboard table.

## Dashboard on home

- A `.stats` list and a `table` with the same four sample tasks as
  `dashboard.html`. The task titles link to `task-details.html?task=...`.
- `js/app.js` turns the percentage cells into progress bars and recalculates
  the four totals from the table, just like on the real dashboard.
- "Full dashboard" still links to `dashboard.html`.

## Quick add-task form

- `<form id="quick-task-form">` with title (required), description and priority.
- On submit, `app.js` prepends a row to `#home-task-table tbody`, rebuilds the
  progress bars and updates the stats. Nothing is stored yet — a reload resets it.
- Generic form validation from `app.js` still applies.

## Chat on home

- `<div id="feed" class="feed">` plus `<form id="chat-form" novalidate>` with
  `#msg` and a Send button.
- The existing `wireChat()` handler appends a "You · just now" bubble and clears
  the input. `chat.html` remains the full chat room.

## Members and the admin-only rule

- The Members panel lists sample members with role badges.
- An **Admin / Member** demo switch sets `data-role` on `<body>`. `applyRole()`
  in `app.js` hides every `[data-admin-only]` block for the Member role and
  shows `#role-locked` instead. The Add Member form on home and the Add Member
  fieldset on `new-team.html` are both gated this way.
- **This is a mockup, not security.** Anyone can change the client-side role.
  The PHP milestone must verify the role on the server before any member is added.

## Notifications

- Clicking a `.notifications li` (or pressing Enter/Space on it) toggles
  `is-read` via `wireNotifications()` — there is no side button any more.
  Read items are faded with `opacity: .5`.
- The former Quick Actions list was removed; use the sidebar, the topbar or the
  inline forms/cards instead.

## How it works

`home.html` is the hub: it displays info (welcome + notifications) and offers the
main features (dashboard, chat, tasks, members) without leaving the page.
Everything is static until the backend adds real users, tasks, messages and
notifications.
