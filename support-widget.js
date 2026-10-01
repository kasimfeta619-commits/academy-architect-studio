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
      
      // Нови текстове за запазване на час
      msgBooking: "Чудесно! Избери удобен начин за среща с нашия водещ архитект:",
      bookType1: "💻 Онлайн видео разговор (Zoom / Meet)",
      bookType2: "☕ Среща на живо в архитектурното студио",
      msgBookingSlot: "Избери желан ден и час за консултацията:",
      slot1: "📅 Утре (Вторник) от 14:00 ч.",
      slot2: "📅 Сряда от 10:30 ч.",
      slot3: "📅 Четвъртък от 17:00 ч.",
      msgBookingDetails: "Въведи своите данни за връзка, за да потвърдим часа:",
      namePlaceholder: "Твоето име",
      phonePlaceholder: "Телефон за връзка",
      emailPlaceholder: "Имейл адрес",
      confirmBookingBtn: "Потвърди запазването на часа",
      msgBookingDone: "Успешно запази час за консултация! Архитектът ще се свърже с теб за потвърждение. Очакваме те! ☕",
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
      
      msgBooking: "Great! Choose a preferred meeting type with our lead architect:",
      bookType1: "💻 Online Video Call (Zoom / Meet)",
      bookType2: "☕ In-person Meeting at the Studio",
      msgBookingSlot: "Select a preferred day and time for the consultation:",
      slot1: "📅 Tomorrow (Tuesday) at 14:00",
      slot2: "📅 Wednesday at 10:30",
      slot3: "📅 Thursday at 17:00",
      msgBookingDetails: "Enter your contact details to confirm the appointment:",
      namePlaceholder: "Your Name",
      phonePlaceholder: "Phone Number",
      emailPlaceholder: "Email Address",
      confirmBookingBtn: "Confirm Appointment",
      msgBookingDone: "You have successfully booked a consultation! The architect will contact you to confirm. We look forward to meeting you! ☕",
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

  let currentView = 'home';
  let clientData = { type: '', location: '', timeline: '', meetingType: '', slot: '', name: '', phone: '', email: '' };

  function renderWidgetContent() {
    const lang = getCurrentLang();
    const t = translations[lang];

    let messageText = t.message;
    let contentHTML = '';

    if (currentView === 'home') {
      messageText = t.message;
      contentHTML = `
        <div class="support-options" role="group" style="display: flex; flex-direction: column; gap: 8px;">
          <button class="support-option" type="button" data-action="go-project">${t.opt1}</button>
          <button class="support-option" type="button" data-action="go-estimator">${t.opt2}</button>
          <button class="support-option" type="button" data-action="go-ai">${t.opt3}</button>
          <button class="support-option" type="button" data-action="go-lead">${t.opt4}</button>
          <button class="support-option support-option-muted" type="button" data-action="go-no">${t.opt5}</button>
        </div>
      `;
    } else if (currentView === 'project-step1') {
      messageText = t.msgProject;
      contentHTML = `
        <div role="group" style="display: flex; flex-direction: column; gap: 8px;">
          <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600; text-transform: uppercase;">${t.step1Title}</span>
          <button class="support-option" type="button" data-sub="house">${t.sub1}</button>
          <button class="support-option" type="button" data-sub="apartment">${t.sub2}</button>
          <button class="support-option" type="button" data-sub="office">${t.sub3}</button>
          <button class="support-option support-option-muted" type="button" data-action="back-home">${t.back}</button>
        </div>
      `;
    } else if (currentView === 'project-step2') {
      messageText = t.msgLoc;
      contentHTML = `
        <div role="group" style="display: flex; flex-direction: column; gap: 8px;">
          <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600; text-transform: uppercase;">${t.step2Title}</span>
          <button class="support-option" type="button" data-loc="sofia">${t.loc1}</button>
          <button class="support-option" type="button" data-loc="nature">${t.loc2}</button>
          <button class="support-option" type="button" data-loc="sea">${t.loc3}</button>
          <button class="support-option support-option-muted" type="button" data-action="back-step1">${t.back}</button>
        </div>
      `;
    } else if (currentView === 'project-step3') {
      messageText = t.msgTime;
      contentHTML = `
        <div role="group" style="display: flex; flex-direction: column; gap: 8px;">
          <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600; text-transform: uppercase;">${t.step3Title}</span>
          <button class="support-option" type="button" data-time="soon">${t.time1}</button>
          <button class="support-option" type="button" data-time="later">${t.time2}</button>
          <button class="support-option" type="button" data-time="ideas">${t.time3}</button>
          <button class="support-option support-option-muted" type="button" data-action="back-step2">${t.back}</button>
        </div>
      `;
    } else if (currentView === 'booking-type') {
      // Тук след въпросите преминаваме към запазване на час
      messageText = t.msgBooking;
      contentHTML = `
        <div role="group" style="display: flex; flex-direction: column; gap: 8px;">
          <button class="support-option" type="button" data-booktype="online">${t.bookType1}</button>
          <button class="support-option" type="button" data-booktype="studio">${t.bookType2}</button>
          <button class="support-option support-option-muted" type="button" data-action="back-step3">${t.back}</button>
        </div>
      `;
    } else if (currentView === 'booking-slot') {
      messageText = t.msgBookingSlot;
      contentHTML = `
        <div role="group" style="display: flex; flex-direction: column; gap: 8px;">
          <button class="support-option" type="button" data-slot="tomorrow-14">${t.slot1}</button>
          <button class="support-option" type="button" data-slot="wed-10">${t.slot2}</button>
          <button class="support-option" type="button" data-slot="thu-17">${t.slot3}</button>
          <button class="support-option support-option-muted" type="button" data-action="back-booking-type">${t.back}</button>
        </div>
      `;
    } else if (currentView === 'booking-details') {
      messageText = t.msgBookingDetails;
      contentHTML = `
        <div role="group" style="display: flex; flex-direction: column; gap: 8px;">
          <input type="text" placeholder="${t.namePlaceholder}" class="support-name-input" style="padding: 10px; border: 1px solid #eadecc; border-radius: 8px; font-size: 0.85rem; outline: none; background: #fff;">
          <input type="tel" placeholder="${t.phonePlaceholder}" class="support-phone-input" style="padding: 10px; border: 1px solid #eadecc; border-radius: 8px; font-size: 0.85rem; outline: none; background: #fff;">
          <input type="email" placeholder="${t.emailPlaceholder}" class="support-email-input" style="padding: 10px; border: 1px solid #eadecc; border-radius: 8px; font-size: 0.85rem; outline: none; background: #fff;">
          <button class="support-confirm-booking support-option" type="button" style="background: #1a1a1a !important; color: #fff !important; text-align: center;">${t.confirmBookingBtn}</button>
          <button class="support-option support-option-muted" type="button" data-action="back-booking-slot">${t.back}</button>
        </div>
      `;
    } else if (currentView === 'booking-done') {
      messageText = t.msgBookingDone;
      contentHTML = `
        <a class="support-option" href="index.html" style="background: #1a1a1a !important; color: #fff !important; text-align: center; text-decoration: none;">${t.btnHome}</a>
      `;
    } else if (currentView === 'lead') {
      messageText = t.msgLead;
      contentHTML = `
        <div role="group" style="display: flex; flex-direction: column; gap: 8px;">
          <span style="font-size: 0.8rem; color: #8c8275; font-weight: 600;">${t.leadTitle}</span>
          <input type="email" placeholder="your@email.com" class="support-email-input" style="padding: 10px; border: 1px solid #eadecc; border-radius: 8px; font-size: 0.85rem; outline: none; background: #fff;">
          <button class="support-submit-email support-option" type="button" style="background: #1a1a1a !important; color: #fff !important; text-align: center;">${t.leadBtn}</button>
          <button class="support-option support-option-muted" type="button" data-action="back-home">${t.back}</button>
        </div>
      `;
    } else if (currentView === 'msg-no') {
      messageText = t.msgNo;
      contentHTML = `<button class="support-option support-option-muted" type="button" data-action="back-home">Начало</button>`;
    } else if (currentView === 'msg-estimator') {
      messageText = t.msgEstimator;
      contentHTML = `
        <a class="support-option" href="estimator.html" style="background: #1a1a1a !important; color: #fff !important; text-align: center; text-decoration: none;">${t.btnEstimator}</a>
        <button class="support-option support-option-muted" type="button" data-action="back-home">${t.back}</button>
      `;
    } else if (currentView === 'msg-ai') {
      messageText = t.msgAi;
      contentHTML = `
        <a class="support-option" href="planner.html" style="background: #1a1a1a !important; color: #fff !important; text-align: center; text-decoration: none;">${t.btnAi}</a>
        <button class="support-option support-option-muted" type="button" data-action="back-home">${t.back}</button>
      `;
    } else if (currentView === 'email-done') {
      messageText = t.msgEmailDone;
      contentHTML = `
        <a class="support-option" href="index.html" style="background: #1a1a1a !important; color: #fff !important; text-align: center; text-decoration: none;">${t.btnHome}</a>
      `;
    }

    widget.innerHTML = `
      <div class="support-screen" role="status" aria-live="polite">
        <button class="support-close" type="button" aria-label="Затвори">×</button>

        <div class="support-screen-face" aria-hidden="true"><span>АС</span></div>
        <div class="support-copy">
          <strong>${t.title}</strong>
          <span class="support-message">${messageText}</span>
        </div>
        
        ${contentHTML}
      </div>
      
      <button class="support-trigger" type="button" aria-label="Отвори помощта">
        <span class="support-trigger-dot" aria-hidden="true"></span>
        <span class="support-trigger-text">${t.triggerText}</span>
      </button>
    `;

    attachListeners();
  }

  renderWidgetContent();
  document.body.appendChild(widget);

  function attachListeners() {
    const closeBtn = widget.querySelector('.support-close');
    const triggerBtn = widget.querySelector('.support-trigger');
    const screenBody = widget.querySelector('.support-screen');

    if (closeBtn) {
      closeBtn.onclick = () => widget.classList.add('is-collapsed');
    }
    if (triggerBtn) {
      triggerBtn.onclick = () => widget.classList.remove('is-collapsed');
    }

    if (screenBody) {
      screenBody.onclick = function (event) {
        const target = event.target;

        const actionBtn = target.closest('[data-action]');
        if (actionBtn) {
          const act = actionBtn.dataset.action;
          if (act === 'go-project') currentView = 'project-step1';
          else if (act === 'go-estimator') currentView = 'msg-estimator';
          else if (act === 'go-ai') currentView = 'msg-ai';
          else if (act === 'go-lead') currentView = 'lead';
          else if (act === 'go-no') currentView = 'msg-no';
          else if (act === 'back-home') currentView = 'home';
          else if (act === 'back-step1') currentView = 'project-step1';
          else if (act === 'back-step2') currentView = 'project-step2';
          else if (act === 'back-step3') currentView = 'project-step3';
          else if (act === 'back-booking-type') currentView = 'booking-type';
          else if (act === 'back-booking-slot') currentView = 'booking-slot';

          renderWidgetContent();
          return;
        }

        const subBtn = target.closest('[data-sub]');
        if (subBtn) {
          clientData.type = subBtn.dataset.sub;
          currentView = 'project-step2';
          renderWidgetContent();
          return;
        }

        const locBtn = target.closest('[data-loc]');
        if (locBtn) {
          clientData.location = locBtn.dataset.loc;
          currentView = 'project-step3';
          renderWidgetContent();
          return;
        }

        const timeBtn = target.closest('[data-time]');
        if (timeBtn) {
          clientData.timeline = timeBtn.dataset.time;
          // След последната стъпка вместо директен линк, преминаваме към запазване на час!
          currentView = 'booking-type';
          renderWidgetContent();
          return;
        }

        // Избор на тип среща
        const bookTypeBtn = target.closest('[data-booktype]');
        if (bookTypeBtn) {
          clientData.meetingType = bookTypeBtn.dataset.booktype;
          currentView = 'booking-slot';
          renderWidgetContent();
          return;
        }

        // Избор на часови слот
        const slotBtn = target.closest('[data-slot]');
        if (slotBtn) {
          clientData.slot = slotBtn.dataset.slot;
          currentView = 'booking-details';
          renderWidgetContent();
          return;
        }

        // Потвърждаване на резервацията с данни
        if (target.classList.contains('support-confirm-booking')) {
          const nameInput = widget.querySelector('.support-name-input');
          const phoneInput = widget.querySelector('.support-phone-input');
          const emailInput = widget.querySelector('.support-email-input');
          
          clientData.name = nameInput ? nameInput.value.trim() : '';
          clientData.phone = phoneInput ? phoneInput.value.trim() : '';
          clientData.email = emailInput ? emailInput.value.trim() : '';
          const lang = getCurrentLang();

          if (!clientData.name || !clientData.phone || !clientData.email || !clientData.email.includes('@')) {
            alert(lang === 'en' ? 'Please fill in all fields with a valid email.' : 'Моля, попълнете всички полета и въведете валиден имейл.');
            return;
          }

          // Тук можеш да пратиш `clientData` към backend/сървър или имейл API ако желаеш
          currentView = 'booking-done';
          renderWidgetContent();
          return;
        }

        if (target.classList.contains('support-submit-email')) {
          const input = widget.querySelector('.support-email-input');
          const emailVal = input ? input.value.trim() : '';
          const lang = getCurrentLang();
          if (!emailVal || !emailVal.includes('@')) {
            alert(lang === 'en' ? 'Please enter a valid email address.' : 'Моля, въведете валиден имейл адрес.');
            return;
          }
          currentView = 'email-done';
          renderWidgetContent();
          return;
        }
      };
    }
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        const wasOpen = !widget.classList.contains('is-collapsed');
        renderWidgetContent();
        if (wasOpen) widget.classList.remove('is-collapsed');
      }, 50);
    });
  });
});