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

const testData = {
    nama: "Jenis Test",
    keterangan: "Keterangan",
    updateData: "Jenis Test Update",
};

test.describe.parallel("Jenis", () => {
    test("Membuat jenis baru data valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/jenis`);
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.waitForTimeout(2000);
        await page.locator("#nama").fill(testData.nama);
        await page.locator("#ket").fill(testData.keterangan);
        await page.locator("#nama").press("Enter");
        await page.waitForTimeout(2000);
        await expect(page.locator("#swal2-content")).toContainText(
            " Berhasil Ditambahkan"
        );
    });
    // membuat jenis baru data tidak valid

    test("Mengubah jenis data valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/jenis`);
        await page
            .locator(
                "#tableJenis > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.waitForTimeout(2000);
        await page.locator("#nama").fill(testData.updateData);
        await page.locator("#ket").fill(testData.keterangan);
        await page.locator("#nama").press("Enter");
        await page.waitForTimeout(2000);
        await expect(page.locator("#swal2-content")).toBeTruthy();
    });

    test("Menghapus data", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/jenis`);
        await page
            .locator(
                "#tableJenis > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-danger.btn-delete"
            )
            .click();
        await page.waitForTimeout(1000);
        await page
            .locator(
                "body > div.swal2-container.swal2-center.swal2-fade.swal2-shown > div > div.swal2-actions > button.swal2-confirm.swal2-styled"
            )
            .click();
        await expect(page.locator("#swal2-content")).toContainText(
            " Berhasil dihapus"
        );
    });
});
