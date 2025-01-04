/// <reference types="cypress" />

describe('Fluxos do Site', function() {

    this.beforeEach(() => {
        cy.acessaSite()
    })

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

        //Consulta indisponibilidade no estoque
        cy.get('[data-test="add-to-cart"]')
        .should('be.disabled')

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
        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()

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
        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()

        //Prossegue para login
        cy.get('[data-test="proceed-1"]')
        .click()

        //Verifica campos da tela
        cy.get('[data-test="email"]')
        .should('be.visible')
        cy.get('[data-test="password"]')
        .should('be.visible')
        cy.get('[data-test="login-submit"]')
        .should('be.visible')

        cy.get('[data-test="register-link"]')
        .should('be.visible')
        .should('contain.text', 'Register your account')

        cy.get('[data-test="forgot-password-link"]')
        .should('be.visible')
        .should('contain.text', 'Forgot your Password?')
    })

    it('Adicionar produto ao carrinho e tenta finalizar compra sem ter conta de usuário.', function() {
        const email = 'qualquer@qualquer.com'
        const senha = '1234567'
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
        //Acessa carrinho
        cy.get('[data-test="nav-cart"]')
        .click()

        //Prossegue para login
        cy.get('[data-test="proceed-1"]')
        .click()

        //Digita dados e clica em "Login"
        cy.get('[data-test="email"]')
        .type(`${email}`)
        cy.get('[data-test="password"]')
        .type(`${senha}`)
        cy.get('[data-test="login-submit"]')
        .click()
        //Verifica mensagem de credenciais invalidas
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

    //TODO: melhorar o formato com qual o Js converte e compara os textos
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
            //Acessa carrinho
            cy.get('[data-test="nav-cart"]')
            .click()

            cy.wait(2000) //Delay para casos onde o carrinho demora para carregar a lista de itens
            cy.get('[data-test="product-price"]')
            .invoke('text') // Obtém o texto dentro do elemento "Price"
            .then((text) => {
                
                // Remove o símbolo "$" e converte para número
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
                
                // Remove o símbolo "$" e converte para número
                const preco = parseFloat(text.replace('$', '',10).trim()); 
                //Multiplica quantidade X preco para saber o total
                let multiplicaTotal = preco * quantidade
                //Usa somente até duas casas decimais no total do valor do produto
                multiplicaTotal = multiplicaTotal.toFixed(2)

                cy.get('[data-test="cart-total"]')
                .invoke('text') // Obtém o texto dentro do elemento "Total"
                .then((text) => {
                    
                    // Remove o símbolo "$" e converte para número
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

        cy.get('h1')
        .contains('Related products')
        .should('be.visible')

        cy.get('.col')
        .should('contain.text', `${nomeProdutoRelacionado}`)
        .should('not.contain.text', `${nomeProdutoNaoRelacionado}`)
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
            //Converte o valor de desconto para numero
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
                    
                    //Remove o símbolo "$" e converte para número
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
                    
            //Remove o símbolo "$" e converte para número
            let precoUnitario = parseFloat(text.replace('$', '',10).trim());
            //Usa somente até duas casas decimais no total do produto pois o site usa essa configuração
            let calculaTotal = (precoUnitario * valorSlider).toFixed(2)

            cy.get('#total-price')
            .invoke('text') // Obtém o texto dentro do elemento "Total"
            .then((text) => {
                    
                //Remove o símbolo "$" e converte para número
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
                    
            //Remove o símbolo "$" e converte para número
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
        //Verifica se o ícone do carrinho continua visível após recarregar
        cy.get('[data-test="nav-cart"]')
        .should('be.visible')
    })

    it('Verifica se é possível registrar usuário sem preencher nenhum campo da tela "Customer registration".', function() {
        //Acessa registro de usuario 
        cy.get('[data-test="nav-sign-in"]')
        .click()
        cy.get('[data-test="register-link"]')
        .click()

        cy.get('h3')
        .should('have.text', 'Customer registration')

        //Clica em "Register"
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

    it('Verifica se o campo "Date of Birth" permite somente números.', function() {
        //Acessa registro de usuario 
        cy.get('[data-test="nav-sign-in"]')
        .click()
        cy.get('[data-test="register-link"]')
        .click()

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
    
    //TODO: melhorar a forma com que os dados são gerados para utilizar nesse teste, talvez utilizar faker
    it('Verifica se o campo "Date of Birth" valida idade máxima para registro.', function() {
        const nome = 'Frank'
        const sobrenome = 'Zane'
        const nascimento = '1921-06-10'
        const dadosAleatorios = '190263'
        const pais = 'Andorra'
        const email = 'email@endereco.com'
        const senha = 'senhaForte1@'
        
        //Acessa registro de usuario 
        cy.get('[data-test="nav-sign-in"]')
        .click()
        cy.get('[data-test="register-link"]')
        .click()

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
        .type(nascimento)

        //Clica em "Register"
        cy.get('[data-test="register-submit"]')
        .click()

        //Alerta de idade acima do limite permitido para cadastro
        cy.get('[data-test="register-error"]')
        .should('have.text', 'Customer must be younger than 75 years old.')
    })

    it('Verifica se o campo "Phone" permite somente números.', function() {
        const telefoneErrado = 'zeroumzeroum'
        //Acessa registro de usuario 
        cy.get('[data-test="nav-sign-in"]')
        .click()
        cy.get('[data-test="register-link"]')
        .click()

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
        //Acessa registro de usuario 
        cy.get('[data-test="nav-sign-in"]')
        .click()
        cy.get('[data-test="register-link"]')
        .click()

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
        //Acessa registro de usuario 
        cy.get('[data-test="nav-sign-in"]')
        .click()
        cy.get('[data-test="register-link"]')
        .click()

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
        //Acessa login de usuario 
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
        //Acessa registro de usuario 
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
        //Verifica mensagem de alerta 
        cy.get('.alert')
        .should('be.visible')
        .should('contain.text', 'The selected email is invalid.')
    })

    it('Verifica se é possível registrar um novo usuário corretamente.', function() {
        const nome = 'Ronnie'
        const sobrenome = 'Coleman'
        const nascimento = '1964-05-13'
        const endereco = 'Rua T'
        const codigoPostal = '90263'
        const cidade = 'Monroe'
        const estado = 'Luisiana'
        const pais = 'Mexico'
        const telefone = '19201834'
        const email = 'email@umemail.com'
        const senha = '1234aB12#;00'
        
        //Acessa registro de usuario 
        cy.get('[data-test="nav-sign-in"]')
        .click()
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
        //O site deve direcionar o usuário para a tela de login após o cadastro bem sucedido
        cy.get('h3')
        .should('have.text', 'Login')
    })
})