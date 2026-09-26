# signin.html — نموذج تسجيل الدخول

أبسط نموذج: إيميل + كلمة مرور فقط.

## النموذج

```html
<form action="home.html" method="get">
```

- عند الإرسال ينتقل إلى home.html.
- `method="get"` — القيم في الرابط، لا يُحفظ شيء بعد.

## الحقول

```html
<label for="email">Email:</label><br>
<input type="email" id="email" name="email" required><br><br>

<label for="password">Password:</label><br>
<input type="password" id="password" name="password" required><br><br>
```

- `for="email"` + `id="email"` يربطان التسمية بالحقل — النقر على التسمية
  يركز على الحقل.
- `type="email"` → يتحقق أن القيمة تشبه إيميلاً.
- `type="password"` → يخفي ما يُكتب.
- `required` → لا يمكن الإرسال وهو فارغ.

## الأزرار

```html
<input type="submit" value="Sign In">
<input type="reset" value="Clear">
```

## كيف يعمل

1. يكتب المستخدم الإيميل وكلمة المرور.
2. `required` يمنع الإرسال الفارغ.
3. عند الإرسال ينتقل لـ home.html مع `?email=...&password=...` في الرابط.

هذا كل ما يمكن لتسجيل الدخول فعله في مرحلة HTML فقط. في مرحلة PHP سيُقارن
هذا النموذج بالمستخدمين المسجلين في signup.html.