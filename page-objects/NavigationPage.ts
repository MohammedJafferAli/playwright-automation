import { Page } from "playwright";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    async navigateToFormLayoutPage() {
        // await this.page.getByText("Forms").click();
        await this.selectGroupMenuItem("Forms");
        await this.page.waitForTimeout(1000);
        await this.page.getByText("Form Layouts").click();
    }

    async navigateToDatepickerPage() {
        // await this.page.getByText("Forms").click();
        await this.selectGroupMenuItem("Forms");
        await this.page.waitForTimeout(1000);
        await this.page.getByText("Datepicker").click();
    }

    async navigateToSmartTablePage() {
        // await this.page.getByText("Tables & Data").click();
        await this.selectGroupMenuItem("Tables & Data");
        await this.page.getByText("Smart Table").click();
    }
    async navigateToTooltipPage() {
        //await this.page.getByText("Modal & Overlays").click();
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.page.getByText("Tooltip").click();
    }

    async navigateToToastPage() {
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.page.getByText("Toastr").click();
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const expandedState = await groupMenuItem.getAttribute('aria-expanded');
        if (expandedState !== 'true') {
            await groupMenuItem.click();
        }
    }

}