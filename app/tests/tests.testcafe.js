import { landingPage } from './pages/landing.page';
import { signinPage } from './pages/signin.page';
//import { signupPage } from './pages/signup.page';
import { signoutPage } from './pages/signout.page';
import { termsPage } from './pages/termspage.page';
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
  await landingPage.isDisplayed(testController);
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
test('Verify "Contact Us" and "Learn More" links are working', async t => {
  await navBar.verifyLinks(t);
});

/** Footer Tests */
test('Verify footer is visible and contains expected content', async t => {
  await footer.isFooterVisible(t);
  await footer.isLogoVisible(t);
  await footer.verifyCopyrightText(t, '© 2024 MyAIRealtor. All Rights Reserved.');
});

test('Verify footer links navigate correctly', async t => {
  await footer.verifyFooterLink(t, 'Terms of Service', '/terms');
  await footer.verifyFooterLink(t, 'About Us', '/about');
  await footer.verifyFooterLink(t, 'FAQs', '/learnmore');
});

/** Learn More Page Tests*/

test('Verify Learn More page content', async t => {
  await learnMorePage.isPageVisible(t);
});

/** Getting Started Page Tests*/

test('Verify Getting Started page content', async t => {
  await gettingStartedPage.isPageVisible(t);
  await gettingStartedPage.verifySubtitle(t, 'What step in your buying process are you at?');
});

test('Verify Getting Started page links', async t => {
  await gettingStartedPage.verifyListItemNavigation(
      t,
      '1. I know what house I want and need to come up with comp prices and an offer',
      '/step1'
  );

  await gettingStartedPage.verifyListItemNavigation(
      t,
      '2. I know what house I want and just need help with the offer',
      '/step2'
  );

  await gettingStartedPage.verifyListItemNavigation(
      t,
      '3. I got my offer on a house accepted already and need help with remaining steps',
      '/step3'
  );

  await gettingStartedPage.verifyListItemNavigation(
      t,
      '4. I got my offer rejected and need help with what to do next.',
      '/step4'
  );

  await gettingStartedPage.verifyListItemNavigation(
      t,
      '5. I have bought the home. I need help with what to do next.',
      '/step5'
  );
});

/**Terms Page Tests */

test('Verify Terms and Conditions page content', async t => {
  await termsPage.isPageVisible(t);
});

/**Address Page Tests */

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