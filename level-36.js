/* =========================================================
   УРОВЕНЬ 36 — «Смальта»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=36
   ---------------------------------------------------------
   Сгенерированный уровень (33 из 37): длина 35600 px
   (~74.2 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['36'] = {
    id: 36,
    name: 'Level 36',
    length: 35600,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 210, end: 235 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'smalt',
    theme: {
      name: 'Смальта',
      colors: {
        playerA: '#c3e4ff',
        playerB: '#4d8fff',
        spike: '#ff8c5c',
        block: '#8fb8ff',
        blockFill: 'rgba(143,184,255,0.15)',
        platform: '#d8ecff',
        finishA: '#ffd166',
        finishB: '#8fb8ff',
        ground: '#8fb8ff',
      },
    },
    objects: [
    { type: 'block', x: 505, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 867, y: 493.4037759480998, w: 147, h: 20 },
    { type: 'platform', x: 1187, y: 413.4037759480998, w: 157, h: 20 },
    { type: 'platform', x: 1512, y: 313.4037759480998, w: 161, h: 20 },
    { type: 'spike', x: 1773, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1813, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1853, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2123, y: 600, w: 40, h: 40 },
    { type: 'block', x: 2323, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 2373, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 2423, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 2473, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 2658, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2698, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2738, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 2987, y: 488.49087389186025, w: 141, h: 20 },
    { type: 'platform', x: 3283, y: 388.49087389186025, w: 162, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 3718, y: 508.49087389186025, w: 143, h: 20 },
    { type: 'platform', x: 4081, y: 468.49087389186025, w: 144, h: 20 },
    { type: 'platform', x: 4380, y: 368.49087389186025, w: 140, h: 20 },
    { type: 'spike', x: 4620, y: 600, w: 40, h: 40 },
    { type: 'block', x: 4820, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 4870, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 4920, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 4970, y: 480, w: 40, h: 40, flip: true },
    { type: 'platform', x: 5150, y: 494.1250756685622, w: 160, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 5565, y: 560, w: 151, h: 20 },
    { type: 'platform', x: 5919, y: 500, w: 153, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 6327, y: 560, w: 132, h: 20 },
    { type: 'block', x: 6559, y: 560, w: 80, h: 80 },
    { type: 'block', x: 6739, y: 480, w: 80, h: 160 },
    { type: 'block', x: 6919, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 7270, y: 600, w: 40, h: 40 },
    { type: 'block', x: 7470, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 7520, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7570, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7791, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 7831, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 7871, y: 600, w: 40, h: 40 },
    { type: 'block', x: 8153, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 8403, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8443, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 8693, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 9013, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 9333, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 9743, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9873, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9913, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9953, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10243, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10283, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10323, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10612, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10875, y: 600, w: 40, h: 40 },
    { type: 'block', x: 11075, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 11125, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 11175, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 11431, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11471, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11511, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11764, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11804, y: 600, w: 40, h: 40 },
    { type: 'block', x: 12137, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 12387, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12427, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12677, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12717, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12757, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 13086, y: 501.699086939916, w: 146, h: 20 },
    { type: 'platform', x: 13454, y: 461.699086939916, w: 131, h: 20 },
    { type: 'platform', x: 13755, y: 381.699086939916, w: 155, h: 20 },
    { type: 'platform', x: 14131, y: 341.699086939916, w: 148, h: 20 },
    { type: 'spike', x: 14380, y: 600, w: 40, h: 40 },
    { type: 'block', x: 14580, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 14630, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14680, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14730, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14909, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14949, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14989, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15239, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 15550, y: 529.7389752906747, w: 169, h: 20 },
    { type: 'platform', x: 15937, y: 489.7389752906747, w: 140, h: 20 },
    { type: 'platform', x: 16296, y: 449.7389752906747, w: 138, h: 20 },
    { type: 'platform', x: 16595, y: 349.7389752906747, w: 163, h: 20 },
    { type: 'spike', x: 16857, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16897, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 17226, y: 506.5743696014397, w: 164, h: 20 },
    { type: 'platform', x: 17579, y: 426.5743696014397, w: 141, h: 20 },
    { type: 'platform', x: 17884, y: 326.5743696014397, w: 139, h: 20 },
    { type: 'platform', x: 18123, y: 471.6936525795609, w: 168, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 18575, y: 531.6936525795609, w: 147, h: 20 },
    { type: 'platform', x: 18943, y: 491.6936525795609, w: 165, h: 20 },
    { type: 'spike', x: 19208, y: 600, w: 40, h: 40 },
    { type: 'block', x: 19408, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 19458, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 19508, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 19762, y: 600, w: 40, h: 40 },
    { type: 'block', x: 19962, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 20012, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 20062, y: 480, w: 40, h: 40, flip: true },
    { type: 'platform', x: 20319, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 20639, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 20959, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 21369, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21499, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21539, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21579, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21871, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21911, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 22179, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 22516, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 22556, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 22596, y: 600, w: 40, h: 40 },
    { type: 'block', x: 22933, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 23183, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 23223, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 23473, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 23513, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 23553, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 23826, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 23866, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 23906, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 24157, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 24477, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 24797, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 25207, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 25337, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 25377, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 25417, y: 600, w: 40, h: 40 },
    { type: 'block', x: 25708, y: 560, w: 80, h: 80 },
    { type: 'block', x: 25888, y: 480, w: 80, h: 160 },
    { type: 'block', x: 26068, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 26432, y: 600, w: 40, h: 40 },
    { type: 'block', x: 26734, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'block', x: 27274, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 27524, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 27564, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 27604, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 27814, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 28134, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 28454, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 28864, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 28994, y: 535.6460468866862, w: 154, h: 20 },
    { type: 'platform', x: 29304, y: 435.64604688668624, w: 159, h: 20 },
    { type: 'platform', x: 29619, y: 335.64604688668624, w: 151, h: 20 },
    { type: 'platform', x: 29981, y: 335.64604688668624, w: 154, h: 20 },
    { type: 'platform', x: 30303, y: 300, w: 161, h: 20 },
    { type: 'spike', x: 30564, y: 600, w: 40, h: 40 },
    { type: 'block', x: 30764, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 30814, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 30864, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 30914, y: 480, w: 40, h: 40, flip: true },
    { type: 'platform', x: 31094, y: 502.3085309425369, w: 143, h: 20 },
    { type: 'platform', x: 31488, y: 502.3085309425369, w: 140, h: 20 },
    { type: 'platform', x: 31790, y: 422.3085309425369, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 32230, y: 542.3085309425369, w: 155, h: 20 },
    { type: 'platform', x: 32618, y: 560, w: 140, h: 20 },
    { type: 'block', x: 32857, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 33397, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 33437, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 33477, y: 600, w: 40, h: 40 },
    { type: 'block', x: 33734, y: 560, w: 80, h: 80 },
    { type: 'block', x: 33914, y: 480, w: 80, h: 160 },
    { type: 'block', x: 34094, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 34574, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 35200, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
