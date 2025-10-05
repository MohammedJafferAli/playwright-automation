import { expect, test } from "@playwright/test";


test.beforeEach("Playwright Test application", async ({ page }) => {
    await page.goto("/");
});

test.describe("Automate Form layout elements", () => {

    test.beforeEach("Working with text box", async ({ page }) => {
        await page.getByText("Forms").click();
        await page.getByText("Form Layouts").click();
    });

    test("TextBox automation @regression", async ({ page }) => {
        const inpUserEmail = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: "Email" });
        await inpUserEmail.fill('jaffercharliee@gmail.com');
        await inpUserEmail.clear();
        await inpUserEmail.pressSequentially("jaffercharliebe@gmail.com", { delay: 500 });

        const valUserEmail = await inpUserEmail.inputValue();
        expect(valUserEmail).toEqual("jaffercharliebe@gmail.com");
        await expect(inpUserEmail).toHaveValue("jaffercharliebe@gmail.com");
    });

    test("Radio button automation", async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });

        const radioOption1 = page.getByRole("radio", { name: "Option 1" });
        await radioOption1.check({ force: true });
        await expect(radioOption1).toBeChecked();

        const statusRadioOption1 = await radioOption1.isChecked();
        expect(statusRadioOption1).toBeTruthy();

        await usingTheGridForm.getByRole("radio", { name: 'Option 2' }).check({ force: true });
        expect(await usingTheGridForm.getByRole("radio", { name: 'Option 2' }).isChecked()).toBeTruthy();
        expect(await usingTheGridForm.getByRole("radio", { name: 'Option 1' }).isChecked()).toBeFalsy();
    });
});

test.describe("Modal and Overlays @sanity @regression", () => {

    test("CheckBox automation", async ({ page }) => {
        await page.getByTitle('Modal & Overlays').click();
        await page.getByTitle('Toastr').click();

        await page.getByRole("checkbox", { name: "Hide on click" }).uncheck({ force: true });
        await page.getByRole("checkbox", { name: "Prevent arising of duplicate toast" }).check({ force: true });

        const allCheckBoxes = page.getByRole("checkbox");
        for (const box of await allCheckBoxes.all()) {
            await box.check({ force: true });
            expect(await box.isChecked()).toBeTruthy();
        }

        for (const box of await allCheckBoxes.all()) {
            await box.uncheck({ force: true });
            expect(await box.isChecked()).toBeFalsy();
        }
    });

    test('Change app theme using dropdown', async ({ page }) => {
        const dropDownTheme = page.locator('ngx-header nb-select');
        await dropDownTheme.click();

        const optionsList = page.locator('nb-option-list nb-option');
        await expect(optionsList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);

        await optionsList.filter({ hasText: "Cosmic" }).click();
        const globalHeader = page.locator('nb-layout-header');
        await expect(globalHeader).toHaveCSS('background-color', 'rgb(50, 50, 89)');

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)",
        };

        await dropDownTheme.click();
        for (const color in colors) {
            if (color !== "Corporate") {
                await optionsList.filter({ hasText: color }).click();
                await expect(globalHeader).toHaveCSS('background-color', colors[color as keyof typeof colors]);
                await dropDownTheme.click();
            }
        }
    });

    test('Handling Tooltips @sanity', async ({ page }) => {
        await test.step('Navigate to Tooltip section', async () => {
            await page.getByTitle('Modal & Overlays').click();
            await page.getByTitle('Tooltip').click();
            await expect(page).toHaveURL(/.*tooltip/);
        });

        await test.step('Hover over TOP button and verify tooltip', async () => {
            const tooltipCard = page.locator('nb-card');
            const topButton = tooltipCard.getByRole('button', { name: 'TOP' });
            const tooltip = page.locator('nb-tooltip');

            await topButton.hover();
            await expect(tooltip).toBeVisible();
            await expect(tooltip).toHaveText('This is a tooltip');
        });
    });

    test('Handling browser alerts / dialog box', async ({ page }) => {
        await test.step('Navigate to Smart Table', async () => {
            await page.getByTitle('Tables & Data').click();
            await page.getByTitle('Smart Table').click();
            await expect(page).toHaveURL(/.*smart-table/);
        });

        await test.step('Handle delete confirmation dialog', async () => {
            page.once('dialog', async dialog => {
                expect(dialog.message()).toBe('Are you sure you want to delete?');
                await dialog.accept();
            });

            const smartTable = page.getByRole('table');
            const targetRow = smartTable.locator('tr', { hasText: 'mdo@gmail.com' });
            const deleteButton = targetRow.locator('.nb-trash');

            await deleteButton.click();
            await expect(page.locator('table tr', { hasText: 'mdo@gmail.com' })).toHaveCount(0);
        });
    });

    test('Handling web tables', async ({ page }) => {
        // Navigate to Smart Table
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();

        // Update age by email
        const targetRowByName = page.getByRole('row', { name: 'sevan@outlook.com' });
        await targetRowByName.locator('.nb-edit').click();
        await updateAge(page, "25");

        // Navigate to page 2 and update customer details
        await page.locator('ng2-smart-table-pager').getByText('2').click();

        // Update customer age
        await updateCustomerByID(page, "11");
        await updateAge(page, "20");

        // Update customer email
        await updateCustomerByID(page, "11");
        await updateEmail(page, "Test01@test.com");

        async function updateCustomerByID(page, id) {
            const targetRowByID = page.getByRole('row', { name: id })
                .filter({ has: page.locator('td').nth(1).getByText(id) });
            await targetRowByID.locator('.nb-edit').click();
        }

        async function updateAge(page, age) {
            const ageInput = page.locator('input-editor').getByPlaceholder('Age');
            await ageInput.clear();
            await ageInput.fill(age);
            await page.locator('.nb-checkmark').click();
        }

        async function updateEmail(page, email) {
            const emailInput = page.locator('input-editor').getByPlaceholder('E-mail');
            await emailInput.clear();
            await emailInput.fill(email);
            await page.locator('.nb-checkmark').click();
        }
    });


    test('Handling Web Tables - Search customer by Age', async ({ page }) => {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();

        //Task to search customer by age with different values and check if it return the correct values
        const searchAgeInput = page.locator('input-filter').getByPlaceholder('Age');
        const ageToSearch = [20, 30, 40, 200];

        for (const age of ageToSearch) {
            await searchAgeInput.fill(age.toString());
            await page.waitForTimeout(500);

            const ageCellValue = page.locator('table tbody tr td:last-child');
            for (const cell of await ageCellValue.all()) {

                if (age === 200) {
                    await expect(page.locator('table tbody tr')).toHaveCount(1);
                    continue;
                }
                else {
                    await expect(cell).toHaveText(age.toString());
                }

            }
        }

    });



    test('Handling Date Picker @regression', async ({ page }) => {
        await page.getByTitle('Forms').click();
        await page.getByTitle('Datepicker').click();

        const datePicketInput = page.getByPlaceholder('Form Picker');
        await datePicketInput.click();

        // Function to select any future date
        async function selectFutureDate(daysInFuture: number) {
            const date = new Date();
            date.setDate(date.getDate() + daysInFuture);
            
            const targetDay = date.getDate();
            const targetMonthShort = date.toLocaleString('default', { month: 'short' });
             const targetMonthLong = date.toLocaleString('default', { month: 'long' });
            const targetYear = date.getFullYear();
            const expectedDate = `${targetMonthShort} ${targetDay}, ${targetYear}`;

            await datePicketInput.click();

            let currentMonthYear = await page.locator('nb-calendar-view-mode').textContent() || '';
            const expectedMonthYear = `${targetMonthLong} ${targetYear}`;

            // Navigate to target month/year
            while (!currentMonthYear.includes(expectedMonthYear)) {
                await page.locator('[data-name="chevron-right"]').click();
                currentMonthYear = await page.locator('nb-calendar-view-mode').textContent() || '';
            }

            // Select the target day
            await page.locator('[class="day-cell ng-star-inserted"]')
                      .getByText(targetDay.toString(), { exact: true })
                      .click();

            await expect(datePicketInput).toHaveValue(expectedDate);
        }

        // Select date 30 days in future
        await selectFutureDate(30);

        // Select date 90 days in future 
        await selectFutureDate(90);

        // Select date 180 days in future
        await selectFutureDate(180);
});

});