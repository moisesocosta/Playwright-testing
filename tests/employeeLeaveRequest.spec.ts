import {Page,expect} from '@playwright/test'
import test from '../page-object-manager/pageObjectManger'
import loginPage from '../page-objects/loginPage'
import pim from '../page-objects/pim'
import LeavePage from '../page-objects/leave'

test.beforeEach(async({page})=>{
  await page.goto('https://opensource-demo.orangehrmlive.com')
})

test('Add New Employee', async({page,loginPage,pim,leave})=>{
  await test.step('1) Login with valid credential', async()=>{
    await loginPage.Login()
  })

  await test.step('2) Navigate to Leave Management & apply on a leave', async()=>{
    await leave.applyOnLeave()
  })

  await test.step('3) Navigate to my Leave and check your applied leave', async()=>{  
    await leave.checkYourLeave()
    const addedLeave =  page.getByRole('row', {name:("2024-24-12")}).nth(0)
    await expect(addedLeave).toHaveText('2024-24-12Jos hen ButlerCAN - FMLA22.001.00Pending Approval (1.00) Cancel ')
  })
})