# task-details.html — تفاصيل مهمة واحدة

الصفحة التي تصل إليها بالنقر على اسم مهمة من لوحة التحكم.

## قسم معلومات المهمة

```html
<section>
    <h2>Layout skeleton</h2>
    <ul>
        <li>Status: <strong>Completed</strong></li>
        <li>Assigned to: Mugdad</li>
        <li>Priority: High</li>
        <li>Due: 2026-09-20</li>
    </ul>
</section>
```

- اسم المهمة هو `<h2>`.
- المعلومات قائمة `<ul>`، والحالة عريضة بـ `<strong>`.

## قسم الملاحظات

```html
<hr>
<section>
    <h3>Notes</h3>
    <p>Header, nav and footer done. Passed review.</p>
</section>
```

ملاحظات المهمة كفقرة نصية عادية.

## كيف تعمل

صفحة عرض فقط — عنوان + قائمة معلومات + فقرة ملاحظات. هذه هي وجهة روابط لوحة
التحكم. في مرحلة PHP ستُعرض كل مهمة بنفس شكل الصفحة من صفها في قاعدة
البيانات.