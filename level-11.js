/* =========================================================
   УРОВЕНЬ 11 — «Вишня»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=11
   ---------------------------------------------------------
   Сгенерированный уровень (8 из 20): длина 11850 px
   (~24.7 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['11'] = {
    id: 11,
    name: 'Level 11',
    length: 11850,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 340, end: 360 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'cherry',
    theme: {
      name: 'Вишня',
      colors: {
        playerA: '#ff9ec2',
        playerB: '#e8355e',
        spike: '#ffd166',
        block: '#ff6b8f',
        blockFill: 'rgba(255,107,143,0.15)',
        platform: '#ffc2d1',
        finishA: '#ffd166',
        finishB: '#ff6b8f',
        ground: '#ff6b8f',
      },
    },
    objects: [
    { type: 'spike', x: 586, y: 600, w: 40, h: 40 },
    { type: 'block', x: 786, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 836, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 886, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 936, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1051, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1281, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1590, y: 600, w: 40, h: 40 },
    { type: 'block', x: 1790, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 1840, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1890, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1940, y: 400, w: 40, h: 40, flip: true },
    { type: 'platform', x: 2086, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 2406, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 2726, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 3136, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3266, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3306, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3581, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3868, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 4150, y: 475.4299717908725, w: 149, h: 20 },
    { type: 'platform', x: 4465, y: 395.4299717908725, w: 137, h: 20 },
    { type: 'platform', x: 4864, y: 515.4299717908725, w: 155, h: 20 },
    { type: 'platform', x: 5174, y: 415.4299717908725, w: 137, h: 20 },
    { type: 'platform', x: 5412, y: 527.5057985330932, w: 158, h: 20 },
    { type: 'platform', x: 5733, y: 427.5057985330932, w: 147, h: 20 },
    { type: 'platform', x: 6118, y: 487.5057985330932, w: 137, h: 20 },
    { type: 'platform', x: 6429, y: 407.5057985330932, w: 140, h: 20 },
    { type: 'block', x: 6669, y: 560, w: 80, h: 80 },
    { type: 'block', x: 6849, y: 480, w: 80, h: 160 },
    { type: 'block', x: 7029, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 7405, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 7445, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 7732, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 8052, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 8372, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 8782, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8912, y: 600, w: 40, h: 40 },
    { type: 'block', x: 9217, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 9467, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9507, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9547, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9703, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9972, y: 600, w: 40, h: 40 },
    { type: 'block', x: 10172, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 10222, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10272, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10322, y: 400, w: 40, h: 40, flip: true },

      // ---------- следующий этап ----------
    { type: 'finish', x: 11450, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
