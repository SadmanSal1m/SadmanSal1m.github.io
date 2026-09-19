import { defineConfig, devices } from "@playwright/test";

/** E2E suite. Run locally with:
 *    pnpm build && pnpm test:e2e
 *  (Browsers: `pnpm exec playwright install chromium` once.)
 *  Not runnable in restricted CI sandboxes without browser downloads. */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  retries: 0,
  use: { baseURL: "http://localhost:3000" },
  webServer: {
    command: "pnpm start",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
