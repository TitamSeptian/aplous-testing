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
    nama: "Iman Nurahmanss",
    peran: "Kasir",
    username: "imannruohamn" + Math.floor(Math.random() * 1000),
    password: "123qwe123",
    confirmPassword: "123qwe123",
    invalid: {
        nama: "a",
    },
};
test.describe.parallel("Edit Petugas", () => {
    test("[APL69] Edit Petugas dengan Data Valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
        await page.getByRole("link", { name: " Pengguna" }).click();
        await page
            .locator("#sidebarnav")
            .getByRole("link", { name: "Petugas" })
            .click();
        await page
            .locator(
                "#tableUser > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.locator("#nama").fill(testData.nama);
        await page.locator("#select2-outlet-container").click();
        await page
            .getByText(
                "Jalan Siliwangi 27 RT 07 RW 18 Kelurahan Kalijati Kecamatan Bumi Indah Kota Band"
            )
            .click();
        await page.locator("#username").fill(testData.username);
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(
            page.getByText(`${testData.name} Berhasil Dirubah`)
        ).toBeTruthy();
    });

    test("[APL70] Edit Petugas dengan Field Kosong", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
        await page.getByRole("link", { name: " Pengguna" }).click();
        await page
            .locator("#sidebarnav")
            .getByRole("link", { name: "Petugas" })
            .click();
        await page
            .locator(
                "#tableUser > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.locator("#nama").fill("");
        await page.locator("#username").fill("");
        await page.locator('input[name="password"]').fill("");
        await page.locator('input[name="password_confirmation"]').fill("");
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(page.getByText("Nama Harus di isi")).toContainText(
            "Nama Harus di isi"
        );
        await expect(page.getByText("Username Harus Diisi")).toContainText(
            "Username Harus Diisi"
        );
    });

    test("[APL71] Edit Petugas dengan Invalid Input ", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
        await page.getByRole("link", { name: " Pengguna" }).click();
        await page
            .locator("#sidebarnav")
            .getByRole("link", { name: "Petugas" })
            .click();
        await page
            .locator(
                "#tableUser > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.locator("#nama").fill(testData.invalid.nama);
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(page.getByText("Nama Minimal 2 karakter")).toContainText(
            "Nama Minimal 2 karakter"
        );
    });
});
