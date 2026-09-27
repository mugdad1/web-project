# dashboard.html — Progress overview + task list

Shows project stats and a table where each task links to its details page.

## Progress section

```html
<section>
    <h2>Project Progress</h2>
    <ul>
        <li>Total Tasks: <strong>10</strong></li>
        <li>Completed: <strong>6</strong></li>
        <li>In Progress: <strong>3</strong></li>
        <li>Not Started: <strong>1</strong></li>
    </ul>
</section>
```

Four bullet lines with the numbers bolded.

## Task list table

```html
<section>
    <h3>Task List</h3>
    <table border="1" cellpadding="5">
        <tr>
            <th>Task</th> <th>Assignee</th> <th>Progress</th>
            <th>Time Remaining</th> <th>Note</th>
        </tr>
        <tr>
            <td><a href="task-details.html">Layout skeleton</a></td>
            <td>Mugdad</td> <td>100%</td> <td>Done</td> <td>Finished</td>
        </tr>
        <tr>
            <td><a href="task-details.html">Landing page</a></td>
            <td>Ali</td> <td>50%</td> <td>3 days</td> <td>On track</td>
        </tr>
        ... 3 more rows (Ahmed, Hussain, Kumail) ...
    </table>
</section>
```

- `<th>` header row names the columns: Task, Assignee, Progress, Time
  Remaining, Note.
- Each task row is `<td>` cells. The **task name** cell contains a link:
  `<td><a href="task-details.html">...</a></td>` — clicking a task opens
  task-details.html.
- (All task links point to the same details page right now — one generic task
  page; a details file per task will come with PHP.)

## Chat button

```html
<section>
    <a href="chat.html"><button type="button">Chat</button></a>
</section>
```

- A `<button>` inside an `<a href="chat.html">`. The link makes the button
  navigate. (A bare `<button>` without a link/form does nothing.)
- `type="button"` stops it from acting like a submit.

## How it works

Dashboard = the "status screen": summary numbers as a list + a real table of
tasks. The link inside each task cell is the dashboard→task routing.