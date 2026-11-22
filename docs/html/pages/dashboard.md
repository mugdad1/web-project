# dashboard.html — Main screen: progress + task list

Shows project stats, a compact priority list and a table where each task links
to its details page. It uses the same sidebar/topbar shell as `home.html`.

## Workspace shell

- `<aside class="sidebar">` holds the workspace mark, `.side-nav` (Home,
  Dashboard, Chat, Profile, Settings) and the Sign Out link.
- `<header class="topbar">` holds the page title, a task search input and an
  avatar menu (My Profile / Sign Out). `#task-search` filters the priority
  cards and table rows.
- The purple palette is inspired by common project-management UIs; the markup
  and CSS are original.

## Progress section

```html
<ul class="stats">
    <li>Total Tasks <strong>4</strong></li>
    <li>Completed <strong>1</strong></li>
    <li>In Progress <strong>3</strong></li>
    <li>Not Started <strong>0</strong></li>
</ul>
```

`js/app.js` replaces the percentage cells in the table with progress bars and
recalculates these four numbers from the table rows.

## My priorities

- A `.task-cards` list with `.status` pills (Complete / In progress / To do)
  and `.priority` pills (High / Medium / Low).
- Clicking a card (or pressing Enter/Space) opens that task's details page via
  `wirePriorityCards()`; the cards mirror the table below.

## Task list table

- Columns: Task, Assignee, Progress, Time Remaining, Status.
- Each task name links to `task-details.html?task=...`; `fillTaskFromQuery()`
  in `app.js` puts that task name into the details heading.
- The Status column uses the same pill classes as the priority list.

## How it works

Dashboard = the "status screen": summary numbers, priority cards and a table of
tasks. The link inside each task cell is the dashboard → task routing.
