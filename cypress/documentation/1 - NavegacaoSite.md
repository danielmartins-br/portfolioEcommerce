# Testes Automatizados - Navegação no Site

O site utilizado para os testes [https://practicesoftwaretesting.com] simula um e-commerce de venda de ferramentas
para construção civil.

Os testes contidos aqui são referentes ao arquivo:
```\cypress\e2e\NavegacaoSiteSpec.cy.js```
    
Este documento descreve os casos de teste para a suíte **Navegação no Site**, abordando os seguintes cenários:

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
* **Descrição:** Verifica se itens do menu "Categories" são listados corretamente.
* **Cenário:** Ao acionar o menu "Categories", ele deve exibir todas as 5 opções de categorias ['Hand Tools', 'Power Tools', 'Other', 'Special Tools', 'Rentals'].

### 3. Categoria "Hand Tools" do menu "Categories"
* **Descrição:** Seleciona categoria "Hand Tools" do menu "Categories".
* **Cenário:** Ao acionar  a categoria "Hand Tools"  do menu "Categories", o site deve carregar corretamente a página da categoria contendo o título "Category: Hand Tools".

### 4. Categoria "Power Tools" do menu "Categories"
* **Descrição:** Seleciona categoria "Power Tools" do menu "Categories".
* **Cenário:** Ao acionar  a categoria "Power Tools"  do menu "Categories", o site deve carregar corretamente a página da categoria contendo o título "Category: Power Tools".

### 5. Categoria "Other" do menu "Categories"
* **Descrição:** Seleciona categoria "Other" do menu "Categories".
* **Cenário:** Ao acionar  a categoria "Other"  do menu "Categories", o site deve carregar corretamente a página da categoria contendo o título "Category: Other".

### 6. Categoria "Special Tools" do menu "Categories"
* **Descrição:** Seleciona categoria "Special Tools" do menu "Categories".
* **Cenário:** Ao acionar  a categoria "Special Tools"  do menu "Categories", o site deve carregar corretamente a página da categoria contendo o título "Category: Special Tools".

### 7. Categoria "Rentals" do menu "Categories"
* **Descrição:** Seleciona categoria "Rentals" do menu "Categories".
* **Cenário:** Ao acionar  a categoria "Rentals"  do menu "Categories", o site deve carregar corretamente a página da categoria contendo o título "Rentals".

### 8. Lista de Idiomas
* **Descrição:** Verifica lista de idiomas.
* **Cenário:** Ao acionar o botão de idiomas, o site deve apresentar uma lista com cada uma das 6 opções disponíveis ['DE', 'EN', 'ES', 'FR', 'NL', 'TR'].

### 9. Idioma Alemão
* **Descrição:** Muda idioma para alemão.
* **Cenário:** Ao acionar o botão de idiomas e selecionar a opção 'DE', o site deve alterar seus textos para alemão com exceção dos nomes de produtos.
* **Observação:** Para verificar se o idioma mudou é necessário observar os textos de faixa de preço e ordenação, o texto de ordenação deve ser igual a "Sortieren" e o texto de faixa de preço deve ser igual a "Preisspanne".

### 10. Idioma Espanhol
* **Descrição:** Muda idioma para espanhol.
* **Cenário:** Ao acionar o botão de idiomas e selecionar a opção 'ES', o site deve alterar seus textos para espanhol com exceção dos nomes de produtos.
* **Observação:** Para verificar se o idioma mudou é necessário observar os textos de faixa de preço e ordenação, o texto de ordenação deve ser igual a "Ordenar" e o texto de faixa de preço deve ser igual a "Rango de precios".

### 11. Idioma Francês
* **Descrição:** Muda idioma para francês.
* **Cenário:** Ao acionar o botão de idiomas e selecionar a opção 'FR', o site deve alterar seus textos para francês com exceção dos nomes de produtos.
* **Observação:** Para verificar se o idioma mudou é necessário observar os textos de faixa de preço e ordenação, o texto de ordenação deve ser igual a "Trier" e o texto de faixa de preço deve ser igual a "Fourchette de prix".

### 12. Idioma Holandês
* **Descrição:** Muda idioma para holandês.
* **Cenário:** Ao acionar o botão de idiomas e selecionar a opção 'NL', o site deve alterar seus textos para holandês com exceção dos nomes de produtos.
* **Observação:** Para verificar se o idioma mudou é necessário observar os textos de faixa de preço e ordenação, o texto de ordenação deve ser igual a "Sorteren" e o texto de faixa de preço deve ser igual a "Prijsklasse".

### 13. Idioma Turco
* **Descrição:** Muda idioma para turco.
* **Cenário:** Ao acionar o botão de idiomas e selecionar a opção 'TR', o site deve alterar seus textos para turco com exceção dos nomes de produtos.
* **Observação:** Para verificar se o idioma mudou é necessário observar os textos de faixa de preço e ordenação, o texto de ordenação deve ser igual a "Sırala" e o texto de faixa de preço deve ser igual a "Fiyat Aralığı".

### 14. Idioma Inglês
* **Descrição:** Muda idioma para inglês.
* **Cenário:** Ao acionar o botão de idiomas e selecionar a opção 'EN', o site deve alterar seus textos para inglês.
* **Observação:** Para verificar se o idioma mudou é necessário observar os textos de faixa de preço e ordenação, o texto de ordenação deve ser igual a "Sort" e o texto de faixa de preço deve ser igual a "Price Range".

### 15. Página "Sign In"
* **Descrição:**  Verifica se a página "Sign In" é carregada corretamente.
* **Cenário:** A página deve apresentar ao usuário um botão de login com Google, campos para digitar e-mail, senha e um botão para efetuar o login. No rodapé da página deve conter dois links, um direcionando para uma página de recuperação de senha e outro para criação de novo usuário.

### 16. Página "Forgot Password"
* **Descrição:** Verifica se a página "Forgot Password" é exibida corretamente.
* **Cenário:** Ao clicar em "Forgot your Password?" dentro da página de login, o site deve redirecionar o usuário para dentro de uma nova página contendo um campo para inserção de e-mail e um botão para enviar.

### 17. Página "Customer Registration"
* **Descrição:** Verifica se a página "Customer Registration" é exibida corretamente.
* **Cenário:** Ao clicar em "Register your account" dentro da página de login, o site deve redirecionar o usuário para dentro de uma nova página de criação de usuário. Dentro dessa nova página devem ser apresentados corretamente todos os campos de dados necessários para criação do novo usuário: ['First name', 'Last name', 'Date of Birth', 'Address', 'Postcode', 'City', 'State', 'Country', 'Phone', 'Email address', 'Password'] e também o botão "Register".

### 18. Página "Contact"
* **Descrição:** Verifica se a página "Contact" é carregada corretamente.
* **Cenário:** Ao acessar a página de contato, deve ser exibido um formulário contendo todos os campos necessários para um novo contato: ['First name', 'Last name', 'Email address', 'Subject', 'Message', 'Message', 'Attachment'] e também o botão "Send".

### 19. Filtro da Categoria "Hand Tools"
* **Descrição:** Verifica se o filtro marca somente itens da categoria "Hand Tools"
* **Cenário:** Na tela inicial, ao clicar no filtro de categoria "Hand Tools", o site deve selecionar automaticamente todas as categorias que são filhas desse filtro ['Hammer', 'Hand Saw', 'Wrench', 'Screwdriver', 'Pliers', 'Chisels', 'Measures'].

### 20. Desmarca Categoria "Hand Tools"
* **Descrição:** Verifica se o filtro desmarca somente itens da categoria "Hand Tools".
* **Cenário:** Na tela inicial, ao clicar no filtro de categoria "Hand Tools" quando o mesmo já estiver com todas as suas categorias selecionadas ['Hammer', 'Hand Saw', 'Wrench', 'Screwdriver', 'Pliers', 'Chisels', 'Measures'], o site deve desmarcar todas as opções.

### 21. Filtro "Hammer"
* **Descrição:** Verifica se o filtro listou somente martelos
* **Cenário:** Na tela inicial dentro da categoria "Hand Tools" ao selecionar o filtro "Hammer", o site deve listar somente martelos.

### 22. Filtro "Hand Saw"
* **Descrição:** Verifica se o filtro listou somente serrotes
* **Cenário:** Na tela inicial dentro da categoria "Hand Tools" ao selecionar o filtro "Hand Saw", o site deve listar somente serrotes.

### 23. Filtro "Wrench"
* **Descrição:** Verifica se o filtro listou somente chaves de boca
* **Cenário:** Na tela inicial dentro da categoria "Hand Tools" ao selecionar o filtro "Wrench", o site deve listar somente chaves de boca.

### 24. Filtro "Screwdriver"
* **Descrição:** Verifica se o filtro listou somente chaves de fenda
* **Cenário:** Na tela inicial dentro da categoria "Hand Tools" ao selecionar o filtro "Screwdriver", o site deve listar somente chaves de fenda.

### 25. Filtro "Pliers"
* **Descrição:** Verifica se o filtro listou somente alicates
* **Cenário:** Na tela inicial dentro da categoria "Hand Tools" ao selecionar o filtro "Pliers", o site deve listar somente alicates.

### 26. Filtro "Chisels"
* **Descrição:** Verifica se o filtro listou somente formões
* **Cenário:** Na tela inicial dentro da categoria "Hand Tools" ao selecionar o filtro "Chisels", o site deve listar somente formões.

### 27. Filtro "Measures"
* **Descrição:** Verifica se o filtro listou somente fitas métricas
* **Cenário:** Na tela inicial dentro da categoria "Hand Tools" ao selecionar o filtro "Measures", o site deve listar somente fitas métricas.

### 28. Filtro da Categoria "Power Tools"
* **Descrição:** Verifica se o filtro marca somente itens da categoria "Power Tools"
* **Cenário:** Na tela inicial, ao clicar no filtro de categoria "Power Tools", o site deve selecionar automaticamente todas as categorias que são filhas desse filtro ['Grinder', 'Sander', 'Saw', 'Drill'].

### 29. Desmarca Categoria "Power Tools"
* **Descrição:** Verifica se o filtro desmarca somente itens da categoria "Power Tools".
* **Cenário:** Na tela inicial, ao clicar no filtro de categoria "Power Tools" quando o mesmo já estiver com todas as suas categorias selecionadas ['Grinder', 'Sander', 'Saw', 'Drill'], o site deve desmarcar todas as opções.

### 30. Filtro "Grinder"
* **Descrição:** Verifica se o filtro listou somente esmeril
* **Cenário:** Na tela inicial dentro da categoria "Power Tools" ao selecionar o filtro "Grinder", o site não deve listar nenhum item.

### 31. Filtro "Sander"
* **Descrição:** Verifica se o filtro listou somente lixadeira
* **Cenário:** Na tela inicial dentro da categoria "Power Tools" ao selecionar o filtro "Sander", o site deve listar somente lixadeiras.

### 32. Filtro "Saw"
* **Descrição:** Verifica se o filtro listou somente serras
* **Cenário:** Na tela inicial dentro da categoria "Power Tools" ao selecionar o filtro "Saw", o site deve listar somente serras.

### 33. Filtro "Drill"
* **Descrição:** Verifica se o filtro listou somente Furadeiras
* **Cenário:** Na tela inicial dentro da categoria "Power Tools" ao selecionar o filtro "Drill", o site deve listar somente furadeiras.

### 34. Filtro da Categoria "Other"
* **Descrição:** Verifica se o filtro marca somente itens da categoria "Other"
* **Cenário:** Na tela inicial, ao clicar no filtro de categoria "Other", o site deve selecionar automaticamente todas as categorias que são filhas desse filtro ['Tool Belts ', 'Storage Solutions', 'Workbench', 'Safety Gear', 'Fasteners'].

### 35. Desmarca Categoria "Other"
* **Descrição:** Verifica se o filtro desmarca somente itens da categoria "Other".
* **Cenário:** Na tela inicial, ao clicar no filtro de categoria "Other" quando o mesmo já estiver com todas as suas categorias selecionadas ['Tool Belts ', 'Storage Solutions', 'Workbench', 'Safety Gear', 'Fasteners'], o site deve desmarcar todas as opções.

### 36. Filtro "Tool Belts"
* **Descrição:** Verifica se o filtro listou somente cintos de ferramentas
* **Cenário:** Na tela inicial dentro da categoria "Other" ao selecionar o filtro "Tool Belts", o site deve listar somente cintos de ferramentas.

### 37. Filtro "Storage Solutions"
* **Descrição:** Verifica se o filtro listou somente caixas de ferramentas
* **Cenário:** Na tela inicial dentro da categoria "Other" ao selecionar o filtro "Storage Solutions", o site deve listar somente caixas de ferramentas.

### 38. Filtro "Workbench"
* **Descrição:** Verifica se o filtro listou somente bancada de trabalho
* **Cenário:** Na tela inicial dentro da categoria "Other" ao selecionar o filtro "Workbench", o site não deve listar nenhum item.

### 39. Filtro "Safety Gear"
* **Descrição:** Verifica se o filtro listou somente equipamentos de segurança
* **Cenário:** Na tela inicial dentro da categoria "Other" ao selecionar o filtro "Safety Gear", o site deve listar somente caixas de ferramentas.

### 40. Filtro "Fasteners"
* **Descrição:** Verifica se o filtro listou somente parafusos e porcas
* **Cenário:** Na tela inicial dentro da categoria "Other" ao selecionar o filtro "Fasteners", o site deve listar somente parafusos e porcas.

### 41. Filtro da Marca "ForgeFlex Tools"
* **Descrição:** Verifica se o filtro selecionou somente a marca "ForgeFlex Tools"
* **Cenário:** Na tela inicial, ao clicar no filtro da marca "ForgeFlex Tools", o site deve selecionar somente o campo referente a essa marca.

### 42. Itens da Marca "ForgeFlex Tools"
* **Descrição:** Verifica se o filtro listou somente itens da marca "ForgeFlex Tools"
* **Cenário:** Na tela inicial, ao clicar no filtro da marca "ForgeFlex Tools", o site deve listar somente itens da marca.
* **Observação:** Para verificar se os itens são da marca é necessário observar se itens como "Court Hammer" e "Thor Hammer" foram listados, para garantir que outra marca não foi selecioanda deve-se confirmar que itens como "Screws" e "Cordless Drill" não estão sendo listados.

### 43. Filtro da Marca "MightyCraft Hardware"
* **Descrição:** Verifica se o filtro selecionou somente a marca "MightyCraft Hardware"
* **Cenário:** Na tela inicial, ao clicar no filtro da marca "MightyCraft Hardware", o site deve selecionar somente o campo referente a essa marca.

### 44. Itens da Marca "MightyCraft Hardware"
* **Descrição:** Verifica se o filtro listou somente itens da marca "MightyCraft Hardware"
* **Cenário:** Na tela inicial, ao clicar no filtro da marca "MightyCraft Hardware", o site deve listar somente itens da marca.
* **Observação:** Para verificar se os itens são da marca é necessário observar se itens como "Long Nose Pliers" e "Cordless Drill" foram listados, para garantir que outra marca não foi selecioanda deve-se confirmar que itens como "Court Hammer" e "Thor Hammer" não estão sendo listados.

### 45. Pesquisa Item 
* **Descrição:** Verifica filtro de pesquisa para um item existente
* **Cenário:** Ao digitar "hammer" na barra de pesquisa e clicar no botão "Search", o site deve listar itens que contenham a palavra hammer no nome como "Claw Hammer".

### 46. Pesquisa Item Inexistente
* **Descrição:** Verifica filtro de pesquisa para um item que não existe
* **Cenário:** Ao digitar "cavalo" na barra de pesquisa e clicar no botão "Search", o site não deve listar nenhum item e deve ser exibida a mensagem "There are no products found.".

### 47. Limpa Pesquisa
* **Descrição:** Verifica reset do filtro de pesquisa
* **Cenário:** Ao pesquisar pelo item "macaco" que não existe e clicar em "X" para limpara a barra de pesquisa, o site deve voltar a listar todos os produtos da tela inicial e não mais apresentar a mensagem "There are no products found.".

### 48. Filtra Preço Máximo
* **Descrição:** Verifica filtro por faixa de preço máximo
* **Cenário:** Na tela inicial ao arrastar o slider de preço para o máximo "200", o site deve alterar o valor do filtro apresentado em tela de "100" para "200" e manter o ícone do slider embaixo do preço máximo.

### 49. Filtra Preço Mínimo
* **Descrição:** Verifica filtro por faixa de preço mínimo
* **Cenário:** Na tela inicial ao arrastar o slider de preço para o mínimo "0", o site deve alterar o valor do filtro apresentado em tela de "100" para "0" e manter o ícone do slider embaixo do preço mínimo.

### 50. Ordena Menor Preço
* **Descrição:** Verifica ordenação por preço [menor - maior]
* **Cenário:** Na tela inicial ao selecionar a opção "Price (Low - High)" dentro de "Sort", o site deve listar os produtos seguindo a ordem do mais barato para o mais caro.
* **Observação:** Para verificar se os itens estão sendo listados corretamente é necessário observar se o item "Washers" que tem o menor preço do site "$3.55" está sendo o primeiro da lista de produtos.

### 51. Ordena Maior Preço
* **Descrição:** Verifica ordenação por preço [maior - menor]
* **Cenário:** Na tela inicial ao selecionar a opção "Price (High - Low)" dentro de "Sort", o site deve listar os produtos seguindo a ordem do mais caro para o mais barato.
* **Observação:** Para verificar se os itens estão sendo listados corretamente é necessário observar se o item "Drawer Tool Cabinet" que tem o maior preço do site "$89.55" está sendo o primeiro da lista de produtos.

### 52. Ordem Alfabética Decrescente
* **Descrição:** Verifica ordenação alfabética [z - a]
* **Cenário:** Na tela inicial ao selecionar a opção "Name (Z - A)" dentro de "Sort", o site deve listar os produtos seguindo a ordem alfabética de Z até A.
* **Observação:** Para verificar se os itens estão sendo listados corretamente é necessário observar se o item "Wood Saw" que é o último em ordem alafabética está sendo o primeiro da lista de produtos.

### 53. Ordem Alfabética Crescente
* **Descrição:** Verifica ordenação alfabética [a - z]
* **Cenário:** Na tela inicial ao selecionar a opção "Name (A - Z)" dentro de "Sort", o site deve listar os produtos seguindo a ordem alfabética de A até Z.
* **Observação:** Para verificar se os itens estão sendo listados corretamente é necessário observar se o item "Adjustable Wrench" que é o primeiro em ordem alafabética está sendo o primeiro da lista de produtos.

### 54. Paginação Numérica
* **Descrição:** Verifica paginação numérica
* **Cenário:** Na tela incial, ao clicar no ícone "2" no rodapé da página, o site deve direcionar para a seguna tela de produtos.

### 55. Paginação Próximo
* **Descrição:** Verifica paginação pelo botão "Próximo"
* **Cenário:** Na tela incial, ao clicar no botão "Next" no rodapé da página, o site deve direcionar para a próxima tela de produtos.

### 56. Paginação Anterior
* **Descrição:** Verifica paginação pelo botão "Anterior"
* **Cenário:** Na tela incial, ao clicar no botão "Previous" no rodapé da página, o site deve direcionar para a tela anterior de produtos.