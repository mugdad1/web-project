# task-details.html — A single task's details

The page reached by clicking a task name on the dashboard.

## Task info section

```html
<section>
    <h2>Layout skeleton</h2>
    <ul>
        <li>Status: <strong>Completed</strong></li>
        <li>Assigned to: Mugdad</li>
        <li>Priority: High</li>
        <li>Due: 2026-09-20</li>
    </ul>
</section>
```

- The task name is the `<h2>`.
- The facts are a `<ul>` list; Status is bolded with `<strong>`.

## Notes section

- Notes are a `.note-list` list; `wireNotes()` appends new items to it.
- The add-note form is wrapped in `[data-admin-only]`, so `applyRole()` hides it
  for the Member demo role and shows `#role-locked` instead. The JS handler
  also checks `demoRole` before adding anything.
- **Mockup only:** the PHP milestone must check the role on the server.

## How it works

Heading + facts list + a notes list with an admin-only add-note form. This is
the detail target for the dashboard links. In the PHP milestone each task will
render this same page shape from its own database row.