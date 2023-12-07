import { getAuth, loginViaAPI, token } from '../../models/APIHelpers'

describe('template spec', () => {
  it('login Via API', () => {
    loginViaAPI();
    // cy.visit('https://bookcart.azurewebsites.net', {
    //   onBeforeLoad(content) {
    //     content.window.localStorage.setItem('authToken', token);
    //   }
    // });
    // getAuth();
  })
})

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