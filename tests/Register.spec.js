import { test, expect } from '@playwright/test';
const HomePage = require('../pages/home');
const RegisterPage = require('../pages/RegisterPage');
const confirmationPage = require('../pages/confirmationPage');
let page;
test.beforeEach(async function({browser}){
    const context = await browser.newContext();
    page = await context.newPage(); 
    await page.route('**/*googlesyndication*', route => route.abort());
    await page.route('**/*googleads*', route => route.abort());
    await page.route('**/*doubleclick*', route => route.abort());
    await page.goto("https://automationexercise.com/");
})
test("register with valid data",async ()=>{
    const homePage=new HomePage(page);
    await homePage.gotToRegisterPage();
    const registerPage=new RegisterPage(page);
    await registerPage.enterUserName("Abanob");
    await registerPage.enterUserEmail("abanob.soror@gmail.com");
    await registerPage.clickOnRegister();
    await expect(new confirmationPage(page).verify()).toBeVisible()
})
test("Validate signup with empty name field",async ()=>{
    const homePage=new HomePage(page);
    await homePage.gotToRegisterPage();
    const registerPage=new RegisterPage(page);
    await registerPage.enterUserEmail("abanob.soror@gmail.com");
    await registerPage.clickOnRegister();
    await expect(registerPage.registerName).toHaveAttribute('required');
    const validated=await registerPage.registerName.evaluate(element=>element.validationMessage);
    if(validated==="Please fill out this field."){
        return true;
    }else{
        return false;
    }
     console.log(validated);
})
test("Validate signup with empty Email field",async ()=>{
    const homePage=new HomePage(page);
    await homePage.gotToRegisterPage();
    const registerPage=new RegisterPage(page);
    await registerPage.enterUserName("abanob");
    await registerPage.clickOnRegister();
    await expect(registerPage.registerEmail).toHaveAttribute('required');
    const validated=await registerPage.registerEmail.evaluate(element=>element.validationMessage);
    if(validated==="Please fill out this field."){
        return true;
    }else{
        return false;
    }
     console.log(validated);
})
test("Validate signup with invalid email format",async ()=>{
    const homePage=new HomePage(page);
    await homePage.gotToRegisterPage();
    const registerPage=new RegisterPage(page);
    await registerPage.enterUserName("abanob");
    await registerPage.enterUserEmail("abanob.sororgmail.com");
    await registerPage.clickOnRegister();
    await expect(registerPage.registerEmail).toHaveAttribute('required');
    const validated=await registerPage.registerEmail.evaluate(element=>element.validationMessage);
    if(validated.includes("Please include an '@' in the email address. 'abanob.sororgmail.com' is missing an '@'.")){
        return true;
    }else{
        return false;
    }
     console.log(validated);
})
test("Validate signup with spaces in email field",async ()=>{
    const homePage=new HomePage(page);
    await homePage.gotToRegisterPage();
    const registerPage=new RegisterPage(page);
    await registerPage.enterUserName("abanob");
    await registerPage.enterUserEmail("aba    nob.soror@gmail.com");
    await registerPage.clickOnRegister();
    await expect(registerPage.registerEmail).toHaveAttribute('required');
    const validated=await registerPage.registerEmail.evaluate(element=>element.validationMessage);
    if(validated.includes("A part followed by '@' should not contain the symbol ' '")){
        return true;
    }else{
        return false;
    }
     console.log(validated);
})
test("Verify signup accepts email containing numeric values",async ()=>{
    const homePage=new HomePage(page);
    await homePage.gotToRegisterPage();
    const registerPage=new RegisterPage(page);
    await registerPage.enterUserName("abanob");
    await registerPage.enterUserEmail("abanob.soror2017@gmail.com");
    await registerPage.clickOnRegister();
      await expect(new confirmationPage(page).verify()).toBeVisible()
 
})
test("Validate signup with spaces-only input in name field",async ()=>{
    const homePage=new HomePage(page);
    await homePage.gotToRegisterPage();
    const registerPage=new RegisterPage(page);
    await registerPage.enterUserName(" ");
    await registerPage.enterUserEmail("abanob.soror2017@gmail.com");
    await registerPage.clickOnRegister();
   const errorMessage = page.getByText("Name cannot be blank"); 
    await expect(errorMessage).toBeVisible();
 
})
test("Verify signup with numeric values in username",async ()=>{
    const homePage=new HomePage(page);
    await homePage.gotToRegisterPage();
    const registerPage=new RegisterPage(page);
    await registerPage.enterUserName("Sorour123");
    await registerPage.enterUserEmail("abanob.soror2017@gmail.com");
    await registerPage.clickOnRegister();
    await expect(new confirmationPage(page).verify()).toBeVisible()
 
})
test("Verify signup with special characters in username",async ()=>{
    const homePage=new HomePage(page);
    await homePage.gotToRegisterPage();
    const registerPage=new RegisterPage(page);
    await registerPage.enterUserName("@@@@@");
    await registerPage.enterUserEmail("abanob.soror2017@gmail.com");
    await registerPage.clickOnRegister();
      const errorMessage = page.getByText("Name cannot contain special charcters"); 
    await expect(errorMessage).toBeVisible();
 
})
test("Verify signup with Arabic characters in username",async ()=>{
    const homePage=new HomePage(page);
    await homePage.gotToRegisterPage();
    const registerPage=new RegisterPage(page);
    await registerPage.enterUserName("أبانوب");
    await registerPage.enterUserEmail("abanob.soror2017@gmail.com");
    await registerPage.clickOnRegister();
     await expect(new confirmationPage(page).verify()).toBeVisible()
    
})
//    await expect(registerPage.registerEmail).toHaveAttribute('required');
//     const validated=await registerPage.registerEmail.evaluate(element=>element.validationMessage);
//     if(validated.includes("A part followed by '@' should not contain the symbol ' '")){
//         return true;
//     }else{
//         return false;
//     }
//      console.log(validated);