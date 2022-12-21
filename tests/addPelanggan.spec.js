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
    nama: "Alif Nafian",
    no_telp: "0812371293",
    jenis_kelamin: "Laki-laki",
    alamat: "Subang",
    apl57_nama: "a",
    apl57_no_telp: "abcdef",
    apl57_alamat: "a",
};

test.describe.parallel("addPelanggan", () => {
    test("[APL56] Tambah Pelanggan Valid", async ({ page }) => {
        await page.goto(process.env.BASE_URL + "/member");
        await page.getByRole('link', { name: 'Tambah' }).click();
        await page.locator('#nama').click();
        await page.locator('#nama').fill(testData.nama);
        await page.locator('#tlp').click();
        await page.locator('#tlp').fill(testData.no_telp);
        await page.locator('#alamat').click();
        await page.locator('#alamat').fill(testData.alamat);
        await page.getByRole('button', { name: 'Tambah' }).click();
        await expect(page.getByText(`${testData.nama} Berhasil Ditambahkan`)).toBeTruthy();
    });

    test("[APL57] Tambah Pelanggan dengan Field Kosong", async ({ page }) => {
        await page.goto(process.env.BASE_URL + "/member");
        await page.getByRole('link', { name: 'Tambah' }).click();
        await page.getByRole('button', { name: 'Tambah' }).click();
        await expect(page.getByText('Nama Harus di isi')).toBeTruthy();
        await expect(page.getByText('No. Telepon Harus di Isi')).toBeTruthy();
        await expect(page.getByText('Alamat Harus di isi')).toBeTruthy();
    });

    test("[APL58] Tambah Pelanggan dengan Invalid Input ", async ({ page }) => {
        await page.goto(process.env.BASE_URL + "/member");
        await page.getByRole('link', { name: 'Tambah' }).click();
        await page.locator('#nama').click();
        await page.locator('#nama').fill(testData.apl57_nama);
        await page.locator('#tlp').click();
        await page.locator('#tlp').fill(testData.apl57_no_telp);
        await page.locator('#alamat').click();
        await page.locator('#alamat').fill(testData.apl57_alamat);
        await page.getByRole('button', { name: 'Tambah' }).click();
        await expect(page.getByText('Nama Minimal 2 karakter')).toBeTruthy();
        await expect(page.getByText('hanya di isi angka,No. Telepon Tidak Valid')).toBeTruthy();
    });
});