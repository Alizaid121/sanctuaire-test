/* Sanctuaire test site: shared top bar. Loaded at the start of <body> on every test page.
   It needs the hub session (written by the hub login). Without it, the visitor goes back to the hub. */
(function () {
  var HUB = 'sanctuaire-hub-v1', s = null;
  try { s = JSON.parse(localStorage.getItem(HUB) || 'null'); } catch (e) { /* ignore */ }
  var base = new URL('../', location.href).href;           // the hub is one folder up
  if (!s || !s.at || Date.now() - s.at > 11 * 3600 * 1000) { location.replace(base + '#/login'); return; }

  var p = location.pathname;
  var id = p.indexOf('sanctuaire-test1') > -1 ? '1' : p.indexOf('sanctuaire-test2') > -1 ? '2' : 'cap';
  var fr = s.lang === 'fr';
  var L = fr ? { home: 'Accueil', guide: 'Guide', profile: 'Profil' } : { home: 'Home', guide: 'Guide', profile: 'Profile' };

  var css = document.createElement('style');
  css.textContent =
    '.hubbar{position:sticky;top:0;z-index:100;display:flex;flex-wrap:wrap;align-items:center;gap:4px 14px;padding:6px 14px;' +
    'background:#26362D;color:#fff;font:16px/1.3 Inter,system-ui,sans-serif}' +
    '.hubbar b{font:600 19px Fraunces,Georgia,serif;margin-right:auto}' +
    '.hubbar a{color:#fff;text-decoration:none;min-height:44px;display:inline-flex;align-items:center;padding:0 6px;border-radius:8px}' +
    '.hubbar a:hover{background:rgba(255,255,255,.14)}.hubbar span{opacity:.8;font-size:14px}';
  document.head.appendChild(css);

  var bar = document.createElement('nav');
  bar.className = 'hubbar';
  bar.setAttribute('aria-label', 'Sanctuaire');
  var name = document.createElement('span');
  name.textContent = s.label || '';                          // textContent: no HTML injection
  bar.innerHTML = '<b>Sanctuaire</b>' +
    '<a href="' + base + '#/home">' + L.home + '</a>' +
    '<a href="' + base + '#/guide/' + id + '">' + L.guide + '</a>' +
    '<a href="' + base + '#/profile">' + L.profile + '</a>';
  bar.appendChild(name);
  document.body.insertBefore(bar, document.body.firstChild);
})();
