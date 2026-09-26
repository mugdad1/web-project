# new-task.html — Create a task

A form to add a task: title, description, priority.

## The form

```html
<form action="home.html" method="get">
```

- On submit it goes back to home.html.
- Nothing stored — the task rides in the URL for now.

## The fields

```html
<label for="title">Title:</label><br>
<input type="text" id="title" name="title" required placeholder="e.g. Build the landing page"><br><br>

<label for="desc">Description:</label><br>
<input type="text" id="desc" name="desc" placeholder="e.g. Add header, nav and footer"><br><br>

<label for="priority">Priority:</label><br>
<select id="priority" name="priority">
    <option value="low">Low</option>
    <option value="medium" selected>Medium</option>
    <option value="high">High</option>
</select><br><br>
```

| Field | Code | Notes |
|-------|------|-------|
| Title | `required` + `placeholder` | must be filled; hint text shows an example |
| Description | `placeholder` only | optional; hint text |
| Priority | `<select>` | dropdown Low/Medium/High |

- `placeholder` = grey example text inside the box. It does NOT submit — only
  real typed text is sent.
- `selected` on Medium makes it the default choice.

## The buttons

```html
<input type="submit" value="Create Task">
<input type="reset" value="Clear">
```

## How it works

Same form pattern as signup. `placeholder` guides the user on what to write,
`selected` picks a sensible default priority, `required` blocks an empty
title. Submission navigates to home.html with the task described in the URL.