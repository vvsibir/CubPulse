/* =========================================================
   УРОВЕНЬ 6 — «Лёд»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=6
   ---------------------------------------------------------
   Сгенерированный уровень (3 из 20): длина 7100 px
   (~14.8 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['6'] = {
    id: 6,
    name: 'Level 6',
    length: 7100,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 190, end: 225 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'ice',
    theme: {
      name: 'Лёд',
      colors: {
        playerA: '#9be8ff',
        playerB: '#6f9eff',
        spike: '#ff6b9d',
        block: '#9be8ff',
        blockFill: 'rgba(155,232,255,0.15)',
        platform: '#d6f4ff',
        finishA: '#ffffff',
        finishB: '#9be8ff',
        ground: '#9be8ff',
      },
    },
    objects: [
    { type: 'spike', x: 446, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 486, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 526, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 713, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 753, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 997, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1237, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1277, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 1480, y: 518.5966446530074, w: 166, h: 20 },
    { type: 'platform', x: 1879, y: 560, w: 161, h: 20 },
    { type: 'platform', x: 2273, y: 560, w: 146, h: 20 },
    { type: 'platform', x: 2518, y: 496.9662144058384, w: 154, h: 20 },
    { type: 'platform', x: 2866, y: 456.9662144058384, w: 161, h: 20 },
    { type: 'platform', x: 3208, y: 396.9662144058384, w: 165, h: 20 },
    { type: 'platform', x: 3567, y: 356.9662144058384, w: 167, h: 20 },
    { type: 'platform', x: 3834, y: 529.8081223550253, w: 168, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 4306, y: 560, w: 137, h: 20 },
    { type: 'platform', x: 4612, y: 460, w: 165, h: 20 },
    { type: 'platform', x: 4991, y: 460, w: 165, h: 20 },
    { type: 'platform', x: 5371, y: 460, w: 154, h: 20 },
    { type: 'spike', x: 5625, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 6700, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
