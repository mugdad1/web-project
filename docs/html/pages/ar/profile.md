# profile.html — عرض الملف الشخصي

يعرض بيانات المستخدم كنص، مع جدول معلومات صغير.

## قسم بيانات المستخدم

```html
<section>
    <h2>Mugdad Alhammad</h2>
    <p><strong>Major:</strong> Computer Science</p>
    <p><strong>Email:</strong> mugdad02@tutamail.com</p>
    <p><strong>Role:</strong> Owner</p>
    <p><a href="edit-profile.html">Edit Profile</a></p>
</section>
```

- كل معلومة في `<p>` مع وسم `<strong>`. النمط:
  `<p><strong>التسمية:</strong> القيمة</p>`.
- سطر Edit Profile رابط إلى edit-profile.html.

## جدول معلوماتي

```html
<hr>
<section>
    <h3>My Info</h3>
    <table border="1" cellpadding="5">
        <tr><th>Field</th><th>Value</th></tr>
        <tr><td>Name</td><td>Mugdad Alhammad</td></tr>
        <tr><td>Joined</td><td>2026</td></tr>
    </table>
</section>
```

- `border="1"` يظهر حدوداً مرئية؛ `cellpadding="5"` يضيف مسافة داخل الخلايا.
- `<tr>` صف، `<th>` خلية عنوان، `<td>` خلية بيانات.

## كيف تعمل

صفحة عرض فقط. البيانات الأساسية نص عادي (سهلة القراءة)، والبيانات الإضافية
جدول من عمودين. رابط Edit Profile هو "الطريق" لنموذج التعديل.