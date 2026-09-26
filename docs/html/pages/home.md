# home.html — My Home (after login)

The page a signed-in user lands on: a welcome message, notifications, quick
actions.

## Header / nav

```html
<h1>My Home</h1>
<nav>
    <a href="profile.html">Profile |</a>
    <a href="dashboard.html">Dashboard |</a>
    <a href="index.html">Sign Out</a>
</nav>
```

- No Home link — this page IS home.
- "Sign Out" is just a link back to index.html (real sessions come with PHP).

## Welcome section

```html
<section>
    <h2>Welcome back, Mugdad</h2>
    <p>Here is what is happening in your projects today.</p>
</section>
```

- Static name for now; the logged-in user's real name comes in the PHP
  milestone.

## Notifications section

```html
<hr>
<section>
    <h3>Notifications</h3>
    <ul>
        <li>Ahmed finished the sign up page</li>
        <li>Kumail updated the dashboard table</li>
        <li>Your task "New team page" was created</li>
    </ul>
</section>
```

- `<hr>` separates this block from the one above.
- `<ul>` / `<li>` = bullet-list of sample notifications (server will supply
  real ones later).

## Quick actions section

```html
<hr>
<section>
    <h3>Quick Actions</h3>
    <ul>
        <li><a href="new-task.html">New task</a></li>
        <li><a href="new-team.html">New team</a></li>
    </ul>
</section>
```

- Just two links inside list items.

## How it works

home.html is the hub: it displays info (welcome + notifications) and offers
navigation to the main features (profile, dashboard, new pages). Everything is
static until the backend adds real users/tasks/notifications.