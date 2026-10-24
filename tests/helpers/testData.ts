import { randomUUID } from 'node:crypto';

export function createUniqueEmail() {
  return `test.${randomUUID()}@example.com`;
}

export type TestUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export function createTestUser(
  overrides: Partial<TestUser> = {},
): TestUser {
  return {
    firstName: 'Test',
    lastName: 'User',
    email: createUniqueEmail(),
    password: 'someStrongPassword',
    ...overrides,
  };
}