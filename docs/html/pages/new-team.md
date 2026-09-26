# new-team.html — Create a team

Two fieldsets: team name, then adding one member (email + role).

## The form

```html
<form action="home.html" method="get">
```

## Fieldset 1 — team details

```html
<fieldset>
    <legend>Team Details</legend><br>
    <label for="teamname">Team Name:</label><br>
    <input type="text" id="teamname" name="teamname" required placeholder="e.g. Team Alpha"><br><br>
</fieldset>
```

Team name, required, with an example hint.

## Fieldset 2 — add member

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

- Member email: `type="email"`, required, placeholder example.
- Role: a `<select>` dropdown — Owner / Admin (`selected`, default) / Member.
- The `<em>` paragraph explains the three roles right under the field.

## The buttons

```html
<input type="submit" value="Create Team">
<input type="reset" value="Clear">
```

## How it works

Two `<fieldset>`s keep "the team itself" and "adding a member" clearly
separated (badge for the CSS milestone too). One member row only — no fake
extra rows. Email is validated by the browser (`type="email"` + `required`),
roles restricted to the 3 valid values by the `<select>`.