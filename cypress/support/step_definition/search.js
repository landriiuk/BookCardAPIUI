import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps'
import { Dashboard } from '../../page/dashboard.page';
import { loginViaAPI } from '../../models/APIHelpers';

const dashboard = new Dashboard();
Given('User visited website', () => {
    cy.visit('')
});

And('And Logged in', () => {
    loginViaAPI();
    cy.visit('', {
        onBeforeLoad(content) {
            content.window.localStorage.setItem('authToken', Cypress.env('token'));
        }
    });
    cy.log('step1')
});

// When(`User search for {string}`, (book) => {
//     dashboard.searchBookByName(book);
// });

// Then(`Book {string} exists`, (book) => {
//     dashboard.verifyBookExist(book);
// });

// User search for Book

When(`User search for {string}`, (book) => {
    // const data = tableData.hashes()[0];
    dashboard.searchBookByName(book);
});

Then(`Book {string} exists`, (book) => {
    dashboard.verifyBookExist(book);
});