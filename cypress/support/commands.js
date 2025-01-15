require("@4tw/cypress-drag-drop");

Cypress.Commands.add('acessaSite', () => {
    const baseUrl = 'https://practicesoftwaretesting.com'
    cy.visit(baseUrl)
})

Cypress.Commands.add('pesquisaItem', (nomeItem) => {
    //Acessa a barra de pesquisa, digita o termo desejado e faz a busca
    cy.get('#search-query')
    .should('be.visible')
    .type(nomeItem)
    cy.get('button')
    .should('not.be.disabled')
    .should('be.visible')
    .contains('Search')
    .click()
})

Cypress.Commands.add('acessaHome', () => {
    cy.get('[data-test="nav-home"]')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('acessaMenuCategories', () => {
    //Clica no menu "Categories"
    cy.get('[data-test="nav-categories"]')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('acessaMenuPerfilUsuario', () => {
    //Clica no menu de opções do perfil de usuário
    cy.get('[data-test="nav-menu"]')
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
    const tituloPagina = 'Login'
    //Acessa página Sign In
    cy.get('[data-test="nav-sign-in"]')
    .should('be.visible')
    .click()

    cy.url().should('include', '/auth/login');
    cy.get('h3')
    .should('have.text', tituloPagina)
})

Cypress.Commands.add('acessaPaginaDeRegistroDeUsuario', () => {
    const tituloPagina = 'Customer registration'
    //Clica em "Register your account"
    cy.get('[data-test="register-link"]')
    .should('be.visible')
    .click()
    //Confere url da página
    cy.url().should('include', '/auth/register');

    //Confere o título da página
    cy.get('h3')
    .should('have.text', tituloPagina)
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
    })

    //Verifica se os produtos que não deveriam estar listados não aparecem
    produtosNaoEsperados.forEach(produto => {
        cy.get('[data-test="product-name"]')
        .should('not.contain.text', produto)
    })
})

Cypress.Commands.add('verificaMensagemDeProdutoNaoEncontrado', () => {
    //Verifica se a seguinte mensagem será apresentada caso um produto não exista
    const mensagem = 'There are no products found.'
    cy.contains(mensagem)
    .should('be.visible')
})

Cypress.Commands.add('abreDetalhesDoProduto', (nomeProduto) => {
    //Clica no produto pesquisado
    cy.get('[data-test="product-name"]')
    .contains(nomeProduto)
    .should('be.visible')
    .click()
    //Confere url da página
    cy.url().should('include', '/product');
})

Cypress.Commands.add('adicionaProdutoNoCarrinho', () => {
    const mensagemProdutoCarrinho = 'Product added to shopping cart.'
    //Adiciona produto ao carrinho
    cy.get('[data-test="add-to-cart"]')
    .should('not.be.disabled')
    .should('be.visible')
    .click()

    //Confirma mensagem de sucesso
    cy.get('.toast-message')
    .contains(mensagemProdutoCarrinho, { matchCase: false })
    .should('be.visible')
})

Cypress.Commands.add('acessaCarrinho', () => {
    //Clica no botão do carrinho
    cy.get('[data-test="nav-cart"]')
    .should('not.be.disabled')
    .should('be.visible')
    .click()
    //Confere url da página
    cy.url().should('include', '/checkout');
})

Cypress.Commands.add('confirmaNomeProduto', (nomeProduto) => {
    //Confirma o nome do produto no carrinho
    cy.get('[data-test="product-title"]')
    .should('be.visible')
    .should('contain.text', nomeProduto)
})

Cypress.Commands.add('ajustaQuantidadeProduto', (quantidade) => {
    cy.get('[data-test="quantity"]')
        .clear()
        .type(quantidade)
        .should('have.value', quantidade);
})

Cypress.Commands.add('removeProdutoDoCarrinho', () =>{
   const mensagemProdutoDeletado = 'Product deleted.'
    //Botão de remover produto
    cy.get('.btn-danger')
    .should('be.visible')
    .click({multiple:true})

    //Confirma mensagem de sucesso
    cy.get('.toast-message')
    .contains(mensagemProdutoDeletado, { matchCase: false })
    .should('be.visible')
})

Cypress.Commands.add('fazLogin', (email,senha) => {
    //Digita dados e clica em "Login"
    cy.get('[data-test="email"]')
    .should('be.visible')
    .clear()
    .type(email)
    cy.get('[data-test="password"]')
    .should('be.visible')
    .clear()
    .type(senha)

    //Clica no botão de login
    cy.get('[data-test="login-submit"]')
    .should('not.be.disabled')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('confereMensagemLogin', () => {
    const mensagem = 'you are already logged in. You can proceed to checkout.'
    cy.get('p.ng-star-inserted')
    .should('be.visible')
    .should('contain.text', mensagem)
})

Cypress.Commands.add('fazLogout', () => {
    cy.get('[data-test="nav-sign-out"]')
    .should('not.be.disabled')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('adicionaFavorito', () => {
    cy.get('[data-test="add-to-favorites"]')
    .should('not.be.disabled')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('acessaMyFavorites', () => {
    const nomeAtalho = 'My favorites'
    cy.get('[data-test="nav-my-favorites"]')
    .should('be.visible')
    .should('have.text', nomeAtalho)
    .click()
})

Cypress.Commands.add('acessaMyProfile', () => {
    const nomeAtalho = 'My profile'
    cy.get('[data-test="nav-my-profile"]')
    .should('be.visible')
    .should('have.text', nomeAtalho)
    .click()
})

Cypress.Commands.add('acessaMyInvoices', () => {
    const nomeAtalho = 'My invoices'
    cy.get('[data-test="nav-my-invoices"]')
    .should('be.visible')
    .should('have.text', nomeAtalho)
    .click()
})

Cypress.Commands.add('acessaMyMessages', () => {
    const nomeAtalho = 'My messages'
    cy.get('[data-test="nav-my-messages"]')
    .should('be.visible')
    .should('have.text', nomeAtalho)
    .click()
})

Cypress.Commands.add('clicaBotaoRegistrar', () => {
    //Clica em "Register"
    cy.get('[data-test="register-submit"]')
    .should('not.be.disabled')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('clicaBotaoProceedCheckout', (num) => {
    cy.get(`[data-test="proceed-${num}"]`)
    .should('be.visible')
    .click();
})

Cypress.Commands.add('alteraPrimeiroNomeUsuario', (nome) => {
    //Altera primeiro nome
    cy.get('[data-test="first-name"]')
    .clear()
    .type(nome)
})

Cypress.Commands.add('acessaPaginaContato', () => {
    const nomeContato = 'Contact'
    //Acessa "Contact"
    cy.get('[data-test="nav-contact"]')
    .should('be.visible')
    .should('have.text', nomeContato)
    .click()
})

Cypress.Commands.add('enviaContato', () => {
    //Clica em enviar contato
    cy.get('[data-test="contact-submit"]')
    .should('not.be.disabled')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('selecionaMeioDePagamento', (meioDePagamento) => {
    cy.get('[data-test="payment-method"]')
    .should('not.be.disabled')
    .should('be.visible')
    .select(meioDePagamento)
})

Cypress.Commands.add('preencheFormularioContato', ({nome,sobrenome,email},assunto,mensagem) => {
    const listaSeletoresContato = {
        '[data-test="first-name"]': nome,
        '[data-test="last-name"]': sobrenome,
        '[data-test="email"]': email,
        '[data-test="message"]': mensagem,
        '[data-test="subject"]': assunto
    }
    const campoAssuntoContato = '[data-test="subject"]'
    
    //Preenche todos os dados de contato
    Object.entries(listaSeletoresContato).forEach(([seletor,valor]) => {
        if(seletor == campoAssuntoContato){
            cy.get(seletor)
            .should('be.visible')
            .select(valor)
        }
        else{
            cy.get(seletor)
            .should('be.visible')
            .clear()
            .type(valor)
        }
    })  
})

Cypress.Commands.add('preencheDadosDeCadastroDoUsuario', (dadosUsuario) => {
    const listaSeletoresTelaDeCadastroUsuario = {
        '[data-test="first-name"]': dadosUsuario.nome,
        '[data-test="last-name"]': dadosUsuario.sobrenome,
        '[data-test="dob"]': dadosUsuario.nascimento,
        '[data-test="address"]': dadosUsuario.endereco,
        '[data-test="postcode"]': dadosUsuario.codigoPostal,
        '[data-test="city"]': dadosUsuario.cidade,
        '[data-test="state"]': dadosUsuario.estado,
        '[data-test="phone"]': dadosUsuario.telefone,
        '[data-test="country"]': dadosUsuario.pais,
        '[data-test="email"]': dadosUsuario.email, 
        '[data-test="password"]': dadosUsuario.senha
    }
    //O país tem que ser selecionado usando "cy.select" no lugar de "cy.get"
    const seletorPais = '[data-test="country"]'

    //Preenche todos os dados pessoais
    Object.entries(listaSeletoresTelaDeCadastroUsuario).forEach(([seletor,valor]) => {
        //Se for selecionar o pais, irá usar o comando "cy.select()" pois não é possível utilizar "cy.get()"
        if(seletor == seletorPais){
            cy.get(seletorPais)
            .select(valor)
        }
        else{
            cy.get(seletor)
            .should('be.visible')
            .type(valor)
        } 
    })
})

Cypress.Commands.add('validaDadosDeCobranca', ({endereco,cidade,estado,nomePaisAbreviado,codigoPostal}) => {
    const listaSeletoresCobranca = {
        '[data-test="address"]': endereco,
        '[data-test="city"]': cidade,
        '[data-test="state"]': estado,
        '[data-test="country"]': nomePaisAbreviado,
        '[data-test="postcode"]': codigoPostal
    }
    //Verifica se cada um dos dados cadastrados está correto
    Object.entries(listaSeletoresCobranca).forEach(([seletor,dado]) => {
        cy.get(seletor)
        .should('be.visible')
        .should('have.value', dado)
    })
})

Cypress.Commands.add('calculaTotalCarrinho', (quantidadeProduto) => {
    /*Recebe o valor de produtos adicionados no carrinho e faz o cálculo para verificar se o 
    total apresentado no carrinho é ao resultado de (preço X quantidade) */
    cy.get('[data-test="product-quantity"]')
        .invoke('val') // Obtém o valor do atributo 'Quantity'
        .then((text) => {
            const quantidade = parseInt(text, 10); //Converte o valor de 'Quantity' para número
            expect(quantidade).to.be.equal(quantidadeProduto); //Compara o valor de 'Quantity' para saber se é igual ao que foi adicionado ao carrinho
        
            //Confere o preço do produto
            cy.get('[data-test="product-price"]')
            .invoke('text') // Obtém o texto dentro do elemento "Price"
            .then((text) => {
                
                //Remove o símbolo "$" e converte o texto de "Price" para número
                const preco = parseFloat(text.replace('$', '',10).trim()); 
                //Multiplica (quantidade X preco) para saber o total
                let multiplicaTotal = preco * quantidade
                //Usa somente até duas casas decimais no total do valor do produto
                multiplicaTotal = multiplicaTotal.toFixed(2)
                //salvaPreco = preco

                //Confere o total do carrinho
                cy.get('[data-test="cart-total"]')
                .invoke('text') // Obtém o texto dentro do elemento "Total"
                .then((text) => {
                    
                    //Remove o símbolo "$" e converte o texto de "Total" para número
                    let valorTotalCarrinho = text.replace(/[,$]/g, '')
                    valorTotalCarrinho = parseFloat(valorTotalCarrinho)
                    //Usa somente até duas casas decimais no total do produto pois o site usa essa configuração
                    valorTotalCarrinho = valorTotalCarrinho.toFixed(2)
                    
                    //Verifica se o preço está correto comparando o valor da multiplicação dos produtos pelo total listado em tela
                    expect(multiplicaTotal).to.be.equal(valorTotalCarrinho)
                    //salvaTotalCarrinho = valorTotalCarrinho
                }) 
            })
        })
})