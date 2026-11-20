import { describe, expect, it } from "vitest";
import { parseDemoState } from "../lib/workshops";
describe("учебный адрес состояния", () => {
  it.each(["success", "loading", "empty", "error"] as const)("принимает %s", state => expect(parseDemoState(state)).toBe(state));
  it.each([undefined, "", "unexpected", ["error", "empty"], ["loading"]])("неоднозначное значение %j даёт success", value => expect(parseDemoState(value)).toBe("success"));
});
