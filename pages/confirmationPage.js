class confirmationPage {
  constructor(page) {
    this.page = page;
    this.information = page.getByText('Enter Account Information');

    this.mrs = page.getByRole('radio', { name: 'Mrs.' });
    this.mr = page.getByRole('radio', { name: 'Mr.' });
    this.nameInput = page.getByRole('textbox', { name: 'Name *' });
    this.emailInput = page.getByRole('textbox', { name: 'Email *' });
    this.password = page.getByRole('textbox', { name: 'Password *' });
    this.check1 = page.getByText('Sign up for our newsletter!');
    this.check2 = page.getByText('Receive special offers from');
    this.daysDropdown = page.locator('#days');
    this.monthsDropdown = page.locator('#months');
    this.yearsDropdown = page.locator('#years');
    this.firstName = page.getByRole('textbox', { name: 'First name *' });
    this.LastName = page.getByRole('textbox', { name: 'Last name *' });
    this.company = page.getByRole('textbox', { name: 'Company', exact: true });
    this.address1 = page.getByRole('textbox', { name: 'Address * (Street address, P.O. Box, Company name, etc.)' });
    this.address2 = page.getByRole('textbox', { name: 'Address 2' });
    this.DropdownCountry = page.getByRole('combobox', { name: 'Country *' });
    this.state = page.getByRole('textbox', { name: 'State *' });
    this.city = page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.zip = page.locator('#zipcode');
    this.phone = page.getByRole('textbox', { name: 'Mobile Number *' });
    this.createButton = page.getByRole('button', { name: 'Create Account' });
  }
  verify() {
    return this.information;
  }
  async createAcount(title, passwordd, day, month, year, first, last, company, adress1, address2, country, state, city, zip, phone) {
if (title === "Mrs") {
  await this.mrs.click();
} else if (title === "Mr") {
  await this.mr.click();
}
    await this.password.fill(passwordd);
    await this.daysDropdown.selectOption(day);
    await this.monthsDropdown.selectOption(month);
    await this.yearsDropdown.selectOption(year);
    await this.firstName.fill(first);
    await this.LastName.fill(last);
    await this.company.fill(company);
    await this.address1.fill(adress1);
    await this.address2.fill(address2);
    await this.DropdownCountry.selectOption(country);
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zip.fill(zip);
    await this.phone.fill(phone);
  }
  async clickOnCreateButton() {
    await this.createButton.click();
  }
  generateRandomEmail() {
    const randomNumber = Math.floor(Math.random() * 10000);
    return `abanob.soror_${randomNumber}@gmail.com`;
  }
}

module.exports = confirmationPage;