import { test as base } from '@playwright/test';
import { PageManager } from "./pageManager";

export type TestOptions = {
    formLayoutPage: string,
    pageManager: PageManager
};

export const test = base.extend<TestOptions>({
    formLayoutPage: async ({ page }, use) => {
        await page.goto("/");
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        await use('');
        console.log('TEAR DOWN - After all tests in the Form Layout page');
    },

    pageManager: async ({ page, formLayoutPage }, use) => {
        const pm = new PageManager(page);
        await use(pm);
        console.log('TEAR DOWN - After all tests in the Page Manager');
    }
});