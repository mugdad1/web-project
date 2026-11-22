# chat.html — Team chat room

Uses the same workspace shell as home and dashboard, then a two-column chat
layout: a members/channels panel on the left and the message room on the right.

## Workspace shell

```html
<body class="app-shell">
<aside class="sidebar">...side-nav...</aside>
<div class="app-body">
    <header class="topbar">
        <h1>Team Chat</h1>
        <div class="avatar-menu">...</div>
    </header>
    ...
</div>
</body>
```

- The avatar button opens a small menu with **My Profile** and **Sign Out**;
  `wireAvatarMenu()` in `app.js` handles open/close, outside clicks and Escape.

## Chat layout

```html
<div class="chat-layout">
    <aside class="card chat-sidebar">
        ... .member-list ...
        ... .channel-list ...
    </aside>
    <section class="card chat-room">
        <div id="feed" class="feed"><p class="empty">No messages yet.</p></div>
        <form id="chat-form" class="chat-form" novalidate>...</form>
    </section>
</div>
```

- `.chat-layout` is `260px | 1fr` on wide screens and stacks on small ones.
- `wireChat()` in `app.js` still appends a "You · just now" bubble to `#feed`
  and clears `#msg`.
- The `#general` link is an anchor to the room heading; `#project-updates`
  currently points back to `home.html` (no second room exists yet).

## How it works

The members panel is now a proper sidebar card instead of a loose list at the
top of the page. Messages are still client-side only until the PHP backend.
