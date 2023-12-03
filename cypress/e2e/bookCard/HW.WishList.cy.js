describe('Wishlist spec', () => {
    let productId = 2;

    before(() => {
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
    });

    it('Post Wishlist item', () => {
        cy.api({
            method: "POST",
            url: `/api/Wishlist/ToggleWishlist/${Cypress.env('userId')}/${productId}`,
            headers: {
                'accept': 'text/plain',
                'Authorization': 'Bearer ' + Cypress.env('token'),
            },
        }).then((response) => {
            cy.log(response.body)
            expect(response.status).to.eq(200);
        });
    })
})