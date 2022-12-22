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

test.describe.parallel("Delete Petugas", () => {
    test("[APL72] Delete Petugas", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengguna/user`);
        await page
            .locator(
                "#tableUser > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-danger.btn-delete"
            )
            .click();
        await page.getByRole("button", { name: "Ya, Buang !" }).click();
        await expect(
            page.getByRole("heading", { name: "Peringatan !" })
        ).toBeTruthy();
    });

    test("[APL73] Cancel Delete Petugas", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengguna/user`);
        await page
            .locator(
                "#tableUser > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-danger.btn-delete"
            )
            .click();
        await page.getByRole("button", { name: "Batal" }).click();
        await expect(
            page.locator(
                "#tableUser > tbody > tr:nth-child(1) > td:nth-child(3)"
            )
        ).toBeTruthy();
    });
});
