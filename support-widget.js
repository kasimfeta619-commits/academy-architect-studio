document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.support-widget')) return;

  const widget = document.createElement('aside');
  widget.className = 'support-widget';
  widget.setAttribute('aria-label', 'Интелигентен помощник');
  widget.innerHTML = `
    <div class="support-screen" role="status" aria-live="polite">
      <button class="support-close" type="button" aria-label="Затвори съобщението">×</button>
      <div class="support-screen-face" aria-hidden="true"><span>АС</span></div>
      <div class="support-copy">
        <strong>Здравей! 📐✨</strong>
        <span class="support-message">Аз съм твоят архитектурен асистент. Какво ще съградим заедно днес?</span>
      </div>
      
      <!-- Основно меню с опции -->
      <div class="support-options" role="group" aria-label="Изберете опция">
        <button class="support-option" type="button" data-choice="project">✨ Искам уникален проект</button>
        <button class="support-option" type="button" data-choice="estimator">🧮 Трябва ми бърза цена (Калкулатор)</button>
        <button class="support-option" type="button" data-choice="ai">🤖 Искам да тествам AI Планера</button>
        <button class="support-option support-option-muted" type="button" data-choice="no">Само разглеждам, благодаря ☕</button>
      </div>

      <!-- Вторично интерактивно меню (скрито по подразбиране) -->
      <div class="support-sub-options" role="group" aria-label="Тип обект" hidden style="display: flex; flex-direction: column; gap: 8px; margin-top: 5px;">
        <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Избери тип имот:</span>
        <button class="support-option" type="button" data-subchoice="house">🏡 Семейна къща</button>
        <button class="support-option" type="button" data-subchoice="apartment">🏢 Жилищен апартамент</button>
        <button class="support-option" type="button" data-subchoice="office">💼 Офис / Бизнес площ</button>
        <button class="support-option support-option-muted" type="button" data-choice="back">← Назад към менюто</button>
      </div>

      <a class="support-action" href="contact.html" hidden>Към контактната форма</a>
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
  const action = widget.querySelector('.support-action');

  // Функция за ефект на "писане" (typing effect)
  function typeMessage(text, callback) {
    message.textContent = '';
    let i = 0;
    const speed = 25; // Скорост на изписване в милисекунди
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

  options.addEventListener('click', function (event) {
    const choice = event.target.closest('[data-choice]');
    if (!choice) return;

    const type = choice.dataset.choice;

    if (type === 'no') {
      options.hidden = true;
      typeMessage('Разбрах! Разгледай спокойно портфолиото, а аз оставам тук, ако размислиш. ☕');
      return;
    }

    if (type === 'estimator') {
      options.hidden = true;
      typeMessage('Страхотно! Можеш да изчислиш ориентировъчна стойност за секунди в нашия ценови калкулатор.', () => {
        action.textContent = '🧮 Към калкулатора';
        action.href = 'estimator.html';
        action.hidden = false;
      });
    } else if (type === 'ai') {
      options.hidden = true;
      typeMessage('Интересен избор! Нашите иновативни AI алгоритми могат да ти помогнат с първоначалното разпределение.', () => {
        action.textContent = '🤖 Към AI Планера';
        action.href = 'planner.html';
        action.hidden = false;
      });
    } else if (type === 'project') {
      // Преминаваме към мини-анкетата за избор на имот
      options.hidden = true;
      typeMessage('Чудесно решение! За какъв тип имот обмисляте проект?', () => {
        subOptions.hidden = false;
      });
    }
  });

  // Обработка на второто ниво (подменюто за проекти)
  subOptions.addEventListener('click', function (event) {
    const subChoice = event.target.closest('[data-subchoice]') || event.target.closest('[data-choice]');
    if (!subChoice) return;

    if (subChoice.dataset.choice === 'back') {
      subOptions.hidden = true;
      options.hidden = false;
      typeMessage('Какво друго искате да обсъдим днес? 📐');
      return;
    }

    const subType = subChoice.dataset.subchoice;
    subOptions.hidden = true;

    if (subType === 'house') {
      typeMessage('Прекрасно! Семейните къщи са наша страст — ще създадем перфектния баланс между двор и уют.', () => {
        action.textContent = '✨ Обсъди проект за къща';
        action.href = 'contact.html?type=house';
        action.hidden = false;
      });
    } else if (subType === 'apartment') {
      typeMessage('Отлична идея! Усвояването на пространство в апартамент изисква прецизност и модерен дизайн.', () => {
        action.textContent = '✨ Обсъди проект за апартамент';
        action.href = 'contact.html?type=apartment';
        action.hidden = false;
      });
    } else if (subType === 'office') {
      typeMessage('Бизнес средата е от значение! Ще проектираме функционално и представително работно пространство.', () => {
        action.textContent = '✨ Обсъди бизнес проект';
        action.href = 'contact.html?type=office';
        action.hidden = false;
      });
    }
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