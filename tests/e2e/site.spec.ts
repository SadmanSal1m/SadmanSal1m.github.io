import { expect, test } from "@playwright/test";

const routes = [
  ["/", "Mobile products"],
  ["/work/dentxpert", "DentXpert"],
  ["/work/naqiverse", "NaqiVerse"],
  ["/work/aimara", "AIMARA"],
  ["/work/grocs", "Grocs"],
  ["/about", "whole products"],
  ["/resume", "Md Salim Sadman Taseen"],
] as const;

for (const [path, needle] of routes) {
  test(`route ${path} renders its h1`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toContainText(needle, { ignoreCase: true });
  });
}

test("unknown work slug returns the 404 station", async ({ page }) => {
  const res = await page.goto("/work/nope");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("station");
});

test("skip link is first focus and jumps to main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.locator(".skip-link");
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("header navigation reaches About", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "About" }).click();
  } else {
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }).click();
  }
  await expect(page).toHaveURL(/\/about$/);
});

test("hire CTA is honest while no Fiverr URL exists", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByRole("link", { name: /hire me/i }).first();
  await expect(cta).toHaveAttribute("href", /^mailto:sadmantaseen1030@gmail\.com/);
});
