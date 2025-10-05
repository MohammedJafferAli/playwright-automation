import { Page } from "playwright";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
    constructor(page: Page) {
        super(page);
    }

    async navigateToFormLayoutPage() {
        await this.selectGroupMenuItem("Forms");
        await this.page.getByText("Form Layouts").click();
    }

    async navigateToDatepickerPage() {
        await this.selectGroupMenuItem("Forms");
        await this.page.getByText("Datepicker").click();
    }

    async navigateToSmartTablePage() {
        await this.selectGroupMenuItem("Tables & Data");
        await this.page.getByText("Smart Table").click();
    }

    async navigateToTooltipPage() {
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