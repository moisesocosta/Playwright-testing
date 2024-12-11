import { Page, expect } from "playwright/test"
import test from "../page-object-manager/pageObjectManger"
import loginPage from "../page-objects/loginPage"
import homePage from "../page-objects/homePage"

test.beforeEach(async ({page})=>{
  await page.goto('https://opensource-demo.orangehrmlive.com')
})

test('Login with Valid Credenti',async({page,loginPage,homePage})=>{
  await test.step('1) Login with valid credential', async()=>{
    await loginPage.Login()
  })

  await test.step('2) Verify that loggedin successfully and Dashboard is appeard', async()=>{
    await expect(homePage.dashboard).toBeVisible()
    console.log('You are now successfully logged in ;)')
  })  
})