import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Academy Architect Studio" },
      { name: "description", content: "About Academy Architect Studio — a personal architectural design practice." },
      { property: "og:title", content: "About — Academy Architect Studio" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const { lang } = useI18n();
  return (
    <div className="container-editorial py-20 max-w-3xl">
      <div className="eyebrow">{lang === "bg" ? "За студиото" : "About"}</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">
        {lang === "bg" ? "Личен архив на архитектурни проекти." : "A personal archive of architectural work."}
      </h1>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          {lang === "bg"
            ? "Academy Architect Studio е авторски каталог с проекти за къщи. Всеки проект е разработван с внимание към пропорции, светлина и материал — от идейната скица до подробния план на всеки етаж."
            : "Academy Architect Studio is an author-run catalog of residential house projects. Each project is developed with attention to proportion, light and material — from initial sketch to a detailed drawing of every floor."}
        </p>
        <p>
          {lang === "bg"
            ? "Тук качвам собствените си работи. Всеки проект е готов за адаптация към конкретен парцел, климат и бюджет."
            : "This is where I publish my own work. Every project is ready for adaptation to a specific plot, climate and budget."}
        </p>
      </div>
    </div>
  );
}
