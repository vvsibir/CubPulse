// Тест экрана выбора уровней (index.html):
// карточки 1..40 строятся из реестра GM_LEVELS (level-1..40.js подключены
// ЯВНЫМИ тегами, без авто-пробы level-41/42 — иначе в консоли 404-ошибки)
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..') + '/';

const html = fs.readFileSync(root + 'index.html', 'utf8');
const pageScript = html.match(/<script id="levels-app">([\s\S]*?)<\/script>/)[1];

// Все уровни level-1.js .. level-40.js (сортируем по номеру)
const levelFiles = fs.readdirSync(root)
  .filter((f) => /^level-\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
if (levelFiles.length !== 40) throw new Error('ожидалось 40 файлов уровней, найдено: ' + levelFiles.length);
const levelCount = levelFiles.length;

/* --- Мок DOM --- */
global.window = { location: { search: '' } }; // level-*.js регистрируются сюда через window.GM_LEVELS

const frag = { children: [], appendChild(c) { this.children.push(c); } };
const wrap = {
  children: [],
  appendChild(x) {
    if (x && typeof x.appendChild === 'function') { // фрагмент
      x.children.forEach((c) => this.children.push(c));
    } else {
      this.children.push(x);
    }
  },
};
const status = { textContent: '' };
global.document = {
  getElementById(id) { return id === 'levels' ? wrap : id === 'status' ? status : null; },
  createElement() { return { style: {}, className: '', href: '', innerHTML: '' }; },
  createDocumentFragment() { return frag; },
};

// Подгружаем реальные i18n.js и level-N.js (зарегистрируют все уровни в реестр)
eval(fs.readFileSync(root + 'i18n.js', 'utf8'));
for (const f of levelFiles) {
  eval(fs.readFileSync(root + f, 'utf8'));
}
if (!global.window.GM_LEVELS['1'] || !global.window.GM_LEVELS['40']) {
  throw new Error('уровни не зарегистрировались');
}

// Уровни в HTML уже подключены явными тегами — рендер при запуске синхронный
eval(pageScript);

let failures = 0;
const check = (name, fn) => {
  try { fn(); console.log('  OK  ' + name); }
  catch (e) { failures++; console.log(' FAIL ' + name + ' -> ' + e.message); }
};

check('index.html подключает level-1..40.js явными тегами по порядку (без авто-пробы)', () => {
  const srcs = [...html.matchAll(/<script src="(level-\d+\.js)"><\/script>/g)].map((m) => m[1]);
  if (srcs.length !== levelCount) throw new Error('тегов уровней: ' + srcs.length + ', ждали ' + levelCount);
  for (let i = 0; i < levelCount; i++) {
    if (srcs[i] !== 'level-' + (i + 1) + '.js') throw new Error('тег ' + (i + 1) + ': ' + srcs[i]);
  }
  if (!pageScript.includes('id <= 40') || pageScript.includes('probe')) {
    throw new Error('авто-проба не удалена из скрипта');
  }
});

check('карточки 1..40 строятся сразу на этапе скрипта (без поиска level-41)', () => {
  if (wrap.children.length !== levelCount) throw new Error('карточек: ' + wrap.children.length);
  const nums = wrap.children.map((c) => Number(c.href.match(/level=(\d+)/)[1]));
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) throw new Error('порядок ' + i + ': ' + nums[i]);
  }
});

check('карточка уровня 1: ссылка gm-1.html?level=1 и палитра из bg', () => {
  const c = wrap.children[0];
  if (c.href !== 'gm-1.html?level=1') throw new Error('href: ' + c.href);
  if (!c.innerHTML.includes('Уровень 1')) throw new Error('имя не в карточке');
  if (!c.style.background.includes('hsl(170, 60%, 16%)')) throw new Error('палитра: ' + c.style.background);
});

check('карточка уровня 2: ссылка gm-1.html?level=2 и палитра по умолчанию', () => {
  const c = wrap.children[1];
  if (c.href !== 'gm-1.html?level=2') throw new Error('href: ' + c.href);
  if (!c.innerHTML.includes('Уровень 2')) throw new Error('имя не в карточке');
  if (!c.style.background.includes('hsl(220, 60%, 16%)')) throw new Error('палитра по умолчанию: ' + c.style.background);
});

check('карточка нового уровня 4: палитра из bg и тема «Аврора»', () => {
  const c = wrap.children[3];
  if (c.href !== 'gm-1.html?level=4') throw new Error('href: ' + c.href);
  if (!c.style.background.includes('hsl(90, 60%, 16%)')) throw new Error('палитра: ' + c.style.background);
  if (!c.innerHTML.includes('тема: Аврора')) throw new Error('тема не показана: ' + c.innerHTML);
  // Длины в карточке больше нет — только время прохождения
  const sec4 = 'время: ~' + (global.window.GM_LEVELS['4'].length / 480).toFixed(1) + ' сек';
  if (!c.innerHTML.includes(sec4)) throw new Error('время не показано: ' + c.innerHTML);
  if (c.innerHTML.includes('длина') || c.innerHTML.includes('px')) throw new Error('длина осталась в карточке: ' + c.innerHTML);
});

check('счётчик объектов и время в карточке', () => {
  const c = wrap.children[0];
  if (!c.innerHTML.includes('объектов: 13')) throw new Error('объектов: ' + c.innerHTML);
  const sec1 = 'время: ~' + (global.window.GM_LEVELS['1'].length / 480).toFixed(1) + ' сек';
  if (!c.innerHTML.includes(sec1)) throw new Error('время: ' + c.innerHTML);
  if (c.innerHTML.includes('длина') || c.innerHTML.includes('px')) throw new Error('длина осталась в карточке: ' + c.innerHTML);
});

check('карточка показывает тему уровня; у уровня 2 — «Классика» (default)', () => {
  const c1 = wrap.children[0];
  const c2 = wrap.children[1];
  const c4 = wrap.children[3];
  if (!c1.innerHTML.includes('тема: Неон-аква')) throw new Error('тема ур.1 не показана: ' + c1.innerHTML);
  if (!c2.innerHTML.includes('тема: Классика')) throw new Error('тема ур.2 (default) не показана: ' + c2.innerHTML);
  if (c4.innerHTML.includes('тема: Неон-аква')) throw new Error('ур.4 не должен носить тему ур.1: ' + c4.innerHTML);
});

check('?mode= из URL пробрасывается в ссылки карточек (не сбрасывается)', () => {
  // Повторный прогон страницы с ?mode=demo: рендер работает синхронно, как в браузере
  global.window.location.search = '?mode=demo';
  eval(pageScript);
  const base = wrap.children.length - levelCount; // смещение к карточкам нового прогона
  if (base < levelCount) throw new Error('новых карточек нет');
  for (let i = 0; i < levelCount; i++) {
    const c = wrap.children[base + i];
    const expected = 'gm-1.html?level=' + (i + 1) + '&mode=demo';
    if (c.href !== expected) throw new Error('карточка ' + (i + 1) + ': ' + c.href);
  }
  global.window.location.search = '';
});

process.exit(failures ? 1 : 0);