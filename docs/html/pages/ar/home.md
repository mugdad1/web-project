# home.html — الصفحة الرئيسية (بعد الدخول)

الصفحة التي يقصدها المستخدم المسجل: رسالة ترحيب، إشعارات، إجراءات سريعة.

## الرأس / التنقل

```html
<h1>My Home</h1>
<nav>
    <a href="profile.html">Profile |</a>
    <a href="dashboard.html">Dashboard |</a>
    <a href="index.html">Sign Out</a>
</nav>
```

- لا يوجد رابط Home — هذه الصفحة هي الرئيسية.
- "Sign Out" مجرد رابط إلى index.html (الجلسات الحقيقية مع PHP).

## قسم الترحيب

```html
<section>
    <h2>Welcome back, Mugdad</h2>
    <p>Here is what is happening in your projects today.</p>
</section>
```

- الاسم ثابت الآن؛ اسم المستخدم الفعلي يأتي في مرحلة PHP.

## قسم الإشعارات

```html
<hr>
<section>
    <h3>Notifications</h3>
    <ul>
        <li>Ahmed finished the sign up page</li>
        <li>Kumail updated the dashboard table</li>
        <li>Your task "New team page" was created</li>
    </ul>
</section>
```

- `<hr>` يفصل هذا القسم عن القسم الذي فوقه.
- `<ul>` / `<li>` قائمة نقطية من الإشعارات التجريبية (الخادم سيجلبها
  حقيقية لاحقاً).

## قسم الإجراءات السريعة

```html
<hr>
<section>
    <h3>Quick Actions</h3>
    <ul>
        <li><a href="new-task.html">New task</a></li>
        <li><a href="new-team.html">New team</a></li>
    </ul>
</section>
```

- مجرد رابطين داخل عناصر قائمة.

## كيف تعمل

home.html نقطة تجمع: تعرض معلومات (ترحيب + إشعارات) وتقدم تنقلاً للميزات
الرئيسية (الملف الشخصي، لوحة التحكم، صفحات جديدة). كل شيء ثابت حتى يضيف
الخادم مستخدمين/مهام/إشعارات حقيقية.