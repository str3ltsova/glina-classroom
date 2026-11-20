// Первая проба: меняйте только текст title или число seatsLeft.
export type Workshop = { id: string; title: string; time: string; seatsLeft: number };
export const workshops: Workshop[] = [
  { id: "cup", title: "Кружка ручной лепки", time: "20 ноября, 18:00", seatsLeft: 3 },
  { id: "glaze", title: "Ангобы и глазури для начинающих", time: "21 ноября, 12:00", seatsLeft: 0 },
  { id: "plate", title: "Тарелка с растительным оттиском", time: "22 ноября, 15:00", seatsLeft: 2 },
];
export type DemoState = "success" | "loading" | "empty" | "error";
// Неизвестное, пустое и повторённое значение → success.
export function parseDemoState(value: string | string[] | undefined): DemoState {
  if (value === "loading" || value === "empty" || value === "error") return value;
  return "success";
}
