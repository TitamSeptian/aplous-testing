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
    nama: "Alif Ilman Nafian",
    no_telp: "0812371293",
    jenis_kelamin: "Laki-laki",
    alamat: "Subang",
    apl57_nama: "a",
    apl57_no_telp: "abcdef",
    apl57_alamat: "a",
    apl61_no_telp: "abcdef",
};

test.describe.parallel("editPelanggan", () => {
    test("[APL 59] Edit Pelanggan dengan Data Valid", async ({ page }) => {
        await page.goto(process.env.BASE_URL + "/member");
        await page
            .locator(
                "#tableMember > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.waitForTimeout(2000);
        await page.locator("#nama").fill(testData.nama);
        await page.locator("#tlp").fill(testData.no_telp);
        await page.locator("#alamat").fill(testData.alamat);
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(
            page.getByText(`${testData.nama} Berhasil Diubah`)
        ).toBeTruthy();
    });

    test("[APL 60] Edit Pelanggan dengan Field Kosong ", async ({ page }) => {
        await page.goto(process.env.BASE_URL + "/member");
        await page
            .locator(
                "#tableMember > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.locator("#nama").fill("");
        await page.locator("#tlp").fill("");
        await page.locator("#alamat").fill("");
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(page.getByText("Nama Harus di isi")).toBeTruthy();
        await expect(page.getByText("No. Telepon Harus di Isi")).toBeTruthy();
        await expect(page.getByText("Alamat Harus di isi")).toBeTruthy();
    });

    test("[APL 61] Edit Pelanggan dengan Invalid Input ", async ({ page }) => {
        await page.goto(process.env.BASE_URL + "/member");
        await page
            .locator(
                "#tableMember > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.locator("#nama").fill("");
        await page.locator("#tlp").fill(testData.apl61_no_telp);
        await page.locator("#alamat").fill("");
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(page.getByText("Nama Harus di isi")).toBeTruthy();
        await expect(
            page.getByText("hanya di isi angka,No. Telepon Tidak Valid")
        ).toBeTruthy();
        await expect(page.getByText("Alamat Harus di isi")).toBeTruthy();
    });
});
