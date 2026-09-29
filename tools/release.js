/* =========================================================
   РЕЛИЗ-СКРИПТ: сборка папки Release
   ---------------------------------------------------------
   - копирует ТОЛЬКО нужные для игры файлы:
       gm-1.html, index.html, i18n.js, game.js, level-1.js..level-40.js
   - из каждого файла удаляет ВСЕ комментарии:
       JS : построчные // и блочные (вне строк и шаблонов)
       HTML : комментарии разметки и внутри inline-<script>
   - проверяет синтаксис каждого выпущенного JS (node --check),
     в т.ч. inline-скриптов из HTML;
   - упаковывает всё содержимое Release/ в ZIP-архив Release.zip
     (без внешних зависимостей: zlib + ручная запись ZIP-структуры).

   Запуск:  node tools/release.js
   Выход:   папка Release/ и архив Release.zip рядом с корнем репозитория
   ========================================================= */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const releaseDir = path.join(root, 'Release');
const LEVEL_COUNT = 40;

/* --- Список нужных файлов --- */
const files = ['gm-1.html', 'index.html', 'i18n.js', 'game.js', 'run.png'];
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

/* --- ZIP-упаковка без внешних библиотек ---
   Минимальный, но валидный ZIP: для каждого файла Local File Header +
   deflate-данные, затем Central Directory и End of Central Directory.
   Все файлы маленькие (< 4 ГБ) — zip64 не нужен. */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function dosDateTime(d) {
  const time = ((d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1)) & 0xffff;
  const date = (((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()) & 0xffff;
  return { time, date };
}

function buildZip(entries) {
  // entries: [{ name: 'Release/xxx', data: Buffer, mtime: Date }]
  const chunks = [];
  const central = [];
  let offset = 0;
  for (const e of entries) {
    const nameBuf = Buffer.from(e.name, 'utf8');
    // ZIP-метод 8 требует сырой deflate-поток (RFC 1951) без zlib-обёртки
    const comp = zlib.deflateRawSync(e.data, { level: 9 });
    const { time, date } = dosDateTime(e.mtime || new Date());
    const crc = crc32(e.data);

    // Local File Header
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20, 4);          // version needed
    lh.writeUInt16LE(0x0800, 6);      // flags: UTF-8 имена
    lh.writeUInt16LE(8, 8);           // method: deflate
    lh.writeUInt16LE(time, 10);
    lh.writeUInt16LE(date, 12);
    lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(comp.length, 18);
    lh.writeUInt32LE(e.data.length, 22);
    lh.writeUInt16LE(nameBuf.length, 26);
    lh.writeUInt16LE(0, 28);          // extra length
    chunks.push(lh, nameBuf, comp);

    // Central Directory Header
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0);
    ch.writeUInt16LE(20, 4);          // version made by
    ch.writeUInt16LE(20, 6);          // version needed
    ch.writeUInt16LE(0x0800, 8);      // flags: UTF-8 имена
    ch.writeUInt16LE(8, 10);          // method: deflate
    ch.writeUInt16LE(time, 12);
    ch.writeUInt16LE(date, 14);
    ch.writeUInt32LE(crc, 16);
    ch.writeUInt32LE(comp.length, 20);
    ch.writeUInt32LE(e.data.length, 24);
    ch.writeUInt16LE(nameBuf.length, 28);
    ch.writeUInt16LE(0, 30);          // extra length
    ch.writeUInt16LE(0, 32);          // comment length
    ch.writeUInt16LE(0, 34);          // disk number start
    ch.writeUInt16LE(0, 36);          // internal attributes
    ch.writeUInt32LE(0, 38);          // external attributes
    ch.writeUInt32LE(offset, 42);     // offset of local header
    central.push(ch, nameBuf);
    offset += lh.length + nameBuf.length + comp.length;
  }

  const cdStart = offset;
  const cdBuf = Buffer.concat(central);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);           // disk number
  eocd.writeUInt16LE(0, 6);           // disk с центральным каталогом
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(cdBuf.length, 12);
  eocd.writeUInt32LE(cdStart, 16);
  eocd.writeUInt16LE(0, 20);          // comment length

  return Buffer.concat([...chunks, cdBuf, eocd]);
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
  // Бинарные ассеты (спрайт-лист персонажа) копируем как есть
  if (name.endsWith('.png')) {
    fs.copyFileSync(srcPath, path.join(releaseDir, name));
    console.log('  ' + name.padEnd(20) + ' (бинарный файл, копия как есть)');
    continue;
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
for (const name of ['gm-1.html', 'index.html']) {
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

/* --- ZIP-архив содержимого Release/ --- */
const zipEntries = [];
for (const name of fs.readdirSync(releaseDir)) {
  const p = path.join(releaseDir, name);
  if (!fs.statSync(p).isFile()) continue;
  zipEntries.push({
    name: 'Release/' + name,
    data: fs.readFileSync(p),
    mtime: fs.statSync(p).mtime
  });
}
zipEntries.sort((a, b) => a.name.localeCompare(b.name));
const zipPath = path.join(root, 'Release.zip');
fs.writeFileSync(zipPath, buildZip(zipEntries));
console.log('Архив:  Release.zip — ' + zipEntries.length + ' файлов, ' +
  fs.statSync(zipPath).size.toLocaleString('ru') +
  ' байт (рядом с Release/, путь: ' + zipPath + ')');