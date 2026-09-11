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
        <strong>Здравей! 📐</strong>
        <span class="support-message">Какво ще проектираме днес?</span>
      </div>
      <div class="support-options" role="group" aria-label="Изберете опция">
        <button class="support-option" type="button" data-choice="project">✨ Искам уникален проект</button>
        <button class="support-option" type="button" data-choice="estimator">🧮 Трябва ми бърза цена (Калкулатор)</button>
        <button class="support-option" type="button" data-choice="ai">🤖 Искам да тествам AI Планера</button>
        <button class="support-option support-option-muted" type="button" data-choice="no">Само разглеждам, благодаря</button>
      </div>
      <a class="support-action" href="contact.html" hidden>Към контактната форма</a>
    </div>
    <button class="support-trigger" type="button" aria-label="Отвори помощта">
      <span class="support-trigger-dot" aria-hidden="true"></span>
      <span>Консултант</span>
    </button>
  `;
  document.body.appendChild(widget);

  const screen = widget.querySelector('.support-screen');
  const close = widget.querySelector('.support-close');
  const trigger = widget.querySelector('.support-trigger');
  const message = widget.querySelector('.support-message');
  const options = widget.querySelector('.support-options');
  const action = widget.querySelector('.support-action');

  options.addEventListener('click', function (event) {
    const choice = event.target.closest('[data-choice]');
    if (!choice) return;

    const type = choice.dataset.choice;

    if (type === 'no') {
      message.textContent = 'Разбрах! Разгледай портфолиото, а аз съм на линия, ако размислиш. ☕';
      options.hidden = true;
      action.hidden = true;
      return;
    }

    if (type === 'estimator') {
      message.textContent = 'Страхотно! Можеш да изчислиш ориентировъчна стойност в нашия ценови калкулатор.';
      action.textContent = 'Към калкулатора';
      action.href = 'estimator.html';
    } else if (type === 'ai') {
      message.textContent = 'Интересен избор! Нашите AI алгоритми могат да ти помогнат с първоначално разпределение.';
      action.textContent = 'Към AI Планера';
      action.href = 'planner.html';
    } else {
      message.textContent = 'Чудесно! Нека обсъдим визията и детайлите за твоя бъдещ обект.';
      action.textContent = 'Свържете се с нас';
      action.href = 'contact.html';
    }

    options.hidden = true;
    action.hidden = false;
    action.focus();
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