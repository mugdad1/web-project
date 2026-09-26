# Project Management Site — Student Guide

How this site works, file by file. Everything is **pure HTML** (no CSS, no
JavaScript — we follow the labs only). Forms submit with
`method="get"` and land on a page; nothing is saved yet (saving comes with
PHP + Database later).

---

## 1. How the site flows

```
index.html  (landing / first page)
   |
   |  Sign Up / Sign In
   v
home.html   (after login, your main page)
   |
   |-- Profile  -> profile.html  (view) -> edit-profile.html (edit)
   |-- Dashboard -> dashboard.html (progress + task list)
   |-- New task -> new-task.html
   |-- New team -> new-team.html
   |-- Chat      -> chat.html (team messages)
   `-- Sign Out  -> back to index.html
```

---

## 2. The files

| File | What it does | Key tags it uses |
|------|--------------|------------------|
| `index.html` | Landing page guests see first | header, nav, section, footer, links, mailto |
| `layout.html` | Empty page pattern (header/nav/footer) — teammates copy this to start a new page | header, nav, main, footer |
| `signup.html` | Registration form: first/last name, email, password, major | form, fieldset, label, input, select |
| `signin.html` | Login form: email + password | form, fieldset, label, input |
| `home.html` | "My Home" after login: welcome, notifications, quick actions | section, h2/h3, ul/li, hr |
| `profile.html` | Your profile: name, major, email, role + link to edit | section, p, strong, table |
| `edit-profile.html` | Edit your details (fields pre-filled) | form, fieldset, input, select |
| `new-task.html` | Create a task: title, description, priority | form, fieldset, input, select |
| `new-team.html` | Create a team: team name + one member (email + role: Owner/Admin/Member) | form, fieldset, input, select |
| `dashboard.html` | Progress overview + task list (each task links to its details) | section, ul, table (th/td/tr), links, button |
| `task-details.html` | One task's full details | section, h2, ul, p |
| `chat.html` | Team chat room: members list, empty message feed, send box | section, ul, form, input |

---

## 3. How to read any HTML file

Every page has the same shape, top to bottom:

```
<!DOCTYPE html>          -> tells the browser "this is HTML5"
<html lang="en">         -> the whole page
  <head>                 -> page info (not shown)
    <meta charset="UTF-8">   -> supports Arabic/English text
    <title>...</title>        -> the tab name
  </head>
  <body>                 -> everything visible
    <header>             -> top of the page (title + nav)
      <h1>...</h1>       -> page title (biggest heading)
      <nav>
        <a href="...">...</a>  -> one link per nav item
      </nav>
    </header>

    <main>
      <section>          -> one block of content
        <h2>...</h2>
        <p>...</p>
      </section>
      <hr>               -> a horizontal line (visual separator)
    </main>

    <footer>             -> bottom of the page
      <hr>
    </footer>
  </body>
</html>
```

### Tags cheat-sheet (all taught in labs)

| Tag | Meaning |
|-----|---------|
| `<h1>`–`<h6>` | Headings, biggest to smallest |
| `<p>` | Paragraph |
| `<strong>` | Bold text |
| `<em>` | Italic text |
| `<a href="file.html">text</a>` | Link to another page |
| `<img src="..." alt="...">` | Image |
| `<ul>` + `<li>` | Bullet list |
| `<table>` `<tr>` `<th>` `<td>` | Table (row, heading cell, data cell) |
| `<form action="page" method="get">` | Form that sends to another page |
| `<fieldset>` `<legend>` | Group of form fields + its caption |
| `<label for="id">` | Clickable label tied to an input |
| `<input type="text/email/password">` | A text box |
| `<select>` `<option>` | A dropdown menu |
| `<button>` | A clickable button |
| `<hr>` | Horizontal line |
| `<!-- comment -->` | A comment (not shown on page) |

---

## 4. How the forms work right now

Example — `signup.html`:

```
<form action="home.html" method="get">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <input type="submit" value="Sign Up">
</form>
```

- `action="home.html"` → when you click Sign Up, it jumps to home.html
- `method="get"` → the typed values appear in the URL (visible now, stored later)
- `required` → browser blocks the submit if the field is empty
- The `name=` + the value typed are what a PHP/Python server would receive later

This is the **HTML-only stage**: forms "work" by moving you around. Real saving
happens in the PHP + Database milestone.

---

## 5. Small rules we follow

- Every inside page has a nav bar and a `<footer>` with `<hr>`.
- All "Sign Out" links go back to `index.html`.
- A new team has ONE member row you fill (email + role) — no fake rows.
- No dead links: every `href` points to a real file.
- Role meanings: **Owner** manages the team, **Admin** can add members,
  **Member** joins and participates.

## 6. Technical Q&A (be ready, the doctor will ask)

**Q: Why is the first line `<!DOCTYPE html>`?**
It tells the browser this is the HTML5 document type. Without it the browser
falls back to "quirks mode" and may render the page inconsistently.

**Q: Why `lang="en"` on `<html>`?**
It declares the page language so browsers use the right proofing/spellcheck and
screen readers pronounce correctly. (We write English content.)

**Q: Why `<meta charset="UTF-8">`?**
It sets the character encoding. UTF-8 supports our Latin text fully and would
also handle Arabic if we ever mix it. Wrong/default encodings can show broken
characters (mojibake).

**Q: What is semantic HTML and why do we use `<header>`, `<nav>`, `<main>`,
`<section>`, `<footer>` instead of just `<div>`?**
Semantic tags describe the *meaning* of content, not just its shape. Benefits:
accessibility (screen readers navigate them), SEO, and clearer code. The doctor
taught these tags, so they also match the course scope.

**Q: Why did we use `<section>` for each block on the page?**
A `<section>` groups related content with its own heading. It makes the page
structured into clear units (e.g. "Notifications", "Quick Actions") — this
layout will become CSS styling targets later.

**Q: How does a `<form>` actually work in our project?**
Three parts: `action` (target page), `method` (how data is sent), `name`
attributes (identify each field).

**Q: What is the difference between `method="get"` and `method="post"`?**
`get`: values travel in the URL query string (`?email=...`), shown in history,
meant for search/filters — we use it now because nothing is stored yet.
`post`: values travel in the request body, hidden from the URL, used when
saving/creating something (we will switch to POST in the PHP milestone).

**Q: What is `required`? Isn't validation JavaScript?**
`required` is a native HTML5 attribute — the browser itself blocks submit when
the field is empty. That is *client-side validation without JavaScript*. Later
we add PHP validation on the server too, because the client can always be
bypassed (view source / dev tools).

**Q: Why `type="email"` and `type="password"` instead of `type="text"`?**
- `email` → browser checks the value "looks like an email" and, on phones,
  opens the email keyboard.
- `password` → dots the characters and stops them being visible / screenshotted
  as plaintext.
HTML5 input types give us these behaviors with zero JavaScript.

**Q: What is the difference between `<a>` and a submit button?**
`<a href="page.html">` simply navigates. A `<form>` collects the field values,
then navigates using `action`. Buttons without a form or link do nothing — that
is why our "Chat" button wraps a link: `<a href="chat.html"><button>Chat</button></a>`.

**Q: Why is a `<select>` better than a text input for majors/roles?**
A dropdown limits choices to valid values, so users can't misspell. It's
"constrained input" — good for known options (CS/CN/CIS/CE, Owner/Admin/Member).

**Q: What is `<fieldset>` + `<legend>`?**
They group related form fields visually and semantically; `<legend>` is the
group's caption. Good for separating "Team Details" from "Add Member".

**Q: How does `id` and `for` connect a label to an input?**
`<label for="email">` points at `<input id="email">`. Clicking the label
focuses the input — better for touch and accessibility, and it ties a caption
to exactly its field via `name`.

**Q: Why do forms still "lose" data when we navigate?**
Because at the HTML-only milestone nothing stores data. The submitted values
only ride in the URL (`?email=...`). Storing requires a backend (PHP+DB) using
`POST` + a server — that is a later milestone and exactly what the doctor
expects to see next.

## 7. Project notes
Task splits and meeting prep live in the private `web-project-docs` repo.