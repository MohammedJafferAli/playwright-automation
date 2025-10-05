import { Page } from 'playwright';

export class MobileHelper {
    static async handleMobileSidebar(page: Page, testInfo: any) {
        if (testInfo?.project?.name === 'mobile') {
            await page.locator('.sidebar-toggle').click();
            await page.waitForTimeout(1000);
        }
    }
}