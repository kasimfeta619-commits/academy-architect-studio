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
        <span>Желаете ли да Ви помогна?</span>
      </div>
      <a class="support-action" href="contact.html">Да, помогнете ми</a>
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
