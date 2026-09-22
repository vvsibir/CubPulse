/* =========================================================
   УРОВЕНЬ 10 — «Океан»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=10
   ---------------------------------------------------------
   Сгенерированный уровень (7 из 20): длина 10900 px
   (~22.7 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['10'] = {
    id: 10,
    name: 'Level 10',
    length: 10900,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 200, end: 230 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'ocean',
    theme: {
      name: 'Океан',
      colors: {
        playerA: '#7fd4ff',
        playerB: '#2f6bff',
        spike: '#ff7a5c',
        block: '#4dabff',
        blockFill: 'rgba(77,171,255,0.15)',
        platform: '#9fe0ff',
        finishA: '#ffe066',
        finishB: '#4dabff',
        ground: '#4dabff',
      },
    },
    objects: [
    { type: 'platform', x: 452, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 772, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 1092, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 1502, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1632, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1672, y: 600, w: 40, h: 40 },
    { type: 'block', x: 1922, y: 560, w: 80, h: 80 },
    { type: 'block', x: 2102, y: 480, w: 80, h: 160 },
    { type: 'block', x: 2282, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 2618, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 2860, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 3180, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 3500, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 3910, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4040, y: 600, w: 40, h: 40 },
    { type: 'block', x: 4240, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 4290, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 4340, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 4517, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4743, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4991, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5325, y: 600, w: 40, h: 40 },
    { type: 'block', x: 5525, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 5575, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 5625, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 5675, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 5778, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5818, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5858, y: 600, w: 40, h: 40 },
    { type: 'block', x: 6102, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 6352, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6392, y: 600, w: 40, h: 40 },
    { type: 'block', x: 6588, y: 560, w: 80, h: 80 },
    { type: 'block', x: 6938, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 7188, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 7228, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 7424, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 7744, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 8064, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 8474, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 10500, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
