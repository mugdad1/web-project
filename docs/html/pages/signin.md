# signin.html — Login form

The simplest form: email + password only.

## The form

```html
<form action="home.html" method="get">
```

- On submit it jumps to home.html.
- `method="get"` — values ride in the URL, nothing stored yet.

## The fields

```html
<label for="email">Email:</label><br>
<input type="email" id="email" name="email" required><br><br>

<label for="password">Password:</label><br>
<input type="password" id="password" name="password" required><br><br>
```

- `for="email"` + `id="email"` connect label to input — clicking the label
  focuses the box.
- `type="email"` → checks the value looks like an email.
- `type="password"` → hides what is typed.
- `required` → cannot submit empty.

## The buttons

```html
<input type="submit" value="Sign In">
<input type="reset" value="Clear">
```

## How it works

1. User types email + password.
2. `required` blocks empty submission.
3. Submit → navigates to home.html with `?email=...&password=...` in the URL.

That is all a login can do at the HTML-only stage. In the PHP milestone this
form will be checked against the users from signup.html.