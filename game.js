/* =========================================================
   CubPulse — общий игровой движок
   ---------------------------------------------------------
   Уровни регистрируются в window.GM_LEVELS (level-1.js,
   level-2.js, ...). Выбор уровня — параметр запроса в URL:
     gm-1.html?level=1
     gm-1.html?level=2
   По умолчанию (или при неизвестном id) — уровень 1.
   ========================================================= */

/* =========================================================
   КОНФИГ
   ========================================================= */
const CONFIG = {
  W: 1280,
  H: 720,

  GROUND_Y: 640,
  PLAYER_SIZE: 40,

  SPEED: 480,
  GRAVITY: 2800,
  JUMP_VELOCITY: -900,
  MAX_FALL: 1600,

  CAMERA_X_RATIO: 0.30,

  // время прыжка ≈ 2 * |JUMP_VELOCITY| / GRAVITY = 2 * 900 / 2800 ≈ 0.643 сек
  // хотим 1 оборот = 2π ≈ 6.28 рад за это время
  // ROTATION_SPEED = 6.28 / 0.643 ≈ 9.77
  ROTATION_SPEED: 9.77,

  PARTICLE_LIFE: 0.6,
};

/* =========================================================
   ИГРОК
   ========================================================= */
class Player {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = 0;
    this.y = CONFIG.GROUND_Y - CONFIG.PLAYER_SIZE;
    this.w = CONFIG.PLAYER_SIZE;
    this.h = CONFIG.PLAYER_SIZE;
    this.vy = 0;
    this.onGround = true;
    this.rotation = 0;
    this.alive = true;
    this.won = false;
    this.jumpBuffer = 0; // буфер нажатия для отзывчивого управления
  }

  jump() {
    if (!this.alive || this.won) return;
    if (this.onGround) {
      this.vy = CONFIG.JUMP_VELOCITY;
      this.onGround = false;
      this.jumpBuffer = 0;
      return true;
    }
    // Запоминаем нажатие — сработает при приземлении
    this.jumpBuffer = 0.12;
    return false;
  }

  // Обновление только физики.
  // onGround здесь — состояние на начало кадра (с прошлого кадра).
  update(dt) {
    if (!this.alive || this.won) return;

    this.x += CONFIG.SPEED * dt;

    this.vy += CONFIG.GRAVITY * dt;
    if (this.vy > CONFIG.MAX_FALL) this.vy = CONFIG.MAX_FALL;
    this.y += this.vy * dt;

    // Вращение — по ТЕКУЩЕМУ onGround (состояние на начало кадра)
    if (!this.onGround) {
      this.rotation += CONFIG.ROTATION_SPEED * dt;
    } else {
      const quarter = Math.PI / 2;
      const target = Math.round(this.rotation / quarter) * quarter;
      const diff = target - this.rotation;
      if (Math.abs(diff) < 0.01) {
        this.rotation = target;
      } else {
        this.rotation += diff * Math.min(1, dt * 20);
      }
    }

    if (this.jumpBuffer > 0) this.jumpBuffer -= dt;
  }
}

/* =========================================================
   ЧАСТИЦЫ
   ========================================================= */
class Particle {
  constructor(x, y, vx, vy, color, size, life) {
    this.x = x; this.y = y;
    this.vx = vx; this.vy = vy;
    this.color = color;
    this.size = size;
    this.life = life;
    this.maxLife = life;
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += 800 * dt;
    this.life -= dt;
  }
  draw(ctx) {
    const a = Math.max(0, this.life / this.maxLife);
    ctx.globalAlpha = a;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.globalAlpha = 1;
  }
}

/* =========================================================
   КАМЕРА
   ========================================================= */
class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  update(player) {
    const targetX = player.x - CONFIG.W * CONFIG.CAMERA_X_RATIO;
    this.x += (targetX - this.x) * 0.15;

    const playerCenterY = player.y + player.h / 2;
    let targetY = 0;
    if (playerCenterY < CONFIG.H * 0.45) {
      targetY = playerCenterY - CONFIG.H * 0.45;
    }
    this.y += (targetY - this.y) * 0.08;
  }
  apply(ctx) {
    ctx.translate(-this.x, -this.y);
  }
}

/* =========================================================
   ЗВУК И МУЗЫКА (Web Audio API — всё процедурное, без файлов)
   ========================================================= */
const BPM = 138;
const STEP_DUR = 60 / BPM / 4;  // длительность 16-й ноты (сек)
const TOTAL_STEPS = 64;          // базовая длина петли: 4 такта по 16 шагов; тема может задать свою (steps)
const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);

// Музыкальные темы уровней: прогрессия A-минор (classic — как было),
// Em–C–G–D (level1), Am–Em–F–G (marathon). Темп свой у каждой.
const MUSIC = {
  classic: {
    bpm: 138,
    chords: [
      { // Am
        bass: midi(45),                              // A2
        arp:  [midi(57), midi(60), midi(64), midi(69)], // A3 C4 E4 A4
        pad:  [midi(57), midi(64), midi(69)],
        mel:  [[0, midi(69)], [4, midi(72)], [8, midi(76)], [12, midi(69)]],
      },
      { // F
        bass: midi(41),                              // F2
        arp:  [midi(57), midi(60), midi(65), midi(69)], // A3 C4 F4 A4
        pad:  [midi(57), midi(65), midi(69)],
        mel:  [[0, midi(69)], [4, midi(72)], [8, midi(77)], [12, midi(72)]],
      },
      { // C
        bass: midi(48),                              // C3
        arp:  [midi(60), midi(64), midi(67), midi(72)], // C4 E4 G4 C5
        pad:  [midi(60), midi(64), midi(67)],
        mel:  [[0, midi(67)], [4, midi(72)], [8, midi(76)], [12, midi(79)]],
      },
      { // G
        bass: midi(43),                              // G2
        arp:  [midi(59), midi(62), midi(67), midi(71)], // B3 D4 G4 B4
        pad:  [midi(59), midi(62), midi(67)],
        mel:  [[0, midi(67)], [4, midi(71)], [8, midi(74)], [12, midi(71)]],
      },
    ],
  },

  // «Неон-аква» — уровень 1: Em–C–G–D, быстрее (140 BPM)
  level1: {
    bpm: 140,
    chords: [
      { // Em
        bass: midi(40),                              // E2
        arp:  [midi(59), midi(64), midi(67), midi(64)], // B3 E4 G4 E4
        pad:  [midi(64), midi(67), midi(71)],
        mel:  [[0, midi(71)], [3, midi(67)], [8, midi(71)], [12, midi(76)]],
      },
      { // C
        bass: midi(48),                              // C3
        arp:  [midi(60), midi(64), midi(67), midi(64)], // C4 E4 G4 E4
        pad:  [midi(60), midi(64), midi(67)],
        mel:  [[0, midi(67)], [3, midi(72)], [8, midi(76)], [12, midi(79)]],
      },
      { // G
        bass: midi(43),                              // G2
        arp:  [midi(62), midi(67), midi(71), midi(67)], // D4 G4 B4 G4
        pad:  [midi(62), midi(67), midi(71)],
        mel:  [[0, midi(71)], [3, midi(67)], [8, midi(74)], [12, midi(71)]],
      },
      { // D
        bass: midi(50),                              // D2
        arp:  [midi(57), midi(62), midi(66), midi(69)], // A3 D4 F#4 A4
        pad:  [midi(62), midi(66), midi(69)],
        mel:  [[0, midi(69)], [3, midi(74)], [8, midi(78)], [12, midi(74)]],
      },
    ],
  },

  // «Закат» — уровень 3: Am–Em–F–G, медленнее и «эпичнее» (132 BPM)
  marathon: {
    bpm: 132,
    chords: [
      { // Am
        bass: midi(45),                              // A2
        arp:  [midi(57), midi(64), midi(69), midi(72)], // A3 E4 A4 C5
        pad:  [midi(57), midi(64), midi(69)],
        mel:  [[0, midi(72)], [4, midi(76)], [8, midi(81)], [12, midi(76)]],
      },
      { // Em
        bass: midi(40),                              // E2
        arp:  [midi(59), midi(64), midi(67), midi(71)], // B3 E4 G4 B4
        pad:  [midi(59), midi(67), midi(71)],
        mel:  [[0, midi(71)], [4, midi(76)], [8, midi(79)], [12, midi(76)]],
      },
      { // F
        bass: midi(41),                              // F2
        arp:  [midi(57), midi(65), midi(69), midi(72)], // A3 F4 A4 C5
        pad:  [midi(57), midi(65), midi(69)],
        mel:  [[0, midi(72)], [4, midi(77)], [8, midi(81)], [12, midi(77)]],
      },
      { // G
        bass: midi(43),                              // G2
        arp:  [midi(59), midi(62), midi(67), midi(74)], // B3 D4 G4 D5
        pad:  [midi(59), midi(67), midi(74)],
        mel:  [[0, midi(74)], [4, midi(79)], [8, midi(83)], [12, midi(79)]],
      },
    ],
  },
};

// Псевдоним для обратной совместимости: классическая тема по умолчанию
const CHORDS = MUSIC.classic.chords;

// ---------------------------------------------------------
// Процедурные музыкальные темы для уровней 4-20.
// makeMusic строит 4-аккордный луп из параметров: темп, тоника (миди),
// лад, последовательность ступеней, вариант арпеджио и мелодии.
// ---------------------------------------------------------
const SCALE = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
};

function makeMusic(bpm, root, mode, degrees, arpPat, melPat, melPat2) {
  const at = (p) => SCALE[mode][p % 7] + Math.floor(p / 7) * 12; // абсолютный оффсет ступени
  const build = (deg, melP) => {
    const r  = root + at(deg);        // корень аккорда (3-я октава)
    const t3 = root + at(deg + 2);    // терция
    const t5 = root + at(deg + 4);    // квинта
    const bass = midi(r - 12 >= 33 ? r - 12 : r);
    const arps = [
      [r, t3, t5, t3],   // восходящая фигура
      [r, t5, t3, t5],   // через квинту
      [t3, r, t5, t3],   // старт с терции
      [t5, t3, r, t3],   // старт с квинты
    ];
    const arp = arps[arpPat % 4].map(midi);
    const pad = [r, t3, t5].map(midi);
    const mels = [
      [[0, r + 12], [4, t3 + 12], [8, t5 + 12], [12, r + 12]],   // основная фраза
      [[0, t5 + 12], [3, r + 12], [8, t3 + 12], [11, t5 + 12]],
      [[0, t3 + 12], [4, t5 + 12], [8, t3 + 12], [12, t5 + 12]],
      [[0, r + 12], [6, t3 + 12], [10, t5 + 12], [12, t3 + 12]],
      [[0, r + 12], [4, t3 + 12], [8, t5 + 12], [12, t5 + 12]],   // как основная, но другая концовка (квинта)
    ];
    const mel = mels[melP % mels.length].map(([s, n]) => [s, midi(n)]);
    return { bass, arp, pad, mel };
  };
  const chords = degrees.map((deg) => build(deg, melPat));
  // melPat2 — продолжение мелодии: та же прогрессия второй раз. Число — один
  // паттерн на все такты; массив из 4 — свой паттерн для каждого такта.
  if (melPat2 !== undefined) {
    const pats = Array.isArray(melPat2) ? melPat2 : [melPat2, melPat2, melPat2, melPat2];
    degrees.forEach((deg, i) => chords.push(build(deg, pats[i])));
  }
  return { bpm, chords, steps: chords.length * 16 };
}

// Рецепты тем уровней 4-20 (тоника в диапазоне A2..F3, все лады и темпы разные)
const MUSIC_RECIPES = [
  { key: 'aurora',   bpm: 284, root: 45, mode: 'minor', deg: [0,3,5,4], arp: 0, mel: 0 }, // уровень 4: ускоренный бит (2x)
  { key: 'lava',     bpm: 150, root: 48, mode: 'major', deg: [0,4,5,3], arp: 1, mel: 2 },
  { key: 'ice',      bpm: 134, root: 48, mode: 'minor', deg: [0,5,3,6], arp: 2, mel: 1 },
  { key: 'desert',   bpm: 138, root: 50, mode: 'major', deg: [0,3,4,3], arp: 3, mel: 0 },
  { key: 'cosmos',   bpm: 146, root: 45, mode: 'minor', deg: [0,6,3,5], arp: 0, mel: 2 },
  { key: 'forest',   bpm: 132, root: 47, mode: 'minor', deg: [0,3,4,5], arp: 2, mel: 2 },
  { key: 'ocean',    bpm: 128, root: 50, mode: 'minor', deg: [0,5,4,6], arp: 3, mel: 1 },
  { key: 'cherry',   bpm: 148, root: 48, mode: 'major', deg: [0,4,5,0], arp: 0, mel: 3 },
  { key: 'gold',     bpm: 141, root: 50, mode: 'major', deg: [0,5,6,3], arp: 2, mel: 3 },
  { key: 'emerald',  bpm: 133, root: 45, mode: 'minor', deg: [0,5,3,5], arp: 1, mel: 0 },
  { key: 'volt',     bpm: 149, root: 48, mode: 'major', deg: [0,3,0,5], arp: 0, mel: 1 },
  { key: 'storm',    bpm: 126, root: 45, mode: 'minor', deg: [0,5,6,3], arp: 3, mel: 2 },
  { key: 'obsidian', bpm: 136, root: 45, mode: 'minor', deg: [0,3,6,3], arp: 2, mel: 1 },
  { key: 'neon',     bpm: 152, root: 48, mode: 'major', deg: [0,5,4,5], arp: 1, mel: 0, mel2: [0,0,0,4] }, // уровень 17: вторая половина как первая, но с другой концовкой
  { key: 'mint',     bpm: 131, root: 52, mode: 'minor', deg: [0,5,4,6], arp: 0, mel: 3 },
  { key: 'slate',    bpm: 127, root: 50, mode: 'minor', deg: [0,3,5,4], arp: 2, mel: 0 },
  { key: 'rainbow',  bpm: 145, root: 53, mode: 'minor', deg: [0,4,5,3], arp: 0, mel: 2 },
];
for (const r of MUSIC_RECIPES) {
  MUSIC[r.key] = makeMusic(r.bpm, r.root, r.mode, r.deg, r.arp, r.mel, r.mel2);
}

class Sound {
  constructor() {
    this.ctx = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.muted = false;
    this.musicOn = false;
    this._timer = null;
    this._step = 0;
    this._nextTime = 0;
    this._noiseBuf = null;
    // Музыкальная тема по умолчанию — классическая (как было)
    this._chords = MUSIC.classic.chords;
    this._stepDur = STEP_DUR;
    this._steps = TOTAL_STEPS;
    try { this.muted = localStorage.getItem('gm_muted') === '1'; } catch (e) {}
  }

  // Переключить музыкальную тему уровня (неизвестный id -> классика).
  // speed — множитель темпа уровня: чем больше, тем быстрее играет мелодия.
  setMusic(id, speed = 1) {
    const m = MUSIC[id] || MUSIC.classic;
    this._chords = m.chords;
    this._stepDur = 60 / m.bpm / 4 / Math.max(0.05, speed);
    this._steps = m.steps || TOTAL_STEPS;
    return (id in MUSIC) ? id : 'classic';
  }

  // Создать контекст при первом взаимодействии (autoplay policy)
  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.musicGain = this.ctx.createGain();
      this.musicGain.connect(this.ctx.destination);
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.connect(this.ctx.destination);
      this._noiseBuf = this._makeNoise();
      this._applyMute();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  _applyMute() {
    if (!this.ctx) return;
    this.musicGain.gain.value = this.muted ? 0 : 0.45;
    this.sfxGain.gain.value = this.muted ? 0 : 0.9;
  }

  toggleMute() {
    this.muted = !this.muted;
    this._applyMute();
    try { localStorage.setItem('gm_muted', this.muted ? '1' : '0'); } catch (e) {}
    return this.muted;
  }

  _makeNoise() {
    const len = Math.floor(this.ctx.sampleRate * 1);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  /* ---------- SFX ---------- */

  // Простой тон с огибающей
  _tone({ type = 'square', f0, f1, dur, vol = 0.3, delay = 0 }) {
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f0, t);
    if (f1 !== undefined) osc.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  // Шумовой импульс через фильтр
  _noise({ dur, vol, delay = 0, fStart, fEnd, type = 'lowpass', q = 1 }) {
    const t = this.ctx.currentTime + delay;
    const src = this.ctx.createBufferSource();
    src.buffer = this._noiseBuf;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(fStart, t);
    f.frequency.exponentialRampToValueAtTime(Math.max(20, fEnd), t + dur);
    f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.sfxGain);
    src.start(t);
    src.stop(t + dur + 0.02);
  }

  jump() {
    if (!this.ctx) return;
    this._tone({ type: 'triangle', f0: 520, f1: 950, dur: 0.09, vol: 0.22 });
    this._noise({ dur: 0.05, vol: 0.07, fStart: 3000, fEnd: 1500, type: 'highpass' });
  }

  land() {
    if (!this.ctx) return;
    this._noise({ dur: 0.08, vol: 0.1, fStart: 500, fEnd: 150, type: 'lowpass' });
    this._tone({ type: 'sine', f0: 160, f1: 70, dur: 0.09, vol: 0.12 });
  }

  death() {
    if (!this.ctx) return;
    this._noise({ dur: 0.5, vol: 0.8, fStart: 3000, fEnd: 100, type: 'lowpass', q: 0.6 });
    this._tone({ type: 'sawtooth', f0: 200, f1: 35, dur: 0.45, vol: 0.5 });
    this._tone({ type: 'square', f0: 100, f1: 28, dur: 0.45, vol: 0.28, delay: 0.02 });
    // Суб-бамп для тяжелого удара
    this._tone({ type: 'sine', f0: 90, f1: 30, dur: 0.35, vol: 0.6, delay: 0.01 });
  }

  win() {
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      this._tone({ type: 'square', f0: f, f1: f, dur: 0.32, vol: 0.18, delay: i * 0.09 });
    });
    this._noise({ dur: 0.6, vol: 0.1, fStart: 8000, fEnd: 4000, type: 'highpass', delay: 0.12 });
  }

  /* ---------- МУЗЫКА ---------- */

  _musicNote({ type, f, dur, vol, t, filter }) {
    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = f;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    if (filter) {
      const flt = this.ctx.createBiquadFilter();
      flt.type = filter.type;
      flt.frequency.value = filter.freq;
      g.connect(flt);
      flt.connect(this.musicGain);
    } else {
      g.connect(this.musicGain);
    }
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  _kick(t) {
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.11);
    g.gain.setValueAtTime(0.55, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
    osc.connect(g);
    g.connect(this.musicGain);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  _snare(t) {
    const src = this.ctx.createBufferSource();
    src.buffer = this._noiseBuf;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 2000;
    bp.Q.value = 0.8;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.26, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.musicGain);
    src.start(t);
    src.stop(t + 0.16);
    this._musicNote({ type: 'triangle', f: 200, dur: 0.08, vol: 0.18, t });
  }

  _hat(t, vol, open) {
    const src = this.ctx.createBufferSource();
    src.buffer = this._noiseBuf;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 7500;
    const g = this.ctx.createGain();
    const dur = open ? 0.18 : 0.05;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(hp);
    hp.connect(g);
    g.connect(this.musicGain);
    src.start(t);
    src.stop(t + dur + 0.02);
  }

  _bass(t, f) {
    this._musicNote({ type: 'square', f, dur: 0.22, vol: 0.28, t, filter: { type: 'lowpass', freq: 600 } });
  }

  _arp(t, f) {
    this._musicNote({ type: 'triangle', f, dur: this._stepDur * 0.9, vol: 0.085, t });
  }

  _mel(t, f) {
    const dur = this._stepDur * 3;
    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = f;
    const flt = this.ctx.createBiquadFilter();
    flt.type = 'lowpass';
    flt.frequency.value = 2500;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.13, t + 0.006);
    g.gain.setValueAtTime(0.13, t + dur - 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(flt);
    flt.connect(g);
    g.connect(this.musicGain);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  _pad(t, freqs, dur) {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.4);
    g.gain.setValueAtTime(0.06, t + dur - 0.06);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const flt = this.ctx.createBiquadFilter();
    flt.type = 'lowpass';
    flt.frequency.value = 1400;
    g.connect(flt);
    flt.connect(this.musicGain);
    for (const f of freqs) {
      for (const det of [-6, 6]) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = f;
        osc.detune.value = det;
        osc.connect(g);
        osc.start(t);
        osc.stop(t + dur + 0.1);
      }
    }
  }

  _playStep(step, t) {
    const bar = (step / 16) | 0;
    const s = step % 16;
    const chord = this._chords[bar];

    // Бочка — каждый quarter
    if (s % 4 === 0) this._kick(t);
    // Снейр — на 2-й и 4-й доле
    if (s === 4 || s === 12) this._snare(t);
    // Хэты — каждую 16-ю (акцент на offbeat), открытый на 14-й
    if (s % 2 === 1) this._hat(t, 0.13, false);
    else this._hat(t, 0.08, false);
    if (s === 14) this._hat(t, 0.16, true);
    // Бас — по quarter
    if (s % 4 === 0) this._bass(t, chord.bass);
    // Арпеджио — каждая 16-я
    this._arp(t, chord.arp[s % 4]);
    // Мелодия — по долям
    for (const [ms, mf] of chord.mel) if (s === ms) this._mel(t, mf);
    // Пэд — в начале такта
    if (s === 0) this._pad(t + 0.01, chord.pad, this._stepDur * 16);
  }

  startMusic() {
    if (!this.ctx) return;
    // Восстанавливаем громкость (после обрыва при смерти)
    const t = this.ctx.currentTime;
    this.musicGain.gain.cancelScheduledValues(t);
    this.musicGain.gain.setValueAtTime(this.muted ? 0 : 0.45, t);
    if (this.musicOn) return;
    this.musicOn = true;
    this._step = 0;
    this._nextTime = this.ctx.currentTime + 0.1;
    if (!this._timer) {
      this._timer = setInterval(() => this._tick(), 25);
    }
  }

  stopMusic() {
    this.musicOn = false;
    if (this._timer) { clearInterval(this._timer); this._timer = null; }
  }

  // Резкий обрыв музыки (смерть): глушим мастер-гейн и останавливаем планировщик
  musicCut() {
    this.stopMusic();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.musicGain.gain.cancelScheduledValues(t);
    this.musicGain.gain.setValueAtTime(0, t);
    this._step = 0;
  }

  _tick() {
    if (!this.ctx) return;
    let guard = 0;
    while (this._nextTime < this.ctx.currentTime + 0.12 && guard++ < 32) {
      this._playStep(this._step, this._nextTime);
      this._step = (this._step + 1) % this._steps;
      this._nextTime += this._stepDur;
    }
  }
}

/* =========================================================
   КОЛЛИЗИИ
   ========================================================= */
function aabb(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x &&
         a.y < b.y + b.h && a.y + a.h > b.y;
}

// Возвращает: 'die' | 'land' | 'win' | null
function checkCollision(player, obj) {
  if (!player.alive || player.won) return null;

  // --- Шипы ---
  if (obj.type === 'spike') {
    // Хитбокс шипа чуть меньше визуального — так честнее
    let hit;
    if (obj.flip) {
      // шип «сверху вниз»
      hit = {
        x: obj.x + obj.w * 0.25,
        y: obj.y,
        w: obj.w * 0.5,
        h: obj.h * 0.6
      };
    } else {
      // обычный шип остриём вверх
      hit = {
        x: obj.x + obj.w * 0.25,
        y: obj.y + obj.h * 0.4,
        w: obj.w * 0.5,
        h: obj.h * 0.6
      };
    }
    if (aabb(player, hit)) return 'die';
  }

  // --- Блоки и платформы ---
  if (obj.type === 'block' || obj.type === 'platform') {
    if (aabb(player, obj)) {
      // Насколько игрок «вошёл» в объект сверху
      const playerBottom = player.y + player.h;
      const overlapTop = playerBottom - obj.y;

      // Условие приземления сверху:
      //  - падаем вниз (vy >= 0)
      //  - вошли неглубоко (не больше 70% высоты игрока)
      //  - нижняя грань игрока выше середины объекта
      const canLand = player.vy >= 0
                   && overlapTop <= player.h * 0.7
                   && playerBottom <= obj.y + obj.h * 0.5;

      if (canLand) {
        player.y = obj.y - player.h;
        player.vy = 0;
        player.onGround = true;
        return 'land';
      }

      // Иначе — удар сбоку или снизу
      return 'die';
    }
  }

  // --- Финиш ---
  if (obj.type === 'finish') {
    if (aabb(player, obj)) return 'win';
  }

  return null;
}

/* =========================================================
   ТЕМЫ УРОВНЕЙ: полная тема = музыка (MUSIC) + оформление
   (bg, colors). Реестр THEMES — ключи, на которые level.theme
   может ссылаться строкой. «default» — тема «Классика»
   (уровень 2); она же резервная для уровней без своей темы.
   ========================================================= */
const THEMES = {
  default: {
    name: 'Классика',
    music: 'classic', // MUSIC.classic: Am–F–C–G, 138 BPM
    bg: { start: 220, end: 280 },
    colors: {
      playerA: '#ffe066',
      playerB: '#ff9066',
      spike: '#ff4d6d',
      block: '#00e0ff',
      blockFill: 'rgba(0, 200, 255, 0.15)',
      platform: '#a060ff',
      finishA: '#ffe066',
      finishB: '#ff64c8',
      ground: '#00e0ff',
    },
  },
};

// Резерв для уровней без своей темы — это и есть THEMES.default
const DEFAULT_THEME = THEMES.default;

// HEX -> rgba() с прозрачностью (для пульсирующего финиша)
function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/* =========================================================
   ДЕМО-БОТ (mode=demo) — автопрохождение уровня
   ---------------------------------------------------------
   Подключается только при ?mode=demo. Пока игрок на поверхности,
   каждый кадр решает: бежать или прыгнуть (и с какой точки).
   Решение — СИМУЛЯЦИЕЙ вперёд с той же физикой и коллизиями,
   что и движок (dt = 1/60 — кадр 60 Гц; порядок: физика ->
   прижатие к земле -> checkCollision). Стратегия «осторожный
   игрок»:
     1) бежим, если в ближайших ~2.4 с нет ничего смертельного
        (и не нужно взлетать) — иначе смерть впереди;
     2) для прыжка перебираем точку xj от самой дальней к ближней
        (шаг 2 px), симулируем дугу до приземления/победы/смерти
        и берём САМЫЙ поздний безопасный xj;
     3) на платформах требуем боковой запас и мягкую скорость
        касания (иначе узкий слой h=20 «проскочит» за кадр).
   Дуга проверяется реальной коллизией: прыжок, который задевает
   препятствие корпусом/снизу/сбоку, отбрасывается. Прыжок
   исполняется в кадр, когда игрок пересекает xj. Решение
   пересчитывается каждый кадр на поверхности — так компенсируется
   дрейф реальных кадров относительно симуляции (шаг 2 px ≈ 1/4
   кадра). Если безопасного выхода нет — демо просто перезапустит
   уровень (см. демо-цикл в Game.update).
   ========================================================= */
class DemoBot {
  constructor(level) {
    this.level = level;
    this.objs = level.objects;
    this.DT = 1 / 60;
    this.jumped = false; // текущий прыжок уже исполнен
    // Мемоизация: decide(x, bottom) — чистая функция (уровень статичен),
    // результаты кэшируются ключом {x, bottom}.
    this.memo = new Map();
  }

  // Состояние-клон для симуляции (checkCollision мутирует y/vy/onGround)
  _newSt(x, bottomY) {
    return {
      x, y: bottomY - CONFIG.PLAYER_SIZE,
      w: CONFIG.PLAYER_SIZE, h: CONFIG.PLAYER_SIZE,
      vy: 0, onGround: true, jumped: false,
      alive: true, won: false, // checkCollision требует эти поля
    };
  }

  // Один кадр симуляции — в точности порядок движка:
  // физика -> прижатие к земле -> коллизии checkCollision.
  // Возвращает: null (продолжать), {die}, {win},
  // {land:{ground:true,...}} либо {land:{obj, vy, x}}.
  _step(st) {
    const wasAir = !st.onGround;
    st.x += CONFIG.SPEED * this.DT;
    st.vy += CONFIG.GRAVITY * this.DT;
    if (st.vy > CONFIG.MAX_FALL) st.vy = CONFIG.MAX_FALL;
    st.y += st.vy * this.DT;
    st.onGround = false;
    if (st.y + st.h >= CONFIG.GROUND_Y) {
      st.y = CONFIG.GROUND_Y - st.h;
      if (st.vy > 0) st.vy = 0;
      st.onGround = true;
    }
    let land = null;
    for (const o of this.objs) {
      const vyAt = st.vy; // скорость касания ДО того, как 'land' обнулит её
      const r = checkCollision(st, o);
      if (r === 'die') return { die: true, x: st.x };
      if (r === 'win') return { win: true };
      if (r === 'land') land = { obj: o, vy: vyAt, x: st.x, bottom: o.y };
    }
    if (land) return { land };
    if (wasAir && st.onGround) {
      return { land: { ground: true, x: st.x, vy: st.vy, bottom: CONFIG.GROUND_Y } };
    }
    return null;
  }

  // Симуляция до события (смерть/победа/приземление/лимит) — «глубокий бег».
  // jumpX === null — без прыжка; иначе прыжок в момент пересечения x.
  // Возврат: { die } | { win } | { land, firedX, firstLand } | { timeout, ... }.
  //  - firedX: реальный x кадра срабатывания прыжка (null — не сработал:
  //    упали с края раньше, чем дошли до jumpX) — фильтр «это не прыжок»;
  //  - firstLand: первое приземление НЕ на стартовую поверхность (десайт),
  //    в режиме бега приземления пропускаются, чтобы видеть смерть дальше.
  _simUntil(st, limitMs, jumpX) {
    // Поверхность, на которой стоим на старте. land-событие с НЕЁ в фазе
    // «бег без прыжка» — это не событие, а «стоим и продолжаем»: иначе
    // decide() на вершине блока/платформы на 1-м кадре получал бы {land}
    // и ошибочно решал «впереди безопасно» (см. ловушку башни level-2).
    let onTop = null;
    if (st.onGround) {
      const btm = st.y + st.h;
      for (const o of this.objs) {
        if (st.x + st.w > o.x && st.x < o.x + o.w &&
            btm >= o.y - 2 && btm <= o.y + 2) { onTop = o; break; }
      }
    }
    let firedX = null;
    let firstLand = null;
    let t = 0;
    while (t < limitMs) {
      if (st.onGround && !st.jumped) {
        if (jumpX !== null && st.x >= jumpX) {
          st.vy = CONFIG.JUMP_VELOCITY;
          st.onGround = false;
          st.jumped = true;
          firedX = st.x;
        }
      }
      const r = this._step(st);
      if (r) {
        if (r.land) {
          // Режим «бег»: приземления не важны — ищем только смерть/победу
          // в горизонте (иначе спрыгивание с блока на землю «останавливало»
          // бег, и бот не видел следующий шип за спуском). Но первое
          // приземление на ДРУГУЮ поверхность запоминаем как десайт: если
          // бег упрётся в смерть, с него можно продолжить (слепой фолбэк).
          if (jumpX === null) {
            if (firstLand === null && r.land.obj !== onTop) {
              firstLand = { x: r.land.x, bottom: r.land.bottom };
            }
            continue;
          }
          // Стоим на стартовой поверхности, ещё не прыгнув — не событие.
          if (r.land.obj === onTop && !st.jumped) continue;
          return Object.assign(r, { firedX, firstLand });
        }
        return Object.assign(r, { firedX, firstLand });
      }
      t += this.DT * 1000;
    }
    return { timeout: true, firedX, firstLand };
  }

  // Безопасно ли приземление. Платформы (h=20, слой касания 10 px) — строгий
  // боковой запас + мягкое касание. Блоки (широкий слой половины высоты) —
  // достаточно устойчивого касания сверху (любое перекрытие уже валидно).
  _goodLand(land) {
    const o = land.obj;
    if (!o || !o.type) return true; // земля
    const lx = land.x, rx = land.x + CONFIG.PLAYER_SIZE;
    if (o.type === 'platform') {
      if (lx < o.x + 6 || rx > o.x + o.w - 6) return false;
      return land.vy <= 620;
    }
    return land.vy <= 1300;
  }

  // Главное решение: xj точки прыжка (>= x) — прыгнуть в момент пересечения;
  // -1 — бежать дальше (в горизонте нет угрозы); -2 — впереди препятствие,
  // но безопасного прыжка нет (тупик; демо перезапустит уровень).
  // Приземление принимается, только если с него можно ПРОДОЛЖИТЬ (бежать или
  // снова прыгнуть) — рекурсивный взгляд вперёд на 1 приземление. Так
  // отбрасываются прыжки, чья посадка упирается в стену/платформу, куда
  // выйти нельзя (иначе гибель гарантирована).
  decide(x, bottomY, depth = 0) {
    // Страж глубины НЕ кэшируется: он зависит от глубины вызова, а не от
    // свойств клетки — иначе отказ «на глубине» отравил бы мемо значениями
    // -2 для проходимых клеток (определение ошибается уже в 1 кадре).
    if (depth > 200) return -2;
    const key = (Math.floor(x / 2) * 2) + ':' + bottomY;
    const cached = this.memo.get(key);
    if (cached !== undefined) return cached;
    const res = this._decide(x, bottomY, depth);
    this.memo.set(key, res);
    return res;
  }

  // Внутренняя реализация decide
  _decide(x, bottomY, depth) {
    // 1) Посмотрим «бежать»: если в горизонте нет смерти — бежим.
    const run = this._simUntil(this._newSt(x, bottomY), 2400, null);
    if (!run.die) return -1;
    // 2) Бег смертелен в точке run.x. Прыжок обязан начаться ДО неё
    //    (часто — за 250-330 px, чтобы успеть взлететь над препятствием/
    //    платформой). Перебираем xj от самой дальней дуги к ближней.
    const cap = Math.min(x + 344, run.x - 1);
    for (let xj = cap; xj >= x - 1; xj -= 2) {
      const arc = this._simUntil(this._newSt(x, bottomY), 1400, xj);
      if (arc.win) return xj;
      // Дуга, в которой прыжок так и не сработал (уже свалились с края до xj) —
      // это не прыжок, а падение; как кандидат не рассматривается.
      if (arc.firedX === null) continue;
      if (!arc.land || !this._goodLand(arc.land)) continue;
      // Приземление корректно само по себе — надо, чтобы с него можно было
      // продолжить. Рекурсия: та же decide() с позиции приземления.
      if (this.decide(arc.land.x, arc.land.bottom, depth + 1) !== -2) return xj;
    }
    // 3) Прямого прыжка нет, но бег может «спустить» нас на нижнюю поверхность:
    //    бежим и перерешаем уже на ней. Десайт — НЕ коммит (в отличие от
    //    прыжка): бот решает заново на каждом кадре приземления, поэтому
    //    глубокая проверка приземления не нужна — валидация здесь как раз
    //    ломала каскады башен/платформ level-17 («длинный бег видит смерть
    //    за спуском и ошибочно объявляет тупик»).
    if (run.firstLand) return -1;
    return -2; // безопасного прыжка нет — тупик
  }
}

/* =========================================================
   ИГРА
   ========================================================= */
class Game {
  constructor(canvas, level, demo) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.level = level;
    this.player = new Player();
    this.camera = new Camera();
    this.particles = [];
    this.attempts = 1;
    this.state = 'ready'; // ready (ждём первый тап) | playing | dead | won
    this.deathTimer = 0;
    this.jumpHeld = false;
    this.time = 0;
    this.bgOffset = 0;
    this.startTime = 0;
    this.totalTime = 0;
    this._ygPlaying = false; // факт разметки GameplayAPI.start() (для Яндекс.Игр)

    // Демо-режим (?mode=demo): автопрохождение уровня ботом
    this.demo = !!demo;
    this.demoBot = this.demo ? new DemoBot(level) : null;
    this.wonAt = 0;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.sound = new Sound();
    // Музыкальная тема уровня: своя (level.music) или из полной темы level.theme;
    // level.musicSpeed — ускорение мелодии (1 = как в рецепте)
    this.sound.setMusic(this.level.music || this._levelTheme().music, this.level.musicSpeed || 1);

    // Управление клавиатурой
    window.addEventListener('keydown', (e) => {
      this.sound.unlock();
      if (e.code === 'Space') {
        e.preventDefault();
        if (this.state === 'ready') {
          this.onPressStart(); // старт без прыжка; удержание пробела не прыгает
        } else if (!this.jumpHeld) {
          this.onPressStart();
          this.jumpHeld = true;
        }
      }
      if (e.code === 'KeyR') this.restart();
      if (e.code === 'KeyM') this.sound.toggleMute();
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') this.jumpHeld = false;
    });

    // Управление указателем (Pointer Events — мышь и тач без двойного срабатывания:
    // в отличие от touchstart+mousedown, pointerdown при таче не дублируется)
    canvas.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.sound.unlock();
      if (this.demo) return; // демо-режим: управление у бота
      if (!e.isPrimary) return; // игнорируем второй палец
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
      if (this._hitVolume(e)) { this.sound.toggleMute(); return; }
      const started = this.onPressStart();
      if (!started) this.jumpHeld = true; // стартовый тап не создаёт прыжок при удержании
    });
    canvas.addEventListener('pointerup', (e) => {
      if (e.isPrimary) this.jumpHeld = false;
    });
    canvas.addEventListener('pointercancel', () => { this.jumpHeld = false; });
    canvas.addEventListener('pointerleave', () => { this.jumpHeld = false; });

    // Защита от выделения текста при длинном таче
    document.addEventListener('selectstart', (e) => e.preventDefault());
    // Запрет контекстного меню (правая кнопка мыши / длинный тач) по всей странице
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Пауза при сворачивании вкладки (требование Яндекс.Игр): стоп геймплея и музыки.
    // Вне платформы (window.ysdk отсутствует) — просто тихая пауза звука.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.sound.stopMusic();
        this._ygStop();
      } else if (this.state === 'playing') {
        this.sound.startMusic();
        this._ygStart();
      }
    });

    // Меню победы (HTML-кнопки поверх канваса; после смерти — рестарт тапом)
    this.menu = document.getElementById('menu') || null;
    if (this.menu) {
      const bind = (sel, fn) => {
        const el = this.menu.querySelector(sel);
        if (el) el.addEventListener('click', fn);
      };
      bind('#btn-next', () => this.nextLevel());
      bind('#btn-select', () => { window.location.href = this._selectPage(); });
      // Тап по экрану меню (мимо кнопок) после смерти — рестарт уровня
      this.menu.addEventListener('pointerdown', (e) => {
        if (this._hitVolume(e)) { this.sound.toggleMute(); return; }
        if (this.state === 'dead' && this.deathTimer > 0.4 && e.target === this.menu) {
          this.onPressStart();
        }
      });
    }

    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  // Обработка начала нажатия. Возвращает true, если это был стартовый тап (музыка + бег, без прыжка).
  onPressStart() {
    this.sound.unlock();
    if (this.state === 'ready') {
      // Первый тап/пробел — включаем музыку и запускаем бег, без прыжка
      this.sound.startMusic();
      this.state = 'playing';
      this._ygStart();
      return true;
    }
    if (this.state === 'playing') {
      this.sound.startMusic(); // старт/продолжение музыки с первого нажатия (no-op, если играет)
      if (this.player.jump()) this.sound.jump();
    } else if (this.state === 'dead' && this.deathTimer > 0.4) {
      this.restart();
    } else if (this.state === 'won') {
      this.restart();
    }
    return false;
  }

  // Попадание в иконку динамика (в координатах канваса 1280x720)
  _hitVolume(e) {
    const rect = this.canvas.getBoundingClientRect();
    const px = (e.clientX - rect.left) * (CONFIG.W / rect.width);
    const py = (e.clientY - rect.top) * (CONFIG.H / rect.height);
    return px > CONFIG.W - 70 && px < CONFIG.W - 8 && py > 56 && py < 110;
  }

  // ---------- Яндекс.Игры: разметка геймплея (только если SDK инициализирован) ----------
  _ygAPI() {
    return (window.ysdk && window.ysdk.features) ? window.ysdk.features : null;
  }
  _ygStart() {
    if (this._ygPlaying) return;
    this._ygPlaying = true;
    const f = this._ygAPI();
    if (f && f.GameplayAPI && f.GameplayAPI.start) {
      try { f.GameplayAPI.start(); } catch (e) {}
    }
  }
  _ygStop() {
    if (!this._ygPlaying) return;
    this._ygPlaying = false;
    const f = this._ygAPI();
    if (f && f.GameplayAPI && f.GameplayAPI.stop) {
      try { f.GameplayAPI.stop(); } catch (e) {}
    }
  }

// Показать/скрыть HTML-меню: при победе — сразу, после смерти — после задержки
  // (кнопки «Следующий»/«Выбор уровня»; рестарт — тапом мимо кнопок)
  updateMenu() {
    if (this.demo || !this.menu) return; // демо-режим: меню не показываем (авто-цикл)
    const show = this.state === 'won' || (this.state === 'dead' && this.deathTimer > 0.3);
    this.menu.classList.toggle('show', show);
  }

  // Параметр mode (?mode=...) пробрасывается в навигацию, чтобы режим
  // (например, demo) не сбрасывался при переходе между уровнями и в выбор уровней.
  _modeQs() { // для ссылок вида gm-1.html?level=N — с префиксом '&'
    const m = new URLSearchParams(window.location.search).get('mode');
    return m ? '&mode=' + encodeURIComponent(m) : '';
  }
  _selectPage() { // для экрана выбора уровней — с префиксом '?'
    const m = new URLSearchParams(window.location.search).get('mode');
    return m ? 'levels.html?mode=' + encodeURIComponent(m) : 'levels.html';
  }

  // Переход на следующий уровень; если его нет — на экран выбора уровней
  nextLevel() {
    const next = this.level.id + 1;
    const hasNext = window.GM_LEVELS && window.GM_LEVELS[String(next)];
    window.location.href = hasNext ? 'gm-1.html?level=' + next + this._modeQs() : this._selectPage();
  }

  restart() {
    this.player.reset();
    this.camera.x = -CONFIG.W * CONFIG.CAMERA_X_RATIO;
    this.camera.y = 0;
    this.particles = [];
    this.state = 'playing';
    this.deathTimer = 0;
    this.attempts++;
    this.startTime = this.time;
    this.jumpHeld = false;
    this.sound.startMusic();
    this._ygStart();
    this.updateMenu(); // скрыть меню победы/поражения
  }

  resize() {
    const aspect = CONFIG.W / CONFIG.H;
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    let w = winW, h = winH;
    if (winW / winH > aspect) {
      w = winH * aspect;
    } else {
      h = winW / aspect;
    }
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
  }

  spawnParticles(x, y, count, color, spread = 200) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * spread;
      this.particles.push(new Particle(
        x, y,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        color,
        3 + Math.random() * 4,
        CONFIG.PARTICLE_LIFE * (0.5 + Math.random() * 0.5)
      ));
    }
  }

  // Демо-бот: управление прыжками в mode=demo (вызывается каждый кадр
  // во время игры; прыжок исполняется в тот же кадр через jumpHeld)
  demoTick() {
    const p = this.player;
    if (!p.onGround) { this.jumpHeld = false; return; }
    if (this.demoBot.jumped) this.demoBot.jumped = false; // приземлились — решаем заново
    const d = this.demoBot.decide(p.x, p.y + p.h);
    if (d >= 0 && p.x >= d) {
      this.jumpHeld = true;
      this.demoBot.jumped = true;
    } else {
      this.jumpHeld = false;
    }
  }

  update(dt) {
    this.time += dt;
    this.bgOffset += CONFIG.SPEED * dt;

    // Демо-режим: стартуем сразу, без первого тапа (музыка — с первого кадра)
    if (this.demo && this.state === 'ready') {
      this.state = 'playing';
      this.sound.startMusic();
      this._ygStart();
    }

    if (this.state === 'playing') {
        const wasOnGround = this.player.onGround;

        // 1. Обновляем физику — onGround ещё хранит состояние ПРОШЛОГО кадра
        this.player.update(dt);

        // 2. Сбрасываем флаг — сейчас проверим заново
        this.player.onGround = false;

        // 3. Земля
        if (this.player.y + this.player.h >= CONFIG.GROUND_Y) {
          this.player.y = CONFIG.GROUND_Y - this.player.h;
          if (this.player.vy > 0) this.player.vy = 0;
          this.player.onGround = true;
        }

        // 4. Коллизии
        for (const obj of this.level.objects) {
          const res = checkCollision(this.player, obj);
          if (res === 'die') { this.kill(); break; }
          if (res === 'win') {
            this.state = 'won';
            this.player.won = true;
            this.totalTime = this.time - this.startTime;
            this.wonAt = this.time;
            this._ygStop();
            this.sound.win();
            this.spawnParticles(
              this.player.x + this.player.w / 2,
              this.player.y + this.player.h / 2,
              60, this._theme().c.finishA, 400
            );
            break;
          }
        }

        // 4б. Демо-режим: управление прыжками (до автопрыжка, чтобы прыжок
        //     сработал в этом же кадре)
        if (this.demo && this.state === 'playing') this.demoTick();

        // 5. Автопрыжок при удержании
        if (this.state === 'playing') {
          if (this.jumpHeld && this.player.onGround) {
            if (this.player.jump()) this.sound.jump();
          } else if (this.player.jumpBuffer > 0 && this.player.onGround) {
            if (this.player.jump()) this.sound.jump();
          }
        }

        // 6. Искры при приземлении
        if (!wasOnGround && this.player.onGround) {
          this.spawnParticles(
            this.player.x + this.player.w / 2,
            this.player.y + this.player.h,
            6, this._theme().c.block, 120
          );
          this.sound.land();
        }

        // 7. Падение за карту
        if (this.player.y > CONFIG.GROUND_Y + 400) this.kill();

        this.camera.update(this.player);
      } else if (this.state === 'dead') {
      this.deathTimer += dt;
    }

    // Демо-режим: зацикливаемся — после смерти рестарт, после победы короткая
    // пауза для салюта и снова рестарт
    if (this.demo) {
      if (this.state === 'dead' && this.deathTimer > 0.45) this.restart();
      else if (this.state === 'won' && this.time - this.wonAt > 1.8) this.restart();
    }

    // Меню победы/поражения (обновляем видимость по состоянию)
    this.updateMenu();

    // Частицы
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(dt);
      if (this.particles[i].life <= 0) this.particles.splice(i, 1);
    }
  }

  kill() {
    if (this.state !== 'playing') return;
    const c = this._theme().c;
    this.state = 'dead';
    this.player.alive = false;
    this.deathTimer = 0;
    this.sound.death();
    this.sound.musicCut();
    this._ygStop();
    this.spawnParticles(
      this.player.x + this.player.w / 2,
      this.player.y + this.player.h / 2,
      45, c.spike, 500
    );
    this.spawnParticles(
      this.player.x + this.player.w / 2,
      this.player.y + this.player.h / 2,
      20, c.finishA, 300
    );
  }

  /* ---------- ОТРИСОВКА ---------- */

  // Полная тема уровня: строка-ссылка на реестр THEMES (напр. 'default') или
  // собственная inline-тема { name?, music?, bg?, colors }. Без своей — THEMES.default.
  _levelTheme() {
    const t = this.level.theme;
    if (t && typeof t === 'string') return THEMES[t] || THEMES.default;
    return t || THEMES.default;
  }

  // Тема оформления: свои цвета уровня (level.theme) или по умолчанию
  _theme() {
    const t = this._levelTheme();
    return {
      name: t.name || null,
      bg: this.level.bg || t.bg,
      c: t.colors || DEFAULT_THEME.colors,
    };
  }

  drawBackground() {
    const ctx = this.ctx;
    const progress = Math.min(1, this.player.x / this.level.length);

    // Цвета фона: уровень может задать свои (level.bg) — база по умолчанию сине-фиолетовая
    const bg = this.level.bg || {};
    const baseHue1 = bg.start !== undefined ? bg.start : 220;
    const baseHue2 = bg.end !== undefined ? bg.end : 280;

    const hue1 = baseHue1 + progress * 120;
    const hue2 = baseHue2 + progress * 80;
    const grad = ctx.createLinearGradient(0, 0, 0, CONFIG.H);
    grad.addColorStop(0, `hsl(${hue1}, 60%, 12%)`);
    grad.addColorStop(1, `hsl(${hue2}, 70%, 22%)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CONFIG.W, CONFIG.H);

    // Параллакс-сетка
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    const gridSize = 80;
    const offX = -(this.bgOffset * 0.2) % gridSize;
    for (let x = offX; x < CONFIG.W; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CONFIG.H);
      ctx.stroke();
    }
    for (let y = 0; y < CONFIG.H; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CONFIG.W, y);
      ctx.stroke();
    }
    ctx.restore();

    // «Горы»
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#ffffff';
    const hillOff = -(this.bgOffset * 0.4) % 400;
    for (let i = -1; i < 6; i++) {
      const bx = hillOff + i * 400;
      ctx.beginPath();
      ctx.moveTo(bx, CONFIG.H);
      ctx.lineTo(bx + 200, CONFIG.H - 280);
      ctx.lineTo(bx + 400, CONFIG.H);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  drawGround() {
    const ctx = this.ctx;
    const c = this._theme().c;
    ctx.save();

    ctx.fillStyle = '#0a0a18';
    ctx.fillRect(this.camera.x - 100, CONFIG.GROUND_Y, CONFIG.W + 200, CONFIG.H);

    ctx.shadowColor = c.ground;
    ctx.shadowBlur = 25;
    ctx.strokeStyle = c.ground;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.camera.x - 100, CONFIG.GROUND_Y);
    ctx.lineTo(this.camera.x + CONFIG.W + 100, CONFIG.GROUND_Y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = c.ground;
    ctx.lineWidth = 2;
    const start = Math.floor(this.camera.x / 80) * 80;
    for (let x = start; x < this.camera.x + CONFIG.W + 80; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, CONFIG.GROUND_Y);
      ctx.lineTo(x, CONFIG.GROUND_Y + 20);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawObjects() {
    for (const obj of this.level.objects) {
      if (obj.x + obj.w < this.camera.x - 50) continue;
      if (obj.x > this.camera.x + CONFIG.W + 50) continue;

      if (obj.type === 'spike') this.drawSpike(obj);
      else if (obj.type === 'block') this.drawBlock(obj);
      else if (obj.type === 'platform') this.drawPlatform(obj);
      else if (obj.type === 'finish') this.drawFinish(obj);
    }
  }

  drawSpike(obj) {
    const ctx = this.ctx;
    const c = this._theme().c;
    ctx.save();
    ctx.shadowColor = c.spike;
    ctx.shadowBlur = 18;
    ctx.fillStyle = c.spike;
    ctx.beginPath();
    if (obj.flip) {
      ctx.moveTo(obj.x, obj.y);
      ctx.lineTo(obj.x + obj.w, obj.y);
      ctx.lineTo(obj.x + obj.w / 2, obj.y + obj.h);
    } else {
      ctx.moveTo(obj.x, obj.y + obj.h);
      ctx.lineTo(obj.x + obj.w / 2, obj.y);
      ctx.lineTo(obj.x + obj.w, obj.y + obj.h);
    }
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  drawBlock(obj) {
    const ctx = this.ctx;
    const c = this._theme().c;
    ctx.save();
    ctx.fillStyle = c.blockFill;
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

    ctx.shadowColor = c.block;
    ctx.shadowBlur = 15;
    ctx.strokeStyle = c.block;
    ctx.lineWidth = 3;
    ctx.strokeRect(obj.x + 1.5, obj.y + 1.5, obj.w - 3, obj.h - 3);
    ctx.restore();
  }

  drawPlatform(obj) {
    const ctx = this.ctx;
    const c = this._theme().c;
    ctx.save();
    ctx.shadowColor = c.platform;
    ctx.shadowBlur = 15;
    ctx.fillStyle = c.platform;
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
    ctx.restore();
  }

  drawFinish(obj) {
    const ctx = this.ctx;
    const c = this._theme().c;
    ctx.save();
    const t = this.time * 3;
    const pulse = 0.7 + Math.sin(t) * 0.3;

    const grad = ctx.createLinearGradient(obj.x, obj.y, obj.x, obj.y + obj.h);
    grad.addColorStop(0, hexToRgba(c.finishA, 0.9 * pulse));
    grad.addColorStop(1, hexToRgba(c.finishB, 0.9 * pulse));
    ctx.shadowColor = c.finishA;
    ctx.shadowBlur = 30;
    ctx.fillStyle = grad;
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('FINISH', obj.x + obj.w / 2, obj.y - 20);
    ctx.restore();
  }

  drawPlayer() {
    if (this.state === 'dead') return;
    const ctx = this.ctx;
    const p = this.player;
    const c = this._theme().c;

    ctx.save();
    ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
    ctx.rotate(p.rotation);

    ctx.shadowColor = c.playerA;
    ctx.shadowBlur = 25;

    const grad = ctx.createLinearGradient(-p.w/2, -p.h/2, p.w/2, p.h/2);
    grad.addColorStop(0, c.playerA);
    grad.addColorStop(1, c.playerB);
    ctx.fillStyle = grad;
    ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);

    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(-p.w/2, -p.h/2, p.w, p.h);

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(-8, -8, 5, 5);
    ctx.fillRect(3, -8, 5, 5);

    ctx.restore();
  }

  drawHUD() {
    const ctx = this.ctx;
    const c = this._theme().c;
    ctx.save();
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 6;
    ctx.textAlign = 'left';
    ctx.fillText(`Попытка: ${this.attempts}`, 24, 40);
    ctx.fillText(this.level.name || '', 24, 68);

    if (this.demo) {
      ctx.fillStyle = 'rgba(255, 210, 90, 0.95)';
      ctx.fillText('ДЕМО — автопрохождение', 24, 96);
      ctx.fillStyle = '#fff';
    }

    // Прогресс: при победе показываем жёстко 100%, иначе реальный % по позиции
    // (финиш стоит на length - 400, поэтому до победы он не успевает дойти до 100)
    const progress = this.state === 'won'
      ? 100
      : Math.min(100, Math.floor((this.player.x / this.level.length) * 100));
    ctx.textAlign = 'right';
    ctx.fillText(`${progress}%`, CONFIG.W - 24, 40);

    const barW = 400;
    const barX = CONFIG.W / 2 - barW / 2;
    const barY = 24;
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(barX, barY, barW, 10);
    ctx.fillStyle = c.block;
    ctx.shadowColor = c.block;
    ctx.shadowBlur = 10;
    ctx.fillRect(barX, barY, barW * (progress / 100), 10);

    this.drawVolumeIcon();

    ctx.restore();
  }

  // Иконка звука (клик/тап — вкл/выкл)
  drawVolumeIcon() {
    const ctx = this.ctx;
    const x = CONFIG.W - 40, y = 84;
    ctx.save();
    ctx.fillStyle = this.sound.muted ? 'rgba(255,255,255,0.35)' : '#fff';
    ctx.shadowBlur = 0;

    // Корпус динамика
    ctx.beginPath();
    ctx.moveTo(x - 16, y - 6);
    ctx.lineTo(x - 8, y - 6);
    ctx.lineTo(x - 2, y - 12);
    ctx.lineTo(x - 2, y + 12);
    ctx.lineTo(x - 8, y + 6);
    ctx.lineTo(x - 16, y + 6);
    ctx.closePath();
    ctx.fill();

    if (this.sound.muted) {
      // Крест — звук выключен
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 5, y - 10);
      ctx.lineTo(x + 15, y + 10);
      ctx.moveTo(x + 15, y - 10);
      ctx.lineTo(x + 5, y + 10);
      ctx.stroke();
    } else {
      // Волны звука
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      for (let i = 1; i <= 2; i++) {
        ctx.beginPath();
        ctx.arc(x - 2, y, 10 + i * 6, -Math.PI / 3.2, Math.PI / 3.2);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  drawOverlay() {
    const ctx = this.ctx;
    const c = this._theme().c;

    if (this.state === 'ready') {
      const pulse = 0.55 + 0.25 * Math.sin(this.time * 4);
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(0, 0, CONFIG.W, CONFIG.H);
      ctx.textAlign = 'center';

      ctx.fillStyle = c.playerA;
      ctx.shadowColor = c.playerB;
      ctx.shadowBlur = 30 * pulse;
      ctx.font = 'bold 58px Arial';
      ctx.fillText('ТАПНИ, ЧТОБЫ НАЧАТЬ', CONFIG.W / 2, CONFIG.H / 2 - 40);

      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('первый тап включит музыку и запустит бег · или пробел', CONFIG.W / 2, CONFIG.H / 2 + 20);
      ctx.restore();
    }

    if (this.state === 'dead' && this.deathTimer > 0.3) {
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(0, 0, CONFIG.W, CONFIG.H);
      ctx.textAlign = 'center';

      ctx.fillStyle = c.spike;
      ctx.shadowColor = c.spike;
      ctx.shadowBlur = 30;
      ctx.font = 'bold 80px Arial';
      ctx.fillText('GAME OVER', CONFIG.W / 2, CONFIG.H / 2 - 40);

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 28px Arial';
      ctx.fillText(`Попыток: ${this.attempts}`, CONFIG.W / 2, CONFIG.H / 2 + 30);

      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fillText('Тапни, чтобы заново', CONFIG.W / 2, CONFIG.H / 2 + 72);
      ctx.restore();
    }

    if (this.state === 'won') {
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, CONFIG.W, CONFIG.H);
      ctx.textAlign = 'center';

      ctx.fillStyle = c.finishA;
      ctx.shadowColor = c.finishA;
      ctx.shadowBlur = 40;
      ctx.font = 'bold 90px Arial';
      ctx.fillText('LEVEL COMPLETE!', CONFIG.W / 2, CONFIG.H / 2 - 60);

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 32px Arial';
      ctx.fillText(`Время: ${this.totalTime.toFixed(2)} сек`, CONFIG.W / 2, CONFIG.H / 2 + 20);
      ctx.fillText(`Попыток: ${this.attempts}`, CONFIG.W / 2, CONFIG.H / 2 + 65);
      ctx.restore();
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, CONFIG.W, CONFIG.H);

    this.drawBackground();

    ctx.save();
    this.camera.apply(ctx);

    this.drawGround();
    this.drawObjects();
    this.drawPlayer();

    for (const p of this.particles) p.draw(ctx);

    ctx.restore();

    this.drawHUD();
    this.drawOverlay();
  }

  loop(now) {
    const dt = Math.min(0.033, (now - this.lastTime) / 1000);
    this.lastTime = now;

    this.update(dt);
    this.draw();

    requestAnimationFrame((t) => this.loop(t));
  }
}

/* =========================================================
   СТАРТ — выбор уровня по параметру запроса
   ========================================================= */
// gm-1.html?level=N — по умолчанию уровень 1
const id = (new URLSearchParams(window.location.search).get('level') || '1');
const LEVEL = window.GM_LEVELS[id] || window.GM_LEVELS['1'];

const canvas = document.getElementById('game');
const game = new Game(canvas, LEVEL, (new URLSearchParams(window.location.search).get('mode') || '') === 'demo');
game.camera.x = -CONFIG.W * CONFIG.CAMERA_X_RATIO;
if (LEVEL.name) document.title = 'CubPulse — ' + LEVEL.name;