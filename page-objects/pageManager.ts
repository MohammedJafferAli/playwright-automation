import { Page } from "playwright";
import { NavigationPage } from "./NavigationPage";
import { FormsLayoutPage } from "./FormsLayoutPage";
import { DatepickerPage } from "./DatePickerPage";

export class PageManager {
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formsLayoutPage: FormsLayoutPage;
    private readonly datepickerPage: DatepickerPage;
    
    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formsLayoutPage = new FormsLayoutPage(this.page);
        this.datepickerPage = new DatepickerPage(this.page);
    }
    
    navigateTo() {
        return this.navigationPage;
    }
    
    onFormsLayoutPage() {
        return this.formsLayoutPage;
    }
    
    onDatepickerPage() {
        return this.datepickerPage;
    }
}