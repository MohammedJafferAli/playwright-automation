import { Page } from "playwright";
// Inconsistent import formatting - DatepickerPage import uses curly braces without space
import { NavigationPage } from "./NavigationPage";
import { FormsLayoutPage } from "./FormsLayoutPage";
import { DatepickerPage } from "./DatePickerPage";


export class PageManager {

    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formsLayoutPage: FormsLayoutPage;
    private readonly datepickerPage: DatepickerPage;
    // Add other page objects as needed
    
    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formsLayoutPage = new FormsLayoutPage(this.page);
        this.datepickerPage = new DatepickerPage(this.page);
        // Initialize other page objects here
    }  
    
    navigateTo(){
        return this.navigationPage;
    }
    onFormsLayoutPage(){
        return this.formsLayoutPage;
    }
    onDatepickerPage(){
        return this.datepickerPage;
    }


}