/* =========================================================
   УРОВЕНЬ 22 — «Тайфун»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=22
   ---------------------------------------------------------
   Сгенерированный уровень (19 из 37): длина 22300 px
   (~46.5 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['22'] = {
    id: 22,
    name: 'Level 22',
    length: 22300,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 195, end: 215 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'typhoon',
    theme: {
      name: 'Тайфун',
      colors: {
        playerA: '#b8ffd9',
        playerB: '#2bd9a3',
        spike: '#ff5ca8',
        block: '#5cf2c1',
        blockFill: 'rgba(92,242,193,0.15)',
        platform: '#d4ffe9',
        finishA: '#ffe066',
        finishB: '#5cf2c1',
        ground: '#5cf2c1',
      },
    },
    objects: [
    { type: 'block', x: 589, y: 560, w: 80, h: 80 },
    { type: 'block', x: 769, y: 480, w: 80, h: 160 },
    { type: 'block', x: 949, y: 560, w: 80, h: 80 },
    { type: 'block', x: 1311, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 1561, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1601, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1641, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1851, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1891, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1931, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2207, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2247, y: 600, w: 40, h: 40 },
    { type: 'block', x: 2516, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 2928, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 3248, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 3568, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 3978, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 4108, y: 493.6288100271486, w: 156, h: 20 },
    { type: 'platform', x: 4476, y: 493.6288100271486, w: 155, h: 20 },
    { type: 'platform', x: 4835, y: 453.6288100271486, w: 164, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 5283, y: 560, w: 158, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 5731, y: 560, w: 164, h: 20 },
    { type: 'block', x: 5994, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 6244, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6284, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6324, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6534, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6574, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6897, y: 600, w: 40, h: 40 },
    { type: 'block', x: 7152, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 7402, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 7442, y: 600, w: 40, h: 40 },
    { type: 'block', x: 7692, y: 560, w: 80, h: 80 },
    { type: 'block', x: 8080, y: 560, w: 80, h: 80 },
    { type: 'block', x: 8451, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 8817, y: 478.31448598764837, w: 145, h: 20 },
    { type: 'platform', x: 9156, y: 438.31448598764837, w: 168, h: 20 },
    { type: 'platform', x: 9477, y: 338.31448598764837, w: 151, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 9912, y: 458.31448598764837, w: 142, h: 20 },
    { type: 'spike', x: 10154, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10194, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10234, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10542, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10582, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10826, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11106, y: 600, w: 40, h: 40 },
    { type: 'block', x: 11438, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 11814, y: 518.4157615806907, w: 144, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 12219, y: 560, w: 152, h: 20 },
    { type: 'platform', x: 12551, y: 500, w: 160, h: 20 },
    { type: 'platform', x: 12811, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 13131, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 13451, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 13861, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 13991, y: 600, w: 40, h: 40 },
    { type: 'block', x: 14191, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 14241, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14291, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14341, y: 480, w: 40, h: 40, flip: true },
    { type: 'platform', x: 14514, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 14834, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 15154, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 15564, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15694, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15734, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15774, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16074, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16114, y: 600, w: 40, h: 40 },
    { type: 'block', x: 16358, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 16608, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16648, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 16898, y: 510.3749978542328, w: 141, h: 20 },
    { type: 'platform', x: 17225, y: 430.3749978542328, w: 158, h: 20 },
    { type: 'platform', x: 17601, y: 430.3749978542328, w: 170, h: 20 },
    { type: 'platform', x: 17957, y: 350.3749978542328, w: 155, h: 20 },
    { type: 'platform', x: 18212, y: 517.869767495431, w: 144, h: 20 },
    { type: 'platform', x: 18557, y: 477.869767495431, w: 158, h: 20 },
    { type: 'platform', x: 18907, y: 417.869767495431, w: 155, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 19354, y: 537.869767495431, w: 160, h: 20 },
    { type: 'block', x: 19614, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 19864, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 19904, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 19944, y: 600, w: 40, h: 40 },
    { type: 'block', x: 20154, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 20404, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20444, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20694, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20734, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 21174, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21574, y: 600, w: 40, h: 40 },
    { type: 'finish', x: 21900, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
