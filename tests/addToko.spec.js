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
    name: "Toko Aplous 4",
    noTelp: "088222254815",
    alamat: "Bandung",
    invalid: {
        name: "a",
        noTelp: "0",
        alamat: "",
    },
};

test.describe.parallel("Add Toko", async () => {
    test("[APL39] Tambah Toko Valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/outlet`);
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator("#nama").fill(testData.name);
        await page.locator("#tlp").fill(testData.noTelp);
        await page.locator("#alamat").fill(testData.alamat);
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(
            page.getByText(`${testData.name} Berhasil Ditambahkan`)
        ).toBeTruthy();
    });

    test("[APL40] Tambah Toko degan form kosong", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/outlet`);
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator("#nama").fill("");
        await page.locator("#tlp").fill("");
        await page.locator("#alamat").fill("");
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(page.getByText("Nama Harus diisi")).toBeTruthy();
    });

    test("[APL41] Tambah Toko dengan invalid input", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/outlet`);
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator("#nama").fill(testData.invalid.name);
        await page.locator("#tlp").fill(testData.invalid.noTelp);
        await page.locator("#alamat").fill(testData.invalid.alamat);
        await page.getByRole("button", { name: "Tambah" }).click();

        await expect(page.getByText("Nama Minimal 2 karakter")).toBeTruthy();
        await expect(page.getByText("No. Telepon Tidak Valid 1")).toBeTruthy();
        await expect(page.getByText("Alamat Harus di isi")).toBeTruthy();
        await expect(page.getByText("Nama Harus diisi")).toBeTruthy();
    });

    test("[APL42] Tambah Toko dengan nama Toko dan no telp. yang sama", async ({
        page,
    }) => {
        await page.goto(`${process.env.BASE_URL}/outlet`);
        await page.getByRole("link", { name: "Tambah" }).click();
        await page.locator("#nama").fill(testData.name);
        await page.locator("#tlp").fill(testData.noTelp);
        await page.locator("#alamat").fill(testData.alamat);
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(page.locator("#swal2-content")).toContainText(
            " Nama Toko Sudah Ada"
        );
    });
});
