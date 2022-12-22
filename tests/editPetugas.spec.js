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

test.describe.parallel("Edit Petugas", () => {
	test("[APL69] Edit Petugas dengan Data Valid", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
	});

    test("[APL70] Edit Petugas dengan Field Kosong", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
	});

    test("[APL71] Edit Petugas dengan Invalid Input ", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
	});

});
