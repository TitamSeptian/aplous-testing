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

test.describe.parallel("Delete pengeluaran", async () => {
    test("[APL92] Delete pengeluaran", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengeluaran`);
        await page
            .locator(
                "#tablePengeluaran > tbody > tr:nth-child(1) > td:nth-child(5) > a.badge.badge-danger.btn-delete"
            )
            .click();
        await page.getByRole("button", { name: "Ya, Buang !" }).click();
        await expect(page.locator("#swal2-content")).toContainText(
            " Berhasil Dibuang"
        );
    });

    test("[APL93] Cancel Delete pengeluaran", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengeluaran`);
        await page
            .locator(
                "#tablePengeluaran > tbody > tr:nth-child(1) > td:nth-child(5) > a.badge.badge-danger.btn-delete"
            )
            .click();
        await page.getByRole("button", { name: "Batal" }).click();
        await expect(
            page.locator(
                "#tablePengeluaran > tbody > tr:nth-child(1) > td:nth-child(2)"
            )
        ).toBeTruthy();
    });
});
