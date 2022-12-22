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
    nama: "Jenis Test",
    keterangan: "Keterangan",
    updateData: "Jenis Test Update",
};

test.describe.parallel("Laporan", () => {
    test("[APL95] Download Laporan", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/laporan`);
        await page.getByRole('heading', { name: ' Transaksi' }).getByRole('link', { name: ' Transaksi' }).click();
        const [download] = await Promise.all([
          page.waitForEvent('download'),
          page.getByRole('link', { name: ' Transaksi Toko Aplous Cabang 3' }).click()
        ]);
        
        expect(download.suggestedFilename()).toBe("Transaksi - Toko Aplous Cabang 3.pdf");
    });
});
