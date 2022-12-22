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

test.describe.parallel("Transaksi", () => {
	test("[APL07] Tambah paket dengan menggunakan data valid", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByRole("link", { name: "Tambah" }).click();
		await page.locator("#select2-outlet-container").click();
		await page.getByText("Toko Aplous Pusat").click();
		await page.getByPlaceholder("Pilih Paket").click();
		await page.getByLabel("Search:").click();
		await page.getByLabel("Search:").fill("Bed");
		await page.getByRole("link", { name: "Pilih" }).click();
		await page.getByPlaceholder("Quantitas").click();
		await page.getByPlaceholder("Quantitas").fill("2");
		await page.getByRole("button", { name: "Tambah" }).click();
		await page.locator("td:nth-child(4)").click();
		await expect(page.locator('input[name="nama_paket\\[\\]"]')).toBeTruthy();
	});

	test("[APL08] Tambah paket dengan menggunakan data invalid", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByRole("link", { name: "Tambah" }).click();
		await page.getByText("Cari Toko").click();
		await page.getByText("Toko Aplous Pusat").click();
		await page.getByPlaceholder("Pilih Paket").click();
		await page.getByLabel("Search:").click();
		await page.getByLabel("Search:").fill("Bed");
		await page.getByRole("link", { name: "Pilih" }).click();
		await page.getByPlaceholder("Quantitas").click();
		await page.getByPlaceholder("Quantitas").fill("dua");
		await page.getByRole("button", { name: "Tambah" }).click();

		await expect(page.locator('input[name="harga\\[\\]"]')).toHaveValue("NaN");
	});

	test("[APL09] Tambah paket dengan menggunakan data kosong", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByRole("link", { name: "Tambah" }).click();
		await page.getByRole("button", { name: "Tambah" }).click();
		await expect(page.getByText("Pilih Paket")).toContainText("Pilih Paket");
		await page.getByRole("button", { name: "OK" }).click();
	});

    test("[APL10] Tambah transaksi dengan menggunakan tanggal estimasi selesai invalid", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator('#select2-outlet-container').click();
        await page.getByText('Toko Aplous Pusat').click();
        await page.getByPlaceholder('Pilih Paket').click();
        await page.getByRole('row', { name: 'Bed Cover 30000 Pilih' }).getByRole('link', { name: 'Pilih' }).click();
        await page.getByPlaceholder('Quantitas').click();
        await page.getByPlaceholder('Quantitas').fill('20');
        await page.getByRole('button', { name: 'Tambah' }).click();
        await page.locator('#tgl_selesai').fill('2022-12-07');
        await page.getByText('Cari Pelanggan').click();
        await page.getByText('08123456744').click();
        await page.getByPlaceholder('Diskon').click();
        await page.getByPlaceholder('Diskon').fill('10');
        await page.getByPlaceholder('Diskon').click();
        await page.getByPlaceholder('Biaya Tambahan').click();
        await page.getByPlaceholder('Biaya Tambahan').fill('0');
        await page.getByRole('button', { name: 'Pesan' }).click();
        await expect(page.getByText('Estimasi tanggal estimasi selesai tidak boleh kurang dari tanggal sekarang')).toContainText('Estimasi tanggal estimasi selesai tidak boleh kurang dari tanggal sekarang');
        await page.getByRole('button', { name: 'OK' }).click();
    
	});

    test("[APL11] Tambah transaksi keseluruhan dengan menggunakan total diskon invalid", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator('#select2-outlet-container').click();
        await page.getByText('Toko Aplous Pusat').click();
        await page.getByPlaceholder('Pilih Paket').click();
        await page.getByRole('row', { name: 'Bed Cover 30000 Pilih' }).getByRole('link', { name: 'Pilih' }).click();
        await page.getByPlaceholder('Quantitas').click();
        await page.getByPlaceholder('Quantitas').fill('20');
        await page.getByRole('button', { name: 'Tambah' }).click();
        await page.locator('#tgl_selesai').fill('2022-12-25');
        await page.getByText('Cari Pelanggan').click();
        await page.getByText('08123456744').click();
        await page.getByPlaceholder('Biaya Tambahan').click();
        await page.getByPlaceholder('Biaya Tambahan').fill('0');
        await page.getByPlaceholder('Diskon').click();
        await page.getByPlaceholder('Diskon').fill('abcd');
        await page.getByRole('button', { name: 'Pesan' }).click();
        await expect(page.getByText('Diskon hanya diisi angka')).toContainText('Diskon hanya diisi angka');
	});


    test("[APL12] Tambah transaksi dengan menggunakan total biaya tambahan  invalid", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator('#select2-outlet-container').click();
        await page.getByText('Toko Aplous Pusat').click();
        await page.getByPlaceholder('Pilih Paket').click();
        await page.getByRole('row', { name: 'Bed Cover 30000 Pilih' }).getByRole('link', { name: 'Pilih' }).click();
        await page.getByPlaceholder('Quantitas').click();
        await page.getByPlaceholder('Quantitas').fill('20');
        await page.getByRole('button', { name: 'Tambah' }).click();
        await page.locator('#tgl_selesai').fill('2022-12-25');
        await page.getByText('Cari Pelanggan').click();
        await page.getByText('08123456744').click();
        await page.getByPlaceholder('Diskon').click();
        await page.getByPlaceholder('Diskon').fill('10');
        await page.getByPlaceholder('Biaya Tambahan').click();
        await page.getByPlaceholder('Biaya Tambahan').fill('abcd');
        await page.getByRole('button', { name: 'Pesan' }).click();
        await expect(page.getByText('Biaya Tambah hanya diisi angka')).toContainText('Biaya Tambah hanya diisi angka');
	});

    test("[APL13] Tambah transaksi dengan menggunakan total biaya tambahan  invalid", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByRole("link", { name: "Tambah" }).click();
		await page.locator("#tgl_selesai").fill("2022-12-07");
		await page.getByText("Cari Pelanggan").click();
		await page.getByText("08123456744").click();
		await page.getByPlaceholder("Diskon").click();
		await page.getByPlaceholder("Diskon").fill("10");
		await page.getByPlaceholder("Biaya Tambahan").click();
		await page.getByPlaceholder("Biaya Tambahan").fill("0");
		await page.getByRole("button", { name: "Pesan" }).click();
        await expect(page.getByText('Tidak Ada Paket')).toContainText('Tidak Ada Paket');
        await page.getByRole('button', { name: 'OK' }).click();
	});

    test("[APL14] Tambah transaksi dengan menggunakan total diskon kosong", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator('#select2-outlet-container').click();
        await page.getByText('Toko Aplous Pusat').click();
        await page.getByPlaceholder('Pilih Paket').click();
        await page.getByRole('row', { name: 'Bed Cover 30000 Pilih' }).getByRole('link', { name: 'Pilih' }).click();
        await page.getByPlaceholder('Quantitas').click();
        await page.getByPlaceholder('Quantitas').fill('20');
        await page.getByRole('button', { name: 'Tambah' }).click();
		await page.locator("#tgl_selesai").fill("2022-12-25");
		await page.getByText("Cari Pelanggan").click();
		await page.getByText("08123456744").click();
		await page.getByPlaceholder("Biaya Tambahan").click();
		await page.getByPlaceholder("Biaya Tambahan").fill("0");
        const [page2] = await Promise.all([
          page.waitForEvent('popup'),
          page.getByRole('button', { name: 'Pesan' }).click()
        ]);
        
        await expect(page2).toHaveTitle('Kwitansi');
	});

    test("[APL15] Tambah transaksi dengan menggunakan total biaya tambahan kosong", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator('#select2-outlet-container').click();
        await page.getByText('Toko Aplous Pusat').click();
        await page.getByPlaceholder('Pilih Paket').click();
        await page.getByRole('row', { name: 'Bed Cover 30000 Pilih' }).getByRole('link', { name: 'Pilih' }).click();
        await page.getByPlaceholder('Quantitas').click();
        await page.getByPlaceholder('Quantitas').fill('20');
        await page.getByRole('button', { name: 'Tambah' }).click();
		await page.locator("#tgl_selesai").fill("2022-12-25");
		await page.getByText("Cari Pelanggan").click();
		await page.getByText("08123456744").click();
        await page.getByPlaceholder('Diskon').click();
        await page.getByPlaceholder('Diskon').fill('10');
        const [page2] = await Promise.all([
          page.waitForEvent('popup'),
          page.getByRole('button', { name: 'Pesan' }).click()
        ]);
        
        await expect(page2).toHaveTitle('Kwitansi');
	});

    test("[APL16] Tambah transaksi dengan menggunakan data pelanggan kosong", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator('#select2-outlet-container').click();
        await page.getByText('Toko Aplous Pusat').click();
        await page.getByPlaceholder('Pilih Paket').click();
        await page.getByRole('row', { name: 'Bed Cover 30000 Pilih' }).getByRole('link', { name: 'Pilih' }).click();
        await page.getByPlaceholder('Quantitas').click();
        await page.getByPlaceholder('Quantitas').fill('20');
        await page.getByRole('button', { name: 'Tambah' }).click();
		await page.locator("#tgl_selesai").fill("2022-12-25");
        await page.getByPlaceholder('Diskon').click();
        await page.getByPlaceholder('Diskon').fill('10');
        await page.getByPlaceholder('Biaya Tambahan').click();
        await page.getByPlaceholder('Biaya Tambahan').fill('10');
        await page.getByRole('button', { name: 'Pesan' }).click();
        await expect(page.getByRole('dialog', { name: 'Aduh !' }).getByText('Pilih Pelanggan')).toContainText('Pilih Pelanggan');
        await page.getByRole('button', { name: 'OK' }).click();
	});

    test("[APL17] Tambah transaksi dengan menggunakan data pelanggan kosong", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator('#select2-outlet-container').click();
        await page.getByText('Toko Aplous Pusat').click();
        await page.getByPlaceholder('Pilih Paket').click();
        await page.getByRole('row', { name: 'Bed Cover 30000 Pilih' }).getByRole('link', { name: 'Pilih' }).click();
        await page.getByPlaceholder('Quantitas').click();
        await page.getByPlaceholder('Quantitas').fill('20');
        await page.getByRole('button', { name: 'Tambah' }).click();
		await page.locator("#tgl_selesai").fill("2022-12-25");
        await page.getByPlaceholder('Diskon').click();
        await page.getByPlaceholder('Diskon').fill('10');
        await page.getByPlaceholder('Biaya Tambahan').click();
        await page.getByPlaceholder('Biaya Tambahan').fill('10');
        await page.getByText("Cari Pelanggan").click();
		await page.getByText("08123456744").click();
        
        const [page2] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('button', { name: 'Pesan' }).click()
          ]);
          
          await expect(page2).toHaveTitle('Kwitansi');

	});
});
