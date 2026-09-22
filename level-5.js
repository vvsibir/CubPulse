/* =========================================================
   УРОВЕНЬ 5 — «Вулкан»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=5
   ---------------------------------------------------------
   Сгенерированный уровень (2 из 20): длина 6150 px
   (~12.8 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['5'] = {
    id: 5,
    name: 'Level 5',
    length: 6150,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 10, end: 40 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'lava',
    theme: {
      name: 'Вулкан',
      colors: {
        playerA: '#ffb300',
        playerB: '#ff3d2e',
        spike: '#ffd166',
        block: '#ff5e3a',
        blockFill: 'rgba(255,94,58,0.15)',
        platform: '#ff9d5c',
        finishA: '#ffd166',
        finishB: '#ff3d2e',
        ground: '#ff5e3a',
      },
    },
    objects: [
    { type: 'spike', x: 491, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 531, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 766, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 806, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1057, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1303, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1550, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 1590, y: 600, w: 40, h: 40 },
    { type: 'block', x: 1822, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 2072, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2112, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2152, y: 600, w: 40, h: 40 },
    { type: 'block', x: 2211, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 2461, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2501, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2541, y: 600, w: 40, h: 40 },
    { type: 'block', x: 2600, y: 560, w: 80, h: 80 },
    { type: 'block', x: 2925, y: 560, w: 80, h: 80 },
    { type: 'block', x: 3105, y: 480, w: 80, h: 160 },
    { type: 'block', x: 3285, y: 560, w: 80, h: 80 },
    { type: 'block', x: 3615, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 5750, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
