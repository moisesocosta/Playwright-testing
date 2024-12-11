import {Locator, Page} from '@playwright/test'

export class DashboardPage {
  private readonly page: Page
  private readonly dashboard: Locator
  private readonly employeeDistributionWidget:Locator
  private readonly timesheetWidget:Locator
    
  constructor(page:Page){
    this.dashboard = page.getByText('dashboard').first()
    this.employeeDistributionWidget = page.locator('p', {hasText:('Employee Distribution by Sub Unit')})
    this.timesheetWidget = page.getByRole('button', {name:('Timesheets')})

  }
}

export default DashboardPage;