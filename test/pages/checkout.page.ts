import { expect, type Locator, type Page } from '@playwright/test';
import { InputHelper } from '../helpers/input.helper';

export class CheckoutPage {
  readonly inputHelper: InputHelper;
  readonly page: Page;
  readonly checkoutContainer: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  
  constructor(page: Page) {
    this.inputHelper = new InputHelper(page);
    this.page = page;
    this.checkoutContainer = page.getByTestId('checkout-info-container');
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.zipCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
  }

  async waitForPageToBeVisible() {
    await expect(this.checkoutContainer, 'CheckoutPage - Checkout container was not visible').toBeVisible();
  }

  async setFirstName(firstName: string) {
    if (!firstName.trim()) {
      throw new Error('First name is required but not provided or is empty');
    }
    await this.inputHelper.fill(this.firstNameInput, firstName, `CheckoutPage - First name '${firstName}'`);
  }

  async setLastName(lastName: string) {
    if (!lastName.trim()) {
      throw new Error('Last name is required but not provided or is empty');
    }
    await this.inputHelper.fill(this.lastNameInput, lastName, `CheckoutPage - Last name '${lastName}'`);
  }

  async setZipCode(zipCode: string) {
    if (!zipCode.trim()) {
      throw new Error('Zip code is required but not provided or is empty');
    }
    await this.inputHelper.fill(this.zipCodeInput, zipCode, `CheckoutPage - Zip code '${zipCode}'`);
  }

  async goToOverviewPage() {
    await this.continueButton.click();
  }
}
