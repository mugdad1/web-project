# edit-profile.html — تعديل الملف الشخصي

مثل نموذج التسجيل لكن الحقول **معبأة مسبقاً** بالقيم الحالية.

## النموذج

```html
<form action="profile.html" method="get">
```

- عند الحفظ يرجع إلى صفحة عرض الملف الشخصي.
- `method="get"` — القيم في الرابط؛ لا يُحفظ شيء بعد.

## الحقول (لاحظ `value=`)

```html
<label for="fullname">Full Name:</label><br>
<input type="text" id="fullname" name="fullname" value="Mugdad Alhammad" required><br><br>

<label for="major">Major:</label><br>
<select id="major" name="major">
    <option value="cs">Computer Science</option>
    <option value="cn">Computer Networks</option>
    <option value="cis">Computer Information Systems</option>
    <option value="ce">Computer Engineering</option>
</select><br><br>

<label for="email">Email:</label><br>
<input type="email" id="email" name="email" value="mugdad02@tutamail.com" required><br><br>
```

- الفرق عن signup: `value="Mugdad Alhammad"` و `value="mugdad02@tutamail.com"`
  يملآن الصناديق بالبيانات المحفوظة. المستخدم يعدّل ما يريد ويبقي الباقي.
- `required` باقٍ — الحقول المعدلة لا يمكن إفراغها.

## الأزرار

```html
<input type="submit" value="Save">
<input type="reset" value="Cancel">
```

- `Save` يرسل إلى profile.html.
- `Cancel` (`type="reset"`) يفرغ الصناديق ثم يعيدها للقيم الأصلية في `value=`.

## رابط العودة

```html
<p><a href="profile.html">Back to Profile</a></p>
```

- رابط عادي للخروج بدون حفظ.

## كيف يعمل

النمط مطابق للتسجيل لكن مع التعبئة المسبقة `value=`. هذه هي الطريقة في HTML
الخالص لإظهار "هذه هي البيانات المحفوظة حالياً". جلب البيانات الفعلي من
قاعدة البيانات في مرحلة PHP.