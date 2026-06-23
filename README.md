# TimeLog Playwright Tests

Automated end-to-end tests for the Sauce Labs demo site using Playwright.

## Prerequisites

- Node.js (v22+)
- yarn

## Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `.env` with your test credentials and base URL.

## Running Tests

### Run all tests
```bash
yarn test
```

### Run tests in UI mode (interactive)
```bash
yarn run test-ui
```

## Test Reports

### HTML Report

The HTML report is generated into `./reports/html-report` when tests complete.
Raw Playwright test result artifacts are stored in `./test-results`.

After running tests, view the HTML report:
```bash
yarn playwright show-report ./reports/html-report
```

Alternatively, open the report directly:
- HTML Report: `./reports/html-report/index.html`

### Allure Report

The Allure report is generated into `./reports/allure-report` after running `yarn generate-report`.
The raw Allure result files are stored in `./allure-results`.

Generate the Allure report:
```bash
yarn generate-report
```

> Note: Allure requires a Java runtime to be installed locally.

## Project Structure

```
test/
├── specs/
│   └── checkoutproduct.spec.ts     # End-to-end checkout flow test
├── pages/
│   ├── login.page.ts               # Login page object
│   ├── products.page.ts            # Products listing page object
│   ├── product.page.ts             # Single product page object
│   ├── toolbar.page.ts             # Navigation toolbar page object
│   ├── yourcart.page.ts            # Shopping cart page object
│   ├── checkout.page.ts            # Checkout information page object
│   ├── checkoutoverview.page.ts    # Order review page object
│   └── checkoutcomplete.page.ts    # Order confirmation page object
├── helpers/
│   ├── input.helper.ts             # Input field helper utilities
│   ├── wait.helper.ts              # Wait/visibility helper utilities
└── fixtures/
    ├── pages.fixture.ts            # Shared page object fixtures for tests
    └── testData.fixture.ts         # Centralized test data and reusable constants
```

## Configuration

- **Playwright config**: `playwright.config.ts`
  - Base URL, credentials, timeouts, reporters, and browser settings
- **TypeScript config**: `tsconfig.json`
  - Compiler options and project includes
- **Environment variables**: `.env` (use `.env.example` as template)

## Debugging

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Generate and view traces
Traces are automatically collected on test failures. View them:
```bash
npx playwright show-trace ./reports/blob-report
```

## CI/CD

Tests run automatically on GitHub Actions (see `.github/workflows/playwright-tests.yml`):
- Runs on push to main and pull requests
- Generates test reports and uploads artifacts
- Retries flaky tests automatically

## Troubleshooting

**Issue**: Tests fail with "BASE_URL environment variable is not defined"
- **Solution**: Ensure `.env` file exists and contains `BASE_URL`.

**Issue**: Timeouts during test execution
- Check network connectivity and that the target site is accessible
- Increase timeouts in `playwright.config.ts` if needed

**Issue**: Page selectors not found
- Verify selectors using Playwright Inspector: `npx playwright codegen <URL>`
- Check that `data-test` attributes exist on target elements

## Testing Strategy

### What I Chose to Test

Given the limited scope and time available, I focused on the application's primary business flow:

- Login
- Product browsing
- Adding products to the cart
- Checkout
- Order confirmation
- Logout

The test validates both user-visible behaviour and key business data throughout the flow, including product names, prices, tax calculations, cart totals, and how state changes throughout the test flow.

Rather than trying to maximise coverage, I focused on building a single end-to-end test that stays readable, stable, and useful as a baseline.

### What I Deliberately Didn't Test

Some areas were intentionally left out to make the scope manageable within the time frame:

- Negative authentication scenarios (invalid credentials, locked users, missing fields)
  -  These are important, but I prioritised the main purchasing flow.
- Visual regression testing
  - Useful for UI-heavy applications, but would require additional tooling and baseline management.
- Performance and load testing
  - Outside the scope of functional end-to-end testing.
- Accessibility testing
  - Not included in this version due to time constraints.
- Unit testing of page objects
  - The page objects are thin wrappers around Playwright, so the benefit here would be limited.

### App Testability & Behaviour Observations

The application is relatively straightforward to automate and behaves consistently during testing.

Strengths:

- Consistent use of data-test attributes provides stable selectors.
- Navigation behaves consistently between pages.
- The application's state management appears reliable (for example, logout correctly clears session state and returns the user to the login page).

Limitations:

- No API support for test data setup or authentication, so all test preparation must be done through the UI, which increases setup time.
- Test data is embedded in the application, making tests sensitive to changes in demo products and pricing.

### What I Would Add With More Time

If this were expanded into a larger test suite, I would prioritize:

1. Reusable authenticated sessions using Playwright storageState.
2. Negative-path coverage (invalid login, incomplete checkout forms, edge cases). Some validation scenarios would likely be better covered at lower test levels than full E2E.
3. Adding support for alternative demo users like locked_out_user and problem_user.
4. Accessibility checks integrated into the Playwright suite.
5. Running tests across multiple browsers in CI (Firefox and WebKit in addition to Chromium).
6. Improving reporting and CI visibility (for example Allure dashboards or similar tools).
7. Optional bonus: add an API-level test against a public REST API such as restful-booker.herokuapp.com.
8. Improve and add more fixtures as the test suite grows.
9. Improve and add more helpers to reduce duplication and make tests easier to maintain.

## AI Usage

I used GitHub Copilot (backed by Claude Haiku 4.5) throughout this assignment as a development assistant rather than an autonomous code generator.

All AI-generated code was reviewed, executed, and validated before being committed.

Areas where AI was most helpful:

- Setting up the initial Playwright project structure
- Generating boilerplate code for page objects, fixtures, and helper utilities
- Creating the GitHub Actions workflow
- Drafting documentation and project templates
- Suggesting refactorings and Page Object Model patterns

Areas where I relied on my own judgement:

- Defining the overall test strategy and coverage
- Deciding which user flows were worth automating
- Reviewing and refining generated code
- Designing page objects and test abstractions
- Organizing the repository structure and naming conventions

I treated all generated code as a draft. I reviewed every AI-generated change before accepting it and adjusted several implementations to better fit the project's structure and maintainability goals. In particular, AI was effective at producing boilerplate and repetitive patterns, but less reliable when making higher-level decisions around test design, abstraction boundaries, and long-term maintainability.

Overall, AI accelerated implementation and reduced repetitive work, while the final architecture, test coverage decisions, and code quality review remained my responsibility.

## Notes

- Tests use the Page Object Model pattern for maintainability
- Each test is isolated and can run in parallel
- Screenshots and videos are captured for failed tests
- Environment credentials are read from `.env` at runtime
