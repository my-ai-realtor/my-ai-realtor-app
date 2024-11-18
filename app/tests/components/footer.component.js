import { Selector } from 'testcafe';

class Footer {
    /** Verify the footer is visible */
    async isFooterVisible(testController) {
        const footer = Selector('.footer-container');
        await testController.expect(footer.exists).ok('Footer is not visible');
    }

    /** Verify the logo is visible */
    async isLogoVisible(testController) {
        const logo = Selector('#Logo');
        await testController.expect(logo.exists).ok('Logo is not visible in the footer');
    }

    /** Verify footer links navigate correctly */
    async verifyFooterLink(testController, linkText, expectedUrl) {
        const link = Selector('a.footer-link-button').withText(linkText);
        await testController
            .expect(link.exists).ok(`Footer link with text "${linkText}" is missing`)
            .click(link)
            .expect(Selector('h1').withText(expectedUrl).exists) // Adjust to the expected content on the target page
            .ok(`Navigation failed for link: ${linkText}`);
    }

    /** Verify footer text contains expected copyright */
    async verifyCopyrightText(testController, expectedText) {
        const copyrightText = Selector('p').withText(expectedText);
        await testController.expect(copyrightText.exists).ok('Copyright text is missing or incorrect in the footer');
    }
}

export const footer = new Footer();
