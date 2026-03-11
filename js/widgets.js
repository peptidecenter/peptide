/* ===========================
   PeptideCenter — Shared Widgets
   Particles, Contact FAB, Accessibility, Hamburger
   =========================== */

(function () {
  'use strict';

  // Detect base path (root vs subdirectory)
  var scripts = document.getElementsByTagName('script');
  var basePath = '';
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].src || '';
    if (src.indexOf('widgets.js') !== -1) {
      basePath = src.indexOf('/js/widgets.js') !== -1 && src.indexOf('../js/widgets.js') === -1 ? '' : '../';
      // More robust: check if src starts with ..
      if (scripts[i].getAttribute('src') && scripts[i].getAttribute('src').indexOf('../') === 0) {
        basePath = '../';
      } else {
        basePath = '';
      }
      break;
    }
  }

  // ---- Particles ----
  function generateParticles() {
    var container = document.getElementById('particles');
    if (!container) return;
    for (var i = 0; i < 30; i++) {
      var el = document.createElement('div');
      el.className = 'particle';
      el.style.cssText =
        'left:' + (Math.random() * 100) + '%;' +
        'width:' + (Math.random() * 3 + 1) + 'px;' +
        'height:' + (Math.random() * 3 + 1) + 'px;' +
        'animation-duration:' + (Math.random() * 15 + 10) + 's;' +
        'animation-delay:' + (Math.random() * 15) + 's;' +
        'background:' + (Math.random() > 0.5 ? 'var(--accent)' : 'var(--accent3)') + ';';
      container.appendChild(el);
    }
  }

  // ---- Hamburger Menu ----
  window.toggleMobileMenu = function () {
    var btn = document.getElementById('hamburger');
    var nav = document.getElementById('navLinks');
    if (btn && nav) {
      btn.classList.toggle('open');
      nav.classList.toggle('open');
    }
  };

  // ---- Nav Dropdown (mobile touch support) ----
  function initDropdown() {
    var dd = document.querySelector('.nav-dropdown-toggle');
    if (!dd) return;
    dd.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dd.parentElement.classList.toggle('open');
      }
    });
  }

  // ---- Floating Contact Widget ----
  function initContactWidget() {
    var waPhone = '972503637161';
    var waText = '%D7%A9%D7%9C%D7%95%D7%9D%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%90%D7%A4%D7%A9%D7%A8%20%D7%9E%D7%99%D7%93%D7%A2%20%D7%A2%D7%9C%20%D7%A4%D7%A4%D7%98%D7%99%D7%93%D7%99%D7%9D%3F';
    var tgUser = 'PeptideCenterIL';

    var html =
      '<div class="contact-fab" id="contactFab">' +
        '<div class="fab-label">צריכים עזרה?</div>' +
        '<div class="fab-options">' +
          '<a href="https://wa.me/' + waPhone + '?text=' + waText + '" target="_blank" rel="noopener" class="fab-option fab-wa" aria-label="ייעוץ בוואטסאפ">' +
            '💬 ייעוץ בוואטסאפ' +
          '</a>' +
          '<a href="https://t.me/' + tgUser + '" target="_blank" rel="noopener" class="fab-option fab-tg" aria-label="ייעוץ בטלגרם">' +
            '✈️ ייעוץ בטלגרם' +
          '</a>' +
        '</div>' +
        '<button class="fab-main-btn" aria-label="צריכים עזרה?" onclick="toggleContactFab()">💬</button>' +
      '</div>';

    document.body.insertAdjacentHTML('beforeend', html);
  }

  window.toggleContactFab = function () {
    var fab = document.getElementById('contactFab');
    if (fab) fab.classList.toggle('open');
  };

  // Close FAB when clicking outside
  document.addEventListener('click', function (e) {
    var fab = document.getElementById('contactFab');
    if (fab && fab.classList.contains('open') && !fab.contains(e.target)) {
      fab.classList.remove('open');
    }
  });

  // ---- Accessibility Widget ----
  var a11yState = {
    fontSize: 0,
    highContrast: false,
    grayscale: false,
    highlightLinks: false,
    readableFont: false
  };

  function loadA11yState() {
    try {
      var saved = localStorage.getItem('a11y');
      if (saved) {
        a11yState = JSON.parse(saved);
        applyA11yState();
      }
    } catch (e) {}
  }

  function saveA11yState() {
    try {
      localStorage.setItem('a11y', JSON.stringify(a11yState));
    } catch (e) {}
  }

  function applyA11yState() {
    // Font size
    var size = 100 + (a11yState.fontSize * 10);
    document.documentElement.style.fontSize = size + '%';

    // Toggle classes
    document.body.classList.toggle('a11y-high-contrast', a11yState.highContrast);
    document.body.classList.toggle('a11y-grayscale', a11yState.grayscale);
    document.body.classList.toggle('a11y-highlight-links', a11yState.highlightLinks);
    document.body.classList.toggle('a11y-readable-font', a11yState.readableFont);

    // Update button active states
    updateA11yButtons();
  }

  function updateA11yButtons() {
    var panel = document.getElementById('a11yPanel');
    if (!panel) return;
    var btns = panel.querySelectorAll('.a11y-option[data-action]');
    btns.forEach(function (btn) {
      var action = btn.getAttribute('data-action');
      if (action === 'high-contrast') btn.classList.toggle('active', a11yState.highContrast);
      else if (action === 'grayscale') btn.classList.toggle('active', a11yState.grayscale);
      else if (action === 'highlight-links') btn.classList.toggle('active', a11yState.highlightLinks);
      else if (action === 'readable-font') btn.classList.toggle('active', a11yState.readableFont);
    });
  }

  window.a11yAction = function (action) {
    if (action === 'font-up') {
      if (a11yState.fontSize < 5) a11yState.fontSize++;
    } else if (action === 'font-down') {
      if (a11yState.fontSize > -3) a11yState.fontSize--;
    } else if (action === 'high-contrast') {
      a11yState.highContrast = !a11yState.highContrast;
    } else if (action === 'grayscale') {
      a11yState.grayscale = !a11yState.grayscale;
    } else if (action === 'highlight-links') {
      a11yState.highlightLinks = !a11yState.highlightLinks;
    } else if (action === 'readable-font') {
      a11yState.readableFont = !a11yState.readableFont;
    } else if (action === 'reset') {
      a11yState = { fontSize: 0, highContrast: false, grayscale: false, highlightLinks: false, readableFont: false };
    }
    applyA11yState();
    saveA11yState();
  };

  window.toggleA11yPanel = function () {
    var panel = document.getElementById('a11yPanel');
    if (panel) panel.classList.toggle('open');
  };

  function initAccessibilityWidget() {
    var a11yLink = basePath + 'accessibility/index.html';
    var html =
      '<div class="a11y-widget" id="a11yWidget">' +
        '<button class="a11y-btn" onclick="toggleA11yPanel()" aria-label="נגישות" tabindex="0">♿</button>' +
        '<div class="a11y-panel" id="a11yPanel">' +
          '<div class="a11y-panel-header">' +
            '<h3>הגדרות נגישות</h3>' +
            '<button class="a11y-panel-close" onclick="toggleA11yPanel()" aria-label="סגור">✕</button>' +
          '</div>' +
          '<div class="a11y-options">' +
            '<button class="a11y-option" data-action="font-up" onclick="a11yAction(\'font-up\')"><span class="a11y-icon">🔍</span> הגדלת טקסט</button>' +
            '<button class="a11y-option" data-action="font-down" onclick="a11yAction(\'font-down\')"><span class="a11y-icon">🔎</span> הקטנת טקסט</button>' +
            '<button class="a11y-option" data-action="high-contrast" onclick="a11yAction(\'high-contrast\')"><span class="a11y-icon">◐</span> ניגודיות גבוהה</button>' +
            '<button class="a11y-option" data-action="grayscale" onclick="a11yAction(\'grayscale\')"><span class="a11y-icon">⚫</span> שחור-לבן</button>' +
            '<button class="a11y-option" data-action="highlight-links" onclick="a11yAction(\'highlight-links\')"><span class="a11y-icon">🔗</span> הדגשת קישורים</button>' +
            '<button class="a11y-option" data-action="readable-font" onclick="a11yAction(\'readable-font\')"><span class="a11y-icon">Aa</span> גופן קריא</button>' +
            '<button class="a11y-option" onclick="a11yAction(\'reset\')"><span class="a11y-icon">↺</span> איפוס הגדרות</button>' +
          '</div>' +
          '<a href="' + a11yLink + '" class="a11y-statement-link">הצהרת נגישות</a>' +
        '</div>' +
      '</div>';

    document.body.insertAdjacentHTML('beforeend', html);
    loadA11yState();
  }

  // Close accessibility panel when clicking outside
  document.addEventListener('click', function (e) {
    var widget = document.getElementById('a11yWidget');
    if (widget) {
      var panel = document.getElementById('a11yPanel');
      if (panel && panel.classList.contains('open') && !widget.contains(e.target)) {
        panel.classList.remove('open');
      }
    }
  });

  // ---- FAQ Accordion ----
  window.toggleFaq = function (el) {
    var item = el.parentElement;
    if (item) item.classList.toggle('open');
  };

  // ---- Init on DOMContentLoaded ----
  document.addEventListener('DOMContentLoaded', function () {
    generateParticles();
    initDropdown();
    initContactWidget();
    initAccessibilityWidget();
  });
})();
