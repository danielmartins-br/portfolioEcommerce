Cypress.Commands.add('acessaSite', () => {
    const baseUrl = 'https://practicesoftwaretesting.com'
    cy.visit(baseUrl)
})