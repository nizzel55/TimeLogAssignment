import { test, expect } from '../fixtures';

test.describe('Checkout product', () => {
  // Test constants
  const productName = 'Sauce Labs Backpack';
  let productPrice: number;
  const firstName = 'John';
  const lastName = 'Doe';
  const zipCode = '12345';
  const paymentInfo = 'SauceCard #31337';
  const shippingInfo = 'Free Pony Express Delivery!';
  const taxRate = 0.08; // 8% tax rate

  test('Add product to cart and proceed to checkout', async ({
    loginPage,
    productsPage,
    productPage,
    toolbarPage,
    yourCartPage,
    checkoutPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {

    await test.step('Open Swag Labs saucedemo', async () => {
      await loginPage.open();
      await loginPage.waitForPageToBeVisible();
    });

    await test.step('Log in user and redirect to products page', async () => {
      await loginPage.loginUser(process.env.STANDARD_USER!, process.env.PASSWORD!);
      await productsPage.waitForPageToBeVisible();
    });

    await test.step('Navigate to product page', async () => {
      await productsPage.goToProductPage(productName);
      await productPage.waitForPageToBeVisible();
      const productNameText = await productPage.getProductNameText();
      expect(productNameText, `Product name did not match: '${productName}'`)
        .toContain(productName);
    });

    await test.step('Add product to cart', async () => {
      await productPage.addProductToCart();
      await productPage.waitForProductToBeAddedToCart();
      await toolbarPage.waitForShoppingCartBadgeToHaveCount(1);
      productPrice = await productPage.getProductPrice();
      console.log(`Product cost: ${productPrice}`);
    });

    await test.step('Navigate to your cart page', async () => {
      await toolbarPage.goToYourCartPage();
      await yourCartPage.waitForPageToBeVisible();
      const productNameText = await yourCartPage.getProductNameText();
      expect(productNameText, `Product name did not match: '${productName}'`)
        .toContain(productName);
      const getProductPriceForProduct = await yourCartPage.getProductPriceForProduct(productName);
      console.log(`Product cost in cart: ${getProductPriceForProduct}`);
      expect(getProductPriceForProduct, `Product cost in cart did not match: '${productPrice}'`)
        .toBe(productPrice);
    });

    await test.step('Navigate to checkout page', async () => {
      await yourCartPage.goToCheckoutPage();
      await checkoutPage.waitForPageToBeVisible();
    });

    await test.step('Fill in user information and navigate to checkout overview page', async () => {
      await checkoutPage.setFirstName(firstName);
      await checkoutPage.setLastName(lastName);
      await checkoutPage.setZipCode(zipCode);
      await checkoutPage.goToOverviewPage();
      await checkoutOverviewPage.waitForPageToBeVisible();
    });

    await test.step('Verify checkout overview information', async () => {
      const productNameText = await checkoutOverviewPage.getProductNameText();
      expect(productNameText, `Product name did not match: '${productName}'`).toContain(productName);
      const paymentInfoValue = await checkoutOverviewPage.getPaymentInfoValue();
      expect(paymentInfoValue, `Payment information did not match: '${paymentInfo}'`).toContain(paymentInfo);
      const shippingInfoValue = await checkoutOverviewPage.getShippingInfoValue();
      expect(shippingInfoValue, `Shipping information did not match: '${shippingInfo}'`).toContain(shippingInfo);
      const subtotalValue = await checkoutOverviewPage.getSubtotalValue();
      expect(subtotalValue, `Subtotal value did not match: '${productPrice}'`).toContain(productPrice.toFixed(2));
      const taxValue = await checkoutOverviewPage.getTaxValue();
      const expectedTax = (productPrice * taxRate).toFixed(2);
      expect(taxValue, `Tax value did not match: '${expectedTax}'`).toContain(expectedTax);
      const totalValue = await checkoutOverviewPage.getTotalValue();
      const expectedTotal = (productPrice * (1 + taxRate)).toFixed(2);
      expect(totalValue, `Total value did not match: '${expectedTotal}'`).toContain(expectedTotal);
    });

    await test.step('Navigate to complete checkout page', async () => {
      await checkoutOverviewPage.goToCheckoutCompletePage();
      await checkoutCompletePage.waitForPageToBeVisible();
    });

    await test.step('Navigate back to products page', async () => {
      await checkoutCompletePage.goToProductsPage();
      await productsPage.waitForPageToBeVisible();
      await toolbarPage.waitForShoppingCartBadgeToBeGone();
    });

    await test.step('Logout user', async () => {
      await toolbarPage.logoutUser();
      await loginPage.waitForPageToBeVisible();
    });
  });
});
