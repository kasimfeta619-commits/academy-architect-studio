import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "bg";

type Dict = Record<string, { en: string; bg: string }>;

const dict: Dict = {
  "nav.home": { en: "Home", bg: "Начало" },
  "nav.catalog": { en: "Catalog", bg: "Каталог" },
  "nav.about": { en: "About", bg: "За нас" },
  "nav.contact": { en: "Contact", bg: "Контакт" },
  "nav.planner": { en: "AI Planner", bg: "ИИ Планер" },

  "planner.title": { en: "AI Planner", bg: "ИИ Планер" },
  "planner.subtitle": { en: "Sketch your layout, generate a 3D preview.", bg: "Скицирайте плана, генерирайте 3D преглед." },
  "planner.canvas": { en: "2D Sketch", bg: "2D Скица" },
  "planner.preview3d": { en: "3D Preview", bg: "3D Преглед" },
  "planner.generate": { en: "Generate 3D Preview with AI", bg: "Генерирай 3D с ИИ" },
  "planner.generating": { en: "AI is designing your home…", bg: "ИИ проектира вашия дом…" },
  "planner.clear": { en: "Clear canvas", bg: "Изчисти" },
  "planner.style": { en: "Style", bg: "Стил" },
  "planner.material": { en: "Materials", bg: "Материали" },
  "planner.floors": { en: "Floors", bg: "Етажи" },
  "planner.hint": { en: "Click and drag to draw walls. Drag on the 3D view to rotate.", bg: "Кликнете и влачете, за да чертаете стени. Влачете 3D изгледа, за да въртите." },
  "nav.admin": { en: "Admin", bg: "Админ" },
  "nav.signin": { en: "Sign in", bg: "Вход" },
  "nav.signout": { en: "Sign out", bg: "Изход" },

  "brand.tagline": { en: "Architectural Design Studio", bg: "Архитектурно студио" },

  "hero.eyebrow": { en: "House Projects · Est. 2026", bg: "Проекти за къщи · Осн. 2026" },
  "hero.title": { en: "Homes drawn with intention.", bg: "Домове, начертани с намерение." },
  "hero.subtitle": {
    en: "Academy Architect Studio is a personal catalog of residential house projects — plans, visualizations, and specifications for every square meter.",
    bg: "Academy Architect Studio е личен каталог с проекти за къщи — планове, визуализации и спецификации до последния квадратен метър.",
  },
  "hero.cta": { en: "Browse the catalog", bg: "Разгледай каталога" },
  "hero.secondary": { en: "About the studio", bg: "За студиото" },

  "catalog.title": { en: "House Project Catalog", bg: "Каталог с проекти за къщи" },
  "catalog.subtitle": {
    en: "Filter by area, floors, bedrooms and style.",
    bg: "Филтрирай по площ, етажи, спални и стил.",
  },
  "filter.area": { en: "Area (m²)", bg: "Площ (м²)" },
  "filter.floors": { en: "Floors", bg: "Етажи" },
  "filter.bedrooms": { en: "Bedrooms", bg: "Спални" },
  "filter.style": { en: "Style", bg: "Стил" },
  "filter.any": { en: "Any", bg: "Всички" },
  "filter.reset": { en: "Reset filters", bg: "Изчисти филтрите" },
  "catalog.empty": { en: "No projects match your filters yet.", bg: "Няма проекти по избраните филтри." },
  "catalog.count": { en: "projects", bg: "проекта" },

  "project.area": { en: "Total area", bg: "Обща площ" },
  "project.floors": { en: "Floors", bg: "Етажи" },
  "project.bedrooms": { en: "Bedrooms", bg: "Спални" },
  "project.bathrooms": { en: "Bathrooms", bg: "Бани" },
  "project.garages": { en: "Garage spaces", bg: "Гаражни места" },
  "project.material": { en: "Material", bg: "Материал" },
  "project.style": { en: "Style", bg: "Стил" },
  "project.price": { en: "Price", bg: "Цена" },
  "project.gallery": { en: "Gallery", bg: "Галерия" },
  "project.plans": { en: "Floor plans", bg: "Планове по етажи" },
  "project.viz": { en: "3D visualizations", bg: "3D визуализации" },
  "project.video": { en: "Video walkthrough", bg: "Видео обиколка" },
  "project.back": { en: "← Back to catalog", bg: "← Назад към каталога" },
  "project.type": { en: "Project type", bg: "Тип проект" },
  "type.single_house": { en: "Single House", bg: "Еднофамилна къща" },
  "type.complex": { en: "Complex", bg: "Комплекс" },
  "type.public_building": { en: "Public Building", bg: "Обществена сграда" },
  "filter.type": { en: "Type", bg: "Тип" },

  "admin.title": { en: "Studio administration", bg: "Администрация" },
  "admin.new": { en: "New project", bg: "Нов проект" },
  "admin.edit": { en: "Edit", bg: "Редактирай" },
  "admin.delete": { en: "Delete", bg: "Изтрий" },
  "admin.publish": { en: "Publish", bg: "Публикувай" },
  "admin.save": { en: "Save project", bg: "Запази проекта" },
  "admin.uploading": { en: "Uploading…", bg: "Качване…" },
  "admin.saved": { en: "Project saved.", bg: "Проектът е запазен." },

  "auth.title": { en: "Studio access", bg: "Достъп до студиото" },
  "auth.subtitle": {
    en: "Sign in to publish new projects. The first account created becomes the studio admin.",
    bg: "Влезте, за да публикувате проекти. Първият регистриран акаунт става администратор.",
  },
  "auth.email": { en: "Email", bg: "Имейл" },
  "auth.password": { en: "Password", bg: "Парола" },
  "auth.signin": { en: "Sign in", bg: "Вход" },
  "auth.signup": { en: "Create account", bg: "Регистрация" },
  "auth.google": { en: "Continue with Google", bg: "Вход с Google" },
  "auth.toggleTo.signup": { en: "New here? Create an account", bg: "Нов? Регистрирайте се" },
  "auth.toggleTo.signin": { en: "Already have an account? Sign in", bg: "Вече имате акаунт? Влезте" },

  "footer.rights": { en: "All rights reserved.", bg: "Всички права запазени." },
};

type I18nCtx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };
const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("aas-lang") : null;
    if (stored === "en" || stored === "bg") setLangState(stored);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("aas-lang", l);
  };
  const t = (key: string) => dict[key]?.[lang] ?? key;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
