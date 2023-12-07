import { getAuth, loginViaAPI, token } from '../../models/APIHelpers'

describe('template spec', () => {
  it('login Via API', () => {
    loginViaAPI();
    cy.visit('https://bookcart.azurewebsites.net', {
      onBeforeLoad(content) {
        content.window.localStorage.setItem('authToken', Cypress.env('token'));
      }
    });
    cy.wait(1000);
    cy.percySnapshot();
  })

  it('Fail test', () => {
    cy.url().should('contain', 'https://bookcart.azurewebsites.nethttps://bookcart.azurewebsites.net');
  });
});

// // pom 
// selectRandomSkills() {
//   return new Promise((resolve) => {
//     let options = this.getAllOptionsByColumn('type');
//     cy.wrap(options).then((options) => {
//       let randomAmount = randomInteger(1, options.length);
//       cy.contains(options[randomAmount]).click();
//       let selectedOption = options[randomAmount];
//       resolve(selectedOption);
//     });
//   });
// }

// // it
// filtersClass.selectRandomSkills().then((option) => {
//   let arrayOptions = [];
//   arrayOptions.push(option);
//   filtersClass.verifyFilterCounter(arrayOptions.length);
//   cy.request(()=>...)
// })