import { Selector } from 'testcafe';

class GettingStartedPage {
    /** Verify the Getting Started page is visible */
    async isPageVisible(testController) {
        const header = Selector('.getting-started-container');
        await testController.expect(header.exists).ok('Getting Started page is not visible');
    }

    /** Verify the subtitle is correct */
    async verifySubtitle(testController, expectedSubtitle) {
        const subtitle = Selector('p.getting-started-subtitle').withText(expectedSubtitle);
        await testController.expect(subtitle.exists).ok('Subtitle is missing or incorrect');
    }

    /** Verify the list item and link navigation */
    async verifyListItemNavigation(testController, listItemText, expectedUrl) {
        const listItem = Selector('li.getting-started-list-item').withText(listItemText);
        const link = listItem.find('a.getting-started-link');

        await testController
            .expect(listItem.exists).ok(`List item "${listItemText}" is missing`)
            .click(link)
            .expect(Selector('h1').withText(expectedUrl).exists) // Adjust to expected content on target page
            .ok(`Navigation failed for link: "${listItemText}"`);
    }
}

export const gettingStartedPage = new GettingStartedPage();
