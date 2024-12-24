require("@4tw/cypress-drag-drop");

Cypress.Commands.add('acessaSite', () => {
    const baseUrl = 'https://practicesoftwaretesting.com'
    cy.visit(baseUrl)
})