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
            return $(".progress-value", row) !== null;
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

    /* ---------- home: mark notifications as read ---------- */

    function wireNotifications() {
        $$(".notifications li").forEach(function (item) {
            var button = document.createElement("button");
            button.type = "button";
            button.className = "btn btn-secondary btn-small";
            button.textContent = "Mark read";

            button.addEventListener("click", function () {
                item.classList.toggle("is-read");
                button.textContent = item.classList.contains("is-read") ? "Unread" : "Mark read";
            });

            item.appendChild(button);
        });
    }

    /* ---------- chat: append a message to the feed ---------- */

    function wireChat() {
        var feed = $("#feed");
        var form = $("#chat-form");
        if (!feed || !form) {
            return;
        }

        var input = $("#msg", form);

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var text = input.value.trim();
            if (text === "") {
                return;
            }

            var empty = $(".empty", feed);
            if (empty) {
                empty.remove();
            }

            var message = document.createElement("div");
            message.className = "message is-mine";

            var meta = document.createElement("span");
            meta.className = "meta";
            meta.textContent = "You · just now";

            message.appendChild(meta);
            message.appendChild(document.createTextNode(text));
            feed.appendChild(message);
            feed.scrollTop = feed.scrollHeight;

            input.value = "";
            input.focus();
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
                updateDashboardStats();
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

                var email = $("#new-member-email", memberForm).value.trim();
                var role = $("#new-member-role", memberForm).value;

                var item = document.createElement("li");
                var name = document.createElement("span");
                name.textContent = email;
                var tag = document.createElement("span");
                tag.className = "tag";
                tag.textContent = label(role);
                item.appendChild(name);
                item.appendChild(tag);
                list.appendChild(item);

                showNote("member-added", "Added " + email + " as " + role + ".");
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

    /* ---------- topbar search: filter the tasks on home / dashboard ---------- */

    function wireTaskSearch() {
        var input = $("#task-search");
        if (!input) {
            return;
        }

        var groups = [
            { items: $$(".task-card"), host: $(".task-cards") },
            { items: $$("table tbody tr"), host: $(".table-wrap") }
        ];
        var notices = [];

        groups.forEach(function (group) {
            if (!group.host || group.items.length === 0) {
                notices.push(null);
                return;
            }
            var note = document.createElement("p");
            note.className = "empty search-empty";
            note.textContent = "No matching tasks.";
            note.hidden = true;
            group.host.insertAdjacentElement("afterend", note);
            notices.push(note);
        });

        function filter() {
            var query = input.value.trim().toLowerCase();

            groups.forEach(function (group, index) {
                var visible = 0;

                group.items.forEach(function (item) {
                    var match = item.textContent.toLowerCase().indexOf(query) !== -1;
                    item.hidden = !match;
                    if (match) {
                        visible++;
                    }
                });

                if (notices[index]) {
                    notices[index].hidden = !(query !== "" && visible === 0);
                }
            });
        }

        input.addEventListener("input", filter);
        input.addEventListener("search", filter);
        filter();
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

    /* ---------- start ---------- */

    document.addEventListener("DOMContentLoaded", function () {
        markCurrentPage();
        wireForms();
        buildProgressBars();
        updateDashboardStats();
        wireNotifications();
        wireChat();
        wireProfilePreview();
        fillTaskFromQuery();
        wireRoleSwitch();
        wireHomePanels();
        wireThemeSwitch();
        wireTaskSearch();
        wireAvatarMenu();
    });
}());
