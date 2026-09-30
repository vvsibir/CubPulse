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
global.window = {
  location: { search: '' },
  innerWidth: 1280,
  innerHeight: 720,
  addEventListener() {}, // resize / orientationchange
}; // level-*.js регистрируются сюда через window.GM_LEVELS

// Универсальный элемент: <a>-карточки и <button> пагинатора
function makeEl() {
  return {
    style: {}, className: '', href: '', innerHTML: '',
    disabled: false,
    _on: {},
    addEventListener(t, fn) { this._on[t] = fn; },
    click() { if (this._on.click) this._on.click(); },
  };
}

// #levels: коллекция карточек; запись textContent='' очищает страницу.
// offsetWidth/offsetHeight — номинал сетки 4 в ряд (1112×~520) для resize()
const wrap = {
  children: [],
  offsetWidth: 1112,
  offsetHeight: 520,
  set textContent(v) { if (v === '') this.children = []; },
  appendChild(x) { this.children.push(x); },
};
const pager = {
  children: [],
  set textContent(v) { if (v === '') this.children = []; },
  appendChild(x) { this.children.push(x); },
};
const stage = { style: {} };
const statusEl = { _text: '', get textContent() { return this._text; }, set textContent(v) { this._text = v; } };
global.document = {
  getElementById(id) {
    if (id === 'levels') return wrap;
    if (id === 'pager') return pager;
    if (id === 'stage') return stage;
    if (id === 'status') return statusEl;
    return null;
  },
  createElement() { return makeEl(); },
};

// Подгружаем реальные i18n.js и level-N.js (зарегистрируют все уровни в реестр).
// Язык фиксируем ru, чтобы имена тем проверялись в оригинале.
global.window.GM_I18N_LANG = 'ru';
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

check('пагинация: на 1-й странице карточки 1..4, в пагинаторе 10 страниц', () => {
  if (wrap.children.length !== 4) throw new Error('карточек на 1-й странице: ' + wrap.children.length);
  const nums = wrap.children.map((c) => Number(c.href.match(/level=(\d+)/)[1]));
  for (let i = 0; i < 4; i++) {
    if (nums[i] !== i + 1) throw new Error('порядок ' + i + ': ' + nums[i]);
  }
  // Пагинатор: ‹ + страницы 1..10 + › = 12 кнопок
  if (pager.children.length !== 12) throw new Error('кнопок пагинатора: ' + pager.children.length);
  if (pager.children[0].innerHTML !== '‹') throw new Error('нет кнопки ‹');
  if (pager.children[11].innerHTML !== '›') throw new Error('нет кнопки ›');
  const pages = pager.children.slice(1, 11).map((b) => b.innerHTML);
  if (pages.join(',') !== '1,2,3,4,5,6,7,8,9,10') throw new Error('страницы: ' + pages.join(','));
  if (!pager.children[1].disabled) throw new Error('активная страница 1 не disabled');
  if (!pager.children[0].disabled) throw new Error('кнопка ‹ на 1-й странице не disabled');
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
  const sec4 = 'время: ~' + Math.round(global.window.GM_LEVELS['4'].length / 480) + ' сек';
  if (!c.innerHTML.includes(sec4)) throw new Error('время не показано: ' + c.innerHTML);
  if (c.innerHTML.includes('длина') || c.innerHTML.includes('px')) throw new Error('длина осталась в карточке: ' + c.innerHTML);
});

check('счётчик объектов и время в карточке', () => {
  const c = wrap.children[0];
  if (!c.innerHTML.includes('объектов: 13')) throw new Error('объектов: ' + c.innerHTML);
  const sec1 = 'время: ~' + Math.round(global.window.GM_LEVELS['1'].length / 480) + ' сек';
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

check('переход на en: названия тем переводятся (Classic, Neon Aqua), карточки собираются', () => {
  global.window.GM_I18N.setLang('en');
  eval(pageScript); // пересборка при смене языка (GM_SELECT_RENDER)
  const c1 = wrap.children[0]; // уровень 1
  const c2 = wrap.children[1]; // уровень 2 (theme: 'default')
  if (c1.href !== 'gm-1.html?level=1') throw new Error('href: ' + c1.href);
  const c4 = wrap.children[3]; // уровень 4
  if (!c1.innerHTML.includes('theme: Neon Aqua')) throw new Error('тема ур.1 на en: ' + c1.innerHTML);
  if (!c2.innerHTML.includes('theme: Classic')) throw new Error('тема ур.2 (default) на en: ' + c2.innerHTML);
  if (!c4.innerHTML.includes('theme: Aurora')) throw new Error('тема ур.4 на en: ' + c4.innerHTML);
  global.window.GM_I18N.setLang('ru');
  eval(pageScript); // вернули русский, страница снова 1..4
});

check('переход кнопкой › на 2-ю страницу (5..8), активна страница 2', () => {
  pager.children[11].click(); // ›
  if (wrap.children.length !== 4) throw new Error('карточек на 2-й странице: ' + wrap.children.length);
  const first = Number(wrap.children[0].href.match(/level=(\d+)/)[1]);
  const last = Number(wrap.children[3].href.match(/level=(\d+)/)[1]);
  if (first !== 5 || last !== 8) throw new Error('диапазон: ' + first + '..' + last);
  if (!pager.children[2].disabled) throw new Error('активна не страница 2');
  if (pager.children[0].disabled) throw new Error('кнопка ‹ не активна на 2-й странице');
});

check('переход кнопкой 10 на последнюю страницу (37..40), › и 10 задизейблены', () => {
  pager.children[10].click(); // страница 10
  if (wrap.children.length !== 4) throw new Error('карточек на 10-й странице: ' + wrap.children.length);
  const nums = wrap.children.map((c) => Number(c.href.match(/level=(\d+)/)[1]));
  if (nums.join(',') !== '37,38,39,40') throw new Error('карточки: ' + nums.join(','));
  if (!pager.children[10].disabled) throw new Error('активна не страница 10');
  if (!pager.children[11].disabled) throw new Error('кнопка › на последней странице не disabled');
});

check('переход кнопкой ‹ назад (страница 9: 33..36)', () => {
  pager.children[0].click(); // ‹
  if (wrap.children.length !== 4) throw new Error('карточек на 9-й странице: ' + wrap.children.length);
  const first = Number(wrap.children[0].href.match(/level=(\d+)/)[1]);
  if (first !== 33) throw new Error('первая карточка: ' + first);
});

check('?mode= из URL пробрасывается в ссылки карточек (не сбрасывается)', () => {
  // Повторный прогон страницы с ?mode=demo: рендер работает синхронно, как в браузере
  global.window.location.search = '?mode=demo';
  eval(pageScript);
  if (wrap.children.length !== 4) throw new Error('карточек: ' + wrap.children.length);
  for (let i = 0; i < 4; i++) {
    const c = wrap.children[i];
    const expected = 'gm-1.html?level=' + (i + 1) + '&mode=demo';
    if (c.href !== expected) throw new Error('карточка ' + (i + 1) + ': ' + c.href);
  }
  global.window.location.search = '';
});

process.exit(failures ? 1 : 0);