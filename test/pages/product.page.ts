import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('inventory-item-name');
    this.productPrice = page.getByTestId('inventory-item-price');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.removeButton = page.getByTestId('remove');
  }

  async waitForPageToBeVisible() {
    await expect(this.productName, 'ProductPage - Product name was not visible').toBeVisible();
    await expect(this.productPrice, 'ProductPage - Product price was not visible').toBeVisible();
  }

  async getProductNameText() {
    await expect(
      this.productName,
      'ProductPage - Product name was not visible'
    ).toBeVisible();
    
    const productName = await this.productName.textContent();
    console.log(`Product name text: ${productName}`);
    return productName || '';
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async waitForProductToBeAddedToCart() {
    await expect(this.removeButton, 'ProductPage - Remove button was not visible after adding product to cart').toBeVisible();
  }

  async getProductPrice(): Promise<number> {
    await expect(
      this.productPrice,
      'ProductPage - Product price was not visible'
    ).toBeVisible();
    
    const priceText = await this.productPrice.textContent();
    console.log(`Product price text: ${priceText}`);
    
    if (!priceText) {
      throw new Error('Product price text was empty or null');
    }
    
    const price = parseFloat(priceText.replace('$', ''));
    
    if (isNaN(price)) {
      throw new Error(`Failed to parse product price from text: '${priceText}'`);
    }
    
    return price;
  }
}
