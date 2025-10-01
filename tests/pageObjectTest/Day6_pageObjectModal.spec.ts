import test from "playwright/test"
import { NavigationPage } from "../../page-objects/NavigationPage";
import { FormsLayoutPage } from "../../page-objects/FormsLayoutPage";
import {DatepickerPage} from "../../page-objects/DatePickerPage"


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

test('Handle Datepicker page', async({page})=>{
      const navigationPage = new NavigationPage(page);
      await navigationPage.navigateToDatepickerPage();
      const onDatepickerPage = new DatepickerPage(page);
      await onDatepickerPage.selectDateFromCommonDatePickerFromCurrentDate("5");
      await page.waitForTimeout(3000);

})


test('select date range - next week', async ({ page }) => {
  const navigationPage = new NavigationPage(page);
  await navigationPage.navigateToDatepickerPage();
  const datepickerPage = new DatepickerPage(page);
  
  const startDate = new Date("2024-06-10");
  const endDate = new Date("2024-06-17");

  
  await datepickerPage.selectDateFromDatePickerWithRange(startDate, endDate);
});

