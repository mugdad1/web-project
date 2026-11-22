/* Project Management Site — shared script
   M3 (JavaScript) milestone. Vanilla JS only: no library, no build step. */

(function () {
    "use strict";

    function $(selector, root) {
        return (root || document).querySelector(selector);
    }

    function $$(selector, root) {
        return Array.prototype.slice.call((root || document).querySelectorAll(selector));
    }

    /* ---------- navigation: mark the current page ---------- */

    function markCurrentPage() {
        var here = location.pathname.split("/").pop() || "index.html";
        $$("nav a").forEach(function (link) {
            var target = link.getAttribute("href") || "";
            if (target === here) {
                link.setAttribute("aria-current", "page");
            }
        });
    }

    /* ---------- forms: validation before anything is sent ---------- */

    function showError(field, message) {
        field.classList.add("is-invalid");
        var note = field._errorNote;
        if (!note) {
            note = document.createElement("span");
            note.className = "field-error";
            field.insertAdjacentElement("afterend", note);
            field._errorNote = note;
        }
        note.textContent = message;
    }

    function clearError(field) {
        field.classList.remove("is-invalid");
        if (field._errorNote) {
            field._errorNote.textContent = "";
        }
    }

    function validateField(field) {
        clearError(field);

        // Hidden by the demo role switch: not part of the active form.
        if (field.closest("[hidden]")) {
            return true;
        }

        var value = field.value.trim();

        if (field.hasAttribute("required") && value === "") {
            showError(field, "This field is required.");
            return false;
        }

        if (field.type === "email" && value !== "" && value.indexOf("@") < 1) {
            showError(field, "Enter a valid email address.");
            return false;
        }

        if (field.type === "password" && value !== "" && value.length < 8) {
            showError(field, "Use at least 8 characters.");
            return false;
        }

        return true;
    }

    function wireForms() {
        $$("form").forEach(function (form) {
            if (form.hasAttribute("novalidate")) {
                return;
            }
            var fields = $$("input, select, textarea", form).filter(function (field) {
                return field.type !== "submit" && field.type !== "reset" && field.type !== "button";
            });

            fields.forEach(function (field) {
                field.addEventListener("blur", function () {
                    validateField(field);
                });
                field.addEventListener("input", function () {
                    if (field.classList.contains("is-invalid")) {
                        validateField(field);
                    }
                });
            });

            form.addEventListener("submit", function (event) {
                var valid = true;
                fields.forEach(function (field) {
                    if (!validateField(field)) {
                        valid = false;
                    }
                });
                if (!valid) {
                    event.preventDefault();
                    var first = $(".is-invalid", form);
                    if (first) {
                        first.focus();
                    }
                }
            });
        });
    }

    /* ---------- dashboard: progress bars and live totals ---------- */

    function buildProgressBars() {
        $$("table tbody tr").forEach(function (row) {
            var cells = row.children;
            var progressCell = null;

            for (var i = 0; i < cells.length; i++) {
                if ($(".progress", cells[i])) {
                    continue; // already converted to a progress bar
                }
                if (/^\s*\d+\s*%\s*$/.test(cells[i].textContent)) {
                    progressCell = cells[i];
                    break;
                }
            }

            if (!progressCell) {
                return;
            }

            var value = parseInt(progressCell.textContent, 10);
            progressCell.textContent = "";
            progressCell.classList.add("progress-cell");

            var wrap = document.createElement("div");
            wrap.className = "progress";

            var track = document.createElement("div");
            track.className = "progress-track";

            var fill = document.createElement("div");
            fill.className = "progress-fill" + (value >= 100 ? " is-done" : "");
            fill.style.width = Math.min(value, 100) + "%";

            var label = document.createElement("span");
            label.className = "progress-value";
            label.textContent = value + "%";

            track.appendChild(fill);
            wrap.appendChild(track);
            wrap.appendChild(label);
            progressCell.appendChild(wrap);
        });
    }

    function updateDashboardStats() {
        var stats = $(".stats");
        if (!stats) {
            return;
        }

        var rows = $$("table tbody tr").filter(function (row) {
            return !row.hidden && $(".progress-value", row) !== null;
        });
        var done = 0;
        var started = 0;

        rows.forEach(function (row) {
            var value = 0;
            var bar = $(".progress-value", row);
            if (bar) {
                value = parseInt(bar.textContent, 10) || 0;
            }
            if (value >= 100) {
                done++;
            } else if (value > 0) {
                started++;
            }
        });

        var values = [rows.length, done, started, rows.length - done - started];
        $$(".stats strong").forEach(function (el, index) {
            if (values[index] !== undefined) {
                el.textContent = values[index];
            }
        });
    }

    /* ---------- dashboard: overall project completion pie ---------- */

    function buildProjectPie() {
        var pie = $("#project-pie");
        if (!pie) {
            return;
        }

        var rows = $$("table tbody tr").filter(function (row) {
            return $(".progress-value", row) !== null;
        });

        var done = 0;
        var progress = 0;
        var todo = 0;
        var sum = 0;

        rows.forEach(function (row) {
            var value = parseInt($(".progress-value", row).textContent, 10) || 0;
            sum += value;
            if (value >= 100) {
                done++;
            } else if (value > 0) {
                progress++;
            } else {
                todo++;
            }
        });

        var total = rows.length;
        var percent = total === 0 ? 0 : Math.round(sum / total);
        var doneDeg = total === 0 ? 0 : (done / total) * 360;
        var progressDeg = total === 0 ? 0 : doneDeg + (progress / total) * 360;

        pie.style.background = "conic-gradient(" +
            "var(--ok) 0deg " + doneDeg + "deg, " +
            "var(--warn) " + doneDeg + "deg " + progressDeg + "deg, " +
            "var(--border) " + progressDeg + "deg 360deg)";
        pie.setAttribute("aria-label", "Project completion: " + percent + "%");

        var percentEl = $("#pie-percent");
        if (percentEl) {
            percentEl.textContent = percent + "%";
        }

        var doneEl = $("#legend-done");
        var progressEl = $("#legend-progress");
        var todoEl = $("#legend-todo");
        if (doneEl) {
            doneEl.textContent = done;
        }
        if (progressEl) {
            progressEl.textContent = progress;
        }
        if (todoEl) {
            todoEl.textContent = todo;
        }
    }

    /* ---------- home: mark notifications as read ---------- */

    function wireNotifications() {
        $$(".notifications li").forEach(function (item) {
            item.setAttribute("tabindex", "0");
            item.setAttribute("role", "button");
            item.title = "Click to mark as read or unread";

            function toggle() {
                item.classList.toggle("is-read");
            }

            item.addEventListener("click", toggle);
            item.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggle();
                }
            });
        });
    }

    /* ---------- chat: messages per channel ---------- */

    var chatState = { channel: "general", messages: {} };

    function renderFeed() {
        var feed = $("#feed");
        if (!feed) {
            return;
        }

        feed.textContent = "";
        var list = chatState.messages[chatState.channel] || [];

        if (list.length === 0) {
            var empty = document.createElement("p");
            empty.className = "empty";
            empty.textContent = "No messages yet.";
            feed.appendChild(empty);
            return;
        }

        list.forEach(function (text) {
            var message = document.createElement("div");
            message.className = "message is-mine";

            var meta = document.createElement("span");
            meta.className = "meta";
            meta.textContent = "You · just now";

            message.appendChild(meta);
            message.appendChild(document.createTextNode(text));
            feed.appendChild(message);
        });

        feed.scrollTop = feed.scrollHeight;
    }

    function wireChat() {
        var form = $("#chat-form");
        if (!form) {
            return;
        }

        var input = $("#msg", form);

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var text = input.value.trim();
            if (text === "") {
                return;
            }

            var list = chatState.messages[chatState.channel] || [];
            list.push(text);
            chatState.messages[chatState.channel] = list;
            renderFeed();

            input.value = "";
            input.focus();
        });
    }

    function wireChannels() {
        var buttons = $$(".channel-btn");
        if (buttons.length === 0) {
            return;
        }

        var heading = $("#chat-room-heading");

        buttons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                chatState.channel = btn.getAttribute("data-channel") || "general";

                buttons.forEach(function (other) {
                    var active = other === btn;
                    other.classList.toggle("is-active", active);
                    other.setAttribute("aria-pressed", active ? "true" : "false");
                });

                if (heading) {
                    heading.textContent = chatState.channel;
                }
                renderFeed();
            });
        });
    }

    /* ---------- edit profile: live preview ---------- */

    function wireProfilePreview() {
        var form = $("#profile-form");
        if (!form) {
            return;
        }

        var preview = document.createElement("p");
        preview.className = "empty";
        preview.id = "profile-preview";
        form.appendChild(preview);

        function render() {
            var name = $("#fullname", form);
            var major = $("#major", form);
            var email = $("#email", form);
            preview.textContent = "Preview: " +
                (name && name.value ? name.value : "Your name") + " · " +
                (major && major.value ? major.value : "Major") + " · " +
                (email && email.value ? email.value : "email@example.com");
        }

        $$("input, select", form).forEach(function (field) {
            field.addEventListener("input", render);
            field.addEventListener("change", render);
        });

        render();
    }

    /* ---------- task details: show the task that was clicked ---------- */

    function fillTaskFromQuery() {
        var heading = $("#task-title");
        if (!heading) {
            return;
        }
        var params = new URLSearchParams(location.search);
        var task = params.get("task");
        if (task) {
            heading.textContent = task;
        }
    }

    /* ---------- task details: change priority ---------- */

    var PRIORITY_KEY = "pm-task-priority";

    function readTaskPriorities() {
        try {
            return JSON.parse(localStorage.getItem(PRIORITY_KEY)) || {};
        } catch (error) {
            return {};
        }
    }

    function saveTaskPriority(task, value) {
        var map = readTaskPriorities();
        map[task] = value;
        try {
            localStorage.setItem(PRIORITY_KEY, JSON.stringify(map));
        } catch (error) {
            // Storage can be blocked; the change still applies on this page.
        }
    }

    function setPriorityBadge(badge, value) {
        if (!badge) {
            return;
        }
        badge.className = "priority " + value;
        badge.textContent = label(value);
    }

    function applyStoredPriorities() {
        var map = readTaskPriorities();

        $$(".task-card[data-task]").forEach(function (card) {
            var value = map[card.getAttribute("data-task")];
            if (value) {
                setPriorityBadge($(".priority", card), value);
            }
        });
    }

    function wireTaskPriority() {
        var select = $("#task-priority");
        var heading = $("#task-title");
        if (!select || !heading) {
            return;
        }

        var params = new URLSearchParams(location.search);
        var task = params.get("task") || heading.textContent.trim();
        var badge = $("#task-priority-badge");
        var value = readTaskPriorities()[task] || params.get("priority");

        if (value) {
            select.value = value;
            setPriorityBadge(badge, value);
        } else if (badge) {
            select.value = badge.textContent.trim().toLowerCase();
        }

        select.addEventListener("change", function () {
            saveTaskPriority(task, select.value);
            setPriorityBadge(badge, select.value);
            showNote("priority-saved", "Priority updated to " + label(select.value) + ".");
        });
    }

    /* ---------- task details: change status ---------- */

    var STATUS_KEY = "pm-task-status";
    var STATUS_LABELS = { todo: "To do", progress: "In progress", done: "Complete" };

    function readTaskStatuses() {
        try {
            return JSON.parse(localStorage.getItem(STATUS_KEY)) || {};
        } catch (error) {
            return {};
        }
    }

    function saveTaskStatus(task, value) {
        var map = readTaskStatuses();
        map[task] = value;
        try {
            localStorage.setItem(STATUS_KEY, JSON.stringify(map));
        } catch (error) {
            // Storage can be blocked; the change still applies on this page.
        }
    }

    function setStatusBadge(badge, value) {
        if (!badge) {
            return;
        }
        badge.className = "status " + value;
        badge.textContent = STATUS_LABELS[value] || value;
    }

    function statusValueFromBadge(badge) {
        if (!badge) {
            return "";
        }
        var match = badge.className.match(/\b(todo|progress|done)\b/);
        return match ? match[1] : "";
    }

    function priorityValueFromBadge(badge) {
        if (!badge) {
            return "";
        }
        var match = badge.className.match(/\b(low|medium|high)\b/);
        return match ? match[1] : "";
    }

    function taskUrl(task, status, priority) {
        var url = "task-details.html?task=" + encodeURIComponent(task);
        if (status) {
            url += "&status=" + status;
        }
        if (priority) {
            url += "&priority=" + priority;
        }
        return url;
    }

    /* Table links carry the row's current status into the details page. */
    function wireTaskLinks() {
        $$('a[href^="task-details.html?task="]').forEach(function (link) {
            var row = link.closest("tr");
            if (!row || link.getAttribute("href").indexOf("status=") !== -1) {
                return;
            }
            var status = statusValueFromBadge($(".status", row));
            if (status) {
                link.setAttribute("href", link.getAttribute("href") + "&status=" + status);
            }
        });
    }

    function applyStoredStatuses() {
        var map = readTaskStatuses();

        $$(".task-card[data-task]").forEach(function (card) {
            var value = map[card.getAttribute("data-task")];
            if (!value) {
                return;
            }
            setStatusBadge($(".status", card), value);
            card.classList.toggle("is-complete", value === "done");
        });

        $$("table tbody tr").forEach(function (row) {
            var link = $("a", row);
            if (!link) {
                return;
            }
            var value = map[link.textContent.trim()];
            if (value) {
                setStatusBadge($(".status", row), value);
            }
        });
    }

    /* ---------- task progress: keep the table/pie in sync when finishing ---------- */

    var PROGRESS_KEY = "pm-task-progress";

    function readTaskProgress() {
        try {
            return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
        } catch (error) {
            return {};
        }
    }

    function saveTaskProgress(task, value) {
        var map = readTaskProgress();
        map[task] = value;
        try {
            localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
        } catch (error) {
            // Storage can be blocked; the change still applies on this page.
        }
    }

    function applyStoredProgress() {
        var map = readTaskProgress();

        $$("table tbody tr").forEach(function (row) {
            var link = $("a", row);
            if (!link) {
                return;
            }

            var value = map[link.textContent.trim()];
            if (value === undefined) {
                return;
            }

            var valueEl = $(".progress-value", row);
            var fill = $(".progress-fill", row);

            if (valueEl) {
                valueEl.textContent = value + "%";
            }
            if (fill) {
                fill.style.width = Math.min(value, 100) + "%";
                fill.classList.toggle("is-done", value >= 100);
            }
        });
    }

    function syncFinishButton() {
        var button = $("#task-finish");
        if (!button) {
            return;
        }

        var done = statusValueFromBadge($("#task-status-badge")) === "done";
        button.textContent = done ? "Reopen task" : "Finish task";
        button.classList.toggle("btn-secondary", done);
    }

    function wireTaskFinish() {
        var button = $("#task-finish");
        if (!button) {
            return;
        }

        syncFinishButton();

        button.addEventListener("click", function () {
            var task = currentTaskTitle();
            var badge = $("#task-status-badge");
            var select = $("#task-status-select");
            var done = statusValueFromBadge(badge) === "done";
            var next = done ? "todo" : "done";

            saveTaskStatus(task, next);
            setStatusBadge(badge, next);
            if (select) {
                select.value = next;
            }
            saveTaskProgress(task, done ? 0 : 100);

            syncFinishButton();
            showNote("finish-note", done
                ? "Task reopened."
                : "Task marked complete.");
        });
    }

    function wireTaskStatus() {
        var select = $("#task-status-select");
        var heading = $("#task-title");
        if (!select || !heading) {
            return;
        }

        var params = new URLSearchParams(location.search);
        var task = params.get("task") || heading.textContent.trim();
        var badge = $("#task-status-badge");
        var value = readTaskStatuses()[task] || params.get("status");

        if (value) {
            select.value = value;
            setStatusBadge(badge, value);
        } else {
            var current = statusValueFromBadge(badge);
            if (current) {
                select.value = current;
            }
        }

        select.addEventListener("change", function () {
            saveTaskStatus(task, select.value);
            setStatusBadge(badge, select.value);
            syncFinishButton();
            showNote("status-saved", "Status updated to " + STATUS_LABELS[select.value] + ".");
        });
    }

    /* ---------- task details: notes (add / edit / delete, by author) ---------- */

    var NOTES_KEY = "pm-task-notes";

    function makeButton(text, className) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = className;
        button.textContent = text;
        return button;
    }

    function readNotesMap() {
        try {
            return JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
        } catch (error) {
            return {};
        }
    }

    function writeNotesMap(map) {
        try {
            localStorage.setItem(NOTES_KEY, JSON.stringify(map));
        } catch (error) {
            // Storage can be blocked; the notes still work on this page.
        }
    }

    function currentTaskTitle() {
        var heading = $("#task-title");
        var params = new URLSearchParams(location.search);
        return params.get("task") || (heading ? heading.textContent.trim() : "");
    }

    function readTaskNotes() {
        return readNotesMap()[currentTaskTitle()] || [];
    }

    function saveTaskNotes(notes) {
        var map = readNotesMap();
        map[currentTaskTitle()] = notes;
        writeNotesMap(map);
    }

    function noteRoleLabel(role) {
        return role === "admin" ? "Admin" : "Member";
    }

    function canManageNote(note) {
        return demoRole === "admin" || note.author === currentUserName();
    }

    function startNoteEdit(item, textEl, onSave) {
        if ($(".note-edit-form", item)) {
            return;
        }

        var editor = document.createElement("form");
        editor.className = "note-edit-form";

        var area = document.createElement("textarea");
        area.rows = 2;
        area.required = true;
        area.value = textEl.textContent;

        var actions = document.createElement("div");
        actions.className = "note-edit-actions";

        var save = document.createElement("button");
        save.type = "submit";
        save.textContent = "Save";

        var cancel = makeButton("Cancel", "btn-secondary");

        actions.appendChild(save);
        actions.appendChild(cancel);
        editor.appendChild(area);
        editor.appendChild(actions);

        textEl.hidden = true;
        item.appendChild(editor);
        area.focus();

        cancel.addEventListener("click", function () {
            editor.remove();
            textEl.hidden = false;
        });

        editor.addEventListener("submit", function (event) {
            event.preventDefault();
            var value = area.value.trim();
            if (value === "") {
                area.focus();
                return;
            }
            onSave(value);
            editor.remove();
        });
    }

    function renderTaskNotes() {
        var list = $(".note-list");
        if (!list) {
            return;
        }

        var notes = readTaskNotes();
        list.textContent = "";

        if (notes.length === 0) {
            var empty = document.createElement("li");
            empty.className = "empty note-empty";
            empty.textContent = "No notes yet.";
            list.appendChild(empty);
            return;
        }

        notes.forEach(function (note, index) {
            var item = document.createElement("li");
            item.className = "note-item";

            var head = document.createElement("div");
            head.className = "note-head";

            var author = document.createElement("p");
            author.className = "note-author";

            var name = document.createElement("strong");
            name.textContent = note.author;

            var tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = noteRoleLabel(note.role);

            author.appendChild(name);
            author.appendChild(tag);

            var actions = document.createElement("div");
            actions.className = "note-actions";

            var textEl = document.createElement("p");
            textEl.className = "note-text";
            textEl.textContent = note.text;

            if (canManageNote(note)) {
                var edit = makeButton("Edit", "btn-small note-edit");
                edit.addEventListener("click", function () {
                    startNoteEdit(item, textEl, function (value) {
                        var current = readTaskNotes();
                        if (current[index]) {
                            current[index].text = value;
                            saveTaskNotes(current);
                        }
                        renderTaskNotes();
                    });
                });

                var remove = makeButton("Delete", "btn-small btn-danger note-delete");
                remove.addEventListener("click", function () {
                    var current = readTaskNotes();
                    current.splice(index, 1);
                    saveTaskNotes(current);
                    renderTaskNotes();
                });

                actions.appendChild(edit);
                actions.appendChild(remove);
            } else {
                actions.hidden = true;
            }

            head.appendChild(author);
            head.appendChild(actions);

            item.appendChild(head);
            item.appendChild(textEl);
            list.appendChild(item);
        });
    }

    function initTaskNotes() {
        var list = $(".note-list");
        if (!list) {
            return;
        }

        var task = currentTaskTitle();
        var map = readNotesMap();

        if (!map[task]) {
            var seed = [];
            var first = $(".note-list > li");

            if (first && !first.classList.contains("note-item") && task === "Layout skeleton") {
                seed.push({
                    text: first.textContent.trim(),
                    author: "Mugdad",
                    role: "admin"
                });
            }

            map[task] = seed;
            writeNotesMap(map);
        }

        renderTaskNotes();
    }

    function wireNotes() {
        var form = $("#note-form");
        var list = $(".note-list");
        if (!form || !list) {
            return;
        }

        initTaskNotes();

        var input = $("#note-text", form);

        form.addEventListener("submit", function (event) {
            if (event.defaultPrevented) {
                return;
            }
            event.preventDefault();

            var text = input.value.trim();
            if (text === "") {
                return;
            }

            var notes = readTaskNotes();
            notes.push({
                text: text,
                author: currentUserName(),
                role: demoRole
            });
            saveTaskNotes(notes);
            renderTaskNotes();
            input.value = "";
            input.focus();
        });
    }

    /* ---------- role demo: hide admin-only controls ---------- */

    var ROLE_KEY = "pm-demo-role";

    function readRole() {
        try {
            return sessionStorage.getItem(ROLE_KEY) === "member" ? "member" : "admin";
        } catch (error) {
            return "admin"; // storage can be blocked (e.g. strict file:// settings)
        }
    }

    var demoRole = readRole();

    function applyRole() {
        var isAdmin = demoRole === "admin";

        document.body.setAttribute("data-role", demoRole);

        $$("[data-admin-only]").forEach(function (el) {
            el.hidden = !isAdmin;
        });

        $$(".role-btn").forEach(function (btn) {
            var active = btn.getAttribute("data-role") === demoRole;
            btn.classList.toggle("is-active", active);
            btn.setAttribute("aria-pressed", active ? "true" : "false");
        });

        var badge = $("#role-badge");
        if (badge) {
            badge.textContent = isAdmin ? "Admin" : "Member";
        }

        var locked = $("#role-locked");
        if (locked) {
            locked.hidden = isAdmin;
        }

        var homeTasks = $("#home-tasks-heading");
        if (homeTasks) {
            homeTasks.textContent = isAdmin ? "Team tasks" : "My tasks";
        }

        var dashTasks = $("#dash-tasks-heading");
        if (dashTasks) {
            dashTasks.textContent = isAdmin ? "Team tasks" : "My tasks";
        }

        if ($(".note-list")) {
            renderTaskNotes();
        }

        applyTaskFilters();
    }

    function wireRoleSwitch() {
        $$(".role-btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                demoRole = btn.getAttribute("data-role") || "member";
                try {
                    sessionStorage.setItem(ROLE_KEY, demoRole);
                } catch (error) {
                    // Ignore: the switch still works for this page load.
                }
                applyRole();
            });
        });
        applyRole();
    }

    /* ---------- home: add a task and add a member ---------- */

    function showNote(id, text) {
        var note = $("#" + id);
        if (note) {
            note.textContent = text;
            note.hidden = false;
        }
    }

    function label(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    /* ---------- members: name, email, role, add / edit / delete ---------- */

    function memberRoleLabel(role) {
        return label(role);
    }

    function fillMemberItem(item, name, email, role) {
        item.textContent = "";
        item.classList.remove("is-editing");

        var info = document.createElement("div");
        info.className = "member-info";

        var nameEl = document.createElement("strong");
        nameEl.className = "member-name";
        nameEl.textContent = name;

        var emailEl = document.createElement("small");
        emailEl.className = "member-email";
        emailEl.textContent = email;

        info.appendChild(nameEl);
        info.appendChild(emailEl);

        var tag = document.createElement("span");
        tag.className = "tag";
        tag.setAttribute("data-role", role);
        tag.textContent = memberRoleLabel(role);

        var actions = document.createElement("div");
        actions.className = "member-actions";
        actions.setAttribute("data-admin-only", "");

        var assign = makeButton("Assign tasks", "btn-small member-assign");
        assign.addEventListener("click", function () {
            openAssignDialog(name);
        });
        actions.appendChild(assign);

        var edit = makeButton("Edit", "btn-small member-edit");
        edit.addEventListener("click", function () {
            startMemberEdit(item);
        });
        actions.appendChild(edit);

        var remove = makeButton("Delete", "btn-small btn-danger member-delete");
        remove.addEventListener("click", function () {
            if (window.confirm("Remove " + name + " from the workspace?")) {
                item.remove();
            }
        });
        actions.appendChild(remove);

        item.appendChild(info);
        item.appendChild(tag);
        item.appendChild(actions);
        applyRole();
    }

    function startMemberEdit(item) {
        if (item.classList.contains("is-editing")) {
            return;
        }

        var name = $(".member-name", item).textContent;
        var email = $(".member-email", item).textContent;
        var role = $(".tag", item).getAttribute("data-role") || "member";
        if (role !== "admin") {
            role = "member";
        }

        item.textContent = "";
        item.classList.add("is-editing");

        var form = document.createElement("form");
        form.className = "member-edit-form";

        function field(labelText, type, value, fieldName) {
            var labelEl = document.createElement("label");
            labelEl.textContent = labelText;

            var input = document.createElement("input");
            input.type = type;
            input.value = value;
            input.name = fieldName;
            input.required = true;

            labelEl.appendChild(input);
            form.appendChild(labelEl);
            return input;
        }

        var nameInput = field("Name", "text", name, "member-name");
        var emailInput = field("Email", "email", email, "member-email");

        var roleLabel = document.createElement("label");
        roleLabel.textContent = "Role";

        var select = document.createElement("select");
        select.name = "member-role";

        ["member", "admin"].forEach(function (value) {
            var option = document.createElement("option");
            option.value = value;
            option.textContent = memberRoleLabel(value);
            option.selected = value === role;
            select.appendChild(option);
        });

        roleLabel.appendChild(select);
        form.appendChild(roleLabel);

        var actions = document.createElement("div");
        actions.className = "member-edit-actions";

        var save = document.createElement("button");
        save.type = "submit";
        save.textContent = "Save";

        var cancel = makeButton("Cancel", "btn-secondary");
        cancel.addEventListener("click", function () {
            fillMemberItem(item, name, email, role);
        });

        actions.appendChild(save);
        actions.appendChild(cancel);
        form.appendChild(actions);
        item.appendChild(form);

        nameInput.focus();

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var newName = nameInput.value.trim();
            var newEmail = emailInput.value.trim();
            if (newName === "" || newEmail === "") {
                return;
            }

            fillMemberItem(item, newName, newEmail, select.value);
            showNote("member-added", "Saved " + newName + ".");
        });
    }

    function wireMemberList() {
        $$(".member-list > li").forEach(function (item) {
            var name = $(".member-name", item);
            var email = $(".member-email", item);
            var tag = $(".tag", item);

            if (name && email && tag) {
                fillMemberItem(
                    item,
                    name.textContent.trim(),
                    email.textContent.trim(),
                    tag.getAttribute("data-role") || "member"
                );
            }
        });
    }

    /* ---------- tasks: assign them to members (admin) ---------- */

    var ASSIGN_KEY = "pm-task-assignee";
    var USER_KEY = "pm-demo-user";

    function readAssignments() {
        try {
            return JSON.parse(localStorage.getItem(ASSIGN_KEY)) || {};
        } catch (error) {
            return {};
        }
    }

    function writeAssignments(map) {
        try {
            localStorage.setItem(ASSIGN_KEY, JSON.stringify(map));
        } catch (error) {
            // Ignore: the change still applies on this page.
        }
    }

    function memberNames() {
        return $$(".member-name").map(function (el) {
            return el.textContent.trim();
        });
    }

    function taskTitles() {
        var seen = {};
        var titles = [];

        function add(title) {
            if (title && !seen[title]) {
                seen[title] = true;
                titles.push(title);
            }
        }

        $$(".task-card[data-task]").forEach(function (card) {
            add(card.getAttribute("data-task"));
        });

        $$("table tbody tr").forEach(function (row) {
            var link = $("a", row);
            if (link) {
                add(link.textContent.trim());
            }
        });

        return titles;
    }

    function assigneeOf(task) {
        var cards = $$(".task-card[data-task]");
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].getAttribute("data-task") === task) {
                return cards[i].getAttribute("data-assignee") || "";
            }
        }

        var rows = $$("table tbody tr");
        for (var j = 0; j < rows.length; j++) {
            var link = $("a", rows[j]);
            if (link && link.textContent.trim() === task) {
                return rows[j].getAttribute("data-assignee") || "";
            }
        }

        return "";
    }

    function setTaskAssignee(task, name) {
        $$(".task-card[data-task]").forEach(function (card) {
            if (card.getAttribute("data-task") !== task) {
                return;
            }

            card.setAttribute("data-assignee", name);

            var small = $("small", card);
            if (small) {
                var text = small.textContent;
                var sep = text.indexOf(" \u00b7 ");
                var prefix = sep === -1 ? text : text.slice(0, sep);
                if (memberNames().indexOf(prefix) !== -1 || prefix === "Unassigned") {
                    small.textContent = (name || "Unassigned") + text.slice(sep);
                }
            }
        });

        $$("table tbody tr").forEach(function (row) {
            var link = $("a", row);
            if (!link || link.textContent.trim() !== task) {
                return;
            }

            row.setAttribute("data-assignee", name);
            var cell = row.children[1];
            if (cell) {
                cell.textContent = name || "Unassigned";
            }
        });
    }

    function applyStoredAssignments() {
        var map = readAssignments();
        Object.keys(map).forEach(function (task) {
            setTaskAssignee(task, map[task]);
        });
    }

    function readDemoUser() {
        try {
            return sessionStorage.getItem(USER_KEY) || "Mugdad";
        } catch (error) {
            return "Mugdad";
        }
    }

    function applyDemoUser(name) {
        document.body.setAttribute("data-user", name);

        var welcome = $("#welcome-heading");
        if (welcome) {
            welcome.textContent = "Welcome back, " + name;
        }
    }

    function setDemoUser(name) {
        applyDemoUser(name);
        try {
            sessionStorage.setItem(USER_KEY, name);
        } catch (error) {
            // Ignore: the switch still works for this page load.
        }
    }

    var assignTarget = "";

    function closeAssignDialog() {
        var dialog = $("#assign-dialog");
        if (!dialog) {
            return;
        }
        if (typeof dialog.close === "function" && dialog.open) {
            dialog.close();
        } else {
            dialog.removeAttribute("open");
        }
    }

    function openAssignDialog(memberName) {
        var dialog = $("#assign-dialog");
        var list = $("#assign-task-list");
        if (!dialog || !list || demoRole !== "admin") {
            return;
        }

        assignTarget = memberName;
        var heading = $("#assign-member-name");
        if (heading) {
            heading.textContent = memberName;
        }

        list.textContent = "";

        taskTitles().forEach(function (task) {
            var item = document.createElement("li");
            var label = document.createElement("label");
            var box = document.createElement("input");
            box.type = "checkbox";
            box.value = task;
            box.checked = assigneeOf(task) === memberName;

            var text = document.createElement("span");
            text.textContent = task;

            label.appendChild(box);
            label.appendChild(text);
            item.appendChild(label);
            list.appendChild(item);
        });

        if (typeof dialog.showModal === "function") {
            dialog.showModal();
        } else {
            dialog.setAttribute("open", "");
        }
    }

    function saveAssignments(viewAs) {
        var list = $("#assign-task-list");
        if (!list || assignTarget === "") {
            return;
        }

        var map = readAssignments();

        $$("input[type=checkbox]", list).forEach(function (box) {
            var task = box.value;
            var current = assigneeOf(task);

            if (box.checked) {
                map[task] = assignTarget;
                setTaskAssignee(task, assignTarget);
            } else if (current === assignTarget) {
                map[task] = "";
                setTaskAssignee(task, "");
            }
        });

        writeAssignments(map);
        closeAssignDialog();
        applyTaskFilters();

        showNote("member-added", "Assignments saved for " + assignTarget + ".");

        if (viewAs) {
            setDemoUser(assignTarget);
            demoRole = "member";
            try {
                sessionStorage.setItem(ROLE_KEY, demoRole);
            } catch (error) {
                // Ignore: the switch still works for this page load.
            }
            applyRole();
        }

        assignTarget = "";
    }

    function wireAssignDialog() {
        var dialog = $("#assign-dialog");
        var form = $("#assign-form");
        if (!dialog || !form) {
            return;
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var submitter = event.submitter;
            var viewAs = submitter && submitter.getAttribute("data-view") === "member";
            saveAssignments(viewAs);
        });

        var close = $("#assign-close");
        if (close) {
            close.addEventListener("click", closeAssignDialog);
        }

        var cancel = $("#assign-cancel");
        if (cancel) {
            cancel.addEventListener("click", closeAssignDialog);
        }
    }

    function wireHomePanels() {
        var taskForm = $("#quick-task-form");

        if (taskForm) {
            taskForm.addEventListener("submit", function (event) {
                if (event.defaultPrevented) {
                    return;
                }
                event.preventDefault();

                var body = $("#home-task-table tbody");
                if (!body) {
                    return;
                }

                var title = $("#quick-title", taskForm).value.trim();
                var priority = $("#quick-priority", taskForm).value;

                var row = document.createElement("tr");
                row.setAttribute("data-assignee", currentUserName());
                var taskCell = document.createElement("td");
                var link = document.createElement("a");
                link.href = "task-details.html?task=" + encodeURIComponent(title);
                link.textContent = title;
                taskCell.appendChild(link);
                row.appendChild(taskCell);

                ["You", "0%", "Just now", label(priority)].forEach(function (text) {
                    var cell = document.createElement("td");
                    cell.textContent = text;
                    row.appendChild(cell);
                });

                body.insertBefore(row, body.firstChild);
                buildProgressBars();
                applyTaskFilters();
                showNote("task-added", "Task \"" + title + "\" added to your dashboard.");
                taskForm.reset();
            });
        }

        var memberForm = $("#add-member-form");

        if (memberForm) {
            memberForm.addEventListener("submit", function (event) {
                if (event.defaultPrevented) {
                    return;
                }
                event.preventDefault();

                if (demoRole !== "admin") {
                    return;
                }

                var list = $(".member-list");
                if (!list) {
                    return;
                }

                var name = $("#new-member-name", memberForm).value.trim();
                var email = $("#new-member-email", memberForm).value.trim();
                var role = $("#new-member-role", memberForm).value;

                if (name === "" || email === "") {
                    return;
                }

                var item = document.createElement("li");
                item.className = "member-item";
                list.appendChild(item);
                fillMemberItem(item, name, email, role);

                showNote("member-added", "Added " + name + " (" + email + ") as " + label(role) + ".");
                memberForm.reset();
            });
        }
    }

    /* ---------- appearance: light / dark theme ---------- */

    var THEME_KEY = "pm-theme";

    function readTheme() {
        try {
            return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
        } catch (error) {
            return "light";
        }
    }

    var theme = readTheme();

    function applyTheme() {
        document.body.setAttribute("data-theme", theme);

        $$("[data-theme-btn]").forEach(function (btn) {
            var active = btn.getAttribute("data-theme-btn") === theme;
            btn.classList.toggle("is-active", active);
            btn.setAttribute("aria-pressed", active ? "true" : "false");
        });

        var label = $("#theme-label");
        if (label) {
            label.textContent = theme === "dark" ? "Dark" : "Light";
        }
    }

    function wireThemeSwitch() {
        $$("[data-theme-btn]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                theme = btn.getAttribute("data-theme-btn") === "dark" ? "dark" : "light";
                try {
                    localStorage.setItem(THEME_KEY, theme);
                } catch (error) {
                    // Ignore: the switch still works for this page load.
                }
                applyTheme();
            });
        });
        applyTheme();
    }

    /* ---------- task visibility: "my tasks only" scope ---------- */

    var taskGroups = [];

    function currentUserName() {
        return document.body.getAttribute("data-user") || "Mugdad";
    }

    function applyTaskFilters() {
        var isAdmin = demoRole === "admin";
        var user = currentUserName();

        taskGroups.forEach(function (group) {
            var visible = 0;

            group.items.forEach(function (item) {
                var assignee = item.getAttribute("data-assignee") || "";
                var inScope = isAdmin || (assignee !== "" && assignee === user);

                item.hidden = !inScope;
                if (inScope) {
                    visible++;
                }
            });

            if (group.notice) {
                group.notice.textContent = "No tasks assigned to you.";
                group.notice.hidden = !(visible === 0 && !isAdmin);
            }
        });

        updateDashboardStats();
    }

    function wireTaskScope() {
        taskGroups = [
            { items: $$(".task-card"), host: $(".task-cards"), notice: null },
            { items: $$("table tbody tr"), host: $(".table-wrap"), notice: null }
        ];

        taskGroups.forEach(function (group) {
            if (!group.host || group.items.length === 0) {
                return;
            }
            var note = document.createElement("p");
            note.className = "empty search-empty";
            note.hidden = true;
            group.host.insertAdjacentElement("afterend", note);
            group.notice = note;
        });

        applyTaskFilters();
    }

    /* ---------- dashboard search: results box, click to open a task ---------- */

    function searchTaskEntries() {
        var seen = {};
        var entries = [];

        function add(task, card) {
            if (!task || seen[task]) {
                return;
            }
            seen[task] = true;

            var status = card ? statusValueFromBadge($(".status", card)) : "";
            var priority = card ? priorityValueFromBadge($(".priority", card)) : "";

            if (!card) {
                $$("table tbody tr").forEach(function (row) {
                    var link = $("a", row);
                    if (link && link.textContent.trim() === task) {
                        status = statusValueFromBadge($(".status", row));
                    }
                });
            }

            entries.push({ task: task, status: status, priority: priority });
        }

        $$(".task-card[data-task]").forEach(function (card) {
            add(card.getAttribute("data-task"), card);
        });

        $$("table tbody tr").forEach(function (row) {
            var link = $("a", row);
            if (link) {
                add(link.textContent.trim(), null);
            }
        });

        return entries;
    }

    function wireTaskSearchBox() {
        var input = $("#task-search");
        var box = $("#search-results");
        if (!input || !box) {
            return;
        }

        function close() {
            box.hidden = true;
            box.textContent = "";
            input.setAttribute("aria-expanded", "false");
        }

        function render() {
            var query = input.value.trim().toLowerCase();
            box.textContent = "";

            if (query === "") {
                close();
                return;
            }

            var matches = searchTaskEntries().filter(function (entry) {
                return entry.task.toLowerCase().indexOf(query) !== -1;
            });

            if (matches.length === 0) {
                var empty = document.createElement("p");
                empty.className = "search-empty";
                empty.textContent = "No tasks found.";
                box.appendChild(empty);
            } else {
                matches.forEach(function (entry) {
                    var link = document.createElement("a");
                    link.className = "search-result";
                    link.href = taskUrl(entry.task, entry.status, entry.priority);
                    link.setAttribute("role", "option");

                    var name = document.createElement("strong");
                    name.textContent = entry.task;

                    var meta = document.createElement("small");
                    meta.textContent = (STATUS_LABELS[entry.status] || "Task") +
                        (entry.priority ? " \u00b7 " + label(entry.priority) + " priority" : "");

                    link.appendChild(name);
                    link.appendChild(meta);
                    box.appendChild(link);
                });
            }

            box.hidden = false;
            input.setAttribute("aria-expanded", "true");
        }

        input.setAttribute("aria-expanded", "false");
        input.addEventListener("input", render);
        input.addEventListener("search", render);
        input.addEventListener("focus", function () {
            if (input.value.trim() !== "") {
                render();
            }
        });
        input.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                close();
                input.blur();
            } else if (event.key === "Enter" && !box.hidden) {
                var first = $(".search-result", box);
                if (first) {
                    event.preventDefault();
                    location.href = first.getAttribute("href");
                }
            }
        });

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".search-wrap")) {
                close();
            }
        });
    }

    /* ---------- topbar avatar: account menu ---------- */

    function wireAvatarMenu() {
        var btn = $("#avatar-btn");
        var menu = $("#avatar-dropdown");
        if (!btn || !menu) {
            return;
        }

        function close() {
            menu.hidden = true;
            btn.setAttribute("aria-expanded", "false");
        }

        btn.addEventListener("click", function (event) {
            event.stopPropagation();
            var open = menu.hidden;
            menu.hidden = !open;
            btn.setAttribute("aria-expanded", open ? "true" : "false");
        });

        document.addEventListener("click", function (event) {
            if (!menu.hidden && !event.target.closest(".avatar-menu")) {
                close();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && !menu.hidden) {
                close();
                btn.focus();
            }
        });
    }

    /* ---------- priority cards: open the matching task ---------- */

    function wirePriorityCards() {
        $$(".task-card[data-task]").forEach(function (card) {
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "link");
            card.title = "Open task details";

            function open() {
                location.href = taskUrl(
                    card.getAttribute("data-task"),
                    statusValueFromBadge($(".status", card)),
                    priorityValueFromBadge($(".priority", card))
                );
            }

            card.addEventListener("click", function (event) {
                if (!event.target.closest(".task-check")) {
                    open();
                }
            });
            card.addEventListener("keydown", function (event) {
                if (event.target.closest(".task-check")) {
                    return;
                }
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    open();
                }
            });
        });
    }

    /* ---------- priority cards: tick to complete ---------- */

    function setRowCompletion(task, complete) {
        var row = null;

        $$("table tbody tr").forEach(function (candidate) {
            var link = $("a", candidate);
            if (link && link.textContent.trim() === task) {
                row = candidate;
            }
        });

        if (!row) {
            return;
        }

        var valueEl = $(".progress-value", row);
        var fill = $(".progress-fill", row);
        var status = $(".status", row);

        if (row._originalProgress === undefined && valueEl) {
            row._originalProgress = parseInt(valueEl.textContent, 10) || 0;
        }
        if (!row._originalStatus && status) {
            row._originalStatus = status.textContent;
            row._originalStatusClass = status.className;
        }

        var original = row._originalProgress || 0;
        var value = complete ? 100 : (original >= 100 ? 0 : original);

        if (valueEl) {
            valueEl.textContent = value + "%";
        }
        if (fill) {
            fill.style.width = Math.min(value, 100) + "%";
            fill.classList.toggle("is-done", value >= 100);
        }

        if (status) {
            if (complete) {
                status.textContent = "Complete";
                status.className = "status done";
            } else if (original >= 100) {
                status.textContent = "To do";
                status.className = "status todo";
            } else {
                status.textContent = row._originalStatus;
                status.className = row._originalStatusClass;
            }
        }

        saveTaskProgress(task, value);
        updateDashboardStats();
        buildProjectPie();
    }

    function wireTaskChecks() {
        $$(".task-card[data-task]").forEach(function (card) {
            var check = $(".task-check", card);
            if (!check) {
                return;
            }

            var status = $(".status", card);
            var wasComplete = card.classList.contains("is-complete");
            var originalStatus = status ? status.textContent : "";
            var originalClass = status ? status.className : "";

            function syncLabel(complete) {
                check.setAttribute("aria-pressed", complete ? "true" : "false");
                check.setAttribute("aria-label",
                    complete ? "Mark task incomplete" : "Mark task complete");
            }

            syncLabel(wasComplete);

            check.addEventListener("click", function (event) {
                event.stopPropagation();

                var complete = !card.classList.contains("is-complete");
                card.classList.toggle("is-complete", complete);
                syncLabel(complete);

                if (status) {
                    if (complete) {
                        status.textContent = "Complete";
                        status.className = "status done";
                    } else if (wasComplete) {
                        status.textContent = "To do";
                        status.className = "status todo";
                    } else {
                        status.textContent = originalStatus;
                        status.className = originalClass;
                    }
                }

                var task = card.getAttribute("data-task");
                var visibleStatus = statusValueFromBadge($(".status", card));
                saveTaskStatus(task, visibleStatus || "todo");
                setRowCompletion(task, complete);
            });
        });
    }

    /* Re-apply saved values when the browser restores a page from cache. */
    window.addEventListener("pageshow", function (event) {
        if (event.persisted) {
            applyStoredPriorities();
            applyStoredStatuses();
            applyStoredProgress();
        }
    });

    /* ---------- start ---------- */

    document.addEventListener("DOMContentLoaded", function () {
        markCurrentPage();
        wireForms();
        buildProgressBars();
        applyStoredProgress();
        applyDemoUser(readDemoUser());
        applyStoredAssignments();
        updateDashboardStats();
        buildProjectPie();
        wireNotifications();
        wireChat();
        wireChannels();
        wireProfilePreview();
        fillTaskFromQuery();
        wireTaskStatus();
        wireTaskFinish();
        wireTaskPriority();
        wireNotes();
        wireRoleSwitch();
        wireMemberList();
        wireHomePanels();
        wireAssignDialog();
        wireThemeSwitch();
        wireTaskScope();
        wireTaskSearchBox();
        wireAvatarMenu();
        wirePriorityCards();
        wireTaskChecks();
        applyStoredPriorities();
        applyStoredStatuses();
        wireTaskLinks();
    });
}());
