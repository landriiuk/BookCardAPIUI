/// <reference types="cypress" />
// export let token;
// export let userId;

export function loginViaAPI() {

    cy.request({
        method: "POST",
        url: "https://bookcart.azurewebsites.net/api/login",
        body: {
            "username": "hsdbvwjgvwj",
            "password": "SqTnwf2@HBJu"
        }
    }).then((response) => {
        let token = response.body.token;
        let userId = response.body.userDetails.userId;
        cy.log(userId)
        Cypress.env('userId', userId);
        cy.log(Cypress.env('userId'))
        Cypress.env('token', token);
        cy.log(response.status);
    });
    // }
    // export function login() {
    //     cy.visit('https://bookcart.azurewebsites.net', {
    //         onBeforeLoad(content) {
    //             content.window.localStorage.setItem('authToken', token);
    //         }
    //     });
    // }
    cy.wrap(Cypress.env('userId'))

    cy.wrap(Cypress.env('token'))

    // export function getAuth() {
    cy.request({
        
        method: "POST",
        url: `/api/CheckOut/${Cypress.env('userId')}`,
        body: {
            "orderId": "string",
            "orderDetails": [
                {
                    "book": {
                        "bookId": 0,
                        "title": "string",
                        "author": "string",
                        "category": "string",
                        "price": 0,
                        "coverFileName": "string"
                    },
                    "quantity": 0
                }
            ],
            "cartTotal": 0,
            "orderDate": "2023-11-30T19:03:10.366Z"
        },
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${Cypress.env('token')}`
        }

    })
}