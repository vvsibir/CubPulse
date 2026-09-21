/* =========================================================
   УРОВЕНЬ 8 — «Космос»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=8
   ---------------------------------------------------------
   Сгенерированный уровень (5 из 20): длина 9000 px
   (~18.8 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['8'] = {
    id: 8,
    name: 'Level 8',
    length: 9000,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 275, end: 305 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'cosmos',
    theme: {
      name: 'Космос',
      colors: {
        playerA: '#e0b3ff',
        playerB: '#7a5cff',
        spike: '#ff5ca8',
        block: '#b48aff',
        blockFill: 'rgba(180,138,255,0.15)',
        platform: '#d9c9ff',
        finishA: '#ff5ca8',
        finishB: '#7a5cff',
        ground: '#7a5cff',
      },
    },
    objects: [
    { type: 'spike', x: 468, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 708, y: 600, w: 40, h: 40 },
    { type: 'block', x: 948, y: 480, w: 80, h: 160 },
    { type: 'platform', x: 1276, y: 514.387302226387, w: 154, h: 20 },
    { type: 'platform', x: 1638, y: 474.38730222638696, w: 151, h: 20 },
    { type: 'platform', x: 2002, y: 474.38730222638696, w: 131, h: 20 },
    { type: 'spike', x: 2232, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2272, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2521, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2561, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2601, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2817, y: 600, w: 40, h: 40 },
    { type: 'block', x: 3017, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 3067, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 3117, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 3167, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 3209, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3249, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 3449, y: 473.8360935379751, w: 150, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 3924, y: 560, w: 146, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 4395, y: 560, w: 137, h: 20 },
    { type: 'platform', x: 4739, y: 520, w: 165, h: 20 },
    { type: 'spike', x: 5004, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5244, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5284, y: 600, w: 40, h: 40 },
    { type: 'block', x: 5508, y: 480, w: 80, h: 160 },
    { type: 'spike', x: 5814, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 6054, y: 535.3528658626601, w: 136, h: 20 },
    { type: 'platform', x: 6348, y: 435.3528658626601, w: 132, h: 20 },
    { type: 'platform', x: 6695, y: 435.3528658626601, w: 153, h: 20 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 8600, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
