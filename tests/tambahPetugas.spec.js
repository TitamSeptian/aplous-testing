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

test.describe.parallel("Tambah Petugas", () => {
	test("[APL66] Tambah Petugas dengan data Valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
        await page.getByRole('link', { name: ' Pengguna' }).click();
        await page.locator('#sidebarnav').getByRole('link', { name: 'Petugas' }).click();
        await page.getByRole('link', { name: 'Tambah' }).click();
        await page.locator('#nama').click();
        await page.locator('#nama').fill('Ujang');
        await page.locator('#select2-outlet-container').click();
        await page.getByText('Jalan Siliwangi 27 RT 07 RW 18 Kelurahan Kalijati Kecamatan Bumi Indah Kota Band').click();
        await page.locator('#username').click();
        await page.locator('#username').fill('ujang1234');
        await page.locator('input[name="password"]').click();
        await page.locator('input[name="password"]').fill('ujang123');
        await page.locator('input[name="password"]').press('Tab');
        await page.locator('input[name="password_confirmation"]').fill('ujang123');
        await page.getByRole('button', { name: 'Tambah' }).click();
        await expect(page.getByText('Ujang Berhasil Ditambahkan')).toContainText('Ujang Berhasil Ditambahkan');
        await page.getByRole('button', { name: 'OK' }).click();
	});

    test("[APL67] Tambah Petugas dengan Field Kosong", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
        await page.getByRole('link', { name: ' Pengguna' }).click();
        await page.locator('#sidebarnav').getByRole('link', { name: 'Petugas' }).click();
        await page.getByRole('link', { name: 'Tambah' }).click();
        await page.getByRole('button', { name: 'Tambah' }).click();
        await page.locator('#select2-outlet-container').click();
        await page.getByText('Toko Aplous Pusat').click();
        await page.getByRole('button', { name: 'Tambah' }).click();
        await expect(page.getByText('Nama Harus di isi')).toContainText('Nama Harus di isi')
        await expect(page.getByText('Username Harus Diisi')).toContainText('Username Harus Diisi')
        await expect(page.getByText('Password Harus Diisi')).toContainText('Password Harus Diisi')
          
	});

    test("[APL68] Tambah Petugas dengan Invalid Input ", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
	});

	
});
