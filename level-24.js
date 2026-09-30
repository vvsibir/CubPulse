/* =========================================================
   УРОВЕНЬ 24 — «Платина»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=24
   ---------------------------------------------------------
   Сгенерированный уровень (21 из 37): длина 24200 px
   (~50.4 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['24'] = {
    id: 24,
    name: 'Level 24',
    length: 24200,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 185, end: 210 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'platinum',
    theme: {
      name: 'Платина',
      colors: {
        playerA: '#e8f2ff',
        playerB: '#a0b8d9',
        spike: '#ffd166',
        block: '#c3d6f0',
        blockFill: 'rgba(195,214,240,0.15)',
        platform: '#ecf5ff',
        finishA: '#ffb3ec',
        finishB: '#c3d6f0',
        ground: '#c3d6f0',
      },
    },
    objects: [
    { type: 'spike', x: 578, y: 600, w: 40, h: 40 },
    { type: 'block', x: 778, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 828, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 878, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 928, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1116, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 1440, y: 530.9243722213432, w: 164, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 1898, y: 560, w: 165, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 2301, y: 560, w: 134, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 2728, y: 560, w: 145, h: 20 },
    { type: 'platform', x: 3087, y: 520, w: 143, h: 20 },
    { type: 'platform', x: 3330, y: 481.03507107822224, w: 145, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 3752, y: 541.0350710782222, w: 131, h: 20 },
    { type: 'platform', x: 4047, y: 461.03507107822224, w: 157, h: 20 },
    { type: 'spike', x: 4304, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4344, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4384, y: 600, w: 40, h: 40 },
    { type: 'block', x: 4628, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 4878, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4918, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4958, y: 600, w: 40, h: 40 },
    { type: 'block', x: 5168, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 5561, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 5881, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 6201, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 6611, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6741, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6781, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 7023, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 7281, y: 497.65416792593896, w: 144, h: 20 },
    { type: 'platform', x: 7652, y: 497.65416792593896, w: 138, h: 20 },
    { type: 'platform', x: 7995, y: 457.65416792593896, w: 155, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 8439, y: 560, w: 168, h: 20 },
    { type: 'platform', x: 8707, y: 506.6862648096867, w: 161, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 9168, y: 560, w: 136, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 9626, y: 560, w: 130, h: 20 },
    { type: 'platform', x: 9856, y: 532.1697754669003, w: 130, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 10271, y: 560, w: 168, h: 20 },
    { type: 'platform', x: 10605, y: 460, w: 164, h: 20 },
    { type: 'platform', x: 10973, y: 420, w: 162, h: 20 },
    { type: 'platform', x: 11235, y: 519.4214380346239, w: 148, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 11665, y: 560, w: 157, h: 20 },
    { type: 'platform', x: 12048, y: 520, w: 150, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 12483, y: 560, w: 152, h: 20 },
    { type: 'platform', x: 12814, y: 500, w: 144, h: 20 },
    { type: 'platform', x: 13058, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 13378, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 13698, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 14108, y: 600, w: 40, h: 40 },
    { type: 'block', x: 14238, y: 560, w: 80, h: 80 },
    { type: 'block', x: 14633, y: 560, w: 80, h: 80 },
    { type: 'block', x: 14813, y: 480, w: 80, h: 160 },
    { type: 'block', x: 14993, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 15378, y: 511.0463539464399, w: 141, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 15838, y: 560, w: 162, h: 20 },
    { type: 'platform', x: 16154, y: 460, w: 147, h: 20 },
    { type: 'platform', x: 16401, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 16721, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 17041, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 17451, y: 600, w: 40, h: 40 },
    { type: 'block', x: 17581, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 17831, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 17871, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 17911, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18121, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18161, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18201, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18531, y: 600, w: 40, h: 40 },
    { type: 'block', x: 18731, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 18781, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 18831, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 19066, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 19316, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 19356, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 19396, y: 600, w: 40, h: 40 },
    { type: 'block', x: 19606, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 19856, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 19896, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20146, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20186, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20226, y: 600, w: 40, h: 40 },
    { type: 'block', x: 20541, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 20791, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20831, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20871, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21081, y: 600, w: 40, h: 40 },
    { type: 'block', x: 21281, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 21331, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 21381, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 21431, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 21597, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 21887, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21927, y: 600, w: 40, h: 40 },
    { type: 'block', x: 22137, y: 560, w: 80, h: 80 },
    { type: 'block', x: 22317, y: 480, w: 80, h: 160 },
    { type: 'block', x: 22497, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 22977, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 23377, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 23800, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
