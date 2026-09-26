# profile.html — View profile

Shows the user's details as text, plus a small info table.

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
- The Edit Profile line is a link to `edit-profile.html`.

## My Info table

```html
<hr>
<section>
    <h3>My Info</h3>
    <table border="1" cellpadding="5">
        <tr><th>Field</th><th>Value</th></tr>
        <tr><td>Name</td><td>Mugdad Alhammad</td></tr>
        <tr><td>Joined</td><td>2026</td></tr>
    </table>
</section>
```

- `border="1"` gives visible borders; `cellpadding="5"` adds space inside cells.
- `<tr>` = row, `<th>` = heading cell, `<td>` = data cell.

## How it works

View-only page. Basic data is plain text (fast to read), extra data is a
two-column table. The Edit Profile link is the "route" to the edit form.