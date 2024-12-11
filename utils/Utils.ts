import test, {type Page,expect,PageScreenshotOptions,} from '@playwright/test'
import { text } from 'stream/consumers'

class Utils {
    private readonly userSettingsButton: string;
    private readonly logoutButton: string;
    private readonly loginAgainBtn: string;
    constructor(public page: Page) {
    this.page = page;
    this.userSettingsButton = "[aria-label='User settings']";
    this.logoutButton = "button#logout";
    this.loginAgainBtn = "//button[contains(.,'Log In Again')]";
  }

  async navigateTo(url: string) {
    return await this.page.goto(url);
  }

  async getTitle() {
    return await this.page.title();
  }

  async pause() {
    return await this.page.pause();
  }

  async getUrl() {
    return this.page.url();
  }

  async wait(waitInMiliseconds: number) {
    return this.page.waitForTimeout(waitInMiliseconds);
  }

  async waitForPageLoad() {
    return await this.page.waitForLoadState("domcontentloaded");
  }
  async clickOn(selector: string) {
    return await this.page.click(selector);
  }

  async enterText(selector: string, text: string) {
    return await this.page.fill(selector, text);
  }

  async keyPress(selector: string, key: string) {
    return await this.page.press(selector, key);
  }

  async takeScreenShot(screenshotName: PageScreenshotOptions | undefined) {
    return await this.page.screenshot(screenshotName);
  }

  async performVisualTest(screenshotName: string | readonly string[]) {
    await expect(this.page).toHaveScreenshot(screenshotName, {
      fullPage: true,
    });
  }

  async verifyDropdownItems(sentences: string[]) {
    // Handle empty array case to prevent errors
    if (sentences.length === 0) {
      throw new Error("No sentences provided for verification.");
    }
    // Efficiently locate all dropdown items at once using a CSS selector
    const itemLocators = await this.page.$$("nx-dropdown-item");
    // Verify each expected sentence in any dropdown item
    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      const matchingItem = itemLocators.find(async (item) =>
        (await item.innerText())
            .trim()
            .toLowerCase()
            .includes(trimmedSentence.toLowerCase())
      );
      if (!matchingItem) {
        throw new Error(
          `Sentence "${sentence}" not found in any dropdown item.`
        );
      }
    }
    console.log(
      `Successfully verified all expected sentences in dropdown items.`
    );
    await this.page.keyboard.press("Escape");
    await this.wait(2000);
  }

  async selectItemFromDDL(item: string) {
    await this.clickOn(`//nx-dropdown-item[contains(.,'${item}')]`);
    await this.wait(2000);
  }

  async verifyElementContainsText(
    selector: string,
    text: string | RegExp | readonly (string | RegExp)[]
  ){
    const locatorText = this.page.locator(selector);
    return await expect(locatorText).toContainText(text);
  }

  async clickOkinPopup(popupText: string) {
    await this.clickOn(
      `//ui-validation-dialog[contains(.,'${popupText}')]/descendant::button[contains(.,'OK')]`
    );
  }

  async verifyJSElementValue(selector: any, text: unknown) {
    const textValue = await this.page.$eval(
      selector,
      (element) => element.value
    );
      return expect(textValue.trim()).toBe(text);
  }

  async selectValueFromDropdown(selector: string, text: any) {
    const dropdown = this.page.locator(selector);
    return await dropdown.selectOption({ value: text });
  }

  async getFirstElementFromTheList(selector: string) {
    const rows = this.page.locator(selector);
    const count = await rows.count();
    for (let i = 0; i < count; ++i) {
      const firstItem = await rows.nth(0).textContent();
      return firstItem;
    }
  }

  async isElementVisible(selector: string, errorMessage: string) {
    const element = this.page.locator(selector);
    try {
      const isVisible = await element.isVisible();
      expect(isVisible).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async isElementNotVisible(selector: string) {
    const element = this.page.locator(selector);
    return expect(element).toBeHidden;
  }

  async isElementEnabled(selector: string, errorMessage: string) {
    const element = this.page.locator(selector);
    try {
      const isEnabled = await element.isEnabled();
      expect(isEnabled).toBeTruthy();
    } catch (error) {
        throw new Error(`${errorMessage}`);
    }
  }

  async isElementDisabled(
    selector: string,
    errorMessage: string,
    waitTime = 1000
  ): Promise<void> {
    const element = this.page.locator(selector);
    try {
      const isDisabled = await element.isDisabled();
      expect(isDisabled).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async verifyRadioButtonVisibility(radioButtonSelector: string) {
    const radioButton = this.page.locator(radioButtonSelector);
    await expect(radioButton).toBeVisible();
  }

  async logoutToLoginAgain() {
    await this.clickOn(this.userSettingsButton);
    await this.clickOn(this.logoutButton);
    await this.clickOn(this.loginAgainBtn);
  }

  async verifyFieldContainsText(selector: string, expectedValue: string) {
    const user = this.page.locator(selector)
    await expect(user).toHaveValue(expectedValue)
  }

  async isElementChecked(selector: string, errorMessage: string) {
    const element = this.page.locator(selector);
    try {
      const isChecked = await element.isChecked();
      expect(isChecked).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async verifyModalPopupMessage(messageIndex: number, expectedMessage: string) {
    let msg = await this.page
      .locator('nx-modal-container [class="validation-log ng-star-inserted"]')
      .nth(messageIndex - 1);
      await expect(msg).toContainText(expectedMessage);
  }
}

export default Utils;