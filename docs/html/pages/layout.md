# layout.html — Page template (skeleton)

This file is the **template**. It is not linked from any real page. A
teammate copies it, pastes their content inside `<main>`, and saves a new
page.

## Header

```html
<!-- Page header: logo/title + navigation (ch2 semantic tags) -->
<header>
    <h1>Project Management Site</h1>
    <nav>
        <a href="index.html">Home |</a>
        <a href="signup.html">Sign Up |</a>
        <a href="signin.html">Sign In |</a>
        <a href="home.html">My Home |</a>
        <a href="profile.html">Profile |</a>
        <a href="dashboard.html">Dashboard</a>
    </nav>
</header>
```

- `<!-- ... -->` is a comment — invisible in the browser, a note to coders.
- This nav has every page, so a new page built from this template already
  has all links ready.
- Last nav item (`Dashboard`) has no trailing `|`.

## Main content

```html
<main>
    <!-- PASTE YOUR PAGE CONTENT HERE -->
</main>
```

- The comment marks the exact spot where a teammate pastes their page body.
- Everything below `<main>` (footer) is shared and stays the same on every page.

## Footer

```html
<footer>
    <hr>
    <p>Mugdad, Ali, Ahmed, Hussain, Kumail</p>
</footer>
```

- Just a line and the team names.

**How it works:** it is a factory for identical pages. Each finished page
(e.g. `new-task.html`) looks exactly like this template with something extra
pasted into `<main>`.