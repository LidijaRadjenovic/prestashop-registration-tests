# PrestaShop registration tests

Playwright tests for the customer registration flow on the public PrestaShop demo.
The suite covers successful registration and sign-in, required-field and
format validation, and duplicate-email handling.
The project also includes exploratory testing findings, 
with a documented issue and supporting screenshot.

## Requirements

- Node.js and npm

## Install

```bash
npm install
npx playwright install chromium
```

## Run tests

```bash
npm test
```

To run with a visible browser:

```bash
npm run test:headed
```

To view the latest HTML report:

```bash
npm run report
```

The tests run in Chromium with one worker to reduce load on the shared demo.
They use a fresh email address when creating accounts. The demo is a public,
remote service, so test execution requires an internet connection and may be
affected by demo availability or storefront changes.

## Project structure

- `tests/register.spec.ts` - registration scenarios and assertions
- `tests/helpers/testData.ts` - generated test user data
- `pages/RegisterPage.ts` - storefront locators and registration interactions
- `playwright.config.ts` - Playwright configuration

## Exploratory testing

See [exploratory-testing.md](./exploratory-testing.md) for exploratory finding and a short reflection.
