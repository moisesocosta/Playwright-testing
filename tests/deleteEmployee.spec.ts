import {Page,expect} from '@playwright/test'
import test from '../page-object-manager/pageObjectManger'
import loginPage from '../page-objects/loginPage'
import pim from '../page-objects/pim'

test.beforeEach(async({page})=>{
  await page.goto('https://opensource-demo.orangehrmlive.com')
})

test('Add New Employee', async({page,loginPage,pim})=>{
  await test.step('1) Login with valid credential', async()=>{
    await loginPage.Login()
  })

  await test.step('2) Navigate to Employee Management', async()=>{
    await pim.PIM.click()
  })

  await test.step('3) Search for the added employee and delete him ', async()=>{
    await pim.deleteEmployee()
  })
  
  await test.step('4) Search and verify that the employee no longer appears in the list ', async()=>{
    await pim.searchForEmployee()
    const rowCount = page.locator('.orangehrm-bottom-container').count()

    if (await rowCount === 0) {
      await console.log('The employee does not exist in the table.');
    } else {
      await console.log('The employee exists in the table.');
    }
  })
})