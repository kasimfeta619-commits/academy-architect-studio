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

        // За нас (about.html)
        "about-eyebrow": "ЗА СТУДИОТО",
        "about-title": "Личен архив на архитектурни проекти.",
        "about-desc-1": "Academy Architect Studio е авторски каталог с проекти за къщи. Всеки проект е разработен с внимание към пропорции, светлина и материал — от идейната скица до подробния план на всеки етаж.",
        "about-desc-2": "Тук качвам собствените си работи. Всеки проект е готов за адаптация към конкретен парцел, климат и бюджет.",

        // Контакти и Резервации (contact.html)
        "contact-eyebrow": "ВРЪЗКА И РЕЗЕРВАЦИЯ",
        "contact-title": "Обсъдете вашия проект или запазете среща.",
        "contact-type-label": "Тип запитване",
        "option-general": "Общо съобщение",
        "option-consultation": "Консултация за проект",
        "option-quote": "Запитване за оферта",
        "contact-name-label": "Вашето име",
        "contact-email-label": "Вашият имейл",
        "contact-phone-label": "Телефонен номер",
        "contact-msg-label": "Съобщение / Детайли",
        "contact-btn-send": "Изпрати запитване"
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

        // About Us (about.html)
        "about-eyebrow": "ABOUT THE STUDIO",
        "about-title": "Personal archive of architectural projects.",
        "about-desc-1": "Academy Architect Studio is an original catalog of house designs. Each project is developed with attention to proportions, light, and material — from the initial sketch to the detailed floor plan.",
        "about-desc-2": "Here I upload my own works. Each project is ready for adaptation to a specific plot, climate, and budget.",

        // Contacts & Booking (contact.html)
        "contact-eyebrow": "GET IN TOUCH & BOOKING",
        "contact-title": "Let's discuss your project or book a meeting.",
        "contact-type-label": "Inquiry Type",
        "option-general": "General Message",
        "option-consultation": "Project Consultation",
        "option-quote": "Quote Request",
        "contact-name-label": "Your Name",
        "contact-email-label": "Your Email",
        "contact-phone-label": "Phone Number",
        "contact-msg-label": "Message / Details",
        "contact-btn-send": "Send Request"
    }
};

function setLanguage(lang) {
    localStorage.setItem('siteLang', lang); // Уеднаквено ключе с останалите скриптове
    document.documentElement.lang = lang;
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
    });

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
    const savedLang = localStorage.getItem('siteLang') || 'bg';
    setLanguage(savedLang);
}