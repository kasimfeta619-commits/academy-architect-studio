const translations = {
    bg: {
        "nav-studio": "Студио",
        "nav-home": "Начало",
        "nav-catalog": "Проекти",
        "nav-about": "За нас",
        "nav-planner": "ИИ Планер",
        "nav-contact": "Контакти",
        "nav-login": "Вход",
        "hero-eyebrow": "Архитектурно Студио",
        "hero-title": "Проектираме бъдещето с внимание към детайла",
        "hero-desc": "Създаваме минималистични и функционални пространства, съчетавайки съвременните технологии с изчистената архитектура.",
        "btn-browse": "Разгледай проектите",
        "btn-contact": "Свържи се с нас",
        "badge-title": "LATEST",
        "badge-sub": "Проект \"Минимализъм\"",
        "section-featured": "Избрани проекти",
        "quote-text": "\"Добрата архитектура не просто заема пространство, тя го осмисля.\"",
        "quote-sub": "Вярваме, че всеки детайл има значение при изграждането на перфектния дом или работно пространство, за да създадем среда, която вдъхновява всеки ден.",
        "footer-subtitle": "Проектиране и дизайн",
        "footer-contacts": "Контакти",
        "footer-address": "София, България",
        "footer-links-title": "Линкове",
        "footer-rights": "&copy; 2026 Academy Architect Studio.<br>Всички права запазени.",
        "no-projects": "Все още няма добавени проекти.",
        "catalog-title": "Нашите Проекти",
        "about-title": "За нашето студио",
        "contact-title": "Свържете се с нас"
    },
    en: {
        "nav-studio": "Studio",
        "nav-home": "Home",
        "nav-catalog": "Projects",
        "nav-about": "About Us",
        "nav-planner": "AI Planner",
        "nav-contact": "Contacts",
        "nav-login": "Login",
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
        "catalog-title": "Our Projects",
        "about-title": "About Our Studio",
        "contact-title": "Get in Touch"
    }
};

function setLanguage(lang) {
    localStorage.setItem('siteLang', lang);
    applyTranslations(lang);
    // Презареждаме страницата, за да се обновят динамочните карти (проекти) спрямо новия език
    window.location.reload();
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
        if (btn.textContent.toLowerCase() === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function initLanguage() {
    const savedLang = localStorage.getItem('siteLang') || 'bg';
    applyTranslations(savedLang);
}