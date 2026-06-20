const RegisterPage = require('./RegisterPage');
 class HomePage {
    constructor(page) {
        this.page = page; 
        this.home = page.getByText('Home  Products Cart Signup');
        this.productLink = page.getByRole('link', { name: ' Products' });
        this.api = page.getByRole('link', { name: ' API Testing' });
        this.video = page.getByRole('link', { name: ' Video Tutorials' });
        this.registerButton = page.getByRole('link', { name: ' Signup / Login' });
        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.signupEmailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signupButton = page.getByRole('button', { name: 'Signup' });
    }
    async gotToRegisterPage() {
        await this.registerButton.click(); 
        return new RegisterPage(this.page); 
    }

    async signup(name, email) {
        await this.nameInput.click();
        await this.nameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }
}
module.exports=HomePage;