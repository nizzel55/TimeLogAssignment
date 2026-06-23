import { type Locator, type Page } from '@playwright/test';
import { WaitHelper } from './wait.helper';

export class InputHelper {
  readonly waitHelper: WaitHelper;

  constructor(page: Page) {
    this.waitHelper = new WaitHelper(page);
  }
  /**
   * Robust input field filling with click-first pattern
   */
  async fill(
    inputField: Locator, 
    value: string, 
    element: string
  ): Promise<void> {
    try {
      // Wait for element stability before filling
      await this.waitHelper.waitForVisibleElement(inputField, `${element} - Element was not visible`);
      
      // Click to ensure focus and that element is considered stable
      await inputField.click();
      
      // Clear and fill
      await inputField.clear();
      await inputField.fill(value);
      
      console.log(`${element} was filled successfully`);
    } catch (error) {
      console.error(`Failed to fill ${element} input field:`, error);
      throw error;
    }
  }
}
