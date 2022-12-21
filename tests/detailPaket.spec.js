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

test.describe.parallel("Lihat Detail Paket", async () => {
    test("[APL38] Menampilkan detail paket", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/paket`);
        await page
            .locator(
                "#tablePaket > tbody > tr:nth-child(1) > td:nth-child(5) > a.badge.badge-info.btn-show"
            )
            .click();
        await expect(page.getByRole("cell", { name: "Nama" })).toBeTruthy();
    });
});
