const translations = {
    "bg": {
        // Съществуващи преводи...
        "nav-home": "Начало",
        "nav-catalog": "Проекти",
        "nav-about": "За нас",
        "nav-planner": "AI Планиране",
        "nav-estimator": "Клкулатор",
        "nav-contact": "Контакти",
        "nav-login": "Вход",
        "catalog-title": "Нашите проекти",
        "catalog-desc": "Разгледайте пълното ни портфолио от архитектурни проекти и иновативни решения.",
        "no-projects": "Все още няма добавени проекти.",
        
        // Новите административни ключове за 'bg':
        "admin-page-title": "Админ панел | Academy Architect Studio",
        "admin-logout": "🚪 Изход",
        "admin-back-home": "← Назад към началната страница",
        "admin-eyebrow": "УПРАВЛЕНИЕ НА САЙТА",
        "admin-title": "Админ Панел",
        "admin-tab-about": "📄 За нас",
        "admin-tab-contact": "📞 Контакти",
        "admin-tab-new": "➕ Нов проект",
        "admin-tab-projects": "🗂️ Проекти",
        "admin-tab-bookings": "📅 Резервации",
        "admin-about-heading": "Редакция на страница \"За нас\"",
        "admin-label-title": "Заглавие",
        "admin-label-desc": "Основен текст / Описание",
        "admin-btn-save-about": "Запази промените \"За нас\"",
        "admin-contact-heading": "Редакция на страница \"Контакти\"",
        "admin-label-address": "Адрес на студиото",
        "admin-label-email": "Имейл адрес",
        "admin-label-phone": "Телефонен номер",
        "admin-btn-save-contact": "Запази промените \"Контакти\"",
        "admin-upload-heading": "Качване на нов проект",
        "admin-proj-title": "Име на проекта *",
        "admin-proj-maincat": "Главна категория *",
        "admin-proj-subcat": "Подкатегория (Тип разработка) *",
        "admin-proj-desc": "Описание",
        "admin-proj-area": "Площ (м²)",
        "admin-proj-floors": "Етажи",
        "admin-proj-beds": "Спални",
        "admin-proj-baths": "Бани",
        "admin-proj-material": "Материал / Конструкция",
        "admin-proj-style": "Стил",
        "admin-proj-price": "Цена (лв.)",
        "admin-proj-mainimg": "Главна снимка",
        "admin-proj-plans": "Разпределения / Планове (множество етажи)",
        "admin-proj-facades": "Фасади (може да изберете няколко)",
        "admin-proj-section": "Разрез",
        "admin-proj-gallery": "Допълнителни визуализации",
        "admin-proj-fav": "Фаворитен проект (на началната страница)",
        "admin-btn-save-proj": "Запази проекта в каталога",
        "admin-btn-cancel": "Отказ",
        "admin-existing-projects": "Съществуващи проекти",
        "admin-existing-bookings": "Запазени консултации"
    },
    "en": {
        // Съществуващи преводи...
        "nav-home": "Home",
        "nav-catalog": "Projects",
        "nav-about": "About Us",
        "nav-planner": "AI Planner",
        "nav-estimator": "Estimator",
        "nav-contact": "Contacts",
        "nav-login": "Login",
        "catalog-title": "Our Projects",
        "catalog-desc": "Explore our full portfolio of architectural designs and innovative solutions.",
        "no-projects": "No projects added yet.",

        // Новите административни ключове за 'en':
        "admin-page-title": "Admin Panel | Academy Architect Studio",
        "admin-logout": "🚪 Logout",
        "admin-back-home": "← Back to Home",
        "admin-eyebrow": "SITE MANAGEMENT",
        "admin-title": "Admin Panel",
        "admin-tab-about": "📄 About Us",
        "admin-tab-contact": "📞 Contacts",
        "admin-tab-new": "➕ New Project",
        "admin-tab-projects": "🗂️ Projects",
        "admin-tab-bookings": "📅 Bookings",
        "admin-about-heading": "Edit \"About Us\" Page",
        "admin-label-title": "Title",
        "admin-label-desc": "Main Text / Description",
        "admin-btn-save-about": "Save \"About Us\" Changes",
        "admin-contact-heading": "Edit \"Contacts\" Page",
        "admin-label-address": "Studio Address",
        "admin-label-email": "Email Address",
        "admin-label-phone": "Phone Number",
        "admin-btn-save-contact": "Save \"Contacts\" Changes",
        "admin-upload-heading": "Upload New Project",
        "admin-proj-title": "Project Name *",
        "admin-proj-maincat": "Main Category *",
        "admin-proj-subcat": "Subcategory (Type) *",
        "admin-proj-desc": "Description",
        "admin-proj-area": "Area (m²)",
        "admin-proj-floors": "Floors",
        "admin-proj-beds": "Bedrooms",
        "admin-proj-baths": "Bathrooms",
        "admin-proj-material": "Material / Structure",
        "admin-proj-style": "Style",
        "admin-proj-price": "Price (BGN)",
        "admin-proj-mainimg": "Main Image",
        "admin-proj-plans": "Floor Plans / Layouts (multiple floors)",
        "admin-proj-facades": "Facades (multiple selection)",
        "admin-proj-section": "Section",
        "admin-proj-gallery": "Additional Visualizations",
        "admin-proj-fav": "Favorite Project (on Home page)",
        "admin-btn-save-proj": "Save Project to Catalog",
        "admin-btn-cancel": "Cancel",
        "admin-existing-projects": "Existing Projects",
        "admin-existing-bookings": "Saved Consultations"
    }
};

// Функция за смяна на езика (ако липсва във вашия файл)
function setLanguage(lang) {
    localStorage.setItem('siteLang', lang);
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Актуализиране на активните бутони за език
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    if (lang === 'en' && document.getElementById('btn-en')) document.getElementById('btn-en').classList.add('active');
    if (lang === 'bg' && document.getElementById('btn-bg')) document.getElementById('btn-bg').classList.add('active');
}

function initLanguage() {
    const savedLang = localStorage.getItem('siteLang') || 'bg';
    setLanguage(savedLang);
}