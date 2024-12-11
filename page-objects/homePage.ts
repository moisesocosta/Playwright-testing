import {Locator, Page} from '@playwright/test'

export class HomePage {
  private readonly page: Page
  private readonly dashboard: Locator
  private readonly profile: Locator
  private readonly logout: Locator
    

  constructor(page:Page){
    this.dashboard = page.getByText('dashboard').first()
    this.profile = page.locator('.oxd-userdropdown-name')
    this.logout = page.getByRole('menuitem', {name:('Logout')})
  }

  async Logout(){
    await this.profile.click()
    await this.logout.click()   
  }
}

export default HomePage;