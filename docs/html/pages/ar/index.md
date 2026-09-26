# index.html — صفحة البداية

هذه أول صفحة يراها الزائر. لا يوجد فيها نموذج — فقط تعرّف عن الموقع وروابط
الدخول / التسجيل.

## رأس الصفحة (الجزء العلوي)

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

- `<h1>Project Management Site</h1>` — عنوان الموقع، أكبر عنوان في الصفحة.
- `<nav>` يحتوي روابط التنقل.
- `#intro` (مع `#`) تعني "نفس الصفحة، انتقل إلى العنصر صاحب `id="intro"`" —
  رابط About ينزل إلى أول قسم.
- الـ `|` بعد معظم الروابط مجرد فاصل بصري بين عناصر القائمة.

## المحتوى الرئيسي

```html
<main>
    <section id="intro">
        <h2>Welcome!</h2>
        <p>Track your <strong>tasks and teams</strong> in one place.</p>
        <p>Create big tasks, split them into small <em>subtasks</em>, and see your progress.</p>
    </section>
</main>
```

- `<section id="intro">` — الكتلة التي يقفز إليها `href="#intro"`.
- `<strong>` يجعل "tasks and teams" عريضاً.
- `<em>` يجعل "subtasks" مائلاً.

## التذييل

```html
<footer>
    <hr>
    <p><a href="mailto:mugdad02@tutamail.com">Contact us</a></p>
</footer>
```

- `<hr>` يرسم خطاً أفقياً.
- رابط `mailto:` يفتح برنامج البريد عند الزائر (بدون أي خادم).

**كيف تعمل:** صفحة تنقّل فقط — تقدم الموقع وتنقل إلى صفحات أخرى. الارتباط
داخل نفس الصفحة `#intro` هو الوحيد من نوعه هنا.