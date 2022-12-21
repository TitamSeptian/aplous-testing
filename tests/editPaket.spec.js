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
    name: "Jas Almamaterss",
    toko: "Toko Aplous Pusat",
    price: "20000",
    jenis: "Kiloan",
    invalid: {
        name: "a",
        toko: "",
        price: "abcd",
        jenis: "",
    },
};
test.describe.parallel("Edit Paket", async () => {
    test("[APL31] Edit  paket valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/paket`);
        await page
            .locator(
                "#tablePaket > tbody > tr:nth-child(1) > td:nth-child(5) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.waitForTimeout(2000);
        await page.locator("#nama").fill(testData.name);
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(
            page.getByText(`${testData.name} Berhasil Dirubah`)
        ).toBeTruthy();
    });

    test("[APL32] Edit  paket degan form kosong", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/paket`);
        await page
            .locator(
                "#tablePaket > tbody > tr:nth-child(1) > td:nth-child(5) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.waitForTimeout(2000);
        await page.locator("#nama").fill("");
        await page.locator("#harga").fill("");
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(page.getByText("Nama Harus diisi")).toBeTruthy();
    });

    test("[APL33] Edit paket dengan invalid input", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/paket`);
        await page
            .locator(
                "#tablePaket > tbody > tr:nth-child(1) > td:nth-child(5) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.waitForTimeout(2000);
        await page.locator("#nama").fill(testData.invalid.name);
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(page.getByText("Nama Harus diisi")).toBeTruthy();
    });

    test("[APL34] Edit paket dengan nama paket yang sama", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/paket`);
        await page
            .locator(
                "#tablePaket > tbody > tr:nth-child(1) > td:nth-child(5) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.waitForTimeout(2000);
        await page.locator("#nama").fill(testData.name);
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(page.locator("#swal2-content")).toContainText(
            " Nama Paket Sudah Ada"
        );
    });
});
