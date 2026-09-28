/* =========================================================
   УРОВЕНЬ 25 — «Янтарь»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=25
   ---------------------------------------------------------
   Сгенерированный уровень (22 из 37): длина 25150 px
   (~52.4 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['25'] = {
    id: 25,
    name: 'Level 25',
    length: 25150,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 40, end: 60 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'amber',
    theme: {
      name: 'Янтарь',
      colors: {
        playerA: '#fff0a3',
        playerB: '#ff9f1c',
        spike: '#ff4d6d',
        block: '#ffc14d',
        blockFill: 'rgba(255,193,77,0.15)',
        platform: '#fff6c9',
        finishA: '#ffffff',
        finishB: '#ffc14d',
        ground: '#ffc14d',
      },
    },
    objects: [
    { type: 'spike', x: 515, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 555, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 891, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 1211, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 1531, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 1941, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2071, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2111, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2151, y: 600, w: 40, h: 40 },
    { type: 'block', x: 2405, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 2655, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2695, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2735, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2945, y: 600, w: 40, h: 40 },
    { type: 'block', x: 3278, y: 560, w: 80, h: 80 },
    { type: 'block', x: 3659, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 3909, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3949, y: 600, w: 40, h: 40 },
    { type: 'block', x: 4199, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 4582, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4622, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4662, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4967, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5007, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5275, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 5542, y: 475.0867146998644, w: 145, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 5949, y: 535.0867146998644, w: 165, h: 20 },
    { type: 'platform', x: 6344, y: 535.0867146998644, w: 131, h: 20 },
    { type: 'platform', x: 6575, y: 490.42593695921823, w: 147, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 7022, y: 560, w: 167, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 7489, y: 560, w: 132, h: 20 },
    { type: 'spike', x: 7721, y: 600, w: 40, h: 40 },
    { type: 'block', x: 7921, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 7971, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8021, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8071, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8230, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8483, y: 600, w: 40, h: 40 },
    { type: 'block', x: 8683, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 8733, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8783, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8833, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 9008, y: 600, w: 40, h: 40 },
    { type: 'block', x: 9208, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 9258, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 9308, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 9358, y: 400, w: 40, h: 40, flip: true },
    { type: 'platform', x: 9553, y: 505.85333118913695, w: 142, h: 20 },
    { type: 'platform', x: 9928, y: 505.85333118913695, w: 131, h: 20 },
    { type: 'platform', x: 10269, y: 445.85333118913695, w: 146, h: 20 },
    { type: 'block', x: 10515, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 10765, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10805, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 11055, y: 525.464789911639, w: 145, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 11458, y: 560, w: 141, h: 20 },
    { type: 'platform', x: 11841, y: 560, w: 131, h: 20 },
    { type: 'platform', x: 12145, y: 500, w: 165, h: 20 },
    { type: 'platform', x: 12504, y: 420, w: 166, h: 20 },
    { type: 'block', x: 12770, y: 560, w: 80, h: 80 },
    { type: 'block', x: 12950, y: 480, w: 80, h: 160 },
    { type: 'block', x: 13130, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 13543, y: 478.2854728773236, w: 169, h: 20 },
    { type: 'platform', x: 13908, y: 438.2854728773236, w: 160, h: 20 },
    { type: 'platform', x: 14223, y: 338.2854728773236, w: 148, h: 20 },
    { type: 'spike', x: 14471, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14511, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 14850, y: 497.06894492264837, w: 148, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 15260, y: 560, w: 133, h: 20 },
    { type: 'platform', x: 15638, y: 560, w: 148, h: 20 },
    { type: 'platform', x: 16030, y: 560, w: 168, h: 20 },
    { type: 'block', x: 16298, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 16673, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16713, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 16981, y: 520.4415403841995, w: 137, h: 20 },
    { type: 'platform', x: 17309, y: 440.44154038419947, w: 168, h: 20 },
    { type: 'platform', x: 17701, y: 400.44154038419947, w: 154, h: 20 },
    { type: 'platform', x: 18051, y: 340.44154038419947, w: 155, h: 20 },
    { type: 'block', x: 18306, y: 560, w: 80, h: 80 },
    { type: 'block', x: 18486, y: 480, w: 80, h: 160 },
    { type: 'block', x: 18666, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 19073, y: 600, w: 40, h: 40 },
    { type: 'block', x: 19355, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 19758, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 20078, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 20398, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 20808, y: 600, w: 40, h: 40 },
    { type: 'block', x: 20938, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 21316, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21356, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21600, y: 600, w: 40, h: 40 },
    { type: 'block', x: 21800, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 21850, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 21900, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 21950, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 22130, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 22170, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 22210, y: 600, w: 40, h: 40 },
    { type: 'block', x: 22471, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 22951, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 23351, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 23751, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 24151, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 24750, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
