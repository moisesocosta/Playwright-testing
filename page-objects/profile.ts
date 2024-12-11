import { Locator, Page } from 'playwright'

export class Profile {
  private readonly page: Page;
  private readonly profile: Locator;
  private readonly about: Locator;
  private readonly support: Locator;
  private readonly changePassword: Locator;
  private readonly logout: Locator;

  constructor(page:Page){
    this.profile = page.locator('.oxd-userdropdown-name')
    this.about = page.getByRole('menuitem', {name:('About')})
    this.support = page.getByRole('menuitem', {name:('Support')})
    this.changePassword = page.getByRole('menuitem', {name:('Change Password')})
    this.logout = page.getByRole('menuitem', {name:('Logout')})
  }

  async Logout(){
    await this.profile.click()
    await this.logout.click()
  }
}