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
    name: "Jas Almamater",
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

test.describe.parallel("Add Paket", async () => {
    test("[APA27] Tambah paket data valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/paket`);
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator("#nama").click();
        await page.locator("#nama").fill(testData.name);
        await page.locator("#select2-outlet-container").click();
        await page
            .getByRole("option", {
                name: "Toko Aplous Pusat Jalan Siliwangi 27 RT 07 RW 18 Kelurahan Kalijati Kecamatan Bumi Indah Kota Bandung Jawa Barat 45132",
            })
            .getByText(testData.toko)
            .click();
        await page.locator("#select2-jenis-container").click();
        await page
            .locator("div")
            .filter({ hasText: testData.jenis })
            .locator("div")
            .click();
        await page.locator("#harga").click();
        await page.locator("#harga").fill(testData.price);
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(
            page.getByText(`${testData.name} Berhasil Ditambahkan`)
        ).toBeTruthy();
    });

    test("[APL28] Tambah paket degan form kosong", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/paket`);
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(page.getByText("Nama Harus diisi")).toBeTruthy();
    });

    test("[APL29] Tambah paket dengan invalid input", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/paket`);
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator("#nama").fill("a");
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(page.getByText("Nama Minimal 2 karakter")).toBeTruthy();
    });

    test("[APL30] Tambah paket dengan nama paket yang sama", async ({
        page,
    }) => {
        await page.goto(`${process.env.BASE_URL}/paket`);
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator("#nama").fill(testData.name);
        await page.locator("#select2-outlet-container").click();
        await page
            .getByRole("option", {
                name: "Toko Aplous Pusat Jalan Siliwangi 27 RT 07 RW 18 Kelurahan Kalijati Kecamatan Bumi Indah Kota Bandung Jawa Barat 45132",
            })
            .getByText("Toko Aplous Pusat")
            .click();
        await page.locator("#select2-jenis-container").click();
        await page
            .locator("div")
            .filter({ hasText: "kiloan" })
            .locator("div")
            .click();
        await page.locator("#harga").click();
        await page.locator("#harga").fill("20000");
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(page.locator("#swal2-content")).toContainText(
            " Nama Paket Sudah Ada"
        );
    });
});
