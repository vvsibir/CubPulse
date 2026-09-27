/* =========================================================
   Зеркало логики index.html (для быстрой проверки в браузере).
   Карточки 1..20 строятся из реестра window.GM_LEVELS; эти же
   уровни в index.html подключаются ЯВНЫМИ тегами level-1..20.js
   (авто-пробы level-21/22 нет — чтобы не было 404 в консоли).
   В node-окружении падает (нет window) — только для браузера.
   ========================================================= */
(function () {
  'use strict';

  const root = window;
  root.GM_LEVELS = root.GM_LEVELS || {};

  // Скорость игрока (CONFIG.SPEED) — только для показа «секунд прохождения»
  const SPEED = 480;

  // Режим из URL (?mode=...): пробрасывается в ссылки уровней
  const MODE = new URLSearchParams(window.location.search).get('mode') || '';

  const THEME_NAMES = { default: 'Классика' };
  function themeName(L) {
    const t = L.theme;
    if (!t) return '';
    if (typeof t === 'string') return THEME_NAMES[t] || '';
    return t.name || '';
  }

  function buildCard(id, L) {
    const hue1 = (L.bg && L.bg.start !== undefined) ? L.bg.start : 220;
    const hue2 = (L.bg && L.bg.end !== undefined) ? L.bg.end : 280;
    const secs = (L.length / SPEED).toFixed(1);
    const tn = themeName(L);

    const a = document.createElement('a');
    a.className = 'card';
    a.href = 'gm-1.html?level=' + id + (MODE ? '&mode=' + encodeURIComponent(MODE) : '');
    a.style.background =
      'linear-gradient(135deg, hsl(' + hue1 + ', 60%, 16%), hsl(' + hue2 + ', 70%, 26%))';
    a.innerHTML =
      '<div class="num">' + id + '</div>' +
      '<div class="name">' + (window.GM_I18N ? window.GM_I18N.levelName(L.name || ('Level ' + id)) : (L.name || ('Level ' + id))) + '</div>' +
      '<div class="meta">время: ~' + secs + ' сек</div>' +
      '<div class="meta">объектов: ' + (L.objects ? L.objects.length : '?') + '</div>' +
      (tn ? '<div class="meta">тема: ' + tn + '</div>' : '') +
      '<div class="play">Играть →</div>';
    return a;
  }

  function render() {
    const wrap = document.getElementById('levels');
    const status = document.getElementById('status');
    const frag = document.createDocumentFragment();
    let built = 0;
    for (let id = 1; id <= 20; id++) {
      const L = root.GM_LEVELS[id];
      if (!L) continue; // файл level-N.js отсутствует — карточку пропускаем
      frag.appendChild(buildCard(id, L));
      built++;
    }
    if (built === 0) {
      status.textContent = 'Уровни не найдены';
      return;
    }
    wrap.appendChild(frag);
  }

  render();
})();