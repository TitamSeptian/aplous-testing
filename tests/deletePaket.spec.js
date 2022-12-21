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

test.describe.parallel("Delete Paket", async () => {
    test("[APL35] Delete Paket", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/paket`);
        await page
            .locator(
                "#tablePaket > tbody > tr:nth-child(1) > td:nth-child(5) > a.badge.badge-danger.btn-delete"
            )
            .click();
        await page.getByRole("button", { name: "Ya, Buang !" }).click();
        await expect(page.locator("#swal2-content")).toContainText(
            " Berhasil Dibuang"
        );
    });

    test("[APL36] Cancel Delete Paket", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/paket`);
        await page
            .locator(
                "#tablePaket > tbody > tr:nth-child(1) > td:nth-child(5) > a.badge.badge-danger.btn-delete"
            )
            .click();
        await page.getByRole("button", { name: "Batal" }).click();
        await expect(
            page.locator(
                "#tablePaket > tbody > tr:nth-child(1) > td:nth-child(2)"
            )
        ).toBeTruthy();
    });

    test("[APL35] Delete Paket yang sedang digunakan", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/paket`);
        await page
            .locator(
                "#tablePaket > tbody > tr:nth-child(1) > td:nth-child(5) > a.badge.badge-danger.btn-delete"
            )
            .click();
        await page.getByRole("button", { name: "Ya, Buang !" }).click();
        await expect(page.locator("#swal2-content")).toContainText(
            "  Paket digunakan terdapat pada transaksi"
        );
    });
});
