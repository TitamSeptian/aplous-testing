const { test, expect } = require("@playwright/test");
require("dotenv").config();
test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL);
    await page.getByPlaceholder("Nama Pengguna").click();
    await page.getByPlaceholder("Nama Pengguna").fill("admin");
    await page.getByPlaceholder("Kata Sandi").fill("123qwe123");
    await page.getByPlaceholder("Kata Sandi").press("Enter");
    await page.waitForTimeout(2000);
});
test.describe.parallel("Logout", async () => {
    test("[APL06] Logout dengan menekan tombol logout", async ({ page }) => {
        await page
            .locator(
                "#navbarSupportedContent > ul.navbar-nav.float-right > li > a"
            )
            .click();
        await page.locator("#logout-btn").click();
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(`${process.env.BASE_URL}/`);
    });
});
