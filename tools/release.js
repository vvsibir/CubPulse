/* =========================================================
   РЕЛИЗ-СКРИПТ: сборка папки Release
   ---------------------------------------------------------
   - копирует ТОЛЬКО нужные для игры файлы:
       gm-1.html, levels.html, game.js, level-1.js..level-20.js
   - из каждого файла удаляет ВСЕ комментарии:
       JS : построчные // и блочные (вне строк и шаблонов)
       HTML : комментарии разметки и внутри inline-<script>
   - проверяет синтаксис каждого выпущенного JS (node --check),
     в т.ч. inline-скриптов из HTML.

   Запуск:  node tools/release.js
   Выход:   папка Release/ рядом с корнем репозитория
   ========================================================= */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const releaseDir = path.join(root, 'Release');
const LEVEL_COUNT = 20;

/* --- Список нужных файлов --- */
const files = ['gm-1.html', 'levels.html', 'game.js'];
for (let i = 1; i <= LEVEL_COUNT; i++) files.push('level-' + i + '.js');

/* --- Удаление комментариев из JS-кода ---
   Посимвольный проход с состояниями:
   - построчный комментарий // — до конца строки (перевод строки сохраняем);
   - блочный комментарий       — заменяем одним пробелом, чтобы токены не склеились;
   - строки и шаблон-строки    — копируем как есть, учитывая экраны (\).
   Ограничение: template-строка не должна содержать вложенный шаблонный символ
   или комментарий внутри выражения (в текущем коде таких нет). */
function stripJSComments(src) {
  let out = '';
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    const next = src[i + 1];
    if (c === '/' && next === '/') {
      while (i < n && src[i] !== '\n') i++;
      continue; // сам '\n' попадёт в вывод на следующей итерации
    }
    if (c === '/' && next === '*') {
      i += 2;
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
      out += ' ';
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      const q = c;
      out += q;
      i++;
      while (i < n) {
        const s = src[i];
        out += s;
        i++;
        if (s === '\\') {
          if (i < n) { out += src[i]; i++; }
          continue;
        }
        if (s === q) break;
      }
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

/* --- HTML: удалить <!-- ... --> и комментарии в inline-<script> --- */
function stripHTMLComments(src) {
  let s = src.replace(/<!--[\s\S]*?-->/g, '');
  s = s.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (m, attrs, body) => {
    if (/\bsrc\s*=/.test(attrs)) return m; // внешний <script src=...> не трогаем
    return '<script' + attrs + '>' + stripJSComments(body) + '</script>';
  });
  return s;
}

/* --- Очистка и создание Release --- */
if (fs.existsSync(releaseDir)) {
  fs.rmSync(releaseDir, { recursive: true, force: true });
}
fs.mkdirSync(releaseDir, { recursive: true });

/* --- Копирование с удалением комментариев --- */
let totalSrc = 0;
let totalOut = 0;
for (const name of files) {
  const srcPath = path.join(root, name);
  if (!fs.existsSync(srcPath)) {
    console.error('НЕТ ФАЙЛА: ' + name);
    process.exit(1);
  }
  const src = fs.readFileSync(srcPath, 'utf8');
  const body = name.endsWith('.html') ? stripHTMLComments(src) : stripJSComments(src);
  if (body.length === 0) {
    console.error('ПУСТОЙ РЕЗУЛЬТАТ для ' + name + ' — похоже, вырезание сломало файл');
    process.exit(1);
  }
  fs.writeFileSync(path.join(releaseDir, name), body);
  const saved = src.length - body.length;
  const pct = Math.round((saved / src.length) * 100);
  console.log(
    '  ' + name.padEnd(20) +
    String(src.length).padStart(7) + ' -> ' + String(body.length).padStart(7) +
    ' байт (-' + pct + '%)'
  );
  totalSrc += src.length;
  totalOut += body.length;
}

/* --- Проверка синтаксиса выпущенных JS --- */
console.log('\n-- Проверка синтаксиса (node --check) --');
let ok = true;
for (const name of files) {
  if (!name.endsWith('.js')) continue;
  const r = spawnSync(process.execPath, ['--check', path.join(releaseDir, name)], { encoding: 'utf8' });
  if (r.status !== 0) {
    ok = false;
    console.error('  FAIL ' + name + '\n' + r.stderr);
  } else {
    console.log('  OK   ' + name);
  }
}
// inline-скрипты HTML
for (const name of ['gm-1.html', 'levels.html']) {
  const html = fs.readFileSync(path.join(releaseDir, name), 'utf8');
  const blocks = html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi);
  let idx = 0;
  for (const b of blocks) {
    if (/\bsrc\s*=/.test(b[1])) continue;
    const tmp = path.join(releaseDir, '_inline-' + name + '-' + idx + '.js');
    fs.writeFileSync(tmp, b[2]);
    const r = spawnSync(process.execPath, ['--check', tmp], { encoding: 'utf8' });
    fs.rmSync(tmp);
    if (r.status !== 0) {
      ok = false;
      console.error('  FAIL inline-скрипт ' + name + '#' + idx + '\n' + r.stderr);
    } else {
      console.log('  OK   inline-скрипт ' + name + '#' + idx);
    }
    idx++;
  }
}

if (!ok) {
  console.error('\nСБОРКА ПРЕРВАНА: найдены ошибки синтаксиса.');
  process.exit(1);
}

const savedPct = Math.round(((totalSrc - totalOut) / totalSrc) * 100);
console.log('\nГотово: Release/ — ' + files.length + ' файлов, ' +
  totalSrc.toLocaleString('ru') + ' -> ' + totalOut.toLocaleString('ru') +
  ' байт (минус ' + savedPct + '%).');