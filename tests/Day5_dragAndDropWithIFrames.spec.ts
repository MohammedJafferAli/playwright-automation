import { expect, test } from "@playwright/test";

test.describe("Automate drag and drop with IFrames", () => {


    test.beforeEach("Handling IFrames and Drag and Drop", async ({ page }) => {

        page.goto("https://www.globalsqa.com/demo-site/");
        await page.setViewportSize({ width: 1920, height: 1080 });

        test("Drag and Drop with IFrames", async ({ page }) => {
            await page.getByText("DragAndDrop").click();
        });

    });

});