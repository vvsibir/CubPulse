/* =========================================================
   УРОВЕНЬ 7 — «Пустыня»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=7
   ---------------------------------------------------------
   Сгенерированный уровень (4 из 20): длина 8050 px
   (~16.8 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['7'] = {
    id: 7,
    name: 'Level 7',
    length: 8050,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 35, end: 55 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'desert',
    theme: {
      name: 'Пустыня',
      colors: {
        playerA: '#ffd97a',
        playerB: '#ff9f45',
        spike: '#8a5a2b',
        block: '#e8b872',
        blockFill: 'rgba(232,184,114,0.15)',
        platform: '#ffe9a8',
        finishA: '#ffd166',
        finishB: '#ff9f45',
        ground: '#e8b872',
      },
    },
    objects: [
    { type: 'spike', x: 445, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 685, y: 526.7449725838378, w: 143, h: 20 },
    { type: 'platform', x: 1048, y: 466.7449725838378, w: 157, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 1497, y: 526.7449725838378, w: 146, h: 20 },
    { type: 'spike', x: 1743, y: 600, w: 40, h: 40 },
    { type: 'block', x: 1943, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 1993, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 2043, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 2119, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2159, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2399, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2439, y: 600, w: 40, h: 40 },
    { type: 'block', x: 2652, y: 560, w: 80, h: 80 },
    { type: 'block', x: 2832, y: 480, w: 80, h: 160 },
    { type: 'block', x: 3012, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 3311, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 3631, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 3951, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 4361, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4491, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4531, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4782, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5022, y: 600, w: 40, h: 40 },
    { type: 'block', x: 5222, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 5272, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 5322, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 5411, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5451, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5698, y: 600, w: 40, h: 40 },
    { type: 'block', x: 5938, y: 560, w: 80, h: 80 },
    { type: 'block', x: 6118, y: 480, w: 80, h: 160 },
    { type: 'block', x: 6298, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 7650, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
