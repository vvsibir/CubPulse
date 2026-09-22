/* =========================================================
   УРОВЕНЬ 12 — «Золото»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=12
   ---------------------------------------------------------
   Сгенерированный уровень (9 из 20): длина 12800 px
   (~26.7 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['12'] = {
    id: 12,
    name: 'Level 12',
    length: 12800,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 40, end: 60 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'gold',
    theme: {
      name: 'Золото',
      colors: {
        playerA: '#fff179',
        playerB: '#ffb300',
        spike: '#ff4d6d',
        block: '#ffd166',
        blockFill: 'rgba(255,209,102,0.15)',
        platform: '#fff3b0',
        finishA: '#ffffff',
        finishB: '#ffd166',
        ground: '#ffd166',
      },
    },
    objects: [
    { type: 'platform', x: 570, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 890, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 1210, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 1620, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 1750, y: 515.3392071882263, w: 135, h: 20 },
    { type: 'platform', x: 2084, y: 475.3392071882263, w: 142, h: 20 },
    { type: 'platform', x: 2449, y: 475.3392071882263, w: 166, h: 20 },
    { type: 'platform', x: 2715, y: 515.525091981981, w: 150, h: 20 },
    { type: 'platform', x: 3021, y: 415.52509198198095, w: 138, h: 20 },
    { type: 'platform', x: 3332, y: 355.52509198198095, w: 146, h: 20 },
    { type: 'platform', x: 3714, y: 355.52509198198095, w: 140, h: 20 },
    { type: 'platform', x: 4027, y: 300, w: 132, h: 20 },
    { type: 'spike', x: 4259, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4299, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4339, y: 600, w: 40, h: 40 },
    { type: 'block', x: 4569, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 4819, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4859, y: 600, w: 40, h: 40 },
    { type: 'block', x: 5055, y: 560, w: 80, h: 80 },
    { type: 'block', x: 5408, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 5784, y: 600, w: 40, h: 40 },
    { type: 'block', x: 5984, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 6034, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 6084, y: 400, w: 40, h: 40, flip: true },
    { type: 'platform', x: 6281, y: 471.91169653087854, w: 169, h: 20 },
    { type: 'platform', x: 6615, y: 371.91169653087854, w: 169, h: 20 },
    { type: 'platform', x: 7013, y: 431.91169653087854, w: 131, h: 20 },
    { type: 'platform', x: 7321, y: 371.91169653087854, w: 148, h: 20 },
    { type: 'platform', x: 7647, y: 311.91169653087854, w: 146, h: 20 },
    { type: 'block', x: 7893, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 8143, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8183, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 8379, y: 494.0978633402847, w: 131, h: 20 },
    { type: 'platform', x: 8684, y: 434.0978633402847, w: 131, h: 20 },
    { type: 'platform', x: 8988, y: 374.0978633402847, w: 131, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 9415, y: 494.0978633402847, w: 138, h: 20 },
    { type: 'spike', x: 9653, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9893, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9933, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9973, y: 600, w: 40, h: 40 },
    { type: 'block', x: 10264, y: 560, w: 80, h: 80 },
    { type: 'block', x: 10634, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 10884, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10924, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 12400, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
