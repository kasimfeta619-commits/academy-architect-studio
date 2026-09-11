document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.support-widget')) return;

  const widget = document.createElement('aside');
  widget.className = 'support-widget';
  widget.setAttribute('aria-label', 'Помощ и контакт');
  widget.innerHTML = `
    <div class="support-screen" role="status" aria-live="polite">
      <button class="support-close" type="button" aria-label="Затвори съобщението">×</button>
      <div class="support-screen-face" aria-hidden="true"><span>АС</span></div>
      <div class="support-copy">
        <strong>Имате ли нужда от помощ?</strong>
        <span class="support-message">Желаете ли да Ви помогна?</span>
      </div>
      <div class="support-options" role="group" aria-label="Изберете от какво имате нужда">
        <button class="support-option" type="button" data-choice="project">Искам да обсъдя проект</button>
        <button class="support-option" type="button" data-choice="question">Имам въпрос</button>
        <button class="support-option support-option-muted" type="button" data-choice="no">Не, благодаря</button>
      </div>
      <a class="support-action" href="contact.html" hidden>Свържете се с нас</a>
    </div>
    <button class="support-trigger" type="button" aria-label="Отвори помощта">
      <span class="support-trigger-dot" aria-hidden="true"></span>
      <span>Помощ</span>
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

    if (choice.dataset.choice === 'no') {
      message.textContent = 'Разбирам. Ако промените решението си, аз съм тук.';
      options.hidden = true;
      action.hidden = true;
      return;
    }

    message.textContent = choice.dataset.choice === 'project'
      ? 'Чудесно. Разкажете ни накратко за Вашия проект.'
      : 'Разбира се. Ще се радваме да отговорим на въпроса Ви.';
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
