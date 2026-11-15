// Navigation: mobile toggle + Solutions drop-down (click, keyboard, outside-click)
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Drop-downs: forgiving hover (close delay + no gap), click/tap, keyboard
  var drops = Array.prototype.slice.call(document.querySelectorAll('.nav-drop'));
  var hoverable = window.matchMedia('(hover: hover) and (min-width: 961px)');
  function setOpen(drop, open) {
    drop.classList.toggle('open', open);
    drop.querySelector('button').setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeOthers(keep) { drops.forEach(function (d) { if (d !== keep) { clearTimeout(d._t); setOpen(d, false); } }); }
  drops.forEach(function (drop) {
    var btn = drop.querySelector('button');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !drop.classList.contains('open');
      closeOthers(drop); setOpen(drop, open);
    });
    drop.addEventListener('mouseenter', function () {
      if (!hoverable.matches) return;
      clearTimeout(drop._t);
      closeOthers(drop); setOpen(drop, true);
    });
    drop.addEventListener('mouseleave', function () {
      if (!hoverable.matches) return;
      clearTimeout(drop._t);
      drop._t = setTimeout(function () { setOpen(drop, false); }, 450);
    });
    drop.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(drop, false); btn.focus(); }
    });
    drop.addEventListener('focusout', function (e) {
      if (!drop.contains(e.relatedTarget)) setOpen(drop, false);
    });
  });
  document.addEventListener('click', function (e) {
    drops.forEach(function (d) { if (!d.contains(e.target)) setOpen(d, false); });
  });

  // Contact form: no back end yet. Builds an email to the right inbox.
  // Replace with your form service (Formspree, Netlify Forms, HubSpot) before launch.
  var form = document.getElementById('demo-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var product = d.get('interest') || '';
      var to = product.indexOf('WoundEye') === 0 ? 'hello@woundeye.com' : 'information@woundsolutions.ai';
      var body = [
        'Name: ' + (d.get('name') || ''),
        'Organization: ' + (d.get('org') || ''),
        'Role: ' + (d.get('role') || ''),
        'Email: ' + (d.get('email') || ''),
        'Phone: ' + (d.get('phone') || ''),
        'Interested in: ' + product,
        '',
        d.get('message') || ''
      ].join('\n');
      var href = 'mailto:' + to + '?subject=' + encodeURIComponent('Demo request: ' + product) + '&body=' + encodeURIComponent(body);
      var status = document.getElementById('form-status');
      status.innerHTML = 'Your request is ready to send to <b>' + to + '</b>. If your email app did not open, write to that address directly or call +1 847.519.3500.';
      status.classList.add('show');
      window.location.href = href;
    });
  }
})();
