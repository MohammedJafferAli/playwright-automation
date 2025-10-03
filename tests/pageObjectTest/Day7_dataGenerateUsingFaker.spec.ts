import test from "playwright/test";
import { PageManager } from "../../page-objects/pageManager";
import { faker } from '@faker-js/faker';

test.beforeEach('Navigate to the application', async ({ page }) => {
    await page.goto("http://localhost:4200/");
})

test('submit the inline form using faker data', async ({ page }) => {

    const pm = new PageManager(page);
    await pm.navigateTo().navigateToFormLayoutPage();
    await pm.onFormsLayoutPage().submitInlineForm(faker.person.firstName(), faker.internet.email(), true);
    await page.waitForTimeout(3000);
})

test('submit the grid form using faker data', async ({ page }) => {

    const pm = new PageManager(page);
    await pm.navigateTo().navigateToFormLayoutPage();
    await pm.onFormsLayoutPage().submitFormUsingTheGrid(faker.internet.email(), faker.internet.password(), "Option 2");
    await page.waitForTimeout(3000);
})