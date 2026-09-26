# index.html — Landing page

This is the first page guests see. No form here — it only introduces the site
and gives the links to sign up / sign in.

## Header (top of the page)

```html
<header>
    <h1>Project Management Site</h1>
    <nav>
        <a href="#intro">About |</a>
        <a href="signup.html">Sign Up |</a>
        <a href="signin.html">Sign In</a>
    </nav>
</header>
```

- `<h1>Project Management Site</h1>` — the site title. Biggest heading on the page.
- `<nav>` holds the navigation links.
- `#intro` (with `#`) means "same page, jump to the element with `id="intro"`" — the About link scrolls down to the first section.
- The pipe `|` after most links is just a visual separator between nav items.

## Main content

```html
<main>
    <section id="intro">
        <h2>Welcome!</h2>
        <p>Track your <strong>tasks and teams</strong> in one place.</p>
        <p>Create big tasks, split them into small <em>subtasks</em>, and see your progress.</p>
    </section>
</main>
```

- `<section id="intro">` — the block that `href="#intro"` jumps to.
- `<strong>` makes "tasks and teams" bold.
- `<em>` makes "subtasks" italic.

## Footer

```html
<footer>
    <hr>
    <p><a href="mailto:mugdad02@tutamail.com">Contact us</a></p>
</footer>
```

- `<hr>` draws a horizontal line.
- `mailto:` link opens the visitor's email program (no server needed).

**How it works:** pure navigation — a landing page that only links forward.
The `#intro` anchor is the only "samed page" jump in the whole nav.