import { Selector } from 'testcafe';

class GetAddressPage {
    /** Verify the Get Address page is visible */
    async isPageVisible(testController) {
        const header = Selector('h2').withText('Please enter address you want to make offer');
        await testController.expect(header.exists).ok('Get Address page is not visible');
    }

    /** Verify the presence of the address input field */
    async isAddressFieldVisible(testController) {
        const addressField = Selector('input[name="address"]');
        await testController.expect(addressField.exists).ok('Address input field is missing');
    }

    /** Submit the form with the provided address */
    async submitForm(testController, address) {
        const addressField = Selector('input[name="address"]');
        const submitButton = Selector('input[type="submit"]');

        await testController
            .typeText(addressField, address)
            .click(submitButton);
    }

    /** Verify validation error when the address field is empty */
    async verifyValidationError(testController) {
        const submitButton = Selector('input[type="submit"]');
        const errorMessage = Selector('.form-text.text-danger'); // Adjust if your error class is different

        await testController
            .click(submitButton)
            .expect(errorMessage.exists).ok('Validation error message is not displayed when address is empty');
    }
}

export const getAddressPage = new GetAddressPage();
