import { type Page, type Locator, expect } from '@playwright/test';

export class WaitHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForVisibleElement(locator: Locator, errorMessage?: string, timeout: number = 10000) {
    const customError = errorMessage || 'Element check failed';
    try {
      await locator.waitFor({ state: 'attached', timeout });
    } catch(error) {
      throw new Error(`${customError} - Element was not present in DOM, ${error}`);
    }
    try {
      await expect(locator).toBeVisible({ timeout });
    } catch(error) {
      throw new Error(`${customError} - Element was not visible, ${error}`);
    }
    try {
      await expect(locator).toBeInViewport({ timeout });
    } catch {
      // If element is not in viewport, try scrolling it into view
      try {
        await locator.scrollIntoViewIfNeeded();
        await expect(locator).toBeInViewport({ timeout });
      } catch(scrollError) {
        throw new Error(`${customError} - Element failed to be in viewport, ${scrollError}`);
      }
    }
  }
}