document.addEventListener('DOMContentLoaded', async function () {
  if (document.querySelector('.support-widget')) return;

  // Инициализация на Firebase (използва същите настройки като в contact.html)
  const firebaseConfig = {
      apiKey: "AIzaSyDeezhyddNjZyOeo9MyuwOuhXvFCCscUzg",
      authDomain: "architect-studio-1810c.firebaseapp.com",
      projectId: "architect-studio-1810c",
      storageBucket: "architect-studio-1810c.firebasestorage.app",
      messagingSenderId: "1053914253758",
      appId: "1:1053914253758:web:97d9bc28ac5465730311ef",
      measurementId: "G-NN7GYSF55G"
  };

  if (typeof firebase !== 'undefined' && !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
  const db = (typeof firebase !== 'undefined') ? firebase.firestore() : null;

  const translations = {
    bg: {
      title: "Здравей! 📐✨",
      message: "Аз съм твоят архитектурен асистент. Какво ще съградим заедно днес?",
      opt1: "✨ Искам уникален проект",
      opt2: "🧮 Трябва ми бърза цена (Калкулатор)",
      opt3: "🤖 Искам да тествам AI Планера",
      opt4: "📅 Запази час за консултация",
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
      triggerText: "Консултант",
      msgNo: "Разбрах! Разгледай спокойно портфолиото, а аз оставам на линия, ако размислиш. ☕",
      msgEstimator: "Можеш да изчислиш ориентировъчна стойност за секунди в нашия ценови калкулатор.",
      btnEstimator: "🧮 Към калкулатора",
      msgAi: "Нашите иновативни AI алгоритми ще ти помогнат с първоначалното разпределение.",
      btnAi: "🤖 Към AI Планера",
      msgProject: "Супер! Нека преминем през 3 бързи стъпки. За какъв тип имот става въпрос?",
      msgLoc: "Отлично! Къде ще се намира бъдещият обект?",
      msgTime: "Кога планираш да стартираш проекта?",
      
      // Текстове за запазване на час
      msgBookingDate: "Избери дата за консултация с архитект:",
      msgBookingTime: "Избери свободен час (през половин час):",
      msgBookingDetails: "Въведи име и телефон за потвърждение:",
      namePlaceholder: "Вашето име",
      phonePlaceholder: "Телефон за връзка (+359...)",
      confirmBookingBtn: "Запази часа сега",
      msgBookingDone: "Успешно запази час! Данните са изпратени в системата и очакваме срещата ви. ☕",
      btnHome: "Към началната страница"
    },
    en: {
      title: "Hello! 📐✨",
      message: "I am your architectural assistant. What shall we build together today?",
      opt1: "✨ I want a unique project",
      opt2: "🧮 I need a quick quote (Calculator)",
      opt3: "🤖 I want to test the AI Planner",
      opt4: "📅 Book a consultation",
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
      triggerText: "Consultant",
      msgNo: "Understood! Feel free to browse the portfolio, and I'll stay on standby if you change your mind. ☕",
      msgEstimator: "You can calculate an estimated cost in seconds using our price calculator.",
      btnEstimator: "🧮 To Calculator",
      msgAi: "Our innovative AI algorithms will help you with the initial floor plan layout.",
      btnAi: "🤖 To AI Planner",
      msgProject: "Great! Let's go through 3 quick steps. What type of property is this for?",
      msgLoc: "Excellent! Where will the future project be located?",
      msgTime: "When are you planning to start the project?",
      
      msgBookingDate: "Select a date for consultation with the architect:",
      msgBookingTime: "Select an available time slot:",
      msgBookingDetails: "Enter your name and phone to confirm:",
      namePlaceholder: "Your Name",
      phonePlaceholder: "Phone Number (+359...)",
      confirmBookingBtn: "Book Slot Now",
      msgBookingDone: "Appointment successfully booked! Sent to the system. We look forward to meeting you! ☕",
      btnHome: "To Homepage"
    }
  };

  function getCurrentLang() {
    const activeLangBtn = document.querySelector('.lang-btn.active');
    if (activeLangBtn && activeLangBtn.textContent.toLowerCase().includes('en')) {
      return 'en';
    }
    return localStorage.getItem('siteLang') || 'bg';
  }

  const widget = document.createElement('aside');
  widget.className = 'support-widget is-collapsed';
  widget.setAttribute('aria-label', 'Интелигентен помощник');

  let currentView = 'home';
  let clientData = { type: '', location: '', timeline: '', date: '', time: '', name: '', phone: '' };
  const workingHours = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
  let bookedSlotsForDate = [];

  async function fetchBookedSlots(dateVal) {
    if (!db) return [];
    try {
      const snapshot = await db.collection('studioBookings').get();
      let taken = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.datetime && data.datetime.startsWith(dateVal)) {
          const parts = data.datetime.split(' ');
          if (parts.length >= 2) {
            taken.push(parts[1].substring(0, 5));
          }
        }
      });
      return taken;
    } catch (err) {
      console.error("Грешка при зареждане на часовете:", err);
      return [];
    }
  }

  async function renderWidgetContent() {
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
          <button class="support-option" type="button" data-action="go-booking">${t.opt4}</button>
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
    } else if (currentView === 'booking-date') {
      messageText = t.msgBookingDate;
      contentHTML = `
        <div role="group" style="display: flex; flex-direction: column; gap: 8px;">
          <input type="date" class="support-date-input" value="${clientData.date}" style="padding: 10px; border: 1px solid #eadecc; border-radius: 8px; font-size: 0.85rem; outline: none; background: #fff; color: #1a1a1a;">
          <button class="support-next-date support-option" type="button" style="background: #1a1a1a !important; color: #fff !important; text-align: center;">${lang === 'en' ? 'Next: Select Time' : 'Напред: Избери час'}</button>
          <button class="support-option support-option-muted" type="button" data-action="back-home">${t.back}</button>
        </div>
      `;
    } else if (currentView === 'booking-time') {
      messageText = t.msgBookingTime;
      let slotsHtml = '';
      workingHours.forEach(slot => {
        const isTaken = bookedSlotsForDate.includes(slot);
        slotsHtml += `<button type="button" class="slot-pick-btn" data-slot="${slot}" style="padding: 6px; border-radius: 6px; border: 1px solid #eadecc; font-size: 0.75rem; font-weight: 600; cursor: ${isTaken ? 'not-allowed' : 'pointer'}; background: ${isTaken ? '#f2dede' : '#fff'}; color: ${isTaken ? '#a94442' : '#1a1a1a'};" ${isTaken ? 'disabled' : ''}>${slot}</button>`;
      });

      contentHTML = `
        <div role="group" style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; max-height: 140px; overflow-y: auto;">
            ${slotsHtml}
          </div>
          <button class="support-option support-option-muted" type="button" data-action="back-booking-date">${t.back}</button>
        </div>
      `;
    } else if (currentView === 'booking-details') {
      messageText = t.msgBookingDetails;
      contentHTML = `
        <div role="group" style="display: flex; flex-direction: column; gap: 8px;">
          <input type="text" placeholder="${t.namePlaceholder}" class="support-name-input" value="${clientData.name}" style="padding: 10px; border: 1px solid #eadecc; border-radius: 8px; font-size: 0.85rem; outline: none; background: #fff;">
          <input type="tel" placeholder="${t.phonePlaceholder}" class="support-phone-input" value="${clientData.phone}" style="padding: 10px; border: 1px solid #eadecc; border-radius: 8px; font-size: 0.85rem; outline: none; background: #fff;">
          <button class="support-confirm-booking support-option" type="button" style="background: #1a1a1a !important; color: #fff !important; text-align: center;">${t.confirmBookingBtn}</button>
          <button class="support-option support-option-muted" type="button" data-action="back-booking-time">${t.back}</button>
        </div>
      `;
    } else if (currentView === 'booking-done') {
      messageText = t.msgBookingDone;
      contentHTML = `
        <a class="support-option" href="index.html" style="background: #1a1a1a !important; color: #fff !important; text-align: center; text-decoration: none;">${t.btnHome}</a>
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

  await renderWidgetContent();
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
      screenBody.onclick = async function (event) {
        const target = event.target;

        const actionBtn = target.closest('[data-action]');
        if (actionBtn) {
          const act = actionBtn.dataset.action;
          if (act === 'go-project') currentView = 'project-step1';
          else if (act === 'go-estimator') currentView = 'msg-estimator';
          else if (act === 'go-ai') currentView = 'msg-ai';
          else if (act === 'go-booking') currentView = 'booking-date';
          else if (act === 'go-no') currentView = 'msg-no';
          else if (act === 'back-home') currentView = 'home';
          else if (act === 'back-step1') currentView = 'project-step1';
          else if (act === 'back-step2') currentView = 'project-step2';
          else if (act === 'back-step3') currentView = 'project-step3';
          else if (act === 'back-booking-date') currentView = 'booking-date';
          else if (act === 'back-booking-time') currentView = 'booking-time';

          await renderWidgetContent();
          return;
        }

        const subBtn = target.closest('[data-sub]');
        if (subBtn) {
          clientData.type = subBtn.dataset.sub;
          currentView = 'project-step2';
          await renderWidgetContent();
          return;
        }

        const locBtn = target.closest('[data-loc]');
        if (locBtn) {
          clientData.location = locBtn.dataset.loc;
          currentView = 'project-step3';
          await renderWidgetContent();
          return;
        }

        const timeBtn = target.closest('[data-time]');
        if (timeBtn) {
          clientData.timeline = timeBtn.dataset.time;
          currentView = 'booking-date';
          await renderWidgetContent();
          return;
        }

        // Стъпка 1 от запазването: Избор на дата
        if (target.classList.contains('support-next-date')) {
          const dateInput = widget.querySelector('.support-date-input');
          const val = dateInput ? dateInput.value : '';
          const lang = getCurrentLang();
          if (!val) {
            alert(lang === 'en' ? 'Please select a date.' : 'Моля, изберете дата.');
            return;
          }
          clientData.date = val;
          bookedSlotsForDate = await fetchBookedSlots(val);
          currentView = 'booking-time';
          await renderWidgetContent();
          return;
        }

        // Стъпка 2 от запазването: Избор на свободен час
        const slotBtn = target.closest('.slot-pick-btn');
        if (slotBtn && !slotBtn.disabled) {
          clientData.time = slotBtn.dataset.slot;
          currentView = 'booking-details';
          await renderWidgetContent();
          return;
        }

        // Стъпка 3: Финално потвърждение и запис във Firebase `studioBookings`
        if (target.classList.contains('support-confirm-booking')) {
          const nameInput = widget.querySelector('.support-name-input');
          const phoneInput = widget.querySelector('.support-phone-input');
          
          clientData.name = nameInput ? nameInput.value.trim() : '';
          clientData.phone = phoneInput ? phoneInput.value.trim() : '';
          const lang = getCurrentLang();

          if (!clientData.name || !clientData.phone) {
            alert(lang === 'en' ? 'Please fill in your name and phone.' : 'Моля, попълнете име и телефон.');
            return;
          }

          const fullDatetime = `${clientData.date} ${clientData.time}:00`;
          const serviceName = clientData.type 
            ? `Консултация от уиджиет [Тип: ${clientData.type}, Локация: ${clientData.location}]` 
            : 'Директен час през уиджиет';

          const newBooking = {
            name: clientData.name,
            phone: clientData.phone,
            service: serviceName,
            datetime: fullDatetime,
            createdAt: new Date().toISOString()
          };

          try {
            if (db) {
              // Записва директно в същата база данни и колекция като contact.html
              await db.collection('studioBookings').add(newBooking);
            } else {
              let bookings = JSON.parse(localStorage.getItem('studioBookings') || '[]');
              bookings.push(newBooking);
              localStorage.setItem('studioBookings', JSON.stringify(bookings));
            }
            currentView = 'booking-done';
            await renderWidgetContent();
          } catch (err) {
            console.error("Грешка при запис на час през уиджиета:", err);
            let bookings = JSON.parse(localStorage.getItem('studioBookings') || '[]');
            bookings.push(newBooking);
            localStorage.setItem('studioBookings', JSON.stringify(bookings));
            currentView = 'booking-done';
            await renderWidgetContent();
          }
          return;
        }
      };
    }
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(async () => {
        const wasOpen = !widget.classList.contains('is-collapsed');
        await renderWidgetContent();
        if (wasOpen) widget.classList.remove('is-collapsed');
      }, 50);
    });
  });
});