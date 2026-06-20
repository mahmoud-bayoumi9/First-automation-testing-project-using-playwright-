import { test, expect } from '@playwright/test';
const HomePage = require('../pages/home');
const RegisterPage = require('../pages/RegisterPage');
const confirmationPage = require('../pages/confirmationPage');
let page; 
test.beforeEach(async function({ browser }){
    const context = await browser.newContext();
    page = await context.newPage(); 
    await page.route('**/*googlesyndication*', route => route.abort());
    await page.route('**/*googleads*', route => route.abort());
    await page.route('**/*doubleclick*', route => route.abort());
    await page.goto("https://automationexercise.com");
    const homePage = new HomePage(page);
    await homePage.gotToRegisterPage();
    const registerPage = new RegisterPage(page);
    await registerPage.enterUserName("Abanob");
    await registerPage.enterUserEmail(await new confirmationPage(page).generateRandomEmail());
    await registerPage.clickOnRegister();
});
test("Verify account creation with valid mandatory data", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
    
    await confirm.clickOnCreateButton();
    await expect(page).toHaveURL('https://automationexercise.com/account_created');

});
test("Validate account creation without selecting title", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        " ", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
    
    await confirm.clickOnCreateButton();
    await expect(page).toHaveURL('https://automationexercise.com/account_created');

});
test("Validate account creation without password", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
    
  await expect( confirm.password).toHaveAttribute('required');
const validated=await  confirm.password .evaluate(element=>element.validationMessage);
if(validated.includes("Please fill out this field.")){
         return true;
     }else{
         return false;
     }

});
test("Validate account creation without date of birth", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "", 
        "",
        "", 
        "Abanob", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
    await expect(page).toHaveURL('https://automationexercise.com/account_created');
  

});
test("Validate account creation without first name", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
await expect( confirm.firstName).toHaveAttribute('required');
const validated=await  confirm.firstName .evaluate(element=>element.validationMessage);
if(validated.includes("Please fill out this field.")){
         return true;
     }else{
         return false;
     }
  

});
test("Verify account creation with Arabic characters in first name", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "ابانوب", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
    await expect(page).toHaveURL('https://automationexercise.com/account_created')
  

});
test("Verify account creation with special characters in first name", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob@", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
     const errorMessage = page.getByText("Name cannot contain special charcters"); 
       await expect(errorMessage).toBeVisible();
  

});
test("Validate account creation without last name", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
await expect( confirm.LastName).toHaveAttribute('required');
const validated=await  confirm.LastName .evaluate(element=>element.validationMessage);
if(validated.includes("Please fill out this field.")){
         return true;
     }else{
         return false;
     }
  

});
test("Verify account creation with Arabic characters in last name", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "سرور", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
    await expect(page).toHaveURL('https://automationexercise.com/account_created')
  

});
test("Verify account creation with special characters in last name", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour@", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
     const errorMessage = page.getByText("Name cannot contain special charcters"); 
       await expect(errorMessage).toBeVisible();
  

});
test("Verify account creation without company name", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
   await expect(page).toHaveURL('https://automationexercise.com/account_created')
  

});
test("Validate account creation without address line 1", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "iti", 
        "", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
  await expect( confirm.address1).toHaveAttribute('required');
const validated=await  confirm.address1.evaluate(element=>element.validationMessage);
if(validated.includes("Please fill out this field.")){
         return true;
     }else{
         return false;
     }
});
test("Validate account creation without address line 2", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "", 
        "India", 
        "Egypt", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
   await expect(page).toHaveURL('https://automationexercise.com/account_created')
});

test("Validate account creation without state field", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "", 
        "Cairo", 
        "3753450", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
  await expect( confirm.state).toHaveAttribute('required');
const validated=await  confirm.state.evaluate(element=>element.validationMessage);
if(validated.includes("Please fill out this field.")){
         return true;
     }else{
         return false;
     }
});
test("Validate account creation without city", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "", 
        "3753450", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
  await expect( confirm.city).toHaveAttribute('required');
const validated=await  confirm.city.evaluate(element=>element.validationMessage);
if(validated.includes("Please fill out this field.")){
         return true;
     }else{
         return false;
     }
});
test("Validate account creation without zip code", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "", 
        "+201270180191"
    );
        await confirm.clickOnCreateButton();
  await expect( confirm.zip).toHaveAttribute('required');
const validated=await  confirm.zip.evaluate(element=>element.validationMessage);
if(validated.includes("Please fill out this field.")){
         return true;
     }else{
         return false;
     }
});
test("Validate account creation without mobile number", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "342432", 
        ""
    );
        await confirm.clickOnCreateButton();
  await expect( confirm.phone).toHaveAttribute('required');
const validated=await  confirm.phone.evaluate(element=>element.validationMessage);
if(validated.includes("Please fill out this field.")){
         return true;
     }else{
         return false;
     }
});
test("Verify mobile number field accepts alphabetic characters", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "342432", 
        "0233dsknc"
    );
     const errorMessage = page.getByText("Name cannot contain special charcters"); 
       await expect(errorMessage).toBeVisible();
  
});
test("Verify mobile number field accepts special characters", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "342432", 
        "0233@@433"
    );
     const errorMessage = page.getByText("Name cannot contain special charcters"); 
       await expect(errorMessage).toBeVisible();
  
});
test("Verify mobile number field accepts spaces between digits", async () => { 
    const confirm = new confirmationPage(page); 
    await confirm.createAcount(
        "Mrs", 
        "012224478862", 
        "1", 
        "January",
        "2002", 
        "Abanob", 
        "sorour", 
        "iti", 
        "street Mohamed Shams_ Ain Shams 22", 
        "street Mohamed Shams", 
        "India", 
        "Egypt", 
        "Cairo", 
        "342432", 
        "0233 433"
    );
     const errorMessage = page.getByText("Name cannot contain spaces"); 
       await expect(errorMessage).toBeVisible();
  
});