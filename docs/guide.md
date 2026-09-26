# Project Management Site — Student Guide

How this site works, file by file. Everything is **pure HTML** (no CSS, no
JavaScript yet — we follow the labs only). Forms submit with
`method="get"` and land on a page; nothing is saved yet (saving comes with
PHP + Database later).

## How the site flows

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

## The files

| File | What it does | Which lab tags it uses |
|------|--------------|------------------------|
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

## Small rules we follow

- Every page inside the site has the same nav bar and a `<footer>` with `<hr>`.
- Pages behind login all link "Sign Out" back to `index.html`.
- No fake/random data in chat or teams — a new team has ONE member row you fill.
- No dead links: every `href` points to a real file.

## Meeting-prep / project notes
See `web-project-docs` (private repo) for task splits and the meeting prep doc.