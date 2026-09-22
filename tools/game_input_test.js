// Интеграционный тест: управление через Pointer Events, отсутствие double-tap,
// выбор уровня по параметру запроса (?level=N)
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..') + '/';
const levelFiles = fs.readdirSync(root)
  .filter((f) => /^level-\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
const levelSrc = levelFiles.map((f) => fs.readFileSync(root + f, 'utf8')).join('\n');
const gameSrc = fs.readFileSync(root + 'game.js', 'utf8');

/* --- Мок Web Audio (как в sound_test.js) --- */
function makeGain() {
  const node = { gain: { value: 0 }, connect() {}, disconnect() {} };
  for (const m of ['setValueAtTime', 'exponentialRampToValueAtTime', 'linearRampToValueAtTime', 'setTargetAtTime', 'cancelScheduledValues']) {
    node.gain[m] = (v, t) => { node.gain.value = v; return node.gain; };
  }
  return node;
}
function makeOsc() {
  return { type: 'sine', frequency: { value: 440, setValueAtTime() {}, exponentialRampToValueAtTime() {} },
           detune: { value: 0 }, connect() {}, disconnect() {}, start() {}, stop() {} };
}
const mockCtx = {
  state: 'running', currentTime: 10, sampleRate: 44100, destination: { connect() {} },
  createGain: makeGain, createOscillator: makeOsc,
  createBuffer(ch, len, sr) { return { getChannelData() { return new Float32Array(len); } }; },
  createBufferSource() { return { buffer: null, connect() {}, start() {}, stop() {}, disconnect() {} }; },
  createBiquadFilter() { return { type: '', frequency: { value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {} }, Q: { value: 0 }, connect() {}, disconnect() {} }; },
  resume() { this.state = 'running'; },
};

/* --- Мок DOM --- */
const events = {};
const docEvents = {};
const canvas = {
  width: 1280, height: 720,
  style: {},
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 1280, height: 720 }),
  addEventListener(type, fn) { (events[type] ||= []).push(fn); },
  setPointerCapture() {},
  getContext() {
    return new Proxy({}, { get: (t, p) => {
      if (p === 'createLinearGradient') return () => ({ addColorStop() {} });
      return () => undefined;
    } });
  },
};
const winHandlers = {};
global.window = {
  innerWidth: 1280, innerHeight: 720,
  AudioContext: function () { return mockCtx; },
  addEventListener(type, fn) { (winHandlers[type] ||= []).push(fn); },
  location: { search: '', href: '' },
};
global.localStorage = { getItem: () => null, setItem: () => {} };

// Мок меню победы/поражения (#menu с кнопками)
const menuBtns = {};
const menuEl = {
  classList: {
    _set: new Set(),
    add(c) { this._set.add(c); },
    remove(c) { this._set.delete(c); },
    toggle(c, force) {
      if (force === undefined) {
        if (this._set.has(c)) this._set.delete(c); else this._set.add(c);
      } else if (force) this._set.add(c);
      else this._set.delete(c);
    },
    contains(c) { return this._set.has(c); },
  },
  querySelector(sel) { return menuBtns[sel] || null; },
};
for (const sel of ['#btn-restart', '#btn-next', '#btn-select']) {
  menuBtns[sel] = {
    addEventListener(type, fn) { if (type === 'click') this._onClick = fn; },
    click() { if (this._onClick) this._onClick(); },
  };
}
global.document = {
  title: '',
  getElementById: (id) => (id === 'game' ? canvas : id === 'menu' ? menuEl : null),
  addEventListener(type, fn) { (docEvents[type] ||= []).push(fn); },
};
global.requestAnimationFrame = () => 0;

const fire = (type, ev) => { (events[type] || []).forEach((fn) => fn(ev)); };
const ptr = (x, y) => ({ preventDefault() {}, isPrimary: true, pointerId: 1, clientX: x, clientY: y });

// Загрузка игры со сценарием выбранного уровня (пересборка моков между запусками)
const clearListeners = () => {
  for (const k of Object.keys(events)) delete events[k];
  for (const k of Object.keys(docEvents)) delete docEvents[k];
  for (const k of Object.keys(winHandlers)) delete winHandlers[k];
};
const boot = (search) => {
  clearListeners();
  global.window.location = { search: search, href: '' };
  menuEl.classList._set.clear();
  const script = levelSrc + '\n' + gameSrc + '\nglobalThis.__game = game;';
  eval(script);
  return globalThis.__game;
};

const game = boot('');

let failures = 0;
const check = (name, fn) => {
  try { fn(); console.log('  OK  ' + name); }
  catch (e) { failures++; console.log(' FAIL ' + name + ' -> ' + e.message); }
};

check('gm-1.html подключает ВСЕ файлы уровней (иначе ?level=N фолбэчится на 1)', () => {
  const html = fs.readFileSync(root + 'gm-1.html', 'utf8');
  const included = [...html.matchAll(/<script src="(level-\d+\.js)"><\/script>/g)].map((m) => m[1]).sort();
  const expected = levelFiles.map((f) => f.toLowerCase()).sort();
  if (included.join(',') !== expected.join(',')) {
    throw new Error('в gm-1.html не все уровни:\n  есть:    ' + included.join(', ') +
      '\n  должно:  ' + expected.join(', '));
  }
});

check('нет mouse/touch-слушателей (исключён синтетический mousedown)', () => {
  for (const t of ['mousedown', 'mouseup', 'mouseleave', 'touchstart', 'touchend', 'touchmove']) {
    if (events[t]) throw new Error('найден слушатель ' + t);
  }
});

check('есть pointerdown/pointerup/pointercancel/pointerleave', () => {
  for (const t of ['pointerdown', 'pointerup', 'pointercancel', 'pointerleave']) {
    if (!events[t] || events[t].length === 0) throw new Error('нет слушателя ' + t);
  }
});

check('защита от long-press: selectstart/contextmenu блокируются глобально', () => {
  if (!docEvents.selectstart || docEvents.selectstart.length === 0) throw new Error('нет selectstart-защиты');
  if (!docEvents.contextmenu || docEvents.contextmenu.length === 0) throw new Error('нет contextmenu-защиты на документе');
  if (events.contextmenu) throw new Error('contextmenu всё ещё на канвасе, а не на документе');
  let prevented = 0;
  docEvents.selectstart[0]({ preventDefault() { prevented++; } });
  docEvents.contextmenu[0]({ preventDefault() { prevented++; } });
  if (prevented !== 2) throw new Error('preventDefault не вызван (' + prevented + ')');
});

check('первый тап стартует бег с музыкой (без прыжка), второй — ровно один прыжок', () => {
  fire('pointerdown', ptr(640, 360));
  if (game.state !== 'playing') throw new Error('первый тап не стартовал: ' + game.state);
  if (!game.sound.musicOn) throw new Error('музыка не включилась первым тапом');
  if (game.player.vy < 0) throw new Error('стартовый тап прыгнул (vy=' + game.player.vy + ')');
  fire('pointerup', { isPrimary: true });
  fire('pointerdown', ptr(640, 360));
  if (game.player.vy >= 0) throw new Error('второй тап не прыгнул');
  if (game.player.jumpBuffer !== 0) throw new Error('jumpBuffer заполнен: ' + game.player.jumpBuffer);
  fire('pointerup', { isPrimary: true });
});

check('буферизация прыжка (тап в воздухе) — штатная фича, не баг', () => {
  game.jumpHeld = false;
  fire('pointerdown', ptr(640, 360)); // игрок в воздухе
  if (game.player.jumpBuffer !== 0.12) throw new Error('буфер не заполнен');
  fire('pointerup', { isPrimary: true });
});

check('клик по иконке звука не вызывает прыжок', () => {
  const x0 = game.player.x;
  fire('pointerdown', ptr(1280 - 40, 84));
  if (!game.sound.muted) throw new Error('мьют не переключился');
  if (game.player.x !== x0) throw new Error('смертельный прыжок от клика на иконку');
});

check('клавиша M переключает звук, Space прыгает', () => {
  game.jumpHeld = false;
  (winHandlers.keydown || []).forEach((fn) => fn({ code: 'KeyM', preventDefault() {} }));
  if (game.sound.muted) throw new Error('KeyM не выключил мьют');
  game.player.onGround = true; game.player.vy = 0;
  (winHandlers.keydown || []).forEach((fn) => fn({ code: 'Space', preventDefault() {} }));
  if (!game.jumpHeld) throw new Error('jumpHeld не установлен по Space');
  if (game.player.vy >= 0) throw new Error('Space не прыгнул');
});

check('до старта мир заморожен: музыка молчит, игрок стоит, рисуется подсказка', () => {
  const g = boot('');
  if (g.state !== 'ready') throw new Error('состояние: ' + g.state);
  if (g.sound.musicOn) throw new Error('музыка играет до старта');
  const x0 = g.player.x;
  for (let i = 0; i < 10; i++) g.update(0.016);
  if (g.player.x !== x0) throw new Error('мир движется до старта: x=' + g.player.x);
  const texts = [];
  g.ctx = new Proxy({}, {
    get: (t, p) => (p === 'createLinearGradient' ? () => ({ addColorStop() {} }) : p === 'fillText' ? (s) => texts.push(String(s)) : () => undefined),
    set: () => true,
  });
  g.draw();
  if (!texts.some((s) => s.includes('ТАПНИ'))) throw new Error('нет подсказки «ТАПНИ, ЧТОБЫ НАЧАТЬ»');
  const pct = texts.find((s) => s.endsWith('%'));
  if (pct !== '0%') throw new Error('прогресс до старта: ' + pct);
});

check('пробел на старте: бег с музыкой, без прыжка; повторное нажатие прыгает', () => {
  const g = boot('');
  (winHandlers.keydown || []).forEach((fn) => fn({ code: 'Space', preventDefault() {} }));
  if (g.state !== 'playing') throw new Error('пробел не стартовал: ' + g.state);
  if (!g.sound.musicOn) throw new Error('музыка не включилась пробелом');
  if (g.player.vy < 0) throw new Error('стартовый пробел прыгнул');
  if (g.jumpHeld) throw new Error('удержание пробела после старта создало прыжок');
  g.player.onGround = true; g.player.vy = 0;
  (winHandlers.keydown || []).forEach((fn) => fn({ code: 'Space', preventDefault() {} }));
  if (g.player.vy >= 0) throw new Error('повторный пробел не прыгнул');
});

check('без параметра запроса загружается уровень 1', () => {
  if (game.level.id !== 1) throw new Error('id=' + game.level.id);
  if (!document.title.includes('Level 1')) throw new Error('title не установлен: ' + document.title);
  if (game.level.length !== 4600) throw new Error('length=' + game.level.length);
  if (!game.level.bg || game.level.bg.start !== 170) throw new Error('палитра bg не подхвачена');
});

check('?level=2 загружает уровень 2 (тема «Классика» — длиннее уровня 1)', () => {
  const g2 = boot('?level=2');
  if (g2.level.id !== 2) throw new Error('id=' + g2.level.id);
  if (g2.level.length !== 9800) throw new Error('length=' + g2.level.length);
  if (g2.level.bg) throw new Error('у уровня 2 не должно быть своей палитры');
  if (g2.level.theme !== 'default') throw new Error('ур.2 не привязан к теме default');
  const t2 = g2._theme();
  if (t2.name !== 'Классика') throw new Error('имя темы уровня 2: ' + t2.name);
  if (t2.c.playerA !== '#ffe066') throw new Error('цвета default: ' + t2.c.playerA);
  if (Math.abs(g2.sound._stepDur - 60 / 138 / 4) > 1e-9) throw new Error('музыка default: ' + g2.sound._stepDur);
  if (document.title.includes('Level 1')) throw new Error('title не обновился: ' + document.title);
  if (g2.state !== 'ready' || !g2.player) throw new Error('игра не ждёт стартового тапа: ' + g2.state);
});

check('?level=3 загружает уровень 3 (13200 px)', () => {
  const g3 = boot('?level=3');
  if (g3.level.id !== 3) throw new Error('id=' + g3.level.id);
  if (g3.level.length !== 13200) throw new Error('length=' + g3.level.length);
  if (!g3.level.bg || g3.level.bg.start !== 260) throw new Error('палитра bg не подхвачена');
  if (g3.level.objects.length < 10) throw new Error('слишком мало объектов: ' + g3.level.objects.length);
});

check('?level=99 — фолбэк на уровень 1 (неизвестный id не ломает игру)', () => {
  const g4 = boot('?level=99');
  if (g4.level.id !== 1) throw new Error('id=' + g4.level.id);
  // камера инициализирована: -1280 * 0.30 = -384
  if (g4.camera.x !== -384) throw new Error('камера не инициализирована: ' + g4.camera.x);
});

check('победа: прогресс и полоса доводятся до 100', () => {
  const g = boot('');
  // Записывающий ctx: перехватываем fillText (текст) и fillRect (полоса)
  const calls = { text: [], rects: [] };
  const noop = () => undefined;
  g.ctx = new Proxy({
    fillText: (t) => calls.text.push(t),
    fillRect: (x, y, w, h) => calls.rects.push([x, y, w, h]),
  }, {
    get: (t, p) => (p in t ? t[p] : noop),
    set: () => true,
  });

  // До победы: реальный прогресс на позиции финиша (финиш = length - 400 -> < 100%)
  g.state = 'playing';
  g.player.x = g.level.length - 400;
  calls.text.length = 0; calls.rects.length = 0;
  g.drawHUD();
  const pctPlaying = calls.text.find((s) => s.endsWith('%'));
  const expected = String(Math.floor(((g.level.length - 400) / g.level.length) * 100)) + '%';
  if (pctPlaying !== expected) throw new Error('прогресс до победы: ' + pctPlaying + ' (ожидалось ' + expected + ')');
  const fillPlaying = calls.rects[1][2];
  if (fillPlaying >= 400) throw new Error('полоса до победы уже полная: ' + fillPlaying);

  // Победа: жёстко 100% и полная полоса
  g.state = 'won';
  calls.text.length = 0; calls.rects.length = 0;
  g.drawHUD();
  const pctWon = calls.text.find((s) => s.endsWith('%'));
  if (pctWon !== '100%') throw new Error('прогресс при победе: ' + pctWon);
  if (calls.rects[1][2] !== 400) throw new Error('полоса при победе не полная: ' + calls.rects[1][2]);
});

check('меню победы/поражения: показ по состоянию и задержке', () => {
  const g = boot('');
  // во время игры скрыто
  if (menuEl.classList.contains('show')) throw new Error('меню видно во время игры');
  // сразу после смерти ещё скрыто (задержка 0.3 c)
  g.state = 'dead'; g.deathTimer = 0.1;
  g.updateMenu();
  if (menuEl.classList.contains('show')) throw new Error('меню показано раньше задержки');
  // после задержки — показывается
  g.deathTimer = 0.5;
  g.updateMenu();
  if (!menuEl.classList.contains('show')) throw new Error('меню не показано после смерти');
  // при победе — показывается сразу
  g.state = 'won';
  g.updateMenu();
  if (!menuEl.classList.contains('show')) throw new Error('меню не показано при победе');
});

check('кнопки меню: «Заново» рестарт, «Следующий» и «Выбор уровня» ведут по ссылкам', () => {
  const g = boot('');
  g.state = 'dead'; g.deathTimer = 0.5;
  g.updateMenu();

  // «Заново»: игра перезапущена, меню скрыто
  menuBtns['#btn-restart'].click();
  if (g.state !== 'playing') throw new Error('«Заново» не перезапустило игру');
  if (menuEl.classList.contains('show')) throw new Error('меню не скрылось после «Заново»');

  // «Следующий»: с уровня 1 — на уровень 2
  menuBtns['#btn-next'].click();
  if (global.window.location.href !== 'gm-1.html?level=2') {
    throw new Error('«Следующий» с уровня 1: ' + global.window.location.href);
  }

  // «Выбор уровня»
  menuBtns['#btn-select'].click();
  if (global.window.location.href !== 'levels.html') {
    throw new Error('«Выбор уровня»: ' + global.window.location.href);
  }
});

check('«Следующий» с уровня 3 ведёт на 4, с последнего (20) — на экран выбора уровней', () => {
  const g = boot('?level=3');
  menuBtns['#btn-next'].click();
  if (global.window.location.href !== 'gm-1.html?level=4') {
    throw new Error('next с уровня 3: ' + global.window.location.href);
  }
  const g20 = boot('?level=20');
  menuBtns['#btn-next'].click();
  if (global.window.location.href !== 'levels.html') {
    throw new Error('next с уровня 20: ' + global.window.location.href);
  }
});

check('каждый уровень подключает свою музыкальную тему (темп/прогрессия)', () => {
  const g1 = boot('?level=1');
  const g2 = boot('?level=2');
  const g3 = boot('?level=3');
  const d1 = 60 / 140 / 4, d2 = 60 / 138 / 4, d3 = 60 / 132 / 4;
  if (Math.abs(g1.sound._stepDur - d1) > 1e-9) throw new Error('темп ур.1: ' + g1.sound._stepDur);
  if (Math.abs(g2.sound._stepDur - d2) > 1e-9) throw new Error('темп ур.2 (классика): ' + g2.sound._stepDur);
  if (Math.abs(g3.sound._stepDur - d3) > 1e-9) throw new Error('темп ур.3: ' + g3.sound._stepDur);
  if (g1.sound._chords === g3.sound._chords) throw new Error('музыка ур.1 и ур.3 одинакова');
});

check('новые уровни 4 и 20: своя процедурная мелодия и палитра', () => {
  const gc = boot('?level=2'); // классика для сравнения
  const g4 = boot('?level=4');
  const g20 = boot('?level=20');
  if (g4.level.id !== 4) throw new Error('id4=' + g4.level.id);
  if (g20.level.id !== 20) throw new Error('id20=' + g20.level.id);
  // геометрия: финиш-ворота на length-400
  const f4 = g4.level.objects.find((o) => o.type === 'finish');
  const f20 = g20.level.objects.find((o) => o.type === 'finish');
  if (!f4 || f4.x !== g4.level.length - 400) throw new Error('финиш ур.4: ' + (f4 && f4.x) + ' длина ' + g4.level.length);
  if (!f20 || f20.x !== g20.level.length - 400) throw new Error('финиш ур.20: ' + (f20 && f20.x));
  // музыка: aurora 284 BPM (ускоренный бит 2x), rainbow 145 BPM — не классика и не друг друга
  if (Math.abs(g4.sound._stepDur - 60 / 284 / 4) > 1e-9) throw new Error('темп ур.4: ' + g4.sound._stepDur);
  if (Math.abs(g20.sound._stepDur - 60 / 145 / 4) > 1e-9) throw new Error('темп ур.20: ' + g20.sound._stepDur);
  if (g4.sound._chords === gc.sound._chords) throw new Error('музыка ур.4 = классике');
  if (g20.sound._chords === gc.sound._chords) throw new Error('музыка ур.20 = классике');
  if (g4.sound._chords === g20.sound._chords) throw new Error('музыка ур.4 и ур.20 одинакова');
  // палитры: «Аврора» и «Радуга»
  const t4 = g4._theme().c, t20 = g20._theme().c;
  if (t4.playerA !== '#7dffb0') throw new Error('ур.4 playerA: ' + t4.playerA);
  if (t4.spike !== '#ff6b6b') throw new Error('ур.4 spike: ' + t4.spike);
  if (t20.playerA !== '#ff9e9e') throw new Error('ур.20 playerA: ' + t20.playerA);
  if (t20.ground !== '#ffe08f') throw new Error('ур.20 ground: ' + t20.ground);
  if (t4.playerA === t20.playerA) throw new Error('палитры ур.4 и ур.20 совпадают');
});

check('цветовые темы: уровни 1 и 3 свои, уровень 2 — текущая (по умолчанию)', () => {
  const g1 = boot('?level=1');
  const g2 = boot('?level=2');
  const g3 = boot('?level=3');
  const t1 = g1._theme().c, t2 = g2._theme().c, t3 = g3._theme().c;
  if (t1.playerA !== '#66ffcc') throw new Error('ур.1 playerA: ' + t1.playerA);
  if (t1.ground !== '#66ffcc') throw new Error('ур.1 ground: ' + t1.ground);
  if (t3.spike !== '#ffd166') throw new Error('ур.3 spike: ' + t3.spike);
  if (t3.block !== '#c86bff') throw new Error('ур.3 block: ' + t3.block);
  if (t2.playerA !== '#ffe066') throw new Error('ур.2 должен иметь тему по умолчанию: ' + t2.playerA);
  if (t2 === t1) throw new Error('ур.1 и ур.2 — одна тема');
  if (t2 === t3) throw new Error('ур.3 и ур.2 — одна тема');
});

check('рисование игрока и финиша использует цвета темы', () => {
  const g1 = boot('?level=1');
  const g3 = boot('?level=3');
  for (const g of [g1, g3]) {
    const stops = [];
    const set = {};
    g.ctx = new Proxy({}, {
      get: (t, p) => (p === 'createLinearGradient' ? () => ({ addColorStop: (i, c) => stops.push(c) }) : () => undefined),
      set: (t, p, v) => { set[p] = v; return true; },
    });
    g.drawPlayer();
    const c = g._theme().c;
    if (stops[0] !== c.playerA || stops[1] !== c.playerB) {
      throw new Error('градиент игрока ' + g.level.id + ': ' + stops.join(',') + ' (ожидалось ' + c.playerA + '..' + c.playerB + ')');
    }
    if (set.shadowColor !== c.playerA) throw new Error('тень игрока ' + g.level.id + ': ' + set.shadowColor);
    g.drawFinish(g.level.objects.find((o) => o.type === 'finish'));
    if (!set.shadowColor || set.shadowColor !== c.finishA) {
      throw new Error('тень финиша ' + g.level.id + ': ' + set.shadowColor + ' (ожидалось ' + c.finishA + ')');
    }
    // неоновые цвета не должны совпадать между темами ур.1 и ур.3
  }
  if (g1._theme().c.playerA === g3._theme().c.playerA) throw new Error('цвета игрока ур.1 и ур.3 совпадают');
  if (g1._theme().c.ground === g3._theme().c.ground) throw new Error('цвета земли ур.1 и ур.3 совпадают');
});

process.exit(failures ? 1 : 0);