import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Academy Architect Studio" },
      { name: "description", content: "Get in touch with Academy Architect Studio." },
      { property: "og:title", content: "Contact — Academy Architect Studio" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const { lang } = useI18n();
  return (
    <div className="container-editorial py-20 max-w-3xl">
      <div className="eyebrow">{lang === "bg" ? "Контакт" : "Contact"}</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">
        {lang === "bg" ? "Напишете за проект или адаптация." : "Write about a project or an adaptation."}
      </h1>
      <div className="mt-10 grid gap-8 md:grid-cols-2 text-sm">
        <div>
          <div className="eyebrow mb-2">Email</div>
          <a href="mailto:hello@academyarchitectstudios.com" className="font-display text-xl underline underline-offset-4 decoration-accent">
            hello@academyarchitectstudios.com
          </a>
        </div>
        <div>
          <div className="eyebrow mb-2">{lang === "bg" ? "Студио" : "Studio"}</div>
          <p className="font-display text-xl">Sofia · Plovdiv · Varna</p>
        </div>
      </div>
    </div>
  );
}
