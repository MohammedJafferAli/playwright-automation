import { Page } from "playwright";
import { HelperBase } from "./helperBase";

export class FormsLayoutPage extends HelperBase {
    constructor(page: Page) {
        super(page);
    }

    async submitFormUsingTheGrid(email: string, password: string, optionText: string, testInfo?: any) {
        const usingTheGrid = this.page.locator('nb-card', { hasText: 'Using the Grid' });
        await usingTheGrid.getByRole('textbox', { name: "Email" }).fill(email);
        await usingTheGrid.getByPlaceholder('Password').fill(password);
        const radioButton = usingTheGrid.getByRole('radio', { name: optionText });
        await radioButton.check({ force: true });
        await usingTheGrid.getByRole('button', { name: "Sign in" }).click();
    }

    private isMobileBrowser(testInfo?: any): boolean {
        if (!testInfo) return false;
        return testInfo.project.name?.includes('Mobile') ||
            testInfo.project.name?.includes('iPhone') ||
            testInfo.project.name?.includes('Pixel') || false;
    }

    async submitInlineForm(email: string, password: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' });
        await inlineForm.getByPlaceholder('Jane Doe').fill(email);
        await inlineForm.getByPlaceholder('Email').fill(password);
        if (rememberMe) {
            await inlineForm.getByRole('checkbox', { name: "Remember me" }).check({ force: true });
        }
        await inlineForm.getByRole('button', { name: "Submit" }).click();
    }
}