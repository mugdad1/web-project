# signup.html — Registration form

Collects a new user's info: first name, last name, email, password, major.

## The form tag

```html
<form action="home.html" method="get">
```

- `action="home.html"` → when submitted, the page jumps to home.html.
- `method="get"` → typed values ride in the URL (visible). Nothing is stored
  yet; storing comes with PHP + Database later.

## The fieldset (field group)

```html
<fieldset>
    <legend>Account Info</legend><br>
    ...
</fieldset>
```

- `<fieldset>` groups related fields; `<legend>` is the group's caption.
- `<br>` is a line break (text goes to the next line).

## The fields — same pattern every time

```html
<label for="firstname">First Name:</label><br>
<input type="text" id="firstname" name="firstname" required><br><br>
```

For every field there are 3 connected pieces:

| Piece | Meaning |
|-------|---------|
| `<label for="...">` | The visible caption. `for="firstname"` points at the input with that `id`. |
| `id="..."` | The input's unique name inside the page — the `for` target. |
| `name="..."` | The field name sent to the server. Important for PHP later. |

### The 5 fields

| Field | Input | Notes |
|-------|-------|-------|
| First Name | `type="text"` `required` | plain text box, cannot submit empty |
| Last Name | `type="text"` `required` | same |
| Email | `type="email"` `required` | browser checks the shape; phones open the email keyboard |
| Password | `type="password"` `required` | characters are hidden as dots |
| Major | `<select>` with 4 `<option>`s | dropdown: CS / CN / CIS / CE |

## The submit buttons

```html
<input type="submit" value="Sign Up">
<input type="reset" value="Clear">
```

- `type="submit"` — the button that sends the form (to home.html).
- `type="reset"` — empties all fields.

## How it works end to end

1. User types into the labelled boxes.
2. `required` makes the browser refuse submission while a field is empty.
3. On submit, `method="get"` puts every `name=value` into the URL and
   `action="home.html"` navigates there.
4. Nothing is stored yet — the PHP milestone will read those `name`s.