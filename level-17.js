/* =========================================================
   УРОВЕНЬ 17 — «Неон-розовый»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=17
   ---------------------------------------------------------
   Сгенерированный уровень (14 из 20): длина 17550 px
   (~36.6 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['17'] = {
    id: 17,
    name: 'Level 17',
    length: 17550,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 300, end: 330 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'neon',
    musicSpeed: 2, // мелодия ускорена в 2 раза (304 BPM по шагу 16-х)
    theme: {
      name: 'Неон-розовый',
      colors: {
        playerA: '#ffb3ec',
        playerB: '#ff3d9e',
        spike: '#66e0ff',
        block: '#ff6bb5',
        blockFill: 'rgba(255,107,181,0.15)',
        platform: '#ffd6f0',
        finishA: '#66e0ff',
        finishB: '#ff6bb5',
        ground: '#ff6bb5',
      },
    },
    objects: [
    { type: 'spike', x: 556, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 596, y: 600, w: 40, h: 40 },
    { type: 'block', x: 874, y: 560, w: 80, h: 80 },
    { type: 'block', x: 1054, y: 480, w: 80, h: 160 },
    { type: 'block', x: 1234, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 1601, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 1919, y: 528.5307601420209, w: 143, h: 20 },
    { type: 'platform', x: 2229, y: 448.5307601420209, w: 135, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 2686, y: 560, w: 145, h: 20 },
    { type: 'spike', x: 2699, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 2739, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 2779, y: 580, w: 40, h: 40, flip: true },
    { type: 'platform', x: 2931, y: 560, w: 140, h: 20 },
    { type: 'spike', x: 2941, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 2981, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 3021, y: 580, w: 40, h: 40, flip: true },
    { type: 'platform', x: 3251, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 3571, y: 560, w: 140, h: 20 },
    { type: 'spike', x: 3581, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 3621, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 3661, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 3981, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 4111, y: 497.8837360511534, w: 149, h: 20 },
    { type: 'platform', x: 4444, y: 437.8837360511534, w: 158, h: 20 },
    { type: 'platform', x: 4755, y: 337.8837360511534, w: 153, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 5156, y: 337.8837360511534, w: 160, h: 20 },
    { type: 'platform', x: 5416, y: 485.18056597793475, w: 141, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 5840, y: 545.1805659779347, w: 162, h: 20 },
    { type: 'platform', x: 6229, y: 505.18056597793475, w: 131, h: 20 },
    { type: 'platform', x: 6459, y: 560, w: 140, h: 20 },
    { type: 'spike', x: 6469, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 6509, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 6549, y: 580, w: 40, h: 40, flip: true },
    { type: 'platform', x: 6779, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 7099, y: 560, w: 140, h: 20 },
    { type: 'spike', x: 7109, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7149, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7189, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7509, y: 600, w: 40, h: 40 },
    { type: 'block', x: 7639, y: 560, w: 80, h: 80 },
    { type: 'block', x: 7819, y: 480, w: 80, h: 160 },
    { type: 'block', x: 7999, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'block', x: 8417, y: 560, w: 80, h: 80 },
    { type: 'block', x: 8597, y: 480, w: 80, h: 160 },
    { type: 'block', x: 8777, y: 560, w: 80, h: 80 },
    { type: 'block', x: 9171, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 9570, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9610, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9650, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 9932, y: 475.10749036911875, w: 159, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 10360, y: 560, w: 158, h: 20 },
    { type: 'spike', x: 10379, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10419, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10459, y: 580, w: 40, h: 40, flip: true },
    { type: 'platform', x: 10711, y: 480, w: 165, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 11129, y: 540, w: 131, h: 20 },
    { type: 'platform', x: 11529, y: 560, w: 166, h: 20 },
    { type: 'spike', x: 11552, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 11592, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 11632, y: 580, w: 40, h: 40, flip: true },
    { type: 'spike', x: 11795, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11835, y: 600, w: 40, h: 40 },
    { type: 'block', x: 12079, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'block', x: 12619, y: 560, w: 80, h: 80 },
    { type: 'block', x: 12799, y: 480, w: 80, h: 160 },
    { type: 'block', x: 12979, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'block', x: 13389, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 13639, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 13679, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 13719, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 13929, y: 600, w: 40, h: 40 },
    { type: 'block', x: 14129, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 14179, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14229, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14279, y: 400, w: 40, h: 40, flip: true },
    { type: 'block', x: 14463, y: 560, w: 80, h: 80 },
    { type: 'block', x: 14643, y: 480, w: 80, h: 160 },
    { type: 'block', x: 14823, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 15222, y: 600, w: 40, h: 40 },
    { type: 'block', x: 15422, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 15472, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 15522, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 15572, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 15768, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15808, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 17150, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
