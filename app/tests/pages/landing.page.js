import { Selector } from 'testcafe';

class LandingPage {
    /** Verify the landing page is visible */
    async isLandingPageVisible(testController) {
        const landingPage = Selector('#landing-page');
        await testController.expect(landingPage.exists).ok('Landing page is not visible');
    }

    /** Verify the header title is correct */
    async verifyHeaderTitle(testController, expectedTitle) {
        const headerTitle = Selector('h1.header-title').withText(expectedTitle);
        await testController.expect(headerTitle.exists).ok(`Header title "${expectedTitle}" is not visible`);
    }

    /** Verify the description text is correct */
    async verifyDescriptionText(testController, expectedText) {
        const descriptionText = Selector('p').withText(expectedText);
        await testController.expect(descriptionText.exists).ok(`Description text is missing or incorrect`);
    }

    /** Verify the "Get Started" button navigates correctly */
    async verifyGetStartedButton(testController, expectedUrl) {
        const getStartedButton = Selector('a').withText('Get Started');
        await testController
            .expect(getStartedButton.exists).ok('Get Started button is missing')
            .click(getStartedButton)
            .expect(Selector('h1').withText(expectedUrl).exists) // Replace with specific content on the target page
            .ok('Navigation failed for "Get Started" button');
    }

    /** Verify the "Learn More" button action */
    async verifyLearnMoreButton(testController) {
        const learnMoreButton = Selector('button').withText('Learn More');
        await testController
            .expect(learnMoreButton.exists).ok('Learn More button is missing')
            .click(learnMoreButton)
            // Verify the intended behavior or outcome of the button click
            .expect(Selector('.some-content').exists) // Adjust to the actual content rendered
            .ok('Expected content after clicking Learn More button is missing');
    }
}

export const landingPage = new LandingPage();
