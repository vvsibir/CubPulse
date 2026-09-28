/* =========================================================
   УРОВЕНЬ 40 — «Ультра»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=40
   ---------------------------------------------------------
   Сгенерированный уровень (37 из 37): длина 39400 px
   (~82.1 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['40'] = {
    id: 40,
    name: 'Level 40',
    length: 39400,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 270, end: 300 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'ultra',
    theme: {
      name: 'Ультра',
      colors: {
        playerA: '#d6b3ff',
        playerB: '#8f4dff',
        spike: '#ffd166',
        block: '#b37fff',
        blockFill: 'rgba(179,127,255,0.15)',
        platform: '#e3ccff',
        finishA: '#ffb3ec',
        finishB: '#b37fff',
        ground: '#b37fff',
      },
    },
    objects: [
    { type: 'block', x: 554, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 804, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 844, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 1094, y: 504.8931999015622, w: 137, h: 20 },
    { type: 'platform', x: 1470, y: 560, w: 139, h: 20 },
    { type: 'platform', x: 1847, y: 560, w: 142, h: 20 },
    { type: 'platform', x: 2089, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 2409, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 2729, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 3139, y: 600, w: 40, h: 40 },
    { type: 'block', x: 3269, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 3658, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3698, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3964, y: 600, w: 40, h: 40 },
    { type: 'block', x: 4164, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 4214, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 4264, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 4314, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 4491, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4531, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4571, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4818, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4858, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 4898, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 5211, y: 479.68376957578585, w: 140, h: 20 },
    { type: 'platform', x: 5505, y: 379.68376957578585, w: 170, h: 20 },
    { type: 'platform', x: 5829, y: 300, w: 157, h: 20 },
    { type: 'platform', x: 6180, y: 300, w: 154, h: 20 },
    { type: 'spike', x: 6434, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6474, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6514, y: 600, w: 40, h: 40 },
    { type: 'block', x: 6769, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 7019, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 7059, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 7309, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 7629, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 7949, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 8359, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8489, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8801, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9089, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9129, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9169, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9493, y: 600, w: 40, h: 40 },
    { type: 'block', x: 9693, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 9743, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 9793, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10036, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10076, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10390, y: 600, w: 40, h: 40 },
    { type: 'block', x: 10590, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 10640, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 10690, y: 400, w: 40, h: 40, flip: true },
    { type: 'platform', x: 10939, y: 514.9132038280368, w: 150, h: 20 },
    { type: 'platform', x: 11294, y: 474.9132038280368, w: 149, h: 20 },
    { type: 'platform', x: 11613, y: 394.9132038280368, w: 142, h: 20 },
    { type: 'spike', x: 11855, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 11895, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 12189, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 12444, y: 506.40015427954495, w: 164, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 12897, y: 560, w: 135, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 13322, y: 560, w: 148, h: 20 },
    { type: 'platform', x: 13716, y: 560, w: 158, h: 20 },
    { type: 'platform', x: 14077, y: 500, w: 150, h: 20 },
    { type: 'spike', x: 14327, y: 600, w: 40, h: 40 },
    { type: 'block', x: 14527, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 14577, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14627, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 14677, y: 400, w: 40, h: 40, flip: true },
    { type: 'block', x: 14849, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 15099, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15139, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15179, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15389, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15429, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15469, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15807, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 15847, y: 600, w: 40, h: 40 },
    { type: 'block', x: 16138, y: 560, w: 80, h: 80 },
    { type: 'platform', x: 16525, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 16845, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 17165, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 17575, y: 600, w: 40, h: 40 },
    { type: 'block', x: 17705, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 17955, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 17995, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18035, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18245, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18285, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18325, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 18595, y: 600, w: 40, h: 40 },
    { type: 'block', x: 18795, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 18845, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 18895, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 19136, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 19176, y: 600, w: 40, h: 40 },
    { type: 'block', x: 19505, y: 560, w: 80, h: 80 },
    { type: 'block', x: 19685, y: 480, w: 80, h: 160 },
    { type: 'block', x: 19865, y: 560, w: 80, h: 80 },
    { type: 'block', x: 20219, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 20469, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20509, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20759, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 20799, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 21051, y: 482.75756030809134, w: 159, h: 20 },
    { type: 'platform', x: 21436, y: 442.75756030809134, w: 164, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 21841, y: 442.75756030809134, w: 143, h: 20 },
    { type: 'platform', x: 22226, y: 442.75756030809134, w: 139, h: 20 },
    { type: 'spike', x: 22465, y: 600, w: 40, h: 40 },
    { type: 'block', x: 22665, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 22715, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 22765, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 22815, y: 400, w: 40, h: 40, flip: true },
    { type: 'platform', x: 22980, y: 479.3016938236542, w: 152, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 23382, y: 479.3016938236542, w: 164, h: 20 },
    { type: 'platform', x: 23701, y: 379.3016938236542, w: 156, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 24107, y: 379.3016938236542, w: 159, h: 20 },
    { type: 'platform', x: 24366, y: 476.81281633209437, w: 169, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 24854, y: 560, w: 154, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 25328, y: 560, w: 163, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 25810, y: 560, w: 154, h: 20 },
    { type: 'platform', x: 26063, y: 521.6391968610696, w: 149, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 26472, y: 521.6391968610696, w: 155, h: 20 },
    { type: 'platform', x: 26779, y: 421.63919686106965, w: 136, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 27204, y: 481.63919686106965, w: 162, h: 20 },
    { type: 'block', x: 27466, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 27716, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 27756, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 28006, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 28046, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 28086, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 28416, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 28456, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 28775, y: 600, w: 40, h: 40 },
    { type: 'block', x: 28975, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 29025, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 29075, y: 400, w: 40, h: 40, flip: true },
    { type: 'platform', x: 29280, y: 487.9363189940341, w: 132, h: 20 },
    { type: 'platform', x: 29625, y: 487.9363189940341, w: 131, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 30032, y: 547.9363189940341, w: 163, h: 20 },
    { type: 'platform', x: 30416, y: 507.9363189940341, w: 134, h: 20 },
    { type: 'platform', x: 30736, y: 427.9363189940341, w: 155, h: 20 },
    { type: 'spike', x: 30991, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 31031, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 31318, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 31638, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 31958, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 32368, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 32498, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 32538, y: 600, w: 40, h: 40 },
    { type: 'block', x: 32844, y: 560, w: 80, h: 80 },
    { type: 'block', x: 33024, y: 480, w: 80, h: 160 },
    { type: 'block', x: 33204, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 33551, y: 600, w: 40, h: 40 },
    { type: 'block', x: 33751, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 33801, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 33851, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 33901, y: 400, w: 40, h: 40, flip: true },
    { type: 'block', x: 34054, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 34304, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 34344, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 34594, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 34634, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 34970, y: 600, w: 40, h: 40 },
    { type: 'block', x: 35170, y: 440, w: 200, h: 40 },
    { type: 'spike', x: 35220, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 35270, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 35320, y: 400, w: 40, h: 40, flip: true },
    { type: 'spike', x: 35499, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 35539, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 35860, y: 501.7644375306554, w: 147, h: 20 },
    { type: 'platform', x: 36167, y: 421.7644375306554, w: 144, h: 20 },
    { type: 'platform', x: 36512, y: 381.7644375306554, w: 149, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 36955, y: 501.7644375306554, w: 152, h: 20 },
    { type: 'spike', x: 37207, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 37247, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 37287, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 37533, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 37573, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 37613, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 37860, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 37900, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 38340, y: 600, w: 40, h: 40 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 39000, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
