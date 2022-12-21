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
    name: "Toko Aplous 4s",
    noTelp: "088222254815",
    alamat: "Bandung",
    invalid: {
        name: "a",
        noTelp: "0",
        alamat: "",
    },
};

test.describe.parallel("Edit Toko", async () => {
    test("[APL43] Edit Toko Valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/outlet`);
        await page
            .locator(
                "#tableOutlet > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.locator("#nama").fill(testData.name);
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(page.getByText("Berhasil Diubah")).toBeTruthy();
    });

    test("[APL44] Edit Toko degan form kosong", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/outlet`);
        await page
            .locator(
                "#tableOutlet > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.locator("#nama").fill("");
        await page.locator("#tlp").fill("");
        await page.locator("#alamat").fill("");
        await page.getByRole("button", { name: "Ubah" }).click();
        await expect(page.getByText("Nama Harus diisi")).toBeTruthy();
    });

    test("[APL45] Edit Toko dengan invalid input", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/outlet`);
        await page
            .locator(
                "#tableOutlet > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.locator("#nama").fill(testData.invalid.name);
        await page.locator("#tlp").fill(testData.invalid.noTelp);
        await page.locator("#alamat").fill(testData.invalid.alamat);
        await page.getByRole("button", { name: "Ubah" }).click();

        await expect(page.getByText("Nama Minimal 2 karakter")).toBeTruthy();
        await expect(page.getByText("No. Telepon Tidak Valid 1")).toBeTruthy();
        await expect(page.getByText("Alamat Harus di isi")).toBeTruthy();
        await expect(page.getByText("Nama Harus diisi")).toBeTruthy();
    });

    test("[APL46] Tambah Toko dengan nama Toko dan no telp. yang sama", async ({
        page,
    }) => {
        await page.goto(`${process.env.BASE_URL}/outlet`);
        await page
            .locator(
                "#tableOutlet > tbody > tr:nth-child(1) > td:nth-child(4) > a.badge.badge-warning.btn-edit"
            )
            .click();
        await page.locator("#nama").fill("");
        await page.locator("#tlp").fill("");
        await page.locator("#alamat").fill("");
        await page.getByRole("button", { name: "Tambah" }).click();
        await expect(page.locator("#swal2-content")).toContainText(
            " Nama Toko Sudah Ada"
        );
    });
});
