import { FrameLocator, Locator, Page } from '@playwright/test';

export class RegisterPage {
    readonly storefront: FrameLocator;
    readonly signInButton: Locator; 
    readonly createYourAccountButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly termsAndConditionsCheckbox: Locator;
    readonly customerDataPrivacyCheckbox: Locator;
    readonly createAccountButton: Locator;
    readonly signOutButton: Locator;
    readonly emailAlreadyUsedError: Locator;
    readonly signInSubmitButton: Locator;

constructor(private page: Page) {
    this.storefront = page.frameLocator('iframe[name="framelive"]');
    this.signInButton = this.storefront.getByLabel('Sign in');
    this.createYourAccountButton = this.storefront.getByRole('link', { name: 'Create your account' });
    this.firstName = this.storefront.getByLabel('First name');
    this.lastName = this.storefront.getByLabel('Last name');
    this.email = this.storefront.getByRole('textbox', { name: 'Email', exact: true });
    this.password = this.storefront.getByRole('textbox', { name: 'Password' });
    this.termsAndConditionsCheckbox = this.storefront.getByLabel('I agree to the terms and conditions and the privacy policy');
    this.customerDataPrivacyCheckbox = this.storefront.getByLabel('Customer data privacy');
    this.createAccountButton = this.storefront.getByRole('button', { name: 'Create account' });
    this.signOutButton = this.storefront.getByRole('link', { name: 'Sign out' });
    this.emailAlreadyUsedError = this.storefront.getByText('The email is already used,');
    this.signInSubmitButton = this.storefront.getByRole('button', { name: 'Sign in', exact: true });
}

async goto() {
  await this.page.goto('/');
}

async clickSignInButton() {
    await this.signInButton.click();
}

async clickSignOutButton() {
    await this.signOutButton.click();
}

async registerNewUser(firstName: string, lastName: string, email: string, password: string) {
    await this.clickSignInButton();
    await this.createYourAccountButton.click();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.termsAndConditionsCheckbox.check();
    await this.customerDataPrivacyCheckbox.check();
    await this.createAccountButton.click();
}

async submitEmptyRegistrationForm() {
    await this.clickSignInButton();
    await this.createYourAccountButton.click();
    await this.createAccountButton.click();
}

async signIn(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signInSubmitButton.click();
}

async isInvalid(locator: Locator) {
    return locator.evaluate((element) => element.matches(':invalid'));
  }

}