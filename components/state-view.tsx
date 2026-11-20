import Link from "next/link";
import type { ReactNode } from "react";
import type { DemoState } from "@/lib/workshops";
import { Button } from "@/components/ui/button";
import { RetryDemoButton } from "@/components/retry-demo-button";

export function StateView({ state, route, children }: { state: DemoState; route: "schedule" | "bookings"; children: ReactNode }) {
  const schedule = route === "schedule";
  if (state === "success") return children;
  if (state === "loading") return (
    <section aria-label={schedule ? "Загрузка расписания" : "Загрузка записей"} className="space-y-6">
      <p role="status" className="text-muted-foreground">{schedule ? "Загружаем расписание…" : "Загружаем ваши записи…"}</p>
      <div aria-hidden="true" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: schedule ? 3 : 2 }, (_, i) => (
          <div key={i} data-skeleton className="space-y-4 rounded-card border border-border bg-card p-6">
            <div className="h-6 w-3/4 rounded-control bg-muted" /><div className="h-4 w-1/2 rounded-control bg-muted" /><div className="h-6 w-2/3 rounded-control bg-muted" />
          </div>
        ))}
      </div>
    </section>
  );
  return (
    <section className="max-w-xl space-y-4 py-6" aria-label={state === "error" ? "Ошибка загрузки" : "Пустой список"}>
      <h2 className="text-card-title font-bold">
        {state === "error" ? (schedule ? "Не удалось загрузить расписание" : "Не удалось загрузить ваши записи") : (schedule ? "В расписании пока нет занятий" : "У вас пока нет записей")}
      </h2>
      <p className="text-muted-foreground">
        {state === "error" ? "Не получилось получить данные. Попробуйте ещё раз." : (schedule ? "Сейчас показан пустой учебный список. Можно вернуться к примеру с занятиями." : "Откройте расписание и посмотрите ближайшие занятия.")}
      </p>
      {state === "error" ? <RetryDemoButton href={`/${route}?state=success`} /> : (
        <Button asChild><Link href="/schedule?state=success">{schedule ? "Посмотреть пример расписания" : "К расписанию"}</Link></Button>
      )}
      {state === "error" && <p className="text-caption text-muted-foreground">Учебный повтор откроет готовый успешный пример.</p>}
    </section>
  );
}
