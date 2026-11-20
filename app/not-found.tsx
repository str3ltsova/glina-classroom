import Link from "next/link";
export default function NotFound() {
  return <main className="mx-auto max-w-xl space-y-6 px-4 py-12">
    <h1 className="text-title font-bold">Такой страницы пока нет</h1>
    <p>Проверьте адрес или вернитесь к расписанию.</p>
    <Link className="inline-flex min-h-11 items-center text-primary underline" href="/schedule">К расписанию</Link>
  </main>;
}
