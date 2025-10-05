import { test } from "../../page-objects/testOptions";
import { faker } from '@faker-js/faker';
import { PageManager } from "../../page-objects/pageManager";

test('Use custom fixtures', async ({ pageManager }) => {
    
        await pageManager.onFormsLayoutPage().submitInlineForm(faker.person.firstName(), faker.internet.email(), true);
        await pageManager.onFormsLayoutPage().submitFormUsingTheGrid(faker.internet.email(), faker.internet.password(), "Option 2");
   
});
