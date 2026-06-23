import { expect, Locator, Page } from '@playwright/test';

export class YourCartPage {
  readonly page: Page;
  readonly product: {
    item: Locator;
    name: Locator;
  };
  readonly checkoutButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.product = {
      item: page.getByTestId('inventory-item'),
      name: page.getByTestId('inventory-item-name'),
    };
    this.checkoutButton = page.getByTestId('checkout');
  }

  async waitForPageToBeVisible() {
    await expect(
      this.product.item.first(),
      'YourCartPage - First product item was not visible'
    ).toBeVisible({ timeout: 90000 });
  }

  async getProductNameText() {
    await expect(
      this.product.name.first(),
      'YourCartPage - Product name was not visible'
    ).toBeVisible();
    
    const productName = await this.product.name.first().textContent();
    console.log(`YourCartPage - Product name text: ${productName}`);
    return productName || '';
  }

  async getProductPriceForProduct(productName: string): Promise<number> {
    const productItem = this.product.item.filter({ hasText: productName }).first();
    const productPriceLocator = productItem.getByTestId('inventory-item-price');
    
    await expect(
      productPriceLocator,
      `YourCartPage - Product price for '${productName}' was not visible`
    ).toBeVisible();
    
    const priceText = await productPriceLocator.textContent();
    console.log(`YourCartPage - Product price text for '${productName}': ${priceText}`);
    
    if (!priceText) {
      throw new Error(`YourCartPage - Product price text for '${productName}' was empty or null`);
    }
    
    const price = parseFloat(priceText.replace('$', ''));
    
    if (isNaN(price)) {
      throw new Error(`YourCartPage - Failed to parse product price from text: '${priceText}' for product '${productName}'`);
    }
    
    return price;
  }

  async goToCheckoutPage() {
    await this.checkoutButton.click();
  }
}
