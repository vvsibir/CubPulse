/* =========================================================
   УРОВЕНЬ 23 — «Гранат»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=23
   ---------------------------------------------------------
   Сгенерированный уровень (20 из 37): длина 23250 px
   (~48.4 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['23'] = {
    id: 23,
    name: 'Level 23',
    length: 23250,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 345, end: 15 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'garnet',
    theme: {
      name: 'Гранат',
      colors: {
        playerA: '#ff9eab',
        playerB: '#d62b4d',
        spike: '#ffe066',
        block: '#ff5e7a',
        blockFill: 'rgba(255,94,122,0.15)',
        platform: '#ffc9d1',
        finishA: '#ffffff',
        finishB: '#ff5e7a',
        ground: '#ff5e7a',
      },
    },
    objects: [
    { type: 'block', x: 500, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 750, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 790, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1040, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1080, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1120, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1403, y: 600, w: 40, h: 40 },
    { type: 'block', x: 1603, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 1653, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1703, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 1942, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 2192, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2232, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2272, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2482, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2522, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2562, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 2870, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 3190, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 3510, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 3920, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 4050, y: 487.8703874233179, w: 133, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 4478, y: 560, w: 164, h: 20 },
    { type: 'platform', x: 4808, y: 460, w: 144, h: 20 },
    { type: 'block', x: 5053, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 5415, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 5686, y: 472.81315814703703, w: 158, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 6091, y: 532.813158147037, w: 163, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 6522, y: 532.813158147037, w: 156, h: 20 },
    { type: 'spike', x: 6779, y: 600, w: 40, h: 40 },
    { type: 'block', x: 6979, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 7029, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7079, y: 480, w: 40, h: 40, flip: true },
    { type: 'platform', x: 7313, y: 501.8841902865097, w: 142, h: 20 },
    { type: 'platform', x: 7625, y: 401.8841902865097, w: 164, h: 20 },
    { type: 'platform', x: 8002, y: 341.8841902865097, w: 157, h: 20 },
    { type: 'platform', x: 8259, y: 513.3610982098617, w: 135, h: 20 },
    { type: 'platform', x: 8596, y: 473.36109820986167, w: 159, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 9010, y: 473.36109820986167, w: 130, h: 20 },
    { type: 'platform', x: 9324, y: 413.36109820986167, w: 137, h: 20 },
    { type: 'platform', x: 9695, y: 473.36109820986167, w: 165, h: 20 },
    { type: 'spike', x: 9960, y: 600, w: 40, h: 40 },
    { type: 'block', x: 10160, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 10210, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10260, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10310, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10464, y: 600, w: 40, h: 40 },
    { type: 'block', x: 10664, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 10714, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10764, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 10985, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 11235, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11275, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11315, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11525, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11802, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11842, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11882, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12149, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12189, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12229, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12541, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12856, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12896, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12936, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 13208, y: 523.779063608963, w: 138, h: 20 },
    { type: 'platform', x: 13531, y: 443.77906360896304, w: 156, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 13993, y: 560, w: 145, h: 20 },
    { type: 'platform', x: 14295, y: 460, w: 139, h: 20 },
    { type: 'platform', x: 14534, y: 532.772402134724, w: 161, h: 20 },
    { type: 'platform', x: 14927, y: 492.77240213472396, w: 136, h: 20 },
    { type: 'platform', x: 15273, y: 492.77240213472396, w: 144, h: 20 },
    { type: 'platform', x: 15573, y: 392.77240213472396, w: 149, h: 20 },
    { type: 'platform', x: 15821, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 16141, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 16461, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 16871, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 17001, y: 600, w: 40, h: 40 },
    { type: 'block', x: 17201, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 17251, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 17301, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 17351, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 17502, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 17542, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 17582, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 17844, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18106, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18146, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18186, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18456, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18496, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18536, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18797, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18837, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18877, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 19168, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 19498, y: 517.1245805779472, w: 140, h: 20 },
    { type: 'platform', x: 19848, y: 477.1245805779472, w: 161, h: 20 },
    { type: 'platform', x: 20172, y: 397.1245805779472, w: 140, h: 20 },
    { type: 'spike', x: 20412, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20738, y: 600, w: 40, h: 40 },
    { type: 'block', x: 20938, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 20988, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 21038, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 21282, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 21762, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 22162, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 22850, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
