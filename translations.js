const translations = {
    "bg": {
        // Навигация и общи
        "nav-studio": "Academy Architect Studio",
        "nav-home": "Начало",
        "nav-catalog": "Проекти",
        "nav-services": "Услуги",
        "nav-about": "За нас",
        "nav-planner": "AI Планиране",
        "nav-estimator": "Калкулатор",
        "nav-contact": "Контакти",
        "nav-login": "Вход",
        
        // Футър
        "footer-subtitle": "Дизайн и инженеринг",
        "footer-contacts": "Контакти",
        "footer-links-title": "Линкове",
        "footer-rights": "&copy; 2026 Academy Architect Studio.<br>Всички права запазени.",

        // Каталог
        "catalog-title": "Нашите проекти",
        "catalog-desc": "Разгледайте пълното ни портфолио от архитектурни проекти и иновативни решения.",
        "no-projects": "Все още няма добавени проекти.",
        "page-title-catalog": "Проекти - Academy Architect Studio",
        "catalog-main-title": "Проекти и Услуги",
        "catalog-main-desc": "Пълно инженерно проектиране, архитектура, интериор и строителни решения от А до Я.",
        "search-placeholder": "Търсене по номер или име...",
        
        // Филтри в каталог
        "filter-cat-label": "Категория:",
        "cat-all": "Всички",
        "cat-houses": "🏡 Къщи",
        "cat-interior": "🛋️ Интериорен дизайн",
        "cat-public": "🏢 Обществени & Промишлени",
        "cat-reconstruction": "🛠️ Реконструкции & Надстройки",
        "cat-engineering": "📐 Заснемане & КПИИ",
        "filter-sub-label": "Материал / Тип:",
        "sub-all": "Всички видове",
        "sub-wood": "Дървени",
        "sub-stone": "Каменни",
        "sub-concrete": "Бетонни / Масивни",
        "sub-prefab": "Сглобяеми",
        "sub-modern": "Модерни",
        "sub-bulgarian": "Български стил",
        "reset-filters": "Изчисти филтрите",

        // Начална страница
        "hero-eyebrow": "АРХИТЕКТУРНО СТУДИО",
        "hero-title": "Проектираме бъдещето с внимание към детайла",
        "hero-desc": "Създаваме минималистични и функционални пространства, съчетавайки модерни технологии с изчистена архитектура.",
        "hero-btn-browse": "Разгледай проектите",
        "hero-btn-contact": "Свържете се с нас",
        "featured-title": "Избрани проекти",
        "quote-text": "\"Добрата архитектура не просто заема пространство, тя му дава смисъл.\"",
        "quote-sub": "Вярваме, че всеки детайл е от значение при изграждането на перфектния дом или работно пространство.",

        // Страница "За нас"
        "about-eyebrow": "КОИ СМЕ НИЕ",
        "about-title": "Създаваме пространства със смисъл, естетика и дълготрайна стойност.",
        "about-desc1": "Academy Architect Studio обединява съвременния архитектурен дизайн с интелигентно инженерно мислене.",
        "about-desc2": "Работим по разнообразни жилищни, обществени и корпоративни проекти.",
        "about-card1-title": "Иновативен дизайн",
        "about-card1-desc": "Съчетаваме съвременни тенденции в архитектурата с модерен софтуер и AI планиране.",
        "about-card2-title": "Устойчивост",
        "about-card2-desc": "Проектираме с грижа за околната среда, използвайки енергоефективни решения.",
        "about-card3-title": "Индивидуален подход",
        "about-card3-desc": "Всяко пространство се ражда от диалога с нашите клиенти.",
        "about-mission-title": "Нашата мисия",
        "about-vision-title": "Нашето виждане",

        // Контакти
        "contact-eyebrow": "ВРЪЗКА И РЕЗЕРВАЦИЯ",
        "contact-title": "Обсъдете вашия проект или запазете среща.",
        "contact-type-label": "Тип запитване",
        "opt-general": "Общо съобщение",
        "opt-consultation": "Консултация за проект",
        "opt-offer": "Запитване за оферта",
        "contact-name-label": "Вашето име",
        "contact-email-label": "Вашият имейл",
        "contact-phone-label": "Телефонен номер",
        "contact-msg-label": "Съобщение / Детайли",
        "contact-btn-send": "Изпрати запитване",

        // Страница "Услуги"
        "services-eyebrow": "НАШИТЕ УСЛУГИ",
        "services-main-title": "Цялостно проектиране за получаване на разрешение за строеж",
        "services-main-desc": "Проектно студио с водещ екип предлага пълна гама от услуги – от първоначални консултации и предпроектни проучвания, през инвестиционно проектиране, до авторски надзор.",
        "services-stage1-tag": "ЕТАП 1",
        "services-stage1-title": "Консултации и предпроектни проучвания",
        "services-stage1-desc": "Разглеждаме наличната документация и необходимостта от изходни данни. Коментираме фактора терен – наклон, географски посоки и разположение. Изследваме параметрите за застрояване – плътност, височина, максимално РЗП, озеленяване и отстояния от границите.",
        "services-stage2-tag": "ЕТАП 2",
        "services-stage2-title": "Инвестиционно проектиране",
        "services-stage2-desc": "Започва задължително с виза за проектиране, издадена от Общината. След уточняване на идейния проект и 3D визиите спрямо вашите изисквания, се пристъпва директно към техническата фаза за проектиране по всички специалности.",
        "services-req-docs-title": "Необходими документи за започване на проектирането",
        "services-req-concept-title": "/ За започване на Идеен проект /",
        "services-doc-concept-1-title": "Нотариален акт:",
        "services-doc-concept-1-desc": " Документ за собственост на имота.",
        "services-doc-concept-2-title": "Виза за проектиране:",
        "services-doc-concept-2-desc": " Най-важният документ за започване на проектирането и получаване на изходни данни от ЕРП, ВиК и др. Представлява копие от комбинирана скица с нанесени линии на застрояване. Подава се молба в общината, като се носи скица и/или мотивирано предложение от архитект. Отнема от 3 до 14 дни.",
        "services-doc-concept-3-title": "Геодезическо заснемане (тахиметрична снимка):",
        "services-doc-concept-3-desc": " Служи за основа на проектирането. Извършва се от геодезист на място. Обработката отнема до една седмица.",
        "services-doc-concept-3-note": "💡 В екипа си имаме геодезист, чиито услуги можем да ви предложим.",
        "services-req-tech-title": "/ За започване на Технически проект /",
        "services-doc-tech-1-title": "Становище от Електроразпределително дружество:",
        "services-doc-tech-1-desc": " Подава се молба към ЕРП за издаване на становище за присъединяване към мрежата. За еднофамилни жилищни сгради се иска мощност 10-15 kW (най-добре 15 kW).",
        "services-doc-tech-2-title": "Изходни данни от ВиК дружество:",
        "services-doc-tech-2-desc": " Подава се искане до местното ВиК дружество за изходни данни, необходими за изготвяне на ВиК проекта. След изготвянето му, той се съгласува обратно при тях за издаване на становище.",
        "services-specs-title": "Проекти по специалности",
        "services-req-title": "Задължителни проекти за разрешение за строеж (малки жилищни сгради):",
        "services-spec-1": "Част „Архитектурна“",
        "services-spec-2": "Част „Конструктивна“ + Оценка за съответствие (технически контрол)",
        "services-spec-3": "Част „В и К“ – водопровод и канализация",
        "services-spec-4": "Част „Електро“",
        "services-spec-5": "Част „Енергийна ефективност“",
        "services-spec-6": "Част „Оценка за съответствие на част Енергийна ефективност“",
        "services-spec-7": "Част „Геодезическа“ (трасировъчен план и вертикална планировка)",
        "services-opt-title": "Допълнителни проекти (при нужда / изискване):",
        "services-opt-1": "Част „ОВИК“ – отопление, вентилация и климатизация",
        "services-opt-2": "Част „ПБЗ“ – План за безопасност и здраве",
        "services-opt-3": "Част „Паркоустройство и благоустройство“ (при многофамилни сгради)",
        "services-opt-4": "Част „Пожарна безопасност“ (за сгради над 200кв.м)",
        "services-opt-5": "Част „ПУСО“ – Отпадъци (за сгради над 300кв.м)",
        "services-opt-6": "Част „Технологична“ (при промишлени сгради и заведения)",
        "services-note": "* Забележка: В проектите е включена задължителна сметна документация. В цената за проектиране са включени първите 6 задължителни части.",
        "services-docs-title": "Необходими документи за вкарване в Община",
        "services-doc-1": "Копие от нотариален акт",
        "services-doc-2": "Проектната документация",
        "services-doc-3": "Предварителни договори с Електро и ВиК дружествата",
        "services-doc-4": "Виза за проектиране – оригинал",
        "services-extra-title": "Допълнителни услуги",
        "services-extra-1": "Архитектурно заснемане на съществуващи сгради",
        "services-extra-2": "Проекти за надстройки",
        "services-extra-3": "Проекти за основен ремонт на покрив",
        "services-extra-4": "Реконструкции",
        "services-extra-5": "Преустройства"
    },
    "en": {
        // Navigation & General
        "nav-studio": "Academy Architect Studio",
        "nav-home": "Home",
        "nav-catalog": "Projects",
        "nav-services": "Services",
        "nav-about": "About Us",
        "nav-planner": "AI Planner",
        "nav-estimator": "Estimator",
        "nav-contact": "Contacts",
        "nav-login": "Login",
        
        // Footer
        "footer-subtitle": "Design & Engineering",
        "footer-contacts": "Contacts",
        "footer-links-title": "Links",
        "footer-rights": "&copy; 2026 Academy Architect Studio.<br>All rights reserved.",

        // Catalog
        "catalog-title": "Our Projects",
        "catalog-desc": "Explore our full portfolio of architectural designs and innovative solutions.",
        "no-projects": "No projects added yet.",
        "page-title-catalog": "Projects - Academy Architect Studio",
        "catalog-main-title": "Projects & Services",
        "catalog-main-desc": "Full engineering design, architecture, interior, and construction solutions from A to Z.",
        "search-placeholder": "Search by number or name...",
        
        // Filters (English)
        "filter-cat-label": "Category:",
        "cat-all": "All",
        "cat-houses": "🏡 Houses",
        "cat-interior": "🛋️ Interior Design",
        "cat-public": "🏢 Public & Industrial",
        "cat-reconstruction": "🛠️ Reconstructions & Extensions",
        "cat-engineering": "📐 Survey & Engineering",
        "filter-sub-label": "Material / Type:",
        "sub-all": "All types",
        "sub-wood": "Wood",
        "sub-stone": "Stone",
        "sub-concrete": "Concrete / Solid",
        "sub-prefab": "Prefabricated",
        "sub-modern": "Modern",
        "sub-bulgarian": "Bulgarian Style",
        "reset-filters": "Reset Filters",

        // Home
        "hero-eyebrow": "ARCHITECTURAL STUDIO",
        "hero-title": "Designing the future with attention to detail",
        "hero-desc": "We create minimalist and functional spaces, combining modern technologies with clean architecture.",
        "hero-btn-browse": "Browse Projects",
        "hero-btn-contact": "Contact Us",
        "featured-title": "Featured Projects",
        
        // Quote
        "quote-text": "\"Good architecture doesn't just occupy space, it gives it meaning.\"",
        "quote-sub": "We believe that every detail matters when building the perfect home or workspace.",

        // About
        "about-eyebrow": "WHO WE ARE",
        "about-title": "Creating spaces with meaning, aesthetics, and lasting value.",
        "about-desc1": "Academy Architect Studio unites contemporary architectural design with intelligent engineering thinking.",
        "about-desc2": "We work on diverse residential, public, and corporate projects.",
        "about-card1-title": "Innovative Design",
        "about-card1-desc": "We combine modern architectural trends with advanced software and AI planning.",
        "about-card2-title": "Sustainability",
        "about-card2-desc": "We design with care for the environment, using energy-efficient solutions.",
        "about-card3-title": "Individual Approach",
        "about-card3-desc": "Every space is born from a dialogue with our clients.",
        "about-mission-title": "Our Mission",
        "about-vision-title": "Our Vision",
        
        // Contact (English)
        "contact-eyebrow": "CONTACT & BOOKING",
        "contact-title": "Discuss your project or book a meeting.",
        "contact-type-label": "Inquiry Type",
        "opt-general": "General Inquiry",
        "opt-consultation": "Project Consultation",
        "opt-offer": "Request a Quote",
        "contact-name-label": "Your Name",
        "contact-email-label": "Your Email",
        "contact-phone-label": "Phone Number",
        "contact-msg-label": "Message / Details",
        "contact-btn-send": "Send Inquiry",

        // Services (English)
        "services-eyebrow": "OUR SERVICES",
        "services-main-title": "Comprehensive Design for Obtaining a Building Permit",
        "services-main-desc": "A design studio with a leading team offers a full range of services – from initial consultations and pre-project studies, through investment design, to author's supervision.",
        "services-stage1-tag": "STAGE 1",
        "services-stage1-title": "Consultations and Pre-project Studies",
        "services-stage1-desc": "We review available documentation and the need for initial data. We discuss the terrain factor – slope, geographic directions, and layout. We study building parameters – density, height, maximum GFA, landscaping, and border setbacks.",
        "services-stage2-tag": "STAGE 2",
        "services-stage2-title": "Investment Design",
        "services-stage2-desc": "This necessarily begins with a design visa issued by the Municipality. After clarifying the conceptual design and 3D visualizations according to your requirements, we proceed directly to the technical design phase for all engineering specialties.",
        "services-req-docs-title": "Required Documents to Start Design",
        "services-req-concept-title": "/ To Start a Conceptual Design /",
        "services-doc-concept-1-title": "Title Deed:",
        "services-doc-concept-1-desc": " Property ownership document.",
        "services-doc-concept-2-title": "Design Visa:",
        "services-doc-concept-2-desc": " The most important document to start designing and obtaining initial data from power and water utilities. It represents a copy of a combined sketch with marked building lines. An application is submitted to the municipality along with a sketch and/or a motivated proposal from an architect. Takes 3 to 14 days.",
        "services-doc-concept-3-title": "Geodetic Survey (Tachymetric Survey):",
        "services-doc-concept-3-desc": " Serves as the basis for design. Performed on-site by a surveyor. Processing takes up to one week.",
        "services-doc-concept-3-note": "💡 We have an in-house surveyor whose services we can offer you.",
        "services-req-tech-title": "/ To Start a Technical Design /",
        "services-doc-tech-1-title": "Opinion from Power Distribution Company:",
        "services-doc-tech-1-desc": " An application is submitted to the power company for a grid connection opinion. For single-family residential buildings, a capacity of 10-15 kW is requested (preferably 15 kW).",
        "services-doc-tech-2-title": "Initial Data from Water and Sewerage Company:",
        "services-doc-tech-2-desc": " A request is submitted to the local water utility for initial data required to prepare the water and sewage design. After preparation, it is coordinated back with them to issue an opinion.",
        "services-specs-title": "Specialty Designs",
        "services-req-title": "Mandatory Designs for Building Permit (Small Residential Buildings):",
        "services-spec-1": "„Architectural“ Part",
        "services-spec-2": "„Structural“ Part + Compliance Assessment (Technical Control)",
        "services-spec-3": "„Water and Sewerage“ Part – Plumbing and Drainage",
        "services-spec-4": "„Electrical“ Part",
        "services-spec-5": "„Energy Efficiency“ Part",
        "services-spec-6": "„Energy Efficiency Compliance Assessment“ Part",
        "services-spec-7": "„Geodesy“ Part (Tracing Plan and Vertical Planning)",
        "services-opt-title": "Additional Designs (If Needed / Required):",
        "services-opt-1": "„HVAC“ Part – Heating, Ventilation, and Air Conditioning",
        "services-opt-2": "„HSE“ Part – Health and Safety Plan",
        "services-opt-3": "„Park Design and Landscaping“ (for multi-family buildings)",
        "services-opt-4": "„Fire Safety“ (for buildings over 200 sq.m)",
        "services-opt-5": "„Waste Management“ (for buildings over 300 sq.m)",
        "services-opt-6": "„Technological“ Part (for industrial buildings and catering venues)",
        "services-note": "* Note: Mandatory cost estimation documentation is included in the designs. The first 6 mandatory parts are included in the design price.",
        "services-docs-title": "Required Documents for Municipality Submission",
        "services-doc-1": "Copy of title deed",
        "services-doc-2": "Project documentation",
        "services-doc-3": "Preliminary contracts with power and water utilities",
        "services-doc-4": "Design visa – original",
        "services-extra-title": "Additional Services",
        "services-extra-1": "Architectural survey of existing buildings",
        "services-extra-2": "Extension designs",
        "services-extra-3": "Roof major renovation designs",
        "services-extra-4": "Reconstructions",
        "services-extra-5": "Alterations"
    }
};

function setLanguage(lang) {
    localStorage.setItem('siteLang', lang);
    
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'OPTION') {
                element.textContent = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    document.querySelectorAll('[data-placeholder-key]').forEach(element => {
        const key = element.getAttribute('data-placeholder-key');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-value-key]').forEach(element => {
        const key = element.getAttribute('data-value-key');
        if (translations[lang] && translations[lang][key]) {
            element.value = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-title-key]').forEach(element => {
        const key = element.getAttribute('data-title-key');
        if (translations[lang] && translations[lang][key]) {
            element.title = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    if (lang === 'en' && document.getElementById('btn-en')) document.getElementById('btn-en').classList.add('active');
    if (lang === 'bg' && document.getElementById('btn-bg')) document.getElementById('btn-bg').classList.add('active');

    if (typeof filterProjects === 'function') {
        filterProjects();
    }

    loadAdminContacts();
}

function loadAdminContacts() {
    const savedContact = localStorage.getItem('siteContact') || localStorage.getItem('contactInfo') || localStorage.getItem('contacts');
    if (savedContact) {
        try {
            const data = JSON.parse(savedContact);
            const address = data.address || data.loc || data.location;
            const email = data.email || data.mail;
            const phone = data.phone || data.tel;

            if (address && document.getElementById('footAddress')) {
                document.getElementById('footAddress').textContent = address;
            }
            if (email) {
                if (document.getElementById('footEmail')) document.getElementById('footEmail').textContent = email;
                if (document.getElementById('footEmailLink')) document.getElementById('footEmailLink').href = 'mailto:' + email;
            }
            if (phone && document.getElementById('footPhone')) {
                document.getElementById('footPhone').textContent = phone;
            }
        } catch (e) {
            console.error('Грешка при зареждане на контактите', e);
        }
    }
}

function initLanguage() {
    const savedLang = localStorage.getItem('siteLang') || 'bg';
    setLanguage(savedLang);
}

document.addEventListener("DOMContentLoaded", () => {
    initLanguage();
    loadAdminContacts();
});