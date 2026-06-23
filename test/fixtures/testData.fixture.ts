import { test as baseTest } from '@playwright/test';

export type ProductTestData = {
  name: string;
  taxRate: number;
};

export type CustomerTestData = {
  firstName: string;
  lastName: string;
  zipCode: string;
};

export type CheckoutTestData = {
  paymentInfo: string;
  shippingInfo: string;
};

export type TestData = {
  product: ProductTestData;
  customer: CustomerTestData;
  checkout: CheckoutTestData;
};

type DataFixtures = {
  testData: TestData;
};

export const test = baseTest.extend<DataFixtures>({
  testData: async ({}, use) => {
    const data: TestData = {
      product: {
        name: 'Sauce Labs Backpack',
        taxRate: 0.08,
      },
      customer: {
        firstName: 'John',
        lastName: 'Doe',
        zipCode: '12345',
      },
      checkout: {
        paymentInfo: 'SauceCard #31337',
        shippingInfo: 'Free Pony Express Delivery!',
      },
    };
    await use(data);
  },
});

export { expect } from '@playwright/test';