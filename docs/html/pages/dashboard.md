# dashboard.html — Main screen: completion + task list

Shows the project completion pie, a compact task list and a table where each
task links to its details page. It uses the same sidebar/topbar shell as
`home.html`.

## Workspace shell

- `<aside class="sidebar">` holds the workspace mark, `.side-nav` (Home,
  Dashboard, Chat, Profile, Settings) and the Sign Out link.
- `<header class="topbar">` holds the page title, a task search input, the
  demo role switch and an avatar menu (My Profile / Sign Out).
- `#task-search` shows a **results box** (`#search-results`) instead of
  filtering the page: typing lists matching tasks, and clicking one opens
  `task-details.html?task=...` (Enter opens the first result, Escape closes).
  The sidebar and the task lists are never filtered by search.
- The purple palette is inspired by common project-management UIs; the markup
  and CSS are original.

## Project completion pie

```html
<div class="pie" id="project-pie">
    <span class="pie-center"><strong id="pie-percent">0%</strong><small>complete</small></span>
</div>
```

- `buildProjectPie()` in `app.js` builds a CSS `conic-gradient` donut from the
  table's progress values: complete / in progress / to do slices.
- The centre shows the average completion of all tasks (the whole project),
  and `#legend-done` / `#legend-progress` / `#legend-todo` show the counts.
- No chart library and no canvas — just CSS and a few inline styles.

## My tasks (formerly "My priorities")

- A `.task-cards` list with `.status` pills (Complete / In progress / To do)
  and `.priority` pills (High / Medium / Low).
- Clicking a card (or pressing Enter/Space) opens that task's details page via
  `wirePriorityCards()`; the cards mirror the table below.
- The heading is **Team tasks** for Admin and **My tasks** for Member. Saved
  assignments (`pm-task-assignee`) and statuses/priorities are re-applied on
  load, so reassigning a task on Home is reflected here too.

## Task list table

- Columns: Task, Assignee, Progress, Time Remaining, Status.
- Each task name links to `task-details.html?task=...`; `fillTaskFromQuery()`
  in `app.js` puts that task name into the details heading.
- The Status column uses the same pill classes as the priority list.

## How it works

Dashboard = the "status screen": summary numbers, priority cards and a table of
tasks. The link inside each task cell is the dashboard → task routing.
