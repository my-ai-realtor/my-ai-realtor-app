import { Selector } from 'testcafe';

class TermsPage {
    /** Verify the Terms page is visible */
    async isPageVisible(testController) {
        const header = Selector('.terms-container');
        await testController.expect(header.exists).ok('Terms and Conditions page header is not visible');
    }

    /** Verify the presence of a section with specific text */
    async verifySection(testController, sectionHeader, sectionContent) {
        const header = Selector('h2.terms-subtitle').withText(sectionHeader);
        const content = Selector('p.terms-text').withText(sectionContent);

        await testController
            .expect(header.exists).ok(`Section header "${sectionHeader}" is missing`)
            .expect(content.exists).ok(`Content under section "${sectionHeader}" is missing or incorrect`);
    }

    /** Verify specific text exists in the Terms page */
    async verifyText(testController, text) {
        const paragraph = Selector('p.terms-text').withText(text);
        await testController.expect(paragraph.exists).ok(`The text "${text}" is missing or incorrect`);
    }
}

export const termsPage = new TermsPage();
