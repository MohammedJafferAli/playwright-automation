import test from "playwright/test"
import { NavigationPage } from "../../page-objects/NavigationPage";


test.beforeEach('Navigate to the application', async ({ page }) => {
   await page.goto("http://localhost:4200/");
})

test('Navigate to Forms layout page', async({page})=>{

const navigationPage = new NavigationPage(page);
await navigationPage.navigateToFormLayoutPage();
await navigationPage.navigateToDatepickerPage();
await navigationPage.navigateToSmartTablePage();
await navigationPage.navigateToTooltipPage();
await navigationPage.navigateToToastPage();

})