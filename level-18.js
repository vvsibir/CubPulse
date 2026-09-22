/* =========================================================
   УРОВЕНЬ 18 — «Мята»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=18
   ---------------------------------------------------------
   Сгенерированный уровень (15 из 20): длина 18500 px
   (~38.5 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['18'] = {
    id: 18,
    name: 'Level 18',
    length: 18500,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 165, end: 190 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'mint',
    theme: {
      name: 'Мята',
      colors: {
        playerA: '#b8ffe8',
        playerB: '#5ce6c1',
        spike: '#ff9d5c',
        block: '#8ff2d6',
        blockFill: 'rgba(143,242,214,0.15)',
        platform: '#e0fff5',
        finishA: '#ffe066',
        finishB: '#8ff2d6',
        ground: '#8ff2d6',
      },
    },
    objects: [
    { type: 'platform', x: 455, y: 535.2632162859663, w: 143, h: 20 },
    { type: 'platform', x: 853, y: 560, w: 135, h: 20 },
    { type: 'platform', x: 1244, y: 560, w: 168, h: 20 },
    { type: 'platform', x: 1512, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 1832, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 2152, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 2562, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 2692, y: 517.206736006774, w: 165, h: 20 },
    { type: 'platform', x: 3030, y: 457.206736006774, w: 131, h: 20 },
    { type: 'platform', x: 3400, y: 517.206736006774, w: 163, h: 20 },
    { type: 'platform', x: 3724, y: 417.206736006774, w: 136, h: 20 },
    { type: 'platform', x: 4045, y: 337.206736006774, w: 135, h: 20 },
    { type: 'spike', x: 4280, y: 600, w: 40, h: 40 },
    { type: 'block', x: 4480, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 4530, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 4580, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 4630, y: 400, w: 40, h: 40, flip: true },
    { type: 'block', x: 4808, y: 560, w: 80, h: 80 },
    { type: 'block', x: 4988, y: 480, w: 80, h: 160 },
    { type: 'block', x: 5168, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 5577, y: 600, w: 40, h: 40 },
    { type: 'block', x: 5893, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 6143, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6183, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6223, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 6433, y: 531.5606582094915, w: 150, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 6893, y: 560, w: 145, h: 20 },
    { type: 'platform', x: 7216, y: 480, w: 134, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 7660, y: 560, w: 141, h: 20 },
    { type: 'platform', x: 7901, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 8221, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 8541, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 8951, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 9081, y: 489.70965216169134, w: 153, h: 20 },
    { type: 'platform', x: 9448, y: 429.70965216169134, w: 155, h: 20 },
    { type: 'platform', x: 9761, y: 329.70965216169134, w: 162, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 10232, y: 449.70965216169134, w: 147, h: 20 },
    { type: 'platform', x: 10619, y: 409.70965216169134, w: 161, h: 20 },
    { type: 'spike', x: 10880, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10920, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10960, y: 600, w: 40, h: 40 },
    { type: 'block', x: 11221, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 11471, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11511, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11761, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11801, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12141, y: 600, w: 40, h: 40 },
    { type: 'block', x: 12467, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 12717, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12757, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 13007, y: 528.834189993795, w: 143, h: 20 },
    { type: 'platform', x: 13370, y: 468.834189993795, w: 130, h: 20 },
    { type: 'platform', x: 13737, y: 468.834189993795, w: 153, h: 20 },
    { type: 'platform', x: 14127, y: 468.834189993795, w: 138, h: 20 },
    { type: 'platform', x: 14495, y: 528.834189993795, w: 140, h: 20 },
    { type: 'spike', x: 14735, y: 600, w: 40, h: 40 },
    { type: 'block', x: 14935, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 14985, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 15035, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 15279, y: 600, w: 40, h: 40 },
    { type: 'block', x: 15479, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 15529, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 15579, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 15629, y: 400, w: 40, h: 40, flip: true },
    { type: 'block', x: 15831, y: 560, w: 80, h: 80 },
    { type: 'block', x: 16011, y: 480, w: 80, h: 160 },
    { type: 'block', x: 16191, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 16602, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16642, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 18100, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
