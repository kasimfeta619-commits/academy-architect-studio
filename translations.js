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
        
        /* За нас (About) преводи */
        "about-title": "За нашето студио",
        "about-subtitle": "Иновации и минимализъм в архитектурата",
        "about-text-1": "Academy Architect Studio е създадено с идеята да превърне съвременните концепции за пространство в реалност. Ние вярваме, че добрата архитектура променя начина, по който хората живеят и работят.",
        "about-text-2": "Нашият екип от професионалисти съчетава дългогодишен опит с модерни технологии, за да предложи индивидуални решения за всеки клиент.",

        /* Контакти (Contact) преводи */
        "contact-title": "Свържете се с нас",
        "contact-subtitle": "Нека обсъдим вашия следващ проект",
        "form-name": "Вашето име",
        "form-email": "Вашият имейл",
        "form-message": "Вашето съобщение",
        "form-submit": "Изпрати съобщение"
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
        
        /* About translations */
        "about-title": "About Our Studio",
        "about-subtitle": "Innovation and minimalism in architecture",
        "about-text-1": "Academy Architect Studio was founded with the vision to turn modern space concepts into reality. We believe that good architecture transforms the way people live and work.",
        "about-text-2": "Our team of professionals combines years of experience with modern technologies to deliver tailored solutions for every client.",

        /* Contact translations */
        "contact-title": "Get in Touch",
        "contact-subtitle": "Let's discuss your next project",
        "form-name": "Your Name",
        "form-email": "Your Email",
        "form-message": "Your Message",
        "form-submit": "Send Message"
    }
};

function setLanguage(lang) {
    localStorage.setItem('siteLang', lang);
    applyTranslations(lang);
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
    const savedLang = localStorage.getItem('siteLang') || 'en';
    document.documentElement.lang = savedLang;
    applyTranslations(savedLang);
}