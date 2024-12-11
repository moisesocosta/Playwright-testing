import { Locator, Page } from 'playwright'

export class LoginPage {
  static Login() {
    throw new Error("Method not implemented.");
  }

  private readonly page : Page;
  private readonly userName: Locator;
  private readonly password: Locator;
  private readonly login: Locator;
  private readonly forgotYourPassword: Locator;

  constructor(page:Page){
    this.page = page
    this.userName = page.getByRole('textbox',{name:('Username')})
    this.password = page.getByRole('textbox',{name:('Password')})
    this.login = page.getByRole('button',{name:('Login')})
    this.forgotYourPassword = page.locator('text=Forgot your password?')
  }

  async Login(){
    await this.userName.fill('Admin')
    await this.password.fill('admin123')
    await this.login.click()
    await this.page.waitForTimeout(6000)
  }
  async ForgetMyPassowrd(){
    await this.forgotYourPassword.click()
  }      
}

export default LoginPage;