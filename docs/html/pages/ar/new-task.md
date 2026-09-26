# new-task.html — إنشاء مهمة

نموذج لإضافة مهمة: العنوان، الوصف، الأولوية.

## النموذج

```html
<form action="home.html" method="get">
```

- عند الإرسال يرجع إلى home.html.
- لا يُحفظ شيء — المهمة تسافر في الرابط الآن.

## الحقول

```html
<label for="title">Title:</label><br>
<input type="text" id="title" name="title" required placeholder="e.g. Build the landing page"><br><br>

<label for="desc">Description:</label><br>
<input type="text" id="desc" name="desc" placeholder="e.g. Add header, nav and footer"><br><br>

<label for="priority">Priority:</label><br>
<select id="priority" name="priority">
    <option value="low">Low</option>
    <option value="medium" selected>Medium</option>
    <option value="high">High</option>
</select><br><br>
```

| الحقل | الكود | ملاحظات |
|-------|-------|---------|
| العنوان | `required` + `placeholder` | يجب ملؤه؛ نص تلميح يظهر مثالاً |
| الوصف | `placeholder` فقط | اختياري؛ نص تلميح |
| الأولوية | `<select>` | قائمة منسدلة منخفضة/متوسطة/عالية |

- `placeholder` نص تلميح رمادي داخل الصندوق. لا يُرسل — يُرسل النص الحقيقي
  المكتوب فقط.
- `selected` على "Medium" يجعله الخيار الافتراضي.

## الأزرار

```html
<input type="submit" value="Create Task">
<input type="reset" value="Clear">
```

## كيف يعمل

نفس نمط النموذج في signup. `placeholder` يرشد المستخدم عما يكتبه، `selected`
يختار أولوية افتراضية معقولة، `required` يمنع عنواناً فارغاً. الإرسال ينقل
إلى home.html مع وصف المهمة في الرابط.