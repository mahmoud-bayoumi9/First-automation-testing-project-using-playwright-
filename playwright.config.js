// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({ // الكود تم تصحيحه هنا (تمت إعادة export default defineConfig)
  testDir: './tests',
      reporter: [["html"], ["allure-playwright"],['line'],
    ['allure-playwright', { resultsDir: 'allure-results' }]],
  //retries:number to retreis th faliure testcases that faill and run it agaign with nuumber equal number
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000
  },
  /* Run tests in files in parallel */
  // fullyParallel: true,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: 'on',  // سيأخذ لقطة شاشة لكل خطوة مجبراً
    trace: 'on',  
    //viewport:{width:433,height:433}     // to  manage the size of screen htat hte browser open in it
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        headless: false,   // فتح المتصفح أمامك بشكل مرئي
      },
    },
  ],
});