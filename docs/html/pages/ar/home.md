# home.html — الصفحة الرئيسية (بعد الدخول)

صفحة المستخدم المسجل. كانت تحتوي على ترحيب وإشعارات وإجراءات سريعة، وأصبحت
تضم أيضاً لوحة التحكم والمحادثة وإضافة المهام مباشرة على الشاشة الرئيسية.

## الهيكل: الشريط الجانبي والشريط العلوي

```html
<body class="home-page app-shell">
<aside class="sidebar">
    <nav class="side-nav" aria-label="Main">
        <a href="home.html">Home</a>
        <a href="dashboard.html">Dashboard</a>
        <a href="chat.html">Chat</a>
        <a href="profile.html">Profile</a>
        <a href="settings.html">Settings</a>
    </nav>
    <div class="sidebar-foot"><a href="index.html">Sign Out</a></div>
</aside>
<div class="app-body">
    <header class="topbar">
        <h1>My Home <span class="role-badge" id="role-badge">Admin</span></h1>
    </header>
</div>
</body>
```

- الشريط الجانبي والألوان البنفسجية مستوحاة من واجهات إدارة المشاريع الشائعة؛
  الكود والتنسيق هنا أصليان.
- "Sign Out" مجرد رابط إلى `index.html` (الجلسات الحقيقية مع PHP).

## قسم الترحيب

`<section class="hero">` يعرض "Welcome back, Mugdad". الخلفية عبارة عن تدرجات
CSS وأنماط مكررة في `css/style.css` (لا صور ولا ملفات إضافية). الاسم ثابت الآن؛
اسم المستخدم الحقيقي يأتي في مرحلة PHP.

## المهام ذات الأولوية

قائمة `.task-cards` تستخدم شرائح `.status` (مكتمل / قيد التنفيذ / للتنفيذ)
وشريح `.priority` (عالي / متوسط / منخفض). هي للعرض فقط وتطابق صفوف الجدول.

## لوحة التحكم على الصفحة الرئيسية

قائمة `.stats` وجدول بنفس مهام `dashboard.html`. يحول `js/app.js` خلايا النسب
المئوية إلى أشرطة تقدم ويحدّث المجاميع. رابط "Full dashboard" يبقى إلى
`dashboard.html`.

## إضافة مهمة

النموذج `#quick-task-form` (العنوان مطلوب، الوصف، الأولوية) يضيف صفاً جديداً إلى
الجدول ويحدّث الإحصائيات عبر `js/app.js`. لا شيء يُحفظ بعد؛ إعادة التحميل تُعيد
الجدول إلى حالته الأصلية.

## المحادثة على الصفحة الرئيسية

`#feed` مع النموذج `#chat-form` يسمح بكتابة رسالة وإرسالها؛ المعالج `wireChat()`
يضيف فقاعة "You · just now". صفحة `chat.html` تبقى غرفة المحادثة الكاملة.

## الأعضاء وقاعدة الأدمن فقط

- قائمة الأعضاء تعرض أدوارهم.
- مفتاح تجريبي **Admin / Member** يضبط `data-role` على `<body>`؛ الدالة
  `applyRole()` في `app.js` تخفي كل عناصر `[data-admin-only]` في دور Member،
  بما فيها نموذج إضافة عضو هنا وفي `new-team.html`.
- **هذا عرض تجريبي وليس أمناً حقيقياً**؛ يجب على PHP التحقق من الدور في الخادم
  قبل إضافة أي عضو.

## الإشعارات والإجراءات السريعة

- إشعارات `.notifications li` تحصل على زر "Mark read".
- رابط "New team" يحمل `data-admin-only` فيختفي في دور Member.

## كيف تعمل

home.html نقطة تجمع تعرض المعلومات والميزات الرئيسية دون مغادرة الصفحة. كل شيء
ثابت حتى يضيف الخادم مستخدمين ومهاماً ورسائل وإشعارات حقيقية.
