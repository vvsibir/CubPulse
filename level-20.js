/* =========================================================
   УРОВЕНЬ 20 — «Радуга»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=20
   ---------------------------------------------------------
   Сгенерированный уровень (17 из 20): длина 20400 px
   (~42.5 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['20'] = {
    id: 20,
    name: 'Level 20',
    length: 20400,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 0, end: 360 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'rainbow',
    theme: {
      name: 'Радуга',
      colors: {
        playerA: '#ff9e9e',
        playerB: '#9e9eff',
        spike: '#9eff9e',
        block: '#ffe08f',
        blockFill: 'rgba(255,224,143,0.15)',
        platform: '#8fffe0',
        finishA: '#ffffff',
        finishB: '#ffb3ec',
        ground: '#ffe08f',
      },
    },
    objects: [
    { type: 'platform', x: 557, y: 492.03713885275647, w: 158, h: 20 },
    { type: 'platform', x: 907, y: 452.03713885275647, w: 168, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 1358, y: 512.0371388527565, w: 133, h: 20 },
    { type: 'platform', x: 1710, y: 452.03713885275647, w: 133, h: 20 },
    { type: 'platform', x: 1943, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 2263, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 2583, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 2993, y: 600, w: 40, h: 40 },
    { type: 'block', x: 3123, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 3373, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3413, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3663, y: 600, w: 40, h: 40 },
    { type: 'block', x: 3863, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 3913, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 3963, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 4164, y: 600, w: 40, h: 40 },
    { type: 'block', x: 4364, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 4414, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 4464, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 4666, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4706, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4746, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 5019, y: 470.90115499915555, w: 138, h: 20 },
    { type: 'platform', x: 5308, y: 370.90115499915555, w: 133, h: 20 },
    { type: 'platform', x: 5607, y: 300, w: 148, h: 20 },
    { type: 'spike', x: 5855, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5895, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5935, y: 600, w: 40, h: 40 },
    { type: 'block', x: 6197, y: 480, w: 80, h: 160 },
    { type: 'block', x: 6377, y: 400, w: 80, h: 240 },
    { type: 'block', x: 6557, y: 480, w: 80, h: 160 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 6969, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 7289, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 7609, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 8019, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8149, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8189, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8229, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 8488, y: 512.3859790177085, w: 132, h: 20 },
    { type: 'platform', x: 8857, y: 560, w: 163, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 9285, y: 560, w: 163, h: 20 },
    { type: 'platform', x: 9685, y: 560, w: 152, h: 20 },
    { type: 'platform', x: 10074, y: 560, w: 158, h: 20 },
    { type: 'platform', x: 10332, y: 514.0513058123179, w: 162, h: 20 },
    { type: 'platform', x: 10709, y: 474.0513058123179, w: 146, h: 20 },
    { type: 'platform', x: 11069, y: 414.0513058123179, w: 155, h: 20 },
    { type: 'platform', x: 11462, y: 414.0513058123179, w: 169, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 11884, y: 474.0513058123179, w: 156, h: 20 },
    { type: 'spike', x: 12140, y: 600, w: 40, h: 40 },
    { type: 'block', x: 12340, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 12390, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 12440, y: 400, w: 40, h: 40, flip: true },
    { type: 'platform', x: 12648, y: 518.8612196780741, w: 164, h: 20 },
    { type: 'platform', x: 12962, y: 418.8612196780741, w: 133, h: 20 },
    { type: 'platform', x: 13321, y: 418.8612196780741, w: 156, h: 20 },
    { type: 'platform', x: 13704, y: 418.8612196780741, w: 163, h: 20 },
    { type: 'spike', x: 13966, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14006, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14046, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14308, y: 600, w: 40, h: 40 },
    { type: 'block', x: 14508, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 14558, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14608, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14658, y: 400, w: 40, h: 40, flip: true },
    { type: 'platform', x: 14833, y: 499.3552783410996, w: 167, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 15283, y: 559.3552783410996, w: 134, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 15691, y: 560, w: 155, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 16129, y: 560, w: 165, h: 20 },
    { type: 'block', x: 16394, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 16644, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16684, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16934, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 17189, y: 600, w: 40, h: 40 },
    { type: 'block', x: 17389, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 17439, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 17489, y: 400, w: 40, h: 40, flip: true },
    { type: 'block', x: 17748, y: 480, w: 80, h: 160 },
    { type: 'block', x: 17928, y: 400, w: 80, h: 240 },
    { type: 'block', x: 18108, y: 480, w: 80, h: 160 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 20000, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
