describe("Category test suite", () => {
    beforeEach(() => {
        cy.loginViaAPI();
    });

    it("Add and validate a category", () => {
        cy.contains("Асортимент").click();
        cy.contains("button", "Додати категорію").click();
        cy.get("#name").type("Category 6");
        cy.get("input[type='file']").selectFile("/fixtures/picture.png", {force: true});
        cy.createItem();
    });

    it("Create and validate an order", () => {
        cy.contains("Додати замовлення").click();
        cy.contains("div h5", "Category 6").click();
        for (let i = 0; i < 3; i++) {
            const randomNumber = Math.round(Math.random() * 100);
            cy.get("input[type='number']").eq(i).clear().type(randomNumber);
            cy.get("button.btn-small").eq(i).click();
        }
        cy.contains("button", "Завершити").click();
        cy.filterOrderByID();
    });

    it("Delete the created category and validate the presence in DB", () => {
        cy.contains("Асортимент").click();
        cy.contains("a.collection-item", "Category 6").click();
        cy.on('window:confirm', () => true);
        cy.contains("button i", "delete").click();
        cy.verifyCategoryInDB();
    });
});