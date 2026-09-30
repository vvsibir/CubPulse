/* =========================================================
   УРОВЕНЬ 38 — «Ноктюрн»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=38
   ---------------------------------------------------------
   Сгенерированный уровень (35 из 37): длина 37500 px
   (~78.1 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['38'] = {
    id: 38,
    name: 'Level 38',
    length: 37500,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 245, end: 275 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'nocturne',
    theme: {
      name: 'Ноктюрн',
      colors: {
        playerA: '#d6c2ff',
        playerB: '#7f4dff',
        spike: '#66e0ff',
        block: '#a87fff',
        blockFill: 'rgba(168,127,255,0.15)',
        platform: '#e0d0ff',
        finishA: '#ffe066',
        finishB: '#a87fff',
        ground: '#a87fff',
      },
    },
    objects: [
    { type: 'block', x: 486, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 1026, y: 600, w: 40, h: 40 },
    { type: 'block', x: 1354, y: 560, w: 80, h: 80 },
    { type: 'block', x: 1534, y: 480, w: 80, h: 160 },
    { type: 'block', x: 1714, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 2128, y: 533.2079499657266, w: 164, h: 20 },
    { type: 'platform', x: 2528, y: 533.2079499657266, w: 152, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 2939, y: 560, w: 153, h: 20 },
    { type: 'block', x: 3192, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 3442, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3482, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3732, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3772, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3812, y: 600, w: 40, h: 40 },
    { type: 'block', x: 4102, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 4352, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4392, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 4642, y: 475.0429880642332, w: 160, h: 20 },
    { type: 'platform', x: 5034, y: 475.0429880642332, w: 162, h: 20 },
    { type: 'platform', x: 5379, y: 395.0429880642332, w: 159, h: 20 },
    { type: 'block', x: 5637, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'block', x: 6044, y: 560, w: 80, h: 80 },
    { type: 'block', x: 6224, y: 480, w: 80, h: 160 },
    { type: 'block', x: 6404, y: 560, w: 80, h: 80 },
    { type: 'block', x: 6804, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'block', x: 7219, y: 560, w: 80, h: 80 },
    { type: 'block', x: 7399, y: 480, w: 80, h: 160 },
    { type: 'block', x: 7579, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 7938, y: 600, w: 40, h: 40 },
    { type: 'block', x: 8138, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 8188, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8238, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8288, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8467, y: 600, w: 40, h: 40 },
    { type: 'block', x: 8667, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 8717, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8767, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8996, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9036, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9076, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9385, y: 600, w: 40, h: 40 },
    { type: 'block', x: 9710, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 9960, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10000, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10040, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10250, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10290, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10330, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10667, y: 600, w: 40, h: 40 },
    { type: 'block', x: 10867, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 10917, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10967, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 11181, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 11595, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11635, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11675, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 11939, y: 523.9771289518103, w: 140, h: 20 },
    { type: 'platform', x: 12242, y: 423.9771289518103, w: 157, h: 20 },
    { type: 'platform', x: 12592, y: 363.9771289518103, w: 156, h: 20 },
    { type: 'platform', x: 12848, y: 529.8938757786527, w: 130, h: 20 },
    { type: 'platform', x: 13161, y: 449.8938757786527, w: 139, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 13586, y: 560, w: 164, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 13988, y: 560, w: 156, h: 20 },
    { type: 'spike', x: 14244, y: 600, w: 40, h: 40 },
    { type: 'block', x: 14444, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 14494, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14544, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14594, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 14769, y: 560, w: 80, h: 80 },
    { type: 'block', x: 14949, y: 480, w: 80, h: 160 },
    { type: 'block', x: 15129, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 15472, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 15792, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 16112, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 16522, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16652, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16692, y: 600, w: 40, h: 40 },
    { type: 'block', x: 17022, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 17272, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 17312, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 17562, y: 519.8555356729776, w: 144, h: 20 },
    { type: 'platform', x: 17948, y: 519.8555356729776, w: 147, h: 20 },
    { type: 'platform', x: 18248, y: 419.85553567297757, w: 158, h: 20 },
    { type: 'platform', x: 18591, y: 359.85553567297757, w: 163, h: 20 },
    { type: 'platform', x: 18984, y: 319.85553567297757, w: 133, h: 20 },
    { type: 'spike', x: 19218, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 19258, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 19567, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 19887, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 20207, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 20617, y: 600, w: 40, h: 40 },
    { type: 'block', x: 20747, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 20997, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21037, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21287, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 21327, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 21588, y: 500.4434693371877, w: 143, h: 20 },
    { type: 'platform', x: 21928, y: 460.4434693371877, w: 154, h: 20 },
    { type: 'platform', x: 22320, y: 520.4434693371877, w: 159, h: 20 },
    { type: 'spike', x: 22579, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 22619, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 22659, y: 600, w: 40, h: 40 },
    { type: 'block', x: 22949, y: 560, w: 80, h: 80 },
    { type: 'block', x: 23129, y: 480, w: 80, h: 160 },
    { type: 'block', x: 23309, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 23692, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 24012, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 24332, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 24742, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 24872, y: 475.8700393908657, w: 132, h: 20 },
    { type: 'platform', x: 25241, y: 435.8700393908657, w: 149, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 25653, y: 435.8700393908657, w: 150, h: 20 },
    { type: 'platform', x: 25987, y: 355.8700393908657, w: 169, h: 20 },
    { type: 'platform', x: 26256, y: 503.72996289050207, w: 156, h: 20 },
    { type: 'platform', x: 26577, y: 423.72996289050207, w: 150, h: 20 },
    { type: 'platform', x: 26902, y: 363.72996289050207, w: 155, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 27367, y: 483.72996289050207, w: 167, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 27808, y: 543.7299628905021, w: 145, h: 20 },
    { type: 'spike', x: 28053, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 28093, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 28133, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 28458, y: 513.4287078701891, w: 153, h: 20 },
    { type: 'platform', x: 28846, y: 513.4287078701891, w: 158, h: 20 },
    { type: 'platform', x: 29195, y: 473.4287078701891, w: 156, h: 20 },
    { type: 'platform', x: 29542, y: 413.4287078701891, w: 143, h: 20 },
    { type: 'platform', x: 29785, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 30105, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 30425, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 30835, y: 600, w: 40, h: 40 },
    { type: 'block', x: 30965, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 31215, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 31255, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 31295, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 31505, y: 600, w: 40, h: 40 },
    { type: 'block', x: 31705, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 31755, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 31805, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 31855, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 32043, y: 560, w: 80, h: 80 },
    { type: 'block', x: 32223, y: 480, w: 80, h: 160 },
    { type: 'block', x: 32403, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 32750, y: 472.0495446608402, w: 146, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 33186, y: 532.0495446608402, w: 165, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 33640, y: 560, w: 139, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 34069, y: 560, w: 141, h: 20 },
    { type: 'block', x: 34310, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 34560, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 34600, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 34640, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 34850, y: 600, w: 40, h: 40 },
    { type: 'block', x: 35050, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 35100, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 35150, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 35200, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 35366, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 35616, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 35656, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 35696, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 35906, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 36346, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 36746, y: 600, w: 40, h: 40 },
    { type: 'finish', x: 37100, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
