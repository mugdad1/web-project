# new-team.html — إنشاء فريق

مجموعتا حقول: اسم الفريق، ثم إضافة عضو واحد (إيميل + دور).

## النموذج

```html
<form action="home.html" method="get">
```

## المجموعة الأولى — بيانات الفريق

```html
<fieldset>
    <legend>Team Details</legend><br>
    <label for="teamname">Team Name:</label><br>
    <input type="text" id="teamname" name="teamname" required placeholder="e.g. Team Alpha"><br><br>
</fieldset>
```

اسم الفريق، إجباري، مع مثال توضيحي.

## المجموعة الثانية — إضافة عضو

```html
<fieldset>
    <legend>Add Member</legend><br>
    <label for="m1">Member email:</label><br>
    <input type="email" id="m1" name="m1" placeholder="name@email.com" required>
    <select id="m1r" name="m1r">
        <option value="owner">Owner</option>
        <option value="admin" selected>Admin</option>
        <option value="member">Member</option>
    </select><br>
    <p><em>Owner: manages the team. Admin: can add members. Member: joins and participates.</em></p><br>
</fieldset>
```

- إيميل العضو: `type="email"`، إجباري، مع مثال.
- الدور: قائمة منسدلة — Owner / Admin (الافتراضي `selected`) / Member.
- فقرة `<em>` تشرح الأدوار الثلاثة أسفل الحقل مباشرة.

## الأزرار

```html
<input type="submit" value="Create Team">
<input type="reset" value="Clear">
```

## كيف يعمل

مجموعتا `<fieldset>` تفصلان "الفريق نفسه" عن "إضافة عضو" بوضوح (وأيضاً أهداف
تنسيق لمشروع CSS لاحقاً). صف عضو واحد فقط — لا صفوف وهمية إضافية. المتصفح
يتحقق من الإيميل (`type="email"` + `required`)، والأدوار محصورة في القيم
الثلاث الصحيحة عبر `<select>`.