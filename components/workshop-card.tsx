import type { Workshop } from "@/lib/workshops";

// Один шаблон используется для разных занятий и на обоих экранах.
export function WorkshopCard({ workshop, statusLabel }: { workshop: Workshop; statusLabel?: string }) {
  return (
    <article className="min-w-0 space-y-4 rounded-lg border border-border bg-card p-4 text-card-foreground">
      <h2 className="text-lg font-bold wrap-break-word">{workshop.title}</h2>
      <p className="text-caption text-muted-foreground">{workshop.time}</p>
      <p className={`text-body ${statusLabel ? "font-semibold text-primary" : workshop.seatsLeft === 0 ? "font-semibold text-muted-foreground" : ""}`}>
        {statusLabel ?? (workshop.seatsLeft > 0 ? `Свободных мест: ${workshop.seatsLeft}` : "Мест нет")}
      </p>
    </article>
  );
}
