document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.support-widget')) return;

  const translations = {
    bg: {
      title: "Здравей! 📐✨",
      message: "Аз съм твоят архитектурен асистент. Какво ще съградим заедно днес?",
      opt1: "✨ Искам уникален проект",
      opt2: "🧮 Трябва ми бърза цена (Калкулатор)",
      opt3: "🤖 Искам да тествам AI Планера",
      opt4: "📥 Получи ценоразпис / брошура",
      opt5: "Само разглеждам, благодаря ☕",
      step1Title: "Стъпка 1 от 3: Избери имот",
      sub1: "🏡 Семейна къща",
      sub2: "🏢 Жилищен апартамент",
      sub3: "💼 Офис / Бизнес площ",
      back: "← Назад",
      step2Title: "Стъпка 2 от 3: Къде е имотът?",
      loc1: "🏙️ София / Голям град",
      loc2: "🌲 Извънградско / Планина",
      loc3: "🌊 По морето",
      backToSub: "← Назад",
      step3Title: "Стъпка 3 от 3: Планиран старт",
      time1: "🚀 В най-скоро време",
      time2: "⏳ След 6 месеца или повече",
      time3: "🔍 Само събирам идеи засега",
      leadTitle: "Въведи имейл за безплатна брошура:",
      leadBtn: "Изпрати ми материала",
      triggerText: "Консултант",
      msgNo: "Разбрах! Разгледай спокойно портфолиото, а аз оставам на линия, ако размислиш. ☕",
      msgEstimator: "Можеш да изчислиш ориентировъчна стойност за секунди в нашия ценови калкулатор.",
      btnEstimator: "🧮 Към калкулатора",
      msgAi: "Нашите иновативни AI алгоритми ще ти помогнат с първоначалното разпределение.",
      btnAi: "🤖 Към AI Планера",
      msgLead: "Въведи своя имейл и ще ти изпратим актуална брошура и ценоразпис веднага!",
      msgProject: "Супер! Нека преминем през 3 бързи стъпки. За какъв тип имот става въпрос?",
      msgLoc: "Отлично! Къде ще се намира бъдещият обект?",
      msgTime: "Кога планираш да стартираш проекта?",
      msgFinal: "Благодаря за информацията! Подготвихме персонализиран запрос за твоя проект.",
      btnFinal: "✨ Запази час за консултация",
      msgEmailDone: "Готово! Материалите бяха изпратени успешно към посочената поща. Очакваме те! ☕",
      btnHome: "Към началната страница"
    },
    en: {
      title: "Hello! 📐✨",
      message: "I am your architectural assistant. What shall we build together today?",
      opt1: "✨ I want a unique project",
      opt2: "🧮 I need a quick quote (Calculator)",
      opt3: "🤖 I want to test the AI Planner",
      opt4: "📥 Get price list / brochure",
      opt5: "Just browsing, thanks ☕",
      step1Title: "Step 1 of 3: Choose property",
      sub1: "🏡 Family House",
      sub2: "🏢 Apartment",
      sub3: "💼 Office / Business Space",
      back: "← Back",
      step2Title: "Step 2 of 3: Where is the property?",
      loc1: "🏙️ Sofia / Major City",
      loc2: "🌲 Countryside / Mountain",
      loc3: "🌊 By the Sea",
      backToSub: "← Back",
      step3Title: "Step 3 of 3: Planned Start",
      time1: "🚀 As soon as possible",
      time2: "⏳ In 6 months or more",
      time3: "🔍 Just gathering ideas for now",
      leadTitle: "Enter email for a free brochure:",
      leadBtn: "Send me the material",
      triggerText: "Consultant",
      msgNo: "Understood! Feel free to browse the portfolio, and I'll stay on standby if you change your mind. ☕",
      msgEstimator: "You can calculate an estimated cost in seconds using our price calculator.",
      btnEstimator: "🧮 To Calculator",
      msgAi: "Our innovative AI algorithms will help you with the initial floor plan layout.",
      btnAi: "🤖 To AI Planner",
      msgLead: "Enter your email and we'll send you our current brochure and price list right away!",
      msgProject: "Great! Let's go through 3 quick steps. What type of property is this for?",
      msgLoc: "Excellent! Where will the future project be located?",
      msgTime: "When are you planning to start the project?",
      msgFinal: "Thank you for the information! We have prepared a customized inquiry for your project.",
      btnFinal: "✨ Book a Consultation",
      msgEmailDone: "Done! The materials have been successfully sent to your inbox. We look forward to hearing from you! ☕",
      btnHome: "To Homepage"
    }
  };

  function getCurrentLang() {
    const activeLangBtn = document.querySelector('.lang-btn.active');
    if (activeLangBtn && activeLangBtn.textContent.toLowerCase().includes('en')) {
      return 'en';
    }
    return 'bg';
  }

  const widget = document.createElement('aside');
  widget.className = 'support-widget is-collapsed';
  widget.setAttribute('aria-label', 'Интелигентен помощник');

  function renderWidget() {
    const lang = getCurrentLang();
    const t = translations[lang];

    widget.innerHTML = `
      <!-- Фиксираме контейнера, за да не се разтяга на цял екран -->
      <div class="support-screen" role="status" aria-live="polite" style="max-height: 420px !important; overflow-y: auto !important; display: flex; flex-direction: column;">
        <button class="support-close" type="button" aria-label="Затвори">×</button>

        <div class="support-screen-face" aria-hidden="true"><span>АС</span></div>
        <div class="support-copy">
          <strong>${t.title}</strong>
          <span class="support-message">${t.message}</span>
        </div>
        
        <!-- Етап 1: Главно меню -->
        <div class="support-options" role="group" style="display: flex; flex-direction: column; gap: 8px;">
          <button class="support-option" type="button" data-choice="project">${t.opt1}</button>
          <button class="support-option" type="button" data-choice="estimator">${t.opt2}</button>
          <button class="support-option" type="button" data-choice="ai">${t.opt3}</button>
          <button class="support-option" type="button" data-choice="lead">${t.opt4}</button>
          <button class="support-option support-option-muted" type="button" data-choice="no">${t.opt5}</button>
        </div>

        <!-- Етап 2: Избор на тип имот -->
        <div class="support-sub-options" role="group" style="display: none; flex-direction: column; gap: 8px;">
          <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600; text-transform: uppercase;">${t.step1Title}</span>
          <button class="support-option" type="button" data-subchoice="house">${t.sub1}</button>
          <button class="support-option" type="button" data-subchoice="apartment">${t.sub2}</button>
          <button class="support-option" type="button" data-subchoice="office">${t.sub3}</button>
          <button class="support-option support-option-muted" type="button" data-choice="back">${t.back}</button>
        </div>

        <!-- Етап 3: Избор на локация -->
        <div class="support-location-options" role="group" style="display: none; flex-direction: column; gap: 8px;">
          <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600; text-transform: uppercase;">${t.step2Title}</span>
          <button class="support-option" type="button" data-loc="sofia">${t.loc1}</button>
          <button class="support-option" type="button" data-loc="nature">${t.loc2}</button>
          <button class="support-option" type="button" data-loc="sea">${t.loc3}</button>
          <button class="support-option support-option-muted" type="button" data-choice="back-to-sub">${t.backToSub}</button>
        </div>

        <!-- Етап 4: Времева рамка -->
        <div class="support-time-options" role="group" style="display: none; flex-direction: column; gap: 8px;">
          <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600; text-transform: uppercase;">${t.step3Title}</span>
          <button class="support-option" type="button" data-time="soon">${t.time1}</button>
          <button class="support-option" type="button" data-time="later">${t.time2}</button>
          <button class="support-option" type="button" data-time="ideas">${t.time3}</button>
        </div>

        <!-- Форма за имейл -->
        <div class="support-lead-form" role="group" style="display: none; flex-direction: column; gap: 8px;">
          <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600;">${t.leadTitle}</span>
          <input type="email" placeholder="your@email.com" class="support-email-input" style="padding: 10px; border: 1px solid #eadecc; border-radius: 8px; font-size: 0.85rem; outline: none; background: #fff;">
          <button class="support-submit-email support-option" type="button" style="background: #1a1a1a !important; color: #fff !important; text-align: center;">${t.leadBtn}</button>
          <button class="support-option support-option-muted" type="button" data-choice="back">${t.back}</button>
        </div>

        <a class="support-action" href="contact.html" style="display: none;"></a>
      </div>
      
      <button class="support-trigger" type="button" aria-label="Отвори помощта">
        <span class="support-trigger-dot" aria-hidden="true"></span>
        <span class="support-trigger-text">${t.triggerText}</span>
      </button>
    `;
  }

  renderWidget();
  document.body.appendChild(widget);

  let close = widget.querySelector('.support-close');
  let trigger = widget.querySelector('.support-trigger');
  let message = widget.querySelector('.support-message');
  let options = widget.querySelector('.support-options');
  let subOptions = widget.querySelector('.support-sub-options');
  let locOptions = widget.querySelector('.support-location-options');
  let timeOptions = widget.querySelector('.support-time-options');
  let leadForm = widget.querySelector('.support-lead-form');
  let emailInput = widget.querySelector('.support-email-input');
  let submitEmailBtn = widget.querySelector('.support-submit-email');
  let action = widget.querySelector('.support-action');

  let clientData = { type: '', location: '', timeline: '' };

  function showStep(stepElement) {
    const allSteps = [options, subOptions, locOptions, timeOptions, leadForm, action];
    allSteps.forEach(el => {
      if (el) el.style.setProperty('display', 'none', 'important');
    });
    if (stepElement) {
      stepElement.style.setProperty('display', 'flex', 'important');
    }
  }

  function updateMessage(text, callback) {
    message.textContent = text;
    if (callback) callback();
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        const wasOpen = !widget.classList.contains('is-collapsed');
        widget.remove();
        renderWidget();
        document.body.appendChild(widget);
        rebindEvents();
        if (wasOpen) widget.classList.remove('is-collapsed');
      }, 50);
    });
  });

  function rebindEvents() {
    const newWidget = document.querySelector('.support-widget');
    close = newWidget.querySelector('.support-close');
    trigger = newWidget.querySelector('.support-trigger');
    message = newWidget.querySelector('.support-message');
    options = newWidget.querySelector('.support-options');
    subOptions = newWidget.querySelector('.support-sub-options');
    locOptions = newWidget.querySelector('.support-location-options');
    timeOptions = newWidget.querySelector('.support-time-options');
    leadForm = newWidget.querySelector('.support-lead-form');
    emailInput = newWidget.querySelector('.support-email-input');
    submitEmailBtn = newWidget.querySelector('.support-submit-email');
    action = newWidget.querySelector('.support-action');
    attachListeners();
  }

  function attachListeners() {
    const lang = getCurrentLang();
    const t = translations[lang];

    options.addEventListener('click', function (event) {
      const choice = event.target.closest('[data-choice]');
      if (!choice) return;
      const type = choice.dataset.choice;

      if (type === 'no') {
        showStep(null);
        updateMessage(t.msgNo);
      } else if (type === 'estimator') {
        showStep(null);
        updateMessage(t.msgEstimator, () => {
          action.textContent = t.btnEstimator;
          action.href = 'estimator.html';
          showStep(action);
        });
      } else if (type === 'ai') {
        showStep(null);
        updateMessage(t.msgAi, () => {
          action.textContent = t.btnAi;
          action.href = 'planner.html';
          showStep(action);
        });
      } else if (type === 'lead') {
        updateMessage(t.msgLead, () => {
          showStep(leadForm);
        });
      } else if (type === 'project') {
        updateMessage(t.msgProject, () => {
          showStep(subOptions);
        });
      }
    });

    subOptions.addEventListener('click', function (event) {
      const btn = event.target.closest('button');
      if (!btn) return;
      if (btn.dataset.choice === 'back') {
        showStep(options);
        updateMessage(t.message);
        return;
      }
      clientData.type = btn.dataset.subchoice;
      updateMessage(t.msgLoc, () => {
        showStep(locOptions);
      });
    });

    locOptions.addEventListener('click', function (event) {
      const btn = event.target.closest('button');
      if (!btn) return;
      if (btn.dataset.choice === 'back-to-sub') {
        showStep(subOptions);
        updateMessage(t.msgProject);
        return;
      }
      clientData.location = btn.dataset.loc;
      updateMessage(t.msgTime, () => {
        showStep(timeOptions);
      });
    });

    timeOptions.addEventListener('click', function (event) {
      const btn = event.target.closest('button');
      if (!btn) return;
      clientData.timeline = btn.dataset.time;
      updateMessage(t.msgFinal, () => {
        action.textContent = t.btnFinal;
        action.href = `contact.html?type=${clientData.type}&loc=${clientData.location}&time=${clientData.timeline}`;
        showStep(action);
      });
    });

    submitEmailBtn.addEventListener('click', function () {
      const emailVal = emailInput.value.trim();
      if (!emailVal || !emailVal.includes('@')) {
        alert(lang === 'en' ? 'Please enter a valid email address.' : 'Моля, въведете валиден имейл адрес.');
        return;
      }
      showStep(null);
      updateMessage(t.msgEmailDone, () => {
        action.textContent = t.btnHome;
        action.href = 'index.html';
        showStep(action);
      });
    });

    close.addEventListener('click', function () {
      widget.classList.add('is-collapsed');
      trigger.focus();
    });
    
    trigger.addEventListener('click', function () {
      widget.classList.remove('is-collapsed');
    });
  }

  attachListeners();
});