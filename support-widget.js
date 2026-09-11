document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.support-widget')) return;

  const widget = document.createElement('aside');
  widget.className = 'support-widget';
  widget.setAttribute('aria-label', 'Интелигентен помощник');
  widget.innerHTML = `
    <div class="support-screen" role="status" aria-live="polite">
      <button class="support-close" type="button" aria-label="Затвори съобщението">×</button>
      
      <!-- Динамичен статус за свободни консултации днес -->
      <div style="font-size: 0.7rem; background: #f0eae1; padding: 4px 8px; border-radius: 6px; color: #8c8275; margin-bottom: 8px; font-weight: 600; display: inline-block;">
        🟢 Арх. Петров има 2 свободни часа днес
      </div>

      <div class="support-screen-face" aria-hidden="true"><span>АС</span></div>
      <div class="support-copy">
        <strong>Здравей! 📐✨</strong>
        <span class="support-message">Аз съм твоят архитектурен асистент. Какво ще съградим заедно днес?</span>
      </div>
      
      <!-- Етап 1: Главно меню -->
      <div class="support-options" role="group" aria-label="Изберете опция">
        <button class="support-option" type="button" data-choice="project">✨ Искам уникален проект</button>
        <button class="support-option" type="button" data-choice="estimator">🧮 Трябва ми бърза цена (Калкулатор)</button>
        <button class="support-option" type="button" data-choice="ai">🤖 Искам да тествам AI Планера</button>
        <button class="support-option" type="button" data-choice="lead">📥 Получи ценоразпис / брошура</button>
        <button class="support-option support-option-muted" type="button" data-choice="no">Само разглеждам, благодаря ☕</button>
      </div>

      <!-- Етап 2: Избор на тип имот -->
      <div class="support-sub-options" role="group" aria-label="Тип обект" hidden style="display: none; flex-direction: column; gap: 8px; margin-top: 5px;">
        <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600; text-transform: uppercase;">Стъпка 1 от 3: Избери имот</span>
        <button class="support-option" type="button" data-subchoice="house">🏡 Семейна къща</button>
        <button class="support-option" type="button" data-subchoice="apartment">🏢 Жилищен апартамент</button>
        <button class="support-option" type="button" data-subchoice="office">💼 Офис / Бизнес площ</button>
        <button class="support-option support-option-muted" type="button" data-choice="back">← Назад</button>
      </div>

      <!-- Етап 3: Избор на локация -->
      <div class="support-location-options" role="group" aria-label="Локация" hidden style="display: none; flex-direction: column; gap: 8px; margin-top: 5px;">
        <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600; text-transform: uppercase;">Стъпка 2 от 3: Къде е имотът?</span>
        <button class="support-option" type="button" data-loc="sofia">🏙️ София / Голям град</button>
        <button class="support-option" type="button" data-loc="nature">🌲 Извънградско / Планина</button>
        <button class="support-option" type="button" data-loc="sea">🌊 По морето</button>
        <button class="support-option support-option-muted" type="button" data-choice="back-to-sub">← Назад</button>
      </div>

      <!-- Етап 4: Времева рамка -->
      <div class="support-time-options" role="group" aria-label="Времева рамка" hidden style="display: none; flex-direction: column; gap: 8px; margin-top: 5px;">
        <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600; text-transform: uppercase;">Стъпка 3 от 3: Планиран старт</span>
        <button class="support-option" type="button" data-time="soon">🚀 В най-скоро време</button>
        <button class="support-option" type="button" data-time="later">⏳ След 6 месеца или повече</button>
        <button class="support-option" type="button" data-time="ideas">🔍 Само събирам идеи засега</button>
      </div>

      <!-- Форма за имейл за брошура -->
      <div class="support-lead-form" hidden style="display: none; flex-direction: column; gap: 8px; margin-top: 5px;">
        <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600;">Въведи имейл за безплатна брошура:</span>
        <input type="email" placeholder="your@email.com" class="support-email-input" style="padding: 10px; border: 1px solid #eadecc; border-radius: 8px; font-size: 0.85rem; outline: none; background: #fff;">
        <button class="support-submit-email support-option" type="button" style="background: #1a1a1a !important; color: #fff !important; text-align: center;">Изпрати ми материала</button>
        <button class="support-option support-option-muted" type="button" data-choice="back">← Назад към менюто</button>
      </div>

      <a class="support-action" href="contact.html" hidden style="display: none;">Към контактната форма</a>
    </div>
    
    <button class="support-trigger" type="button" aria-label="Отвори помощта">
      <span class="support-trigger-dot" aria-hidden="true"></span>
      <span class="support-trigger-text">Консултант</span>
    </button>
  `;
  document.body.appendChild(widget);

  const screen = widget.querySelector('.support-screen');
  const close = widget.querySelector('.support-close');
  const trigger = widget.querySelector('.support-trigger');
  const message = widget.querySelector('.support-message');
  const options = widget.querySelector('.support-options');
  const subOptions = widget.querySelector('.support-sub-options');
  const locOptions = widget.querySelector('.support-location-options');
  const timeOptions = widget.querySelector('.support-time-options');
  const leadForm = widget.querySelector('.support-lead-form');
  const emailInput = widget.querySelector('.support-email-input');
  const submitEmailBtn = widget.querySelector('.support-submit-email');
  const action = widget.querySelector('.support-action');

  let clientData = { type: '', location: '', timeline: '' };

  function typeMessage(text, callback) {
    message.textContent = '';
    let i = 0;
    const speed = 15; 
    function typing() {
      if (i < text.length) {
        message.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if (callback) {
        callback();
      }
    }
    typing();
  }

  // Главно меню
  options.addEventListener('click', function (event) {
    const choice = event.target.closest('[data-choice]');
    if (!choice) return;
    const type = choice.dataset.choice;

    options.style.display = 'none';
    options.hidden = true;

    if (type === 'no') {
      typeMessage('Разбрах! Разгледай спокойно портфолиото, а аз оставам на линия, ако размислиш. ☕');
    } else if (type === 'estimator') {
      typeMessage('Можеш да изчислиш ориентировъчна стойност за секунди в нашия ценови калкулатор.', () => {
        action.textContent = '🧮 Към калкулатора';
        action.href = 'estimator.html';
        action.style.display = 'block';
        action.hidden = false;
      });
    } else if (type === 'ai') {
      typeMessage('Нашите иновативни AI алгоритми ще ти помогнат с първоначалното разпределение.', () => {
        action.textContent = '🤖 Към AI Планера';
        action.href = 'planner.html';
        action.style.display = 'block';
        action.hidden = false;
      });
    } else if (type === 'lead') {
      typeMessage('Въведи своя имейл и ще ти изпратим актуална брошура и ценоразпис веднага!', () => {
        leadForm.style.display = 'flex';
        leadForm.hidden = false;
      });
    } else if (type === 'project') {
      typeMessage('Супер! Нека преминем през 3 бързи стъпки. За какъв тип имот става въпрос?', () => {
        subOptions.style.display = 'flex';
        subOptions.hidden = false;
      });
    }
  });

  // Стъпка 1: Избор на имот
  subOptions.addEventListener('click', function (event) {
    const btn = event.target.closest('button');
    if (!btn) return;

    if (btn.dataset.choice === 'back') {
      subOptions.style.display = 'none';
      subOptions.hidden = true;
      options.style.display = 'flex';
      options.hidden = false;
      typeMessage('Какво друго искате да обсъдим днес? 📐');
      return;
    }

    clientData.type = btn.dataset.subchoice;
    subOptions.style.display = 'none';
    subOptions.hidden = true;

    typeMessage('Отлично! Къде ще се намира бъдещият обект?', () => {
      locOptions.style.display = 'flex';
      locOptions.hidden = false;
    });
  });

  // Стъпка 2: Избор на локация
  locOptions.addEventListener('click', function (event) {
    const btn = event.target.closest('button');
    if (!btn) return;

    if (btn.dataset.choice === 'back-to-sub') {
      locOptions.style.display = 'none';
      locOptions.hidden = true;
      subOptions.style.display = 'flex';
      subOptions.hidden = false;
      typeMessage('Избери тип имот:');
      return;
    }

    clientData.location = btn.dataset.loc;
    locOptions.style.display = 'none';
    locOptions.hidden = true;

    typeMessage('Кога планираш да стартираш проекта?', () => {
      timeOptions.style.display = 'flex';
      timeOptions.hidden = false;
    });
  });

  // Стъпка 3: Времева рамка и финал
  timeOptions.addEventListener('click', function (event) {
    const btn = event.target.closest('button');
    if (!btn) return;

    clientData.timeline = btn.dataset.time;
    timeOptions.style.display = 'none';
    timeOptions.hidden = true;

    typeMessage('Благодаря за информацията! Подготвихме персонализиран запрос за твоя проект.', () => {
      action.textContent = '✨ Запази час за консултация';
      action.href = `contact.html?type=${clientData.type}&loc=${clientData.location}&time=${clientData.timeline}`;
      action.style.display = 'block';
      action.hidden = false;
    });
  });

  // Обработка на имейл формата
  submitEmailBtn.addEventListener('click', function () {
    const emailVal = emailInput.value.trim();
    if (!emailVal || !emailVal.includes('@')) {
      alert('Моля, въведете валиден имейл адрес.');
      return;
    }
    leadForm.style.display = 'none';
    leadForm.hidden = true;
    typeMessage('Готово! Материалите бяха изпратени успешно към посочената поща. Очакваме те! ☕', () => {
      action.textContent = 'Към началната страница';
      action.href = 'index.html';
      action.style.display = 'block';
      action.hidden = false;
    });
  });

  close.addEventListener('click', function () {
    widget.classList.add('is-collapsed');
    trigger.focus();
  });
  
  trigger.addEventListener('click', function () {
    widget.classList.remove('is-collapsed');
    screen.classList.remove('is-reopened');
    void screen.offsetWidth;
    screen.classList.add('is-reopened');
  });
});