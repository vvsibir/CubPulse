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
  17: { name: 'Неон-розовый', music: 'neon',     bg: [300, 330], a: '#ffb3ec', b: '#ff3d9e', spike: '#66e0ff', block: '#ff6bb5', pf: 'rgba(255,107,181,0.15)', plat: '#ffd6f0', fa: '#66e0ff', fb: '#ff6bb5', gr: '#ff6bb5', musicSpeed: 2 },
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
console.log('Готово: 17 уровней');