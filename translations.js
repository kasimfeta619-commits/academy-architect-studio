const translations = {
    en: {
        "nav-studio": "Academy Architect Studio",
        "nav-home": "Home",
        "nav-catalog": "Projects",
        "nav-about": "About Us",
        "nav-planner": "AI Planner",
        "nav-estimator": "Estimator",
        "nav-contact": "Contacts",
        "nav-login": "Login",
        
        // About page
        "about-eyebrow": "ABOUT THE STUDIO",
        "about-title": "Personal archive of architectural projects.",
        "about-p1": "Academy Architect Studio is an author's catalog of house designs. Each project is developed with attention to proportion, light, and material — from the initial sketch to the detailed floor plan.",
        "about-p2": "Here I share my own work. Every project is ready for adaptation to a specific plot, climate, and budget.",
        
        // Estimator page
        "estimator-title": "Price Calculator",
        "estimator-subtitle": "Calculate an approximate budget for your project",
        "estimator-type-label": "Project Type",
        "estimator-area-label": "Area (sq.m)",
        "estimator-package-label": "Service Package",
        "estimator-result-label": "Estimated price:",
        "opt-residential": "Residential (House / Apartment)",
        "opt-commercial": "Commercial Building",
        "opt-interior": "Interior Design",
        "pkg-basic": "Idea Project (Basic)",
        "pkg-standard": "Full Technical Project (Standard)",
        "pkg-full": "Turnkey with Supervision (Full)",

        // Contact page
        "contact-eyebrow": "GET IN TOUCH & BOOKING",
        "contact-title": "Let's discuss your project or book a meeting.",
        "form-name": "Your Name",
        "form-email": "Your Email",
        "form-phone": "Phone Number",
        "form-message": "Message / Details",
        "form-submit": "Send Request",

        // Catalog page
        "no-projects": "No projects added yet.",

        // Footer
        "footer-subtitle": "Design & Engineering",
        "footer-contacts": "Contacts",
        "footer-address": "Sofia, Bulgaria",
        "footer-links-title": "Links",
        "footer-rights": "&copy; 2026 Academy Architect Studio.<br>All rights reserved."
    },
    bg: {
        "nav-studio": "Academy Architect Studio",
        "nav-home": "Начало",
        "nav-catalog": "Проекти",
        "nav-about": "За нас",
        "nav-planner": "ИИ Планер",
        "nav-estimator": "Калкулатор",
        "nav-contact": "Контакти",
        "nav-login": "Вход",
        
        // About page
        "about-eyebrow": "ЗА СТУДИОТО",
        "about-title": "Личен архив на архитектурни проекти.",
        "about-p1": "Academy Architect Studio е авторски каталог с проекти за къщи. Всеки проект е разработен с внимание към пропорции, светлина и материал — от идейната скица до подробния план на всеки етаж.",
        "about-p2": "Тук качвам собствените си работи. Всеки проект е готов за адаптация към конкретен парцел, климат и бюджет.",
        
        // Estimator page
        "estimator-title": "Калкулатор за цена",
        "estimator-subtitle": "Изчислете ориентировъчен бюджет за вашия проект",
        "estimator-type-label": "Тип проект",
        "estimator-area-label": "Квадратура (кв.м)",
        "estimator-package-label": "Пакет услуги",
        "estimator-result-label": "Ориентировъчна цена:",
        "opt-residential": "Жилищен (Къща / Апартамент)",
        "opt-commercial": "Търговска сграда",
        "opt-interior": "Интериорен дизайн",
        "pkg-basic": "Идеен проект (Базов)",
        "pkg-standard": "Пълен технически проект (Стандартен)",
        "pkg-full": "Пълен пакет с авторски надзор",

        // Contact page
        "contact-eyebrow": "КОНТАКТИ И РЕЗЕРВАЦИЯ",
        "contact-title": "Нека обсъдим вашия проект или запазим среща.",
        "form-name": "Вашето име",
        "form-email": "Вашият имейл",
        "form-phone": "Телефонен номер",
        "form-message": "Съобщение / Детайли",
        "form-submit": "Изпрати запитване",

        // Catalog page
        "no-projects": "Все още няма добавени проекти.",

        // Footer
        "footer-subtitle": "Дизайн и инженеринг",
        "footer-contacts": "Контакти",
        "footer-address": "София, България",
        "footer-links-title": "Линкове",
        "footer-rights": "&copy; 2026 Academy Architect Studio.<br>Всички права запазени."
    }
};

function setLanguage(lang) {
    localStorage.setItem('siteLang', lang);
    applyTranslations(lang);
}

function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(lang)) {
            btn.classList.add('active');
        }
    });
}

function initLanguage() {
    const savedLang = localStorage.getItem('siteLang') || 'en';
    applyTranslations(savedLang);
}