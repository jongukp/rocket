# QA Exercise

## Overview

This tiny application have a few features including:

- a header with a title
- a footer with a button to add boxes and a separate button to remove boxes
- an area where we can see boxes with numbers in them show up on the screen

## Steps

1. Ensure you have Google Chrome installed. Otherwise, you'll need to reconfigure Cypress to work with your browser of choice.
2. Clone the application `git clone https://github.com/RocketPartners/qa-exercise.git`
3. Install dependencies `npm install`
   - Need `npm`? Install from [NodeJs.org](https://nodejs.org/en/download/)
4. Run `npm run start` and examine the application
5. Write tests using Cypress for the application
   - See `cypress/integration/spec.js`
   - Reference the Cypress [documentation](https://docs.cypress.io/guides/overview/why-cypress)
6. Validate your tests running `npm run cypress`
7. Email a plaintext file of `spec.js` to `qarecruiting@rocketpartners.io`
   - If you make additional changes to the project, please submit a zip file of the project instead
8. To run cypress on cmd, `npm run cy:run` please note it will run on headless Electron Browser.
9. To run cypress on parallel, `npm run cy:parallel` please note it will run on headless Electron Browser on 2 threads. Please note that this test won't get much advantage running parallel at this point.