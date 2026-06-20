const confirmationPage = require('./confirmationPage');
class RegisterPage{
    constructor(page){
        this.page = page;
  this.registerName= page.getByRole('textbox', { name: 'Name' });
  this.registerEmail= page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
  this.registerButton= page.getByRole('button', { name: 'Signup' });
 this.loginAddress=  page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
  this.loginPassword= page.getByRole('textbox', { name: 'Password' });
  this.loginButton= page.getByRole('button', { name: 'Login' });
  this.validationEmail= page.getByRole('textbox', { name: 'Your email address' });
  this.validationButton= page.locator('#subscribe');
    }
    async enterUserName(name){
       await  this.registerName.fill(name);
       return this;
    }
     async enterUserEmail(email){
       await  this.registerEmail.fill(email);
       return this;
    }
    async clickOnRegister(){
        await this.registerButton.click();
        return new confirmationPage(this.page);
    }
}
module.exports=RegisterPage;