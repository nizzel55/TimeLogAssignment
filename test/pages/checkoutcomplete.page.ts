import { expect, type Locator, type Page } from '@playwright/test';
import { InputHelper } from '../helpers/input.helper';

export class CheckoutCompletePage {
  readonly inputHelper: InputHelper;
  readonly page: Page;
  readonly checkoutCompleteContainer: Locator;
  readonly successImage: Locator;
  readonly backToHomeButton: Locator;
  
  constructor(page: Page) {
    this.inputHelper = new InputHelper(page);
    this.page = page;
    this.checkoutCompleteContainer = page.getByTestId('checkout-complete-container');
    this.successImage = page.getByTestId('pony-express');
    this.backToHomeButton = page.getByTestId('back-to-products');
  }

  async waitForPageToBeVisible() {
    await expect(this.checkoutCompleteContainer, 'CheckoutCompletePage - Checkout complete container was not visible').toBeVisible();
    await expect(this.successImage, 'CheckoutCompletePage - Success image was not visible').toBeVisible();
  }

  async goToProductsPage() {
    await expect(this.backToHomeButton, 'CheckoutCompletePage - Back to products button was not visible').toBeVisible();
    await this.backToHomeButton.click();
  }
}
