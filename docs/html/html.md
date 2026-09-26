# HTML Guide — Project Management Site

Every page in our site is **pure HTML** — no CSS, no JavaScript yet, we only
use what we learned in the labs. Forms use `method="get"` and just move you to
another page; nothing is saved until the PHP + Database milestone.

---

## 1. How the site flows

```
index.html  (landing / first page)
   |
   |  Sign Up / Sign In
   v
home.html   (after login, your main page)
   |
   |-- Profile   -> profile.html    (view)  -> edit-profile.html (edit)
   |-- Dashboard -> dashboard.html  (progress + task list)
   |-- New task  -> new-task.html
   |-- New team  -> new-team.html
   |-- Chat      -> chat.html       (team messages)
   `-- Sign Out  -> back to index.html
```

---

## 2. The files

| File | What it does |
|------|--------------|
| `index.html` | Landing page. What guests see first. Has nav + welcome section + contact link. |
| `layout.html` | Empty page pattern (header, nav, footer). Teammates copy it to start a new page. |
| `signup.html` | Registration form: first name, last name, email, password, major. |
| `signin.html` | Login form: email + password. |
| `home.html` | "My Home" after login: welcome message, notifications, quick actions. |
| `profile.html` | View your profile: name, major, email, role. |
| `edit-profile.html` | Edit your details — fields come pre-filled so you just change them. |
| `new-task.html` | Create a task: title, description, priority (Low/Medium/High). |
| `new-team.html` | Create a team: team name + add one member by email with a role (Owner/Admin/Member). |
| `dashboard.html` | Progress overview + task list. Each task links to its details page. |
| `task-details.html` | Shows one task's full details. |
| `chat.html` | Team chat room: members list, message feed, send box. |

---

## 3. How to read any HTML file

Every page has the same shape, top to bottom:

```
<!DOCTYPE html>          -> tells the browser "this is HTML5"
<html lang="en">         -> the whole page
  <head>                 -> page info (not shown on the page)
    <meta charset="UTF-8">   -> lets the browser read the text correctly
    <title>...</title>        -> the text shown in the browser tab
  </head>
  <body>                 -> everything visible
    <header>             -> top part (title + nav bar)
      <h1>...</h1>       -> page title (biggest heading)
      <nav>
        <a href="...">...</a>  -> one link for each nav item
      </nav>
    </header>

    <main>
      <section>          -> one block of content
        <h2>...</h2>
        <p>...</p>
      </section>
      <hr>               -> a horizontal line (separates blocks)
    </main>

    <footer>             -> bottom part of the page
      <hr>
    </footer>
  </body>
</html>
```

### Tags cheat-sheet (all taught in the labs)

| Tag | Meaning |
|-----|---------|
| `<h1>` – `<h6>` | Headings, biggest to smallest |
| `<p>` | Paragraph |
| `<strong>` | Bold text |
| `<em>` | Italic text |
| `<a href="file.html">text</a>` | Link to another page |
| `<img src="..." alt="...">` | Image |
| `<ul>` + `<li>` | Bullet list |
| `<table>` `<tr>` `<th>` `<td>` | Table — row, heading cell, data cell |
| `<form action="..." method="get">` | A form that sends to another page |
| `<fieldset>` `<legend>` | Group of fields + its caption |
| `<label for="id">` | Label tied to an input (clicking it focuses the input) |
| `<input type="text/email/password">` | A text box |
| `<select>` `<option>` | A dropdown menu |
| `<button>` | A clickable button |
| `<hr>` | Horizontal line |
| `<!-- comment -->` | A comment in the code (not shown on the page) |

---

## 4. How the forms work right now

Example from `signup.html`:

```
<form action="home.html" method="get">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <input type="submit" value="Sign Up">
</form>
```

- `action="home.html"` → when you click Sign Up, the page jumps to home.html
- `method="get"` → the typed values show up in the URL (you can see them now)
- `required` → the browser refuses to submit if the field is empty
- The `name` + the typed value are what the server will receive later (PHP)

Right now forms only move you around. Real saving comes in the PHP + Database
milestone.

---

## 5. Small rules we follow

- Every inside page has the same nav bar and a `<footer>` with `<hr>`.
- All "Sign Out" links go back to `index.html`.
- A new team has ONE member row you fill (email + role) — no fake rows.
- No dead links: every `href` points to a file that really exists.
- Roles: **Owner** manages the team, **Admin** can add members,
  **Member** joins and participates.

---

---

## 6. In-depth code guide for each page

This file is the **overall** view. For a section-by-section explanation of the
actual code in every page, open `pages/`:

`pages/README.md` — list of all page guides
`pages/index.md`, `layout.md`, `signup.md`, `signin.md`, `home.md`,
`profile.md`, `edit-profile.md`, `new-task.md`, `new-team.md`,
`dashboard.md`, `task-details.md`, `chat.md`

Next guides will come in `docs/css/`, `docs/js/`, `docs/php/` as we reach those
milestones.