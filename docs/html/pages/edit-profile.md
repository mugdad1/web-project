# edit-profile.html — Edit profile

Like a signup form, but the fields are **pre-filled** with the current values.
The page uses the same workspace shell (sidebar + topbar) as `profile.html`
and `settings.html`.

## The form

```html
<form id="profile-form" action="profile.html" method="get">
```

- On Save it returns to the profile view page.
- `method="get"` — values ride in the URL; nothing stored yet.

## The fields (note the `value=`)

```html
<label for="fullname">Full Name</label>
<input type="text" id="fullname" name="fullname" value="Mugdad Alhammad" required>

<label for="major">Major</label>
<select id="major" name="major">
    <option value="cs" selected>Computer Science</option>
    ...
</select>

<label for="email">Email</label>
<input type="email" id="email" name="email" value="mugdad02@tutamail.com" required>
```

- The difference from signup: `value="Mugdad Alhammad"` and
  `value="mugdad02@tutamail.com"` fill the boxes with the saved data. The user
  changes what they want and keeps the rest.
- `required` stays — edited fields still cannot be emptied.
- The `<br>` tags are gone; the shared stylesheet handles spacing.

## The buttons

```html
<div class="form-actions">
    <input type="submit" value="Save changes">
    <a class="btn btn-secondary" href="profile.html">Cancel</a>
</div>
```

- `Save changes` submits to profile.html.
- `Cancel` is a normal link back to the profile, so it leaves without saving.

## How it works

The pattern is identical to signup but with `value=` pre-fill. That is the
HTML-only way to say "here is what is currently saved". Real data loading from
a database happens in the PHP milestone.
