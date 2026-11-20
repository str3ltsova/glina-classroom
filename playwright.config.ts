import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: "http://127.0.0.1:3100", browserName: "chromium", trace: "retain-on-failure" },
  webServer: {
    command: "npm run start -- --port 3100",
    url: "http://127.0.0.1:3100/schedule",
    reuseExistingServer: false,
    timeout: 60000,
  },
});
