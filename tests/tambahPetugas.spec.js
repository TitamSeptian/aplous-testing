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
    nama: "Iman Nurahman",
    peran: "Kasir",
    outlet: "toko aplous cabang 2",
    username: "imannruohamn" + Math.floor(Math.random() * 1000),
    password: "123qwe123",
    confirmPassword: "123qwe123",
    invalid: {
        nama: "a",
    },
};

test.describe.parallel("Tambah Petugas", () => {
    test("[APL66] Tambah Petugas dengan data Valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
        await page.getByRole("link", { name: " Pengguna" }).click();
        await page
            .locator("#sidebarnav")
            .getByRole("link", { name: "Petugas" })
            .click();
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator("#nama").fill(testData.nama);
        await page.locator("#select2-outlet-container").click();
        await page
            .getByText(
                "Jalan Siliwangi 27 RT 07 RW 18 Kelurahan Kalijati Kecamatan Bumi Indah Kota Band"
            )
            .click();
        await page.locator("#username").fill(testData.username);
        await page.locator('input[name="password"]').fill(testData.password);
        await page
            .locator('input[name="password_confirmation"]')
            .fill(testData.confirmPassword);
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(
            page.getByText(`${testData.name} Berhasil Ditambahkan`)
        ).toBeTruthy();
    });

    test("[APL67] Tambah Petugas dengan Field Kosong", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
        await page.getByRole("link", { name: " Pengguna" }).click();
        await page
            .locator("#sidebarnav")
            .getByRole("link", { name: "Petugas" })
            .click();
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.getByRole("button", { name: "Tambah" }).click();
        await page.locator("#select2-outlet-container").click();
        await page.getByText("Toko Aplous Pusat").click();
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(page.getByText("Nama Harus di isi")).toContainText(
            "Nama Harus di isi"
        );
        await expect(page.getByText("Username Harus Diisi")).toContainText(
            "Username Harus Diisi"
        );
        await expect(page.getByText("Password Harus Diisi")).toContainText(
            "Password Harus Diisi"
        );
    });

    test("[APL68] Tambah Petugas dengan Invalid Input ", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
        await page.getByRole("link", { name: " Pengguna" }).click();
        await page
            .locator("#sidebarnav")
            .getByRole("link", { name: "Petugas" })
            .click();
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.getByRole("button", { name: "Tambah" }).click();
        await page.locator("#select2-outlet-container").click();
        await page.getByText("Toko Aplous Pusat").click();
        await page.locator("#nama").fill(testData.invalid.nama);
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(page.getByText("Nama Minimal 2 karakter")).toContainText(
            "Nama Minimal 2 karakter"
        );
        await expect(page.getByText("Username Harus Diisi")).toContainText(
            "Username Harus Diisi"
        );
        await expect(page.getByText("Password Harus Diisi")).toContainText(
            "Password Harus Diisi"
        );
    });
});
