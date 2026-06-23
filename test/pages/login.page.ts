import { expect, type Locator, type Page } from '@playwright/test';
import { InputHelper } from '../helpers/input.helper';

export class LoginPage {
  readonly inputHelper: InputHelper;
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  
  constructor(page: Page) {
    this.inputHelper = new InputHelper(page);
    this.page = page;
    this.userNameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.locator('#login-button');
  }

  async open() {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error('BASE_URL environment variable is not defined');
    }
    await this.page.goto(baseUrl);
  }

  async waitForPageToBeVisible() {
    await expect(this.userNameInput, 'LoginPage - Username input field was not visible').toBeVisible();
    await expect(this.loginButton, 'LoginPage - Login button was not visible').toBeVisible();
  }

  async loginUser(userName: string, password: string) {
    if (!userName.trim()) {
      throw new Error('Username is required but not provided or is empty');
    }
    if (!password.trim()) {
      throw new Error('Password is required but not provided or is empty');
    }
    await this.inputHelper.fill(this.userNameInput, userName, `LoginPage - Username '${userName}'`);
    await this.inputHelper.fill(this.passwordInput, password, 'LoginPage - Password');
    await this.loginButton.click();
    console.log(`Logged in user: ${userName}`);
  }
}
