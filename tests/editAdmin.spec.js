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

test.describe.parallel("Update Admin", async () => {
    test("[APL79] Edit Admin valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengguna/admin`);
       await page.locator( `#tableAdmin > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-warning.btn-edit`).click();
       await page.locator('#nama').click();
       await page.locator('#nama').fill('Ubah Admin');
       await page.getByRole('button', { name: 'Ubah' }).click();
       await expect(page.getByText('Berhasil merubah admin')).toContainText('Berhasil merubah admin');
       await page.getByRole('button', { name: 'OK' }).click();
    });

    test("[APL80] Tambah Admin dengan field kosong", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengguna/admin`);
        await page.getByRole('row', { name: '2 asd aasd  Edit  Buang' }).getByRole('link', { name: ' Edit' }).click();
        await page.locator('#nama').click();
        await page.locator('#nama').fill('');
        await page.locator('#username').click();
        await page.locator('#username').fill('');
        await page.getByRole('button', { name: 'Ubah' }).click();
        await expect(page.getByText('Nama Harus di isi')).toContainText("Nama Harus di isi");
        await expect(page.getByText('Username Harus Diisi')).toContainText("Username Harus Diisi");
    });

    test("[APL81] Tambah Admin dengan invalid input", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengguna/admin`);
        await page.getByRole('row', { name: '2 asd aasd  Edit  Buang' }).getByRole('link', { name: ' Edit' }).click();
        await page.locator('#nama').click();
        await page.locator('#nama').fill('a');
        await page.locator('#username').click();
        await page.locator('#username').fill('a');
        await page.getByRole('button', { name: 'Ubah' }).click();
        await expect(page.getByText('Nama Minimal 2 karakter')).toContainText("Nama Minimal 2 karakter");
    });

    test("[APL82] Tambah Admin dengan beda password", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengguna/admin`);
        await page.getByRole('row', { name: '2 asd aasd  Edit  Buang' }).getByRole('link', { name: ' Edit' }).click();
        await page.locator('input[name="password"]').click();
        await page.locator('input[name="password"]').fill('admin123');
        await page.locator('input[name="password_confirmation"]').click();
        await page.locator('input[name="password_confirmation"]').fill('123admin');
        await page.getByRole('button', { name: 'Ubah' }).click();
        await expect(page.getByText('Password tidak Cocok')).toContainText("Password tidak Cocok");
    });
});
