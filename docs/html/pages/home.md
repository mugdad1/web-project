# home.html — My Home (after login)

The signed-in user's hub. It was a welcome + notifications + quick-actions page;
it now also holds the dashboard, chat and task creation so those features are
available straight from the home screen.

## Header / nav

```html
<body class="home-page">
<header>
    <h1>My Home <span class="role-badge" id="role-badge">Admin</span></h1>
    <nav>
        <a href="profile.html">Profile</a>
        <a href="dashboard.html">Dashboard</a>
        <a href="chat.html">Chat</a>
        <a href="index.html">Sign Out</a>
    </nav>
</header>
```

- No Home link — this page IS home.
- "Sign Out" is still just a link back to `index.html` (real sessions come with PHP).

## Welcome hero

```html
<section class="hero">
    <p class="eyebrow">Your workspace</p>
    <h2>Welcome back, Mugdad</h2>
    <p>Here is what is happening in your projects today.</p>
</section>
```

- The background is pure CSS in `css/style.css`: layered gradients plus a
  repeating diagonal pattern on `body.home-page`, and a blue-to-teal gradient
  with a dot pattern on `.hero`. No image files, no downloads.
- The name is static for now; the logged-in user's name comes with PHP.

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

## Notifications and quick actions

- `.notifications li` still get a "Mark read" button from `wireNotifications()`.
- The "New team" quick action is `data-admin-only`, so it disappears in the
  Member demo role.

## How it works

`home.html` is the hub: it displays info (welcome + notifications) and offers the
main features (dashboard, chat, tasks, members) without leaving the page.
Everything is static until the backend adds real users, tasks, messages and
notifications.
