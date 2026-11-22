# profile.html — View profile

Shows the user's details, task statistics and a small info table.

## User info section

```html
<section>
    <h2>Mugdad Alhammad</h2>
    <p><strong>Major:</strong> Computer Science</p>
    <p><strong>Email:</strong> mugdad02@tutamail.com</p>
    <p><strong>Role:</strong> Owner</p>
    <p><a href="edit-profile.html">Edit Profile</a></p>
</section>
```

- Each detail is a `<p>` with a `<strong>` label. Pattern:
  `<p><strong>Label:</strong> value</p>`.
- The Edit Profile line is a link to `edit-profile.html` (kept here; the one in
  `settings.html` was removed).

## My task statistics

```html
<ul class="profile-stats">
    <li>Assigned <strong>5</strong></li>
    <li>Completed <strong>4</strong></li>
    <li>In Progress <strong>1</strong></li>
    <li>Completion <strong>80%</strong></li>
</ul>
```

- `.profile-stats` shares the `.stats` grid/card styling but is a separate
  class, so `updateDashboardStats()` in `app.js` does not overwrite it.
- Numbers are sample data until the PHP backend supplies real tasks.

## My Info table

- A two-column table (Field / Value) with Name and Joined rows.

## How it works

View-only page. Basic data is plain text, extra data is tables, and the stat
grid gives a quick read of the user's workload. The Edit Profile link is the
route to the edit form.
