import { expect, Locator, Page } from '@playwright/test';

export class ToolbarPage {
  readonly page: Page;
  readonly sideBarMenuButton: Locator;
  readonly sideBarMenuWrap: {
    menu: Locator;
    logoutButton: Locator;
  };
  readonly shoppingCart: Locator;
  readonly shoppingCartBadge: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.sideBarMenuButton = page.locator('#react-burger-menu-btn');
    this.sideBarMenuWrap = {
      menu: page.locator('.bm-menu'),
      logoutButton: page.getByText('Logout'),
    };
    this.shoppingCart = page.getByTestId('shopping-cart-link');
    this.shoppingCartBadge = this.shoppingCart.getByTestId('shopping-cart-badge'); 
  }

  async waitForPageToBeVisible() {
    await expect(this.shoppingCart, 'ToolbarPage - Shopping cart was not visible').toBeVisible();
  }

  async waitForShoppingCartBadgeToHaveCount(count: number) {
    await expect(this.shoppingCartBadge, 'ToolbarPage - Shopping cart badge was not visible').toBeVisible();
    await expect(this.shoppingCartBadge, 'ToolbarPage - Shopping cart badge did not have the expected count').toHaveText(count.toString());
  }

  async waitForShoppingCartBadgeToBeGone() {
    await expect(this.shoppingCartBadge, 'ToolbarPage - Shopping cart badge was not gone').not.toBeVisible();
  }

  async goToYourCartPage() {
    await this.shoppingCart.click();
  }

  async logoutUser() {
    await this.openSideBarMenu();
    await this.sideBarMenu().waitForModalToBeVisible();
    await this.sideBarMenu().logoutUser();
  }

  async openSideBarMenu() {
    await expect(this.sideBarMenuButton, 'ToolbarPage - Side bar menu button was not visible').toBeVisible();
    await this.sideBarMenuButton.click();
  }

  sideBarMenu() {
    const sideBarMenuWrap = this.sideBarMenuWrap;
    
    return {
      async waitForModalToBeVisible() {
        await expect(
          sideBarMenuWrap.menu,
          'ToolbarPage - Side bar menu was not visible'
        ).toBeVisible();
      },

      async logoutUser() {
        await expect(
          sideBarMenuWrap.logoutButton,
          'ToolbarPage - Logout button was not visible'
        ).toBeVisible();
        await sideBarMenuWrap.logoutButton.click();
      },
    };
  }
}
