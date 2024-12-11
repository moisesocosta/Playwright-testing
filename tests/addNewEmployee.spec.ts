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
    
  await test.step('3) Add new employee', async()=>{
    await pim.addEmployee()
  })

  await test.step('4) Search & confirm on the added employee is existed ', async()=>{
    await pim.searchForEmployee()
    const employeeNr12345 = page.getByRole('row', {name:('12345')}).nth(0)
    await expect(employeeNr12345).toHaveText('12345Mostafa Khalid')
  })
})