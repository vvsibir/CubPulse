// Генератор уровней 4..40 для C:\git\gm-jump.
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
  17: { name: 'Неон-розовый', music: 'neon',     bg: [300, 330], a: '#ffb3ec', b: '#ff3d9e', spike: '#66e0ff', block: '#ff6bb5', pf: 'rgba(255,107,181,0.15)', plat: '#ffd6f0', fa: '#66e0ff', fb: '#ff6bb5', gr: '#ff6bb5', musicSpeed: 2 },
  18: { name: 'Мята',         music: 'mint',     bg: [165, 190], a: '#b8ffe8', b: '#5ce6c1', spike: '#ff9d5c', block: '#8ff2d6', pf: 'rgba(143,242,214,0.15)', plat: '#e0fff5', fa: '#ffe066', fb: '#8ff2d6', gr: '#8ff2d6' },
  19: { name: 'Сланец',       music: 'slate',    bg: [215, 245], a: '#e8f0ff', b: '#94a8d6', spike: '#ff8c5c', block: '#a8b8e0', pf: 'rgba(168,184,224,0.15)', plat: '#e0e8ff', fa: '#ffd166', fb: '#a8b8e0', gr: '#a8b8e0' },
  20: { name: 'Радуга',       music: 'rainbow',  bg: [0, 360],   a: '#ff9e9e', b: '#9e9eff', spike: '#9eff9e', block: '#ffe08f', pf: 'rgba(255,224,143,0.15)', plat: '#8fffe0', fa: '#ffffff', fb: '#ffb3ec', gr: '#ffe08f' },
  21: { name: 'Сапфир',       music: 'sapphire', bg: [215, 235], a: '#9fd6ff', b: '#3d7fff', spike: '#ffd166', block: '#6ba8ff', pf: 'rgba(107,168,255,0.15)', plat: '#c3e4ff', fa: '#ffffff', fb: '#6ba8ff', gr: '#6ba8ff' },
  22: { name: 'Тайфун',       music: 'typhoon',  bg: [195, 215], a: '#b8ffd9', b: '#2bd9a3', spike: '#ff5ca8', block: '#5cf2c1', pf: 'rgba(92,242,193,0.15)',  plat: '#d4ffe9', fa: '#ffe066', fb: '#5cf2c1', gr: '#5cf2c1' },
  23: { name: 'Гранат',       music: 'garnet',   bg: [345, 15],  a: '#ff9eab', b: '#d62b4d', spike: '#ffe066', block: '#ff5e7a', pf: 'rgba(255,94,122,0.15)',  plat: '#ffc9d1', fa: '#ffffff', fb: '#ff5e7a', gr: '#ff5e7a' },
  24: { name: 'Платина',      music: 'platinum', bg: [185, 210], a: '#e8f2ff', b: '#a0b8d9', spike: '#ffd166', block: '#c3d6f0', pf: 'rgba(195,214,240,0.15)', plat: '#ecf5ff', fa: '#ffb3ec', fb: '#c3d6f0', gr: '#c3d6f0' },
  25: { name: 'Янтарь',       music: 'amber',    bg: [40, 60],   a: '#fff0a3', b: '#ff9f1c', spike: '#ff4d6d', block: '#ffc14d', pf: 'rgba(255,193,77,0.15)',  plat: '#fff6c9', fa: '#ffffff', fb: '#ffc14d', gr: '#ffc14d' },
  26: { name: 'Лазурь',       music: 'azure',    bg: [190, 210], a: '#a3ecff', b: '#2db2ff', spike: '#ff5e7a', block: '#5cd2ff', pf: 'rgba(92,210,255,0.15)',  plat: '#d0f3ff', fa: '#ffe066', fb: '#5cd2ff', gr: '#5cd2ff' },
  27: { name: 'Базальт',      music: 'basalt',   bg: [230, 255], a: '#e8dfff', b: '#8a7fd6', spike: '#ff9d5c', block: '#b3a8e8', pf: 'rgba(179,168,232,0.15)', plat: '#e6dbff', fa: '#ffd166', fb: '#b3a8e8', gr: '#b3a8e8' },
  28: { name: 'Роза',         music: 'rose',     bg: [330, 350], a: '#ffc2ec', b: '#ff5cb8', spike: '#9eff9e', block: '#ff7fc4', pf: 'rgba(255,127,196,0.15)', plat: '#ffe0f5', fa: '#ffffff', fb: '#ff7fc4', gr: '#ff7fc4' },
  29: { name: 'Пепел',        music: 'ash',      bg: [200, 225], a: '#e8ecf5', b: '#9aa8c3', spike: '#ff6b6b', block: '#b6c2d9', pf: 'rgba(182,194,217,0.15)', plat: '#e0e8f5', fa: '#ffd166', fb: '#b6c2d9', gr: '#b6c2d9' },
  30: { name: 'Топаз',        music: 'topaz',    bg: [38, 55],   a: '#ffe6a3', b: '#ff9f45', spike: '#3d7fff', block: '#ffcc66', pf: 'rgba(255,204,102,0.15)', plat: '#fff0cc', fa: '#ffffff', fb: '#ffcc66', gr: '#ffcc66' },
  31: { name: 'Кобальт',      music: 'cobalt',   bg: [220, 240], a: '#b8d6ff', b: '#3d66ff', spike: '#ffe066', block: '#7ea8ff', pf: 'rgba(126,168,255,0.15)', plat: '#d0e0ff', fa: '#ffffff', fb: '#7ea8ff', gr: '#7ea8ff' },
  32: { name: 'Марс',         music: 'mars',     bg: [15, 35],   a: '#ffb394', b: '#e85c2b', spike: '#ffd166', block: '#ff7f4d', pf: 'rgba(255,127,77,0.15)',  plat: '#ffcfb3', fa: '#ffffff', fb: '#ff7f4d', gr: '#ff7f4d' },
  33: { name: 'Арктика',      music: 'arctic',   bg: [195, 215], a: '#d6f4ff', b: '#7fd6ff', spike: '#ff6b9d', block: '#a8e8ff', pf: 'rgba(168,232,255,0.15)', plat: '#e8faff', fa: '#ffe066', fb: '#a8e8ff', gr: '#a8e8ff' },
  34: { name: 'Гроза',        music: 'thunder',  bg: [245, 265], a: '#e8d6ff', b: '#8f5cff', spike: '#ff5ca8', block: '#b366ff', pf: 'rgba(179,102,255,0.15)', plat: '#e3d0ff', fa: '#ffd166', fb: '#b366ff', gr: '#b366ff' },
  35: { name: 'Кварц',        music: 'quartz',   bg: [50, 70],   a: '#fff0cc', b: '#e8b84d', spike: '#5ce6c1', block: '#ffd68a', pf: 'rgba(255,214,138,0.15)', plat: '#fff5de', fa: '#ffffff', fb: '#ffd68a', gr: '#ffd68a' },
  36: { name: 'Смальта',      music: 'smalt',    bg: [210, 235], a: '#c3e4ff', b: '#4d8fff', spike: '#ff8c5c', block: '#8fb8ff', pf: 'rgba(143,184,255,0.15)', plat: '#d8ecff', fa: '#ffd166', fb: '#8fb8ff', gr: '#8fb8ff' },
  37: { name: 'Цитрус',       music: 'citrus',   bg: [70, 95],   a: '#e8ffb3', b: '#8fd62b', spike: '#ff5e7a', block: '#b6ff5c', pf: 'rgba(182,255,92,0.15)',  plat: '#ecffd4', fa: '#ffffff', fb: '#b6ff5c', gr: '#b6ff5c' },
  38: { name: 'Ноктюрн',      music: 'nocturne', bg: [245, 275], a: '#d6c2ff', b: '#7f4dff', spike: '#66e0ff', block: '#a87fff', pf: 'rgba(168,127,255,0.15)', plat: '#e0d0ff', fa: '#ffe066', fb: '#a87fff', gr: '#a87fff' },
  39: { name: 'Фламинго',     music: 'flamingo', bg: [325, 345], a: '#ffb3d6', b: '#ff4d94', spike: '#9eff9e', block: '#ff7fb3', pf: 'rgba(255,127,179,0.15)', plat: '#ffdcec', fa: '#ffffff', fb: '#ff7fb3', gr: '#ff7fb3' },
  40: { name: 'Ультра',       music: 'ultra',    bg: [270, 300], a: '#d6b3ff', b: '#8f4dff', spike: '#ffd166', block: '#b37fff', pf: 'rgba(179,127,255,0.15)', plat: '#e3ccff', fa: '#ffb3ec', fb: '#b37fff', gr: '#b37fff' },
};

const spike = (x) => ({ type: 'spike', x: Math.round(x), y: 600, w: 40, h: 40 });
const fspike = (x) => ({ type: 'spike', x: Math.round(x), y: 480, w: 40, h: 40, flip: true }); // свисает под потолком blockC (y=440..480)
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
  const tier = id - 4; // 0..36
  const pad = tier < 6 ? 0.72 : tier < 12 ? 0.9 : 1; // плотность: легче — компактнее
  const S = makeSections(rng, pad);

  // веса секций по сложности: [warmup, line1, line2, line3, blockStep, platChain, corridor, doubleAfterBlock, highClimb]
  const weights = tier < 6
    ? [0, 5, 4, 2, 3, 3, 1, 3, 2]      // уровни 4-9: без разминки, плотные линии шипов
    : tier < 12
      ? [1, 3, 4, 3, 3, 5, 3, 3, 3]     // уровни 10-15: плотнее, коридоры
      : [0, 2, 3, 4, 4, 5, 4, 4, 3];    // уровни 16-40: тройные шипы, лестницы, коридоры

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

  // Уровни 21-40 длиннее (до ~39.4 тыс. px): лимит секций должен покрывать
  // всю длину, а не заканчиваться хвостом из одиночных шипов.
  while ((x < length - 1500 || sections < 8) && guard++ < 160) {
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

  // «Добивка к финишу». Цикл секций может оборваться задолго до ворот:
  // длинная секция (например, platChain n=5) даёт res.next > length-1100,
  // и break выбрасывает её и ОСТАНАВЛИВАЕТ генерацию — у level-4 контент
  // кончался на x~2368 при длине 5200, до ворот оставалось ~2.4 тыс. px
  // пустой земли («финиш слишком далеко»); похожие хвосты 1..2.4 тыс. px
  // были у большинства уровней. Добиваем хвост одиночными шипами с большим
  // шагом (400 px), пока до ворот не останется ~700 px. Демо-бот («осторожный
  // игрок», горизонт решения ~2.4 с ≈ 1150 px) при ПЛОТНОМ хвосте меняет
  // скрипт прыжков ещё в старом контенте (проверено прогоном: с плотным
  // хвостом из линий/платформ бот падал в старом контенте, x=1472 у шипа
  // 1499 и аналогичные). С зазором 400 px каждая шипа независима (широкий
  // карман приземления), апелляций к горизонту нет — все уровни 4..20
  // проверены демо-ботом и проходятся с первой попытки.
  {
    const lastEnd = objs.reduce((m, o) => (o.type !== 'finish' && o.x + o.w > m ? o.x + o.w : m), -Infinity);
    const gate = length - 400;
    if (gate - lastEnd > 900) { // заметная пустота перед воротами — добавляем шипы
      let tailGuard = 0;
      let xt = lastEnd + 400; // отступ после последнего препятствия
      while (xt < length - 700 && tailGuard++ < 100) {
        objs.push(spike(xt));
        xt += 400;
        sections++;
      }
    }
  }

  objs.push(finish(length - 400));

  // Уровень 17: свисающие шипы (flip) под самыми низкими платформами (y=560).
  // Ряд из 3 шипов по 40 px, по центру платформы, от нижней кромки (y=580).
  if (id === 17) {
    const lows = objs.filter((o) => o.type === 'platform' && o.y === 560);
    for (const p of lows) {
      const start = Math.round(p.x + (p.w - 120) / 2);
      for (let i = 0; i < 3; i++) {
        objs.push({ type: 'spike', x: start + i * 40, y: 580, w: 40, h: 40, flip: true, _sec: p._sec });
      }
    }
    // стабильная сортировка по x, чтобы порядок в файле соответствовал правилу генератора
    objs.sort((a, b) => a.x - b.x);

    // Исправление барьера: коридор запуска на вход лестницы (блок-вход 560)
    // не должен быть накрыт кластером шипов. Коридор запуска на верх b с земли:
    // xf ∈ [b.x-318, b.x-177] (посадка на верх при +257..278 px, игрок 40 px).
    // Если свободного участка < 40 px — вход недостижим, шипы накрывающие
    // коридор убираем (проверено BFS: зона 11529..13000 была единственным
    // непроходимым участком level-17, причина — кластер 12299..12439).
    const blocks = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639);
    const spikes = objs.filter((o) => o.type === 'spike' && !o.flip);
    for (const b of blocks) {
      if (b.y > 560) continue; // вход лестницы всегда 560; ступени выше не стартуют с земли
      const isTowerEntry = blocks.some((o) => o !== b && o.x > b.x && o.x - (b.x + b.w) <= 260 && o.y < b.y);
      if (!isTowerEntry) continue;
      const L0 = b.x - 318, L1 = b.x - 177;
      const cover = (x) => spikes.some((s) => s.x < b.x && x + 40 > s.x + 10 && x < s.x + 30);
      let free = 0;
      for (let x = L0; x <= L1; x += 4) if (!cover(x)) free += 4;
      if (free >= 40) continue;
      const toRemove = spikes.filter((s) => s.x < b.x && s.x + 30 > L0 && s.x - 30 < L1);
      for (const s of toRemove) {
        const i = objs.indexOf(s);
        if (i >= 0) objs.splice(i, 1);
      }
      console.log('  ремонт level-' + id + ': убран кластер шипов из коридора запуска блока x=' + b.x + ' y=' + b.y);
    }
  }

  // ------------------------------------------------
  // Ремонт непроходимых коридоров (уровни 5, 7, 9, 11, 13, 16, 19).
  // Общий принцип (тот же, что и в level-17): ряд шипов, стоящий в кармане
  // приземления или в коридоре запуска предыдущего препятствия, разрывает
  // цепочку прыжков демо-бота. Единственный честный оракул проходимости —
  // полный прогон бота по уровню (BFS-зонд ненадёжен), поэтому каждое правило
  // проверено прогоном: после ремонта бот проходит уровень с первой попытки.
  const gsp = () => objs.filter((o) => o.type === 'spike' && !o.flip).sort((a, b) => a.x - b.x);
  const srows = (list) => { // соседние шипы (зазор <= 2 px) — одна «линия»
    const out = [];
    for (const s of list) {
      const last = out.length ? out[out.length - 1] : null;
      if (last && s.x - (last[last.length - 1].x + 40) <= 2) last.push(s);
      else out.push([s]);
    }
    return out;
  };
  const zS = (g) => g[0].x - 30;              // начало зоны смерти линии (игрок 40 px, hitbox шипа +10..+30)
  const zE = (g) => g[g.length - 1].x + 30;   // конец зоны смерти линии
  const rm = (s, why) => {
    const i = objs.indexOf(s);
    if (i >= 0) { objs.splice(i, 1); console.log('  ремонт level-' + id + ': ' + why); }
  };

  if (id === 5) {
    // «Одиночный шип в кармане приземления пары». Ряд 1057 стоит в кармане
    // (836..1027) после пары 766/806; цепочка 1057→1303→1550/1590 даёт карманы
    // 191/186/187 px — демо-бот не находит продолжения с первой попытки и падает
    // уже на первой паре 491/531 (проверено прогоном). Убираем одиночный 1057.
    const rr = srows(gsp());
    for (let i = 1; i < rr.length - 1; i++) {
      if (rr[i].length !== 1) continue;                  // только одиночный ряд
      const gL = zS(rr[i]) - zE(rr[i - 1]);
      const gR = zS(rr[i + 1]) - zE(rr[i]);
      if (gL <= 200 && gR <= 200) {
        rm(rr[i][0], 'убран одиночный шип x=' + rr[i][0].x + ', зажатый между зонами (карманы ' + gL + '/' + gR + ' px)');
        break;
      }
    }
  }

  if (id === 7) {
    // «Первый член тройки на выходе из флип-коридора». После коридора 1943..2143
    // и пары-выхода 2119/2159 тройка 2359/2399/2439 стоит в кармане 140 px —
    // коридор-выход не проходится ботом. Узор после второго коридора (5222)
    // терпимее (зазор 227 px) — правило срабатывает только в первом случае.
    const ceil = objs.filter((o) => o.type === 'block' && o.y === 440 && o.w === 200);
    for (const c of ceil) {
      const rr = srows(gsp());
      const pair = rr.find((g) => zS(g) >= c.x && zS(g) < c.x + c.w + 120);
      if (!pair || pair.length !== 2) continue;
      const idx = rr.indexOf(pair);
      const nxt = rr[idx + 1];
      if (!nxt) continue;
      const gap = zS(nxt) - zE(pair);
      if (gap <= 160) rm(nxt[0], 'убран первый член ряда x=' + nxt[0].x + ' в кармане ' + gap + ' px после пары-выхода из флип-коридора x=' + c.x);
    }
  }

  if (id === 9) {
    // «Одиночный шип после хвоста кластера». Хвост кластера — одиночный 3645
    // в кармане 39 px после пары 3506/3546 (весь кластер 3506/3546+3645).
    // Прыжок с блока 3256 приземляется у 3760, а одиночный 3900 в кармане
    // 195 px после кластера не оставляет продолжения. Убираем 3900.
    const rr = srows(gsp());
    for (let i = 2; i < rr.length; i++) {
      const g = rr[i], p = rr[i - 1];
      if (g.length !== 1 || p.length !== 1) continue;    // одиночный после одиночного хвоста
      const gap = zS(g) - zE(p);
      if (gap < 150 || gap > 220) continue;
      if (zS(p) - zE(rr[i - 2]) <= 60) {                 // хвост вплотную к своей линии
        rm(g[0], 'убран одиночный шип x=' + g[0].x + ' в кармане ' + gap + ' px после хвоста кластера (x=' + p[0].x + ')');
        break;
      }
    }
  }

  if (id === 11) {
    // «Одиночный шип в кармане тройки». Тройка 9467/9507/9547, одиночный 9703
    // в кармане 96 px, далее коридор 9972..10372 со своим наземным шипом 9972.
    // Убираем одиночный 9703 — карман до коридора раскрывается до ~230 px.
    const rr = srows(gsp());
    for (let i = 1; i < rr.length; i++) {
      const g = rr[i], p = rr[i - 1];
      if (g.length !== 1 || p.length < 3) continue;      // одиночный после тройки
      const gap = zS(g) - zE(p);
      if (gap <= 110) {
        rm(g[0], 'убран одиночный шип x=' + g[0].x + ' в кармане ' + gap + ' px после тройки');
        break;
      }
    }
  }

  if (id === 13) {
    // Уровень 13 — четыре разрыва коридора:
    // (a) старт: тройка 691/731/771 → пара 927/967 в кармане 96 px (непроходимо
    //     — из старта нельзя ни продолжать после тройки, ни перепрыгнуть обе
    //     линии одним прыжком); убираем первый член пары 927.
    // (b) после лестницы 1224/1404/1584 одиночный 1966 в 272 px от её конца —
    //     посадка со спуска приходится в зону шипа; убираем.
    // (c) цепочка одиночных 5761/5891/6137/6373 (зазоры 70/186/176 px) —
    //     средний 6137 убираем: после пары 5761+5891 открывается широкий
    //     карман (422 px) перед 6373.
    // (d) тройка 8079/8119/8159 в 220 px после лестницы 7389..7829 — убираем
    //     последний член, чтобы не зажимать выход с лестницы.
    const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
    const stairs = []; // группы ступеней (соседние блоки <= 260 px) — конец группы = конец лестницы
    for (const b of bl) {
      const last = stairs.length ? stairs[stairs.length - 1] : null;
      if (last && b.x - (last[last.length - 1].x + last[last.length - 1].w) <= 260) last.push(b);
      else stairs.push([b]);
    }
    const stairEnd = (st) => st[st.length - 1].x + st[st.length - 1].w;
    // (a)
    let rr = srows(gsp());
    for (let i = 1; i < rr.length; i++) {
      if (rr[i - 1].length !== 3) continue;
      const gap = zS(rr[i]) - zE(rr[i - 1]);
      if (gap >= 60 && gap <= 120) { rm(rr[i][0], 'убран первый член пары x=' + rr[i][0].x + ' в кармане ' + gap + ' px после тройки'); break; }
    }
    // (b)
    rr = srows(gsp());
    for (const st of stairs) {
      if (st.length < 2) continue;
      const end = stairEnd(st);
      const g = rr.find((r) => zS(r) > end);
      if (!g || g.length !== 1) continue;
      const dist = zS(g) - end;
      if (dist >= 200 && dist <= 320) { rm(g[0], 'убран одиночный шип x=' + g[0].x + ' в ' + dist + ' px после лестницы'); break; }
    }
    // (c)
    rr = srows(gsp());
    for (let i = 0; i < rr.length; i++) {
      let j = i;
      while (j < rr.length && rr[j].length === 1 && (j === i || zS(rr[j]) - zE(rr[j - 1]) < 210)) j++;
      if (j - i >= 3) {
        const mid = rr[Math.floor((i + j - 1) / 2)];
        rm(mid[0], 'убран средний шип x=' + mid[0].x + ' цепочки из ' + (j - i) + ' одиночных рядов');
        break;
      }
    }
    // (d)
    rr = srows(gsp());
    for (const st of stairs) {
      if (st.length < 2) continue;
      const end = stairEnd(st);
      const g = rr.find((r) => zS(r) > end);
      if (!g || g.length !== 3) continue;
      const dist = zS(g) - end;
      if (dist >= 200 && dist <= 280) { rm(g[2], 'убран последний член тройки x=' + g[2].x + ' в ' + dist + ' px после лестницы'); break; }
    }
  }

  if (id === 16) {
    // «Тройка, зажатая между блоком и лестницей». Блок 13724 → тройка
    // 13974/14014/14054 в 140 px, за ней лестница 14264..14624. Окно запуска
    // с блока сужается до ~28 px (зона тройки 13944 начинается вплотную).
    // Убираем первый член тройки — окно становится ~208 px. Первая тройка
    // (13434..) не подходит: за её блоком (13724) идёт плоский блок, а не
    // лестница — правило её не трогает.
    const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
    const rr = srows(gsp());
    for (let i = 0; i < rr.length; i++) {
      const g = rr[i];
      if (g.length !== 3) continue;                      // тройка
      const prevBlk = [...bl].reverse().find((b) => b.x + b.w < zS(g));
      if (!prevBlk) continue;
      const distL = zS(g) - (prevBlk.x + prevBlk.w);
      if (distL < 100 || distL > 200) continue;
      const nextBlk = bl.find((b) => b.x >= zE(g) && b.x > prevBlk.x);
      if (!nextBlk) continue;
      const after = bl.find((b) => b.x > nextBlk.x + nextBlk.w - 1 && b.x - (nextBlk.x + nextBlk.w) <= 260);
      if (!after || after.y >= nextBlk.y) continue;      // за блоком — ещё более высокий (лестница)
      rm(g[0], 'убран первый член тройки x=' + g[0].x + ' в ' + distL + ' px после блока x=' + prevBlk.x + ' перед лестницей x=' + nextBlk.x);
      break;
    }
  }

  if (id === 19) {
    // «Пара шипов между блоком и лестницей». Пара 1842/1882 в 140 px после
    // блока 1592, за ней лестница 2132/2312/2492 — бот, выходя с блока, не
    // успевает перепрыгнуть пару и уходит в зону 1812..1912. Убираем первый
    // член пары. Пара 15130/15170 (после блока 14880) не трогается: за её
    // блоком 15420 нет лестницы.
    const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
    const rr = srows(gsp());
    for (let i = 0; i < rr.length; i++) {
      const g = rr[i];
      if (g.length !== 2) continue;                      // пара
      const prevBlk = [...bl].reverse().find((b) => b.x + b.w < zS(g));
      if (!prevBlk) continue;
      const distL = zS(g) - (prevBlk.x + prevBlk.w);
      if (distL < 100 || distL > 200) continue;
      const nextBlk = bl.find((b) => b.x >= zE(g) && b.x > prevBlk.x);
      if (!nextBlk) continue;
      const after = bl.find((b) => b.x > nextBlk.x + nextBlk.w - 1 && b.x - (nextBlk.x + nextBlk.w) <= 260);
      if (!after || after.y >= nextBlk.y) continue;      // за блоком — ещё более высокий (лестница)
      rm(g[0], 'убран первый член пары x=' + g[0].x + ' в ' + distL + ' px после блока x=' + prevBlk.x + ' перед лестницей x=' + nextBlk.x);
      break;
    }
  }

  if (id === 21) {
    // «Цепочка двух после-блочных секций подряд». Двойной after-block
    // (4391→пара 4641/4681→4931→пара 5181/5221→пара 5471/5511→5752) сжимает
    // карманы приземления: бот падает с платформенного каскада (4146) на
    // землю и не находит продолжения ни с блока 4391, ни с земли перед ним
    // (проверено прогоном: смерть x=4352, decide -2 на земле 4208..4344).
    // Убираем первый член первой группы в цепочке (4641) — карман
    // раскрывается. Второй затык того же типа: тройка 8764/8804/8844 после
    // блока 8514 перед блоком 9054 (смерть x=8736) — убираем первый член 8764.
    // Отличительный признак: за блоком НЕТ лестницы и вплотную (<= 230 px)
    // стоит ещё одна группа шипов (признак цепочки двух after-block секций).
    // Проходимые группы не трогаются: 5181/5221 (за 4931 лестница 5752/5932),
    // 9304/9344 (за 9054 до следующей группы > 230 px).
    const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
    const rr = srows(gsp());
    for (let i = 0; i < rr.length; i++) {
      const g = rr[i];
      if (g.length < 2 || g.length > 3) continue;        // пара или тройка
      const prevBlk = [...bl].reverse().find((b) => b.x + b.w < zS(g));
      if (!prevBlk) continue;
      const distL = zS(g) - (prevBlk.x + prevBlk.w);
      if (distL < 100 || distL > 200) continue;
      const nextBlk = bl.find((b) => b.x >= zE(g) && b.x > prevBlk.x);
      if (!nextBlk) continue;
      const after = bl.find((b) => b.x > nextBlk.x + nextBlk.w - 1 && b.x - (nextBlk.x + nextBlk.w) <= 260);
      if (after && after.y < nextBlk.y) continue;        // за блоком лестница — ей нужна группа (16/19)
      const g2 = rr.find((h) => zS(h) > nextBlk.x + nextBlk.w - 1 && zS(h) - (nextBlk.x + nextBlk.w) <= 230);
      if (!g2) continue;                                 // нет вплотную следующей группы — не цепочка
      rm(g[0], 'убран первый член группы x=' + g[0].x + ' в ' + distL + ' px после блока x=' + prevBlk.x + ' в цепочке двух after-block секций (следующая группа у блока x=' + nextBlk.x + ')');
    }
  }

  if (id === 24) {
    // «Тройка, зажатая между блоком и лестницей» (тот же карман, что 16/19):
    // тройка 21847/21887/21927 в 140 px после блока 21597, за ней блок 22137
    // и лестница 22317 (y480) — окно запуска с блока сужается до зоны
    // 21817..21957, бот падает на первом члене (смерть x≈752 по цепочке из
    // стартового коридора; проверено прогоном). Убираем первый член 21847.
    // Остальные тройки не подходят: 19316 (за блоком 19606 нет лестницы),
    // 20791 (следующий блок 21597 в 696 px), 17831 (блок 19066 в 1125 px),
    // 20146 (distL 430 px), 4878 (нет лестницы), 4304 (нет блока слева).
    const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
    const rr = srows(gsp());
    for (let i = 0; i < rr.length; i++) {
      const g = rr[i];
      if (g.length !== 3) continue;                      // тройка
      const prevBlk = [...bl].reverse().find((b) => b.x + b.w < zS(g));
      if (!prevBlk) continue;
      const distL = zS(g) - (prevBlk.x + prevBlk.w);
      if (distL < 100 || distL > 200) continue;
      const nextBlk = bl.find((b) => b.x >= zE(g) && b.x > prevBlk.x);
      if (!nextBlk) continue;
      if (nextBlk.x - zE(g) > 360) continue;             // следующий блок далеко
      const after = bl.find((b) => b.x > nextBlk.x + nextBlk.w - 1 && b.x - (nextBlk.x + nextBlk.w) <= 260);
      if (!after || after.y >= nextBlk.y) continue;      // за блоком — более высокий (лестница)
      rm(g[0], 'убран первый член тройки x=' + g[0].x + ' в ' + distL + ' px после блока x=' + prevBlk.x + ' перед лестницей x=' + nextBlk.x);
      break;
    }
  }

  if (id === 26) {
    // «Тройка, зажатая между блоком и лестницей» (узор 16/19): тройка
    // 6407/6447/6487 в 140 px после блока 6157, за ней блок 6697 и лестница
    // 6877 (y480) — зона 6377..6517 вплотную к выходу с блока, бот падает на
    // первом члене. Убираем 6407. Тройки 3490 (блок 6157 в 2557 px), 22160
    // (нет следующего блока), 9504 (нет лестницы), 10139 (distL 235),
    // 20954/8309 (блок далеко) — не подходят.
    const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
    const rr = srows(gsp());
    for (let i = 0; i < rr.length; i++) {
      const g = rr[i];
      if (g.length !== 3) continue;                      // тройка
      const prevBlk = [...bl].reverse().find((b) => b.x + b.w < zS(g));
      if (!prevBlk) continue;
      const distL = zS(g) - (prevBlk.x + prevBlk.w);
      if (distL < 100 || distL > 200) continue;
      const nextBlk = bl.find((b) => b.x >= zE(g) && b.x > prevBlk.x);
      if (!nextBlk) continue;
      if (nextBlk.x - zE(g) > 360) continue;             // следующий блок далеко
      const after = bl.find((b) => b.x > nextBlk.x + nextBlk.w - 1 && b.x - (nextBlk.x + nextBlk.w) <= 260);
      if (!after || after.y >= nextBlk.y) continue;      // за блоком — более высокий (лестница)
      rm(g[0], 'убран первый член тройки x=' + g[0].x + ' в ' + distL + ' px после блока x=' + prevBlk.x + ' перед лестницей x=' + nextBlk.x);
      break;
    }
  }

  if (id === 27) {
    // «Висячая платформа над карманом приземления». Платформа 2675
    // (y496.44, конец 2808) висит в 100 px над наземным блоком 2908; слева
    // на той же высоте платформа 2312 (зазор 226 px). Бот не может выстроить
    // прыжок с земли перед блоком 2908 (смерть x=2872, decide -2 на земле;
    // проверено прогоном — после удаления платформы уровень проходится).
    // Убираем платформу 2675. Остальные платформы не подходят: 1979/2312 —
    // блок 2908 дальше 459 px; 17336 — слева нет платформы той же высоты;
    // прочие блоку 80..160 px не предшествуют.
    const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
    const pt = objs.filter((o) => o.type === 'platform').sort((a, b) => a.x - b.x);
    for (let i = 1; i < pt.length; i++) {
      const p = pt[i];
      if (p.y >= 560) continue;                          // наземная платформа
      const blk = bl.find((b) => b.x >= p.x + p.w);
      if (!blk) continue;
      const gapR = blk.x - (p.x + p.w);
      if (gapR < 80 || gapR > 160) continue;             // наземный блок в 80..160 px
      const left = pt[i - 1];
      if (!left || Math.abs(left.y - p.y) > 1) continue; // слева — та же высота
      const gapL = p.x - (left.x + left.w);
      if (gapL < 180 || gapL > 260) continue;
      rm(p, 'убрана висячая платформа x=' + p.x + ' (y=' + p.y.toFixed(1) + ', конец ' + (p.x + p.w) + ') в ' + gapR + ' px над блоком x=' + blk.x);
      break;
    }
  }

  if (id === 29) {
    // «Одиночный шип в кармане между платформами». Одиночный 10061 стоит
    // между платформами 9651 (зазор 240 px до зоны 10031) и 10191 (зазор
    // 100 px от зоны 10091) — бот, выходя с платформы 9651, не успевает
    // перепрыгнуть шип и далее бьётся о цепочку одиночных 18678/23015
    // (проверено прогоном). Убираем 10061. Прочие одиночные не подходят:
    // 6612 (зазор 70), 7162/8509 (платформа слева далеко), 18678 (справа
    // платформа в 2501 px), 23015/27939 (зазоры вне диапазона).
    const pt = objs.filter((o) => o.type === 'platform').sort((a, b) => a.x - b.x);
    const rr = srows(gsp());
    for (let i = 0; i < rr.length; i++) {
      const g = rr[i];
      if (g.length !== 1) continue;                      // одиночный ряд
      const left = [...pt].reverse().find((p) => p.x + p.w < zS(g));
      if (!left) continue;
      const gapL = zS(g) - (left.x + left.w);
      if (gapL < 200 || gapL > 280) continue;
      const right = pt.find((p) => p.x >= zE(g));
      if (!right) continue;
      const gapR = right.x - zE(g);
      if (gapR < 50 || gapR > 170) continue;
      rm(g[0], 'убран одиночный шип x=' + g[0].x + ' в кармане платформ ' + left.x + '..' + right.x + ' (зазоры ' + gapL + '/' + gapR + ' px)');
      break;
    }
  }

  if (id === 33) {
    // «Пара в цепочке двух after-block секций» (узор 21): пара 28060/28100
    // в 140 px после блока 27810, за ней блок 28350 и вплотную (140 px)
    // тройка 28600/28640/28680 — карманы схлопываются, бот падает у пары
    // (смерть x=28032). Убираем первый член 28060. Пара 12750 отсечена
    // (следующий блок 18112 в 5292 px), тройка 22904 — не пара.
    const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
    const rr = srows(gsp());
    for (let i = 0; i < rr.length; i++) {
      const g = rr[i];
      if (g.length !== 2) continue;                      // пара
      const prevBlk = [...bl].reverse().find((b) => b.x + b.w < zS(g));
      if (!prevBlk) continue;
      const distL = zS(g) - (prevBlk.x + prevBlk.w);
      if (distL < 100 || distL > 200) continue;
      const nextBlk = bl.find((b) => b.x >= zE(g) && b.x > prevBlk.x);
      if (!nextBlk) continue;
      if (nextBlk.x - zE(g) > 600) continue;             // следующий блок далеко
      const after = bl.find((b) => b.x > nextBlk.x + nextBlk.w - 1 && b.x - (nextBlk.x + nextBlk.w) <= 260);
      if (after && after.y < nextBlk.y) continue;        // лестница — свой тип (16/19)
      const g2 = rr.find((h) => zS(h) > nextBlk.x + nextBlk.w - 1 && zS(h) - (nextBlk.x + nextBlk.w) <= 230);
      if (!g2 || g2.length !== 3) continue;              // вплотную — тройка
      rm(g[0], 'убран первый член пары x=' + g[0].x + ' в ' + distL + ' px после блока x=' + prevBlk.x + ' в цепочке two after-block (следующая тройка у блока x=' + nextBlk.x + ')');
      break;
    }
  }

  if (id === 34) {
    // «Пары между блоком и лестницей», смерть на втором члене — убираем ОБА:
    // 774/814 в 140 px после блока 524 (лестница 1566 после блока 1386) и
    // 9680/9720 в 140 px после блока 9430 (лестница 10150 после блока 9970).
    // Пары 2361 (блок 3831 в 1400 px), 4081 (блок 5419 в 1268 px), 7316
    // (блок 8704 в 1318 px) — следующий блок дальше 600 px, не трогаются.
    const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
    const rr = srows(gsp());
    for (let i = 0; i < rr.length; i++) {
      const g = rr[i];
      if (g.length !== 2) continue;                      // пара
      const prevBlk = [...bl].reverse().find((b) => b.x + b.w < zS(g));
      if (!prevBlk) continue;
      const distL = zS(g) - (prevBlk.x + prevBlk.w);
      if (distL < 100 || distL > 200) continue;
      const nextBlk = bl.find((b) => b.x >= zE(g) && b.x > prevBlk.x);
      if (!nextBlk) continue;
      if (nextBlk.x - zE(g) > 600) continue;             // следующий блок далеко
      const after = bl.find((b) => b.x > nextBlk.x + nextBlk.w - 1 && b.x - (nextBlk.x + nextBlk.w) <= 260);
      if (!after || after.y >= nextBlk.y) continue;      // за блоком — более высокий (лестница)
      rm(g[0], 'убран первый член пары x=' + g[0].x + ' в ' + distL + ' px после блока x=' + prevBlk.x + ' перед лестницей x=' + nextBlk.x);
      rm(g[1], 'убран второй член пары x=' + g[1].x + ' (пара целиком)');
    }
  }

  if (id === 36) {
    // «Пары в цепочках двух after-block секций», смерть на втором члене —
    // убираем ОБА: 26984/27024 в 140 px после блока 26734 → блок 27274 →
    // вплотную тройка 27524/27564/27604 (узор 33) и 33107/33147 в 140 px
    // после блока 32857 → блок 33734 → лестница 33914. Пары 8403 (блок
    // 12137 в 3664 px), 12387 (блок 22933 далеко), 23183 (блок 25708 в
    // 2455 px) — следующий блок дальше 600 px, не трогаются.
    const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
    const rr = srows(gsp());
    for (let i = 0; i < rr.length; i++) {
      const g = rr[i];
      if (g.length !== 2) continue;                      // пара
      const prevBlk = [...bl].reverse().find((b) => b.x + b.w < zS(g));
      if (!prevBlk) continue;
      const distL = zS(g) - (prevBlk.x + prevBlk.w);
      if (distL < 100 || distL > 200) continue;
      const nextBlk = bl.find((b) => b.x >= zE(g) && b.x > prevBlk.x);
      if (!nextBlk) continue;
      if (nextBlk.x - zE(g) > 600) continue;             // следующий блок далеко
      const after = bl.find((b) => b.x > nextBlk.x + nextBlk.w - 1 && b.x - (nextBlk.x + nextBlk.w) <= 260);
      const hasStair = after && after.y < nextBlk.y;     // лестница за блоком
      const g2 = rr.find((h) => zS(h) > nextBlk.x + nextBlk.w - 1 && zS(h) - (nextBlk.x + nextBlk.w) <= 230);
      if (!hasStair && !(g2 && g2.length === 3)) continue; // лестница ИЛИ вплотную тройка
      rm(g[0], 'убран первый член пары x=' + g[0].x + ' в ' + distL + ' px после блока x=' + prevBlk.x + ' (за ним ' + (hasStair ? 'лестница x=' + after.x : 'тройка у следующего блока x=' + nextBlk.x) + ')');
      rm(g[1], 'убран второй член пары x=' + g[1].x + ' (пара целиком)');
    }
  }

  if (id === 38) {
    // «Пара между блоком и лестницей», смерть на втором члене — убираем ОБА:
    // 736/776 в 140 px после блока 486 → блок 1354 → лестница 1534. Пара 3442
    // отсечена (за блоком 4102 нет лестницы), 4352/17272/20997 — следующий
    // блок дальше 600 px.
    const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
    const rr = srows(gsp());
    for (let i = 0; i < rr.length; i++) {
      const g = rr[i];
      if (g.length !== 2) continue;                      // пара
      const prevBlk = [...bl].reverse().find((b) => b.x + b.w < zS(g));
      if (!prevBlk) continue;
      const distL = zS(g) - (prevBlk.x + prevBlk.w);
      if (distL < 100 || distL > 200) continue;
      const nextBlk = bl.find((b) => b.x >= zE(g) && b.x > prevBlk.x);
      if (!nextBlk) continue;
      if (nextBlk.x - zE(g) > 600) continue;             // следующий блок далеко
      const after = bl.find((b) => b.x > nextBlk.x + nextBlk.w - 1 && b.x - (nextBlk.x + nextBlk.w) <= 260);
      if (!after || after.y >= nextBlk.y) continue;      // за блоком — более высокий (лестница)
      rm(g[0], 'убран первый член пары x=' + g[0].x + ' в ' + distL + ' px после блока x=' + prevBlk.x + ' перед лестницей x=' + nextBlk.x);
      rm(g[1], 'убран второй член пары x=' + g[1].x + ' (пара целиком)');
    }
  }

  if (id === 39) {
    // «Пара в цепочке двух after-block секций» (узор 21): пара 19252/19292
    // в 140 px после блока 19002 → блок 19542 → вплотную тройка 19792/19832/
    // 19872 — убираем первый член 19252 (смерть x=19224; проверено прогоном).
    // Пара 2186 отсечена: за блоком 2476 следующая группа — пара 2726/2766,
    // а не тройка.
    const bl = objs.filter((o) => o.type === 'block' && o.y + o.h >= 639).sort((a, b) => a.x - b.x);
    const rr = srows(gsp());
    for (let i = 0; i < rr.length; i++) {
      const g = rr[i];
      if (g.length !== 2) continue;                      // пара
      const prevBlk = [...bl].reverse().find((b) => b.x + b.w < zS(g));
      if (!prevBlk) continue;
      const distL = zS(g) - (prevBlk.x + prevBlk.w);
      if (distL < 100 || distL > 200) continue;
      const nextBlk = bl.find((b) => b.x >= zE(g) && b.x > prevBlk.x);
      if (!nextBlk) continue;
      if (nextBlk.x - zE(g) > 600) continue;             // следующий блок далеко
      const after = bl.find((b) => b.x > nextBlk.x + nextBlk.w - 1 && b.x - (nextBlk.x + nextBlk.w) <= 260);
      if (after && after.y < nextBlk.y) continue;        // лестница — свой тип (16/19)
      const g2 = rr.find((h) => zS(h) > nextBlk.x + nextBlk.w - 1 && zS(h) - (nextBlk.x + nextBlk.w) <= 230);
      if (!g2 || g2.length !== 3) continue;              // вплотную — тройка
      rm(g[0], 'убран первый член пары x=' + g[0].x + ' в ' + distL + ' px после блока x=' + prevBlk.x + ' в цепочке two after-block (следующая тройка у блока x=' + nextBlk.x + ')');
      break;
    }
  }

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

for (let id = 4; id <= 40; id++) {
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
   Сгенерированный уровень (${id - 3} из 37): длина ${length} px
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
    music: '${t.music}',${t.musicSpeed ? '\n    musicSpeed: ' + t.musicSpeed + ', // мелодия ускорена в ' + t.musicSpeed + ' раза (' + Math.round(152 * t.musicSpeed) + ' BPM по шагу 16-х)' : ''}
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
console.log('Готово: 37 уровней');