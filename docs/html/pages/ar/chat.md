# chat.html — غرفة محادثة الفريق

قائمة أعضاء + صندوق رسائل + صندوق إرسال. لا رسائل وهمية — تبدأ الرسائل فارغة.

## قسم الأعضاء

```html
<section>
    <h2>Members</h2>
    <ul>
        <li>Mugdad</li>
        <li>Ali</li>
        <li>Ahmed</li>
        <li>Hussain</li>
        <li>Kumail</li>
    </ul>
</section>
```

- مجرد `<ul>` بأسماء أعضاء الفريق الخمسة.

## صندوق الرسائل

```html
<section>
    <h3>general</h3>
    <p>No messages yet.</p>
</section>
```

- اسم القناة عنوان، والرسائل فقرة `<p>` واحدة تقول أن الغرفة فارغة. لا شيء
  مخترع.

## صندوق الإرسال

```html
<section>
    <h3>Say something</h3>
    <form action="chat.html" method="get">
        <label for="msg">Message:</label><br>
        <input type="text" id="msg" name="msg" required placeholder="Type your message..."><br><br>
        <input type="submit" value="Send">
    </form>
</section>
```

- حقل نص عادي، إجباري، مع تلميح.
- `action="chat.html"` → الإرسال يعيد تحميل صفحة المحادثة فقط.
- الرسالة المكتوبة تسافر في الرابط (`?msg=...`) — لا يُحفظ شيء.

## كيف تعمل

في مرحلة HTML المحادثة مجرد هيكل: الأعضاء (قائمة ثابتة)، صندوق رسائل فارغ،
وصندوق إرسال ينتقل لنفسه. إرسال الرسائل وتخزينها فعلياً يحتاج خادماً
(PHP + قاعدة بيانات) — مرحلة تالية. الصندوق يبقى فارغاً عمداً حتى ذلك الوقت.