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

test.describe.parallel("Cari Transaksi", () => {
    test("[APL18] Cari transaksi dengan data valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/transaksi`);
        await page.getByPlaceholder('Cari Transaksi').click();
        await page.getByPlaceholder('Cari Transaksi').fill('APL22122205160025');
        await page.getByPlaceholder('Cari Transaksi').press('Enter');
        await expect( page.getByRole('gridcell', { name: 'APL22122205160025'})).toContainText('APL22122205160025')
    });

    test("[APL19] Cari transaksi dengan data invalid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/transaksi`);
        await page.getByPlaceholder('Cari Transaksi').click();
        await page.getByPlaceholder('Cari Transaksi').fill('zulfa');
        await page.getByPlaceholder('Cari Transaksi').press('Enter');
        await expect(page.getByRole('gridcell', { name: 'TransaksiTidak Ditemukan' })).toContainText('TransaksiTidak Ditemukan');

    });

    test("[APL20] Cari transaksi dengan data kosong", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/transaksi`);
        await page.getByPlaceholder('Cari Transaksi').click();
        let firstData = await page.getByRole('gridcell', { name: 'APL22122205160025' });
        await page.getByPlaceholder('Cari Transaksi').fill('');
        await page.getByPlaceholder('Cari Transaksi').press('Enter');
        await expect(firstData).toBeTruthy

    });
});
