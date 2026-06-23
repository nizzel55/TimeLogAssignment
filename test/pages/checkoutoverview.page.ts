import { expect, Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly product: {
    item: Locator;
    name: Locator;
  };
  readonly paymentInfoValue: Locator;
  readonly shippingInfoValue: Locator;
  readonly subtotalValue: Locator;
  readonly taxValue: Locator;
  readonly totalValue: Locator;
  readonly finishButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.product = {
      item: page.getByTestId('inventory-item'),
      name: page.getByTestId('inventory-item-name'),
    };
    this.paymentInfoValue = page.getByTestId('payment-info-value');
    this.shippingInfoValue = page.getByTestId('shipping-info-value');
    this.subtotalValue = page.getByTestId('subtotal-label');
    this.taxValue = page.getByTestId('tax-label');
    this.totalValue = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
  }

  async waitForPageToBeVisible() {
    await expect(
      this.product.item.first(),
      'CheckoutOverviewPage - First product item was not visible'
    ).toBeVisible({ timeout: 90000 });
    await expect(
      this.paymentInfoValue,
      'CheckoutOverviewPage - Payment info value was not visible'
    ).toBeVisible();
  }

  async getProductNameText() {
    await expect(
      this.product.name.first(),
      'CheckoutOverviewPage - Product name was not visible'
    ).toBeVisible();
    
    const productName = await this.product.name.first().textContent();
    console.log(`CheckoutOverviewPage - Product name text: ${productName}`);
    return productName || '';
  }

  async getPaymentInfoValue () {
    await expect(
      this.paymentInfoValue,
      'CheckoutOverviewPage - Payment info value was not visible'
    ).toBeVisible();
    
    const paymentInfo = await this.paymentInfoValue.textContent();
    console.log(`CheckoutOverviewPage - Payment info value: ${paymentInfo}`);
    return paymentInfo || '';
  }

  async getShippingInfoValue() {
    await expect(
      this.shippingInfoValue,
      'CheckoutOverviewPage - Shipping info value was not visible'
    ).toBeVisible();
    
    const shippingInfo = await this.shippingInfoValue.textContent();
    console.log(`CheckoutOverviewPage - Shipping info value: ${shippingInfo}`);
    return shippingInfo || '';
  }

  async getSubtotalValue() {
    await expect(
      this.subtotalValue,
      'CheckoutOverviewPage - Subtotal value was not visible'
    ).toBeVisible();
    const subtotal = await this.subtotalValue.textContent();
    console.log(`CheckoutOverviewPage - Subtotal value: ${subtotal}`);
    return subtotal || '';
  }

  async getTaxValue() {
    await expect(
      this.taxValue,
      'CheckoutOverviewPage - Tax value was not visible'
    ).toBeVisible();
    
    const tax = await this.taxValue.textContent();
    console.log(`CheckoutOverviewPage - Tax value: ${tax}`);
    return tax || '';
  }

  async getTotalValue() {
    await expect(
      this.totalValue,
      'CheckoutOverviewPage - Total value was not visible'
    ).toBeVisible();
    
    const total = await this.totalValue.textContent();
    console.log(`CheckoutOverviewPage - Total value: ${total}`);
    return total || '';
  }

  async goToCheckoutCompletePage() {
    await expect(
      this.finishButton,
      'CheckoutOverviewPage - Finish button was not visible'
    ).toBeVisible();
    
    await this.finishButton.click();
  }
}
