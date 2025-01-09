require("@4tw/cypress-drag-drop");

Cypress.Commands.add('acessaSite', () => {
    const baseUrl = 'https://practicesoftwaretesting.com'
    cy.visit(baseUrl)
})

Cypress.Commands.add('pesquisaItem', (nomeItem) => {
    //Acessa a barra de pesquisa, digita o termo desejado e faz a busca
    cy.get('#search-query')
    .type(nomeItem)
    cy.get('button')
    .contains('Search')
    .click()
})

Cypress.Commands.add('acessaMenuCategories', () => {
    //Clica no menu "Categories"
    cy.get('[data-test="nav-categories"]')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('acessaMenuIdiomas', () => {
    //Clica no menu de idiomas
    cy.get('[data-test="language"]')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('acessaPaginaDeLogin', () => {
    //Acessa página Sign In
    cy.get('[data-test="nav-sign-in"]')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('acessaPaginaDeRegistroDeUsuario', () => {
    //Acessa página Sign In
    cy.get('[data-test="nav-sign-in"]')
    .should('be.visible')
    .click()
    //Clica em "Register your account"
    cy.get('[data-test="register-link"]')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('mudaIdioma', (idioma) => {
    //Altera idioma de acordo com parâmetro selecionado
    cy.get('[class="dropdown-item"]')
    .should('be.visible')
    .contains(idioma)
    .click()
})

Cypress.Commands.add('confereMudancaIdioma', (idiomaPesquisa,idiomaFaixaPreco) => {
    /* O texto dos botões de pesquisa e de faixa de preço são utilizados para identificar 
    se o idioma foi alterado corretamenteo */
    cy.get('#filters')
    .should('be.visible')
    .should('contain.text', idiomaPesquisa)
    .should('contain.text', idiomaFaixaPreco)
})

Cypress.Commands.add('selecionaCategoria', (categoriaSeletor,nomeCategoria) => {
    //Seleciona uma categoria do menu "Categories"
    cy.get(categoriaSeletor)
    .should('be.visible')
    .should('contain.text', nomeCategoria)
    .click()
})

Cypress.Commands.add('selecionaFiltroCategoria', (nomeFiltro) => {
    //Seleciona uma categoria contida dentro do filtro "By category"
    cy.get('label')
    .contains(nomeFiltro)
    .should('be.visible')
    .click()
})

Cypress.Commands.add('selecionaProduto', (nomeProduto) => {
    //Filtra por um produto especifico
    cy.contains('label', nomeProduto)
    .should('be.visible')
    .find('input[type="checkbox"]')
    .check()
})

Cypress.Commands.add('desmarcaProduto', (nomeProduto) => {
    //Filtra por um produto especifico e desmarca o filtro feito nele
    cy.contains('label', nomeProduto)
    .should('be.visible')
    .find('input[type="checkbox"]')
    .should('be.checked')
    .uncheck()
})

Cypress.Commands.add('verificaTituloPagina', (titulo) => {
    //Verifica título da página
    cy.get('[data-test="page-title"]')
    .should('be.visible')
    .should('have.text', titulo)
})

Cypress.Commands.add('verificaSeContemProduto', (produtosEsperados,produtosNaoEsperados) => {
    //Verifica se os produtos esperados estão na lista
    produtosEsperados.forEach(produto => {
        cy.get('[data-test="product-name"]')
        .should('contain.text', produto)
        .should('be.visible')
    });

    //Verifica se os produtos que não deveriam estar listados não aparecem
    produtosNaoEsperados.forEach(produto => {
        cy.get('[data-test="product-name"]')
        .should('not.contain.text', produto)
    });
})

Cypress.Commands.add('verificaMensagemDeProdutoNaoEncontrado', () => {
    //Verifica se a seguinte mensagem será apresentada caso um produto não exista
    const mensagem = 'There are no products found.'
    cy.contains(mensagem)
    .should('be.visible')
})

/*Cypress.Commands.add('efetuaLogin', (usuario, senha) => {
    //"log:false" faz com que a senha do usuário não apareça no log em tela
    cy.get('#username').type(`${usuario}`, { log: false })
    cy.get('#password').type(`${senha}`, { log: false })
    cy.get('.btn').contains('Login').click()
}) */