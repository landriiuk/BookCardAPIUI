/// <reference types="cypress" />
export let token;
export function loginViaAPI() {
    cy.request({
        method: "POST",
        url: "https://bookcart.azurewebsites.net/api/login",
        body: {
            "username": "hsdbvwjgvwj",
            "password": "SqTnwf2@HBJu"
        }
    }).then((response) => {
        token = response.body.token;
        cy.log(response);
        cy.log(response.body.token);
        cy.log(response.status);
    });
}
export function login() {
    cy.visit('https://bookcart.azurewebsites.net', {
        onBeforeLoad(content) {
            content.window.localStorage.setItem('authToken', token);
        }
    });
}