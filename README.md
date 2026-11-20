# Керамика — учебная копия

Начните с [инструкции для первого открытия кода](docs/first-steps.md). Уже работают расписание, фильтр и четыре состояния. Цвета пока нейтральные. Второго экрана и DESIGN.md ещё нет: создадим их в практиках 5–6. Образец правил — DESIGN.example.md.

В терминале папки с package.json:

```text
npm ci
npm run dev
```

Windows: используйте npm.cmd вместо npm, если PowerShell блокирует npm.ps1. Откройте http://127.0.0.1:3000/schedule. Ждите Ready, терминал не закрывайте. Остановить Ctrl+C. Если выбран другой порт — замените 3000 на номер из Local.

| Экран | Состояние | Адрес |
|---|---|---|
| Расписание | success | http://127.0.0.1:3000/schedule?state=success |
| Расписание | loading | http://127.0.0.1:3000/schedule?state=loading |
| Расписание | empty | http://127.0.0.1:3000/schedule?state=empty |
| Расписание | error | http://127.0.0.1:3000/schedule?state=error |

После практики 6 добавьте четыре строки /bookings с state success/loading/empty/error и проверьте их. Пока /bookings даёт страницу «Такой страницы пока нет» — это ожидаемо.

[Шесть практик](docs/exercises.md) · [Продукт](PRODUCT.md) · [Образец правил](DESIGN.example.md) · [Решения](DECISIONS.md)

Перед сохранением: npm run lint, npm run typecheck, npm test. Последняя команда проверяет разбор учебных состояний, без запуска браузера. Для полной проверки расписания: npm run build, npx playwright install chromium, npm run test:e2e. После второго экрана — npm run build и npm run test:final. Порт тестов 3100 должен быть свободен. Скриншоты сохраняются в docs/screens. В Windows npx.cmd вместо npx при блокировке PowerShell.

Не сдавайте эту заготовку как выполненную личную КТ. Нужны ваши изменения, правила, отдельный ручной коммит, второй экран после правил и собственные проверки. Как сохранить версию в Git — в инструкции первого открытия.
