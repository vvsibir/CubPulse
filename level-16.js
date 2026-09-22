/* =========================================================
   УРОВЕНЬ 16 — «Обсидиан»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=16
   ---------------------------------------------------------
   Сгенерированный уровень (13 из 20): длина 16600 px
   (~34.6 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['16'] = {
    id: 16,
    name: 'Level 16',
    length: 16600,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 260, end: 290 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'obsidian',
    theme: {
      name: 'Обсидиан',
      colors: {
        playerA: '#d9b3ff',
        playerB: '#8a4dff',
        spike: '#ff4d6d',
        block: '#a06bff',
        blockFill: 'rgba(160,107,255,0.15)',
        platform: '#cdb3ff',
        finishA: '#ffd166',
        finishB: '#a06bff',
        ground: '#a06bff',
      },
    },
    objects: [
    { type: 'spike', x: 448, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 705, y: 600, w: 40, h: 40 },
    { type: 'block', x: 905, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 955, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1005, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1055, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1241, y: 600, w: 40, h: 40 },
    { type: 'block', x: 1441, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 1491, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1541, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1751, y: 600, w: 40, h: 40 },
    { type: 'block', x: 2061, y: 560, w: 80, h: 80 },
    { type: 'block', x: 2241, y: 480, w: 80, h: 160 },
    { type: 'block', x: 2421, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 2797, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2837, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2877, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3193, y: 600, w: 40, h: 40 },
    { type: 'block', x: 3393, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 3443, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 3493, y: 400, w: 40, h: 40, flip: true },
    { type: 'platform', x: 3696, y: 524.2848767526448, w: 141, h: 20 },
    { type: 'platform', x: 4076, y: 524.2848767526448, w: 135, h: 20 },
    { type: 'platform', x: 4471, y: 560, w: 131, h: 20 },
    { type: 'platform', x: 4702, y: 536.6904610488564, w: 152, h: 20 },
    { type: 'platform', x: 5069, y: 536.6904610488564, w: 160, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 5530, y: 560, w: 150, h: 20 },
    { type: 'block', x: 5780, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 6030, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6070, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6110, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6320, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6360, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6400, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6688, y: 600, w: 40, h: 40 },
    { type: 'block', x: 6888, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 6938, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 6988, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7038, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7230, y: 600, w: 40, h: 40 },
    { type: 'block', x: 7430, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 7480, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7530, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7580, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7758, y: 600, w: 40, h: 40 },
    { type: 'block', x: 7958, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 8008, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8058, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8108, y: 400, w: 40, h: 40, flip: true },
    { type: 'block', x: 8300, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 8709, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8749, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8789, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 9088, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 9408, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 9728, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 10138, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10268, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10308, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10620, y: 600, w: 40, h: 40 },
    { type: 'block', x: 10820, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 10870, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10920, y: 400, w: 40, h: 40, flip: true },
    { type: 'block', x: 11138, y: 560, w: 80, h: 80 },
    { type: 'block', x: 11318, y: 480, w: 80, h: 160 },
    { type: 'block', x: 11498, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 11892, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11932, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11972, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 12231, y: 528.7237211014144, w: 153, h: 20 },
    { type: 'platform', x: 12577, y: 488.7237211014144, w: 149, h: 20 },
    { type: 'platform', x: 12928, y: 428.7237211014144, w: 156, h: 20 },
    { type: 'block', x: 13184, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 13434, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 13474, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 13514, y: 600, w: 40, h: 40 },
    { type: 'block', x: 13724, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 13974, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14014, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14054, y: 600, w: 40, h: 40 },
    { type: 'block', x: 14264, y: 560, w: 80, h: 80 },
    { type: 'block', x: 14444, y: 480, w: 80, h: 160 },
    { type: 'block', x: 14624, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 15004, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15044, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 16200, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
