# dashboard.html — لوحة التحكم (التقدم + المهام)

تعرض أرقام تقدم المشروع وجدول مهام، وكل مهمة ترتبط بصفحة تفاصيلها.

## قسم التقدم

```html
<section>
    <h2>Project Progress</h2>
    <ul>
        <li>Total Tasks: <strong>10</strong></li>
        <li>Completed: <strong>6</strong></li>
        <li>In Progress: <strong>3</strong></li>
        <li>Not Started: <strong>1</strong></li>
    </ul>
</section>
```

أربعة أسطر نقطية والأرقام عريضة `<strong>`.

## جدول قائمة المهام

```html
<section>
    <h3>Task List</h3>
    <table border="1" cellpadding="5">
        <tr>
            <th>Task</th> <th>Assignee</th> <th>Progress</th>
            <th>Time Remaining</th> <th>Note</th>
        </tr>
        <tr>
            <td><a href="task-details.html">Layout skeleton</a></td>
            <td>Mugdad</td> <td>100%</td> <td>Done</td> <td>Finished</td>
        </tr>
        <tr>
            <td><a href="task-details.html">Landing page</a></td>
            <td>Ali</td> <td>50%</td> <td>3 days</td> <td>On track</td>
        </tr>
        ... ثلاث صفوف أخرى (Ahmed, Husain, Kumail) ...
    </table>
</section>
```

- صف `<th>` يسمّي الأعمدة: المهمة، المسؤول، التقدم، التوقيت المتبقي، ملاحظة.
- كل صف مهمة عبارة عن خلايا `<td>`. خلية **اسم المهمة** تحتوي رابطاً:
  `<td><a href="task-details.html">...</a></td>` — النقر على مهمة يفتح
  task-details.html.
- (كل روابط المهام تشير لنفس صفحة التفاصيل الآن — صفحة مهمة عامة واحدة.
  ملف تفاصيل لكل مهمة يأتي مع PHP.)

## زر المحادثة

```html
<section>
    <a href="chat.html"><button type="button">Chat</button></a>
</section>
```

- زر `<button>` داخل `<a href="chat.html">`. الرابط يجعل الزر ينتقل للصفحة.
  (زر `<button>` وحيد بدون رابط أو نموذج لا يفعل شيئاً.)
- `type="button"` يمنعه من التصرف كزر إرسال.

## كيف تعمل

لوحة التحكم = "شاشة الحالة": أرقام ملخصة في قائمة + جدول مهام حقيقي. الرابط
داخل خلية كل مهمة هو توجيه من اللوحة إلى تفاصيل المهمة.