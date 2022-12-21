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
    nama: "Sabun Cuci",
    toko: "Toko Aplous Pusat",
    harga: "2000000",
    keterangan: "-",
    invalid: {
        nama: "a",
        harga: "1",
    },
};

test.describe.parallel("Add Pengeluaran", async () => {
    test("[APL86] Tambah Pengeluaran Valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengeluaran`);
        await page.getByRole("link", { name: "Tambah" }).click();
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
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(
            page.getByText(`${testData.name} Berhasil Ditambahkan`)
        ).toBeTruthy();
    });

    test("[APL87] Tambah Pengeluaran degan form kosong", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengeluaran`);
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(page.getByText("Nama Harus diisi")).toBeTruthy();
    });

    test("[APL88] Tambah Pengluaran dengan invalid input", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/pengeluaran`);
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator("#nama").fill(testData.invalid.nama);
        await page.locator("#harga").fill(testData.invalid.harga);
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(page.getByText("Nama Minimal 2 karakter")).toBeTruthy();
        await expect(page.getByText("Pilih Toko")).toBeTruthy();
    });
});
