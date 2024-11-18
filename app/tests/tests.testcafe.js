import { landingPage } from './pages/landing.page';
import { signinPage } from './pages/signin.page';
//import { signupPage } from './pages/signup.page';
import { signoutPage } from './pages/signout.page';
import { learnMorePage } from './pages/learnmore.page';
import { gettingStartedPage } from './pages/gettingstarted.page';
import { termsPage } from './pages/terms.page';
import { getAddressPage } from './pages/getaddress.page';


import { navBar } from './components/navbar.component';
//import { chatBox } from './chatbox.component';
import { footer } from './components/footer.component';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

/** Landing Page Tests */

test('Test that landing page shows up', async (testController) => {
  await landingPage.isLandingPageVisible(testController);
});

/** Sign in, Sign out, and Sign up Tests*/

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
/** NavBar Tests */
/*
test('Verify "Contact Us" and "Learn More" links are working', async t => {
  await navBar.verifyLinks(t);
});
*/
/** Footer Tests */
test('Verify footer is visible and contains expected content', async t => {
  await footer.isFooterVisible(t);
  await footer.isLogoVisible(t);
});
/* 
test('Verify footer links navigate correctly', async t => {
  await footer.verifyFooterLink(t, 'Terms of Service', '/terms');
  await footer.verifyFooterLink(t, 'About Us', '/about');
  await footer.verifyFooterLink(t, 'FAQs', '/learnmore');
});
*/
/** Learn More Page Tests*/

test('Verify Learn More page content', async t => {
  await footer.verifyFooterLink(t, 'FAQs', '/learnmore');
  await learnMorePage.isPageVisible(t);
});

/** Getting Started Page Tests*/

test('Verify Getting Started page content', async t => {
  await t.click('#nav-logo')
  await landingPage.verifyGetStartedButton(t)
  await gettingStartedPage.isPageVisible(t);
});

/**Terms Page Tests */

test('Verify Terms and Conditions page content', async t => {
  await footer.verifyFooterLink(t, 'Terms of Service');
  await termsPage.isPageVisible(t);
});

/**Address Page Tests */
/*
test('Verify Get Address page content', async t => {
  await getAddressPage.isPageVisible(t);
  await getAddressPage.isAddressFieldVisible(t);
});

test('Verify address input validation', async t => {
  await getAddressPage.verifyValidationError(t);
});

test('Submit the form with valid address', async t => {
  const address = '123 Main St, Anytown, USA';
  await getAddressPage.submitForm(t, address);

  // Add assertion for expected behavior upon successful submission
  // Example: Check if a success message is displayed or navigation occurs
  const successMessage = Selector('p').withText('Form submitted successfully'); // Adjust to your app's behavior
  await t.expect(successMessage.exists).ok('Success message not displayed after form submission');
});
*/