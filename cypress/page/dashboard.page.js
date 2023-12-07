export class Dashboard {

    searchBookByName(bookName) {
        cy.get('.searchbox').type(bookName).type('{enter}');
        cy.get('.mat-option').click();
    }

    verifyBookExist(bookName){
        cy.get('.card-title').each((books)=>{
            expect(books.text()).to.eq(bookName)
        })
    }
}