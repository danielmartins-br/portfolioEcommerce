/// <reference types="cypress" />

describe('Fluxos do Site', function() {

    this.beforeEach(() => {
        cy.acessaSite()
    })

    //Dados para criação de um novo usuário
    const dadosPessoaisCadastro = {
        nome:'Ronnie',
        sobrenome: 'Coleman',
        nascimento: '1964-05-13',
        endereco: 'Rua T',
        codigoPostal: '90263',
        cidade: 'Monroe',
        estado: 'Luisiana',
        pais: 'Mexico',
        nomePaisAbreviado: 'MX',
        telefone: '19201834',
        email: 'email@doommail.com',
        senha: '1234aB12#;00'
    }

    //Dados de usuário existente já cadastrado no site
    //Obs: esses dados são publicos no repositório do Github do projeto
    const emailUsuarioExistente = 'customer@practicesoftwaretesting.com'
    const senhaUsuarioExistente = 'welcome01'
    const enderecoUsuarioExistente = 'Test street 19'
    const codigoPostalUsuarioExistente = '1122AB'
    const cidadeUsuarioExistente = 'Utrecht'
    const estadoUsuarioExistente = 'Utrecht'
    const paisUsuarioExistente = 'The Netherlands'

    it('Adiciona produto no carrinho', function() {
        const nomeProduto = 'Thor Hammer'
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        cy.abreDetalhesDoProduto(nomeProduto)
        //Adiciona produto ao carrinho
        cy.adicionaProdutoNoCarrinho()
    })

    it('Remove produto do carrinho.', function() {
        const nomeProduto = 'Bolt Cutters'
        
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Adiciona produto ao carrinho
        cy.abreDetalhesDoProduto(nomeProduto)
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()
        //Certifica que o carrinho não está vazio
        cy.get('[data-test="product-title"]')
        .should('not.be.empty')
        //Remove do carrinho
        cy.removeProdutoDoCarrinho()
        //Certifica que o carrinho está vazio
        cy.get('[data-test="product-title"]')
        .should('not.exist')
    })

    it('Adiciona produto fora de estoque ao carrinho.', function() {
        const nomeProduto = 'Long Nose Pliers'
        const mensagemForaEstoque = 'Out of stock'
        
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Clica no produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Valida botão do carrinho desativado
        cy.get('[data-test="add-to-cart"]')
        .should('be.disabled')
        //Mensagem informando que está fora de estoque
        cy.get('[data-test="out-of-stock"]')
        .should('be.visible')
        .should('contain.text', mensagemForaEstoque)
    })

    it('Adiciona o mesmo produto várias vezes no carrinho.', function() {
        const nomeProduto = 'Court Hammer'
        
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Clica no produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Aumenta quantidade do produto para 3
        cy.get('[data-test="increase-quantity"]')
        .dblclick()
        //Adiciona produto ao carrinho
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()

        //Confere quantidade 
        cy.get('[data-test="product-quantity"]')
        .invoke('val') // Obtém o valor do atributo 'Quantity'
        .then((text) => {
            const quantidade = parseInt(text, 10); //Converte o valor de 'Quantity' para número
            expect(quantidade).to.be.greaterThan(1); //Compara o valor de 'Quantity' para saber se o número de produtos no carrinho é maior que 1
        })
    })

    it('Adiciona "Thor Hammer" ao carrinho.', function() {
        /*Esse produto em específico só pode ser adicionado 1 peça no carrinho, este teste valida isso.*/
        const nomeProduto = 'Thor Hammer'
        const mensagemAlerta = 'You can only have one Thor Hammer in the cart.'
        
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        cy.abreDetalhesDoProduto(nomeProduto)
        cy.adicionaProdutoNoCarrinho()
        //Tenta adicionar novamente ao carrinho
        cy.adicionaProdutoNoCarrinho()
        //Mensagem de insucesso
        cy.get('.toast-message')
        .contains(mensagemAlerta, { matchCase: false })
        .should('be.visible')
    })

    it('Verifica se o site permite adicionar 0 produtos ao carrinho.', function() {
        const nomeProduto = 'Sledgehammer'
        
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Clica no produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Clica no botão "-" e tenta diminuir a quantidade do produto para 0
        cy.get('[data-test="decrease-quantity"]')
        .dblclick()

        //Verifica se a quantidade ainda continua igual a 1
        cy.get('[data-test="quantity"]')
        .invoke('val') // Obtém o valor do atributo 'Quantity'
        .then((text) => {
            const quantidade = parseInt(text, 10); //Converte o valor de 'Quantity' para número
            expect(quantidade).to.be.greaterThan(0); //Compara o valor de 'Quantity' para saber se a quantidade do produto é maior que 0
        })
    })

    it('Verifica se o nome do produto é o mesmo dentro do carrinho.', function() {
        const nomeProduto = 'Circular Saw'
        
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        cy.abreDetalhesDoProduto(nomeProduto)
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()
        //Valida nome do produto
        cy.get('[data-test="product-title"]')
        .should('contain.text', `${nomeProduto}`)
    })

    it('Adiciona produto aos favoritos sem ter conta de usuário.', function() {
        const nomeProduto = 'Safety Goggles'
        const mensagemAlerta = 'Unauthorized, can not add product to your favorite list.'
        
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Tenta adicionar aos favoritos
        cy.adicionaFavorito()
        //Mensagem de insucesso
        cy.get('.toast-message')
        .contains(mensagemAlerta, { matchCase: false })
        .should('be.visible')
    })

    it('Verifica se a página de "Login" é exibida no carrinho corretamente.', function() {
        const nomeProduto = 'Wood Saw'
        const listaSeletoresTelaLogin = ['[data-test="email"]','[data-test="password"]','[data-test="login-submit"]',
            '[data-test="register-link"]','[data-test="forgot-password-link"]'
        ]

        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Adiciona produto ao carrinho
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()
        //Prossegue para login
        cy.get('[data-test="proceed-1"]')
        .click()

        listaSeletoresTelaLogin.forEach((seletor) => {
            cy.get(seletor)
            .should('be.visible')
        })
    })

    it('Adicionar produto ao carrinho e tenta finalizar compra sem ter conta de usuário.', function() {
        const emailInexistente = 'qualquer@qualquer.com'
        const senhaInexistente = '1234567'
        const nomeProduto = 'Ear Protection'
        const credenciaisInvalidas = 'Invalid email or password'

        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Adiciona produto ao carrinho
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()
        //Prossegue para login
        cy.get('[data-test="proceed-1"]')
        .click()
        //Digita dados e clica em "Login"
        cy.fazLogin(emailInexistente,senhaInexistente)
        //Mensagem de credenciais invalidas
        cy.get('[data-test="login-error"]')
        .should('be.visible')
        .should('have.text', credenciaisInvalidas)
    })

    it('Altera quantidade de produtos dentro do carrinho.', function() {
        const nomeProduto = 'Drawer Tool Cabinet'
        const quantidadeItens = 4
        const mensagemQuantidadeAtualizada = 'Product quantity updated.'

        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Adiciona produto ao carrinho
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()
        //Altera quantidade de itens
        cy.get('[data-test="product-quantity"]')
        .clear()
        .type(quantidadeItens)
        .blur()
        //Confirma mensagem de sucesso
        cy.get('.toast-message')
        .contains(mensagemQuantidadeAtualizada, { matchCase: false })
        .should('be.visible')

        //Confirma alteração do número
        cy.get('[data-test="product-quantity"]')
        .invoke('val')
        .should('eq', quantidadeItens.toString());
    })

    it('Verifica se o preço do produto é o mesmo dentro do carrinho.', function() {
        const nomeProduto = 'Wood Carving Chisels'
        
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)

        cy.get('[data-test="unit-price"]')
        .invoke('text') //Obtem texto referente ao preço do produto
        .then((text) => {
            const valorProduto = parseFloat(text, 10); //Converte o valor do produto de string para número flutuante
            
            //Adiciona produto ao carrinho
            cy.adicionaProdutoNoCarrinho()
            //Acessa carrinho
            cy.acessaCarrinho()

            cy.wait(2000) //Delay para casos onde o carrinho demora para carregar a lista de itens
            cy.get('[data-test="product-price"]')
            .invoke('text') // Obtém o texto dentro do elemento "Price"
            .then((text) => {
                
                //Remove o símbolo "$" e converte o texto do preço para número
                const valorCarrinho = (text.replace('$', '',10).trim()); 
                //Verifica se o preço está correto comparando o valor da página com preço do carrinho
                expect(Number(`${valorCarrinho}`)).to.be.equal(Number(`${valorProduto}`));   
            })
        })
    })

    //TODO: melhorar o formato com que o total do carrinho e calculado
    it('Verifica se o valor total do produto está correto.', function() {
        const nomeProduto = 'Cordless Drill 20V'
        
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Aumenta quantidade do produto
        cy.get('[data-test="increase-quantity"]')
        .dblclick().dblclick().dblclick()
        //Adiciona produto ao carrinho
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()

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
        const relacionados = 'Related products'

        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Verifica se listou produtos relacionados
        cy.get('h1')
        .contains(relacionados)
        .should('be.visible')
        //Verifica se produtos da mesma categoria "Hammer" são listados
        cy.get('.col')
        .should('contain.text', nomeProdutoRelacionado)
        .should('not.contain.text', nomeProdutoNaoRelacionado) //Verifica se produtos de outras categorias "Pliers" não são listados
    })

    it('Verifica se é possível acessar um produto novo através dos seus relacionados.', function() {
        const nomeProduto = 'Mini Screwdriver'
        const nomeNovoProduto = 'Phillips Screwdriver'
        
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Clica em "More information"
        cy.get('.card-body')
        .contains('More information')
        .click()
        //Valida nome do novo produto
        cy.get('[data-test="product-name"]')
        .should('have.text', nomeNovoProduto)
    })

    it('Verifica desconto no carrinho.', function() {
        const nomeProdutoComDesconto = 'Bulldozer'
        const nomeProdutoComum = 'Cordless Drill 18V'
        
        //Pesquisa produto
        cy.pesquisaItem(nomeProdutoComum)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProdutoComum)
        //Adiciona produto ao carrinho
        cy.adicionaProdutoNoCarrinho()
        //Acessa Home
        cy.acessaHome()
        //Pesquisa segundo produto
        cy.pesquisaItem(nomeProdutoComDesconto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProdutoComDesconto)
        //Adiciona produto ao carrinho
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()

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
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
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
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
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
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
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
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Adiciona produto ao carrinho
        cy.adicionaProdutoNoCarrinho()
        //Recarrega o site e vai para a "Home"
        cy.reload()
        cy.acessaHome()
        //Acessa o carrinho e verifica se o item ainda está nele
        cy.acessaCarrinho()
        cy.contains(nomeProduto)
        .should('be.visible')
    })

    //TODO: melhorar a validacao das mensagens de erro, essa lista pode ser transformada num objeto contendo todos os dados
    it('Verifica se é possível registrar usuário sem preencher nenhum campo da tela "Customer registration".', function() {
        const listaSeletoresTelaDeCadastro = ['[data-test="first-name-error"]','[data-test="last-name-error"]',
            '[data-test="dob-error"]','[data-test="address-error"]','[data-test="postcode-error"]','[data-test="city-error"]',
            '[data-test="state-error"]','[data-test="country-error"]','[data-test="phone-error"]','[data-test="email-error"]',
            '[data-test="password-error"]'
        ]
        const listaDeErros = ['First name is required','fields.last-name.required','Date of Birth is required',
            'Address is required','Postcode is required','City is required','State is required', 'Country is required',
            'Phone is required.','Email is required', 'Password is required', 'Password must be minimal 6 characters long.',
            'Password can not include invalid characters.'
        ]
        
        //Acessa login de usuario 
        cy.acessaPaginaDeLogin()
        cy.acessaPaginaDeRegistroDeUsuario()
        //Clica em "Register" sem preencher nenhuma informação
        cy.get('[data-test="register-submit"]')
        .click()
        //Lista de campos obrigatórios
        listaSeletoresTelaDeCadastro.forEach((seletor) => {
            cy.get(seletor)
            .should('be.visible')
        })  
        listaDeErros.forEach((erro) => {
            cy.contains(erro)
            .should('be.visible')
        })
    })

    it('Verifica se o campo "Date of Birth" permite somente números.', function() {
        const campoDataNascimento = '[data-test="dob"]'

        //Acessa login de usuario 
        cy.acessaPaginaDeLogin()
        //Confirma que está na tela de registro
        cy.acessaPaginaDeRegistroDeUsuario()
        //Digitar letras no campo de data faz com que um erro seja resultado
        cy.get(campoDataNascimento)
        .invoke('val', 'bbbb-bb-bb') // Define um valor inválido
        .trigger('change') // Dispara o evento de mudança
        .should('not.have.value', 'bbbb-bb-bb')
        .and('have.value', '') // O campo deve estar vazio após entrada inválida
    })
    
    it('Verifica se o campo "Date of Birth" valida idade máxima para registro.', function() {
        const nascimentoAcimaDoPermitido = '1921-06-10'
        const mensagemIdadeInvalida = 'Customer must be younger than 75 years old.'
        
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Acessa registro de usuário
        cy.acessaPaginaDeRegistroDeUsuario()
        //Digita dados de usuário
        cy.preencheDadosDeCadastroDoUsuario(dadosPessoaisCadastro)
        //Digita idade acima de 75 anos
        cy.get('[data-test="dob"]')
        .clear()
        .type(nascimentoAcimaDoPermitido)
        .blur()
        //Clica em "Register"
        cy.clicaBotaoRegistrar()

        //Confere o alerta de idade acima do limite permitido para cadastro
        cy.get('[data-test="register-error"]')
        .should('contain.text', mensagemIdadeInvalida)
    })

    it('Verifica se o campo "Phone" permite somente números.', function() {
        const telefoneErrado = 'zeroumzeroum'
        const mensagemErroTelefone = ' Only numbers are allowed. '
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Confirma que está na tela de registro
        cy.acessaPaginaDeRegistroDeUsuario()
       
        //Digita letras no campo "phone"
        cy.get('[data-test="phone"]')
        .type(telefoneErrado)
        .blur()
        //Clica em "Register"
        cy.clicaBotaoRegistrar()
        //Verifica mensagem de alerta sobre o campo preenchido erroneamente
        cy.get('[data-test="phone-error"]')
        .should('be.visible')
        .should('have.text', mensagemErroTelefone, { matchCase: false })
    })

    it('Verifica se o campo "Password" permite somente caracteres válidos.', function() {
        const senhaFraca = 'abcd'
        const mensagemTamanhoSenha = 'Password must be minimal 6 characters long.'
        const mensagemCaracterInvalidoSenha = 'Password can not include invalid characters. '
        
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Confirma que está na tela de registro
        cy.acessaPaginaDeRegistroDeUsuario()
        //Digita senha no campo "Password"
        cy.get('[data-test="password"]')
        .type(senhaFraca)
        //Clica em "Register"
        cy.clicaBotaoRegistrar()
        //Mensagem de alerta sobre a senha fraca
        cy.get('[data-test="password-error"]')
        .should('contain.text', mensagemTamanhoSenha, { matchCase: false })
        .should('contain.text', mensagemCaracterInvalidoSenha, { matchCase: false })
    })

    it('Verifica nível de segurança da senha.', function() {
        const senhaForte = '1234aB12#;00'
        const listaNivelSegurancaSenha = ['Excellent','Weak','Moderate','Strong','Very Strong']
        const nivelSegurancaMaximo = 'Excellent'

        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Confirma que está na tela de registro
        cy.acessaPaginaDeRegistroDeUsuario()
        //Digita senha no campo "Password"
        cy.get('[data-test="password"]')
        .type(senhaForte)
        //Verifica se a senha tem segurança excelente
        listaNivelSegurancaSenha.forEach((nivel) => {
            if(nivel == nivelSegurancaMaximo){
                cy.get('[class="active"]')
                .should('have.text', nivel)
            }
            else{
                cy.get('[class="active"]')
                .should('not.have.text', nivel)
            }
        })
    })

    it('Verifica se é possível fazer login com usuário inválido.', function() {
        const usuarioInvalido = 'abcd@email.com'
        const senhaInvalida = 'dcba'
        const mensagemErroLogin = 'Invalid email or password'
       
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(usuarioInvalido,senhaInvalida)
        //Mensagem de erro do login
        cy.get('[data-test="login-error"]')
        .should('be.visible')
        .should('have.text', mensagemErroLogin)
    })

    it('Verifica se é possível recuperar senha de um usuário inválido.', function() {
        const emailInvalido = 'abcd@email.com'
        const mensagemEmailInvalido = 'The selected email is invalid.'
        
        //Acessa tela de login 
        cy.acessaPaginaDeLogin()
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
        .should('contain.text', mensagemEmailInvalido)
    })

    it('Verifica se é possível registrar um novo usuário corretamente.', function() {
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Clica em registrar novo usuário
        cy.acessaPaginaDeRegistroDeUsuario()
        //Preenche todos os dados pessoais
        cy.preencheDadosDeCadastroDoUsuario(dadosPessoaisCadastro)
        //Clica em "Register"
        cy.clicaBotaoRegistrar()
        //O site deve redirecionar o usuário para a tela de login após o cadastro bem sucedido
        cy.get('h3')
        .should('have.text', 'Login')
    })

    it('Verifica se é possível fazer login corretamente com usuário válido.', function() {
        const tituloPagina = 'My account'
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Verifica se acessou conta
        cy.verificaTituloPagina(tituloPagina)
    })

    it('Verifica se o nome do usuário é apresentado corretamente na tela incial.', function() {
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        cy.wait(2000) //Delay para fazer login
        //Acessa Home
        cy.acessaHome()
        //Confere nome
        cy.get('[data-test="nav-menu"]')
        .should('be.visible')
        .should('contain.text', dadosPessoaisCadastro.nome+' '+dadosPessoaisCadastro.sobrenome)
    })

    it('Verifica se a lista de funcionalidades da conta é apresentada corretamente.', function() {
        const mensagemInformativa = 'Here you can manage your profile, favorites and orders.'
        const listaSeletoresPerfil = {
            '[data-test="nav-favorites"]':  'Favorites',
            '[data-test="nav-profile"]':  'Profile',
            '[data-test="nav-invoices"]':  'Invoices',
            '[data-test="nav-messages"]':  'Messages'
        }

        //Acessa tela de login 
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Texto referente as funções de gerenciamento da conta
        cy.contains(mensagemInformativa)
        .should('be.visible')
        
        //Verifica lista de atalhos de funcionalidade
        Object.entries(listaSeletoresPerfil).forEach(([seletor,valor]) => {
            cy.get(seletor)
            .should('be.visible')
            //Verifica o texto do atalho
            .should('contain.text', valor)
        })
    })

    it('Verifica se um item favoritado é acessível através de "My favorites".', function() {
        const nomeProduto = 'Safety Goggles'
        const mensagemSucessoFavorito = 'Product added to your favorites list.'
        const tituloPagina = 'Favorites'
        
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        cy.wait(2000) //Delay para fazer login
        //Acessa Home
        cy.acessaHome()
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Adiciona aos favoritos
        cy.adicionaFavorito()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains(mensagemSucessoFavorito, { matchCase: false })
        .should('be.visible')
        //Acessa lista de favoritos
        cy.acessaMenuPerfilUsuario()
        cy.acessaMyFavorites()
        //Confirma que está na tela de favoritos
        cy.verificaTituloPagina(tituloPagina)
        //Confirma nome do produto favoritado
        cy.verificaSeContemProduto([nomeProduto],[])
    })

    it('Verifica se um item favoritado é duplicável.', function() {
        const nomeProduto = 'Ear Protection'
        const mensagemSucessoFavorito = 'Product added to your favorites list.'
        const mensagemFavoritoExistente = 'Product already in your favorites list.'
        
        //Acessa tela de login 
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        cy.wait(2000) //Delay para fazer login
        //Acessa Home
        cy.acessaHome()

        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Adiciona aos favoritos
        cy.adicionaFavorito()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains(mensagemSucessoFavorito, { matchCase: false })
        .should('be.visible')
        cy.wait(5000) //Espera mensagem de sucesso desaparecer

        //Adiciona o produto novamente
        cy.adicionaFavorito()
        //Confere mensagem informando que o item já está favoritado
        cy.get('.toast-message')
        .should('be.visible')
        .should('contain.text', mensagemFavoritoExistente)
        
    })

    it('Verifica se um item favoritado é removível através de "My favorites".', function() {
        const nomeProduto = 'Protective Gloves'
        const mensagemSucessoFavorito = 'Product added to your favorites list.'
        const tituloPagina = 'Favorites'
        const mensagemFavoritosVazio = 'There are no favorites yet. In order to add favorites, please go to the product listing and mark some products as your favorite.'

        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        cy.wait(2000) //Delay para fazer login
        //Acessa Home
        cy.acessaHome()
        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Adiciona aos favoritos
        cy.adicionaFavorito()
        //Mensagem de sucesso
        cy.get('.toast-message')
        .contains(mensagemSucessoFavorito, { matchCase: false })
        .should('be.visible')
        
        //Acessa lista de favoritos
        cy.acessaMenuPerfilUsuario()
        cy.acessaMyFavorites()
        //Confirma que está na tela de favoritos
        cy.verificaTituloPagina(tituloPagina)

        //Confirma nome do produto
        cy.verificaSeContemProduto([nomeProduto],[])
        //Remove produto
        cy.get('[data-test="delete"]')
        .click({multiple:true})
        //Confirma que o produto foi removido
        cy.get('.col > .ng-star-inserted')
        .should('be.visible')
        .should('contain.text', mensagemFavoritosVazio)
    })

    it('Verifica dados apresentados em "My profile".', function() {
        const listaSeletoresDadosPessoais = {
            '[data-test="first-name"]': dadosPessoaisCadastro.nome,
            '[data-test="last-name"]': dadosPessoaisCadastro.sobrenome,
            '[data-test="email"]': dadosPessoaisCadastro.email,
            '[data-test="phone"]': dadosPessoaisCadastro.telefone,
            '[data-test="address"]': dadosPessoaisCadastro.endereco,
            '[data-test="postcode"]': dadosPessoaisCadastro.codigoPostal,
            '[data-test="city"]': dadosPessoaisCadastro.cidade,
            '[data-test="state"]': dadosPessoaisCadastro.estado,
            '[data-test="country"]': dadosPessoaisCadastro.nomePaisAbreviado
        }

        //Acessa tela de login 
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        cy.acessaMenuPerfilUsuario()
        //Acessa dados do perfil
        cy.acessaMyProfile()
        //Verifica lista de dados pessoais
        Object.entries(listaSeletoresDadosPessoais).forEach(([seletor,valor]) => {
            cy.get(seletor)
            .should('be.visible')
            .should('have.value', valor)
        })
    })

    it('Verifica se é possível alterar os dados apresentados em "My profile".', function() {
        const novoNome = 'Goku'
        const mensagemPerfilAlteradoSucesso = 'Your profile is successfully updated!'

        //Acessa tela de login 
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Acessa dados do perfil
        cy.acessaMenuPerfilUsuario()
        cy.acessaMyProfile()

        //Verifica nome
        cy.get('[data-test="first-name"]')
        .should('be.visible')
        .should('have.value', dadosPessoaisCadastro.nome)
        //Altera nome e salva
        cy.alteraPrimeiroNomeUsuario(novoNome)
        cy.get('[data-test="update-profile-submit"]')
        .click()
        
        //Confirma alteração
        cy.get('.alert')
        .should('be.visible')
        .should('have.text', mensagemPerfilAlteradoSucesso)
        //Verifica novo nome
        cy.get('[data-test="first-name"]')
        .should('be.visible')
        .should('have.value', novoNome)

        //Altera o novo nome para o nome anterior e salva
        cy.alteraPrimeiroNomeUsuario(dadosPessoaisCadastro.nome)
        cy.get('[data-test="update-profile-submit"]')
        .click()
        cy.wait(4000)
        //Confirma alteração
        cy.get('.alert')
        .should('be.visible')
        .should('have.text', mensagemPerfilAlteradoSucesso)
        cy.get('[data-test="first-name"]')
        .should('be.visible')
        .should('have.value', dadosPessoaisCadastro.nome)
    })

    it('Verifica se o site impede o usuário de alterar a senha para a senha atual.', function() {
        const seletorSenha = ['[data-test="current-password"]','[data-test="new-password"]',
        '[data-test="new-password-confirm"]']
        const mensagemAlertaSenha = ' New Password cannot be same as your current password. '
        
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Acessa dados do perfil
        cy.acessaMenuPerfilUsuario()
        cy.acessaMyProfile()
        //Digita a mesma senha em todos os campos
        seletorSenha.forEach((seletor) => {
            cy.get(seletor)
            .type(dadosPessoaisCadastro.senha)
        })
        
        cy.wait(2000) //Delay para apertar o botão de mudar senha
        //Clica em salvar alteração
        cy.get('[data-test="change-password-submit"]')
        .dblclick()
        .blur()
        //Confirma que a senha não pode ser alterada
        cy.get('.alert')
        .should('be.visible')
        .should('have.text', mensagemAlertaSenha)
    })

    it('Verifica se é possível fazer o envio de contato através de "Contact".', function() {
        const motivoContato = 'Payments'
        const mensagemContato = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris viverra felis nec pellentesque feugiat. 
        Donec faucibus arcu maximus, convallis nisl eu, placerat dolor. 
        Morbi finibus neque nec tincidunt pharetra.`
        const mensagemSucessoContato = ' Thanks for your message! We will contact you shortly. '
        
        //Acessa "Contact"
        cy.acessaPaginaContato()
        cy.preencheFormularioContato({nome: dadosPessoaisCadastro.nome, sobrenome: dadosPessoaisCadastro.sobrenome, 
            email: dadosPessoaisCadastro.email},motivoContato,mensagemContato)
        //Envia contato
        cy.enviaContato()
        //Confere mensagem de sucesso
        cy.get('.alert')
        .should('be.visible')
        .should('have.text', mensagemSucessoContato)
    })

    it('Verifica se é possível fazer o envio de contato com dados inválidos através de "Contact".', function() {
        const listaErrosContato = {
            '[data-test="first-name-error"]': 'First name is required',
            '[data-test="last-name-error"]': 'Last name is required',
            '[data-test="email-error"]': 'Email is required',
            '[data-test="subject-error"]': 'Subject is required',
            '[data-test="message-error"]': 'Message is required'
        }

        //Acessa "Contact"
        cy.acessaPaginaContato()
        //Clica em enviar contato sem preencher nenhum campo
        cy.enviaContato()
        //Valida lista de erros retornados para campos obrigatórios
        Object.entries(listaErrosContato).forEach(([seletor,mensagem]) => {
            cy.get(seletor)
            .should('be.visible')
            .should('contain.text', mensagem)
        })
    })

    it('Verifica se é possível fazer o envio de contato preenchendo o campo "Message" de maneira errada.', function() {
        let motivoContato = 'Webmaster'
        let mensagemContato = `Lorem ipsum dolor sit amet`
        const mensagemErro = 'Message must be minimal 50 characters'
        
        //Acessa "Contact"
        cy.acessaPaginaContato()
        //Preenche todos os dados de contato e o o campo "Message" com um texto menor que o mínimo permitido
        cy.preencheFormularioContato({nome: dadosPessoaisCadastro.nome, sobrenome: dadosPessoaisCadastro.sobrenome, 
        email: dadosPessoaisCadastro.email},motivoContato,mensagemContato)
        //Clica em enviar contato
        cy.enviaContato()
        //Confirma mensagem de erro
        cy.get('[data-test="message-error"]')
        .should('be.visible')
        .should('have.text', mensagemErro)
    })

    it('Verifica se é possível consultar a tela "My invoices".', function() {
        const listaCamposInvoices = ['Invoice Number','Billing Address','Invoice Date','Total']
        const tituloPagina = 'Invoices'
        
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Acessa lista de faturas
        cy.acessaMenuPerfilUsuario()
        cy.acessaMyInvoices()
        //Verifica se o titulo da página de fatura está correto
        cy.verificaTituloPagina(tituloPagina)
        //Verifica se todos os campos da tela são exibidos
        listaCamposInvoices.forEach((campo) => {
            cy.get('[scope="col"]')
            .contains(campo)
            .should('be.visible')
        })
    })

    it('Verifica se é possível consultar a tela "My messages".', function() {
        const tituloPagina = 'Messages'
        const mensagemAlerta = 'There are no messages yet. Navigate to the contact form and fill out the form.'

        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Acessa mensagens
        cy.acessaMenuPerfilUsuario()
        cy.acessaMyMessages()
        //Confere título da página
        cy.verificaTituloPagina(tituloPagina)
        //Confirma que não existem mensagens ainda
        cy.get('div')
        .contains(mensagemAlerta)
        .should('be.visible')
    })

    it('Verifica se é possível fazer logout do site.', function() {
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        cy.wait(2000)//Delay para finalizar login
        //Acessa Home
        cy.acessaHome()
        //Faz logout
        cy.acessaMenuPerfilUsuario()
        cy.fazLogout()
        //Confirma que o usuário saiu da conta
        cy.get('[data-test="nav-sign-in"]')
        .should('be.visible')
    })

    it('Verifica se é possível fazer uma compra com sucesso utilizando transferência bancária', function() {
        const nomeProduto = 'Wooden Workbench'
        const quantidadeProduto = 6
        
        //Dados bancarios
        const meioDePagamento = 'Bank Transfer'
        const nomeBanco = 'Apu'
        const numeroContaBancaria = '9993221'
        const mensagemBankTransfer = `Please enter your bank account number as it appears on your bank statement. It's a unique series of numbers used to identify your individual account. Avoid including any spaces or hyphens.`
        
        const listaSeletoresContaBancaria = {'[data-test="bank_name"]': nomeBanco,
            '[data-test="account_name"]': dadosPessoaisCadastro.nome,
            '[data-test="account_number"]': numeroContaBancaria
        }

        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Aumenta a quantidade do produto antes de adicionar ao carrinho
        cy.ajustaQuantidadeProduto(quantidadeProduto)
        //Adiciona ao carrinho 
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()
        cy.wait(2000) //Delay para o carrinho carregar
        //Confirma o nome do produto no carrinho
        cy.confirmaNomeProduto(nomeProduto)
        //Verifica se o valor total do carrinho está correto
        cy.calculaTotalCarrinho(quantidadeProduto)
        //Prossegue para login
        cy.clicaBotaoProceedCheckout(1)

        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Confirma que está logado
        cy.confereMensagemLogin()
        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(2)
        //Confirma dados de endereço de cobrança
        cy.validaDadosDeCobranca({endereco: dadosPessoaisCadastro.endereco,cidade: dadosPessoaisCadastro.cidade,
            estado: dadosPessoaisCadastro.estado,nomePaisAbreviado: dadosPessoaisCadastro.nomePaisAbreviado,
            codigoPostal: dadosPessoaisCadastro.codigoPostal
        })

        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(3)
        //Seleciona meio de pagamento
        cy.selecionaMeioDePagamento(meioDePagamento)
        //Preenche dados bancários
        Object.entries(listaSeletoresContaBancaria).forEach(([seletor,dado]) => {
            cy.get(seletor)
            .clear()
            .type(dado)
        })
        
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
    })

    it(`Verifica se é possível fazer uma compra com sucesso utilizando 
     pagamento no momento do recebimento do produto`, function() {
        const nomeProduto = 'Random Orbit Sander'
        const quantidadeProduto = 3
        const meioDePagamento = 'Cash on Delivery'

        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Aumenta a quantidade do produto antes de adicionar ao carrinho
        cy.ajustaQuantidadeProduto(quantidadeProduto)
        //Adiciona ao carrinho 
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()
        cy.wait(2000) //Delay para o carrinho carregar
        //Confirma o nome do produto no carrinho
        cy.confirmaNomeProduto(nomeProduto)
        //Verifica se o valor total do carrinho está correto
        cy.calculaTotalCarrinho(quantidadeProduto)
        //Prossegue para login
        cy.clicaBotaoProceedCheckout(1)

        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Confirma que está logado
        cy.confereMensagemLogin()
        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(2)
        //Confirma dados de endereço de cobrança
        cy.validaDadosDeCobranca({endereco: dadosPessoaisCadastro.endereco,cidade: dadosPessoaisCadastro.cidade,
            estado: dadosPessoaisCadastro.estado,nomePaisAbreviado: dadosPessoaisCadastro.nomePaisAbreviado,
            codigoPostal: dadosPessoaisCadastro.codigoPostal
        })

        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(3)
        //Seleciona meio de pagamento
        cy.selecionaMeioDePagamento(meioDePagamento)

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
    })

    it('Verifica se é possível fazer uma compra com sucesso utilizando pagamento no cartão de crédito', function() {
        const nomeProduto = 'Cordless Drill 20V'
        const quantidadeProduto = 3
        const meioDePagamento = 'Credit Card'
        const numeroCartao = '5546-5674-0983-6903'
        const dataExpircaoCartao = '12/2027'
        const cvvCartao = '321'
        const listaSeletoresCartao = {
            '[data-test="credit_card_number"]': numeroCartao,
            '[data-test="expiration_date"]': dataExpircaoCartao,
            '[data-test="cvv"]': cvvCartao,
            '[data-test="card_holder_name"]': dadosPessoaisCadastro.nome
        }

        const mensagemCreditCard = `Enter your 16-digit credit card number as it appears on the card, in the format 0000-0000-0000-0000. Ensure that you include the hyphens for proper formatting.`
        const mensagemCvv = `The CVV is a 3-digit or 4-digit number. It's used for added security during card-not-present transactions.`
        

        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Aumenta a quantidade do produto antes de adicionar ao carrinho
        cy.ajustaQuantidadeProduto(quantidadeProduto)
        //Adiciona ao carrinho 
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()
        cy.wait(2000) //Delay para o carrinho carregar
        //Confirma o nome do produto no carrinho
        cy.confirmaNomeProduto(nomeProduto)
        //Verifica se o valor total do carrinho está correto
        cy.calculaTotalCarrinho(quantidadeProduto)
        //Prossegue para login
        cy.clicaBotaoProceedCheckout(1)

        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Confirma que está logado
        cy.confereMensagemLogin()
        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(2)
        //Confirma dados de endereço de cobrança
        cy.validaDadosDeCobranca({endereco: dadosPessoaisCadastro.endereco,cidade: dadosPessoaisCadastro.cidade,
            estado: dadosPessoaisCadastro.estado,nomePaisAbreviado: dadosPessoaisCadastro.nomePaisAbreviado,
            codigoPostal: dadosPessoaisCadastro.codigoPostal
        })

        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(3)
        //Seleciona meio de pagamento
        cy.selecionaMeioDePagamento(meioDePagamento)
        //Preenche dados do cartão de crédito
        Object.entries(listaSeletoresCartao).forEach(([seletor,valor]) => {
            cy.get(seletor)
            .should('be.visible')
            .clear()
            .type(valor)
        })
       
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
    })

    it('Verifica se é possível fazer uma compra com sucesso utilizando Compre agora e pague depois', function() {
        const nomeProduto = 'Bolt Cutters'
        const quantidadeProduto = 6
        const meioDePagamento = 'Buy Now Pay Later'
        const mensagemBuyNow = `This option allows you to spread the cost of your purchase over several months.`

        const listaMesesPagamento = ['3 Monthly Installments', '6 Monthly Installments', 
            '9 Monthly Installments', '12 Monthly Installments']
        //Seleciona aleatoriamente um mês para pagamento
        let numeroMesPagamento = listaMesesPagamento[Math.floor(Math.random()*listaMesesPagamento.length)]

        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Aumenta a quantidade do produto antes de adicionar ao carrinho
        cy.ajustaQuantidadeProduto(quantidadeProduto)
        //Adiciona ao carrinho 
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()
        cy.wait(2000) //Delay para o carrinho carregar
        //Confirma o nome do produto no carrinho
        cy.confirmaNomeProduto(nomeProduto)
        //Verifica se o valor total do carrinho está correto
        cy.calculaTotalCarrinho(quantidadeProduto)
        //Prossegue para login
        cy.clicaBotaoProceedCheckout(1)

        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Confirma que está logado
        cy.confereMensagemLogin()
        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(2)
        //Confirma dados de endereço de cobrança
        cy.validaDadosDeCobranca({endereco: dadosPessoaisCadastro.endereco,cidade: dadosPessoaisCadastro.cidade,
            estado: dadosPessoaisCadastro.estado,nomePaisAbreviado: dadosPessoaisCadastro.nomePaisAbreviado,
            codigoPostal: dadosPessoaisCadastro.codigoPostal
        })
        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(3)
        //Seleciona meio de pagamento
        cy.selecionaMeioDePagamento(meioDePagamento)
        //Preenche dados de pagamento
        cy.get('[data-test="monthly_installments"]')
        .should('be.visible')
        .select(numeroMesPagamento)

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
    })    

    it('Verifica se é possível fazer uma compra com sucesso utilizando Gift Card', function() {
        const nomeProduto = 'Cross-head screws'
        const quantidadeProduto = 13
        const meioDePagamento = 'Gift Card'
        const numeroGiftCard = '7654321'
        const numeroValidacaoGiftCard = '45321'

        const mensagemGiftCardNumber = `Enter the unique number found on your gift card. This number is usually located on the back of the card and may consist of digits and/or letters.`
        const mensagemValidationCodeGiftCard = `The validation code is a security feature found on your gift card, often located near the gift card number. Enter this code exactly as it appears on your card.`
        const listaSeletoresGiftCard = {
            '[data-test="gift_card_number"]': numeroGiftCard,
            '[data-test="validation_code"]': numeroValidacaoGiftCard
        }

        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Aumenta a quantidade do produto antes de adicionar ao carrinho
        cy.ajustaQuantidadeProduto(quantidadeProduto)
        //Adiciona ao carrinho 
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()
        cy.wait(2000) //Delay para o carrinho carregar
        //Confirma o nome do produto no carrinho
        cy.confirmaNomeProduto(nomeProduto)
        //Verifica se o valor total do carrinho está correto
        cy.calculaTotalCarrinho(quantidadeProduto)
        //Prossegue para login
        cy.clicaBotaoProceedCheckout(1)

        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Confirma que está logado
        cy.confereMensagemLogin()
        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(2)
        //Confirma dados de endereço de cobrança
        cy.validaDadosDeCobranca({endereco: dadosPessoaisCadastro.endereco,cidade: dadosPessoaisCadastro.cidade,
            estado: dadosPessoaisCadastro.estado,nomePaisAbreviado: dadosPessoaisCadastro.nomePaisAbreviado,
            codigoPostal: dadosPessoaisCadastro.codigoPostal
        })
        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(3)
        //Seleciona meio de pagamento
        cy.selecionaMeioDePagamento(meioDePagamento)
        //Preenche dados do Giftcard
        Object.entries(listaSeletoresGiftCard).forEach(([seletor,valor]) => {
            cy.get(seletor)
            .should('be.visible')
            .clear()
            .type(valor)
        })

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
    })

    it('Verifica se o site impede uma compra quando os dados de transferência bancária são inválidos.', function() {
        const nomeProduto = 'Washers'
        const quantidadeProduto = 14
        const meioDePagamento = 'Bank Transfer'
        
        //Dados bancarios inválidos
        const nomeBancoErrado = 'a'
        const numeroContaBancariaErrado = 'a'
        const listaSeletoresContaBancaria = {'[data-test="bank_name"]': nomeBancoErrado,
            '[data-test="account_name"]': dadosPessoaisCadastro.nome,
            '[data-test="account_number"]': numeroContaBancariaErrado
        }
        //Mensagem de erro do pagamento por transferência bancária
        const mensagemErroNumeroContaBancaria = ' Account number must be numeric. '

        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Aumenta a quantidade do produto antes de adicionar ao carrinho
        cy.ajustaQuantidadeProduto(quantidadeProduto)
        //Adiciona ao carrinho 
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()
        cy.wait(2000) //Delay para o carrinho carregar
        //Confirma o nome do produto no carrinho
        cy.confirmaNomeProduto(nomeProduto)
        //Verifica se o valor total do carrinho está correto
        cy.calculaTotalCarrinho(quantidadeProduto)
        //Prossegue para login
        cy.clicaBotaoProceedCheckout(1)

        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Confirma que está logado
        cy.confereMensagemLogin()
        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(2)
        //Confirma dados de endereço de cobrança
        cy.validaDadosDeCobranca({endereco: dadosPessoaisCadastro.endereco,cidade: dadosPessoaisCadastro.cidade,
            estado: dadosPessoaisCadastro.estado,nomePaisAbreviado: dadosPessoaisCadastro.nomePaisAbreviado,
            codigoPostal: dadosPessoaisCadastro.codigoPostal
        })

        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(3)
        //Seleciona meio de pagamento
        cy.selecionaMeioDePagamento(meioDePagamento)
        //Preenche dados bancários
        Object.entries(listaSeletoresContaBancaria).forEach(([seletor,dado]) => {
            cy.get(seletor)
            .clear()
            .type(dado)
        })
        //Confere mensagem de erro
        cy.get('.alert')
        .should('be.visible')
        .should('have.text', mensagemErroNumeroContaBancaria)
    })

    it('Verifica se o site impede uma compra quando os dados de cartão de crédito são inválidos.', function() {
        const nomeProduto = 'M4 Nuts'
        const quantidadeProduto = 10
        const meioDePagamento = 'Credit Card'
        const numeroCartaoErrado = '123'
        const dataExpircaoCartaoErrado = 'a'
        const cvvCartaoErrado = 'a'
        
        //Mensagens de erro do pagamento por cartão
        const mensagemErroNumeroCartao = 'Invalid card number format.'
        const mensagemErroDataExpiracaoCartao = 'Invalid date format. Use MM/YYYY.'
        const mensagemErroCvvCartao = 'CVV must be 3 or 4 digits.'

        const listaSeletoresCartao = {
            '[data-test="credit_card_number"]': numeroCartaoErrado,
            '[data-test="expiration_date"]': dataExpircaoCartaoErrado,
            '[data-test="cvv"]': cvvCartaoErrado,
            '[data-test="card_holder_name"]': dadosPessoaisCadastro.nome
        }

        //Pesquisa produto
        cy.pesquisaItem(nomeProduto)
        //Acessa produto
        cy.abreDetalhesDoProduto(nomeProduto)
        //Aumenta a quantidade do produto antes de adicionar ao carrinho
        cy.ajustaQuantidadeProduto(quantidadeProduto)
        //Adiciona ao carrinho 
        cy.adicionaProdutoNoCarrinho()
        //Acessa carrinho
        cy.acessaCarrinho()
        cy.wait(2000) //Delay para o carrinho carregar
        //Confirma o nome do produto no carrinho
        cy.confirmaNomeProduto(nomeProduto)
        //Verifica se o valor total do carrinho está correto
        cy.calculaTotalCarrinho(quantidadeProduto)
        //Prossegue para login
        cy.clicaBotaoProceedCheckout(1)

        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Confirma que está logado
        cy.confereMensagemLogin()
        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(2)
        //Confirma dados de endereço de cobrança
        cy.validaDadosDeCobranca({endereco: dadosPessoaisCadastro.endereco,cidade: dadosPessoaisCadastro.cidade,
            estado: dadosPessoaisCadastro.estado,nomePaisAbreviado: dadosPessoaisCadastro.nomePaisAbreviado,
            codigoPostal: dadosPessoaisCadastro.codigoPostal
        })

        //Clica em prosseguir
        cy.clicaBotaoProceedCheckout(3)
        //Seleciona meio de pagamento
        cy.selecionaMeioDePagamento(meioDePagamento)
        //Preenche dados do cartão de crédito
        Object.entries(listaSeletoresCartao).forEach(([seletor,valor]) => {
            cy.get(seletor)
            .should('be.visible')
            .clear()
            .type(valor)
        })

        //Mensagem de erro do número do cartão
        cy.get('[class="ng-star-inserted"]')
        .contains(mensagemErroNumeroCartao)
        .should('be.visible')
        //Erro data
        cy.get('[class="ng-star-inserted"]')
        .contains(mensagemErroDataExpiracaoCartao)
        .should('be.visible')
        //Erro cvv
        cy.get('[class="ng-star-inserted"]')
        .contains(mensagemErroCvvCartao)
        .should('be.visible')
    })

    it('Verifica se é possível consultar os dados de uma fatura.', function() {
        const tituloPagina = 'Invoices'
        
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        cy.fazLogin(emailUsuarioExistente,senhaUsuarioExistente)
        //Acessa lista de faturas
        cy.acessaMenuPerfilUsuario()
        cy.acessaMyInvoices()
        //Verifica se está na página de faturas
        cy.verificaTituloPagina(tituloPagina)
        //Verifica dados da fatura
        cy.readFile('cypress/fixtures/dados_compra.json').then(dados => {
            const listaSeletoresFatura = {
                '[data-test="invoice-number"]': dados.codigoPedido,
                '[data-test="total"]': dados.totalCarrinho,
                '[data-test="payment-method"]': dados.meioDepagamento,
                '[data-test="address"]': enderecoUsuarioExistente,
                '[data-test="postcode"]': codigoPostalUsuarioExistente,
                '[data-test="city"]': cidadeUsuarioExistente,
                '[data-test="state"]': estadoUsuarioExistente,
                '[data-test="country"]': paisUsuarioExistente
            }
            
            cy.get('[class="table table-hover"]')
            .contains(dados.codigoPedido)
            .should('be.visible')
            cy.get('[class="table table-hover"]')
            .contains(enderecoUsuarioExistente)
            .should('be.visible')
            cy.get('[class="table table-hover"]')
            .contains(dados.totalCarrinho)
            .should('be.visible')
           
            //Acessa a fatura
            cy.get('tbody')
            .contains('td', dados.codigoPedido)
            .parent() // Seleciona a linha inteira (<tr>)
            .find('a.btn-primary') // Localiza o botão "Details" na linha correspondente
            .click(); // Clica no botão

            //Confere os dados da fatura
            Object.entries(listaSeletoresFatura).forEach(([seletor,valor]) => {
                if(seletor == '[data-test="total"]') {
                    cy.get(seletor)
                    .should('be.visible')
                    .should('contain.value',valor)
                    /*Por algum motivo não dá para verificar o total do carrinho usando "have.value", então foi
                    necessário criar esse if para usar uma condição diferente*/
                }
                else{ cy.get(seletor)
                    .should('be.visible')
                    .should('have.value',valor)
                } 
            })
            
            //Confere dados do produto
            cy.get('[class="table table-hover"]')
            .should('contain.text', dados.nomeProduto)
            .should('contain.text', dados.quantidadeProduto)
            .should('contain.text', dados.precoProduto)

            /*O campo de "Total" contido dentro da tabela de informações do produtos está num formato
            diferente do "Total" apresentado nas informações gerais, por enquanto não irei validar ele
            mas depois irei formatar a variável para que seja convertida de "0000.00" para "0,000.00".
            Acredito que isso seja um erro contido dentro do próprio site.
            */
        })
    })

    it('Verifica se é possível registrar um usuário mais de uma vez.', function() {
        const mensagemAlerta = 'A customer with this email address already exists.'
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Clica em "Register your account"
        cy.acessaPaginaDeRegistroDeUsuario()
        //Preenche todos os dados pessoais já cadastrados anteriormente
        cy.preencheDadosDeCadastroDoUsuario(dadosPessoaisCadastro)
        cy.get('[data-test="email"]') //Digita um email existente no sistema
        .clear()
        .type(emailUsuarioExistente)

        //Clica em "Register"
        cy.clicaBotaoRegistrar()
        //Confere Mensagem de alerta
        cy.get('[data-test="register-error"]')
        .should('be.visible')
        .should('have.text', mensagemAlerta)
    })

    it('Verifica se é possível alterar a senha do usuário em "My profile".', function() {
        const novaSenha = 'batata321@A'
        const listaSeletoresSenha = {
            '[data-test="current-password"]': dadosPessoaisCadastro.senha,
            '[data-test="new-password"]': novaSenha,
            '[data-test="new-password-confirm"]': novaSenha
        }
        const mensagemSucessoSenha = 'Your password is successfully updated!'
        const tituloPagina = 'My account'

        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Acessa "My profile"
        cy.acessaMenuPerfilUsuario()
        cy.acessaMyProfile()
        //Itera sob o objeto de senhas e faz alteracao da senha atual
        Object.entries(listaSeletoresSenha).forEach(([seletor,valor]) => {
            cy.get(seletor)
            .clear()
            .type(valor)
        })
        cy.wait(2000) //Espera para poder clicar no botão de mudar senha

        //Clica em "Change password"
        cy.get('[data-test="change-password-submit"]')
        .should('be.visible')
        .should('not.be.disabled')
        .click()
        //Mensagem de sucesso 
        cy.contains(mensagemSucessoSenha)
        .should('be.visible')
        cy.wait(6000) //Delay para fazer um novo login
        //Faz login com a nova senha
        cy.fazLogin(dadosPessoaisCadastro.email,novaSenha)
        //Verifica se acessou conta
        cy.verificaTituloPagina(tituloPagina)
    })

    it('Verifica se é possível que um usuário válido recupere sua senha.', function() {
        const mensagemAlerta = 'Invalid email or password'
        //Acessa tela de login
        cy.acessaPaginaDeLogin()
        //Acessa "Forgot Password"
        cy.get('[data-test="forgot-password-link"]')
        .click()
        cy.get('[data-test="email"]')
        .clear()
        .type(dadosPessoaisCadastro.email)
        //Clica em "Set new password"
        cy.get('[data-test="forgot-password-submit"]')
        .click()

        /*O site não apresenta nenhuma confirmação visual de que a senha foi alterada, 
        então é necessário tentar fazer um novo login para identificar se foi alterada.*/
        //Acessa login de usuario novamente
        cy.get('[data-test="nav-sign-in"]')
        .click()
        //Digita dados de login
        cy.fazLogin(dadosPessoaisCadastro.email,dadosPessoaisCadastro.senha)
        //Mensagem de alerta
        cy.get('[data-test="login-error"]')
        .should('be.visible')
        .should('have.text', mensagemAlerta)
    })
})