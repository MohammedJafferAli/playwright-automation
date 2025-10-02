import { expect, test } from "@playwright/test";

test.describe("Automate drag and drop with IFrames", () => {

    test.beforeEach("Handling IFrames and Drag and Drop", async ({ page }) => {
        await page.goto("https://www.globalsqa.com/demo-site/");
        await page.setViewportSize({ width: 1920, height: 1080 });
    });

    test("Drag and Drop with IFrames", async ({ page }) => {
        await page.getByText("DragAndDrop").click();

        // Get iframe locators
        const acceptedElementsIframe = page.frameLocator('[src*="accepted-elements.html"]');
        const photoManagerIframe = page.frameLocator('[src*="photo-manager.html"]');

        // Get draggable elements from photo manager iframe
        const draggableitem1 = photoManagerIframe.locator("li:has-text('High Tatras 2')");
        const draggableitem2 = photoManagerIframe.locator("li:has-text('High Tatras 4')");

        // Get drop target
        const dropDownArea = photoManagerIframe.locator("#trash");

        // Perform drag and drop actions
        await draggableitem1.dragTo(dropDownArea);
        await draggableitem2.dragTo(dropDownArea);

        await page.waitForTimeout(3000);

        // Verify elements were dropped successfully
        await expect(dropDownArea.locator("li:has-text('High Tatras 2')")).toBeVisible();
        await expect(dropDownArea.locator("li:has-text('High Tatras 4')")).toBeVisible();
    });

    test("Drag and Drop with IFrames - part 2", async ({ page }) => {
        await page.getByText("DragAndDrop").click();

        // Get iframe locators
        const photoManagerIframe = page.frameLocator('[src*="photo-manager.html"]');

         // Get draggable elements and drop target
        const dropDownArea = photoManagerIframe.locator("#trash");

        // Reusable function to perform drag and drop and verify
        async function dragAndDropItems(photoManagerIframe: any, itemTexts: string[], dropTarget: any) {
            for (const text of itemTexts) {
                const draggableItem = photoManagerIframe.locator(`li:has-text('${text}')`);
                await draggableItem.dragTo(dropTarget);
            }
            await expect(dropTarget.locator("li")).toHaveCount(itemTexts.length);
        }

        // Perform drag and drop with verification
        await dragAndDropItems(photoManagerIframe, ['High Tatras 2', 'High Tatras 4'], dropDownArea);

        await page.waitForTimeout(3000);

    });


});
