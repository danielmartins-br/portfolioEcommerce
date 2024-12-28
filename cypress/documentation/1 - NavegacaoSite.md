# Testes Automatizados - Fluxos do Site

Os testes contidos aqui são referentes ao arquivo:
```\cypress\e2e\NavegacaoSiteSpec.cy.js```
    
Este documento descreve os casos de teste para a suíte **Fluxos do Site**, abordando os seguintes cenários:

### Escopo
- Verificação de elementos visuais.
- Funcionalidade de menus e barra de pesquisa.
- Funcionalidade de filtros.
- Navegação pelas categorias de produtos.

### Fora de Escopo
- Criação de usuário.
- Interação direta com produtos (adição ou remoção ao carrinho).
- Validação de dados do usuário.
- Compra de produto.

### Casos de Teste

### 1. Página "Home"
* **Descrição:** Verifica se a página "Home" é carregada corretamente.  
* **Cenário:** A página home deve exibir o banner do site e também o botão "Home". 

### 2. Menu "Categories"
* **Descrição:** Verifica se itens do menu "Categories" são carregados corretamente.
* **Cenário:** Ao acionar o menu "Categories", ele deve exibir todas as 5 opções de categorias ['Hand Tools', 'Power Tools', 'Other', 'Special Tools', 'Rentals'], ao clicar em qualquer categoria o site deve carrega-lá corretamente.

### 3. Lista de Idiomas
* **Descrição:** Verifica lista de idiomas.
* **Cenário:** Ao acionar o botão de idiomas, o site deve apresentar uma lista com cada uma das 6 opções disponíveis ['DE', 'EN', 'ES', 'FR', 'NL', 'TR'], ao clicar em qualquer idioma o site deve mudar para o idioma escolhido.

### 4. Página "Sign In"
* **Descrição:**  Verifica se a página "Sign In" é carregada corretamente
* **Cenário:** A página deve apresentar ao usuário um botão de login com Google, campos para digitar e-mail, senha e um botão para efetuar o login. No rodapé da página deve conter dois links, um direcionando para uma página de recuperação de senha e outro para criação de novo usuário.

### 5. Página "Customer Registration"
* **Descrição:** Verifica se a página "Customer Registration" é exibida corretamente
* **Cenário:** A página de criação de usuário deve apresentar corretamente todos os campos de dados necessários ['First name', 'Last name', 'Date of Birth', 'Address', 'Postcode', 'City', 'State', 'Country', 'Phone', 'Email address', 'Password'] e também o botão "Regiter".

### 6. Página "Contact"
* **Descrição:** Verifica se a página "Contact" é carregada corretamente
* **Cenário:** Ao acessar a página de contato, deve ser exibido um formulário contendo os campos ['First name', 'Last name', 'Email address', 'Subject', 'Message', 'Message', 'Attachment'] e também o botão "Send".

### 7. Filtro da Categoria "Hand Tools"
* **Descrição:** Verifica filtro de itens da categoria "Hand Tools"
* **Cenário:** Ao filtrar por itens da categoria "Hand Tools" na teal incial, o site deve 

### 8. 
* **Descrição:** 
* **Cenário:** 

### 9. 
* **Descrição:** 
* **Cenário:** 

### 10. 
* **Descrição:** 
* **Cenário:** 

### 11. 
* **Descrição:** 
* **Cenário:** 