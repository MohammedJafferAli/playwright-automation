import { Page } from "playwright";

export class NavigationPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToFormLayoutPage() {
        await this.page.getByText("Forms").click();
        await this.page.getByText("Form Layouts").click();
    }

    async navigateToDatepickerPage() {
        await this.page.getByText("Forms").click();
        await this.page.getByText("Datepicker").click();
    }
    
    async navigateToSmartTablePage() {
        await this.page.getByText("Tables & Data").click();
        await this.page.getByText("Smart Table").click();
    }
    async navigateToTooltipPage() {
        await this.page.getByText("Modal & Overlays").click();
        await this.page.getByText("Tooltip").click();
    }
    
    async navigateToToastPage() {
        await this.page.getByText("Modal & Overlays").click();
        await this.page.getByText("Toastr").click();
    }

}