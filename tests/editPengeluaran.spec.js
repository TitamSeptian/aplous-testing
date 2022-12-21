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
    nama: "Sabun Cucis",
    toko: "Toko Aplous Pusat",
    harga: "2000000",
    keterangan: "-",
    invalid: {
        nama: "a",
        harga: "1",
    },
};

test.describe.parallel("Edit Pengeluaran", async () => {
    test("[APL89] Edit Pengeluaran Valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengeluaran`);
        await page
            .locator(
                "#tablePengeluaran > tbody > tr.odd > td:nth-child(5) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.locator("#nama").fill(testData.nama);
        await page.locator("#select2-outlet-container").click();
        await page
            .getByRole("option", {
                name: "Toko Aplous Pusat Jalan Siliwangi 27 RT 07 RW 18 Kelurahan Kalijati Kecamatan Bumi Indah Kota Bandung Jawa Barat 45132",
            })
            .getByText(testData.toko)
            .click();
        await page.locator("#harga").fill(testData.harga);
        await page.locator("#ket").fill(testData.keterangan);
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(
            page.getByText(`${testData.name} Berhasil Ditambahkan`)
        ).toBeTruthy();
    });

    test("[APL90] Edit Pengeluaran degan form koson", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengeluaran`);
        await page
            .locator(
                "#tablePengeluaran > tbody > tr.odd > td:nth-child(5) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(page.getByText("Nama Harus diisi")).toBeTruthy();
    });

    test("[APL91] Edit Pengluaran dengan invalid input", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengeluaran`);
        await page
            .locator(
                "#tablePengeluaran > tbody > tr.odd > td:nth-child(5) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.locator("#nama").fill(testData.invalid.nama);
        await page.locator("#harga").fill(testData.invalid.harga);
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(page.getByText("Nama Minimal 2 karakter")).toBeTruthy();
        await expect(page.getByText("Pilih Toko")).toBeTruthy();
    });
});
