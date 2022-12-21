const { test, expect } = require("@playwright/test");
require("dotenv").config();

const testData = {
    apl63_nama: "Rahma dewi"
}

test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL);
    await page.getByPlaceholder("Nama Pengguna").click();
    await page.getByPlaceholder("Nama Pengguna").fill("admin");
    await page.getByPlaceholder("Kata Sandi").fill("123qwe123");
    await page.getByPlaceholder("Kata Sandi").press("Enter");
    await page.waitForTimeout(2000);
});

test.describe.parallel("deletePelanggan", () => {
    test("[APL62] Delete Pelanggan", async({ page }) => {
        await page.goto(process.env.BASE_URL + "/member");
        await page.locator("#tableMember > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-danger.btn-delete").click();
        await page.getByRole('button', { name: 'Ya, Buang !' }).click();
        await expect(page.getByText('Berhasil Dibuang')).toBeTruthy();
    });

    test("[APL63] Cancel Delete Pelanggan", async({ page }) => {
        await page.goto(process.env.BASE_URL + "/member");
        await page.locator("#tableMember > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-danger.btn-delete").click();
        await expect(page.getByText(`${testData.apl63_nama} Akan Dibuang`)).toBeTruthy();
        await page.getByRole('button', { name: 'Batal' }).click();
        await expect(page.getByRole('gridcell', { name: testData.apl63_nama })).toBeTruthy();
    });

    test("[APL64] Delete Pelanggan yang sedang melakukan transaksi", async({ page }) => {
        await page.goto(process.env.BASE_URL + "/member");
        
    });
});