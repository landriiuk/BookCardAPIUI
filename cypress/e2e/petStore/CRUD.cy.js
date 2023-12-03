import { faker } from '@faker-js/faker';

describe('CRUD api tests', () => {
    let petName = "VasylCat";
    const bodyTest = {
        "id": faker.number.int({ min: 100, max: 1000000 }),
        "category": {
            "id": 0,
            "name": "string"
        },
        "name": petName,
        "photoUrls": [
            "string"
        ],
        "tags": [
            {
                "id": 0,
                "name": "string"
            }
        ],
        "status": "available"
    };



    it('CREATE pet ', () => {
        cy.api({
            method: "POST",
            url: "/pet",
            body: bodyTest
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).not.empty
            expect(response.body.name).to.be.eq(petName)
            let petId = response.body.id
            Cypress.env('petId', petId)
        })
    });

    xit('READ, get all active pets and verify newly created ', () => {
        cy.api('/pet/findByStatus?status=available').then((response) => {
            const getBody = response.body;
            // const ifExist = getBody.find(el => el.name === petName);
            const ifExist = getBody.find(el => el.id === Cypress.env('petId'));
            console.log(ifExist);
            expect(ifExist).to.exist
        });
    });

    xit('READ, with alias by id', () => {
        cy.api(`/pet/${Cypress.env('petId')}`).as('availablePets');
        cy.get('@availablePets').should((pets) => {
            expect(pets).not.be.empty
            expect(pets.body.id).to.be.eq(Cypress.env('petId'));
        });
    });

    it('Upload img', () => {
        cy.fixture('picture.png').then((content) => {
            const formData = new FormData();
            formData.append('additionalMetadata', 'test_data');
            formData.append('file', new File([content], 'picture.png', { type: 'image/png' }));

            cy.api({
                method: 'POST',
                url: `/pet/${Cypress.env('petId')}/uploadImage`,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        })
    });

    it('Get Response and put it to fictures by exec', () => {
        cy.api(`/pet/${Cypress.env('petId')}`).then(({ body }) => {
            const formatPets = JSON.stringify(body)
            cy.exec(`echo '${formatPets}' > cypress/fixtures/petById.json`)
            // expect(cy.fixture('petById.json')).contain(formatPets)
            cy.fixture('petById.json').should('eql', body)
        });
    })


    it('get Response and put it to fixtures', () => {
        cy.api(`/pet/${Cypress.env('petId')}`).then(({ body }) => {
            cy.writeFile('cypress/fixtures/pet.json', body);
            cy.fixture('petById.json').should('eql', body);
        });

        cy.fixture('petById.json').then((user) => {
            //here was forEach, but we have only one element
            expect(user.id).to.eq(Cypress.env('petId'))
        });
    });
});