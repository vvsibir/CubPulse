// Генератор уровней 4..20 для C:\git\gm-jump.
// Правила движка: GROUND_Y=640, прыжок: высота ~144 px, дальность ~309 px.
// spike(40x40, y=600), flip-шипы под блоком-потолком (y=440,h=40), блоки от пола (h=640-y),
// платформы (h=20), финиш-ворота (x=length-400, y=380, w=60, h=260).
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..') + '/';

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const THEMES = {
  4:  { name: 'Аврора',       music: 'aurora',   bg: [90, 160],  a: '#7dffb0', b: '#33d1ff', spike: '#ff6b6b', block: '#7dffb0', pf: 'rgba(125,255,176,0.15)', plat: '#e8ff8f', fa: '#ffe066', fb: '#7dffb0', gr: '#7dffb0' },
  5:  { name: 'Вулкан',       music: 'lava',     bg: [10, 40],   a: '#ffb300', b: '#ff3d2e', spike: '#ffd166', block: '#ff5e3a', pf: 'rgba(255,94,58,0.15)',   plat: '#ff9d5c', fa: '#ffd166', fb: '#ff3d2e', gr: '#ff5e3a' },
  6:  { name: 'Лёд',          music: 'ice',      bg: [190, 225], a: '#9be8ff', b: '#6f9eff', spike: '#ff6b9d', block: '#9be8ff', pf: 'rgba(155,232,255,0.15)', plat: '#d6f4ff', fa: '#ffffff', fb: '#9be8ff', gr: '#9be8ff' },
  7:  { name: 'Пустыня',      music: 'desert',   bg: [35, 55],   a: '#ffd97a', b: '#ff9f45', spike: '#8a5a2b', block: '#e8b872', pf: 'rgba(232,184,114,0.15)', plat: '#ffe9a8', fa: '#ffd166', fb: '#ff9f45', gr: '#e8b872' },
  8:  { name: 'Космос',       music: 'cosmos',   bg: [275, 305], a: '#e0b3ff', b: '#7a5cff', spike: '#ff5ca8', block: '#b48aff', pf: 'rgba(180,138,255,0.15)', plat: '#d9c9ff', fa: '#ff5ca8', fb: '#7a5cff', gr: '#7a5cff' },
  9:  { name: 'Лес',          music: 'forest',   bg: [95, 130],  a: '#a8f06e', b: '#3fbf5a', spike: '#ff7a4d', block: '#6edb7a', pf: 'rgba(110,219,122,0.15)', plat: '#c9f2a1', fa: '#ffd166', fb: '#6edb7a', gr: '#6edb7a' },
  10: { name: 'Океан',        music: 'ocean',    bg: [200, 230], a: '#7fd4ff', b: '#2f6bff', spike: '#ff7a5c', block: '#4dabff', pf: 'rgba(77,171,255,0.15)',  plat: '#9fe0ff', fa: '#ffe066', fb: '#4dabff', gr: '#4dabff' },
  11: { name: 'Вишня',        music: 'cherry',   bg: [340, 360], a: '#ff9ec2', b: '#e8355e', spike: '#ffd166', block: '#ff6b8f', pf: 'rgba(255,107,143,0.15)', plat: '#ffc2d1', fa: '#ffd166', fb: '#ff6b8f', gr: '#ff6b8f' },
  12: { name: 'Золото',       music: 'gold',     bg: [40, 60],   a: '#fff179', b: '#ffb300', spike: '#ff4d6d', block: '#ffd166', pf: 'rgba(255,209,102,0.15)', plat: '#fff3b0', fa: '#ffffff', fb: '#ffd166', gr: '#ffd166' },
  13: { name: 'Изумруд',      music: 'emerald',  bg: [150, 175], a: '#66ffd9', b: '#00bf8f', spike: '#ff5ca8', block: '#3dd9a3', pf: 'rgba(61,217,163,0.15)',  plat: '#a4ffe6', fa: '#ffe066', fb: '#3dd9a3', gr: '#3dd9a3' },
  14: { name: 'Электрик',     music: 'volt',     bg: [185, 205], a: '#66e0ff', b: '#3d5cff', spike: '#ffd166', block: '#00e0ff', pf: 'rgba(0,224,255,0.15)',  plat: '#9fecff', fa: '#ffe066', fb: '#00e0ff', gr: '#00e0ff' },
  15: { name: 'Шторм',        music: 'storm',    bg: [210, 235], a: '#cfe0ff', b: '#6b7fff', spike: '#ff6b6b', block: '#8fa6d9', pf: 'rgba(143,166,217,0.15)', plat: '#d6e4ff', fa: '#ffd166', fb: '#8fa6d9', gr: '#8fa6d9' },
  16: { name: 'Обсидиан',     music: 'obsidian', bg: [260, 290], a: '#d9b3ff', b: '#8a4dff', spike: '#ff4d6d', block: '#a06bff', pf: 'rgba(160,107,255,0.15)', plat: '#cdb3ff', fa: '#ffd166', fb: '#a06bff', gr: '#a06bff' },
  17: { name: 'Неон-розовый', music: 'neon',     bg: [300, 330], a: '#ffb3ec', b: '#ff3d9e', spike: '#66e0ff', block: '#ff6bb5', pf: 'rgba(255,107,181,0.15)', plat: '#ffd6f0', fa: '#66e0ff', fb: '#ff6bb5', gr: '#ff6bb5' },
  18: { name: 'Мята',         music: 'mint',     bg: [165, 190], a: '#b8ffe8', b: '#5ce6c1', spike: '#ff9d5c', block: '#8ff2d6', pf: 'rgba(143,242,214,0.15)', plat: '#e0fff5', fa: '#ffe066', fb: '#8ff2d6', gr: '#8ff2d6' },
  19: { name: 'Сланец',       music: 'slate',    bg: [215, 245], a: '#e8f0ff', b: '#94a8d6', spike: '#ff8c5c', block: '#a8b8e0', pf: 'rgba(168,184,224,0.15)', plat: '#e0e8ff', fa: '#ffd166', fb: '#a8b8e0', gr: '#a8b8e0' },
  20: { name: 'Радуга',       music: 'rainbow',  bg: [0, 360],   a: '#ff9e9e', b: '#9e9eff', spike: '#9eff9e', block: '#ffe08f', pf: 'rgba(255,224,143,0.15)', plat: '#8fffe0', fa: '#ffffff', fb: '#ffb3ec', gr: '#ffe08f' },
};

const spike = (x) => ({ type: 'spike', x: Math.round(x), y: 600, w: 40, h: 40 });
const fspike = (x) => ({ type: 'spike', x: Math.round(x), y: 400, w: 40, h: 40, flip: true });
const blockG = (x, y) => ({ type: 'block', x: Math.round(x), y, w: 80, h: 640 - y });
const blockC = (x) => ({ type: 'block', x: Math.round(x), y: 440, w: 200, h: 40 });
const plat = (x, y, w) => ({ type: 'platform', x: Math.round(x), y, w: Math.round(w), h: 20 });
const finish = (x) => ({ type: 'finish', x: Math.round(x), y: 380, w: 60, h: 260 });

function makeSections(rng, pad) {
  return {
    warmup(x) {
      const objs = [];
      const n = 2 + Math.floor(rng() * 2);
      for (let i = 0; i < n; i++) { objs.push(spike(x)); x += (220 + rng() * 70) * pad; }
      return { objs, next: x + 110 * pad, label: 'Разминка: одиночные шипы' };
    },
    line(x, n) {
      const objs = [];
      for (let i = 0; i < n; i++) { objs.push(spike(x)); x += 40; }
      return { objs, next: x + (200 + rng() * 100) * pad, label: n + (n === 1 ? ' шип' : n < 4 ? ' шипа' : ' шипов') };
    },
    blockStep(x, steps) {
      const objs = [];
      // Подъём от НИЗКОГО блока (560 — достижим с земли), ступени по 80 px:
      // [560, 480, 400, ...], затем зеркальный спуск. Первый блок никогда не выше 560.
      const heights = [];
      for (let k = 0; k < steps; k++) heights.push(560 - 80 * k);
      for (let k = steps - 2; k >= 0; k--) heights.push(560 - 80 * k);
      for (const y of heights) { objs.push(blockG(x, y)); x += 180; }
      return { objs, next: x + 160 * pad + rng() * 80 * pad, label: 'Лестница из блоков' };
    },
    platChain(x, n, baseY) {
      const objs = [];
      // Первая платформа достижима с земли: вершина не выше ~455 px, берём 470..540
      objs.push(plat(x, 470 + rng() * 70, 130 + rng() * 40));
      let y = objs[0].y;
      let cx = objs[0].x + objs[0].w;
      // Безопасные пары (подъём, зазор между краями платформ): с рассчитанным
      // запасом — парабола прыжка даёт высоту ~144 px на середине (~155 px пути)
      // и возврат на исходный уровень к ~309 px.
      const moves = [
        { dy: -100, gap: 150 + rng() * 20 },
        { dy: -80,  gap: 160 + rng() * 40 },
        { dy: -60,  gap: 170 + rng() * 50 },
        { dy: -40,  gap: 190 + rng() * 50 },
        { dy: 0,    gap: 210 + rng() * 60 },
        { dy: 60,   gap: 230 + rng() * 70 },
        { dy: 120,  gap: 250 + rng() * 80 },
      ];
      for (let i = 1; i < n; i++) {
        const w = 130 + rng() * 40;
        const m = moves[Math.floor(rng() * moves.length)];
        // высота применяется ДО вставки: платформа i+1 стоит на y+dy (а не отстаёт на ход)
        y = Math.max(300, Math.min(560, y + m.dy));
        cx += m.gap;
        objs.push(plat(cx, y, w));
        cx += w;
      }
      return { objs, next: cx + 100, label: 'Прыжки по парящим платформам' };
    },
    corridor(x) {
      const objs = [spike(x), blockC(x + 200)];
      const nf = 2 + Math.floor(rng() * 2);
      for (let i = 0; i < nf; i++) objs.push(fspike(x + 250 + i * 50));
      return { objs, next: x + (500 + rng() * 60) * pad, label: 'Коридор с потолком и шипами сверху' };
    },
    doubleAfterBlock(x) {
      const objs = [blockG(x, 560)];
      const n = 2 + Math.floor(rng() * 2);
      objs.push(spike(x + 250));
      for (let i = 1; i < n; i++) objs.push(spike(x + 250 + i * 40));
      return { objs, next: x + 540 * pad, label: 'Блок-ступенька + шипы' };
    },
    highClimb(x) {
      const objs = [
        plat(x, 560, 140),
        plat(x + 320, 460, 140),
        plat(x + 640, 560, 140),
        spike(x + 1050),
      ];
      return { objs, next: x + 1180, label: 'Большой взлёт' };
    },
  };
}

function build(id) {
  const rng = mulberry32(id * 7919 + 13);
  const length = 5200 + (id - 4) * 950;
  const tier = id - 4; // 0..16
  const pad = tier < 6 ? 0.72 : tier < 12 ? 0.9 : 1; // плотность: легче — компактнее
  const S = makeSections(rng, pad);

  // веса секций по сложности: [warmup, line1, line2, line3, blockStep, platChain, corridor, doubleAfterBlock, highClimb]
  const weights = tier < 6
    ? [0, 5, 4, 2, 3, 3, 1, 3, 2]      // уровни 4-9: без разминки, плотные линии шипов
    : tier < 12
      ? [1, 3, 4, 3, 3, 5, 3, 3, 3]     // уровни 10-15: плотнее, коридоры
      : [0, 2, 3, 4, 4, 5, 4, 4, 3];    // уровни 16-20: тройные шипы, лестницы, коридоры

  const pick = () => {
    const total = weights.reduce((a, b) => a + b, 0);
    let r = rng() * total;
    for (let i = 0; i < weights.length; i++) { r -= weights[i]; if (r < 0) return i; }
    return weights.length - 1;
  };

  const objs = [];
  let x = 440 + rng() * 160;
  let guard = 0;
  let sections = 0;

  while ((x < length - 1500 || sections < 8) && guard++ < 80) {
    let res;
    switch (pick()) {
      case 0: res = S.warmup(x); break;
      case 1: res = S.line(x, 1); break;
      case 2: res = S.line(x, 2); break;
      case 3: res = S.line(x, 3); break;
      case 4: res = S.blockStep(x, 1 + Math.floor(rng() * 2)); break;
      case 5: res = S.platChain(x, 3 + Math.floor(rng() * 3), 380 + Math.floor(rng() * 160)); break;
      case 6: res = S.corridor(x); break;
      case 7: res = S.doubleAfterBlock(x); break;
      case 8: res = S.highClimb(x); break;
    }
    if (res.next > length - 1100) break;
    res.objs.forEach((o) => { o._sec = sections; });
    objs.push.apply(objs, res.objs);
    x = Math.max(res.next, x + 240);
    sections++;
  }

  objs.push(finish(length - 400));
  return { length, objs };
}

function line(o) {
  const p = `x: ${o.x}, y: ${o.y}, w: ${o.w}, h: ${o.h}${o.flip ? ', flip: true' : ''}`;
  return `    { type: '${o.type}', ${p} },`;
}

// Валидатор: проверяет достижимость и границы до записи в файл
function validate(id, length, objs) {
  const problems = [];
  // границы
  for (const o of objs) {
    if (o.x < 200) problems.push('объект раньше старта: ' + o.type + ' x=' + o.x);
    if (o.x + o.w > length) problems.push('объект за длиной: ' + o.type + ' x=' + o.x);
  }
  // платформы: зазор края->край, подъём (только внутри одной секции)
  const ps = objs.filter((o) => o.type === 'platform').sort((a, b) => a.x - b.x);
  for (let i = 1; i < ps.length; i++) {
    const pv = ps[i - 1], cu = ps[i];
    if (pv._sec !== cu._sec) continue; // разные секции (между ними земля)
    const gap = cu.x - (pv.x + pv.w);
    const rise = pv.y - cu.y; // >0 — восходящий прыжок
    if (rise > 0 && gap > 250) problems.push('платформы: подъём ' + rise.toFixed(0) + ' px при зазоре ' + gap + ' px');
    if (rise <= 0 && gap > 335) problems.push('платформы: плоский/нисходящий зазор ' + gap + ' px');
  }
  // кластеры наземных шипов: не шире прыжка
  const sp = objs.filter((o) => o.type === 'spike' && !o.flip).sort((a, b) => a.x - b.x);
  let cluster = 1;
  for (let i = 1; i <= sp.length; i++) {
    if (i < sp.length && sp[i].x - (sp[i - 1].x + sp[i - 1].w) <= 2) cluster++;
    else { if (cluster > 4) problems.push('кластер шипов из ' + cluster); cluster = 1; }
  }
  // блоки-башни (опираются на землю): вершина достижима с земли (y >= 496,
  // прыжок ~144 px) либо по ступени ниже на 80 px слева
  const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
  for (const b of bl) {
    let reach = b.y >= 496;
    if (!reach) {
      reach = bl.some((o) => o !== b && o.y === b.y + 80 && o.x < b.x &&
        b.x - (o.x + o.w) <= 240 && o.x + o.w >= b.x - 260);
    }
    if (!reach) problems.push('слишком высокий блок (недостижим): x=' + b.x + ' y=' + b.y);
  }
  if (problems.length) {
    console.log('  ВНИМАНИЕ level-' + id + ':', problems.join('; '));
    process.exitCode = 1;
  }
}

for (let id = 4; id <= 20; id++) {
  const t = THEMES[id];
  const { length, objs } = build(id);
  validate(id, length, objs);
  const secs = (length / 480).toFixed(1);

  let body = '';
  let lastX = -Infinity;
  for (const o of objs) {
    if (o.x > lastX + 400 && body !== '') body += '\n\n      // ---------- следующий этап ----------';
    body += '\n' + line(o);
    lastX = o.x;
  }

  const file =
`/* =========================================================
   УРОВЕНЬ ${id} — «${t.name}»
   ---------------------------------------------------------
   Регистрируется в реестре window.GM_LEVELS.
   Запуск: gm-1.html?level=${id}
   ---------------------------------------------------------
   Сгенерированный уровень (${id - 3} из 20): длина ${length} px
   (~${secs} сек), объекты сгенерированы под лимиты движка
   (прыжок: высота ~144 px, дальность ~309 px).
   Ground = 640, координаты абсолютные.
   ========================================================= */
(function (root) {
  root.GM_LEVELS = root.GM_LEVELS || {};
  root.GM_LEVELS['${id}'] = {
    id: ${id},
    name: 'Level ${id}',
    length: ${length},
    groundY: 640,
    // Своя палитра фона (hue-диапазон для градиента и карточки выбора)
    bg: { start: ${t.bg[0]}, end: ${t.bg[1]} },
    // Музыкальная тема из game.js (MUSIC_RECIPES)
    music: '${t.music}',
    theme: {
      name: '${t.name}',
      colors: {
        playerA: '${t.a}',
        playerB: '${t.b}',
        spike: '${t.spike}',
        block: '${t.block}',
        blockFill: '${t.pf}',
        platform: '${t.plat}',
        finishA: '${t.fa}',
        finishB: '${t.fb}',
        ground: '${t.gr}',
      },
    },
    objects: [${body}
    ]
  };
})(window);
`;
  fs.writeFileSync(dir + 'level-' + id + '.js', file);
  const count = objs.filter((o) => o.type !== 'finish').length;
  console.log('level-' + id + '.js: ' + length + ' px, объектов ' + count + ', тема «' + t.name + '»');
}
console.log('Готово: 17 уровней');