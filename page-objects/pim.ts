import { Locator,Page } from 'playwright'

export class PIM {
  private readonly page: Page
  private readonly PIM : Locator
  private readonly AddEmployee : Locator
  private readonly FirstName:Locator
  private readonly LastName: Locator
  private readonly EmployeeID: Locator
  private readonly Save: Locator
  private readonly EmployeeList: Locator
  private readonly Search: Locator
  private readonly DeleteRow : Locator
  private readonly AreYouSureYes : Locator
  private readonly AreYouSureNo : Locator
    
  constructor(page:Page){
    this.PIM = page.getByText('PIM')
    this.AddEmployee = page.getByText('Add Employee')
    this.FirstName = page.getByRole('textbox', {name:('First Name')})
    this.LastName = page.getByRole('textbox', {name:('Last Name')})
    this.EmployeeID = page.locator('.oxd-input-field-bottom-space .oxd-input').last()
    this.Save = page.locator('button:has-text("Save")')
    this.EmployeeList = page.getByText('Employee List')
    this.Search = page.locator('button:has-text("Search")')
    this.DeleteRow = page.locator('[class="oxd-icon bi-trash"]')
    this.AreYouSureYes = page.locator('[class="oxd-icon bi-trash oxd-button-icon"]')
    this.AreYouSureNo = page.locator('class="oxd-button oxd-button--medium oxd-button--ghost orangehrm-button-margin"')
  }

  async addEmployee(){
    await this.AddEmployee.click()
    await this.FirstName.fill("Mostafa")
    await this.LastName.fill("Khalid")
    await this.EmployeeID.clear()
    await this.EmployeeID.pressSequentially('12345', { delay: 1000 })
    await this.Save.click({force:true})
  }

  async searchForEmployee(){
    await this.EmployeeList.click()
    await this.EmployeeID.pressSequentially('12345', { delay: 1000 })
    await this.Search.click({force:true})
  }

  async deleteEmployee(){
    await this.EmployeeList.click()
    await this.EmployeeID.pressSequentially('12345', { delay: 1000 })
    await this.Search.click({force:true})
    await this.DeleteRow.click({force:true})
    await this.AreYouSureYes.click({force:true})
  }
}

export default PIM