# index.html — Landing page

First page guests see. No form here — it introduces the site and links to
sign up / sign in. It now uses a CSS gradient background and a hero layout.

## Header

```html
<header>
    <h1>Project Management Site</h1>
    <nav>
        <a href="#intro">About</a>
        <a href="signup.html">Sign Up</a>
        <a href="signin.html">Sign In</a>
    </nav>
</header>
```

- `#intro` jumps to the hero section (`id="intro"`).
- The header is sticky and translucent on this page, like the home screen.

## Hero

```html
<section class="landing-hero" id="intro">
    <div class="landing-copy">
        <p class="eyebrow">One place for the whole team</p>
        <h2>Track your tasks and teams in one place.</h2>
        ...
    </div>
    <div class="landing-preview" aria-hidden="true">...</div>
</section>
```

- `body.landing-page` in `css/style.css` supplies the layered gradient +
  diagonal pattern background; `.landing-hero` has a purple-to-pink gradient
  with a dot pattern. No image files.
- The preview card is decorative (`aria-hidden="true"`) and reuses the status
  pill classes from the app screens.

## Feature grid and steps

- `.feature-grid` is a responsive card list for Tasks, Chat, Dashboard and
  Teams.
- `.steps` is a numbered `<ol>` built with CSS counters.

## Footer

- `mailto:` contact link plus the team names; no `<hr>` needed because the
  stylesheet hides dividers.

**How it works:** pure navigation — a landing page that only links forward.
Dark mode from `settings.html` applies here too.
