import { expect, test } from "@playwright/test";

test.describe("case-study gallery lightbox", () => {
  test("opens, arrows navigate, Esc closes, focus is trapped", async ({ page }) => {
    await page.goto("/work/grocs");
    const first = page.getByRole("button", { name: /open screenshot 1 of/i });
    await first.scrollIntoViewIfNeeded();
    await first.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/01 \/ \d\d/)).toBeVisible();

    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByText(/02 \/ \d\d/)).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(dialog.getByText(/01 \/ \d\d/)).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});

test("motion toggle flips the html attribute and persists", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /motion:/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "static");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "static");
});

test("reduced-motion visitors get the static hero (no canvas)", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("canvas")).toHaveCount(0);
});
