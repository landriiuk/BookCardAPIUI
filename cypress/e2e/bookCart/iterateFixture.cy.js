
describe.skip('Iterate Through Fixture Object', () => {
    beforeEach(() => cy.visit('https://bookcart.azurewebsites.net'))
    it(`should login as `, () => {
        cy.fixture('fixtureJs.js').then((userData) => {
            Object.keys(userData).forEach((user) => {
                cy.log(userData[user].username)
            })
        });
    })
});