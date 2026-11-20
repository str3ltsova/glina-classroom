import Link from "next/link";

const navigation = [
  { href: "/schedule", label: "Расписание" },
];
export function SiteHeader({ active }: { active: string }) {
  return <header className="mx-auto w-full max-w-7xl border-b border-border px-4 py-6 md:px-6">
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <Link href="/schedule" aria-label="Керамика — расписание" className="self-start text-title font-bold tracking-tight text-primary">керамика</Link>
      <nav aria-label="Основная навигация" className="flex flex-wrap gap-2">
        {navigation.map(item => <Link key={item.href} href={item.href} aria-current={active === item.href ? "page" : undefined}
          className={`inline-flex min-h-11 items-center rounded-control px-4 py-2 text-body ${active === item.href ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted"}`}>{item.label}</Link>)}
      </nav>
    </div>
  </header>;
}
