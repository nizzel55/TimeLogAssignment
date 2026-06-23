# TimeLog Playwright Tests — Agent Guide

## Project Overview
TimeLog is an end-to-end test suite for the Sauce Labs demo site using Playwright with TypeScript and the Page Object Model pattern.

## Architecture & Conventions

### Directory Structure
- `test/specs/` — Test files (e.g., `checkoutproduct.spec.ts`)
- `test/pages/` — Page objects following POM pattern (e.g., `login.page.ts`)
- `test/helpers/` — Reusable utilities (e.g., `input.helper.ts`, `wait.helper.ts`)
- `playwright.config.ts` — Playwright configuration
- `.env` — Environment variables (copy from `.env.example`)

### Naming Conventions
- Page objects: `{pageName}.page.ts` (e.g., `products.page.ts`)
- Test specs: `{feature}.spec.ts` (e.g., `checkoutproduct.spec.ts`)
- Helper classes: `{utility}.helper.ts` (e.g., `wait.helper.ts`)
- CSS selectors: Use `getByTestId()` with `data-test` attributes when possible

### Page Object Model Pattern
Each page object should:
1. Accept `page: Page` in the constructor
2. Define locators as readonly properties
3. Include a `waitForPageToBeVisible()` method for assertions
4. Contain only navigation and interaction methods (no test logic)
5. Provide helper methods that wrap common actions

Example:
```typescript
export class MyPage {
  readonly page: Page;
  readonly element: Locator;

  constructor(page: Page) {
    this.page = page;
    this.element = page.getByTestId('my-element');
  }

  async waitForPageToBeVisible() {
    await expect(this.element).toBeVisible();
  }

  async performAction() {
    await this.element.click();
  }
}
```

### Test Structure
- Use `test.describe()` for grouping related tests
- Use `test.step()` for clear test flow documentation
- Leverage page objects for all interactions
- Include meaningful error messages in assertions
- Use environment variables from `.env` for credentials/URLs

### Helpers
- `InputHelper` — Robust input filling with click-first and clear pattern
- `WaitHelper` — Reliable element visibility checks with viewport scrolling

### Environment Variables
Required in `.env`:
- `BASE_URL` — Target application URL
- `STANDARD_USER` — Test account username
- `PASSWORD` — Test account password

## Coding Standards

### TypeScript
- Strict mode enabled in `tsconfig.json`
- Use `type` imports: `import type { Page, Locator } from '@playwright/test'`
- Add JSDoc comments for public methods
- Avoid `any` types

### Assertions & Waits
- Always use `await expect()` for assertions
- Include descriptive error messages
- Prefer `getByTestId()` over CSS selectors
- Use `toBeVisible()` with custom timeout only if necessary

### Avoid
- Hard-coded delays (`await page.waitForTimeout()`)
- Tight coupling between test logic and page objects
- Global state sharing between tests
- Console logging in production code (use Playwright annotations)

## Running Tests

```bash
# Install dependencies and browsers
yarn install && npx playwright install

# Run all tests
yarn test

# Run in UI mode
yarn test-ui

# Run a single file
npx playwright test test/specs/checkoutproduct.spec.ts

# Debug mode
npx playwright test --debug
```

## CI/CD
Tests run automatically via GitHub Actions on push/PR. See `.github/workflows/playwright-tests.yml`.

## When Adding a New Test
1. Create a spec file in `test/specs/`
2. Import or create page objects in `test/pages/`
3. Structure the test using `test.describe()` and `test.step()`
4. Use page object methods instead of direct Playwright calls
5. Run locally: `npx playwright test test/specs/yourtest.spec.ts`
6. Verify traces/videos in `./reports/` if test fails

## Common Tasks

### Add a new page object
- File: `test/pages/{pageName}.page.ts`
- Constructor accepts `page: Page`
- Define locators and include `waitForPageToBeVisible()`

### Add a new helper
- File: `test/helpers/{utility}.helper.ts`
- Focus on reusable, focused functionality
- Include error handling and logging

### Debug a failing test
- Run with `--debug` flag to open Inspector
- Check traces in `./reports/blob-report/`
- Review screenshots in `./reports/html-report/`

## Stack
- **Framework**: Playwright v1.61+
- **Language**: TypeScript 6
- **Package Manager**: Yarn
- **Env Management**: dotenv
- **Reporting**: Playwright HTML, Allure (optional with Java), Blob reports
