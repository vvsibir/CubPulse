// Тест Sound-модуля с моком Web Audio API
const fs = require('fs');
const path = require('path');
const js = fs.readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8');

// Вырезаем секцию Sound из общего движка game.js: от "const BPM = 138" до "class Game {"
const startIdx = js.indexOf('const BPM = 138');
const endIdx = js.indexOf('class Game {');
if (startIdx < 0 || endIdx < 0) throw new Error('Не найдена секция Sound: ' + startIdx + ' / ' + endIdx);
const soundSrc = js.slice(startIdx, endIdx);

// --- Мок Web Audio ---
function makeGain() {
  const node = {
    gain: { value: 0 },
    connect() {}, disconnect() {},
  };
  for (const m of ['setValueAtTime', 'exponentialRampToValueAtTime', 'linearRampToValueAtTime', 'setTargetAtTime', 'cancelScheduledValues']) {
    node.gain[m] = (v, t) => { node.gain.value = v; return node.gain; };
  }
  return node;
}
function makeOsc() {
  const node = {
    type: 'sine',
    frequency: { value: 440, setValueAtTime() {}, exponentialRampToValueAtTime() {} },
    detune: { value: 0 },
    connect() {}, disconnect() {}, start() {}, stop() {},
  };
  return node;
}
const mockCtx = {
  state: 'running', currentTime: 10, sampleRate: 44100,
  destination: { connect() {} },
  createGain: makeGain,
  createOscillator: makeOsc,
  createBuffer(ch, len, sr) { return { getChannelData() { return new Float32Array(len); } }; },
  createBufferSource() { return { buffer: null, connect() {}, start() {}, stop() {}, disconnect() {} }; },
  createBiquadFilter() {
    return { type: '', frequency: { value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {} }, Q: { value: 0 }, connect() {}, disconnect() {} };
  },
  resume() { this.state = 'running'; },
};

global.window = { AudioContext: function () { return mockCtx; } };
global.localStorage = { getItem: () => null, setItem: () => {} };

// Запускаем секцию Sound
eval(soundSrc + '\nmodule.exports = { Sound, CHORDS, MUSIC, STEP_DUR, TOTAL_STEPS, THEMES, DEFAULT_THEME };');
const { Sound, MUSIC, STEP_DUR, TOTAL_STEPS, THEMES, DEFAULT_THEME } = module.exports;

let failures = 0;
const check = (name, fn) => {
  try { fn(); console.log('  OK  ' + name); }
  catch (e) { failures++; console.log(' FAIL ' + name + ' -> ' + e.message); }
};

const s = new Sound();

check('unlock() создаёт контекст, но НЕ запускает музыку', () => {
  s.unlock();
  if (!s.ctx) throw new Error('ctx не создан');
  if (s.musicOn) throw new Error('unlock не должен запускать музыку');
});

check('startMusic() запускает музыку', () => {
  s.startMusic();
  if (!s.musicOn) throw new Error('musicOn=false');
  if (s._timer === null) throw new Error('таймер не запущен');
});

check('SFX: jump/land/death/win без исключений', () => {
  s.jump(); s.land(); s.death(); s.win();
});

check('toggleMute() переключает и применяет громкость', () => {
  const m1 = s.toggleMute();
  if (!m1) throw new Error('mute не включился');
  const m2 = s.toggleMute();
  if (m2) throw new Error('mute не выключился');
  if (s.musicGain.gain.value !== 0.45) throw new Error('громкость музыки не восстановлена');
});

// Прогон секвенсора на несколько циклов
check('секвенсор: _tick() проходит 3 полных цикла без ошибок', () => {
  const steps = TOTAL_STEPS * 3;
  s._step = 0;
  for (let i = 0; i < steps; i++) {
    s._playStep(s._step, mockCtx.currentTime + i * STEP_DUR);
    s._step = (s._step + 1) % TOTAL_STEPS;
  }
});

check('stopMusic() останавливает таймер', () => {
  s.stopMusic();
  if (s.musicOn) throw new Error('musicOn=true');
  if (s._timer !== null) throw new Error('таймер не очищен');
});

check('musicCut() глушит музыку и останавливает планировщик', () => {
  s.startMusic();
  s.musicCut();
  if (s.musicOn) throw new Error('musicOn=true');
  if (s._timer !== null) throw new Error('таймер не очищен');
  if (s.musicGain.gain.value !== 0) throw new Error('громкость музыки != 0');
  if (s._step !== 0) throw new Error('_step не сброшен');
});

check('музыка не стартует от unlock() после обрыва (удержанная клавиша не должна её оживлять)', () => {
  s.unlock();
  if (s.musicOn) throw new Error('unlock после cut оживил музыку');
  if (s.musicGain.gain.value !== 0) throw new Error('громкость не 0');
});

check('startMusic() после musicCut() восстанавливает музыку (рестарт уровня)', () => {
  s.startMusic();
  if (!s.musicOn) throw new Error('musicOn=false');
  if (s.musicGain.gain.value !== 0.45) throw new Error('громкость музыки не восстановлена: ' + s.musicGain.gain.value);
});

check('setMusic(): тема по умолчанию — классика (текущий темп 138 BPM)', () => {
  if (s._stepDur !== 60 / 138 / 4) throw new Error('темп классики: ' + s._stepDur);
  if (s._chords !== MUSIC.classic.chords) throw new Error('прогрессия не классика');
});

check('THEMES.default — отдельная тема «Классика» (музыка classic + цвета)', () => {
  if (!THEMES || !THEMES.default) throw new Error('нет THEMES.default');
  if (THEMES.default.name !== 'Классика') throw new Error('имя: ' + THEMES.default.name);
  if (THEMES.default.music !== 'classic') throw new Error('музыка: ' + THEMES.default.music);
  if (THEMES.default.colors.playerA !== '#ffe066') throw new Error('цвета: ' + THEMES.default.colors.playerA);
  if (DEFAULT_THEME !== THEMES.default) throw new Error('DEFAULT_THEME не ссылается на THEMES.default');
});

check('setMusic("level1") — тема «Неон-аква» (140 BPM, Em–C–G–D)', () => {
  const id = s.setMusic('level1');
  if (id !== 'level1') throw new Error('id: ' + id);
  if (Math.abs(s._stepDur - 60 / 140 / 4) > 1e-9) throw new Error('темп ур.1: ' + s._stepDur);
  if (s._chords !== MUSIC.level1.chords) throw new Error('прогрессия не level1');
  if (MUSIC.level1.chords.length !== 4) throw new Error('должно быть 4 аккорда');
});

check('setMusic("marathon") — тема «Закат» (132 BPM, Am–Em–F–G)', () => {
  const id = s.setMusic('marathon');
  if (id !== 'marathon') throw new Error('id: ' + id);
  if (Math.abs(s._stepDur - 60 / 132 / 4) > 1e-9) throw new Error('темп ур.3: ' + s._stepDur);
  if (s._chords !== MUSIC.marathon.chords) throw new Error('прогрессия не marathon');
});

check('setMusic(неизвестный id) — фолбэк на классику', () => {
  const id = s.setMusic('nonexistent');
  if (id !== 'classic') throw new Error('id: ' + id);
  if (s._chords !== MUSIC.classic.chords) throw new Error('не классика');
  if (s._stepDur !== 60 / 138 / 4) throw new Error('темп не классика: ' + s._stepDur);
});

check('секвенсор отрабатывает на каждой музыкальной теме (3 цикла)', () => {
  for (const id of ['classic', 'level1', 'marathon']) {
    const s2 = new Sound();
    s2.unlock();
    s2.setMusic(id);
    s2._step = 0;
    for (let i = 0; i < TOTAL_STEPS * 3; i++) {
      s2._playStep(s2._step, mockCtx.currentTime + i * s2._stepDur);
      s2._step = (s2._step + 1) % TOTAL_STEPS;
    }
  }
});

check('все темы различаются и имеют свой темп', () => {
  const bpms = [MUSIC.classic.bpm, MUSIC.level1.bpm, MUSIC.marathon.bpm];
  if (new Set(bpms).size !== 3) throw new Error('темпы совпадают: ' + bpms.join(','));
  if (MUSIC.level1.chords[0] === MUSIC.marathon.chords[0]) throw new Error('прогрессии ур.1 и ур.3 одинаковы');
});

process.exit(failures ? 1 : 0);