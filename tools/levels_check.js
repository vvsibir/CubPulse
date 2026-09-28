/* =========================================================
   Зеркало логики index.html (для быстрой проверки в браузере).
   Карточки 1..40 строятся из реестра window.GM_LEVELS; эти же
   уровни в index.html подключаются ЯВНЫМИ тегами level-1..40.js
   (авто-пробы level-41/42 нет — чтобы не было 404 в консоли).
   Пагинация по PER_PAGE карточек на страницу (страницы в #pager).
   В node-окружении падает (нет window) — только для браузера.
   ========================================================= */
(function () {
  'use strict';

  const root = window;
  root.GM_LEVELS = root.GM_LEVELS || {};

  // Скорость игрока (CONFIG.SPEED) — только для показа «секунд прохождения»
  const SPEED = 480;

  // Карточек на страницу (4 в ряд × 1 ряд; 40 уровней → 10 страниц)
  const PER_PAGE = 4;

  // Режим из URL (?mode=...): пробрасывается в ссылки уровней
  const MODE = new URLSearchParams(window.location.search).get('mode') || '';

  // Текущая страница (0-based)
  let page = 0;

  const THEME_NAMES = { default: 'Классика' };
  function themeName(L) {
    const t = L.theme;
    if (!t) return '';
    if (typeof t === 'string') return THEME_NAMES[t] || '';
    return t.name || '';
  }

  function levelIds() {
    const ids = [];
    for (let id = 1; id <= 40; id++) if (root.GM_LEVELS[id]) ids.push(id);
    return ids;
  }
  function pageCount(n) { return Math.max(1, Math.ceil(n / PER_PAGE)); }

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

  function renderPager(pager, cur, total) {
    const btn = (label, active, disabled, on) => {
      const b = document.createElement('button');
      b.className = 'page-btn' + (active ? ' page-btn--active' : '');
      b.innerHTML = label;
      b.disabled = disabled;
      if (on) b.addEventListener('click', on);
      return b;
    };
    pager.textContent = '';
    pager.appendChild(btn('‹', false, cur === 0, () => { page = cur - 1; render(); }));
    for (let i = 0; i < total; i++) {
      pager.appendChild(btn(String(i + 1), i === cur, i === cur, () => { page = i; render(); }));
    }
    pager.appendChild(btn('›', false, cur === total - 1, () => { page = cur + 1; render(); }));
  }

  function render() {
    const wrap = document.getElementById('levels');
    const status = document.getElementById('status');
    const pager = document.getElementById('pager');
    const ids = levelIds();

    if (ids.length === 0) {
      status.textContent = 'Уровни не найдены';
      return;
    }

    const total = pageCount(ids.length);
    if (page >= total) page = total - 1;

    wrap.textContent = '';
    const from = page * PER_PAGE;
    const to = Math.min(from + PER_PAGE, ids.length);
    for (let i = from; i < to; i++) {
      wrap.appendChild(buildCard(ids[i], root.GM_LEVELS[ids[i]]));
    }

    renderPager(pager, page, total);
  }

  // Масштабирование сетки под экран: карточки не уползают за край, пагинация всегда внизу
  function resize() {
    const stage = document.getElementById('stage');
    const lv = document.getElementById('levels');
    if (!stage || !lv) return;
    const W = lv.offsetWidth;
    const H = lv.offsetHeight;
    if (!W || !H) return;
    const sw = window.innerWidth - 32;
    const sh = window.innerHeight - 32;
    const scale = Math.min(1, sw / W, sh / H);
    stage.style.transform = scale === 1 ? '' : 'scale(' + scale + ')';
  }
  if (window.addEventListener) {
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
  }

  render();
  resize();
})();