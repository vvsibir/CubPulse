/* =========================================================
   Локализация по требованиям Яндекс.Игр:
     - 2.14: автоопределение языка через SDK при старте
       (ysdk.environment.i18n.lang), а не во время геймплея;
     - 8.2.3: интерфейсные тексты переведены на поддерживаемые
       языки (ru — язык по умолчанию, en — перевод; неизвестный
       код языка → резервный en; вне платформы SDK нет → ru).
   Названия тем уровней хранятся в level-*.js по-русски;
   на en они переводятся словарём THEME_EN (см. themeName).

   Модуль подключается ДО game.js и inline-скриптов страниц.
   ВАЖНО: без regex-литералов, содержащих «//» (релизный
   стриппер комментариев их не знает).
   ========================================================= */
window.GM_I18N = (function () {
  'use strict';

  var SUPPORTED = { ru: 1, en: 1 };
  var FALLBACK = 'en';
  var DEFAULT_LANG = 'ru';
  var lang = DEFAULT_LANG;

  var STR = {
    ru: {
      'menu.next': 'Следующий',
      'menu.select': 'Выбор уровня',
      'ready.tap': 'ТАПНИ, ЧТОБЫ НАЧАТЬ',
      'hud.attempt': 'Попытка: {n}',
      'hud.demo': 'ДЕМО — автопрохождение',
      'dead.attempts': 'Попыток: {n}',
      'dead.tapRestart': 'Тапни, чтобы начать заново',
      'win.time': 'Время: {t} сек',
      'win.attempts': 'Попыток: {n}',
      'win.complete': 'УРОВЕНЬ ПРОЙДЕН!',
      'level.name': 'Уровень {n}',
      'card.time': 'время: ~{s} сек',
      'card.objects': 'объектов: {n}',
      'card.theme': 'тема: {name}',
      'card.play': 'Играть →',
      'card.notFound': 'Уровни не найдены',
      'page.title.select': 'CubPulse — выбор уровня',
    },
    en: {
      'menu.next': 'Next',
      'menu.select': 'Select level',
      'ready.tap': 'TAP TO START',
      'hud.attempt': 'Attempt: {n}',
      'hud.demo': 'DEMO — autoplay',
      'dead.attempts': 'Attempts: {n}',
      'dead.tapRestart': 'Tap to restart',
      'win.time': 'Time: {t} s',
      'win.attempts': 'Attempts: {n}',
      'win.complete': 'LEVEL COMPLETE!',
      'level.name': 'Level {n}',
      'card.time': 'time: ~{s} s',
      'card.objects': 'objects: {n}',
      'card.theme': 'theme: {name}',
      'card.play': 'Play →',
      'card.notFound': 'Levels not found',
      'page.title.select': 'CubPulse — level select',
    },
  };

  // Переводы названий тем уровней: массив пар [ru, en].
  // Русский — исходное имя в level-*.js; при активном en переводится.
  var THEME_EN = {
    'Классика': 'Classic',
    'Неон-аква': 'Neon Aqua',
    'Закат': 'Sunset',
    'Аврора': 'Aurora',
    'Вулкан': 'Volcano',
    'Лёд': 'Ice',
    'Пустыня': 'Desert',
    'Космос': 'Space',
    'Лес': 'Forest',
    'Океан': 'Ocean',
    'Вишня': 'Cherry',
    'Золото': 'Gold',
    'Изумруд': 'Emerald',
    'Электрик': 'Electric',
    'Шторм': 'Storm',
    'Обсидиан': 'Obsidian',
    'Неон-розовый': 'Neon Pink',
    'Мята': 'Mint',
    'Сланец': 'Slate',
    'Радуга': 'Rainbow',
    'Сапфир': 'Sapphire',
    'Тайфун': 'Typhoon',
    'Гранат': 'Garnet',
    'Платина': 'Platinum',
    'Янтарь': 'Amber',
    'Лазурь': 'Azure',
    'Базальт': 'Basalt',
    'Роза': 'Rose',
    'Пепел': 'Ash',
    'Топаз': 'Topaz',
    'Кобальт': 'Cobalt',
    'Марс': 'Mars',
    'Арктика': 'Arctic',
    'Гроза': 'Thunderstorm',
    'Кварц': 'Quartz',
    'Смальта': 'Smalt',
    'Цитрус': 'Citrus',
    'Ноктюрн': 'Nocturne',
    'Фламинго': 'Flamingo',
    'Ультра': 'Ultra',
  };

  function normalize(code) {
    if (!code || typeof code !== 'string') return DEFAULT_LANG;
    var c = code.toLowerCase().split('-')[0];
    return SUPPORTED[c] ? c : FALLBACK;
  }

  // SDK может определить язык раньше, чем загрузится этот модуль:
  // стартовая страница пишет window.GM_I18N_LANG, а мы применяем его тут.
  if (typeof window !== 'undefined' && window.GM_I18N_LANG) {
    lang = normalize(window.GM_I18N_LANG);
    applyTexts();
  }

  function t(key, vars) {
    var table = STR[lang] || STR[DEFAULT_LANG];
    var s = table && table[key] != null ? table[key] : key;
    if (vars) {
      for (var k in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, k)) {
          s = s.split('{' + k + '}').join(String(vars[k]));
        }
      }
    }
    return s;
  }

  // Обновляет статичные элементы по data-i18n (кнопки меню) и
  // document.title по data-i18n-title. Вызывается при смене языка.
  function applyTexts() {
    if (typeof document === 'undefined' || !document.querySelectorAll) return;
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute && els[i].getAttribute('data-i18n');
      if (key) els[i].textContent = t(key);
    }
    var titleEl = document.querySelector('[data-i18n-title]');
    var tk = titleEl && titleEl.getAttribute && titleEl.getAttribute('data-i18n-title');
    if (tk) document.title = t(tk);
  }

  return {
    setLang: function (code) { lang = normalize(code); applyTexts(); return lang; },
    t: t,
    getLang: function () { return lang; },
    applyTexts: applyTexts,
    // Имена уровней из level-*.js: «Level N» переводим («Уровень N» / «Level N»),
    // тематические имена («Аврора», «Закат», ...) — через словарь THEME_EN.
    levelName: function (name) {
      if (typeof name !== 'string') return name;
      var m = /^Level (\d+)$/.exec(name);
      if (m) return t('level.name', { n: m[1] });
      return name;
    },
    // Название темы уровня: при en переводится словарём, иначе — как в данных (ru).
    themeName: function (name) {
      if (typeof name !== 'string') return name || '';
      if (lang === 'en' && THEME_EN[name]) return THEME_EN[name];
      return name;
    },
  };
})();