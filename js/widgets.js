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

  // ---- Floating Bottom Buttons (WA, TG, Accessibility) ----
  function initFloatingButtons() {
    var container = document.createElement('div');
    container.className = 'floating-btns';
    container.innerHTML =
      '<a href="https://wa.me/message/6HUAMNFA4B67K1" target="_blank" rel="noopener" class="float-btn float-btn-wa" aria-label="וואטסאפ" title="וואטסאפ">' +
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>' +
      '</a>' +
      '<a href="https://t.me/PeptideCenterIL" target="_blank" rel="noopener" class="float-btn float-btn-tg" aria-label="טלגרם" title="טלגרם">' +
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>' +
      '</a>' +
      '<button class="float-btn float-btn-a11y" onclick="toggleA11yPanel()" aria-label="נגישות" title="נגישות">' +
        '<span class="a11y-icon-text">♿</span>' +
      '</button>';

    document.body.appendChild(container);

    // Auto-hide floating buttons on mobile when scrolling down
    if (window.innerWidth <= 768) {
      var lastScrollY = window.scrollY;
      var hideTimer = null;
      window.addEventListener('scroll', function () {
        var currentY = window.scrollY;
        if (currentY > lastScrollY && currentY > 100) {
          container.classList.add('hidden');
        } else {
          container.classList.remove('hidden');
        }
        lastScrollY = currentY;
        // Show buttons after user stops scrolling
        clearTimeout(hideTimer);
        hideTimer = setTimeout(function () {
          container.classList.remove('hidden');
        }, 1500);
      }, { passive: true });
    }
  }

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
    // Attach panel to the a11y floating button
    var a11yBtn = document.querySelector('.float-btn-a11y');
    if (!a11yBtn) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'a11y-widget';
    wrapper.id = 'a11yWidget';
    // Move button into wrapper
    a11yBtn.parentNode.insertBefore(wrapper, a11yBtn);
    wrapper.appendChild(a11yBtn);

    var panel = document.createElement('div');
    panel.className = 'a11y-panel';
    panel.id = 'a11yPanel';
    panel.innerHTML =
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
      '<a href="' + a11yLink + '" class="a11y-statement-link">הצהרת נגישות</a>';

    wrapper.appendChild(panel);
    loadA11yState();
  }

  // Close accessibility panel when clicking outside (delayed to avoid same-click close)
  document.addEventListener('click', function (e) {
    var widget = document.getElementById('a11yWidget');
    if (!widget) return;
    var panel = document.getElementById('a11yPanel');
    if (!panel || !panel.classList.contains('open')) return;
    // Don't close if click is on the widget itself (button or panel)
    if (widget.contains(e.target)) return;
    panel.classList.remove('open');
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
    initFloatingButtons();
    initAccessibilityWidget();
  });
})();
