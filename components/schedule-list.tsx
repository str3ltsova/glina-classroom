"use client";
import { useState } from "react";
import type { Workshop } from "@/lib/workshops";
import { WorkshopCard } from "@/components/workshop-card";
import { Button } from "@/components/ui/button";

export function ScheduleList({ items }: { items: Workshop[] }) {
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const visible = onlyAvailable ? items.filter(item => item.seatsLeft > 0) : items;
  return (
    <section aria-label="Занятия" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-body">
          <input type="checkbox" className="size-5 accent-primary" checked={onlyAvailable}
            onChange={event => setOnlyAvailable(event.target.checked)} />
          Только со свободными местами
        </label>
        <p role="status" className="text-caption text-muted-foreground">Найдено занятий: {visible.length}</p>
      </div>
      {visible.length === 0 ? (
        <div className="space-y-4 py-6">
          <h2 className="text-card-title font-bold">По этому фильтру занятий нет</h2>
          <p>Сбросьте фильтр, чтобы увидеть все занятия.</p>
          <Button type="button" onClick={() => setOnlyAvailable(false)}>Сбросить фильтр</Button>
        </div>
      ) : (
        // Практика ручной правки: gap-4 → gap-6. Остальные классы не меняйте.
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map(workshop => <li key={workshop.id} className="min-w-0"><WorkshopCard workshop={workshop} /></li>)}
        </ul>
      )}
    </section>
  );
}
