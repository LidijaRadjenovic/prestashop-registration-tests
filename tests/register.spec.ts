import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';  
import { createTestUser } from './helpers/testData';  

test.describe('Customer registration', () => {

    test.beforeEach(async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goto();
    });
    
    test('The user should be able to register with valid data', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const user = createTestUser();

        await registerPage.registerNewUser(user.firstName, user.lastName, user.email, user.password);
        
        await expect(registerPage.signOutButton).toBeVisible();
    });

    test('The user should not be able to register with missing required fields', async ({ page }) => {
        const registerPage = new RegisterPage(page); 

        await registerPage.submitEmptyRegistrationForm();

        await expect.poll(() => registerPage.isInvalid(registerPage.firstName)).toBe(true);
        await expect.poll(() => registerPage.isInvalid(registerPage.lastName)).toBe(true);
        await expect.poll(() => registerPage.isInvalid(registerPage.email)).toBe(true);
        await expect.poll(() => registerPage.isInvalid(registerPage.password)).toBe(true);
        await expect.poll(() => registerPage.isInvalid(registerPage.termsAndConditionsCheckbox)).toBe(true);
        await expect.poll(() => registerPage.isInvalid(registerPage.customerDataPrivacyCheckbox)).toBe(true);
    });

    test('The user should not be able to register with invalid email', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const user = createTestUser({ email: 'invalid-email' });

        await registerPage.registerNewUser(user.firstName, user.lastName, user.email, user.password);

        expect(await registerPage.isInvalid(registerPage.email)).toBe(true);
    });

    test('The user should not be able to register with invalid password', async ({ page }) => {
        const registerPage = new RegisterPage(page); 
        const user = createTestUser({ password: 'short' });
        
        await registerPage.registerNewUser(user.firstName, user.lastName, user.email, user.password);
        
        expect(await registerPage.isInvalid(registerPage.password)).toBe(true);

    });

    test('The user should not be able to register with an already registered email', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const user = createTestUser();

        await registerPage.registerNewUser(user.firstName, user.lastName, user.email, user.password);
        await expect(registerPage.signOutButton).toBeVisible(); 

        await registerPage.clickSignOutButton();
        await registerPage.registerNewUser(user.firstName, user.lastName, user.email, user.password);
        
        await expect(registerPage.emailAlreadyUsedError).toBeVisible();
    });

    test('The registered user should be able to sign in', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const user = createTestUser();

        await registerPage.registerNewUser(user.firstName, user.lastName, user.email, user.password);
        await expect(registerPage.signOutButton).toBeVisible();

        await registerPage.clickSignOutButton();
        await registerPage.clickSignInButton();
        await registerPage.signIn(user.email, user.password);
        
        await expect(registerPage.signOutButton).toBeVisible();
    });
    
});