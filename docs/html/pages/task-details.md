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

## Finish the task

```html
<div class="task-actions">
    <button type="button" class="btn" id="task-finish">Finish task</button>
</div>
```

- `wireTaskFinish()` toggles between **Finish task** and **Reopen task**.
- Finishing saves status `done` and progress `100%` (`pm-task-progress`);
  reopening saves status `todo` and progress `0%`.
- The progress map is applied to the dashboard/home table on load, so the
  progress bars, stats and completion pie all update.
- Available to every role — a member can finish their own task.

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

- Notes are a `.note-list`; `renderTaskNotes()` draws every `.note-item` from
  `localStorage` (`pm-task-notes`, keyed by task title).
- Each note shows its **author name** and an **Admin / Member** tag, so admin
  notes and member notes are easy to tell apart.
- **Everyone can add a note** — the add-note form is no longer admin-only.
- **Edit** opens an inline textarea (Save / Cancel); **Delete** removes the note.
  Admins can manage every note; a member only sees those buttons on their own
  notes (`canManageNote()`).
- Switching the demo role re-renders the list so the buttons match the role.
- The starter note is seeded only for the default "Layout skeleton" task; other
  tasks start with "No notes yet."
- **Mockup only:** the PHP milestone must check the role on the server.

## How it works

Heading + facts list + editable priority + a notes list with admin-only
add/edit/delete. This is the detail target for the dashboard links. In the PHP
milestone each task will render this same page shape from its own database row.