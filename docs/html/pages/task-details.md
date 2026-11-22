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

## Changing status and priority

```html
<div class="task-editors" data-admin-only>
    <div class="task-editor">
        <label for="task-status-select">Change status</label>
        <select id="task-status-select">...</select>
    </div>
    <div class="task-editor">
        <label for="task-priority">Change priority</label>
        <select id="task-priority">...</select>
    </div>
</div>
```

- `wireTaskStatus()` saves the choice in `localStorage` (`pm-task-status`,
  keyed by task title) and updates `#task-status-badge` immediately.
- `wireTaskPriority()` does the same for priority (`pm-task-priority`,
  `#task-priority-badge`).
- `applyStoredStatuses()` / `applyStoredPriorities()` re-apply saved values to
  the cards and table rows on home/dashboard, and toggle `is-complete` for
  completed cards.
- Cards and table links pass the current `status`/`priority` in the URL, so
  the details page opens on the right values even before anything is stored.
- The editors are `[data-admin-only]`; members see the badges but cannot change
  them. The Admin/Member switch is in this page's topbar as well as on home.

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