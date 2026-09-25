/* =========================================================
   УРОВЕНЬ 19 — «Сланец»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=19
   ---------------------------------------------------------
   Сгенерированный уровень (16 из 20): длина 19450 px
   (~40.5 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['19'] = {
    id: 19,
    name: 'Level 19',
    length: 19450,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 215, end: 245 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'slate',
    theme: {
      name: 'Сланец',
      colors: {
        playerA: '#e8f0ff',
        playerB: '#94a8d6',
        spike: '#ff8c5c',
        block: '#a8b8e0',
        blockFill: 'rgba(168,184,224,0.15)',
        platform: '#e0e8ff',
        finishA: '#ffd166',
        finishB: '#a8b8e0',
        ground: '#a8b8e0',
      },
    },
    objects: [
    { type: 'block', x: 495, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 745, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 785, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 825, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1035, y: 600, w: 40, h: 40 },
    { type: 'block', x: 1235, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 1285, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1335, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1385, y: 400, w: 40, h: 40, flip: true },
    { type: 'block', x: 1592, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 1882, y: 600, w: 40, h: 40 },
    { type: 'block', x: 2132, y: 560, w: 80, h: 80 },
    { type: 'block', x: 2312, y: 480, w: 80, h: 160 },
    { type: 'block', x: 2492, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 2856, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2896, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2936, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 3209, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 3529, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 3849, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 4259, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 4389, y: 518.2705102791078, w: 130, h: 20 },
    { type: 'platform', x: 4780, y: 560, w: 160, h: 20 },
    { type: 'platform', x: 5146, y: 500, w: 135, h: 20 },
    { type: 'platform', x: 5451, y: 420, w: 139, h: 20 },
    { type: 'platform', x: 5824, y: 420, w: 166, h: 20 },
    { type: 'spike', x: 6090, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6130, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6453, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6493, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6533, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 6863, y: 514.2338534630835, w: 131, h: 20 },
    { type: 'platform', x: 7214, y: 514.2338534630835, w: 151, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 7658, y: 560, w: 161, h: 20 },
    { type: 'spike', x: 7919, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 7959, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8212, y: 600, w: 40, h: 40 },
    { type: 'block', x: 8412, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 8462, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8512, y: 400, w: 40, h: 40, flip: true },
    { type: 'platform', x: 8741, y: 488.7462756363675, w: 134, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 9152, y: 560, w: 168, h: 20 },
    { type: 'platform', x: 9507, y: 500, w: 155, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 9939, y: 560, w: 164, h: 20 },
    { type: 'spike', x: 10202, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 10495, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 10815, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 11135, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 11545, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11675, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11715, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11755, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 12094, y: 512.6632490917109, w: 158, h: 20 },
    { type: 'platform', x: 12409, y: 412.6632490917109, w: 147, h: 20 },
    { type: 'platform', x: 12768, y: 352.6632490917109, w: 143, h: 20 },
    { type: 'spike', x: 13011, y: 600, w: 40, h: 40 },
    { type: 'block', x: 13211, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 13261, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 13311, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 13361, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 13544, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 13584, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 13624, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 13928, y: 499.6934849466197, w: 136, h: 20 },
    { type: 'platform', x: 14229, y: 399.6934849466197, w: 166, h: 20 },
    { type: 'platform', x: 14617, y: 399.6934849466197, w: 162, h: 20 },
    { type: 'block', x: 14880, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 15130, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15170, y: 600, w: 40, h: 40 },
    { type: 'block', x: 15420, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 15670, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15710, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15960, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16000, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16040, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 16290, y: 533.6288616550155, w: 148, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 16694, y: 560, w: 136, h: 20 },
    { type: 'platform', x: 16998, y: 480, w: 143, h: 20 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 19050, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
