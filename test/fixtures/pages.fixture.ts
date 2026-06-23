import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { ProductPage } from '../pages/product.page';
import { ToolbarPage } from '../pages/toolbar.page';
import { YourCartPage } from '../pages/yourcart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { CheckoutOverviewPage } from '../pages/checkoutoverview.page';
import { CheckoutCompletePage } from '../pages/checkoutcomplete.page';

type PageFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  productPage: ProductPage;
  toolbarPage: ToolbarPage;
  yourCartPage: YourCartPage;
  checkoutPage: CheckoutPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
};

export const test = baseTest.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  toolbarPage: async ({ page }, use) => {
    const toolbarPage = new ToolbarPage(page);
    await use(toolbarPage);
  },

  yourCartPage: async ({ page }, use) => {
    const yourCartPage = new YourCartPage(page);
    await use(yourCartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  checkoutOverviewPage: async ({ page }, use) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await use(checkoutOverviewPage);
  },

  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  },
});

export { expect } from '@playwright/test';
