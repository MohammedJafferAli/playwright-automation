import { Page, expect } from "@playwright/test";
import { HelperBase } from './helperBase';

export class DatepickerPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }
    
    async selectDateFromCommonDatePickerFromCurrentDate(daysInFuture: string) {

        const datePicketInput = this.page.getByPlaceholder('Form Picker');
        await datePicketInput.click();
        await this.selectFutureDate(5, datePicketInput);

        // Function to select any future date
    }

    async selectDateFromDatePickerWithRange(startDate: Date, endDate: Date) {
        const datePickerInput = this.page.getByPlaceholder('Range Picker');
        await datePickerInput.click();

        await this.selectSpecificDate(startDate);
        await this.selectSpecificDate(endDate);

        const formatDate = (date: Date) =>
            `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;

        await expect(datePickerInput).toHaveValue(`${formatDate(startDate)} - ${formatDate(endDate)}`);
    }
    private async selectSpecificDate(targetDate: Date) {
        const targetDay = targetDate.getDate();
        const targetMonth = targetDate.toLocaleString('default', { month: 'long' });
        const targetYear = targetDate.getFullYear();
        const expectedMonthYear = `${targetMonth} ${targetYear}`;

        const calendarViewMode = this.page.locator('nb-calendar-view-mode');
        const navPrev = this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-left"]');
        const navNext = this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]');

        let currentMonthYear = (await calendarViewMode.textContent())?.trim() || '';

        while (currentMonthYear !== expectedMonthYear) {
            const currentDate = new Date(`${currentMonthYear} 1`);
            if (targetDate < currentDate) {
                await navPrev.click();
            } else {
                await navNext.click();
            }
            currentMonthYear = (await calendarViewMode.textContent())?.trim() || '';
        }

        await this.page
            .locator('.day-cell:not(.bounding-month)')
            .getByText(targetDay.toString(), { exact: true })
            .click();

        await this.page.waitForTimeout(1000);


    }


    private async selectFutureDate(daysInFuture: number, datePicketInput: any) {
        const date = new Date();
        date.setDate(date.getDate() + daysInFuture);

        const targetDay = date.getDate();
        const targetMonthShort = date.toLocaleString('default', { month: 'short' });
        const targetMonthLong = date.toLocaleString('default', { month: 'long' });
        const targetYear = date.getFullYear();
        const expectedDate = `${targetMonthShort} ${targetDay}, ${targetYear}`;

        await datePicketInput.click();

        let currentMonthYear = await this.page.locator('nb-calendar-view-mode').textContent() || '';
        const expectedMonthYear = `${targetMonthLong} ${targetYear}`;

        // Navigate to target month/year
        while (!currentMonthYear.includes(expectedMonthYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            currentMonthYear = await this.page.locator('nb-calendar-view-mode').textContent() || '';
        }

        // Select the target day
        await this.page.locator('[class="day-cell ng-star-inserted"]')
            .getByText(targetDay.toString(), { exact: true })
            .click();

        await expect(datePicketInput).toHaveValue(expectedDate);
    }
}

