# task-details.html — A single task's details

The page reached by clicking a task name or a priority card. It uses the same
workspace shell (sidebar + topbar) as the rest of the authed pages.

## Task info section

```html
<section class="task-summary">
    <div class="card-head"><h2 id="task-title">Layout skeleton</h2></div>
    <ul class="task-meta">
        <li>Status <strong id="task-status">Completed</strong></li>
        <li>Assigned to <strong>Mugdad</strong></li>
        <li>Priority <span class="priority high" id="task-priority-badge">High</span></li>
        <li>Due <strong>2026-09-20</strong></li>
    </ul>
</section>
```

- The task name is the `<h2>`; `fillTaskFromQuery()` fills it from `?task=`.
- The facts are a `.task-meta` list; Status is bolded with `<strong>`.

## Changing priority

```html
<div class="task-priority-editor" data-admin-only>
    <label for="task-priority">Change priority</label>
    <select id="task-priority">...</select>
</div>
```

- `wireTaskPriority()` reads `#task-priority`, saves the choice in
  `localStorage` (`pm-task-priority`, keyed by task title) and updates
  `#task-priority-badge` immediately.
- `applyStoredPriorities()` re-applies saved values to the priority cards on
  home/dashboard, so a change is visible on the next page load.
- The editor is `[data-admin-only]`; members see the badge but cannot change it.

## Notes section

- Notes are a `.note-list`; `wireNotes()` turns each `<li>` into a `.note-item`
  with the text plus **Edit** / **Delete** buttons.
- **Edit** opens an inline textarea (Save / Cancel); **Delete** removes the note.
- The action buttons and the add-note form carry `[data-admin-only]`, so
  `applyRole()` hides them for the Member demo role and shows `#role-locked`
  instead. The JS handlers also check `demoRole`.
- **Mockup only:** the PHP milestone must check the role on the server.

## How it works

Heading + facts list + editable priority + a notes list with admin-only
add/edit/delete. This is the detail target for the dashboard links. In the PHP
milestone each task will render this same page shape from its own database row.