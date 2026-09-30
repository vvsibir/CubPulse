/* =========================================================
   УРОВЕНЬ 30 — «Топаз»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=30
   ---------------------------------------------------------
   Сгенерированный уровень (27 из 37): длина 29900 px
   (~62.3 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['30'] = {
    id: 30,
    name: 'Level 30',
    length: 29900,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 38, end: 55 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'topaz',
    theme: {
      name: 'Топаз',
      colors: {
        playerA: '#ffe6a3',
        playerB: '#ff9f45',
        spike: '#3d7fff',
        block: '#ffcc66',
        blockFill: 'rgba(255,204,102,0.15)',
        platform: '#fff0cc',
        finishA: '#ffffff',
        finishB: '#ffcc66',
        ground: '#ffcc66',
      },
    },
    objects: [
    { type: 'spike', x: 546, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 586, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 902, y: 600, w: 40, h: 40 },
    { type: 'block', x: 1102, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 1152, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 1202, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 1460, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 1818, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 2138, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 2458, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 2868, y: 600, w: 40, h: 40 },
    { type: 'block', x: 2998, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 3248, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3288, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 3538, y: 478.60935325035825, w: 152, h: 20 },
    { type: 'platform', x: 3871, y: 418.60935325035825, w: 146, h: 20 },
    { type: 'platform', x: 4171, y: 318.60935325035825, w: 145, h: 20 },
    { type: 'platform', x: 4529, y: 300, w: 159, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 5001, y: 420, w: 142, h: 20 },
    { type: 'spike', x: 5243, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5283, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5323, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5634, y: 600, w: 40, h: 40 },
    { type: 'block', x: 5834, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 5884, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 5934, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 5984, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 6170, y: 600, w: 40, h: 40 },
    { type: 'block', x: 6471, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 6864, y: 493.2925261789933, w: 165, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 7299, y: 560, w: 138, h: 20 },
    { type: 'platform', x: 7649, y: 520, w: 138, h: 20 },
    { type: 'spike', x: 7887, y: 600, w: 40, h: 40 },
    { type: 'block', x: 8087, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 8137, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8187, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8400, y: 600, w: 40, h: 40 },
    { type: 'block', x: 8600, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 8650, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 8700, y: 480, w: 40, h: 40, flip: true },
    { type: 'platform', x: 8949, y: 524.7736526303925, w: 131, h: 20 },
    { type: 'platform', x: 9348, y: 560, w: 141, h: 20 },
    { type: 'platform', x: 9722, y: 520, w: 136, h: 20 },
    { type: 'block', x: 9958, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 10208, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10248, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10288, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10498, y: 600, w: 40, h: 40 },
    { type: 'block', x: 10698, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 10748, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10798, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 11025, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 11275, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11315, y: 600, w: 40, h: 40 },
    { type: 'block', x: 11565, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 11815, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11855, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 12105, y: 489.37242541695014, w: 147, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 12521, y: 549.3724254169501, w: 162, h: 20 },
    { type: 'platform', x: 12847, y: 449.37242541695014, w: 133, h: 20 },
    { type: 'platform', x: 13143, y: 369.37242541695014, w: 131, h: 20 },
    { type: 'spike', x: 13374, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 13414, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 13731, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 13771, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 13811, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14115, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14155, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14195, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14450, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14490, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 14530, y: 600, w: 40, h: 40 },
    { type: 'block', x: 14771, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 15021, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15061, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15101, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15311, y: 600, w: 40, h: 40 },
    { type: 'block', x: 15511, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 15561, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 15611, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 15820, y: 600, w: 40, h: 40 },
    { type: 'block', x: 16020, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 16070, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 16120, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 16320, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16569, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 16609, y: 600, w: 40, h: 40 },
    { type: 'block', x: 16938, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 17188, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 17228, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 17478, y: 514.7393817640841, w: 142, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 17900, y: 560, w: 146, h: 20 },
    { type: 'platform', x: 18247, y: 520, w: 136, h: 20 },
    { type: 'spike', x: 18483, y: 600, w: 40, h: 40 },
    { type: 'block', x: 18683, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 18733, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 18783, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 18833, y: 480, w: 40, h: 40, flip: true },
    { type: 'platform', x: 18990, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 19310, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 19630, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 20040, y: 600, w: 40, h: 40 },
    { type: 'block', x: 20170, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 20558, y: 518.9879158837721, w: 164, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 21025, y: 560, w: 143, h: 20 },
    { type: 'platform', x: 21329, y: 480, w: 166, h: 20 },
    { type: 'spike', x: 21595, y: 600, w: 40, h: 40 },
    { type: 'block', x: 21795, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 21845, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 21895, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 22130, y: 600, w: 40, h: 40 },
    { type: 'block', x: 22393, y: 560, w: 80, h: 80 },
    { type: 'block', x: 22573, y: 480, w: 80, h: 160 },
    { type: 'block', x: 22753, y: 560, w: 80, h: 80 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 23163, y: 600, w: 40, h: 40 },
    { type: 'block', x: 23363, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 23413, y: 480, w: 40, h: 40, flip: true },
    { type: 'spike', x: 23463, y: 480, w: 40, h: 40, flip: true },
    { type: 'block', x: 23713, y: 560, w: 80, h: 80 },
    { type: 'block', x: 23893, y: 480, w: 80, h: 160 },
    { type: 'block', x: 24073, y: 560, w: 80, h: 80 },
    { type: 'block', x: 24432, y: 560, w: 80, h: 80 },
    { type: 'block', x: 24612, y: 480, w: 80, h: 160 },
    { type: 'block', x: 24792, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 25156, y: 488.67556236917153, w: 165, h: 20 },
    { type: 'platform', x: 25492, y: 408.67556236917153, w: 147, h: 20 },
    { type: 'platform', x: 25809, y: 328.67556236917153, w: 131, h: 20 },
    { type: 'platform', x: 26192, y: 448.67556236917153, w: 167, h: 20 },
    { type: 'platform', x: 26586, y: 408.67556236917153, w: 141, h: 20 },
    { type: 'spike', x: 26827, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 26867, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 26907, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 27169, y: 506.3972620922141, w: 131, h: 20 },
    { type: 'platform', x: 27563, y: 560, w: 147, h: 20 },
    { type: 'platform', x: 27921, y: 500, w: 169, h: 20 },
    { type: 'platform', x: 28304, y: 500, w: 141, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 28845, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 29500, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
