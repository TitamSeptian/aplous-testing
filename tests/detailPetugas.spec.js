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

test.describe.parallel("Lihat Detail Petugas", () => {
    test("[APL74] Menampilkan detail Petugas", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengguna/user`);
        await page
            .locator(
                "#tableUser > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-info.btn-show"
            )
            .click();
        await expect(page.getByRole("cell", { name: "Nama" })).toBeTruthy();
    });
});
