import{ Page, Locator} from '@playwright/test'

export class Recruitment{
  private readonly page:Page
  private readonly Recruitment: Locator
  private readonly Vacancies: Locator
  private readonly Add: Locator
  private readonly VacancyName: Locator
  private readonly JobTitle: Locator
  private readonly SoftwareEngineerDDLOption :Locator
  private readonly HiringManager: Locator
  private readonly Save: Locator
  private readonly Cancel: Locator 
  private readonly HiringManagerVList : Locator
  private readonly HiringManagerVListOption: Locator
  private readonly Search: Locator

  constructor(page:Page){
    this.Recruitment = page.getByText('Recruitment')
    this.Vacancies = page.getByText('Vacancies')
    this.Add = page.getByRole('button',{name:('Add')})
    this.VacancyName = page.locator(".oxd-input-group .oxd-input").first()
    this.JobTitle = page.locator('.oxd-select-text-input').first()
    this.SoftwareEngineerDDLOption = page.locator('text="Software Engineer"').first()
    this.HiringManager = page.getByRole('textbox',{name:('Type for hints...')})
    this.Save = page.getByRole('button',{name:('Save')})
    this.Cancel = page.getByRole('button',{name:('Cancel')})
    this.HiringManagerVList = page.locator('.oxd-select-text-input').nth(2)
    this.HiringManagerVListOption = page.locator('text="Rahul Patil"').first()
    this.Search = page.getByRole('button', {name:('Search')})
  }

  async addVacancy(){
    await this.Recruitment.click()
    await this.Vacancies.click()
    await this.Add.click()
    await this.VacancyName.fill('Software Testing Engineer')
    await this.JobTitle.click({force:true})
    await this.SoftwareEngineerDDLOption.click()
    await this.HiringManager.pressSequentially('Rahul Mulge Patil',{ delay: 1000 })
    await this.Save.click({force:true})
  }

  async searchForAddedVacancy(){
    await this.Recruitment.click()
    await this.Vacancies.click()
    await this.JobTitle.click()
    await this.SoftwareEngineerDDLOption.click()
    await this.HiringManagerVList.click()
    await this.HiringManagerVListOption.click()
    await this.Search.click()    
  }
}

export default Recruitment;