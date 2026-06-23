import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productsArea: Locator;
  readonly product: {
    item: Locator;
    name: Locator;
  };
  
  constructor(page: Page) {
    this.page = page;
    this.productsArea = page.getByTestId('inventory-container');
    this.product = {
      item: page.getByTestId('inventory-item'),
      name: page.getByTestId('inventory-item-name'),
    };
  }

  async waitForPageToBeVisible() {
    await expect(this.productsArea, 'ProductsPage - Products area was not visible').toBeVisible();
    await expect(
      this.product.item.first(),
      'ProductsPage - First product item was not visible'
    ).toBeVisible({ timeout: 90000 });
  }

  async goToProductPage(productName: string) {
    const productLink = this.product.name.filter({ hasText: productName }).first();
    await productLink.click();
  }
}
