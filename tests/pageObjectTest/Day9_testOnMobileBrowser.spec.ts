import { test, expect } from '@playwright/test';
import { PageManager } from "../../page-objects/pageManager";
import { testData } from "../../data/testData";
import { MobileHelper } from "../../utils/mobileHelper";

test.beforeEach('Navigate to the application', async ({ page }, testInfo: any) => {
    await page.goto("/");
    await MobileHelper.handleMobileSidebar(page, testInfo);
});

test('Form submission', async ({ page }, testInfo) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToFormLayoutPage();
    await pm.onFormsLayoutPage().submitFormUsingTheGrid(
        testData.formLayoutData.username,
        testData.formLayoutData.password,
        testData.formLayoutData.option,
        testInfo
    );
    await page.waitForTimeout(1000);
});