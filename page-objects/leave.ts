import { Locator, Page } from 'playwright'

export class LeavePage {
  private readonly page: Page
  private readonly Leave: Locator
  private readonly Apply: Locator
  private readonly LeaveType: Locator
  private readonly LeaveTypeDDLOption: Locator
  private readonly FromDate: Locator
  private readonly ToDate: Locator
  private readonly ApplyButton: Locator
  private readonly MyLeave: Locator
  private readonly MyLeavePageLeaveType: Locator
  private readonly Search: Locator

  constructor(page:Page){
    this.Leave = page.getByText('Leave').first()
    this.Apply = page.getByText('Apply').first()
    this.LeaveType = page.locator('[class="oxd-select-text-input"]').first()
    this.LeaveTypeDDLOption = page.locator('text="CAN - FMLA"').first()
    this.FromDate = page.locator('[placeholder="yyyy-dd-mm"]').first()
    this.ToDate  = page.locator('[placeholder="yyyy-dd-mm"]').last()
    this.ApplyButton = page.getByRole('button', {name:('Apply')})
    this.MyLeave = page.getByText('My Leave').first() 
    this.MyLeavePageLeaveType = page.locator('[class="oxd-select-text-input"]').last()
    this.Search = page.getByRole('button', {name:('Search')})
  }

  async applyOnLeave(){
    await this.Leave.click()
    await this.Apply.click
    await this.LeaveType.click()
    await this.LeaveTypeDDLOption.click()
    await this.FromDate.clear()
    await this.FromDate.fill('2024-24-12')
    await this.ToDate.clear()
    await this.ToDate.fill('2024-24-12')
    await this.Apply.click()
  }

  async checkYourLeave(){
    await this.MyLeave.click()
    await this.FromDate.clear()
    await this.FromDate.fill('2024-24-12')
    await this.ToDate.clear()
    await this.ToDate.fill('2024-24-12')
    await this.MyLeavePageLeaveType.click()
    await this.LeaveTypeDDLOption.click()
    await this.Search.click()
  }
}

export default LeavePage;