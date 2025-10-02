import { Page } from "playwright";

export class HelperBase {

    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Wait for element to be visible and return it
    async waitForElement(selector: string, timeout = 5000) {
        return await this.page.waitForSelector(selector, { state: 'visible', timeout });
    }

    // Click element after ensuring it's visible
    async clickElement(selector: string) {
        await this.waitForElement(selector);
        await this.page.click(selector);
    }

    // Type text into input field
    async typeText(selector: string, text: string) {
        await this.waitForElement(selector);
        await this.page.fill(selector, text);
    }

    // Get text content from element
    async getText(selector: string): Promise<string> {
        await this.waitForElement(selector);
        return (await this.page.textContent(selector)) || '';
    }

    // Check if element exists on page
    async elementExists(selector: string): Promise<boolean> {
        const element = await this.page.$(selector);
        return element !== null;
    }

    // Scroll element into view
    async scrollIntoView(selector: string) {
        const element = await this.waitForElement(selector);
        await element.scrollIntoViewIfNeeded();
    }

    // Get current page URL
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    // Wait for page load state
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    // Take screenshot of specific element
    async takeElementScreenshot(selector: string, path: string) {
        const element = await this.waitForElement(selector);
        await element.screenshot({ path });
    }

    // Select option from dropdown
    async selectDropdownOption(selector: string, value: string) {
        await this.waitForElement(selector);
        await this.page.selectOption(selector, value);
    }
}    