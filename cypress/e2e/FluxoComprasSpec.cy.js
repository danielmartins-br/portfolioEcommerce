/// <reference types="cypress" />

describe('Fluxo de Compras', function() {

    this.beforeEach(() => {
        cy.acessaSite()
    })

    it.skip('Verifica se as páginas principais ("Home", "Sign In", "Contato", "Categories", "Idioma") são carregadas corretamente.', function() {
        
        //Verifica página de Contato
        cy.get('[data-test="nav-contact"]')
        .should('be.visible')
        .click()

        cy.get('h3').contains('Contact')
        .should('be.visible')

        //Verifica página de Sign In
        cy.get('[data-test="nav-sign-in"]')
        .should('be.visible')
        .click()

        cy.get('h3').contains('Login')
        .should('be.visible')

        //Verifica página Home
        cy.get('[data-test="nav-home"]')
        .should('be.visible')
        .click()

        cy.get('.img-fluid')
        .should('be.visible')

        //Verifica Categories
        cy.get('[data-test="nav-categories"]')
        .should('be.visible')
        .click()

        cy.get('.navbar-nav > .dropdown > .dropdown-menu')
        .should('contain', 'Hand Tools')
        .should('contain', 'Power Tools')
        .should('contain', 'Other')
        .should('contain', 'Special Tools')
        .should('contain', 'Rentals')

        //Verifica Idioma
        cy.get('[data-test="language"]')
        .should('be.visible')
        .click()

        cy.get('#dropdown-animated')
        .should('contain', 'DE')
        .should('contain', 'EN')
        .should('contain', 'ES')
        .should('contain', 'FR')
        .should('contain', 'NL')
        .should('contain', 'TR')
    })

    it('Verifica itens da categoria "Hand Tools"', function() {

        //Filtra somente por "Hand Tools" na Tela Inicial
        cy.get(':nth-child(13) > :nth-child(2) > :nth-child(1)')
        .contains('Hand Tools')
        .should('be.visible')
        .click()

        //Hammer
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(2) > label > input')
        .should('be.checked')
        //Hand Saw
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(3) > label > input')
        .should('be.checked')
        //Wrench
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(4) > label > input')
        .should('be.checked')
        //Screwdriver
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(5) > label > input')
        .should('be.checked')
        //Pliers
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(6) > label > input')
        .should('be.checked')
        //Chisels
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(7) > label > input')
        .should('be.checked')
        //Measures
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(8) > label > input')
        .should('be.checked')

        //Desmarca todos os itens a categoria "Hand Tools" na Tela Inicial
        cy.get(':nth-child(13) > :nth-child(2) > :nth-child(1)')
        .contains('Hand Tools')
        .click()

        //Verifica se todos os itens estão desmarcados
        //Hammer
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(2) > label > input')
        .should('not.be.checked')
        //Hand Saw
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(3) > label > input')
        .should('not.be.checked')
        //Wrench
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(4) > label > input')
        .should('not.be.checked')
        //Screwdriver
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(5) > label > input')
        .should('not.be.checked')
        //Pliers
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(6) > label > input')
        .should('not.be.checked')
        //Chisels
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(7) > label > input')
        .should('not.be.checked')
        //Measures
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(8) > label > input')
        .should('not.be.checked')

        //Seleciona somente itens da categoria "Hammer"
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(2) > label > input')
        .click()

        //Verifica se listou somente Martelos
        cy.get('.col-md-9')
        .should('contain', 'Thor Hammer')

        //Desmarca itens da categoria "Hammer"
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(2) > label > input')
        .click()

        //Seleciona somente itens da categoria Hand Saw
        cy.wait(1000)
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(3) > label > input')
        .click()

        //Verifica se listou somente Serrotes
        cy.get('.col-md-9')
        .should('contain', 'Wood Saw')

        //Desmarca itens da categoria Hand Saw
        cy.wait(1000)
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(3) > label > input')
        .click()

        //Seleciona somente itens da categoria Wrench
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(4) > label > input')
        .click()

        //Verifica se listou somente Chave de Boca
        cy.get('.col-md-9')
        .should('contain', 'Wrench')
        .should('contain', 'Spanner')

        //Desmarca itens da categoria Wrench
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(4) > label > input')
        .click()

        //Seleciona somente itens da categoria Screwdriver
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(5) > label > input')
        .click()

        //Verifica se listou somente Chave de Fenda
        cy.get('.col-md-9')
        .should('contain', 'Screwdriver')

        //Desmarca itens da categoria Screwdriver
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(5) > label > input')
        .click()

        //Seleciona somente itens da categoria Pliers
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(6) > label > input')
        .click()

        //Verifica se listou somente Alicates
        cy.get('.col-md-9')
        .should('contain', 'Pliers')

        //Desmarca itens da categoria Pliers
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(6) > label > input')
        .click()

        //Seleciona somente itens da categoria Chisels
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(7) > label > input')
        .click()

        //Verifica se listou somente Formão
        cy.get('.col-md-9')
        .should('contain', 'Chisels')

        //Desmarca itens da categoria Chisels
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(7) > label > input')
        .click()

        //Seleciona somente itens da categoria Measures
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(8) > label > input')
        .click()

        //Verifica se listou somente Fitas Métricas
        cy.get('.col-md-9')
        .should('contain', 'Tape Measure')
        .should('contain', 'Measuring Tape')
        .should('contain', 'Square Ruler')
    })

    it('Verifica itens da categoria "Power Tools"', function() {
        
    })
})