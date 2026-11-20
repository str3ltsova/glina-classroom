import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

const runtimeErrors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  runtimeErrors.set(page, errors);
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error") errors.push(message.text());
  });
});
test.afterEach(async ({ page }) => { expect(runtimeErrors.get(page)).toEqual([]); });

test("schedule: три занятия, фильтр оставляет два, сброс возвращает три", async ({ page }) => {
  await page.goto("/schedule");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Расписание мастерской");
  await expect(page.getByRole("article")).toHaveCount(3);
  await page.getByRole("checkbox", { name: "Только со свободными местами" }).check();
  await expect(page.getByRole("article")).toHaveCount(2);
  await expect(page.getByRole("status")).toHaveText("Найдено занятий: 2");
  await expect(page.getByText("Ангобы и глазури для начинающих")).toHaveCount(0);
  await page.getByRole("checkbox").uncheck();
  await expect(page.getByRole("article")).toHaveCount(3);
});

for (const route of ["schedule", "bookings"]) {
  test(`${route}: кнопка и ссылка доступны с клавиатуры, контур 3px и высота 44px`, async ({ page }) => {
    for (const key of ["Enter", "Space"]) {
      await page.goto(`/${route}?state=error`);
      const retry = page.getByRole("button", { name: "Повторить" });
      for (let i = 0; i < 12 && !(await retry.evaluate(n => n === document.activeElement)); i++) await page.keyboard.press("Tab");
      await expect(retry).toBeFocused();
      expect(await retry.evaluate(n => getComputedStyle(n).outlineWidth)).toBe("3px");
      expect((await retry.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      await page.keyboard.press(key);
      await expect(page).toHaveURL(new RegExp(`/${route}\\?state=success$`));
      await expect(page.getByRole("article")).toHaveCount(route === "schedule" ? 3 : 2);
    }
    await page.goto(`/${route}?state=empty`);
    const link = page.getByRole("link", { name: route === "schedule" ? "Посмотреть пример расписания" : "К расписанию", exact: true });
    for (let i = 0; i < 12 && !(await link.evaluate(n => n === document.activeElement)); i++) await page.keyboard.press("Tab");
    await expect(link).toBeFocused();
    expect(await link.evaluate(n => getComputedStyle(n).outlineWidth)).toBe("3px");
    expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await page.keyboard.press("Enter");
    await expect(page.getByRole("article")).toHaveCount(3);
  });
  for (const state of ["success", "loading", "empty", "error"]) {
    test(`${route}: ${state} по прямому адресу и после обновления`, async ({ page }) => {
      await page.goto(`/${route}?state=${state}`);
      for (let visit = 0; visit < 2; visit++) {
        if (visit) await page.reload();
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        if (state === "success") await expect(page.getByRole("article")).toHaveCount(route === "schedule" ? 3 : 2);
        if (state === "loading") {
          await expect(page.getByRole("status")).toContainText("Загружаем");
          await expect(page.locator('[data-skeleton]')).toHaveCount(route === "schedule" ? 3 : 2);
        }
        if (state === "empty") await expect(page.getByRole("heading", { level: 2 })).toContainText(route === "schedule" ? "пока нет занятий" : "пока нет записей");
        if (state === "error") await expect(page.getByRole("heading", { level: 2 })).toContainText("Не удалось загрузить");
      }
      if (state === "error") {
        await page.getByRole("button", { name: "Повторить" }).click();
        await expect(page).toHaveURL(new RegExp(`/${route}\\?state=success$`));
        await expect(page.getByRole("article")).toHaveCount(route === "schedule" ? 3 : 2);
      }
      if (state === "empty") {
        await page.getByRole("link", { name: route === "schedule" ? "Посмотреть пример расписания" : "К расписанию", exact: true }).click();
        await expect(page.getByRole("article")).toHaveCount(3);
      }
    });
  }
  for (const query of ["", "?state=unexpected", "?state=error&state=empty", "?state="]) {
    test(`${route}: безопасное состояние для ${query || "отсутствующего параметра"}`, async ({ page }) => {
      await page.goto(`/${route}${query}`);
      await expect(page.getByRole("article")).toHaveCount(route === "schedule" ? 3 : 2);
    });
  }
}

test("записи показывают статус вместо количества мест, навигация работает", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/schedule$/);
  await page.getByRole("navigation").getByRole("link", { name: "Мои записи" }).click();
  await expect(page.getByRole("article")).toHaveCount(2);
  await expect(page.getByRole("article").first()).toContainText("Запись подтверждена");
  await expect(page.getByRole("article").last()).toContainText("Ожидает подтверждения");
  await expect(page.getByRole("article").filter({ hasText: "Свободных мест" })).toHaveCount(0);
});

test("schedule: галочка доступна с клавиатуры, фокус виден, область не меньше 44 px", async ({ page }) => {
  await page.goto("/schedule");
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    if (await page.getByRole("checkbox").evaluate(n => n === document.activeElement)) break;
  }
  await expect(page.getByRole("checkbox")).toBeFocused();
  const outline = await page.getByRole("checkbox").evaluate(n => getComputedStyle(n).outlineWidth);
  expect(outline).toBe("3px");
  await page.keyboard.press("Space");
  await expect(page.getByRole("article")).toHaveCount(2);
  const box = await page.getByText("Только со свободными местами").boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(44);
});

for (const width of [375, 768, 1440]) {
  for (const route of ["schedule", "bookings"]) {
    for (const state of route === "schedule" || width === 375 ? ["success", "loading", "empty", "error"] : ["success"]) {
      test(`матрица ${route}-${state}-${width}: адаптив, accessibility и скриншот`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(`/${route}?state=${state}`);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        expect(overflow).toBe(false);
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        expect(results.violations).toEqual([]);
        await mkdir("docs/screens", { recursive: true });
        await page.screenshot({ path: `docs/screens/${route}-${state}-${width}.png`, fullPage: true });
      });
    }
  }
}
