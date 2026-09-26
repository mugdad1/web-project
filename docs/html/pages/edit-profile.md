# edit-profile.html — Edit profile

Like a signup form, but the fields are **pre-filled** with the current values.

## The form

```html
<form action="profile.html" method="get">
```

- On Save it returns to the profile view page.
- `method="get"` — values ride in the URL; nothing stored yet.

## The fields (note the `value=`)

```html
<label for="fullname">Full Name:</label><br>
<input type="text" id="fullname" name="fullname" value="Mugdad Alhammad" required><br><br>

<label for="major">Major:</label><br>
<select id="major" name="major">
    <option value="cs">Computer Science</option>
    <option value="cn">Computer Networks</option>
    <option value="cis">Computer Information Systems</option>
    <option value="ce">Computer Engineering</option>
</select><br><br>

<label for="email">Email:</label><br>
<input type="email" id="email" name="email" value="mugdad02@tutamail.com" required><br><br>
```

- The difference from signup: `value="Mugdad Alhammad"` and `value="mugdad02@tutamail.com"`
  fill the boxes with the saved data. The user changes what they want and
  keeps the rest.
- `required` stays — edited fields still cannot be emptied.

## The buttons

```html
<input type="submit" value="Save">
<input type="reset" value="Cancel">
```

- `Save` submits to profile.html.
- `Cancel` (`type="reset"`) clears the boxes back to the pre-filled `value`s.

## The back link

```html
<p><a href="profile.html">Back to Profile</a></p>
```

- A normal link to leave without saving.

## How it works

The pattern is identical to signup but with `value=` pre-fill. That is the
HTML-only way to say "here is what is currently saved". Real data loading from
a database happens in the PHP milestone.