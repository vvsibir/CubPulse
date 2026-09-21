/* =========================================================
   УРОВЕНЬ 9 — «Лес»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=9
   ---------------------------------------------------------
   Сгенерированный уровень (6 из 20): длина 9950 px
   (~20.7 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['9'] = {
    id: 9,
    name: 'Level 9',
    length: 9950,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 95, end: 130 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'forest',
    theme: {
      name: 'Лес',
      colors: {
        playerA: '#a8f06e',
        playerB: '#3fbf5a',
        spike: '#ff7a4d',
        block: '#6edb7a',
        blockFill: 'rgba(110,219,122,0.15)',
        platform: '#c9f2a1',
        finishA: '#ffd166',
        finishB: '#6edb7a',
        ground: '#6edb7a',
      },
    },
    objects: [
    { type: 'spike', x: 593, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 833, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 1073, y: 474.6777331712656, w: 163, h: 20 },
    { type: 'platform', x: 1398, y: 374.6777331712656, w: 158, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 1845, y: 434.6777331712656, w: 147, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 2282, y: 494.6777331712656, w: 148, h: 20 },
    { type: 'platform', x: 2682, y: 560, w: 161, h: 20 },
    { type: 'spike', x: 2943, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2983, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3023, y: 600, w: 40, h: 40 },
    { type: 'block', x: 3256, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 3506, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3546, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3645, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3900, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4140, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4380, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4620, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4660, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4700, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4914, y: 600, w: 40, h: 40 },
    { type: 'block', x: 5154, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 5404, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5444, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5484, y: 600, w: 40, h: 40 },
    { type: 'block', x: 5543, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 5793, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5833, y: 600, w: 40, h: 40 },
    { type: 'block', x: 5932, y: 480, w: 80, h: 160 },
    { type: 'block', x: 6112, y: 400, w: 80, h: 240 },
    { type: 'block', x: 6292, y: 480, w: 80, h: 160 },
    { type: 'spike', x: 6631, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6871, y: 600, w: 40, h: 40 },
    { type: 'block', x: 7071, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 7121, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7171, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7221, y: 400, w: 40, h: 40, flip: true },
    { type: 'platform', x: 7241, y: 504.78121731895953, w: 147, h: 20 },
    { type: 'platform', x: 7542, y: 404.78121731895953, w: 154, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 8017, y: 524.7812173189595, w: 137, h: 20 },
    { type: 'spike', x: 8254, y: 600, w: 40, h: 40 },
    { type: 'block', x: 8454, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 8504, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8554, y: 400, w: 40, h: 40, flip: true },

      // ---------- следующий этап ----------
    { type: 'finish', x: 9550, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
