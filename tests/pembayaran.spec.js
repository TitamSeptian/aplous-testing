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

test.describe.parallel("Pembayaran", () => {
	test("[APL21] Bayar tagihan sesuai dengan nominal", async ({ page }) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByPlaceholder("Cari Transaksi").click();
		await page.getByPlaceholder("Cari Transaksi").fill("Rahma Dewi");
		await page.getByPlaceholder("Cari Transaksi").press("Enter");
		await page
			.getByRole("row", {
				name: "1 APL22122206100029 Rahma dewi Toko Aplous Pusat baru  Transaksi  Detail  Buang",
			})
			.getByRole("link", { name: " Transaksi" })
			.click();
		await page.getByPlaceholder("Bayar..").click();
		await page.getByPlaceholder("Bayar..").fill("600010");
		const [page1] = await Promise.all([
			page.waitForEvent("popup"),
			page.getByRole("button", { name: "Bayar" }).click(),
		]);

		await expect(page1).toHaveTitle("Kwitansi");
	});

	test("[APL22] Cari transaksi dengan data invalid", async ({ page }) => {
		await page.goto(`${process.env.BASE_URL}/transaksi`);
		await page.getByPlaceholder("Cari Transaksi").click();
		await page.getByPlaceholder("Cari Transaksi").fill("zulfa");
		await page.getByPlaceholder("Cari Transaksi").press("Enter");
		await expect(
			page.getByRole("gridcell", { name: "TransaksiTidak Ditemukan" })
		).toContainText("TransaksiTidak Ditemukan");
	});

	test("[APL23] Cari transaksi dengan data kosong", async ({ page }) => {
		await page.goto(`${process.env.BASE_URL}/transaksi`);
		await page.getByPlaceholder("Cari Transaksi").click();
		let firstData = await page.getByRole("gridcell", {
			name: "APL22122205160025",
		});
		await page.getByPlaceholder("Cari Transaksi").fill("");
		await page.getByPlaceholder("Cari Transaksi").press("Enter");
		await expect(firstData).toBeTruthy;
	});

	test("[APL24] Bayar tagihan melebihi nominal yang seharusnya", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByPlaceholder("Cari Transaksi").click();
		await page.getByPlaceholder("Cari Transaksi").fill("Rahma Dewi");
		await page.getByPlaceholder("Cari Transaksi").press("Enter");
		await page.getByPlaceholder("Cari Transaksi").click();
		await page
			.locator(
				"#tableTransaksi > tbody > tr:nth-child(1) > td:nth-child(6) > a.badge.badge-cyan.btn-ts"
			)
			.click();
		await page.getByPlaceholder("Bayar..").click();
		await page.getByPlaceholder("Bayar..").fill("7000000");
		const [page7] = await Promise.all([
			page.waitForEvent("popup"),
			page.getByRole("button", { name: "Bayar" }).click(),
		]);

        await expect(page7).toHaveTitle("Kwitansi");
	});


	test("[APL25] Bayar tagihan kurang dari nominal yang seharusnya", async ({
		page,
	}) => {
		await page.goto(`${process.env.BASE_URL}`);
		await page.getByRole("link", { name: " Transaksi" }).click();
		await page.getByRole("link", { name: "Belum Bayar" }).click();
		await page.getByPlaceholder("Cari Transaksi").click();
		await page.getByPlaceholder("Cari Transaksi").fill("Rahma Dewi");
		await page.getByPlaceholder("Cari Transaksi").press("Enter");
		await page.getByPlaceholder("Cari Transaksi").click();
		await page
			.locator(
				"#tableTransaksi > tbody > tr:nth-child(1) > td:nth-child(6) > a.badge.badge-cyan.btn-ts"
			)
			.click();
        await page.getByPlaceholder('Bayar..').click();
        await page.getByPlaceholder('Bayar..').fill('10000');
        await page.getByRole('button', { name: 'Bayar' }).click();
        await expect( page.getByText('Uang Kurang')).toContainText('Uang Kurang');
        await page.getByRole('button', { name: 'OK' }).click();

	});

	test("[APL26] Cari transaksi dengan data valid", async ({ page }) => {
		await page.goto(`${process.env.BASE_URL}/transaksi/done/a`);
        await page.getByPlaceholder('Cari Transaksi').click();
        let firstData = await page.getByRole('gridcell', { name: 'APL22122205080022' });
        await page.getByPlaceholder('Cari Transaksi').fill('');
        await page.getByPlaceholder('Cari Transaksi').press('Enter');
        await expect(firstData).toBeTruthy
	});
});
