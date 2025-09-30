import test from "playwright/test"
import { NavigationPage } from "../../page-objects/NavigationPage";
import { FormsLayoutPage } from "../../page-objects/FormsLayoutPage";


test.beforeEach('Navigate to the application', async ({ page }) => {
   await page.goto("http://localhost:4200/");
})

test('Navigate to all pages', async({page})=>{

const navigationPage = new NavigationPage(page);
await navigationPage.navigateToFormLayoutPage();
await navigationPage.navigateToDatepickerPage();
await navigationPage.navigateToSmartTablePage();
await navigationPage.navigateToTooltipPage();
await navigationPage.navigateToToastPage();

})

test('Handle Forms layout page', async({page})=>{
      const navigationPage = new NavigationPage(page);
      await navigationPage.navigateToFormLayoutPage();
      const onFormsLayoutPage = new FormsLayoutPage(page);
      await onFormsLayoutPage.submitFormUsingTheGrid("Jaffer", "Welcome@123", "Option 1");
      // await page.waitForTimeout(3000);

      await onFormsLayoutPage.submitInlineForm("Mohammed Jaffer", "test1@test.com", false);
      await page.waitForTimeout(3000);
})