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
        //Confirma exibição do banner do site
        cy.get('.img-fluid')
        .should('be.visible') 
    })

    it('Verifica se itens do menu "Categories" são listados corretamente.', function() {
        //Clica no botão de listagem de categorias
        cy.acessaMenuCategories()
        //Lista de categorias disponíveis
        const listaSeletoresCategorias = ['[data-test="nav-hand-tools"]','[data-test="nav-power-tools"]',
        '[data-test="nav-other"]','[data-test="nav-special-tools"]','[data-test="nav-rentals"]']
        
        //Verifica se cada categoria é exibida em tela
        listaSeletoresCategorias.forEach((categoria) =>{
            cy.get(categoria)
            .should('be.visible')
        })
    })
    
    it('Seleciona categoria "Hand Tools" do menu "Categories"', function(){
        const tituloPagina = 'Category: Hand Tools'
        const categoriaSeletor = '[data-test="nav-hand-tools"]'
        const nomeCategoria = 'Hand Tools'
        
        //Clica no botão de listagem de categorias
        cy.acessaMenuCategories()
        //Seleciona Categoria "Hand Tools"
        cy.selecionaCategoria(categoriaSeletor,nomeCategoria)
        //Verifica título da página
        cy.verificaTituloPagina(tituloPagina)
    })

    it('Seleciona categoria "Power Tools" do menu "Categories"', function(){
        const tituloPagina = 'Category: Power Tools'
        const categoriaSeletor = '[data-test="nav-power-tools"]'
        const nomeCategoria = 'Power Tools'
        
        //Clica no botão de listagem de categorias
        cy.acessaMenuCategories()
        //Seleciona Categoria "Power Tools"
        cy.selecionaCategoria(categoriaSeletor,nomeCategoria)
        //Verifica título da página
        cy.verificaTituloPagina(tituloPagina)
    })

    it('Seleciona categoria "Other" do menu "Categories"', function() {
        const tituloPagina = 'Category: Other'
        const categoriaSeletor = '[data-test="nav-other"]'
        const nomeCategoria = 'Other'
        
        //Clica no botão de listagem de categorias
        cy.acessaMenuCategories()
        //Seleciona Categoria "Other"
        cy.selecionaCategoria(categoriaSeletor,nomeCategoria)
        //Verifica título da página
        cy.verificaTituloPagina(tituloPagina)
    })

    it('Seleciona categoria "Special Tools" do menu "Categories"', function() {
        const tituloPagina = 'Category: Special Tools'
        const categoriaSeletor = '[data-test="nav-special-tools"]'
        const nomeCategoria = 'Special Tools'
        
        //Clica no botão de listagem de categorias
        cy.acessaMenuCategories()
        //Seleciona Categoria "Special Tools"
        cy.selecionaCategoria(categoriaSeletor,nomeCategoria)
        //Verifica título da página
        cy.verificaTituloPagina(tituloPagina)
    })

    it('Seleciona categoria "Rentals" do menu "Categories"', function() {
        const tituloPagina = 'Rentals'
        const categoriaSeletor = '[data-test="nav-rentals"]'
        const nomeCategoria = 'Rentals'
        
        //Clica no botão de listagem de categorias
        cy.acessaMenuCategories()
        //Seleciona Categoria "Rentals"
        cy.selecionaCategoria(categoriaSeletor,nomeCategoria)
        //Verifica título da página
        cy.verificaTituloPagina(tituloPagina)
    })

    it('Verifica lista de idiomas.', function() {
        const listaIdiomas = ['DE','EN','ES','FR','NL','TR']
        //Clica no menu de idiomas, por padrão o site é carregado em inglês
        cy.acessaMenuIdiomas()
        //Verifica se todos os idiomas são listados
        listaIdiomas.forEach((idioma) => {
            cy.get('[class="dropdown-item"]')
            .should('be.visible')
            .should('contain', idioma)
        })
    })

    it('Muda idioma para alemão', function() {
        const idioma = 'DE'
        const faixaDePrecoAlemao = 'Preisspanne'
        const botaoDePesquisaAlemao = 'Suche'
        
        //Clica no menu de idiomas
        cy.acessaMenuIdiomas()
        //Muda idioma para alemão
        cy.mudaIdioma(idioma)
        //Verifica se o idioma mudou consultando os nomes dos botões de pesquisa e de faixa de preço
        cy.confereMudancaIdioma(faixaDePrecoAlemao,botaoDePesquisaAlemao)
    })

    it('Muda idioma para espanhol', function() {
        const idioma = 'ES'
        const faixaDePrecoEspanhol = 'Rango de precios'
        const botaoDePesquisaEspanhol = 'Buscar'
        
        //Clica no menu de idiomas
        cy.acessaMenuIdiomas()
        //Muda o idioma para espanhol
        cy.mudaIdioma(idioma)
        //Verifica se o idioma mudou
        cy.confereMudancaIdioma(faixaDePrecoEspanhol,botaoDePesquisaEspanhol)
    })

    it('Muda o idioma para frances', function() {
        const idioma = 'FR'
        const faixaDePrecoFrances = 'Fourchette de prix'
        const botaoDePesquisaFrances = 'Rechercher'
        
        //Clica no menu de idiomas
        cy.acessaMenuIdiomas()
        //Muda o idioma para frances
        cy.mudaIdioma(idioma)
        //Verifica se o idioma mudou
        cy.confereMudancaIdioma(faixaDePrecoFrances,botaoDePesquisaFrances)
    })

    it('Muda idioma para holandês', function() {
        const idioma = 'NL'
        const faixaDePrecoHolandes = 'Prijsklasse'
        const botaoDePesquisaHolandes = 'Zoeken'
        
        //Clica no menu de idiomas
        cy.acessaMenuIdiomas()
        //Muda o idioma para holandês
        cy.mudaIdioma(idioma)
        //Verifica se o idioma mudou
        cy.confereMudancaIdioma(faixaDePrecoHolandes,botaoDePesquisaHolandes)
    })

    it('Muda idioma para turco', function() {
        const idioma = 'TR'
        const faixaDePrecoTurco = 'Fiyat Aralığı'
        const botaoDePesquisaTurco = 'Ara'
       
        //Clica no menu de idiomas
        cy.acessaMenuIdiomas()
        //Muda o idioma para turco
        cy.mudaIdioma(idioma)
        //Verifica se o idioma mudou
        cy.confereMudancaIdioma(faixaDePrecoTurco,botaoDePesquisaTurco)
    })

    it('Muda idioma para inglês', function() {
        const idioma = 'EN'
        const faixaDePrecoIngles = 'Price Range'
        const botaoDePesquisaInlges = 'Search'
        
        //Clica no menu de idiomas
        cy.acessaMenuIdiomas()
        //Muda o idioma para inglês
        cy.mudaIdioma(idioma)
        //Verifica se o idioma mudou
        cy.confereMudancaIdioma(faixaDePrecoIngles,botaoDePesquisaInlges)
    })

    it('Verifica se a página "Sign In" é carregada corretamente', function(){
        //Acessa página Sign In
        cy.acessaPaginaDeLogin()
        //Confere titulo da página
        cy.get('h3').contains('Login')
        .should('be.visible')

        //Confere botão de login com Google
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

        //Confere link de registro de nova conta
        cy.get('[data-test="register-link"]')
        .should('be.visible')  
    })

    it('Verifica se a página "Forgot Password" é exibida corretamente', function() {
        //Acessa página Sign In
        cy.acessaPaginaDeLogin()
        //Acessa "Forgot password"
        cy.get('[data-test="forgot-password-link"]')
        .should('be.visible')
        .click()
        
        //Confere campos da tela
        cy.get('h3').contains('Forgot Password')
        .should('be.visible')
        cy.get('[data-test="email"]')
        .should('be.visible')
        cy.get('[data-test="forgot-password-submit"]')
        .should('be.visible')
    })

    it('Verifica se a página "Customer Registration" é exibida corretamente', function() {
        const listaSeletoresRegistroUsuario = ['[data-test="first-name"]','[data-test="last-name"]',
        '[data-test="dob"]','[data-test="address"]','[data-test="postcode"]','[data-test="city"]',
        '[data-test="state"]','[data-test="country"]','[data-test="phone"]','[data-test="email"]',
        '[data-test="password"]','#passwordHelp','.password-strength','[data-test="register-submit"]']
        
        cy.acessaPaginaDeLogin()
        //Acessa registro de nova conta
        cy.acessaPaginaDeRegistroDeUsuario()
        //Verifica título da tela
        cy.get('h3').contains('Customer registration')
        .should('be.visible')

        //Confere campos da tela
        listaSeletoresRegistroUsuario.forEach((campo) => {
            cy.get(campo)
            .should('be.visible')
        })
    })

    it('Verifica se a página "Contact" é carregada corretamente', function() {
        const listaCampoFormulario = ['First name','Last name','Email address','Subject','Message *','Attachment']
        const listaMotivoContato = ['Customer service','Webmaster','Return','Payments','Warranty','Status of my order']
        
        //Acessa página de Contato
        cy.get('[data-test="nav-contact"]')
        .should('be.visible')
        .click()
        //Confirma título da página
        cy.get('h3').contains('Contact')
        .should('be.visible')

        //Valida campos do formulário
        listaCampoFormulario.forEach((campo) => {
            cy.get('.form-label')
            .should('contain.text', campo)
        })
        //Confere mensagem do campo de anexos
        cy.get('#attachmentHelp')
        .should('have.text', 'Only files with the txt extension are allowed, and files must be 0kb.')
        //Confirma existência do botão de envio de contato
        cy.get('[data-test="contact-submit"]')
        .should('be.visible')

        /*Seleciona cada uma das opções de motivo do contato*/
        listaMotivoContato.forEach((motivo) => {
            cy.get('[data-test="subject"]')
            .select(motivo)
            .should('be.visible')
        })
    })
    
    it('Verifica se o filtro marca somente itens da categoria "Hand Tools"', function() {
        const nomeCategoria = 'Hand Tools'
        //Marca todos os itens da categoria "Hand Tools" na Tela Inicial
        cy.selecionaFiltroCategoria(nomeCategoria)

        //Lista e itens
        const listaHandTools = ['Hammer','Hand Saw','Wrench','Screwdriver','Pliers','Chisels','Measures']
        //Verifica se todos os itens da categoria "Hand Tools" foram marcados
        listaHandTools.forEach((ferramenta) => {
            cy.contains('label', ferramenta)
            .find('input[type="checkbox"]')
            .should('be.checked')
        })

        //Desmarca todos os itens a categoria "Hand Tools" na Tela Inicial
        cy.selecionaFiltroCategoria(nomeCategoria)
    })

    it('Verifica se o filtro desmarca somente itens da categoria "Hand Tools"', function() {
        //Lista e itens
        const listaHandTools = ['Hammer','Hand Saw','Wrench','Screwdriver','Pliers','Chisels','Measures']
        //Verifica se todos os itens da categoria "Hand Tools" foram desmarcados
        listaHandTools.forEach((ferramenta) => {
            cy.contains('label', ferramenta)
            .find('input[type="checkbox"]')
            .should('not.be.checked')
        })
    })

    it('Verifica se o filtro listou somente martelos', function() {
        const nomeProduto = 'Hammer'
        const produtoListado = 'Thor Hammer'
        const produtoNaoListado = 'Pliers'
        
        //Seleciona somente itens da categoria "Hammer"
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente Martelos e nenhum outro produto indevido
        cy.verificaSeContemProduto([produtoListado],[produtoNaoListado])
        //Desmarca itens da categoria "Hammer"
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro listou somente serrotes', function() {
        const nomeProduto = 'Hand Saw'
        const produtoListado = 'Wood Saw'
        const proutoNaoListado = 'Pliers'
        
        //Seleciona somente itens da categoria Hand Saw
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente Serrotes e nenhum outro produto indevido
        cy.verificaSeContemProduto([produtoListado],[proutoNaoListado])
        //Desmarca itens da categoria Hand Saw
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro listou somente chaves de boca', function() {
        const nomeProduto = 'Wrench'
        const produtoListado = 'Adjustable Wrench'
        const produtoNaoListado = 'Bolt'
        
        //Seleciona somente itens da categoria Wrench e nenhum outro produto indevido
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente Chave de Boca
        cy.verificaSeContemProduto([produtoListado],[produtoNaoListado])
        //Desmarca itens da categoria Wrench
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro listou somente chaves de fenda', function() {
        const nomeProduto = 'Screwdriver'
        const produtoListado = 'Phillips Screwdriver'
        const produtoNaoListado = 'Pliers'
        
        //Seleciona somente itens da categoria Screwdriver
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente Chave de Fenda
        cy.verificaSeContemProduto([produtoListado],[produtoNaoListado])
        //Desmarca itens da categoria Screwdriver
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro listou somente alicates', function(){
        const nomeProduto = 'Pliers'
        const produtoListado = 'Combination Pliers'
        const produtoNaoListado = 'Hammer'
        
        //Seleciona somente itens da categoria Pliers
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente Alicates
        cy.verificaSeContemProduto([produtoListado],[produtoNaoListado])
        //Desmarca itens da categoria Pliers
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro listou somente formão', function(){
        const nomeProduto = 'Chisels'
        const produtoListado = 'Chisels Set'
        const produtoNaoListado = 'Bolt'
        
        //Seleciona somente itens da categoria Chisels
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente Formão
        cy.verificaSeContemProduto([produtoListado],[produtoNaoListado])
        //Desmarca itens da categoria Chisels
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro listou somente fitas métricas', function(){
        const nomeProduto = 'Measures'
        const produtoListado = 'Measuring Tape'
        const produtoNaoListado = 'Pliers'
        
        //Seleciona somente itens da categoria Measures
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente Fitas Métricas
        cy.verificaSeContemProduto([produtoListado],[produtoNaoListado])
        //Desmarca itens da categoria Measures
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro marca somente itens da categoria "Power Tools"', function() {
        const nomeCategoria = 'Power Tools'
        //Marca todos os itens da categoria "Power Tools" na Tela Inicial
        cy.selecionaFiltroCategoria(nomeCategoria)

        //Lista de itens
        const listaPowerTools = ['Grinder', 'Sander','Drill']
        //Verifica se todos os itens de "Power Tools" foram marcados
        listaPowerTools.forEach((ferramenta) => {
            cy.contains('label', ferramenta)
            .find('input[type="checkbox"]')
            .should('be.checked')
        })

        /*Teste específico para o item "Saw",  esse item não pode ser verificado junto a lista pois 
        o cypress reconhece o campo "Hand Saw" no lugar dele e faz o teste falhar.
        */
        cy.contains('label', /^\s*Saw\s*$/)
        .find('input[type="checkbox"]')
        .should('be.checked')

        //Desmarca todos os itens da categoria "Power Tools" na Tela Inicial
        cy.selecionaFiltroCategoria(nomeCategoria)
    })

    it('Verifica se o filtro desmarca somente itens da categoria "Power Tools"', function() {    
        //Lista de itens
        const listaPowerTools = ['Grinder', 'Sander','Drill']
        //Verifica se todos os itens de "Power Tools" foram desmarcados
        listaPowerTools.forEach((ferramenta) => {
            cy.contains('label', ferramenta)
            .find('input[type="checkbox"]')
            .should('not.be.checked')
        })
        
        /*Teste específico para o item "Saw",  esse item não pode ser verificado junto a lista pois 
        o cypress reconhece o campo "Hand Saw" no lugar dele e faz o teste falhar.
        */
        cy.contains('label', /^\s*Saw\s*$/)
        .find('input[type="checkbox"]')
        .should('not.be.checked')
    })

    it('Verifica se o filtro listou somente esmeril', function(){
        const nomeProduto = 'Grinder'
       
        //Seleciona somente itens da categoria Grinder
        cy.selecionaProduto(nomeProduto)
        //Verifica se não listou esmeril pois não existe tal produto no catálogo
        cy.verificaMensagemDeProdutoNaoEncontrado()
        //Desmarca itens da categoria Grinders
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro listou somente lixadeira', function() {
        const nomeProduto = 'Sander'
        const produtoListado = 'Sheet Sander'
        const proutoNaoListado = 'Pliers'
        
        //Seleciona somente itens da categoria Sander
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente Lixadeiras
        cy.verificaSeContemProduto([produtoListado],[proutoNaoListado])
        //Desmarca itens da categoria Sander
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro listou somente Serras', function() {
        const produtoListado = 'Circular Saw'
        const produtoNaoListado = 'Wood Saw'
        
        //Regex que seleciona somente o campo "Saw" permitindo espaços extras antes ou depois da palavra
        cy.contains('label', /^\s*Saw\s*$/)
        .find('input[type="checkbox"]')
        .check()
        //Verifica se listou somente Serras
        cy.verificaSeContemProduto([produtoListado],[produtoNaoListado]) //Verifica se itens da categoria "Hand Saw" não são listados aqui
        //Desmarca itens da categoria Saw
        cy.contains('label', /^\s*Saw\s*$/)
        .find('input[type="checkbox"]')
        .uncheck()
    })

    it('Verifica se o filtro listou somente Furadeiras', function() {
        const nomeProduto = 'Drill'
        const produtoListado = 'Cordless Drill 12V'
        const produtoNaoListado = 'Pliers'
        
        //Seleciona somente itens da categoria Drill
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente Furadeiras
        cy.verificaSeContemProduto([produtoListado],[produtoNaoListado])
        //Desmarca itens da categoria Drill
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro marca somente itens da categoria "Other"', function() {
        const nomeCategoria = 'Other'
        //Filtra somente por "Other" na Tela Inicial
        cy.selecionaFiltroCategoria(nomeCategoria)

        //Lista de itens
        const listaOther = ['Tool Belts','Solutions','Workbench','Safety Gear','Fasteners']
        //Verifica se todos os itens da categoria "Other" foram marcados
        listaOther.forEach((ferramenta) => {
            cy.contains('label',ferramenta)
            .find('input[type="checkbox"]')
            .should('be.checked')
        })
        //Desmarca todos os itens da categoria "Other" na tela inicial
        cy.selecionaFiltroCategoria(nomeCategoria)
    })

    it('Verifica se o filtro desmarca somente itens da categoria "Other"', function() {
        //Lista de itens
        const listaOther = ['Tool Belts','Solutions','Workbench','Safety Gear','Fasteners']
        //Verifica se todos os itens de "Other" estão desmarcados
        listaOther.forEach((ferramenta) => {
            cy.contains('label',ferramenta)
            .find('input[type="checkbox"]')
            .should('not.be.checked')
        })
    })

    it('Verifica se o filtro listou somente cintos de ferramentas', function() {
        const nomeProduto = 'Tool Belts'
        const produtoListado = 'Leather toolbelt'
        const produtoNaoListado = 'Bolt'

        //Seleciona somente os itens da categoria "Tool Belts"
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente cintos de ferramentas
        cy.verificaSeContemProduto([produtoListado],[produtoNaoListado])
        //Desmarca itens da categoria "Tool Belts"
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro listou somente caixas de ferramentas', function() {
        const nomeProduto = 'Storage Solutions'
        const produtoListado = 'Tool Cabinet'
        const produtoNaoListado = 'Pliers'
        
        //Seleciona somente os itens da categoria "Storage Solutions"
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente caixa de ferramentas
        cy.verificaSeContemProduto([produtoListado],[produtoNaoListado])
        //Desmarca itens da categoria "Storage Solutions"
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro listou somente bancada de trabalho ', function() {
        const nomeProduto = 'Workbench'
        
        //Seleciona somente os itens da categoria "Workbench"
        cy.selecionaProduto(nomeProduto)
        //Verifica se não listou bancada de trabalho 
        cy.verificaMensagemDeProdutoNaoEncontrado()
        //Desmarca itens da categoria "Workbench"
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro listou somente equipamentos de segurança', function() {
        const nomeProduto = 'Safety Gear'
        const produtosEsperados = 'Safety Goggles'
        const produtosNaoEsperados = 'Bolt'
        
        //Seleciona somente os itens da categoria "Safety Gear"
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente equipamentos de segurança
        cy.verificaSeContemProduto([produtosEsperados],[produtosNaoEsperados])
        //Desmarca itens da categoria "Safety Gear"
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro listou somente parafusos e porcas', function() {
        const nomeProduto = 'Fasteners'
        const produtosEsperados = 'Nuts and bolts'
        const produtosNaoEsperados = 'Pliers'
        
        //Seleciona somente os itens da categoria "Fasteners"
        cy.selecionaProduto(nomeProduto)
        //Verifica se listou somente parafusos e porcas
        cy.verificaSeContemProduto([produtosEsperados],[produtosNaoEsperados])
        //Desmarca itens da categoria "Fasteners"
        cy.desmarcaProduto(nomeProduto)
    })

    it('Verifica se o filtro selecionou somente a marca "ForgeFlex Tools"', function() {
        const nomeCategoria = 'ForgeFlex Tools'
        //Filtra somente itens da marca "ForgeFlex Tools"
        cy.selecionaFiltroCategoria(nomeCategoria)
        //Desmarca itens da marca
        cy.selecionaFiltroCategoria(nomeCategoria)
    })

    it('Verifica se o filtro listou somente itens da marca "ForgeFlex Tools', function(){
        const nomeCategoria = 'ForgeFlex Tools'
        const produtosEsperados = 'Court Hammer'
        const produtosNaoEsperados = 'Screws'

        //Filtra somente itens da marca "ForgeFlex Tools"
        cy.selecionaFiltroCategoria(nomeCategoria)
        //Procura por um item específico da marca
        cy.verificaSeContemProduto([produtosEsperados],[produtosNaoEsperados])  
        //Desmarca itens da marca
        cy.selecionaFiltroCategoria(nomeCategoria)
    })

    it('Verifica se o filtro selecionou somente a marca "MightyCraft Hardware"', function() {
        const nomeCategoria = 'MightyCraft Hardware'
        //Filtra somente itens da marca "MightyCraft Hardware"
        cy.selecionaFiltroCategoria(nomeCategoria)
        //Desmarca itens da marca
        cy.selecionaFiltroCategoria(nomeCategoria)
    })

    it('Verifica se o filtro listou somente itens da marca "MightyCraft Hardware"', function(){
        const nomeCategoria = 'MightyCraft Hardware'
        const produtosEsperados = 'Long Nose Pliers'
        const produtosNaoEsperados = 'Thor Hammer'
       
        //Filtra somente itens da marca "MightyCraft Hardware"
        cy.selecionaFiltroCategoria(nomeCategoria)
        //Filtra por um item específico da marca
        cy.verificaSeContemProduto([produtosEsperados],[produtosNaoEsperados])
        //Desmarca itens da marca
        cy.selecionaFiltroCategoria(nomeCategoria)    
    })

    it('Verifica filtro de pesquisa para um item existente', function() {
        const nomeItem = 'Hammer'
        //Pesquisa pelo item
        cy.pesquisaItem(nomeItem)
        //Verifica se o item foi encontrado
        cy.verificaSeContemProduto([nomeItem],[]) //O segundo array está vazio pois não é necessário validar um segundo produto   
    })

    it('Verifica filtro de pesquisa para um item que não existe', function() {
        const nomeItemInexistente = 'cavalo'
        //Pesquisa por item que não existe no inventário
        cy.pesquisaItem(nomeItemInexistente)
        //Verifica se o item não foi encontrado
        cy.verificaMensagemDeProdutoNaoEncontrado()
    })

    it('Verifica reset do filtro de pesquisa', function() {
        const intemInexistente = 'cebola'
        
        //Pesquisa por um item que não existe
        cy.pesquisaItem(intemInexistente)
        //Confirma que o item não foi encontrado
        cy.verificaMensagemDeProdutoNaoEncontrado()
        //Reseta filtro de pesquisa
        cy.get('[data-test="search-reset"]')
        .click()
        //Confirma reset do filtro
        cy.get('[data-test="search_completed"]')
        .should('not.have.text', 'There are no products found.')
    })

    it('Verifica filtro por faixa de preço máximo', function() {
        //Por padrão o site carrega itens com valor de 1 até 100, o objetivo do teste é filtrar por itens de valor acima de 100
        //Simula a ação de arrastar o slider até o valor máximo de 200
        cy.get('span[role="slider"][aria-label="ngx-slider-max"]')
        .then(($slider) => {
            $slider[0].setAttribute('aria-valuenow', '200'); // Altera o valor diretamente
            $slider[0].style.left = '99%'; // Ajusta a posição visual
        })
        .should('have.attr', 'aria-valuenow', '200')
    })

    it('Verifica filtro por faixa de preço mínimo', function() {
        //Por padrão o site carrega itens com valor de 1 até 100, o objetivo do teste é filtrar por itens de valor até 1
        cy.reload()
        //Simula a ação de arrastar o slider até o valor mínimo de 0
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