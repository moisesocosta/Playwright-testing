import { Page, expect } from "playwright/test"
import test from "../page-object-manager/pageObjectManger"
import loginPage from "../page-objects/loginPage"

test.beforeEach( async ({page})=>{
  await page.goto('https://opensource-demo.orangehrmlive.com')
})

test('Verify Login Page Elements',async({page,loginPage})=>{
  await expect(loginPage.userName).toBeVisible()
  await expect(loginPage.password).toBeVisible()
  await expect(loginPage.login).toBeVisible()
  await expect(loginPage.forgotYourPassword).toBeVisible()
})