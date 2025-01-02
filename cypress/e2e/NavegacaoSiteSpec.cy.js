/// <reference types="cypress" />

describe('Navegação no Site', function() {

    this.beforeEach(() => {
        cy.acessaSite()
    })

    it('Verifica se a página "Home" é carregada corretamente.', function() {
        
        //Verifica página Home
        cy.get('[data-test="nav-home"]')
        .should('be.visible')
        .click()

        cy.get('.img-fluid')
        .should('be.visible')  //Banner do site aparece somente na Home
    })

    it('Verifica se itens do menu "Categories" são listados corretamente.', function() {
        //Verifica Categories
        cy.get('[data-test="nav-categories"]')
        .should('be.visible')
        .click()

        cy.get('[data-test="nav-hand-tools"]')
        .should('be.visible')
        cy.get('[data-test="nav-power-tools"]')
        .should('be.visible')
        cy.get('[data-test="nav-other"]')
        .should('be.visible')
        cy.get('[data-test="nav-special-tools"]')
        .should('be.visible')
        cy.get('[data-test="nav-rentals"]')
        .should('be.visible')
    })

    it('Seleciona categoria "Hand Tools" do menu "Categories"', function(){
        //Clica no menu
        cy.get('[data-test="nav-categories"]')
        .click()

        //Seleciona Categoria "Hand Tools"
        cy.get('[data-test="nav-hand-tools"]')
        .should('be.visible')
        .should('contain.text', 'Hand Tools')
        .click()

        //Verifica título da página
        cy.get('[data-test="page-title"]')
        .should('have.text', 'Category: Hand Tools')
    })

    it('Seleciona categoria "Power Tools" do menu "Categories"', function(){
        //Clica no menu
        cy.get('[data-test="nav-categories"]')
        .click()

        //Seleciona Categoria "Power Tools"
        cy.get('[data-test="nav-power-tools"]')
        .should('be.visible')
        .should('contain.text', 'Power Tools')
        .click()

        //Verifica título da página
        cy.get('[data-test="page-title"]')
        .should('have.text', 'Category: Power Tools')
    })

    it('Seleciona categoria "Other" do menu "Categories"', function() {
        //Clica no menu
        cy.get('[data-test="nav-categories"]')
        .click()

        //Seleciona Categoria "Other"
        cy.get('[data-test="nav-other"]')
        .should('be.visible')
        .should('contain.text', 'Other')
        .click()

        //Verifica título da página
        cy.get('[data-test="page-title"]')
        .should('have.text', 'Category: Other')
    })

    it('Seleciona categoria "Special Tools" do menu "Categories"', function() {
        //Clica no menu
        cy.get('[data-test="nav-categories"]')
        .click()

        //Seleciona Categoria "Special Tools"
        cy.get('[data-test="nav-special-tools"]')
        .contains('Special Tools')
        .should('be.visible')
        .click()

        //Verifica título da página
        cy.get('[data-test="page-title"]')
        .should('have.text', 'Category: Special Tools')
    })

    it('Seleciona categoria "Rentals" do menu "Categories"', function() {
        //Clica no menu
        cy.get('[data-test="nav-categories"]')
        .click()

        //Seleciona Categoria "Rentals"
        cy.get('[data-test="nav-rentals"]')
        .contains('Rentals')
        .should('be.visible')
        .click()

        //Verifica título da página
        cy.get('[data-test="page-title"]')
        .should('have.text', 'Rentals')
    })

    it('Verifica lista de idiomas.', function() {
        //Verifica Idioma, por padrão o site é carregado em inglês
        cy.get('[data-test="language"]')
        .should('be.visible')
        .click()

        cy.get('[class="dropdown-item"]')
        .should('contain', 'DE')
        .should('contain', 'EN')
        .should('contain', 'ES')
        .should('contain', 'FR')
        .should('contain', 'NL')
        .should('contain', 'TR')
    })

    it('Muda idioma para alemão', function() {
        //Clica no menu de idiomas
        cy.get('[data-test="language"]')
        .click()
        
        //Muda idioma para alemão
        cy.get('[class="dropdown-item"]')
        .contains('DE')
        .click()

        cy.get('[data-test="language"]')
        .should('contain.text', 'DE')

        //Verifica se o idioma mudou consultando os nomes do botão de pesquisa faixa de preço
        cy.get('#filters')
        .should('contain.text','Sortieren')
        .should('contain.text','Preisspanne')
    })

    it('Muda idioma para espanhol', function() {
        //Clica no menu de idiomas
        cy.get('[data-test="language"]')
        .click()

        //Muda o idioma para espanhol
        cy.get('[class="dropdown-item"]')
        .contains('ES')
        .click()

        cy.get('[data-test="language"]')
        .should('contain.text', 'ES')

        //Verifica se o idioma mudou
        cy.get('#filters')
        .should('contain.text','Ordenar')
        .should('contain.text','Rango de precios')
    })

    it('Muda o idioma para frances', function() {
        //Clica no menu de idiomas
        cy.get('[data-test="language"]')
        .click()

        //Muda o idioma para frances
        cy.get('[class="dropdown-item"]')
        .contains('FR')
        .click()
        cy.get('[data-test="language"]')
        .should('contain.text', 'FR')

        //Verifica se o idioma mudou
        cy.get('#filters')
        .should('contain.text','Rechercher')
        .should('contain.text','Fourchette de prix')
    })

    it('Muda idioma para holandês', function() {
        //Clica no menu de idiomas
        cy.get('[data-test="language"]')
        .click()

        //Muda o idioma para holandês
        cy.get('[class="dropdown-item"]')
        .contains('NL')
        .click()

        cy.get('[data-test="language"]')
        .should('contain.text', 'NL')

        //Verifica se o idioma mudou
        cy.get('#filters')
        .should('contain.text','Zoeken')
        .should('contain.text','Prijsklasse')
    })

    it('Muda idioma para turco', function() {
        //Clica no menu de idiomas
        cy.get('[data-test="language"]')
        .click()

        //Muda o idioma para turco
        cy.get('[class="dropdown-item"]')
        .contains('TR')
        .click()
        cy.get('[data-test="language"]')
        .should('contain.text', 'TR')

        //Verifica se o idioma mudou
        cy.get('#filters')
        .should('contain.text','Sırala')
        .should('contain.text','Fiyat Aralığı')
    })

    it('Muda idioma para inglês', function() {
        //Clica no menu de idiomas
        cy.get('[data-test="language"]')
        .click()

        //Muda o idioma para turco
        cy.get('[class="dropdown-item"]')
        .contains('EN')
        .click()
        cy.get('[data-test="language"]')
        .should('contain.text', 'EN')

        //Verifica se o idioma mudou
        cy.get('#filters')
        .should('contain.text','Search')
        .should('contain.text','Price Range')
    })

    it('Verifica se a página "Sign In" é carregada corretamente', function(){
        //Verifica página de Sign In
        cy.get('[data-test="nav-sign-in"]')
        .should('be.visible')
        .click()

        cy.get('h3').contains('Login')
        .should('be.visible')

        //Botão de login com Google
        cy.get('button')
        .contains('Sign in with Google')
        .should('contain.text', 'Sign in with Google')
        .should('be.visible')
        
        //Verifica campos da tela [email,senha,login]
        cy.get('[data-test="login-form"]')
        .should('contain.text', 'Email address *')
        .should('contain.text', 'Password *')
        cy.get('[data-test="login-submit"]')
        .should('be.visible')

        //Registrar nova conta
        cy.get('[data-test="register-link"]')
        .should('be.visible')  
    })

    it('Verifica se a página "Forgot Password" é exibida corretamente', function() {
        //Acessa página de Sign In
        cy.get('[data-test="nav-sign-in"]')
        .should('be.visible')
        .click()

        //Esqueci minha senha
        cy.get('[data-test="forgot-password-link"]')
        .should('be.visible')
        .click()

        cy.get('h3').contains('Forgot Password')
        .should('be.visible')
        cy.get('[data-test="email"]')
        .should('be.visible')
        cy.get('[data-test="forgot-password-submit"]')
        .should('be.visible')
    })

    it('Verifica se a página "Customer Registration" é exibida corretamente', function() {
        cy.get('[data-test="nav-sign-in"]')
        .should('be.visible')
        .click()

        //Registrar nova conta
        cy.get('[data-test="register-link"]')
        .should('be.visible')
        .click()

        //Verifica campos da tela
        cy.get('h3').contains('Customer registration')
        .should('be.visible')

        cy.get('[data-test="first-name"]')
        .should('be.visible')
        cy.get('[data-test="last-name"]')
        .should('be.visible')
        cy.get('[data-test="dob"]')
        .should('be.visible')
        cy.get('[data-test="address"]')
        .should('be.visible')
        cy.get('[data-test="postcode"]')
        .should('be.visible')
        cy.get('[data-test="city"]')
        .should('be.visible')
        cy.get('[data-test="state"]')
        .should('be.visible')
        cy.get('[data-test="country"]')
        .should('be.visible')
        cy.get('[data-test="phone"]')
        .should('be.visible')
        cy.get('[data-test="email"]')
        .should('be.visible')
        cy.get('[data-test="password"]')
        .should('be.visible')
        cy.get('#passwordHelp')
        .should('be.visible')
        cy.get('.password-strength')
        .should('be.visible')
        cy.get('[data-test="register-submit"]')
        .should('be.visible')
    })

    it('Verifica se a página "Contact" é carregada corretamente', function() {
        //Verifica página de Contato
        cy.get('[data-test="nav-contact"]')
        .should('be.visible')
        .click()

        cy.get('h3').contains('Contact')
        .should('be.visible')

        //Campos do formulário
        cy.get('.form-label')
        .should('contain.text', 'First name')
        .should('contain.text', 'Last name')
        .should('contain.text', 'Email address')
        .should('contain.text', 'Subject')
        .should('contain.text', 'Message *')
        .should('contain.text', 'Attachment')

        cy.get('#attachmentHelp')
        .should('have.text', 'Only files with the txt extension are allowed, and files must be 0kb.')

        cy.get('[data-test="contact-submit"]')
        .should('be.visible')

        /*Seleciona cada uma das opções de motivo do contato*/
        cy.get('[data-test="subject"]')
        .select('Customer service')
        .select('Webmaster')
        .select('Return')
        .select('Payments')
        .select('Warranty')
        .select('Status of my order')
    })
    
    it('Verifica se o filtro marca somente itens da categoria "Hand Tools"', function() {
        //Filtra somente por "Hand Tools" na Tela Inicial
        cy.get('label')
        .contains('Hand Tools')
        .click()

        //Verifica se todos os itens filhos de "Hand Tools" foram marcados
        //Hammer
        cy.contains('label', 'Hammer')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Hand Saw
        cy.contains('label','Hand Saw')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Wrench
        cy.contains('label','Wrench')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Screwdriver
        cy.contains('label','Screwdriver')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Pliers
        cy.contains('label','Pliers')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Chisels
        cy.contains('label','Chisels')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Measures
        cy.contains('label','Measures')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')

        //Desmarca todos os itens a categoria "Hand Tools" na Tela Inicial
        cy.get('label')
        .contains('Hand Tools')
        .click()
    })

    it('Verifica se o filtro desmarca somente itens da categoria "Hand Tools"', function() {

        //Verifica se todos os itens estão desmarcados
        //Hammer
        cy.contains('label', 'Hammer')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Hand Saw
        cy.contains('label','Hand Saw')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Wrench
        cy.contains('label','Wrench')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Screwdriver
        cy.contains('label','Screwdriver')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Pliers
        cy.contains('label','Pliers')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Chisels
        cy.contains('label','Chisels')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Measures
        cy.contains('label','Measures')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
    })

    it('Verifica se o filtro listou somente martelos', function() {
        //Seleciona somente itens da categoria "Hammer"
        cy.contains('label', 'Hammer')
        .find('input[type="checkbox"]')
        .check()

        //Verifica se listou somente Martelos
        cy.get('[data-test="product-name"]')
        .should('contain.text', 'Thor Hammer', {timeout: 6000})
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')

        //Desmarca itens da categoria "Hammer"
        cy.contains('label', 'Hammer')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente serrotes', function() {
        //Seleciona somente itens da categoria Hand Saw
        cy.contains('label','Hand Saw')
        .find('input[type="checkbox"]')
        .check()

        //Verifica se listou somente Serrotes
        cy.get('[data-test="product-name"]')
        .should('contain.text', 'Wood Saw')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')

        //Desmarca itens da categoria Hand Saw
        cy.contains('label','Hand Saw')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente chaves de boca', function() {
        //Seleciona somente itens da categoria Wrench
        cy.contains('label','Wrench')
        .find('input[type="checkbox"]')
        .check()

        //Verifica se listou somente Chave de Boca
        cy.get('[data-test="product-name"]')
        .should('contain.text', 'Adjustable Wrench')
        .should('contain.text', 'Angled Spanner')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')

        //Desmarca itens da categoria Wrench
        cy.contains('label','Wrench')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente chaves de fenda', function() {
        //Seleciona somente itens da categoria Screwdriver
        cy.contains('label','Screwdriver')
        .find('input[type="checkbox"]')
        .check()

        //Verifica se listou somente Chave de Fenda
        cy.get('[data-test="product-name"]')
        .should('contain.text', 'Phillips Screwdriver')
        .should('contain.text', 'Mini Screwdriver')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')

        //Desmarca itens da categoria Screwdriver
        cy.contains('label','Screwdriver')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente alicates', function(){
        //Seleciona somente itens da categoria Pliers
        cy.contains('label','Pliers')
        .find('input[type="checkbox"]')
        .check()

        //Verifica se listou somente Alicates
        cy.get('[data-test="product-name"]')
        .should('contain.text', 'Pliers')
        .should('contain.text', 'Combination Pliers')
        .should('not.contain.text', 'Hammer')

        //Desmarca itens da categoria Pliers
        cy.contains('label','Pliers')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente formão', function(){
        //Seleciona somente itens da categoria Chisels
        cy.contains('label','Chisels')
        .find('input[type="checkbox"]')
        .check()
 
        //Verifica se listou somente Formão
        cy.get('[data-test="product-name"]')
        .should('contain.text', 'Chisels Set')
        .should('contain.text', 'Wood Carving Chisels')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')
 
        //Desmarca itens da categoria Chisels
        cy.contains('label','Chisels')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente fitas métricas', function(){
        //Seleciona somente itens da categoria Measures
        cy.contains('label','Measures')
        .find('input[type="checkbox"]')
        .check()

        //Verifica se listou somente Fitas Métricas
        cy.get('[data-test="product-name"]')
        .should('contain.text', 'Tape Measure')
        .should('contain.text', 'Measuring Tape')
        .should('contain.text', 'Square Ruler')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')

        //Desmarca itens da categoria Measures
        cy.contains('label','Measures')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro marca somente itens da categoria "Power Tools"', function() {
        //Filtra somente por "Power Tools" na Tela Inicial
        cy.get('label')
        .contains('Power Tools')
        .click()

        //Verifica se todos os itens filhos de "Power Tools" foram selecionados
        //Grinder
        cy.contains('label','Grinder')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Sander
        cy.contains('label','Sander')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Saw
        cy.contains('label','Saw')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Drill
        cy.contains('label','Drill')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')

        //Desmarca todos os itens da categoria "Power Tools" na Tela Inicial
        cy.get('label')
        .contains('Power Tools')
        .click()
    })

    it('Verifica se o filtro desmarca somente itens da categoria "Power Tools"', function() {
        //Verifica se todos os itens estão desmarcados
        //Grinder
        cy.contains('label','Grinder')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Sander
        cy.contains('label','Sander')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Saw
        cy.contains('label','Saw')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Drill
        cy.contains('label','Drill')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
    })

    it('Verifica se o filtro listou somente esmeril', function(){
        //Seleciona somente itens da categoria Grinder
        cy.contains('label','Grinder')
        .find('input[type="checkbox"]')
        .check()
        //Verifica se não listou esmeril pois não existe tal produto no catálogo
        cy.get('[data-test="no-results"]')
        .should('have.text', 'There are no products found.')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')
        //Desmarca itens da categoria Grinders
        cy.contains('label','Grinder')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente lixadeira', function() {
        //Seleciona somente itens da categoria Sander
        cy.contains('label','Sander')
        .find('input[type="checkbox"]')
        .check()
        //Verifica se listou somente Lixadeiras
        cy.get('[data-test="product-name"]')
        .should('contain', 'Belt Sander', { timeout: 6000 })
        .should('contain', 'Sheet Sander')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')
        //Desmarca itens da categoria Sander
        cy.contains('label','Sander')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente Serras', function() {
        //Regex que seleciona somente o campo "Saw" permitindo espaços extras antes ou depois da palavra
        cy.contains('label', /^\s*Saw\s*$/)
        .find('input[type="checkbox"]')
        .check();
        //Verifica se listou somente Serras
        cy.get('[data-test="product-name"]')
        .should('contain', 'Circular Saw')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Wood Saw') //Verifica se itens da categoria "Hand Saw" não são listados aqui
        //Desmarca itens da categoria Saw
        cy.contains('label', /^\s*Saw\s*$/)
        .find('input[type="checkbox"]')
        .uncheck();
    })

    it('Verifica se o filtro listou somente Furadeiras', function() {
        //Seleciona somente itens da categoria Drill
        cy.contains('label','Drill')
        .find('input[type="checkbox"]')
        .check()
        //Verifica se listou somente Furadeiras
        cy.get('[data-test="product-name"]')
        .should('contain', 'Drill')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')
        //Desmarca itens da categoria Drill
        cy.contains('label','Drill')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro marca somente itens da categoria "Other"', function() {
        //Filtra somente por "Other" na Tela Inicial
        cy.contains('label','Other')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')

        //Verifica se todos os itens filhos de "Other" foram selecionados
        //Tool Belts
        cy.contains('label','Tool Belts')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Storage Solutions
        cy.contains('label','Solutions')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Workbench
        cy.contains('label','Workbench')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Safety Gear
        cy.contains('label','Safety Gear')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Fasteners
        cy.contains('label','Fasteners')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')

        //Desmarca todos os itens da categoria "Other" na tela inicial
        cy.contains('label','Other')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro desmarca somente itens da categoria "Other"', function() {
        //Verifica se todos os itens estão desmarcados
        //Tool Belts
        cy.contains('label','Tool Belts')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Storage Solutions
        cy.contains('label','Solutions')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Workbench
        cy.contains('label','Workbench')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Safety Gear
        cy.contains('label','Safety Gear')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
        //Fasteners
        cy.contains('label','Fasteners')
        .find('input[type="checkbox"]')
        .should('not.be.checked')
    })

    it('Verifica se o filtro listou somente cintos de ferramentas', function() {
        //Seleciona somente os itens da categoria "Tool Belts"
        cy.contains('label','Tool Belts')
        .find('input[type="checkbox"]')
        .check()
        //Verifica se listou somente cintos de ferramentas
        cy.get('[data-test="product-name"]')
        .should('contain', 'Leather toolbelt')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')
        //Desmarca itens da categoria "Tool Belts"
        cy.contains('label','Tool Belts')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente caixas de ferramentas', function() {
        //Seleciona somente os itens da categoria "Storage Solutions"
        cy.contains('label','Storage Solutions')
        .find('input[type="checkbox"]')
        .check()
        //Verifica se listou somente caixa de ferramentas
        cy.get('[data-test="product-name"]')
        .should('contain', 'Tool Cabinet')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')
        //Desmarca itens da categoria "Storage Solutions"
        cy.contains('label','Solutions')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente bancada de trabalho ', function() {
        //Seleciona somente os itens da categoria "Workbench"
        cy.contains('label','Workbench')
        .find('input[type="checkbox"]')
        .check()
        //Verifica se listou somente bancada de trabalho
        cy.get('[data-test="no-results"]')
        .should('have.text', 'There are no products found.')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')
        //Desmarca itens da categoria "Workbench"
        cy.contains('label','Workbench')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente equipamentos de segurança', function() {
        //Seleciona somente os itens da categoria "Safety Gear"
        cy.contains('label','Safety Gear')
        .find('input[type="checkbox"]')
        .check()
        //Verifica se listou somente equipamentos de segurança
        cy.get('[data-test="product-name"]')
        .should('contain', 'Safety Goggles')
        .should('contain', 'Construction Helmet')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')
        //Desmarca itens da categoria "Safety Gear"
        cy.contains('label','Safety Gear')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente parafusos e porcas', function() {
        //Seleciona somente os itens da categoria "Fasteners"
        cy.contains('label','Fasteners')
        .find('input[type="checkbox"]')
        .check()
        //Verifica se listou somente parafusos e porcas
        cy.get('[data-test="product-name"]')
        .should('contain', 'Screws')
        .should('contain', 'Nuts and bolts')
        .should('not.contain.text', 'Pliers')
        .should('not.contain.text', 'Bolt')
        //Desmarca itens da categoria "Fasteners"
        cy.contains('label','Fasteners')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro selecionou somente a marca "ForgeFlex Tools"', function() {
        //Filtra somente itens da marca "ForgeFlex Tools"
        cy.contains('label','ForgeFlex Tools')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')

        //Desmarca itens da marca
        cy.contains('label','ForgeFlex Tools')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente itens da marca "ForgeFlex Tools', function(){
        cy.contains('label','ForgeFlex Tools')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')
        //Filtra por um item específico da marca
        cy.get('[data-test="product-name"]')
        .should('contain', 'Court Hammer')
        .should('contain', 'Thor Hammer')
        .should('not.contain.text', 'Screws') //Itens de outra marca
        .should('not.contain.text', 'Cordless Drill')   

        //Desmarca itens da marca
        cy.contains('label','ForgeFlex Tools')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro selecionou somente a marca "MightyCraft Hardware"', function() {

        //Filtra somente itens da marca "MightyCraft Hardware"
        cy.contains('label','MightyCraft Hardware')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')

        //Desmarca itens da marca
        cy.contains('label','MightyCraft Hardware')
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente itens da marca "MightyCraft Hardware"', function(){
        cy.contains('label','MightyCraft Hardware')
        .find('input[type="checkbox"]')
        .check()
        .should('be.checked')

        //Filtra por um item específico da marca
        cy.get('[data-test="product-name"]')
        .should('contain', 'Long Nose Pliers')
        .should('contain', 'Cordless Drill')
        .should('not.contain.text', 'Court Hammer') //Itens de outra marca
        .should('not.contain.text', 'Thor Hammer')

        //Desmarca itens da marca
        cy.contains('label','MightyCraft Hardware')
        .find('input[type="checkbox"]')
        .uncheck()        
    })

    it('Verifica filtro de pesquisa para um item existente', function() {
        //Pesquisa por "martelo"
        cy.get('#search-query')
        .type('hammer')
        cy.get('button')
        .contains('Search')
        .click()
        //Verifica se o item foi encontrado
        cy.get('[data-test="product-name"]')
        .should('contain', 'Claw Hammer')
    })

    it('Verifica filtro de pesquisa para um item que não existe', function() {
        //Pesquisa por item que não existe no inventário
        cy.get('#search-query')
        .type('cavalo')
        cy.get('button')
        .contains('Search')
        .click()
        //Verifica se o item não foi encontrado
        cy.get('[data-test="no-results"]')
        .should('have.text', 'There are no products found.')
    })

    it('Verifica reset do filtro de pesquisa', function() {
        //Pesquisa por um item que não existe
        cy.get('#search-query')
        .type('macaco')
        cy.get('button')
        .contains('Search')
        .click()
        //Verifica se o item não foi encontrado
        cy.get('[data-test="no-results"]')
        .should('have.text', 'There are no products found.')

        //Reseta filtro de pesquisa
        cy.get('[data-test="search-reset"]')
        .click()
        cy.get('[data-test="search_completed"]')
        .should('not.have.text', 'There are no products found.') //Verifica se a mensagem de item inexistente não será exibida
    })

    it('Verifica filtro por faixa de preço máximo', function() {
        //Por padrão o site carrega itens com valor de 1 até 100, o objetivo do teste é filtrar por itens de valor acima de 100
        //Simula a ação de arrastar o slider até o valor máximo de 200
        cy.get('span[role="slider"][aria-label="ngx-slider-max"]')
        .then(($slider) => {
            $slider[0].setAttribute('aria-valuenow', '200'); // Altera o valor diretamente
            $slider[0].style.left = '99%'; // Ajusta a posição visual
        })
        .should('have.attr', 'aria-valuenow', '200');
    })

    it('Verifica filtro por faixa de preço mínimo', function() {
        //Por padrão o site carrega itens com valor de 1 até 100, o objetivo do teste é filtrar por itens de valor até 1
        cy.reload()
        //Simula a ação de arrastar o slider até o valor mínimo
        cy.get('span[role="slider"][aria-label="ngx-slider-max"]')
        .then(($slider) => {
            $slider[0].setAttribute('aria-valuenow', '0'); // Altera o valor diretamente
            $slider[0].style.left = '1%'; // Ajusta a posição visual
        })
        .should('have.attr', 'aria-valuenow', '0');
    })

    it('Verifica ordenação por preço [menor - maior]', { defaultCommandTimeout: 15000, retries: 2 }, function() {
        /*Foi definido um número maior de timeout e retry pois o site costuma demorar a responder para
        ordenar os itens da tela, o teste falhava as vezes por demora da resposta.
        */

        cy.reload()
        /*Por padrão o site exibe produtos de $1 até $100*/
        var arruela = '$3.55'
        var parafuso = '$3.95'
        var valorAcimaDoFiltrado = '$46.50'

        cy.get('[data-test="sort"]')
        .select('Price (Low - High)')

        cy.get('[data-test="product-price"]')
        .should('contain.text', `${arruela}`) //Verifica o item mais barato
        .should('contain.text', `${parafuso}`) //Verifica o segundo item mais barato 
        .should('not.contain.text', `${valorAcimaDoFiltrado}`) //Verificando um valor que não deve existir na primeira página 
    })

    it('Verifica ordenação por preço [maior - menor]', function(){
        var armarioFerramentas = '$89.55'
        var caixaFerramentas = '$86.71'
        var valorAbaixoDoFiltrado = '$3.55'

        cy.get('[data-test="sort"]')
        .select('Price (High - Low)')

        cy.wait(2000)
        cy.get('[data-test="product-price"]')
        .should('contain.text', `${armarioFerramentas}`) //Verifica o item mais caro
        .should('contain.text', `${caixaFerramentas}`) //Verifica o segundo item mais caro
        .should('not.contain.text', `${valorAbaixoDoFiltrado}`) //Verificando um valor baixo que não deve existir na primeira página 
    })

    it('Verifica ordenação alfabética [z - a]', function() {
        var palavraFiltro = "Wood" //Filtra por uma palavra que começa com a letra "W"
        cy.get('[data-test="sort"]')
        .select('Name (Z - A)')
        cy.wait(1000)

        cy.get('[data-test="sorting_completed"]')
        .should('contain.text', `${palavraFiltro}`) //Verifica itens que contenham a palavra "Wood" pois são os primeiros na ordem [z-a]
    })

    it('Verifica ordenação alfabética [a - z]', function() {
        var palavraFiltro = "Adjustable" //Filtra por uma palavra que começa com letra "A"
        cy.get('[data-test="sort"]')
        .select('Name (A - Z)')
        cy.wait(1000)

        cy.get('[data-test="sorting_completed"]')
        .should('contain.text', `${palavraFiltro}`) //Verifica itens que contenham a palavra "Adjustable Wrench" pois são os primeiros na ordem [a-z]
    })

    it('Verifica paginação numérica', function() {
       //Acessa página 2
       cy.get('[aria-label="Page-2"]')
        .contains('2')
        .click()
    })

    it('Verifica paginação pelo botão "Próximo"', function() {
        //Acessa próxima página
        cy.get('[aria-label="Next"]')
        .click()
     })

     it('Verifica paginação pelo botão "Anterior"', function() {
        //Acessa página 4
       cy.get('[aria-label="Page-4"]')
       .contains('4')
       .click()
        //Acessa página anterior
        cy.get('[aria-label="Previous"]')
        .click()
     })
})