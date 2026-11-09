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
One language setting for the whole site: the EN/FR button in the top bar. At sign-in it defaults by role (admin English, partner French) and the choice is remembered. Every page must follow it and listen for the `sanctuaire-lang` event (`window.addEventListener('sanctuaire-lang', e => ... e.detail)`), read the current value with `SBar.lang()`, and have no language selector of its own. French uses "tu".

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

## 8. Sessions: one sign-in, in the hub only
The hub signs in to every test with one PIN. Test pages have no login form, no log-out and no refresh button; they poll by themselves. If a page finds no valid hub session or no valid test session, it calls `SBar.toHub()` (clears all sessions, returns to the hub login). Sign-out is in Profile only.
Keys: hub `sanctuaire-hub-v1` (11 hours); Test 1 `sanctuaire-t1-session-v1`; Test 2 `sanctuaire-test2-session-v1`. Shape `{token, role, label, at}`. A new test with its own login function and key must be added to the hub login and to `K` in `hub-bar.js`.
Honest limit: static pages are public. The page redirect is a door sign; real protection is the server, which refuses every data call without a valid token. A page with no server calls (the phone check) holds no private data.

## Progress, completion and versions
- Each test card on Home and Tests shows a progress bar and a rounded-down percentage. 100% only when every item is done. A completed test gets a green tick and a green card outline.
- What counts as complete (set per test): Test 1 = all 54 sentences marked done; Test 2 = all texts agreed; phone check = each person has done its 3 checks (basic, speed, memory); the test is complete only when both people have.
- Tests 1 and 2 are counted live from their own server functions. A test whose results are stored per person (phone check) saves through `hub_cap_save` and is read with `hub_cap_status`; it authenticates with the Test 2 sign-in.
- Every test has a version in `hub_tests`. Results are stored per (test, version, person) in `hub_results`. A core update (translator model, provider, tool) raises the version, so progress and the tick reset while the old results stay stored for the old report. Style, fixes and wording never change the version.

## PWA
`manifest.webmanifest`, `sw.js` (caches nothing, on purpose), icons in `icons/` (cropped from the splash art), `assets/splash.jpg`. The hub shows an Install screen when opened in a browser (skippable once per browser session). Chrome decides when it offers the install prompt.

## 9. Rules for every update
Core changes (translator model, provider, tool) start a new test version; style, fixes and wording do not. Test 1 and 2 data are readable text: keep exports private and delete the test database when testing ends.
