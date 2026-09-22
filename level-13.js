/* =========================================================
   УРОВЕНЬ 13 — «Изумруд»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=13
   ---------------------------------------------------------
   Сгенерированный уровень (10 из 20): длина 13750 px
   (~28.6 сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['13'] = {
    id: 13,
    name: 'Level 13',
    length: 13750,
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: 150, end: 175 },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: 'emerald',
    theme: {
      name: 'Изумруд',
      colors: {
        playerA: '#66ffd9',
        playerB: '#00bf8f',
        spike: '#ff5ca8',
        block: '#3dd9a3',
        blockFill: 'rgba(61,217,163,0.15)',
        platform: '#a4ffe6',
        finishA: '#ffe066',
        finishB: '#3dd9a3',
        ground: '#3dd9a3',
      },
    },
    objects: [
    { type: 'block', x: 441, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 691, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 731, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 771, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 927, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 967, y: 600, w: 40, h: 40 },
    { type: 'block', x: 1224, y: 560, w: 80, h: 80 },
    { type: 'block', x: 1404, y: 480, w: 80, h: 160 },
    { type: 'block', x: 1584, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 1966, y: 600, w: 40, h: 40 },
    { type: 'block', x: 2240, y: 560, w: 80, h: 80 },
    { type: 'block', x: 2420, y: 480, w: 80, h: 160 },
    { type: 'block', x: 2600, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 2939, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 2979, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3205, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 3245, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 3531, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 3851, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 4171, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 4581, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 4711, y: 560, w: 140, h: 20 },
    { type: 'platform', x: 5031, y: 460, w: 140, h: 20 },
    { type: 'platform', x: 5351, y: 560, w: 140, h: 20 },

      // ---------- следующий этап ----------
    { type: 'spike', x: 5761, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 5891, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6137, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 6373, y: 600, w: 40, h: 40 },
    { type: 'block', x: 6697, y: 560, w: 80, h: 80 },
    { type: 'block', x: 6877, y: 480, w: 80, h: 160 },
    { type: 'block', x: 7057, y: 560, w: 80, h: 80 },
    { type: 'block', x: 7389, y: 560, w: 80, h: 80 },
    { type: 'block', x: 7569, y: 480, w: 80, h: 160 },
    { type: 'block', x: 7749, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 8079, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8119, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 8159, y: 600, w: 40, h: 40 },
    { type: 'block', x: 8395, y: 560, w: 80, h: 80 },
    { type: 'block', x: 8575, y: 480, w: 80, h: 160 },
    { type: 'block', x: 8755, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 9120, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9160, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9396, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 9596, y: 600, w: 40, h: 40 },
    { type: 'block', x: 9929, y: 560, w: 80, h: 80 },
    { type: 'block', x: 10109, y: 480, w: 80, h: 160 },
    { type: 'block', x: 10289, y: 560, w: 80, h: 80 },
    { type: 'spike', x: 10632, y: 600, w: 40, h: 40 },
    { type: 'spike', x: 10672, y: 600, w: 40, h: 40 },
    { type: 'platform', x: 10944, y: 475.9487420413643, w: 134, h: 20 },
    { type: 'platform', x: 11273, y: 415.9487420413643, w: 141, h: 20 },
    { type: 'platform', x: 11607, y: 375.9487420413643, w: 165, h: 20 },

      // ---------- следующий этап ----------
    { type: 'platform', x: 12032, y: 435.9487420413643, w: 150, h: 20 },

      // ---------- следующий этап ----------
    { type: 'finish', x: 13350, y: 380, w: 60, h: 260 },
    ]
  };
})(window);
