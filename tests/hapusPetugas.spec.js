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

test.describe.parallel("Delete Petugas", () => {
	test("[APL72] Delete Petugas", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
	});

    test("[APL73] Cancel Delete Petugas", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}`);
	});

});
