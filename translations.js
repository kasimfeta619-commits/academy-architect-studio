const translations = {
    bg: {
        // Навигация
        "nav-studio": "Academy Architect Studio",
        "nav-home": "Начало",
        "nav-catalog": "Проекти",
        "nav-about": "За нас",
        "nav-planner": "ИИ Планер",
        "nav-estimator": "Калкулатор",
        "nav-contact": "Контакти",
        "nav-login": "Вход",
        
        // Начална страница (index.html)
        "hero-eyebrow": "Архитектурно студио",
        "hero-title": "Проектираме бъдещето с внимание към детайла",
        "hero-desc": "Създаваме минималистични и функционални пространства, съчетаващи съвременни технологии с изчистена архитектура.",
        "btn-browse": "Разгледайте проектите",
        "btn-contact": "Свържете се с нас",
        "badge-title": "ПОСЛЕДЕН",
        "badge-sub": "Проект „Минимализъм“",
        "section-featured": "Избрани проекти",
        "quote-text": "„Добрата архитектура не просто заема пространство, тя му дава смисъл.“",
        "quote-sub": "Вярваме, че всеки детайл има значение при изграждането на перфектния дом или работно пространство, създавайки среда, която вдъхновява всеки ден.",
        "footer-subtitle": "Дизайн и инженеринг",
        "footer-contacts": "Контакти",
        "footer-address": "София, България",
        "footer-links-title": "Линкове",
        "footer-rights": "&copy; 2026 Academy Architect Studio.<br>Всички права запазени.",
        "no-projects": "Все още няма добавени проекти.",

        // Контакти и Резервации (contact.html)
        "contact-eyebrow": "ВРЪЗКА И РЕЗЕРВАЦИЯ",
        "contact-title": "Обсъдете вашия проект или запазете среща.",
        "footer-address-label": "Адрес:",
        "email-label": "Имейл:",
        "contact-phone-label": "Телефон:",
        "inquiry-type-label": "Тип запитване",
        "option-general": "Общо съобщение",
        "option-booking": "Резервирай консултация / среща",
        "form-name": "Вашето име",
        "form-email": "Вашият имейл",
        "form-phone": "Телефонен номер",
        "form-date": "Желана дата",
        "form-time": "Желан час",
        "form-message": "Съобщение / Детайли",
        "form-submit": "Изпрати запитване"
    },
    en: {
        // Navigation
        "nav-studio": "Academy Architect Studio",
        "nav-home": "Home",
        "nav-catalog": "Projects",
        "nav-about": "About Us",
        "nav-planner": "AI Planner",
        "nav-estimator": "Estimator",
        "nav-contact": "Contacts",
        "nav-login": "Login",
        
        // Home page (index.html)
        "hero-eyebrow": "Architectural Studio",
        "hero-title": "Designing the future with attention to detail",
        "hero-desc": "We create minimalist and functional spaces, combining modern technologies with clean architecture.",
        "btn-browse": "Browse Projects",
        "btn-contact": "Contact Us",
        "badge-title": "LATEST",
        "badge-sub": "\"Minimalism\" Project",
        "section-featured": "Featured Projects",
        "quote-text": "\"Good architecture doesn't just occupy space, it gives it meaning.\"",
        "quote-sub": "We believe that every detail matters when building the perfect home or workspace, creating an environment that inspires every day.",
        "footer-subtitle": "Design & Engineering",
        "footer-contacts": "Contacts",
        "footer-address": "Sofia, Bulgaria",
        "footer-links-title": "Links",
        "footer-rights": "&copy; 2026 Academy Architect Studio.<br>All rights reserved.",
        "no-projects": "No projects added yet.",

        // Contacts & Booking (contact.html)
        "contact-eyebrow": "GET IN TOUCH & BOOKING",
        "contact-title": "Let's discuss your project or book a meeting.",
        "footer-address-label": "Address:",
        "email-label": "Email:",
        "contact-phone-label": "Phone:",
        "inquiry-type-label": "Inquiry Type",
        "option-general": "General Message",
        "option-booking": "Book Consultation / Meeting",
        "form-name": "Your Name",
        "form-email": "Your Email",
        "form-phone": "Phone Number",
        "form-date": "Preferred Date",
        "form-time": "Preferred Time",
        "form-message": "Message / Details",
        "form-submit": "Send Request"
    }
};

function setLanguage(lang) {
    localStorage.setItem('preferredLang', lang);
    document.documentElement.lang = lang;
    
    // Активни бутони за език
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
    });

    // Смяна на текстовете по атрибут data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });
}

function initLanguage() {
    const savedLang = localStorage.getItem('preferredLang') || 'bg';
    setLanguage(savedLang);
}