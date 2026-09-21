/* =========================================================
   УРОВЕНЬ 3 — «Марафон»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=3
   ---------------------------------------------------------
   Самый длинный уровень (~13 200 px): разминка, лестницы,
   коридор с потолком и шипами сверху, ритмичные платформы,
   тройной шип, большой взлёт и протяжённый финальный рывок.
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['3'] = {
    id: 3,
    name: 'Level 3',
    length: 13200,
    groundY: 640,
    // Палитра «закат»: фиолетовый -> розовый
    bg: { start: 260, end: 330 },
    // Тема «Закат»: мелодия Am–Em–F–G (132 BPM), пурпурно-золотые элементы
    music: 'marathon',
    theme: {
      name: 'Закат',
      colors: {
        playerA: '#ff7ec8',
        playerB: '#ff4d6d',
        spike: '#ffd166',
        block: '#c86bff',
        blockFill: 'rgba(200, 107, 255, 0.15)',
        platform: '#ff9d5c',
        finishA: '#ffd166',
        finishB: '#ff4d6d',
        ground: '#c86bff',
      },
    },
    objects: [
      // --- Разминка ---
      { type: 'spike',    x: 600,  y: 600, w: 40, h: 40 },
      { type: 'spike',    x: 900,  y: 600, w: 40, h: 40 },
      { type: 'spike',    x: 1200, y: 600, w: 40, h: 40 },

      // --- Первые платформы ---
      { type: 'platform', x: 1500, y: 520, w: 180, h: 20 },
      { type: 'platform', x: 1800, y: 460, w: 140, h: 20 },
      { type: 'platform', x: 2100, y: 520, w: 140, h: 20 },
      { type: 'spike',    x: 2500, y: 600, w: 40, h: 40 },

      // --- Лестница из блоков ---
      { type: 'block',    x: 2800, y: 560, w: 80, h: 80  },
      { type: 'block',    x: 2980, y: 480, w: 80, h: 160 },
      { type: 'block',    x: 3160, y: 480, w: 80, h: 160 },
      { type: 'block',    x: 3340, y: 560, w: 80, h: 80  },
      { type: 'spike',    x: 3700, y: 600, w: 40, h: 40 },
      { type: 'spike',    x: 3740, y: 600, w: 40, h: 40 },

      // --- Коридор с потолком и шипами сверху ---
      { type: 'spike',    x: 4100, y: 600, w: 40, h: 40 },
      { type: 'block',    x: 4300, y: 440, w: 200, h: 40 },
      { type: 'spike',    x: 4350, y: 400, w: 40, h: 40, flip: true },
      { type: 'spike',    x: 4400, y: 400, w: 40, h: 40, flip: true },
      { type: 'spike',    x: 4450, y: 400, w: 40, h: 40, flip: true },
      { type: 'platform', x: 4650, y: 520, w: 160, h: 20 },
      { type: 'platform', x: 4900, y: 440, w: 160, h: 20 },
      { type: 'platform', x: 5200, y: 520, w: 150, h: 20 },

      // --- Ритмичная лесенка платформ ---
      { type: 'platform', x: 5500, y: 430, w: 150, h: 20 },
      { type: 'platform', x: 5800, y: 520, w: 150, h: 20 },
      { type: 'spike',    x: 6300, y: 600, w: 40, h: 40 },
      { type: 'spike',    x: 6340, y: 600, w: 40, h: 40 },

      // --- Тройной шип и блок-помощник ---
      { type: 'spike',    x: 6750, y: 600, w: 40, h: 40 },
      { type: 'spike',    x: 6790, y: 600, w: 40, h: 40 },
      { type: 'spike',    x: 6830, y: 600, w: 40, h: 40 },
      { type: 'block',    x: 7150, y: 560, w: 80, h: 80  },

      // --- Большой взлёт ---
      { type: 'platform', x: 7450, y: 560, w: 140, h: 20 },
      { type: 'platform', x: 7750, y: 460, w: 140, h: 20 },
      { type: 'platform', x: 8050, y: 560, w: 140, h: 20 },

      // --- Финальный рывок ---
      { type: 'spike',    x: 8400, y: 600, w: 40, h: 40 },
      { type: 'spike',    x: 8800, y: 600, w: 40, h: 40 },
      { type: 'spike',    x: 8840, y: 600, w: 40, h: 40 },
      { type: 'block',    x: 9300, y: 560, w: 80, h: 80  },
      { type: 'block',    x: 9480, y: 480, w: 80, h: 160 },
      { type: 'spike',    x: 10000, y: 600, w: 40, h: 40 },
      { type: 'spike',    x: 10040, y: 600, w: 40, h: 40 },
      { type: 'spike',    x: 10700, y: 600, w: 40, h: 40 },
      { type: 'platform', x: 11250, y: 520, w: 160, h: 20 },
      { type: 'spike',    x: 11850, y: 600, w: 40, h: 40 },
      { type: 'spike',    x: 11890, y: 600, w: 40, h: 40 },

      // --- Финиш ---
      { type: 'finish',   x: 12650, y: 380, w: 60, h: 260 },
    ]
  };
})(window);