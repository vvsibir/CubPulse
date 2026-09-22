// Тест экрана выбора уровней (levels.html):
// проба level-N.js по порядку + построение карточек из реестра GM_LEVELS
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..') + '/';

const html = fs.readFileSync(root + 'levels.html', 'utf8');
const pageScript = html.match(/<script>([\s\S]*?)<\/script>/)[1];

// Все уровни level-1.js .. level-20.js (сортируем по номеру)
const levelFiles = fs.readdirSync(root)
  .filter((f) => /^level-\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
if (levelFiles.length !== 20) throw new Error('ожидалось 20 файлов уровней, найдено: ' + levelFiles.length);
const levelCount = levelFiles.length;

/* --- Мок DOM --- */
global.window = {}; // level-*.js регистрируются сюда через window.GM_LEVELS

const headScripts = [];
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
  head: { appendChild(s) { headScripts.push(s); } },
  getElementById(id) { return id === 'levels' ? wrap : id === 'status' ? status : null; },
  createElement(tag) {
    if (tag === 'script') return { src: '', onload: null, onerror: null };
    return { style: {}, className: '', href: '', innerHTML: '' };
  },
  createDocumentFragment() { return frag; },
};

// Подгружаем реальные level-N.js (зарегистрируют все уровни в реестр)
for (const f of levelFiles) {
  eval(fs.readFileSync(root + f, 'utf8'));
}
if (!global.window.GM_LEVELS['1'] || !global.window.GM_LEVELS['20']) {
  throw new Error('уровни не зарегистрировались');
}

eval(pageScript);

let failures = 0;
const check = (name, fn) => {
  try { fn(); console.log('  OK  ' + name); }
  catch (e) { failures++; console.log(' FAIL ' + name + ' -> ' + e.message); }
};

check('проба идёт по порядку: level-1 -> ... -> level-' + levelCount + ', стоп на первом отсутствующем', () => {
  if (headScripts.length !== 1) throw new Error('скриптов после старта: ' + headScripts.length);
  // Прогоняем onload по 1..20; на 20-м создаётся level-21 (которого нет)
  for (let i = 0; i < levelCount; i++) {
    const expected = 'level-' + (i + 1) + '.js';
    if (headScripts[i].src !== expected) throw new Error('шаг ' + (i + 1) + ': ' + headScripts[i].src);
    headScripts[i].onload();
  }
  if (headScripts.length !== levelCount + 1) throw new Error('скриптов после цепочки: ' + headScripts.length);
  if (headScripts[levelCount].src !== 'level-' + (levelCount + 1) + '.js') {
    throw new Error('21-й: ' + headScripts[levelCount].src);
  }
});

check('карточки строятся после первого отсутствующего скрипта (level-' + (levelCount + 1) + ')', () => {
  headScripts[levelCount].onerror(); // level-21.js не найден -> render()
  if (headScripts.length !== levelCount + 1) throw new Error('после onerror проба продолжилась: ' + headScripts.length);
  if (wrap.children.length !== levelCount) throw new Error('карточек: ' + wrap.children.length);
});

check('карточка уровня 1: ссылка gm-1.html?level=1 и палитра из bg', () => {
  const c = wrap.children[0];
  if (c.href !== 'gm-1.html?level=1') throw new Error('href: ' + c.href);
  if (!c.innerHTML.includes('Level 1')) throw new Error('имя не в карточке');
  if (!c.style.background.includes('hsl(170, 60%, 16%)')) throw new Error('палитра: ' + c.style.background);
});

check('карточка уровня 2: ссылка gm-1.html?level=2 и палитра по умолчанию', () => {
  const c = wrap.children[1];
  if (c.href !== 'gm-1.html?level=2') throw new Error('href: ' + c.href);
  if (!c.innerHTML.includes('Level 2')) throw new Error('имя не в карточке');
  if (!c.style.background.includes('hsl(220, 60%, 16%)')) throw new Error('палитра по умолчанию: ' + c.style.background);
});

check('карточка нового уровня 4: палитра из bg и тема «Аврора»', () => {
  const c = wrap.children[3];
  if (c.href !== 'gm-1.html?level=4') throw new Error('href: ' + c.href);
  if (!c.style.background.includes('hsl(90, 60%, 16%)')) throw new Error('палитра: ' + c.style.background);
  if (!c.innerHTML.includes('тема: Аврора')) throw new Error('тема не показана: ' + c.innerHTML);
  if (!c.innerHTML.includes('длина 5200 px')) throw new Error('длина: ' + c.innerHTML);
});

check('сортировка по номеру уровня (1..20 по порядку)', () => {
  const nums = wrap.children.map((c) => Number(c.href.match(/level=(\d+)/)[1]));
  if (nums.length !== 20) throw new Error('карточек: ' + nums.length);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) throw new Error('порядок ' + i + ': ' + nums[i]);
  }
});

check('счётчик объектов и длина в карточке', () => {
  const c = wrap.children[0];
  if (!c.innerHTML.includes('объектов: 13')) throw new Error('объектов: ' + c.innerHTML);
  if (!c.innerHTML.includes('длина 4600 px')) throw new Error('длина: ' + c.innerHTML);
});

check('карточка показывает тему уровня; у уровня 2 — «Классика» (default)', () => {
  const c1 = wrap.children[0];
  const c2 = wrap.children[1];
  const c4 = wrap.children[3];
  if (!c1.innerHTML.includes('тема: Неон-аква')) throw new Error('тема ур.1 не показана: ' + c1.innerHTML);
  if (!c2.innerHTML.includes('тема: Классика')) throw new Error('тема ур.2 (default) не показана: ' + c2.innerHTML);
  if (c4.innerHTML.includes('тема: Неон-аква')) throw new Error('ур.4 не должен носить тему ур.1: ' + c4.innerHTML);
});

process.exit(failures ? 1 : 0);