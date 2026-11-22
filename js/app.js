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
    });
}());
