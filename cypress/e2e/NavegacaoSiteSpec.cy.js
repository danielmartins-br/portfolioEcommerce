/// <reference types="cypress" />

describe('Fluxo de Compras', function() {

    this.beforeEach(() => {
        cy.acessaSite()
    })

    it.only('Verifica se as páginas principais ("Home", "Sign In", "Contato", "Categories", "Idioma") são carregadas corretamente.', function() {
        
        //Verifica página de Contato
        cy.get('[data-test="nav-contact"]')
        .should('be.visible')
        .click()

        cy.get('h3').contains('Contact')
        .should('be.visible')

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

        //Verifica se todos os itens filhos de "Hand Tools" foram marcados
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

        /*TODO: {Melhorar o formato com qual comparo se listou somente um tipo de produto específico, atualmente
        só estou verificando se na tela contém o nome de um produto da categoria mas é necessário adicionar um 
        "should('not.have.text', 'Hammer', 'Tijolo')"} para poder validar que itens de outras categorias não estão 
        sendo listados */
    

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

        //Filtra somente por "Power Tools" na Tela Inicial
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > label')
        .contains('Power Tools')
        .should('be.visible')
        .click()

        //Verifica se todos os itens filhos de "Power Tools" foram selecionados
        //Grinder
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(2) > label > input')
        .should('be.checked')
        //Sander
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(3) > label > input')
        .should('be.checked')
        //Saw
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(4) > label > input')
        .should('be.checked')
        //Drill
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(5) > label > input')
        .should('be.checked')

        //Desmarca todos os itens da categoria "Power Tools" na Tela Inicial
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > label')
        .contains('Power Tools')
        .click()

        //Verifica se todos os itens estão desmarcados
        //Grinder
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(2) > label > input')
        .should('not.be.checked')
        //Sander
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(3) > label > input')
        .should('not.be.checked')
        //Saw
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(4) > label > input')
        .should('not.be.checked')
        //Drill
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(5) > label > input')
        .should('not.be.checked')

        //Seleciona somente itens da categoria Grinder
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(2) > label > input')
        .click()
        //Verifica se não listou esmeril
        cy.get('.col-md-9')
        .should('have.text', 'There are no products found.')
        //Desmarca itens da categoria Grinders
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(2) > label > input')
        .click()

        //Seleciona somente itens da categoria Sander
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(3) > label > input')
        .click()
        //Verifica se listou somente Lixadeiras
        cy.get('.col-md-9')
        .should('contain', 'Belt Sander', { timeout: 6000 })
        .should('contain', 'Sheet Sander')
        //Desmarca itens da categoria Sander
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(3) > label > input')
        .click()

        //Seleciona somente itens da categoria Saw
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(4) > label > input')
        .click()
        //Verifica se listou somente Serras
        cy.get('.col-md-9')
        .should('contain', 'Saw')
        //Desmarca itens da categoria Saw
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(4) > label > input')
        .click()

        //Seleciona somente itens da categoria Drill
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(5) > label > input')
        .click()
        //Verifica se listou somente Furadeiras
        cy.get('.col-md-9')
        .should('contain', 'Drill')
        //Desmarca itens da categoria Drill
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(3) > ul > fieldset > div:nth-child(5) > label > input')
        .click()

    })

    it('Verifica Itens da categoria "Other"', function() {

        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(4) > label')
        .contains('Other')
        .should('be.visible')
        .click()

        //Verifica se todos os itens filhos de "Other" foram selecionados
        //Tool Belts
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(4) > ul > fieldset > div:nth-child(2) > label > input')
        .should('be.checked')
        //Storage Solutions
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(4) > ul > fieldset > div:nth-child(3) > label > input')
        .should('be.checked')
        //Workbench
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(4) > ul > fieldset > div:nth-child(4) > label > input')
        .should('be.checked')
        //Safety Gear
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(4) > ul > fieldset > div:nth-child(5) > label > input')
        .should('be.checked')
        //Fasteners
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(4) > ul > fieldset > div:nth-child(6) > label > input')
        .should('be.checked')

        //Desmarca todos os itens da categoria "Other" na tela inicial
        cy.get('#filters > fieldset:nth-child(13) > div:nth-child(4) > label')
        .contains('Other')
        .click()

        //Verifica se todos os itens estão desmarcados
        //Tool Belts
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(2) > label')
        .contains('Tool Belts')
        .should('not.be.checked')
        //Storage Solutions
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(3) > label')
        .contains('Storage Solutions')
        .should('not.be.checked')
        //Workbench
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(4) > label')
        .contains('Workbench')
        .should('not.be.checked')
        //Fasteners
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(6) > label')
        .contains('Fasteners')
        .should('not.be.checked')

        //Seleciona somente os itens da categoria "Tool Belts"
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(2) > label')
        .contains('Tool Belts')
        .click()
        //Verifica se listou somente cintos de ferramentas
        cy.get('.col-md-9')
        .should('contain', 'toolbelt')
        //Desmarca itens da categoria "Tool Belts"
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(2) > label')
        .contains('Tool Belts')
        .click()

        //Seleciona somente os itens da categoria "Storage Solutions"
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(3) > label')
        .contains('Storage Solutions')
        .click()
        //Verifica se listou somente caixa de ferramentas
        cy.get('.col-md-9')
        .should('contain', 'Tool Cabinet')
        //Desmarca itens da categoria "Storage Solutions"
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(3) > label')
        .contains('Storage Solutions')
        .click()

        //Seleciona somente os itens da categoria "Workbench"
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(4) > label')
        .contains('Workbench')
        .click()
        //Verifica se listou somente bancada de trabalho
        cy.get('.col-md-9')
        .should('contain', 'There are no products found.')

        //Desmarca itens da categoria "Workbench"
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(4) > label')
        .contains('Workbench')
        .click()

        //Seleciona somente os itens da categoria "Safety Gear"
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(5) > label')
        .contains('Safety Gear')
        .click()
        //Verifica se listou somente equipamentos de segurança
        cy.get('.col-md-9')
        .should('contain', 'Protection')
        //Desmarca itens da categoria "Safety Gear"
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(5) > label')
        .contains('Safety Gear')
        .click()

        //Seleciona somente os itens da categoria "Fasteners"
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(6) > label')
        .contains('Fasteners')
        .click()
        //Verifica se listou somente parafusos e porcas
        cy.get('.col-md-9')
        .should('contain', 'Screws')
        .should('contain', 'Nuts')
        //Desmarca itens da categoria "Fasteners"
        cy.get(':nth-child(4) > ul > fieldset > :nth-child(6) > label')
        .contains('Fasteners')
        .click()
    })

    it('Verifica filtros de itens da marca "ForgeFlex Tools"', function() {

        //Filtra somente itens da marca "ForgeFlex Tools"
        cy.get('#filters > fieldset:nth-child(16) > div:nth-child(2) > label')
        .contains('ForgeFlex Tools')
        .click()
        //Filtra por um item específico da marca
        cy.get('.col-md-9')
        .should('contain', 'Thor Hammer')
        //Verifica se a marca "MightyCraft Hardware" não está selecionada
        cy.get('#filters > fieldset:nth-child(16) > div:nth-child(3) > label')
        .contains('MightyCraft Hardware')
        .should('not.be.checked')

        //Desmarca itens da marca
        cy.get('#filters > fieldset:nth-child(16) > div:nth-child(2) > label')
        .contains('ForgeFlex Tools')
        .click()

    })

    it('Verifica filtros de itens da marca "MightyCraft Hardware"', function() {

        //Filtra somente itens da marca "MightyCraft Hardware"
        cy.get('#filters > fieldset:nth-child(16) > div:nth-child(3) > label')
        .contains('MightyCraft Hardware')
        .click()
        //Filtra por um item específico da marca
        cy.get('.col-md-9')
        .should('contain', 'Belt Sander')
        //Verifica se a marca "ForgeFlex Tools" não está selecionada
        cy.get('#filters > fieldset:nth-child(16) > div:nth-child(2) > label')
        .contains('ForgeFlex Tools')
        .should('not.be.checked')

        //Desmarca itens da marca
        cy.get('#filters > fieldset:nth-child(16) > div:nth-child(3) > label')
        .contains('MightyCraft Hardware')
        .click()
    })

    it('Verifica filtro de pesquisa', function() {

        //Pesquisa por "martelo"
        cy.get('#search-query')
        .type('hammer')
        cy.get('button')
        .contains('Search')
        .click()
        //Verifica se o item foi encontrado
        cy.get('.col-md-9')
        .should('contain', 'Claw Hammer')

        //Pesquisa por item que não existe no inventário
        cy.get('#search-query')
        .type('cavalo')
        cy.get('button')
        .contains('Search')
        .click()
        //Verifica se o item não foi encontrado
        cy.get('.col-md-9')
        .should('contain', 'There are no products found.')

        //Reseta filtro de pesquisa
        cy.get('[data-test="search-reset"]')
        .click()
        cy.get('.col-md-9')
        .should('not.have.text', 'There are no products found.')
    })

    it('Verifica filtro por faixa de preço máximo', function() {
        
        //Por padrão o site carrega itens com valor de 1 até 100, o objetivo do teste é filtrar por itens de valor até 200
        cy.reload()

        //TODO: melhorar o formato da interação com o slider de preço
        //Simula a ação de arrastar o botão de preço até o máximo
        for (let x = 100; x <= 200; x += 2) {
            cy.get('span[role="slider"][aria-label="ngx-slider-max"]')
            .type("{rightarrow}");
        }
        cy.get('span[role="slider"][aria-label="ngx-slider-max"]')
        .should('have.attr', 'aria-valuenow', '200')  
    })

    it('Verifica filtro por faixa de preço mínimo', function() {
        
        //Por padrão o site carrega itens com valor de 1 até 100, o objetivo do teste é filtrar por itens de valor até 1
        cy.reload()

        //TODO: melhorar o formato da interação com o slider de preço
        //Simula a ação de arrastar o botão de preço até o mínimo
        for (let x = 1; x <= 50; x += 1) {
            cy.get('span[role="slider"][aria-label="ngx-slider-max"]')
            .type("{leftarrow}");
        }
        cy.get('span[role="slider"][aria-label="ngx-slider-max"]')
        .should('have.attr', 'aria-valuenow', '1')     
    })

    it('Verifica ordenação de produtos', function() {

        cy.reload()
        cy.wait(2000)
        /*Por padrão o site exibe produtos de $1 até $100,
        sendo necessário acionar um filtro para visualizar produtos mais caros.
        */

        //Verifica ordenação por preço [menor - maior]
        var arruela = '$3.55'
        var parafuso = '$3.95'
        var valorAcimaDoFiltrado = '$46.50'

        cy.get('[data-test="sort"]')
        .select('Price (Low - High)')

        cy.wait(5000) //O site demora alguns segundos para ordenar os itens, por isso o delay
        cy.get('[data-test="product-price"]', { timeout: 8000 })
        .should('contain.text', `${arruela}`) //Verifica o item mais barato
        .should('contain.text', `${parafuso}`) //Verifica o segundo item mais barato 
        .should('not.contain.text', `${valorAcimaDoFiltrado}`) //Verificando um valor que não deve existir na primeira página 

        //Verifica ordenação por preço [maior - menor]
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

        //Verifica ordenação alfabética [z - a]
        var woodFilter = "Wood"
        cy.get('[data-test="sort"]')
        .select('Name (Z - A)')
        cy.wait(1000)

        cy.get('[data-test="sorting_completed"]')
        .should('contain.text', `${woodFilter}`) //Verifica itens que contenham a palavra "Wood" pois são os primeiros na ordem [z-a]
        
        //Verifica ordenação alfabética [a - z]
        var adjustableFilter = "Adjustable Wrench"
        cy.get('[data-test="sort"]')
        .select('Name (A - Z)')
        cy.wait(1000)

        cy.get('[data-test="sorting_completed"]')
        .should('contain.text', `${adjustableFilter}`) //Verifica itens que contenham a palavra "Adjustable Wrench" pois são os primeiros na ordem [a-z]
    })
})