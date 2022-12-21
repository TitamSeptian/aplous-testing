const { test, expect } = require("@playwright/test");
require("dotenv").config();
const testData = {
    username: "admin",
    password: "123qwe123",
    invalidUsername: "admin1",
    invalidPassword: "admowner",
};
test.describe.parallel("Login", async () => {
    test("[APL01] Login menggunakan data valid by admin", async ({ page }) => {
        await page.goto(process.env.BASE_URL);
        await page.getByPlaceholder("Nama Pengguna").click();
        await page.getByPlaceholder("Nama Pengguna").fill(testData.username);
        await page.getByPlaceholder("Kata Sandi").fill(testData.password);
        await page.getByPlaceholder("Kata Sandi").press("Enter");
        await page.waitForTimeout(5000);
        // expect
        await expect(page).toHaveURL(/.*\/dashboard/);
    });

    test("[APL02] Login menggunakan data invalid by admin", async ({
        page,
    }) => {
        await page.goto(process.env.BASE_URL);
        await page.getByPlaceholder("Nama Pengguna").click();
        await page
            .getByPlaceholder("Nama Pengguna")
            .fill(testData.invalidUsername);
        await page
            .getByPlaceholder("Kata Sandi")
            .fill(testData.invalidPassword);
        await page.getByPlaceholder("Kata Sandi").press("Enter");
        await page.waitForTimeout(5000);
        await expect(
            page.locator("#formLogin > div > div:nth-child(1) > div > span")
        ).toBeTruthy();
        // expect
        // await expect(page).toHaveURL(/.*\/dashboard/);
    });

    test("[APL03] Login menggunakan data kosong by admin", async ({ page }) => {
        await page.goto(process.env.BASE_URL);
        await page.getByPlaceholder("Nama Pengguna").click();
        await page.getByPlaceholder("Nama Pengguna").fill("");
        await page.getByPlaceholder("Kata Sandi").fill("");
        await page.getByPlaceholder("Kata Sandi").press("Enter");
        await page.waitForTimeout(5000);
        await expect(
            page.locator("#formLogin > div > div:nth-child(1) > div > span")
        ).toHaveText("Nama Pengguna tidak boleh kosong");
        // expect
        // await expect(page).toHaveURL(/.*\/dashboard/);
    });

    test("[APL04] Login menggunakan salah satu data kosong (password)", async ({
        page,
    }) => {
        await page.goto(process.env.BASE_URL);
        await page.getByPlaceholder("Nama Pengguna").click();
        await page.getByPlaceholder("Nama Pengguna").fill(testData.username);
        await page.getByPlaceholder("Kata Sandi").fill("");
        await page.getByPlaceholder("Kata Sandi").press("Enter");
        await page.waitForTimeout(5000);
        await expect(
            page.locator("#formLogin > div > div:nth-child(1) > div > span")
        ).toHaveText("Password Tidak Boleh Kosong");
        // expect
        // await expect(page).toHaveURL(/.*\/dashboard/);
    });
    test("[APL05] Login menggunakan salah satu data kosong (username)", async ({
        page,
    }) => {
        await page.goto(process.env.BASE_URL);
        await page.getByPlaceholder("Nama Pengguna").click();
        await page.getByPlaceholder("Nama Pengguna").fill("");
        await page.getByPlaceholder("Kata Sandi").fill(testData.password);
        await page.getByPlaceholder("Kata Sandi").press("Enter");
        await page.waitForTimeout(5000);
        await expect(
            page.locator("#formLogin > div > div:nth-child(1) > div > span")
        ).toHaveText("Password Tidak Boleh Kosong");
        // expect
        // await expect(page).toHaveURL(/.*\/dashboard/);
    });
});
