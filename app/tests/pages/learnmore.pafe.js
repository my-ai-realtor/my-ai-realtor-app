import { Selector } from 'testcafe';

class LearnMorePage {
    /** Verify the Learn More page is visible */
    async isPageVisible(testController) {
        const header = Selector('h1').withText('Learn More About MyAIRealtor');
        await testController.expect(header.exists).ok('Learn More page header is not visible');
    }

    /** Verify a specific section exists with the correct header */
    async verifySection(testController, sectionHeader, sectionContent) {
        const section = Selector('h2').withText(sectionHeader);
        const content = Selector('p, ul, ol').withText(sectionContent);

        await testController
            .expect(section.exists).ok(`Section with header "${sectionHeader}" is missing`)
            .expect(content.exists).ok(`Content under section "${sectionHeader}" is missing`);
    }

    /** Verify an ordered or unordered list under a section */
    async verifyListItems(testController, listItems) {
        for (const item of listItems) {
            const listItem = Selector('li').withText(item);
            await testController.expect(listItem.exists).ok(`List item "${item}" is missing`);
        }
    }
}

export const learnMorePage = new LearnMorePage();
