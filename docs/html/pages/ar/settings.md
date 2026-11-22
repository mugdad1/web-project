# settings.html — الإعدادات (بعد الدخول)

تحتوي على مفتاح تغيير المظهر، وتستخدم نفس ملفات CSS و JS المشتركة.

## قسم المظهر

```html
<div class="theme-switch" role="group" aria-label="Colour theme">
    <button type="button" class="theme-btn is-active" data-theme-btn="light">Light</button>
    <button type="button" class="theme-btn" data-theme-btn="dark">Dark</button>
</div>
```

- الدالة `wireThemeSwitch()` في `js/app.js` تضبط `data-theme` على `<body>`
  وتحدّث الزر النشط و`#theme-label`.
- يُحفظ الاختيار في `localStorage` داخل `try/catch` حتى لا يتعطل الموقع إذا
  كان التخزين ممنوعاً.
- ملف `css/style.css` يغيّر متغيرات الألوان تحت `body[data-theme="dark"]`.

## قسم الحساب

نص ثابت ورابط إلى `edit-profile.html`؛ إعدادات الحساب الحقيقية تأتي مع PHP.

## الوصول للصفحة

كل صفحات المستخدم المسجل (بما فيها الشريط الجانبي في home و dashboard) تحتوي
 على رابط `settings.html`.
