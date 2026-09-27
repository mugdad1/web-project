# web-project

Project management site for the Web Programming subject.

**Current milestone: HTML only.** The labs so far are HTML, so the site is
deliberately unstyled and unscripted — that is the plan, not an oversight
(`docs/html/html.md` explains why). **Target stack:** HTML, CSS, JavaScript,
PHP + database.

## Pages

| File | What it is |
|---|---|
| `index.html` | Landing page — guest, no nav |
| `signup.html` | Registration form |
| `signin.html` | Login form |
| `home.html` | Task list (authed) |
| `dashboard.html` | Stats + project board (authed) |
| `profile.html` | Own profile (authed) |
| `edit-profile.html` | Edit own profile (authed) |
| `new-task.html` | Create a task (authed) |
| `new-team.html` | Create a team (authed) |
| `chat.html` | Team chat (authed) |
| `task-details.html` | Single task view (authed) |
| `layout.html` | Shared nav/footer template — **reference, not a real page** |

Guest pages (`index`, `signup`, `signin`) intentionally have a shorter nav than
the authed pages. `layout.html` is the shared structure to copy from.

## Docs

| Path | What it covers |
|---|---|
| `docs/html/html.md` | Everything about the HTML we are using |
| `docs/html/html-ar.md` | The same, in Arabic |
| `docs/html/pages/` | Per-page notes |

## Running it

No build step and no dependencies. Any static server works:

```bash
python3 -m http.server 8080
# → http://127.0.0.1:8080/
```

Opening the files directly with `file://` mostly works too, but a server is
closer to how it will be graded.

## Before the PHP milestone

The forms are all `method="get"` placeholders. That is fine for a mockup, but
the three auth forms carry a password field and **must** switch to
`method="post"` with server-side sessions before any backend is wired up — see
the warning in `docs/html/html.md` §4. Passwords need
`password_hash()` / `password_verify()`, and must never touch a URL.
