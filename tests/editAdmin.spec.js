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
    nama: "Admin 2",
    username: "admin" + Math.floor(Math.random() * 1000),
    password: "123qwe123",
    confirmPassword: "123qwe123",
    invalid: {
        nama: "b",
        username: "b",
        password: "pwd",
        confirmPassword: "pwd",
    },
};

test.describe.parallel("Add Admin", async () => {
    // test("[APL75] Tambah Admin valid", async ({ page }) => {
    //     await page.goto(`${process.env.BASE_URL}/pengguna/admin`);
    //     await page.getByRole("link", { name: "Tambah" }).click();
    //     await page.locator("#nama").fill(testData.nama);
    //     await page.locator("#username").fill(testData.username);
    //     await page.locator('input[name="password"]').fill(testData.password);
    //     await expect(
    //         page.getByText(`${testData.name} Berhasil Ditambahkan`)
    //     ).toBeTruthy();
    // });
    // test("[APL76] Tambah Admin dengan field kosong", async ({ page }) => {
    //     await page.goto(`${process.env.BASE_URL}/pengguna/admin`);
    //     await page.getByRole("link", { name: "Tambah" }).click();
    //     await page.getByRole("button", { name: "Tambah" }).click();
    //     await expect(page.getByText("Nama harus diisi")).toBeTruthy();
    //     await expect(page.getByText("Username harus diisi")).toBeTruthy();
    //     await expect(page.getByText("Password harus diisi")).toBeTruthy();
    // });
    // test("[APL77] Tambah Admin dengan invalid input", async ({ page }) => {
    //     await page.goto(`${process.env.BASE_URL}/pengguna/admin`);
    //     await page.getByRole("link", { name: "Tambah" }).click();
    //     await page.locator("#nama").fill(testData.invalid.nama);
    //     await page.locator("#username").fill(testData.invalid.username);
    //     await page
    //         .locator('input[name="password"]')
    //         .fill(testData.invalid.password);
    //     await page
    //         .locator('input[name="password_confirmation"]')
    //         .fill(testData.invalid.password);
    //     await page.getByRole("button", { name: "Tambah" }).click();
    //     await expect(page.getByText("Nama minimal 2 karakter")).toBeTruthy();
    //     await expect(
    //         page.getByText("Username minimal 2 karakter")
    //     ).toBeTruthy();
    //     await expect(page.getByText("Username Sudah Ada")).toBeTruthy();
    // });
    // test("[APL78] Tambah Admin dengan beda password", async ({ page }) => {
    //     await page.goto(`${process.env.BASE_URL}/pengguna/admin`);
    //     await page.getByRole("link", { name: "Tambah" }).click();
    //     await page.locator("#nama").fill(testData.invalid.nama);
    //     await page.locator("#username").fill(testData.invalid.username);
    //     await page
    //         .locator('input[name="password"]')
    //         .fill(testData.invalid.password);
    //     await page
    //         .locator('input[name="password_confirmation"]')
    //         .fill(testData.invalid.confirmPassword + "123");
    //     await page.getByRole("button", { name: "Tambah" }).click();
    //     await expect(page.getByText("Password tidak Cocok")).toBeTruthy();
    // });
});
