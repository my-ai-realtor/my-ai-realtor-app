import { Selector } from 'testcafe';

class NavBar {
    /** Ensure the user is logged out before performing actions */
    async ensureLogout(testController) {
        const loggedInUser = await Selector('#navbar-current-user').exists;
        if (loggedInUser) {
            await testController.click('#navbar-current-user');
            await testController.click('#navbar-sign-out');
        }
    }

    /** Navigate to the sign-in page */
    async gotoSignInPage(testController) {
        await this.ensureLogout(testController);
        const visible = await Selector('#basic-navbar-nav').visible;
        if (!visible) {
            await testController.click('button.navbar-toggler');
        }
        await testController.click('#login-dropdown');
        await testController.click('#login-dropdown-sign-in');
    }

    /** Navigate to the sign-up page */
    async gotoSignUpPage(testController) {
        await this.ensureLogout(testController);
        const visible = await Selector('#basic-navbar-nav').visible;
        if (!visible) {
            await testController.click('button.navbar-toggler');
        }
        await testController.click('#login-dropdown');
        await testController.click('#login-dropdown-sign-up');
    }

    /** Verify the logged-in user */
    async isLoggedIn(testController, username) {
        const visible = await Selector('#basic-navbar-nav').visible;
        if (!visible) {
            await testController.click('button.navbar-toggler');
        }
        const loggedInUser = Selector('#navbar-current-user').innerText;
        await testController.expect(loggedInUser).eql(username);
    }

    /** Log out the user */
    async logout(testController) {
        const visible = await Selector('#basic-navbar-nav').visible;
        if (!visible) {
            await testController.click('button.navbar-toggler');
        }
        await testController.expect(Selector('#navbar-current-user').exists).ok();
        await testController.click('#navbar-current-user');
        await testController.click('#navbar-sign-out');
    }

    /** Navigate to the admin page (if user has admin role) */
    async gotoAdminPage(testController) {
        const visible = await Selector('#basic-navbar-nav').visible;
        if (!visible) {
            await testController.click('button.navbar-toggler');
        }
        await testController.click('#list-stuff-admin-nav');
    }

    /** Verify "Contact Us" and "Learn More" links work */
    async verifyLinks(testController) {
        const visible = await Selector('#basic-navbar-nav').visible;
        if (!visible) {
            await testController.click('button.navbar-toggler');
        }

        // Verify "Learn More" link
        await testController
            .click('#learn-more-nav')
            .expect(Selector('h1').withText('Learn More').exists).ok('Learn More page did not load');

        // Verify "Contact Us" link
        await testController
            .click('#contact-us-nav')
            .expect(Selector('h1').withText('Contact Us').exists).ok('Contact Us page did not load');
    }
}

export const navBar = new NavBar();
