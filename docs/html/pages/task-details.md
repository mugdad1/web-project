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

```html
<hr>
<section>
    <h3>Notes</h3>
    <p>Header, nav and footer done. Passed review.</p>
</section>
```

Task notes as a plain paragraph.

## How it works

A view-only page — heading + a facts list + a notes paragraph. This is the
detail target for the dashboard links. In the PHP milestone each task will
render this same page shape from its own database row.