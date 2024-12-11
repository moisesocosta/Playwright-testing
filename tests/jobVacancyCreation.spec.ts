import {Page,expect} from '@playwright/test'
import test from '../page-object-manager/pageObjectManger'
import loginPage from '../page-objects/loginPage'
import pim from '../page-objects/pim'

test.beforeEach(async({page})=>{
  await page.goto('https://opensource-demo.orangehrmlive.com')
})

test('Add New Employee', async({page,loginPage,pim,recruitment})=>{
  await test.step('1) Login with valid credential', async()=>{
    await loginPage.Login()
  })

  await test.step('2) Navigate to Job Vacancies and add a Vacancy', async()=>{
    await recruitment.addVacancy()
  })

  await test.step('3) Navigate to Job Vacancies List and verify on the added vacancy', async()=>{
    await page.getByText('Dashboard').click()
    await recruitment.searchForAddedVacancy()
  })
  
  await test.step('4) Navigate to Job Vacancies List and verify on the added vacancy', async()=>{
    const addedVacancy =  page.getByRole('row', {name:("Software Engineer")}).nth(0)
    await expect(addedVacancy).toHaveText('Software Testing EngineerSoftware EngineerRahul PatilActive')
  })
})