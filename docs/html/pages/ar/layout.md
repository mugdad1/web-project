# layout.html — قالب الصفحات (الهيكل)

هذا الملف هو **القالب**. لا يُرتبط من أي صفحة فعلية. ينسخه أحد أعضاء الفريق
ويلصق محتوى صفحته داخل `<main>` ويحفظ صفحة جديدة.

## الرأس

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

- `<!-- ... -->` تعليق — لا يظهر في المتصفح، مجرد ملاحظة للمبرمجين.
- قائمة التنقل هنا تحتوي كل الصفحات، فالقالب يعطي الروابط جاهزة لكل صفحة جديدة.

## المحتوى الرئيسي

```html
<main>
    <!-- PASTE YOUR PAGE CONTENT HERE -->
</main>
```

- التعليق يحدد المكان المحدد الذي يلصق فيه العضو محتوى صفحته.
- كل شيء تحت `<main>` (التذييل) مشترك ويبقى نفسه في كل الصفحات.

## التذييل

```html
<footer>
    <hr>
    <p>Mugdad, Ali, Ahmed, Husain, Kumail</p>
</footer>
```

- مجرد خط وأسماء الفريق.

**كيف يعمل:** مصنع للصفحات المتطابقة — كل صفحة منتهية تبدو تماماً مثل هذا
القالب مع محتوى إضافي لُصق داخله.