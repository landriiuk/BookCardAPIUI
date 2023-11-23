import { loginViaAPI, token } from '../models/APIHelpers'

describe('template spec', () => {
  it('login Via API', () => {
    loginViaAPI();
    cy.visit('https://bookcart.azurewebsites.net', {
      onBeforeLoad(content) {
        content.window.localStorage.setItem('authToken', token);
      }
    });
  })
})