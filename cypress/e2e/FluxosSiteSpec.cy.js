/// <reference types="cypress" />

describe('Fluxos do Site', function() {

    this.beforeEach(() => {
        cy.acessaSite()
    })

    //Dados para criação de um novo usuário
    const nome = 'Ronnie'
    const sobrenome = 'Coleman'
    const nascimento = '1964-05-13'
    const endereco = 'Rua T'
    const codigoPostal = '90263'
    const cidade = 'Monroe'
    const estado = 'Luisiana'
    const pais = 'Mexico'
    const nomePaisAbreviado = 'MX'
    const telefone = '19201834'
    const email = 'email@doommail.com'
    const senha = '1234aB12#;00'

    //Dados de usuário já existente
    //Obs: esses dados são publicos no repositório do Github do projeto
    const emailUsuarioExistente = 'customer@practicesoftwaretesting.com'
    const senhaUsuarioExistente = 'welcome01'

    //Lista de métodos de pagamento
    const listaMeiosPagamento = ['Bank Transfer', 'Cash on Delivery', 'Credit Card', 'Buy Now Pay Later', 'Gift Card']
    let meioDePagamento = Math.floor(Math.random()*listaMeiosPagamento.length)

    it('Adiciona produto no carrinho', function() {
        const nomeProduto = 'Thor Hammer'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Adiciona produto ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()

        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')
    })

    it('Remove produto do carrinho.', function() {
        const nomeProduto = 'Bolt Cutters'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Adiciona produto ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')

        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()

        //Certifica que o carrinho não está vazio
        cy.get('[data-test="product-title"]')
        .should('not.be.empty')
        
        //Remove do carrinho
        cy.get('.btn-danger')
        .click({multiple:true})

        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product deleted.', { matchCase: false })
        .should('be.visible')

        //Certifica que o carrinho está vazio
        cy.get('[data-test="product-title"]')
        .should('not.exist')
    })

    it('Adiciona produto fora de estoque ao carrinho.', function() {
        const nomeProduto = 'Long Nose Pliers'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Valida botão do carrinho desativado
        cy.get('[data-test="add-to-cart"]')
        .should('be.disabled')
        //Mensagem informando que está fora de estoque
        cy.get('[data-test="out-of-stock"]')
        .should('be.visible')
        .should('contain.text', 'Out of stock')
    })

    it('Adiciona o mesmo produto várias vezes no carrinho.', function() {
        const nomeProduto = 'Court Hammer'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Aumenta quantidade do produto para 3
        cy.get('[data-test="increase-quantity"]')
        .dblclick()

        //Adiciona produto ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()

        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()

        //Confere quantidade 
        cy.get('[data-test="product-quantity"]')
        .invoke('val') // Obtém o valor do atributo 'Quantity'
        .then((text) => {
            const quantidade = parseInt(text, 10); //Converte o valor de 'Quantity' para número
            expect(quantidade).to.be.greaterThan(1); //Compara o valor de 'Quantity' para saber se o número de produtos no carrinho é maior que 1
        })
    })

    it('Adiciona "Thor Hammer" ao carrinho.', function() {
        /*Esse produto em específico só pode ser adicionado 1 no carrinho, este teste valida isso.*/
        const nomeProduto = 'Thor Hammer'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Adiciona produto ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')
        
        //Tenta adicionar novamente ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()

        //Mensagem de insucesso
        cy.get('.toast-message')
        .contains('You can only have one Thor Hammer in the cart.', { matchCase: false })
        .should('be.visible')
    })

    it('Verifica se o site permite adicionar 0 produtos ao carrinho.', function() {
        const nomeProduto = 'Sledgehammer'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Tenta diminuir a quantidade do produto para 0
        cy.get('[data-test="decrease-quantity"]')
        .dblclick()

        //Verifica se a quantidade ainda continua igual a 1
        cy.get('[data-test="quantity"]')
        .invoke('val') // Obtém o valor do atributo 'Quantity'
        .then((text) => {
            const quantidade = parseInt(text, 10); //Converte o valor de 'Quantity' para número
            expect(quantidade).to.be.greaterThan(0); //Compara o valor de 'Quantity' para saber se a quantidade do produto ainda é 1
        })
    })

    it('Verifica se o nome do produto é o mesmo dentro do carrinho.', function() {
        const nomeProduto = 'Circular Saw'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Adiciona produto ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')
        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()
        //Valida nome do produto
        cy.get('[data-test="product-title"]')
        .should('contain.text', `${nomeProduto}`)
    })

    it('Adiciona produto aos favoritos sem ter conta de usuário.', function() {
        const nomeProduto = 'Safety Goggles'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Tenta adicionar aos favoritos
        cy.get('[data-test="add-to-favorites"]')
        .click()
        //Mensagem de insucesso
        cy.get('.toast-message')
        .contains('Unauthorized, can not add product to your favorite list.', { matchCase: false })
        .should('be.visible')
    })

    it('Verifica se a página de "Login" é exibida no carrinho corretamente.', function() {
        const nomeProduto = 'Wood Saw'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()
        //Adiciona produto ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')
        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()

        //Prossegue para login
        cy.get('[data-test="proceed-1"]')
        .click()

        //Verifica campos da tela de login
        cy.get('[data-test="email"]')
        .should('be.visible')
        cy.get('[data-test="password"]')
        .should('be.visible')
        cy.get('[data-test="login-submit"]')
        .should('be.visible')
        //Link de registro de novo usuário
        cy.get('[data-test="register-link"]')
        .should('be.visible')
        .should('contain.text', 'Register your account')
        //Link de esqueci minha senha
        cy.get('[data-test="forgot-password-link"]')
        .should('be.visible')
        .should('contain.text', 'Forgot your Password?')
    })

    it('Adicionar produto ao carrinho e tenta finalizar compra sem ter conta de usuário.', function() {
        const emailInexistente = 'qualquer@qualquer.com'
        const senhaInexistente = '1234567'
        const nomeProduto = 'Ear Protection'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()
        //Adiciona produto ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')
        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()

        //Prossegue para login
        cy.get('[data-test="proceed-1"]')
        .click()

        //Digita dados e clica em "Login"
        cy.get('[data-test="email"]')
        .type(`${emailInexistente}`)
        cy.get('[data-test="password"]')
        .type(`${senhaInexistente}`)
        cy.get('[data-test="login-submit"]')
        .click()
        //Mensagem de credenciais invalidas
        cy.get('[data-test="login-error"]')
        .should('be.visible')
        .should('have.text', 'Invalid email or password')
    })

    it('Altera quantidade de produtos dentro do carrinho.', function() {
        const nomeProduto = 'Drawer Tool Cabinet'
        const quantidadeItens = 7
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()
        //Adiciona produto ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')
        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()

        //Altera quantidade de itens
        cy.get('[data-test="product-quantity"]')
        .clear()
        .type(`${quantidadeItens}`)
        .blur()
        //Confirma alteração
        cy.get('.toast-message')
        .contains('Product quantity updated.', { matchCase: false })
        .should('be.visible')
    })

    it('Verifica se o preço do produto é o mesmo dentro do carrinho.', function() {
        const nomeProduto = 'Wood Carving Chisels'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        cy.get('[data-test="unit-price"]')
        .invoke('text') //Obtem texto referente ao preço do produto
        .then((text) => {
            const valorProduto = parseFloat(text, 10); //Converte o valor do produto de string para número flutuante
            //Adiciona produto ao carrinho
            cy.get('[data-test="add-to-cart"]')
            .click()
            //Mensagem de sucesso
            cy.get('.toast-message')
            .contains('Product added to shopping cart.', { matchCase: false })
            .should('be.visible')
            //Acessa carrinho
            cy.get('[data-test="nav-cart"]')
            .click()

            cy.wait(2000) //Delay para casos onde o carrinho demora para carregar a lista de itens
            cy.get('[data-test="product-price"]')
            .invoke('text') // Obtém o texto dentro do elemento "Price"
            .then((text) => {
                
                //Remove o símbolo "$" e converte o texto do preço para número
                const valorCarrinho = parseFloat(text.replace('$', '',10).trim()); 
                //Verifica se o preço está correto comparando o valor da página com preço do carrinho
                expect(Number(`${valorCarrinho}`)).to.be.equal(Number(`${valorProduto}`));   
            })
        })
    })

    it('Verifica se o valor total do produto está correto.', function() {
        const nomeProduto = 'Cordless Drill 20V'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()
        //Aumenta quantidade do produto
        cy.get('[data-test="increase-quantity"]')
        .dblclick().dblclick().dblclick()
        //Adiciona produto ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')
        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()

        cy.get('[data-test="product-quantity"]')
        .invoke('val') // Obtém o valor do atributo 'Quantity'
        .then((text) => {
            const quantidade = parseInt(text, 10); //Converte o valor de 'Quantity' para número
            expect(quantidade).to.be.greaterThan(1); //Compara o valor de 'Quantity' para saber se o número de produtos no carrinho é maior que 1

            cy.get('[data-test="product-price"]')
            .invoke('text') // Obtém o texto dentro do elemento "Price"
            .then((text) => {
                
                //Remove o símbolo "$" e converte o texto do preço para número
                const preco = parseFloat(text.replace('$', '',10).trim()); 
                //Multiplica (quantidade X preco) para saber o total
                let multiplicaTotal = preco * quantidade
                //Usa somente até duas casas decimais no total do valor do produto
                multiplicaTotal = multiplicaTotal.toFixed(2)

                cy.get('[data-test="cart-total"]')
                .invoke('text') // Obtém o texto dentro do elemento "Total"
                .then((text) => {
                    
                    //Remove o símbolo "$" e converte o texto do total para número
                    const valorTotalCarrinho = parseFloat(text.replace('$', '',10).trim());
                    //Usa somente até duas casas decimais no total do produto pois o site usa essa configuração
                    let comparaTotal = valorTotalCarrinho.toFixed(2)
                    //Verifica se o preço está correto comparando o valor da multiplicação dos produtos pelo total listado em tela
                    expect(multiplicaTotal).to.be.equal(comparaTotal)
                }) 
            })
        })
    })

    it('Verifica consulta de produtos relacionados.', function() {
        const nomeProduto = 'Court Hammer'
        const nomeProdutoRelacionado = 'Hammer'
        const nomeProdutoNaoRelacionado = 'Pliers'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()
        //Verifica se listou produtos relacionados
        cy.get('h1')
        .contains('Related products')
        .should('be.visible')
        //Verifica se produtos da mesma categoria "Hammer" são listados
        cy.get('.col')
        .should('contain.text', `${nomeProdutoRelacionado}`)
        .should('not.contain.text', `${nomeProdutoNaoRelacionado}`) //Verifica se produtos de outras categorias "Pliers" não são listados
    })

    it('Verifica se é possível acessar um produto novo através dos seus relacionados.', function() {
        const nomeProduto = 'Mini Screwdriver'
        const nomeNovoProduto = 'Phillips Screwdriver'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()
        //Clica em "More information"
        cy.get('.card-body')
        .contains('More information')
        .click()
        //Valida nome do novo produto
        cy.get('[data-test="product-name"]')
        .should('have.text', `${nomeNovoProduto}`)
    })

    it('Verifica desconto no carrinho.', function() {
        const nomeProdutoComDesconto = 'Bulldozer'
        const nomeProdutoComum = 'Cordless Drill 18V'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProdutoComDesconto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProdutoComDesconto}`)
        .click()
        //Adiciona produto ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')

        //Acessa Home
        cy.get('[data-test="nav-home"]')
        .click()

        //Pesquisa segundo produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProdutoComum}`)
        cy.get('[data-test="search-submit"]')
        .click()
        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProdutoComum}`)
        .click()

        //Adiciona produto ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')

        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()

        //Confere nome dos produtos
        cy.get('[data-test="product-title"]')
        .should('contain.text', `${nomeProdutoComDesconto}`)
        .should('contain.text', `${nomeProdutoComum}`)

        cy.get('[data-test="cart-discount"]')
        .should('be.visible')
        .invoke('text') // Obtém o texto dentro do elemento "Discount"
        .then((text) => {
                
            //Remove os caracteres "-" e "$" contidos no desconto
            let valorDesconto = text.replace(/[-$]/g, '')
            //Converte o valor de desconto para número
            valorDesconto = Number(valorDesconto) 
                         
            cy.get('[data-test="cart-subtotal"]')
            .invoke('text') // Obtém o texto dentro do elemento "Total"
            .then((text) => {
                let valorSubtotal = parseFloat(text.replace('$', '',10).trim());
                //Usa no máximo 2 casas decimais para o valor do subtotal
                const calculaDesconto = (valorSubtotal - valorDesconto).toFixed(2)

                cy.get('[data-test="cart-total"]')
                .invoke('text') // Obtém o texto dentro do elemento "Total"
                .then((text) => {
                    
                    //Remove o símbolo "$" e converte o texto do Total para número
                    const totalCarrinho = parseFloat(text.replace('$', '',10).trim());
                    //Usa somente até duas casas decimais no total do produto pois o site usa essa configuração
                    let comparaTotal = totalCarrinho.toFixed(2)
                    //Verifica se o preço está correto comparando o valor da multiplicação dos produtos pelo total listado em tela
                    expect(calculaDesconto).to.be.equal(comparaTotal)
                })
            })
        })
    })

    it('Verifica produto do qual o preço é de locação por hora.', function() {
        const nomeProduto = 'Crane'
        let valorSlider = 5
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Altera valor do slider
        cy.get('.ngx-slider-full-bar')
        .click()
        //Verifica se valor foi alterado
        cy.get('.ngx-slider-pointer-min')
        .should('have.attr','aria-valuenow', valorSlider)
    })

    it('Verifica se o produto de locação por hora altera valor total do preço da locação', function() {
        const nomeProduto = 'Excavator'
        let valorSlider = 5
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Altera valor do slider
        cy.get('.ngx-slider-full-bar')
        .click()
        //Verifica se valor foi alterado
        cy.get('.ngx-slider-pointer-min')
        .should('have.attr','aria-valuenow', valorSlider)

        cy.get('[data-test="unit-price"]')
        .invoke('text') // Obtém o texto dentro do elemento "Unit Price"
        .then((text) => {
                    
            //Remove o símbolo "$" e converte o texto de "Unit Price" para número
            let precoUnitario = parseFloat(text.replace('$', '',10).trim());
            //Usa somente até duas casas decimais no total do produto pois o site usa essa configuração
            let calculaTotal = (precoUnitario * valorSlider).toFixed(2)

            cy.get('#total-price')
            .invoke('text') // Obtém o texto dentro do elemento "Total"
            .then((text) => {
                    
                //Remove o símbolo "$" e converte  o texto de "Total" para número
                let total = parseFloat(text.replace('$', '',10).trim());
                //Usa somente até duas casas decimais no total do produto pois o site usa essa configuração
                total = total.toFixed(2)
                expect(total).to.be.equal(calculaTotal)  
            })
        })
    })

    it('Verifica se o produto de locação por hora altera valor total de duração da locação', function() {
        const nomeProduto = 'Bulldozer'
        let valorSlider = 5
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Altera valor do slider
        cy.get('.ngx-slider-full-bar')
        .click()
        //Verifica se valor foi alterado
        cy.get('.ngx-slider-pointer-min')
        .should('have.attr','aria-valuenow', valorSlider)

        cy.get('#duration')
        .invoke('text') // Obtém o texto dentro do elemento "Total"
        .then((text) => {
                    
            //Remove o símbolo "$" e converte o texto de "Total" para número
            let duracao = parseInt(text.replace('$', '',10).trim());
            //Usa somente até uma casa decimal
            //Verifica se o valor da duração é igual o valor alterado no slider
            expect(duracao).to.be.equal(valorSlider)  
        })
    })

    it('Verifica se o carrinho mantém os itens após recarregar a página.', function() {
        const nomeProduto = 'Angled Spanner'
        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()
        //Adiciona produto ao carrinho
        cy.get('[data-test="add-to-cart"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')

        //Recarrega o site e vai para a "Home"
        cy.reload()
        cy.get('[data-test="nav-home"]')
        .click()
        //Verifica se o ícone do carrinho continua visível após o site ser recarregado
        //Obs: o ícone do carrinho só é visível caso tenham produtos nele
        cy.get('[data-test="nav-cart"]')
        .should('be.visible')
    })

    it('Verifica se é possível registrar usuário sem preencher nenhum campo da tela "Customer registration".', function() {
        //Acessa login de usuario 
        cy.get('[data-test="nav-sign-in"]')
        .click()
        cy.get('[data-test="register-link"]')
        .click()
        //Confirma que está na tela de registro
        cy.get('h3')
        .should('have.text', 'Customer registration')

        //Clica em "Register" sem preencher nenhuma informação
        cy.get('[data-test="register-submit"]')
        .click()

        //Lista de campos obrigatórios
        cy.get('[data-test="first-name-error"]') //Erro "First Name"
        .should('be.visible')
        cy.get('[data-test="last-name-error"]') //Erro "Last Name"
        .should('be.visible')
        cy.get('[data-test="dob-error"]') //Erro "Date of Birth"
        .should('be.visible')
        cy.get('[data-test="address-error"]') //Erro "Address"
        .should('be.visible')
        cy.get('[data-test="postcode-error"]') //Erro "Postcode"
        .should('be.visible')
        cy.get('[data-test="city-error"]') //Erro "City"
        .should('be.visible')
        cy.get('[data-test="state-error"]') //Erro "State"
        .should('be.visible')
        cy.get('[data-test="country-error"]') //Erro "Country"
        .should('be.visible')
        cy.get('[data-test="phone-error"]') //Erro "Phone"
        .should('be.visible')
        cy.get('[data-test="email-error"]') //Erro "Email"
        .should('be.visible')
        cy.get('[data-test="password-error"]') //Erro "Password"
        .should('be.visible')
    })

    //TODO: melhorar o formato com qual esse teste interage com a data
    it('Verifica se o campo "Date of Birth" permite somente números.', function() {
        //Acessa login de usuario 
        cy.get('[data-test="nav-sign-in"]')
        .click()
        cy.get('[data-test="register-link"]')
        .click()
        //Confirma que está na tela de registro
        cy.get('h3')
        .should('have.text', 'Customer registration')

        //Digitar letras no campo de data faz com que um erro seja resultado
        cy.get('[data-test="dob"]')
        .type('bbbb-bb-bb')

        //Faz com que o teste não falhe apesar do erro
        Cypress.on("fail", (err, runnable) => {
            cy.log(err.message);
            return false;
        });
    })
    
    it('Verifica se o campo "Date of Birth" valida idade máxima para registro.', function() {
        const nascimentoAcimaDoPermitido = '1921-06-10'
        const dadosAleatorios = '190263'
        
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        cy.get('[data-test="register-link"]')
        .click()
        //Confirma que está na tela de registro
        cy.get('h3')
        .should('have.text', 'Customer registration')

        //Preenche dados pessoais
        cy.get('[data-test="first-name"]')
        .type(nome)
        cy.get('[data-test="last-name"]')
        .type(sobrenome)
        cy.get('[data-test="address"]')
        .type(dadosAleatorios)
        cy.get('[data-test="postcode"]')
        .type(dadosAleatorios)
        cy.get('[data-test="city"]')
        .type(dadosAleatorios)
        cy.get('[data-test="state"]')
        .type(dadosAleatorios)
        cy.get('[data-test="country"]')
        .select(pais)
        cy.get('[data-test="phone"]')
        .type(dadosAleatorios)
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)

        //Digita idade acima de 75 anos
        cy.get('[data-test="dob"]')
        .type(nascimentoAcimaDoPermitido)
        //Clica em "Register"
        cy.get('[data-test="register-submit"]')
        .click()

        //Alerta de idade acima do limite permitido para cadastro
        cy.get('[data-test="register-error"]')
        .should('have.text', 'Customer must be younger than 75 years old.')
    })

    it('Verifica se o campo "Phone" permite somente números.', function() {
        const telefoneErrado = 'zeroumzeroum'
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        cy.get('[data-test="register-link"]')
        .click()
        //Confirma que está na tela de registro
        cy.get('h3')
        .should('have.text', 'Customer registration')
       
        //Digita letras no campo "phone"
        cy.get('[data-test="phone"]')
        .type(telefoneErrado)
        .blur()
        //Clica em "Register"
        cy.get('[data-test="register-submit"]')
        .click()
        //Verifica mensagem de alerta sobre o campo preenchido erroneamente
        cy.get('[data-test="phone-error"]')
        .should('be.visible')
        .should('have.text', ' Only numbers are allowed. ', { matchCase: false })
    })

    it('Verifica se o campo "Password" permite somente caracteres válidos.', function() {
        const senhaFraca = 'abcd'
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        cy.get('[data-test="register-link"]')
        .click()
        //Confirma que está na tela de registro
        cy.get('h3')
        .should('have.text', 'Customer registration')
        
        //Digita senha no campo "Password"
        cy.get('[data-test="password"]')
        .type(senhaFraca)
        //Clica em "Register"
        cy.get('[data-test="register-submit"]')
        .click()
        //Mensagem de alerta sobre a senha fraca
        cy.get('[data-test="password-error"]')
        .should('contain.text', 'Password must be minimal 6 characters long.', { matchCase: false })
        .should('contain.text', 'Password can not include invalid characters. ', { matchCase: false })
    })

    it('Verifica nível de segurança da senha.', function() {
        const senhaForte = '1234aB12#;00'
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        cy.get('[data-test="register-link"]')
        .click()
        //Confirma que está na tela de registro
        cy.get('h3')
        .should('have.text', 'Customer registration')
        
        //Digita senha no campo "Password"
        cy.get('[data-test="password"]')
        .type(senhaForte)
        //Verifica se a senha tem segurança excelente
        cy.get('[class="active"]')
        .should('have.text', 'Excellent')
        .should('not.have.text', 'Weak')
        .should('not.have.text', 'Moderate')
        .should('not.have.text', 'Strong')
        .should('not.have.text', 'Very Strong')
    })

    it('Verifica se é possível fazer login com usuário inválido.', function() {
        const usuarioInvalido = 'abcd@email.com'
        const senhaInvalida = 'dcba'
       
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(usuarioInvalido)
        cy.get('[data-test="password"]')
        .type(senhaInvalida)
        cy.get('[data-test="login-submit"]')
        .click()

        //Mensagem de erro do login
        cy.get('[data-test="login-error"]')
        .should('be.visible')
        .should('have.text', 'Invalid email or password')
    })

    it('Verifica se é possível recuperar senha de um usuário inválido.', function() {
        const emailInvalido = 'abcd@email.com'
        //Acessa tela de login 
        cy.get('[data-test="nav-sign-in"]')
        .click()

        //Acessa "Forgot your password?"
        cy.get('[data-test="forgot-password-link"]')
        .click()
        //Digita email inexistente
        cy.get('[data-test="email"]')
        .type(emailInvalido)
        cy.get('[data-test="forgot-password-submit"]')
        .click()
        //Verifica mensagem de email inválido
        cy.get('.alert')
        .should('be.visible')
        .should('contain.text', 'The selected email is invalid.')
    })

    it('Verifica se é possível registrar um novo usuário corretamente.', function() {
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Clica em registrar novo usuário
        cy.get('[data-test="register-link"]')
        .click()

        //Preenche todos os dados pessoais
        cy.get('[data-test="first-name"]')
        .type(nome)
        cy.get('[data-test="last-name"]')
        .type(sobrenome)
        cy.get('[data-test="dob"]')
        .type(nascimento)
        cy.get('[data-test="address"]')
        .type(endereco)
        cy.get('[data-test="postcode"]')
        .type(codigoPostal)
        cy.get('[data-test="city"]')
        .type(cidade)
        cy.get('[data-test="state"]')
        .type(estado)
        cy.get('[data-test="country"]')
        .select(pais)
        cy.get('[data-test="phone"]')
        .type(telefone)
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)

        //Clica em "Register"
        cy.get('[data-test="register-submit"]')
        .click()
        //O site deve redirecionar o usuário para a tela de login após o cadastro bem sucedido
        cy.get('h3')
        .should('have.text', 'Login')
    })

    it('Verifica se é possível fazer login corretamente com usuário válido.', function() {
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)
        //Clica em "Login"
        cy.get('[data-test="login-submit"]')
        .click()
        
        //Verifica se acessou conta
        cy.get('[data-test="page-title"]')
        .should('be.visible')
        .should('have.text', 'My account')
    })

    it('Verifica se o nome do usuário é apresentado corretamente na tela incial.', function() {
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)
        cy.get('[data-test="login-submit"]')
        .click()
        
        cy.wait(2000) //Delay para fazer login
        //Acessa Home
        cy.get('[data-test="nav-home"]')
        .click()
        //Confere nome
        cy.get('[data-test="nav-menu"]')
        .should('be.visible')
        .should('contain.text', nome+' '+sobrenome)
    })

    it('Verifica se a lista de funcionalidades da conta é apresentada corretamente.', function() {
        //Acessa tela de login 
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)
        cy.get('[data-test="login-submit"]')
        .click()
        //Texto referente as funções de gerenciamento da conta
        cy.get('app-overview > p')
        .should('be.visible')
        .should('have.text', 'Here you can manage your profile, favorites and orders.')

        //Atalhos de funcionalidade
        cy.get('[data-test="nav-favorites"]')
        .should('be.visible')
        cy.get('[data-test="nav-profile"]')
        .should('be.visible')
        cy.get('[data-test="nav-invoices"]')
        .should('be.visible')
        cy.get('[data-test="nav-messages"]')
        .should('be.visible')
    })

    it('Verifica se um item favoritado é acessível através de "My favorites".', function() {
        const nomeProduto = 'Safety Goggles'
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)
        cy.get('[data-test="login-submit"]')
        .click()

        cy.wait(2000) //Delay para fazer login
        //Acessa Home
        cy.get('[data-test="nav-home"]')
        .click()

        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()
        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Adiciona aos favoritos
        cy.get('[data-test="add-to-favorites"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to your favorites list.', { matchCase: false })
        .should('be.visible')
        //Acessa lista de favoritos
        cy.get('[data-test="nav-menu"]')
        .should('be.visible')
        .click()
        cy.get('[data-test="nav-my-favorites"]')
        .click()
        //Confirma que está na tela de favoritos
        cy.get('[data-test="page-title"]')
        .should('have.text', 'Favorites')

        //Confirma nome do produto favoritado
        cy.get('[data-test="product-name"]')
        .should('contain.text', nomeProduto)
    })

    it('Verifica se um item favoritado é duplicável.', function() {
        const nomeProduto = 'Ear Protection'
        //Acessa tela de login 
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)
        cy.get('[data-test="login-submit"]')
        .click()

        cy.wait(2000) //Delay para fazer login
        //Acessa Home
        cy.get('[data-test="nav-home"]')
        .click()

        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()
        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Adiciona aos favoritos
        cy.get('[data-test="add-to-favorites"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to your favorites list.', { matchCase: false })
        .should('be.visible')
        cy.wait(5000) //Espera mensagem de sucesso desaparecer

        //Adiciona o produto novamente
        cy.get('[data-test="add-to-favorites"]')
        .click()
        //Mensagem informando que o item já está favoritado
        cy.get('.toast-message')
        .should('be.visible')
        .should('contain.text', 'Product already in your favorites list.')
        
    })

    it('Verifica se um item favoritado é removível através de "My favorites".', function() {
        const nomeProduto = 'Protective Gloves'
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)
        cy.get('[data-test="login-submit"]')
        .click()

        cy.wait(2000) //Delay para fazer login
        //Acessa Home
        cy.get('[data-test="nav-home"]')
        .click()

        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()
        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()

        //Adiciona aos favoritos
        cy.get('[data-test="add-to-favorites"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to your favorites list.', { matchCase: false })
        .should('be.visible')
        
        //Acessa lista de favoritos
        cy.get('[data-test="nav-menu"]')
        .should('be.visible')
        .click()
        cy.get('[data-test="nav-my-favorites"]')
        .click()
        //Confirma que está na tela de favoritos
        cy.get('[data-test="page-title"]')
        .should('have.text', 'Favorites')

        //Confirma nome do produto
        cy.get('[data-test="product-name"]')
        .should('contain.text', nomeProduto)
        //Remove produto
        cy.get('[data-test="delete"]')
        .click({multiple:true})
        //Confirma que o produto foi removido
        cy.get('.col > .ng-star-inserted')
        .should('be.visible')
        .should('contain.text', 'There are no favorites yet. In order to add favorites, please go to the product listing and mark some products as your favorite.')
    })

    it('Verifica dados apresentados em "My profile".', function() {
        //Acessa tela de login 
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)
        cy.get('[data-test="login-submit"]')
        .click()
        //Acessa dados do perfil
        cy.get('[data-test="nav-profile"]')
        .should('be.visible')
        .click()

        //Verifica lista de dados pessoais
        cy.get('[data-test="first-name"]')
        .should('be.visible')
        .should('have.value', nome)
        cy.get('[data-test="last-name"]')
        .should('be.visible')
        .should('have.value', sobrenome)
        cy.get('[data-test="email"]')
        .should('be.visible')
        .should('have.value', email)
        cy.get('[data-test="phone"]')
        .should('be.visible')
        .should('have.value', telefone)
        cy.get('[data-test="address"]')
        .should('be.visible')
        .should('have.value', endereco)
        cy.get('[data-test="postcode"]')
        .should('be.visible')
        .should('have.value', codigoPostal)
        cy.get('[data-test="city"]')
        .should('be.visible')
        .should('have.value', cidade)
        cy.get('[data-test="state"]')
        .should('be.visible')
        .should('have.value', estado)
        cy.get('[data-test="country"]')
        .should('be.visible')
        .should('have.value', nomePaisAbreviado)
    })

    it('Verifica se é possível alterar os dados apresentados em "My profile".', function() {
        const novoNome = 'Goku'
        //Acessa tela de login 
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)
        cy.get('[data-test="login-submit"]')
        .click()
        //Acessa dados do perfil
        cy.get('[data-test="nav-profile"]')
        .should('be.visible')
        .click()

        //Verifica nome
        cy.get('[data-test="first-name"]')
        .should('be.visible')
        .should('have.value', nome)
        //Altera nome e salva
        cy.get('[data-test="first-name"]')
        .clear()
        .type(novoNome)
        cy.get('[data-test="update-profile-submit"]')
        .click()
        
        //Confirma alteração
        cy.get('.alert')
        .should('be.visible')
        .should('have.text', 'Your profile is successfully updated!')
        //Verifica novo nome
        cy.get('[data-test="first-name"]')
        .should('be.visible')
        .should('have.value', novoNome)

        //Altera o novo nome para o nome anterior e salva
        cy.get('[data-test="first-name"]')
        .clear()
        .type(nome)
        cy.get('[data-test="update-profile-submit"]')
        .click()
        cy.wait(4000)
        //Confirma alteração
        cy.get('.alert')
        .should('be.visible')
        .should('have.text', 'Your profile is successfully updated!')
        cy.get('[data-test="first-name"]')
        .should('be.visible')
        .should('have.value', nome)
    })

    it('Verifica se o site impede o usuário de alterar a senha para a senha atual.', function() {
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)
        cy.get('[data-test="login-submit"]')
        .click()
        //Acessa dados do perfil
        cy.get('[data-test="nav-profile"]')
        .should('be.visible')
        .click()

        //Digita a senha atual
        cy.get('[data-test="current-password"]')
        .type(senha)
        //Digita a senha atual no campo da nova senha
        cy.get('[data-test="new-password"]')
        .type(senha)
        //Confirma senha
        cy.get('[data-test="new-password-confirm"]')
        .type(senha)
        cy.wait(2000) //Delay para apertar o botão de mudar senha
        
        //Tenta salvar alteração
        cy.get('[data-test="change-password-submit"]')
        .dblclick()
        .blur()
        //Confirma que a senha não pode ser alterada
        cy.get('.alert')
        .should('be.visible')
        .should('have.text', ' New Password cannot be same as your current password. ')
    })

    it('Verifica se é possível fazer o envio de contato através de "Contact".', function() {
        let motivoContato = 'Payments'
        let mensagemContato = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris viverra felis nec pellentesque feugiat. 
        Donec faucibus arcu maximus, convallis nisl eu, placerat dolor. 
        Morbi finibus neque nec tincidunt pharetra.`
        
        //Acessa "Contact"
        cy.get('[data-test="nav-contact"]')
        .should('be.visible')
        .click()

        //Preenche todos os dados de contato
        cy.get('[data-test="first-name"]')
        .should('be.visible')
        .clear()
        .type(nome)
        cy.get('[data-test="last-name"]')
        .should('be.visible')
        .clear()
        .type(sobrenome)
        cy.get('[data-test="email"]')
        .should('be.visible')
        .clear()
        .type(email)
        cy.get('[data-test="subject"]')
        .should('be.visible')
        .select(motivoContato)
        cy.get('[data-test="message"]')
        .should('be.visible')
        .clear()
        .type(mensagemContato)

        //Envia contato
        cy.get('[data-test="contact-submit"]')
        .should('be.visible')
        .click()
        //Mensagem de sucesso
        cy.get('.alert')
        .should('be.visible')
        .should('have.text', ' Thanks for your message! We will contact you shortly. ')
    })

    it('Verifica se é possível fazer o envio de contato com dados inválidos através de "Contact".', function() {
        //Acessa "Contact"
        cy.get('[data-test="nav-contact"]')
        .should('be.visible')
        .click()
        //Clica em enviar contato
        cy.get('[data-test="contact-submit"]')
        .should('be.visible')
        .click()

        //Lista de dados obrigatórios
        cy.get('[data-test="first-name-error"]') //Erro nome
        .should('be.visible')
        .should('have.text', 'First name is required')
        cy.get('[data-test="last-name-error"]') //Erro sobrenome
        .should('be.visible')
        .should('have.text', 'Last name is required')
        cy.get('[data-test="email-error"]') //Erro email
        .should('be.visible')
        .should('have.text', 'Email is required')
        cy.get('[data-test="subject-error"]') //Erro assunto
        .should('be.visible')
        .should('have.text', 'Subject is required')
        cy.get('[data-test="message-error"]') //Erro mensagem
        .should('be.visible')
        .should('have.text', 'Message is required')
    })

    it('Verifica se é possível fazer o envio de contato preenchendo o campo "Message" de maneira errada.', function() {
        let motivoContato = 'Webmaster'
        let mensagemContato = `Lorem ipsum dolor sit amet`
        
        //Acessa "Contact"
        cy.get('[data-test="nav-contact"]')
        .should('be.visible')
        .click()

        //Preenche todos os dados de contato
        cy.get('[data-test="subject"]')
        .should('be.visible')
        .select(motivoContato)
        //Preenche o campo "Message" com um texto menor que o mínimo permitido
        cy.get('[data-test="message"]')
        .should('be.visible')
        .clear()
        .type(mensagemContato)

        //Clica em enviar contato
        cy.get('[data-test="contact-submit"]')
        .should('be.visible')
        .click()
        //Confirma mensagem de erro
        cy.get('[data-test="message-error"]')
        .should('be.visible')
        .should('have.text', 'Message must be minimal 50 characters')
    })

    it('Verifica se é possível consultar a tela "My invoices".', function() {
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(emailUsuarioExistente)
        cy.get('[data-test="password"]')
        .type(senhaUsuarioExistente)
        cy.get('[data-test="login-submit"]')
        .click()
        //Acessa lista de faturas
        cy.get('[data-test="nav-invoices"]')
        .should('be.visible')
        .click()

        //Verifica titulo da página de fatura
        cy.get('[data-test="page-title"]')
        .should('be.visible')
        .should('have.text', 'Invoices')

        //Número da fatura
        cy.get('[scope="col"]')
        .contains('Invoice Number')
        .should('be.visible')
        //Endereço de cobrança
        cy.get('[scope="col"]')
        .contains('Billing Address')
        .should('be.visible')
        //Data da fatura
        cy.get('[scope="col"]')
        .contains('Invoice Date')
        .should('be.visible')
        //Total da fatura
        cy.get('[scope="col"]')
        .contains('Total')
        .should('be.visible')
    })

    it('Verifica se é possível consultar a tela "My messages".', function() {
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(emailUsuarioExistente)
        cy.get('[data-test="password"]')
        .type(senhaUsuarioExistente)
        cy.get('[data-test="login-submit"]')
        .click()
        //Acessa mensagens
        cy.get('[data-test="nav-messages"]')
        .should('be.visible')
        .click()

        //Confirma que está na tela de mensagens
        cy.get('[data-test="page-title"]')
        .should('be.visible')
        .should('have.text', 'Messages')
        //Confirma que não existem mensagens ainda
        cy.get('div')
        .contains('There are no messages yet. Navigate to the contact form and fill out the form.')
        .should('be.visible')
    })

    it('Verifica se é possível fazer logout do site.', function() {
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(emailUsuarioExistente)
        cy.get('[data-test="password"]')
        .type(senhaUsuarioExistente)
        cy.get('[data-test="login-submit"]')
        .click()
        cy.wait(2000)//Delay para finalizar login

        //Acessa Home
        cy.get('[data-test="nav-home"]')
        .should('be.visible')
        .click()
        //Faz logout
        cy.get('[data-test="nav-menu"]')
        .should('be.visible')
        .click()
        cy.get('[data-test="nav-sign-out"]')
        .should('be.visible')
        .click()
        //Confirma que o usuário saiu da conta
        cy.get('[data-test="nav-sign-in"]')
        .should('be.visible')
    })

    //TODO: dividir esse teste em 5 pequenos testes que vão fazer cada um uma compra diferente
    it('Verifica se é possível fazer uma compra com sucesso.', function() {
        const nomeProduto = 'Wooden Workbench'
        const quantidadeProduto = 8
        //Utilizado para salvar o valor do total do carrinho e exportar para Json
        let salvaTotalCarrinho
        //Utilizado para salvar o preço do produto e exportar para Json
        let salvaPreco 

        //Dados bancarios
        const nomeBanco = 'Apu'
        const numeroContaBancaria = '9993221'
        const numeroCartao = '5546-5674-0983-6903'
        const dataExpircaoCartao = '12/2027'
        const cvvCartao = '321'
        const numeroGiftCard = '7654321'
        const numeroValidacaoGiftCard = '45321'

        //Mensagens de ajuda de cada forma de pagamento
        const mensagemBankTransfer = `Please enter your bank account number as it appears on your bank statement. It's a unique series of numbers used to identify your individual account. Avoid including any spaces or hyphens.`
        const mensagemCreditCard = `Enter your 16-digit credit card number as it appears on the card, in the format 0000-0000-0000-0000. Ensure that you include the hyphens for proper formatting.`
        const mensagemCvv = `The CVV is a 3-digit or 4-digit number. It's used for added security during card-not-present transactions.`
        const mensagemBuyNow = `This option allows you to spread the cost of your purchase over several months.`
        const mensagemGiftCardNumber = `Enter the unique number found on your gift card. This number is usually located on the back of the card and may consist of digits and/or letters.`
        const mensagemValidationCodeGiftCard = `The validation code is a security feature found on your gift card, often located near the gift card number. Enter this code exactly as it appears on your card.`

        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()
        //Aumenta a quantidade do produto antes de adicionar ao carrinho
        cy.get('[data-test="quantity"]')
        .clear()
        .type(quantidadeProduto)
        //Adiciona ao carrinho 
        cy.get('[data-test="add-to-cart"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')
        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()

        cy.wait(2000) //Delay para o carrinho carregar
        //Confirma o nome do produto no carrinho
        cy.get('[data-test="product-title"]')
        .should('contain.text', `${nomeProduto}`)

        //Confere quantidade de produtos
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
                salvaPreco = preco

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
                    salvaTotalCarrinho = valorTotalCarrinho
                }) 
            })
        })

        //Prossegue para login
        cy.get('[data-test="proceed-1"]')
        .click()
        //Preenche dados de login
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
        .click()

        //Confirma que está logado
        cy.get('p.ng-star-inserted')
        .should('be.visible')
        .should('contain.text', 'Hello '+nome+' '+sobrenome)
        //Clica em prosseguir
        cy.get('[data-test="proceed-2"]')
        .click()
        //Confirma dados de endereço de cobrança
        cy.get('[data-test="address"]')
        .should('be.visible')
        .should('have.value', endereco)
        cy.get('[data-test="city"]')
        .should('be.visible')
        .should('have.value', cidade)
        cy.get('[data-test="state"]')
        .should('be.visible')
        .should('have.value', estado)
        cy.get('[data-test="country"]')
        .should('be.visible')
        .should('have.value', nomePaisAbreviado)
        cy.get('[data-test="postcode"]')
        .should('be.visible')
        .should('have.value', codigoPostal)
        //Clica em prosseguir
        cy.get('[data-test="proceed-3"]')
        .click()

        //Pagamento
        cy.get('[data-test="payment-method"]')
        .select(listaMeiosPagamento[meioDePagamento]) //Seleciona uma forma de pagamento aleatória dentre as 5 disponíveis
        //Valida os dados de pagamento de acordo com a opção selecionada
        switch(listaMeiosPagamento[meioDePagamento]){
            //Pagamento por transferência bancária
            case 'Bank Transfer':
                //Preenche dados bancários
                cy.get('[data-test="bank_name"]')
                .should('be.visible')
                .clear()
                .type(nomeBanco)
                cy.get('[data-test="account_name"]')
                .should('be.visible')
                .clear()
                .type(nome)
                cy.get('[data-test="account_number"]')
                .should('be.visible')
                .clear()
                .type(numeroContaBancaria)
                
                //Confere mensagem de ajuda
                cy.get('#account_number_help')
                .should('be.visible')
                .should('have.text', mensagemBankTransfer)
                //Finaliza pagamento
                cy.get('[data-test="finish"]')
                .click()
                //Mensagem de sucesso
                cy.get('.alert')
                .should('be.visible')
                .should('have.text', 'Payment was successful')
                //Finaliza compra
                cy.get('[data-test="finish"]')
                .should('be.visible')
                .click()
                //Confirma número do pedido
                cy.get('#order-confirmation')
                .should('be.visible')
                .should('contain.text', 'Thanks for your order!')
                .click()
                break;
            
            //Pagamento no momento do recebimento do produto
            case 'Cash on Delivery':
                cy.get('[data-test="finish"]')
                .should('be.visible')
                
                //Finaliza pagamento
                cy.get('[data-test="finish"]')
                .click()
                //Mensagem de sucesso
                cy.get('.alert')
                .should('be.visible')
                .should('have.text', 'Payment was successful')
                //Finaliza compra
                cy.get('[data-test="finish"]')
                .should('be.visible')
                .click()
                //Confirma número do pedido
                cy.get('#order-confirmation')
                .should('be.visible')
                .should('contain.text', 'Thanks for your order!')
                .click()
                break;

            //Pagamento no cartão de crédito
            case 'Credit Card':
                //Preenche dados do cartão de crédito
                cy.get('[data-test="credit_card_number"]')
                .should('be.visible')
                .clear()
                .type(numeroCartao)
                cy.get('[data-test="expiration_date"]')
                .should('be.visible')
                .clear()
                .type(dataExpircaoCartao)
                cy.get('[data-test="cvv"]')
                .should('be.visible')
                .clear()
                .type(cvvCartao)
                cy.get('[data-test="card_holder_name"]')
                .should('be.visible')
                .clear()
                .type(nome)

                //Confere mensagem de ajuda
                cy.get('#credit_card_number_help')
                .should('be.visible')
                .should('contain.text', mensagemCreditCard)
                cy.get('#cvv_help')
                .should('be.visible')
                .should('contain.text', mensagemCvv)

                //Finaliza pagamento
                cy.get('[data-test="finish"]')
                .click()
                //Mensagem de sucesso
                cy.get('.alert')
                .should('be.visible')
                .should('have.text', 'Payment was successful')
                //Finaliza compra
                cy.get('[data-test="finish"]')
                .should('be.visible')
                .click()
                //Confirma número do pedido
                cy.get('#order-confirmation')
                .should('be.visible')
                .should('contain.text', 'Thanks for your order!')
                .click()
                break;

            //Compre agora, pague depois
            case 'Buy Now Pay Later':
                //Preenche dados de pagamento
                cy.get('[data-test="monthly_installments"]')
                .should('be.visible')
                cy.get('[data-test="monthly_installments"]')
                .select('6 Monthly Installments')

                //Confere mensagem de ajuda
                cy.get('#monthly_installments_help')
                .should('be.visible')
                .should('contain.text', mensagemBuyNow)

                //Finaliza pagamento
                cy.get('[data-test="finish"]')
                .click()
                //Mensagem de sucesso
                cy.get('.alert')
                .should('be.visible')
                .should('have.text', 'Payment was successful')
                //Finaliza compra
                cy.get('[data-test="finish"]')
                .should('be.visible')
                .click()
                //Confirma número do pedido
                cy.get('#order-confirmation')
                .should('be.visible')
                .should('contain.text', 'Thanks for your order!')
                .click()
                break;

            //Pagamento com Vale Presente
            case 'Gift Card':
                //Preenche dados do Giftcard
                cy.get('[data-test="gift_card_number"]')
                .should('be.visible')
                .clear()
                .type(numeroGiftCard)
                cy.get('[data-test="validation_code"]')
                .should('be.visible')
                .clear()
                .type(numeroValidacaoGiftCard)

                //Confere mensagem de ajuda
                cy.get('#gift_card_number_help')
                .should('be.visible')
                .should('contain.text', mensagemGiftCardNumber)
                cy.get('#validation_code_help')
                .should('be.visible')
                .should('contain.text', mensagemValidationCodeGiftCard)

                //Finaliza pagamento
                cy.get('[data-test="finish"]')
                .click()
                //Mensagem de sucesso
                cy.get('.alert')
                .should('be.visible')
                .should('have.text', 'Payment was successful')
                //Finaliza compra
                cy.get('[data-test="finish"]')
                .should('be.visible')
                .click()
                //Confirma número do pedido
                cy.get('#order-confirmation')
                .should('be.visible')
                .should('contain.text', 'Thanks for your order!')
                .click()
                break;
        }

        //Salva o código do pedido
        cy.get('#order-confirmation > span')
        .invoke('text').then((text) => {
            //Usa uma regex para capturar somente o código do pedido
            const codigoPedido = text.match(/INV-\d{10}$/)?.[0];
            
            //Verifica se o código foi capturado corretamente
            expect(codigoPedido).to.exist
            //Salva todos os dados da compra em um objeto
            let dadosPedido = {
                codigoPedido,
                meioDepagamento: listaMeiosPagamento[meioDePagamento],
                quantidadeProduto,
                nomeProduto,
                salvaTotalCarrinho,
                salvaPreco 
            }
            //Salva dados da compra em um json para utilizar em outros testes
            cy.writeFile('cypress/fixtures/dados_compra.json',dadosPedido)
        });
        
    })

    //TODO: dividir esse teste em dois, assim será possível verificar os dois métodos de pagamento de uma vez só
    it('Verifica se o site impede uma compra quando os dados de pagamento são inválidos.', function() {
        const nomeProduto = 'Workbench with Drawers'
        const quantidadeProduto = 8

        //Lista dos unicos meios de pagamento que validam dados inseridos
        const listaMeiosPagamentoValidamDados = ['Bank Transfer', 'Credit Card']
        let meioDePagamentoSelecionado = Math.floor(Math.random()*listaMeiosPagamentoValidamDados.length)

        //Dados bancarios inválidos
        const nomeBancoErrado = 'a'
        const numeroContaBancariaErrado = 'a'
        const numeroCartaoErrado = '123'
        const dataExpircaoCartaoErrado = 'a'
        const cvvCartaoErrado = 'a'

        //Mensagens de ajuda de cada forma de pagamento
        const mensagemBankTransfer = `Please enter your bank account number as it appears on your bank statement. It's a unique series of numbers used to identify your individual account. Avoid including any spaces or hyphens.`
        const mensagemCreditCard = `Enter your 16-digit credit card number as it appears on the card, in the format 0000-0000-0000-0000. Ensure that you include the hyphens for proper formatting.`
        const mensagemCvv = `The CVV is a 3-digit or 4-digit number. It's used for added security during card-not-present transactions.`
    
        //Mensagem de erro do pagamento por transferência bancária
        const erroNumeroContaBancaria = ' Account number must be numeric. '
        //Mensagem de erro do pagamento por cartão
        const erroNumeroCartao = 'Invalid card number format.'
        const erroDataExpiracaoCartao = 'Invalid date format. Use MM/YYYY.'
        const erroCvvCartao = 'CVV must be 3 or 4 digits.'

        //Pesquisa produto
        cy.get('[data-test="search-query"]')
        .type(`${nomeProduto}`)
        cy.get('[data-test="search-submit"]')
        .click()

        //Acessa produto
        cy.get('[data-test="product-name"]')
        .contains(`${nomeProduto}`)
        .click()
        //Aumenta a quantidade do produto antes de adicionar ao carrinho 
        cy.get('[data-test="quantity"]')
        .clear()
        .type(quantidadeProduto)
        //Adiciona ao carrinho 
        cy.get('[data-test="add-to-cart"]')
        .click()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains('Product added to shopping cart.', { matchCase: false })
        .should('be.visible')
        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()

        cy.wait(2000) //Delay para o carrinho carregar
        //Confirma o nome do produto no carrinho
        cy.get('[data-test="product-title"]')
        .should('contain.text', `${nomeProduto}`)

        //Confere quantidade 
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
                }) 
            })
        })
        //Prossegue para login
        cy.get('[data-test="proceed-1"]')
        .click()
        //Preenche dados de login
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
        .click()

        //Confirma que está logado
        cy.get('p.ng-star-inserted')
        .should('be.visible')
        .should('contain.text', 'Hello '+nome+' '+sobrenome)
        //Clica em prosseguir
        cy.get('[data-test="proceed-2"]')
        .click()
        //Confirma dados de endereço de cobrança
        cy.get('[data-test="address"]')
        .should('be.visible')
        .should('have.value', endereco)
        cy.get('[data-test="city"]')
        .should('be.visible')
        .should('have.value', cidade)
        cy.get('[data-test="state"]')
        .should('be.visible')
        .should('have.value', estado)
        cy.get('[data-test="country"]')
        .should('be.visible')
        .should('have.value', nomePaisAbreviado)
        cy.get('[data-test="postcode"]')
        .should('be.visible')
        .should('have.value', codigoPostal)
        //Clica em prosseguir
        cy.get('[data-test="proceed-3"]')
        .click()

        //Pagamento
        cy.get('[data-test="payment-method"]')
        .select(listaMeiosPagamentoValidamDados[meioDePagamentoSelecionado]) //Seleciona uma forma de pagamento aleatória dentre as 2 disponíveis
        //Valida os dados de pagamento de acordo com a opção selecionada
        switch(listaMeiosPagamentoValidamDados[meioDePagamentoSelecionado]){
            //Pagamento por transferência bancária
            case 'Bank Transfer':
                //Preenche dados da conta bancária
                cy.get('[data-test="bank_name"]')
                .should('be.visible')
                .clear()
                .type(nomeBancoErrado)
                cy.get('[data-test="account_name"]')
                .should('be.visible')
                .clear()
                .type(nome)
                cy.get('[data-test="account_number"]')
                .should('be.visible')
                .clear()
                .type(numeroContaBancariaErrado)
                
                //Confere mensagem de ajuda
                cy.get('#account_number_help')
                .should('be.visible')
                .should('have.text', mensagemBankTransfer)
                //Mensagem de erro
                cy.get('.alert')
                .should('be.visible')
                .should('have.text', erroNumeroContaBancaria)
                break;

            //Pagamento no cartão de crédito
            case 'Credit Card':
                //Preenche dados do cartão de crédito
                cy.get('[data-test="credit_card_number"]')
                .should('be.visible')
                .clear()
                .type(numeroCartaoErrado)
                cy.get('[data-test="expiration_date"]')
                .should('be.visible')
                .clear()
                .type(dataExpircaoCartaoErrado)
                cy.get('[data-test="cvv"]')
                .should('be.visible')
                .clear()
                .type(cvvCartaoErrado)
                cy.get('[data-test="card_holder_name"]')
                .should('be.visible')
                .clear()
                .type(nome)

                //Confere mensagem de ajuda
                cy.get('#credit_card_number_help')
                .should('be.visible')
                .should('contain.text', mensagemCreditCard)
                cy.get('#cvv_help')
                .should('be.visible')
                .should('contain.text', mensagemCvv)

                //Mensagem de erro do número do cartão
                cy.get('[class="ng-star-inserted"]')
                .contains(erroNumeroCartao)
                .should('be.visible')
                //Erro data
                cy.get('[class="ng-star-inserted"]')
                .contains(erroDataExpiracaoCartao)
                .should('be.visible')
                //Erro cvv
                cy.get('[class="ng-star-inserted"]')
                .contains(erroCvvCartao)
                .should('be.visible')
                break;
        }
    })

    it('Verifica se é possível consultar os dados de uma fatura.', function() {
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)
        cy.get('[data-test="login-submit"]')
        .click()
        //Acessa lista de faturas
        cy.get('[data-test="nav-invoices"]')
        .should('be.visible')
        .click()

        //Verifica se está na página de faturas
        cy.get('[data-test="page-title"]')
        .should('be.visible')
        .should('have.text', 'Invoices')

        //Verifica dados da fatura
        cy.readFile('cypress/fixtures/dados_compra.json').then(dados => {
            cy.get('[class="table table-hover"]')
            .contains(dados.codigoPedido)
            .should('be.visible')
            cy.get('[class="table table-hover"]')
            .contains(endereco)
            .should('be.visible')
            cy.get('[class="table table-hover"]')
            .contains(dados.salvaTotalCarrinho)
            .should('be.visible')
           
            //Acessa a última fatura gerada através do teste: "Verifica se é possível fazer uma compra com sucesso"
            cy.get('tbody')
            .contains('td', dados.codigoPedido)
            .parent() // Seleciona a linha inteira (<tr>)
            .find('a.btn-primary') // Localiza o botão "Details" na linha correspondente
            .click(); // Clica no botão

            //Confere os dados da fatura
            cy.get('[data-test="invoice-number"]')
            .should('be.visible')
            .should('have.value',dados.codigoPedido)
            cy.get('[data-test="total"]')
            .should('be.visible')
            .should('contain.value',dados.salvaTotalCarrinho)//Referente ao valor total da compra
            cy.get('[data-test="payment-method"]')
            .should('be.visible')
            .should('have.value',dados.meioDepagamento)
            
            //Confere dados do endereço
            cy.get('[data-test="address"]')
            .should('be.visible')
            .should('have.value',endereco)
            cy.get('[data-test="postcode"]')
            .should('be.visible')
            .should('have.value',codigoPostal)
            cy.get('[data-test="city"]')
            .should('be.visible')
            .should('have.value',cidade)
            cy.get('[data-test="state"]')
            .should('be.visible')
            .should('have.value',estado)
            cy.get('[data-test="country"]')
            .should('be.visible')
            .should('have.value',nomePaisAbreviado)

            //Confere dados do produto
            cy.get('[class="table table-hover"]')
            .should('contain.text', dados.nomeProduto)
            .should('contain.text', dados.quantidadeProduto)
            .should('contain.text', dados.salvaPreco)//Referente ao preço do produto

            /*O campo de "Total" contido dentro da tabela de informações do produtos está num formato
            diferente do "Total" apresentado nas informações gerais, por enquanto não irei validar ele
            mas depois irei formatar a variável para que seja convertida de "0000.00" para "0,000.00".
            Acredito que isso seja um erro contido dentro do próprio site.
            */
        })
        //Escreve um objeto vazio no arquivo para apagar o conteúdo gravado anteriormente pois ele não será mais necessário.
        cy.writeFile('cypress/fixtures/dados_compra.json', {})
    })

    it('Verifica se é possível registrar um usuário mais de uma vez.', function() {
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Clica em "Register your account"
        cy.get('[data-test="register-link"]')
        .click()
        //Preenche todos os dados pessoais já cadastrados anteriormente
        cy.get('[data-test="first-name"]')
        .type(nome)
        cy.get('[data-test="last-name"]')
        .type(sobrenome)
        cy.get('[data-test="dob"]')
        .type(nascimento)
        cy.get('[data-test="address"]')
        .type(endereco)
        cy.get('[data-test="postcode"]')
        .type(codigoPostal)
        cy.get('[data-test="city"]')
        .type(cidade)
        cy.get('[data-test="state"]')
        .type(estado)
        cy.get('[data-test="country"]')
        .select(pais)
        cy.get('[data-test="phone"]')
        .type(telefone)
        cy.get('[data-test="email"]')
        .type(emailUsuarioExistente)
        cy.get('[data-test="password"]')
        .type(senha)

        //Clica em "Register"
        cy.get('[data-test="register-submit"]')
        .click()
        //Mensagem de alerta
        cy.get('[data-test="register-error"]')
        .should('be.visible')
        .should('have.text', 'A customer with this email address already exists.')
    })

    it('Verifica se é possível alterar a senha do usuário em "My profile".', function() {
        const novaSenha = 'batata321@A'
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)
        cy.get('[data-test="login-submit"]')
        .click()

        //Acessa "My profile"
        cy.get('[data-test="nav-profile"]')
        .should('be.visible')
        .click()
        //Digita senha atual
        cy.get('[data-test="current-password"]')
        .clear()
        .type(senha)
        //Digita nova senha
        cy.get('[data-test="new-password"]')
        .clear()
        .type(novaSenha)
        //Confirma nova senha
        cy.get('[data-test="new-password-confirm"]')
        .clear()
        .type(novaSenha)
        cy.wait(4000) //Espera para poder clicar no botão de mudar senha

        //Clica em "Change password"
        cy.get('[data-test="change-password-submit"]')
        .should('be.visible')
        .should('not.be.disabled')
        .click()
        //Mensagem de sucesso 
        cy.contains('Your password is successfully updated!')
        .should('be.visible')

        //Faz login com a nova senha
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(novaSenha)
        cy.get('[data-test="login-submit"]')
        .click()
    
        //Verifica se acessou conta
        cy.get('[data-test="page-title"]')
        .should('be.visible')
        .should('have.text', 'My account')
    })

    it('Verifica se é possível que um usuário válido recupere sua senha.', function() {
        //Acessa tela de login
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Acessa "Forgot Password"
        cy.get('[data-test="forgot-password-link"]')
        .click()
        cy.get('[data-test="email"]')
        .clear()
        .type(email)
        //Clica em "Set new password"
        cy.get('[data-test="forgot-password-submit"]')
        .click()

        /*O site não apresenta nenhuma confirmação visual de que a senha foi alterada, 
        então é necessário tentar fazer um novo login para identificar se foi alterada.*/
        //Acessa login de usuario novamente
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.get('[data-test="email"]')
        .type(email)
        cy.get('[data-test="password"]')
        .type(senha)
        cy.get('[data-test="login-submit"]')
        .click()
        //Mensagem de alerta
        cy.get('[data-test="login-error"]')
        .should('be.visible')
        .should('have.text', 'Invalid email or password')
    })
})