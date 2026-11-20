import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
export function PageShell({ route, children }: { route: "schedule" | "bookings"; children: ReactNode }) {
  const schedule = route === "schedule";
  return <div className="flex min-h-screen flex-col">
    <a href="#main" className="skip-link">К содержимому</a>
    <SiteHeader active={`/${route}`} />
    <main id="main" className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-4">
        <p className="text-caption uppercase tracking-wide text-muted-foreground">{schedule ? "Керамическая мастерская" : "Ваши занятия"}</p>
        <h1 className="text-title font-bold tracking-tight">{schedule ? "Расписание мастерской" : "Мои записи"}</h1>
        <p className="text-body text-muted-foreground">{schedule ? "Выберите время для работы с глиной." : "Занятия и статус вашей записи."}</p>
      </div>
      {children}
    </main>
    <footer className="mx-auto w-full max-w-7xl px-4 py-6 text-caption text-muted-foreground md:px-6">Учебный пример · данные вымышлены · запись и оплата не выполняются</footer>
  </div>;
}
