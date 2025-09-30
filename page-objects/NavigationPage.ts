import { Locator, Page } from "playwright";

export class NavigationPage {

    private readonly page: Page;
    readonly formLayoutMenuItem : Locator
    readonly datepickerMenuItem : Locator
    readonly smartTableMenuItem : Locator
    readonly tooltipMenuItem : Locator
    readonly toastMenuItem : Locator

    constructor(page: Page) {
        this.page = page;
        this.formLayoutMenuItem = page.getByText("Form Layouts");
        this.datepickerMenuItem = page.getByText("Datepicker");
        this.smartTableMenuItem = page.getByText("Smart Table");
        this.tooltipMenuItem = page.getByText("Tooltip");
        this.toastMenuItem = page.getByText("Toastr");
    }

    async navigateToFormLayoutPage() {
        // await this.page.getByText("Forms").click();
        await this.selectGroupMenuItem("Forms");
        await this.page.waitForTimeout(1000);
        await this.formLayoutMenuItem.click();
    }

    async navigateToDatepickerPage() {
        // await this.page.getByText("Forms").click();
        await this.selectGroupMenuItem("Forms");
        await this.page.waitForTimeout(1000);
        await this.datepickerMenuItem.click();
    }

    async navigateToSmartTablePage() {
        // await this.page.getByText("Tables & Data").click();
        await this.selectGroupMenuItem("Tables & Data");
        await this.smartTableMenuItem.click();
    }
    async navigateToTooltipPage() {
        //await this.page.getByText("Modal & Overlays").click();
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.tooltipMenuItem.click();
    }

    async navigateToToastPage() {
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.toastMenuItem.click();
    }

    private async selectGroupMenuItem(pageTitle: string) {
        const groupMenuItem = this.page.getByTitle(pageTitle);
        const expandedState = await groupMenuItem.getAttribute('aria-expanded');
        if (expandedState !== 'true') {
            await groupMenuItem.click();
        }
    }

}