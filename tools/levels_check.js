
/* =========================================================
   Экран выбора уровней.
   Уровни НЕ захардкожены: по очереди пытаемся подключить
   level-1.js, level-2.js, ... пока файл не «не найдётся».
   Каждый загруженный скрипт регистрирует себя в
   window.GM_LEVELS — из реестра и строятся карточки.
   ========================================================= */
(function () {
  'use strict';

  const root = window;
  root.GM_LEVELS = root.GM_LEVELS || {};

  // Скорость игрока (CONFIG.SPEED) — только для показа «секунд прохождения»
  const SPEED = 480;

  function buildCard(id, L) {
    const hue1 = (L.bg && L.bg.start !== undefined) ? L.bg.start : 220;
    const hue2 = (L.bg && L.bg.end !== undefined) ? L.bg.end : 280;
    const secs = (L.length / SPEED).toFixed(1);

    const a = document.createElement('a');
    a.className = 'card';
    a.href = 'gm-1.html?level=' + id;
    a.style.background =
      'linear-gradient(135deg, hsl(' + hue1 + ', 60%, 16%), hsl(' + hue2 + ', 70%, 26%))';
    a.innerHTML =
      '<div class="num">' + id + '</div>' +
      '<div class="name">' + (L.name || ('Level ' + id)) + '</div>' +
      '<div class="meta">длина ' + L.length + ' px · ~' + secs + ' сек</div>' +
      '<div class="meta">объектов: ' + (L.objects ? L.objects.length : '?') + '</div>' +
      '<div class="play">Играть →</div>';
    return a;
  }

  function render() {
    const wrap = document.getElementById('levels');
    const status = document.getElementById('status');
    const ids = Object.keys(root.GM_LEVELS)
      .map(Number)
      .filter(function (n) { return !isNaN(n); })
      .sort(function (a, b) { return a - b; });

    if (ids.length === 0) {
      status.textContent = 'Не найдено ни одного уровня — проверь, что рядом лежат файлы level-N.js';
      return;
    }

    const frag = document.createDocumentFragment();
    ids.forEach(function (id) {
      frag.appendChild(buildCard(id, root.GM_LEVELS[id]));
    });
    wrap.appendChild(frag);
  }

  // Проба скриптов по порядку; останавливаемся на первом отсутствующем
  (function probe(id) {
    const s = document.createElement('script');
    s.src = 'level-' + id + '.js';
    s.onload = function () { probe(id + 1); };      // найдено — пробуем следующий
    s.onerror = function () { render(); };          // конец списка — строим карточки
    document.head.appendChild(s);
  })(1);
})();
