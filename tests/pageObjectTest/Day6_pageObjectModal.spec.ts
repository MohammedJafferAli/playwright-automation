import test from "playwright/test"
import { PageManager } from "../../page-objects/pageManager";



test.beforeEach('Navigate to the application', async ({ page }) => {
      await page.goto("http://localhost:4200/");
})

test('Navigate to all pages', async ({ page }) => {

      const pm = new PageManager(page);
      await pm.navigateTo().navigateToFormLayoutPage();
      await pm.navigateTo().navigateToDatepickerPage();
      await pm.navigateTo().navigateToSmartTablePage();
      await pm.navigateTo().navigateToTooltipPage();
      await pm.navigateTo().navigateToToastPage();

})

test('Handle Forms layout page', async ({ page }) => {
      const pm = new PageManager(page);
      await pm.navigateTo().navigateToFormLayoutPage();
      await pm.onFormsLayoutPage().submitFormUsingTheGrid("Jaffer", "Welcome@123", "Option 1");
      // await page.waitForTimeout(3000);

      await pm.onFormsLayoutPage().submitInlineForm("Mohammed Jaffer", "test1@test.com", false);
      await page.waitForTimeout(3000);
})

test('Handle Datepicker page', async ({ page }) => {
      const pm = new PageManager(page);
      await pm.navigateTo().navigateToDatepickerPage();

      await pm.onDatepickerPage().selectDateFromCommonDatePickerFromCurrentDate("5");
      await page.waitForTimeout(3000);
})


test('select date range - next week', async ({ page }) => {
      const pm = new PageManager(page);
      await pm.navigateTo().navigateToDatepickerPage();

      const startDate = new Date("2024-06-10");
      const endDate = new Date("2024-06-17");
      await pm.onDatepickerPage().selectDateFromDatePickerWithRange(startDate, endDate);
});

