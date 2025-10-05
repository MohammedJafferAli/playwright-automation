import { test, expect } from '@playwright/test';
import { PageManager } from "../../page-objects/pageManager";
import { formTestCases } from "../../data/formTestCases";
import { MobileHelper } from "../../utils/mobileHelper";

test.beforeEach('Navigate to the application', async ({ page }, testInfo: any) => {
    await page.goto("/");
    await MobileHelper.handleMobileSidebar(page, testInfo);
});

formTestCases.forEach(({ testName, username, password, option }) => {
    test(`Form submission: ${testName}`, async ({ page }, testInfo) => {
        const pm = new PageManager(page);
        await pm.navigateTo().navigateToFormLayoutPage();
        await pm.onFormsLayoutPage().submitFormUsingTheGrid(username, password, option, testInfo);
        await page.waitForTimeout(1000);
    });
});