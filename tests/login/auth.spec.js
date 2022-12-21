const { test, expect } = require("@playwright/test");
const BASE_URL = "https://www.master-7rqtwti-j4hpdl2y32kqc.au.platformsh.site";
test("Login admin", async ({ page }) => {
    await page.goto(
        "https://www.master-7rqtwti-j4hpdl2y32kqc.au.platformsh.site/"
    );
    await page.getByPlaceholder("Nama Pengguna").click();
    await page.getByPlaceholder("Nama Pengguna").fill("admin");
    await page.getByPlaceholder("Kata Sandi").fill("123qwe123");
    await page.getByPlaceholder("Kata Sandi").press("Enter");
    await page.waitForTimeout(5000);
    // expect
    await expect(page).toHaveURL(/.*\/dashboard/);
});
