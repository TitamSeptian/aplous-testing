// global-setup.js
// const { chromium } = require("@playwright/test");
import { chromium, Browser } from "@playwright/test";

async function globalSetup(config) {
    const browser = await chromium.launch();
    await saveStorage(browser, "admin", "123qwe123", "adminStorage.json");
    await saveStorage(browser, "kasir", "123qwe123", "kasirStorage.json");
    await saveStorage(browser, "owner", "123qwe123", "ownerStorage.json");
    await browser.close();
}

async function saveStorage(browser, username, password, saveStoragePath) {
    const page = await browser.newPage();
    await page.goto(
        "https://www.master-7rqtwti-j4hpdl2y32kqc.au.platformsh.site/"
    );
    await page.getByPlaceholder("Nama Pengguna").click();
    await page.getByPlaceholder("Nama Pengguna").fill(username);
    await page.getByPlaceholder("Kata Sandi").fill(password);
    await page.getByPlaceholder("Kata Sandi").press("Enter");
    // Save signed-in state to 'storageState.json'.
    await page.context().storageState({ path: saveStoragePath });
    await browser.close();
}

export default globalSetup;
