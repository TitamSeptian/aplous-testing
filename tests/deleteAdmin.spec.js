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


test.describe.parallel("Delete Admin", async () => {
    test("[APL83] Delete Admin", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengguna/admin`); 
        await page.locator("#tableAdmin > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-danger.btn-delete").click();
        await page.getByRole('button', { name: 'Ya, Buang !' }).click();
        await expect(page.getByText('User Sedang Login')).toContainText('User Sedang Login');
        await page.getByRole('button', { name: 'OK' }).click();
       
    });

    test("[APL84] Cancel Delete Admin ", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengguna/admin`);
        await page.locator("#tableAdmin > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-danger.btn-delete").click();
        await page.getByRole('button', { name: 'Batal' }).click();
    });

    test("[APL85] Delete Admin yang sedang melakukan transaksi", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengguna/admin`);
        await page.locator("#tableAdmin > tbody > tr:nth-child(2) > td:nth-child(4) > a.badge.badge-danger.btn-delete").click();
      await page.getByRole('button', { name: 'Ya, Buang !' }).click();
      await expect( page.getByRole('heading', { name: 'Peringatan !' })).toBeTruthy();
      await page.getByRole('button', { name: 'OK' }).click();
    });
   
});
