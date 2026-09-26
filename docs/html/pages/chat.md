# chat.html — Team chat room

Members list + a message feed + a send box. No fake messages — the feed
starts empty.

## Members section

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

- Just a `<ul>` of the five team member names.

## Message feed

```html
<section>
    <h3>general</h3>
    <p>No messages yet.</p>
</section>
```

- The channel name is a heading; the feed is a single `<p>` saying the room
  is empty. Nothing invented.

## Send box

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

- A plain text input, required, with a placeholder hint.
- `action="chat.html"` → sending just reloads the chat page.
- The typed message rides in the URL (`?msg=...`) — nothing is stored.

## How it works

At the HTML stage chat is only a shell: members (static list), empty feed,
send box that navigates to itself. Real sending/storing of messages needs a
backend (PHP + Database) — a later milestone. The feed is deliberately empty
until then.