# Sanctuaire Test: style guide (v2.1.0)

Every page of the test site follows this. A new test, even one built in a new chat, must use it.
Source of truth in code: `theme.css` (tokens + test-page overrides) and `hub-bar.js` (top bar + bottom bar).

## 1. Look and feel
Warm, calm, private. Linen paper, deep green, brass accent. Not a corporate dashboard, not a children's app. Plain words on every label.

## 2. Colours (same as the app design)
| Token | Hex | Use |
|---|---|---|
| `--bg` Linen | `#F6F0E6` | page background |
| `--panel` Paper | `#FFFBF3` | cards, bottom bar |
| `--ink` | `#1F2A24` | text |
| `--muted` | `#5E5A50` | secondary text |
| `--line` | `#DDD2BF` | borders |
| `--accent` Cedar | `#26362D` | primary buttons, top bar |
| `--brass` / `--warn` | `#8A5B1E` | accent, warnings, active tab marker |
| `--dawn` | `#4F6F86` | links, information |
| `--good` | `#2F6B52` | success, completed (green tick) |
| `--bad` Ember | `#A63D2F` | errors, destructive |
| `--sand` | `#EFE6D4` | code chips, quiet fills |

Never add a new colour without writing it here first.

## 3. Type and size
Headings: Fraunces 600. Body and buttons: Inter 400/600. Body text 17 px; nothing under 13 px. Touch targets at least 48 px. Cards radius 16 px, buttons and fields 12 px. Focus ring: 3 px brass.

## 4. App frame (do not rebuild per page)
- Top bar: "Sanctuaire Test" at the left, EN/FR button at the right. Nothing else. Height 56 px.
- Bottom bar: Home, Tests, Guides, Profile. On a test page, Tests is active and Guides opens that test's guide.
- Both come from `hub-bar.js`. A test page only loads it (below). The bar sends visitors without a hub session back to the hub login.
- Page content sits in `<main>` and leaves room for the bottom bar (`theme.css` adds the padding).

## 5. Components
- Primary button: Cedar fill, white text. Secondary: Paper fill, Cedar text and border. Destructive: Paper fill, Ember text and border.
- Card: Paper, 1 px line border, 16 px radius.
- Status chip: small rounded pill. Done = good, needs attention = warn, problem = bad, waiting = muted.
- Progress bar: sand track, `--good` fill. A completed test shows a green tick.

## 6. Language
Roles decide the page language: admin (English speaker) sees English, partner (French speaker) sees French. French uses "tu". The EN/FR button changes the bars and the hub; test pages keep their own role language unless a page says otherwise.

## 7. Starting a new test page
```html
<head> ... your own <style> ...
  <link rel="stylesheet" href="../theme.css">   <!-- after your own <style> -->
</head>
<body>
<script src="../hub-bar.js"></script>            <!-- first thing in <body> -->
<main> ... </main>
```
Use the variable names above (`--bg --panel --ink --muted --line --accent --good --warn --bad`). Add the test to `TESTS` and `GUIDES` in the hub `index.html`.

## 8. Sessions (the hub signs in to every test)
Hub: `sanctuaire-hub-v1` (11 hours). Test 1: `sanctuaire-t1-session-v1`. Test 2: `sanctuaire-test2-session-v1`. Shape `{token, role, label, at}`. A new test with its own login function and key must be added to the hub login.

## 9. Rules for every update
Core changes (translator model, provider, tool) start a new test version; style, fixes and wording do not. Test 1 and 2 data are readable text: keep exports private and delete the test database when testing ends.
