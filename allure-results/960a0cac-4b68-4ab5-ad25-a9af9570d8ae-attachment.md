# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: confirmation.spec.js >> Validate account creation without selecting title
- Location: tests\confirmation.spec.js:44:5

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://automationexercise.com/", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | const HomePage = require('../pages/home');
  3   | const RegisterPage = require('../pages/RegisterPage');
  4   | const confirmationPage = require('../pages/confirmationPage');
  5   | let page; 
  6   | test.beforeEach(async function({ browser }){
  7   |     const context = await browser.newContext();
  8   |     page = await context.newPage(); 
  9   |     await page.route('**/*googlesyndication*', route => route.abort());
  10  |     await page.route('**/*googleads*', route => route.abort());
  11  |     await page.route('**/*doubleclick*', route => route.abort());
> 12  |     await page.goto("https://automationexercise.com");
      |                ^ Error: page.goto: Target page, context or browser has been closed
  13  |     const homePage = new HomePage(page);
  14  |     await homePage.gotToRegisterPage();
  15  |     const registerPage = new RegisterPage(page);
  16  |     await registerPage.enterUserName("Abanob");
  17  |     await registerPage.enterUserEmail(await new confirmationPage(page).generateRandomEmail());
  18  |     await registerPage.clickOnRegister();
  19  | });
  20  | test("Verify account creation with valid mandatory data", async () => { 
  21  |     const confirm = new confirmationPage(page); 
  22  |     await confirm.createAcount(
  23  |         "Mrs", 
  24  |         "012224478862", 
  25  |         "1", 
  26  |         "January",
  27  |         "2002", 
  28  |         "Abanob", 
  29  |         "sorour", 
  30  |         "iti", 
  31  |         "street Mohamed Shams_ Ain Shams 22", 
  32  |         "street Mohamed Shams", 
  33  |         "India", 
  34  |         "Egypt", 
  35  |         "Cairo", 
  36  |         "3753450", 
  37  |         "+201270180191"
  38  |     );
  39  |     
  40  |     await confirm.clickOnCreateButton();
  41  |     await expect(page).toHaveURL('https://automationexercise.com/account_created');
  42  | 
  43  | });
  44  | test("Validate account creation without selecting title", async () => { 
  45  |     const confirm = new confirmationPage(page); 
  46  |     await confirm.createAcount(
  47  |         " ", 
  48  |         "012224478862", 
  49  |         "1", 
  50  |         "January",
  51  |         "2002", 
  52  |         "Abanob", 
  53  |         "sorour", 
  54  |         "iti", 
  55  |         "street Mohamed Shams_ Ain Shams 22", 
  56  |         "street Mohamed Shams", 
  57  |         "India", 
  58  |         "Egypt", 
  59  |         "Cairo", 
  60  |         "3753450", 
  61  |         "+201270180191"
  62  |     );
  63  |     
  64  |     await confirm.clickOnCreateButton();
  65  |     await expect(page).toHaveURL('https://automationexercise.com/account_created');
  66  | 
  67  | });
  68  | test("Validate account creation without password", async () => { 
  69  |     const confirm = new confirmationPage(page); 
  70  |     await confirm.createAcount(
  71  |         "Mrs", 
  72  |         "", 
  73  |         "1", 
  74  |         "January",
  75  |         "2002", 
  76  |         "Abanob", 
  77  |         "sorour", 
  78  |         "iti", 
  79  |         "street Mohamed Shams_ Ain Shams 22", 
  80  |         "street Mohamed Shams", 
  81  |         "India", 
  82  |         "Egypt", 
  83  |         "Cairo", 
  84  |         "3753450", 
  85  |         "+201270180191"
  86  |     );
  87  |     
  88  |   await expect( confirm.password).toHaveAttribute('required');
  89  | const validated=await  confirm.password .evaluate(element=>element.validationMessage);
  90  | if(validated.includes("Please fill out this field.")){
  91  |          return true;
  92  |      }else{
  93  |          return false;
  94  |      }
  95  | 
  96  | });
  97  | test("Validate account creation without date of birth", async () => { 
  98  |     const confirm = new confirmationPage(page); 
  99  |     await confirm.createAcount(
  100 |         "Mrs", 
  101 |         "012224478862", 
  102 |         "", 
  103 |         "",
  104 |         "", 
  105 |         "Abanob", 
  106 |         "sorour", 
  107 |         "iti", 
  108 |         "street Mohamed Shams_ Ain Shams 22", 
  109 |         "street Mohamed Shams", 
  110 |         "India", 
  111 |         "Egypt", 
  112 |         "Cairo", 
```