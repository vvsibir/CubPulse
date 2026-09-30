/* =========================================================
   УРОВЕНЬ 26 — «Лазурь»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=26
   ---------------------------------------------------------
   Сгенерированный уровень (23 из 37): длина 26100 px
   (~54.4 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['26'] = {
    id: 26,
    name: 'Level 26',
    length: 26100,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 190, end: 210 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'azure',
    theme: {
      name: 'Лазурь',
      colors: {
        playerA: '#a3ecff',
        playerB: '#2db2ff',
        spike: '#ff5e7a',
        block: '#5cd2ff',
        blockFill: 'rgba(92,210,255,0.15)',
        platform: '#d0f3ff',
        finishA: '#ffe066',
        finishB: '#5cd2ff',
        ground: '#5cd2ff',
      },
    },
    objects: [
    { type: 'spike', x: 458, y: 600, w: 40, h: 40 },
    { type: 'block', x: 658, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 708, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 758, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1007, y: 600, w: 40, h: 40 },
    { type: 'block', x: 1207, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 1257, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1307, y: 480, w: 40, h: 40, flip: true },
    { type: 'platform', x: 1513, y: 504.39325743122026, w: 159, h: 20 },
    { type: 'platform', x: 1869, y: 444.39325743122026, w: 142, h: 20 },
    { type: 'platform', x: 2253, y: 504.39325743122026, w: 162, h: 20 },
    { type: 'platform', x: 2582, y: 404.39325743122026, w: 160, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 2984, y: 464.39325743122026, w: 157, h: 20 },
    { type: 'block', x: 3240, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 3490, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3530, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3570, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 3780, y: 475.7123279944062, w: 137, h: 20 },
    { type: 'platform', x: 4155, y: 435.7123279944062, w: 149, h: 20 },
    { type: 'platform', x: 4542, y: 395.7123279944062, w: 161, h: 20 },
    { type: 'platform', x: 4935, y: 455.7123279944062, w: 148, h: 20 },
    { type: 'platform', x: 5241, y: 355.7123279944062, w: 135, h: 20 },
    { type: 'spike', x: 5476, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5516, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5556, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5799, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5839, y: 600, w: 40, h: 40 },
    { type: 'block', x: 6157, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 6447, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6487, y: 600, w: 40, h: 40 },
    { type: 'block', x: 6697, y: 560, w: 80, h: 80 },
    { type: 'block', x: 6877, y: 480, w: 80, h: 160 },
    { type: 'block', x: 7057, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 7433, y: 600, w: 40, h: 40 },
    { type: 'block', x: 7633, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 7683, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7733, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 7939, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 7979, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8309, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8349, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8389, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8708, y: 600, w: 40, h: 40 },
    { type: 'block', x: 8908, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 8958, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 9008, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 9254, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 9504, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9544, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9584, y: 600, w: 40, h: 40 },
    { type: 'block', x: 9794, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 10139, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10179, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10219, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10470, y: 600, w: 40, h: 40 },
    { type: 'block', x: 10670, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 10720, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10770, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 11008, y: 600, w: 40, h: 40 },
    { type: 'block', x: 11208, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 11258, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 11308, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 11358, y: 480, w: 40, h: 40, flip: true },
    { type: 'platform', x: 11548, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 11868, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 12188, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 12598, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 12728, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 13048, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 13368, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 13778, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 13908, y: 493.3560842019506, w: 162, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 14366, y: 553.3560842019506, w: 165, h: 20 },
    { type: 'platform', x: 14683, y: 453.3560842019506, w: 154, h: 20 },
    { type: 'platform', x: 15030, y: 413.3560842019506, w: 143, h: 20 },
    { type: 'platform', x: 15420, y: 413.3560842019506, w: 142, h: 20 },
    { type: 'platform', x: 15662, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 15982, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 16302, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 16712, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16842, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 17156, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 17440, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 17760, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 18080, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 18490, y: 600, w: 40, h: 40 },
    { type: 'block', x: 18620, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'block', x: 19027, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 19277, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 19317, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 19567, y: 536.9122033426538, w: 132, h: 20 },
    { type: 'platform', x: 19870, y: 456.9122033426538, w: 154, h: 20 },
    { type: 'platform', x: 20190, y: 356.9122033426538, w: 144, h: 20 },
    { type: 'spike', x: 20434, y: 600, w: 40, h: 40 },
    { type: 'block', x: 20634, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 20684, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 20734, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 20954, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20994, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21034, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21370, y: 600, w: 40, h: 40 },
    { type: 'block', x: 21570, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 21620, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 21670, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 21720, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 21910, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 22160, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 22200, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 22240, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 22450, y: 475.4151948983781, w: 168, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 22871, y: 535.4151948983781, w: 168, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 23291, y: 560, w: 155, h: 20 },
    { type: 'platform', x: 23546, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 23866, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 24186, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 24596, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 25036, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 25700, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
