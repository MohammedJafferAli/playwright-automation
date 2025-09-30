import { Page } from "playwright";

export class FormsLayoutPage {

    private readonly page: Page;
    
    
    constructor(page: Page) {
        this.page = page;
        
    }

    async submitFormUsingTheGrid(email : string, password: string, optionText: string){
        const usingTheGrid = this.page.locator('nb-card',{hasText:'Using the Grid'});
        await usingTheGrid.getByRole('textbox',{name:"Email"}).fill(email);
        await usingTheGrid.getByPlaceholder('Password').fill(password);
        await usingTheGrid.getByRole('radio',{name:optionText}).check({force:true});
        await usingTheGrid.getByRole('button',{name:"Sign in"}).click();
    }

    async submitInlineForm(email : string, password: string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card',{hasText:'Inline form'});
        await inlineForm.getByPlaceholder('Jane Doe').fill(email);
        await inlineForm.getByPlaceholder('Email').fill(password);
        if(rememberMe){
            await inlineForm.getByRole('checkbox',{name:"Remember me"}).check({force:true});
        }
        await inlineForm.getByRole('button',{name:"Submit"}).click();
    }
}