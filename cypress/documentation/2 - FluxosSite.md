# Testes Automatizados - Fluxos do Site

O site utilizado para os testes [https://practicesoftwaretesting.com] simula um e-commerce de venda de ferramentas
para construção civil.

Os testes contidos aqui são referentes ao arquivo:
```\cypress\e2e\```
    
Este documento descreve os casos de teste para a suíte **Fluxos do Site**, abordando os seguintes cenários:

### Escopo
- Criação de usuário.
- Interação direta com produtos (adição ou remoção ao carrinho).
- Validação de dados do usuário.
- Compra de produto.

### Fora de Escopo
- Verificação somente de elementos visuais.
- Funcionalidade de menus e barra de pesquisa.
- Funcionalidade de filtros.
- Navegação pelas categorias de produtos.

### Casos de Teste

### 1. Adiciona ao Carrinho
* **Descrição:** Adiciona produto no carrinho.
* **Cenário:**  Ao selecionar um produto e clicar em "Add to cart", o site deve exibir a seguinte mensagem "Product added to shopping cart." confirmando que o produto foi adicionado com sucesso no carrinho de compras.

### 2. Remove do Carrinho
* **Descrição:** Remove produto do carrinho.
* **Cenário:**  Ao acessar o carrinho de compras e clicar no botão "X" de um produto específico, o site deve apresentar a mensagem "Product deleted." confirmando que o produto foi removido com sucesso do carrinho de compras.

### 3. Produto Fora de Estoque
* **Descrição:** Adiciona produto fora de estoque ao carrinho.
* **Cenário:**  Ao selecionar um produto que está fora de estoque "Out of stock", o botão "Add to cart" deve estar indisponível impossibilitando que o usuário adicione um produto indisponível para venda.

### 4. Adiciona o Mesmo Produto
* **Descrição:** Adiciona o mesmo produto várias vezes no carrinho.
* **Cenário:**  Ao selecionar um produto, clicar em "**+**" e então clicar em "Add to cart", o site deve adicionar o mesmo produto mais de uma vez ao carrinho de compras.

### 5. Matelo do Thor
* **Descrição:** Adiciona "Thor Hammer" ao carrinho.
* **Cenário:** Ao adicionar o materlo do Thor uma vez ao carrinho e clicar novamente em "Add to cart", o site não deve permitir que o usuário adicione o produto mais uma vez ao carrino, a mensagem "You can only have one Thor Hammer in the cart." deve ser exibida em seguida.
* **Observação:** Esse é um produto que só pode ser adicionado uma única vez ao carrinho.

### 6. Adiciona 0 Produtos
* **Descrição:** Verifica se o site permite adicionar 0 produtos ao carrinho.
* **Cenário:** Ao selecionar um produto e clicar em "**-**", site não deve permitir que a quantidade mínima do produto para adicionar ao carrinho seja menor que 1.

### 7. Nome do Produto
* **Descrição:** Verifica se o nome do produto é o mesmo dentro do carrinho.
* **Cenário:** Ao selecionar um produto e adicioná-lo ao carrinho, o nome do produto apresentado dentro do carrinho deve ser o mesmo apresentado na página de listagem de produtos.

### 8. Favorito sem Conta
* **Descrição:** Adiciona produto aos favoritos sem ter conta de usuário.
* **Cenário:** Ao selecionar um produto e clicar em "Add to favourites" sem estar **logado**, o site deve apresentar a mensagem "Unauthorized, can not add product to your favorite list.".

### 9. Finaliza Compra sem Conta
* **Descrição:** Adicionar produto ao carrinho e tenta finalizar compra sem ter conta de usuário.
* **Cenário:** Selecionar um produto, adicioná-lo ao carrinho, clicar em "Proceed to checkout", digitar um e-mail e senha de usuário inexistentes, clicar em login. O site deve exibir a mensagem "Invalid email or password" alertando o usuário de que não é possível prosseguir com a compra utilizando credenciais inválidas.

### 10. Página Login no Carrinho
* **Descrição:** Verifica se a página de "Login" é exibida no carrinho corretamente.
* **Cenário:** Ao adicionar um produto no carrinho e clicar em "Proceed to checkout", a página de login do site deve apresentar os campos ['Email address *', 'Password *', 'Login'] e no rodapé da página deve conter dois links, um direcionando para uma página de recuperação de senha e outro para criação de novo usuário.

### 11. Altera Produtos no Carrinho
* **Descrição:** Altera quantidade de produtos dentro do carrinho.
* **Cenário:** Ao adicionar um produto no carrinho e em seguida acessar o carrinho, o site deve exibir o campo "Quantity" contendo o número de produtos que foram adicionados. O campo "Quantity" deve permitir edição para que o usuário adicione ou remova o número desejado de itens do seu carrinho, assim que alterada a quantidade o site deve apresentar a seguinte mensagem "Product quantity updated." porém esse número nunca pode ser menor que 1.

### 12. Preço do Produto
* **Descrição:** Verifica se o preço do produto é o mesmo dentro do carrinho.
* **Cenário:** Ao selecionar um produto e adicioná-lo ao carrinho, o preço do produto apresentado dentro do carrinho deve ser o mesmo apresentado na página de listagem de produtos.

### 13. Valor Total de Produtos 
* **Descrição:** Verifica se o valor total do produto está correto.
* **Cenário:** Ao consultar um carrinho com produtos, o valor apresentado no campo "Total" deve ser igual a soma dos valores de todos os produtos contidos no carrinho.

### 14. Produtos Relacionados
* **Descrição:** Verifica consulta de produtos relacionados.
* **Cenário:** Ao consultar um produto, o site deve exibir na mesma página um campo contendo o título "Related products" e em seguida uma lista de itens que estão contidos dentro da mesma categoria do produto selecionado.
* **Observação:** Para verificar se o produto é relacionado basta observar a categoria da qual ele pertence, se foi adicionado ao carrinho um produto do tipo "Hammer", os produtos relacionados a ele serão outros martelos como "Court Hammer"

### 15. Informações de Produto Relacionado
* **Descrição:** Verifica se é possível acessar um produto novo através dos seus relacionados.
* **Cenário:** Ao consultar um produto, o site deve exibir na mesma página um campo contendo o título "Related products" e em seguida uma lista de itens que estão contidos dentro da mesma categoria do produto. Ao cliar em "More information" de um produto específico, o usuário deve ser redirecionado para a página do produto desejado.

### 16. Desconto de Produtos
* **Descrição:** Verifica desconto no carrinho.
* **Cenário:** Ao adicionar produtos ['Crane', 'Excavator', 'Bulldozer'] no carrinho do qual o preço é de locação por hora, um desconto de 15%  é adicionado automaticamente ao carrinho do usuário somente no caso de existir outros produtos no carrinho que não sejam dessa mesma categoria. O valor total apresentado deve ser a soma dos valores de todos os produtos considerando o desconto.
* **Observação:** Se for adicionado no carrinho somente os produtos ['Crane', 'Excavator', 'Bulldozer'] nenhum desconto será acrescentado, é necessário que contenha um item de locação por hora e mais algum item comum para obter o desconto.

### 17. Locação por Hora
* **Descrição:** Verifica produto do qual o preço é de locação por hora.
* **Cenário:** Ao consultar um produto ['Crane', 'Excavator', 'Bulldozer'] do qual o preço é baseado na locação por hora, o site deve apresentar um slider para que o usuário selecione a quantidade de horas desejadas para aluguel, diferente dos outros produtos, estes não devem apresentar botões de "**-**" e "**+**" pois não é uma compra baseada em quantidade de produtos.

### 18. Valor Total Locação por Hora
* **Descrição:** Verifica se o produto de locação por hora altera valor total do preço da locação
* **Cenário:** Consultar um produto do qual a locação seja vendida por hora ['Crane', 'Excavator', 'Bulldozer'], alterar o valor da locação para um valor maior como '5' por exemplo e verificar se o campo "Total" irá apresentar o valor correto cobrado pelas horas de locação.

### 19. Valor Total de Horas
* **Descrição:** Verifica se o produto de locação por hora altera valor total de duração da locação
* **Cenário:** Consultar um produto do qual a locação seja vendida por hora ['Crane', 'Excavator', 'Bulldozer'], alterar o valor da locação para um valor maior como '5' por exemplo e verificar se o campo "Duration" será alterado para o mesmo valor contido no slider.

### 20. Persistência do Carrinho
* **Descrição:** Verifica se o carrinho mantém os itens após recarregar a página.
* **Cenário:** Adicionar produtos ao carrinho, recarregar a página e verificar se os itens permanecem no carrinho.

### 21. Registra Usuário Inválido
* **Descrição:** Verifica se é possível registrar usuário sem preencher nenhum campo da tela "Customer registration".
* **Cenário:** Acessar a tela de criação de novo usuário "Customer registration", não preencher nenhum dos dados obrigatórios e clicar em "Register". O site deve exibir na tela uma mensagem informando que o preenchimento de todos os campos é obrigatório ['First name', 'Last name', 'Date of Birth', 'Address', 'Postcode', 'City', 'State', 'Country', 'Phone', 'Email address', 'Password'].

### 22. Data Nascimento Inválida
* **Descrição:** Verifica se o campo "Date of Birth" permite somente números
* **Cenário:** Acessar a tela de criação de novo usuário e tentar preencher o campo "Date of Birth" com caracteres inválidos, como letras e símbolos. O site deve permitir somente a inserção de números no campo.

### 23. Idade Máxima Nascimento
* **Descrição:** Verifica se o campo "Date of Birth" valida idade máxima para registro
* **Cenário:** Acessar a tela de criação de novo usuário e preencher o campo "Date of Birth" com uma data de nascimento que esteja acima de 75 anos e clicar em "Register", o site deve apresentar a seguinte mensagem de alerta "Customer must be younger than 75 years old.", impedindo que seja cadastrado um usuário acima da idade máxima permitida.

### 24. Telefone Inválido
* **Descrição:** Verifica se o campo "Phone" permite somente números
* **Cenário:** Acessar a tela de criação de novo usuário e tentar preencher o campo "Phone" com caracteres inválidos, como letras e símbolos. O site deve apresentar a mensagem "Only numbers are allowed.", impedindo que letras e outros caracteres sejam inseridos.

### 25. Senha Inválida 
* **Descrição:** Verifica se o campo "Password" permite somente caracteres válidos
* **Cenário:** Acessar a tela de criação de novo usuário e preencher o campo "Password" com uma senha fraca "abcd", ao clicar em "Register" o site deve exibir a seguinte mensagem "Password must be minimal 6 characters long.
Password can not include invalid characters.".

### 26. Senha Forte
* **Descrição:** Verifica nível de segurança da senha
* **Cenário:** Acessar a tela de criação de novo usuário e preencher o campo "Password" com uma senha muito forte "aB12#;00", o medidor "Password strength" deve apresentar corretamente o nível da senha como "Excellent".

### 27. Registra Usuário Válido
* **Descrição:** Verifica se é possível registrar um novo usuário corretamente 
* **Cenário:** Acessar a tela de criação de novo usuário e preencher corretamente todos os campos obrigatórios, ao clicar em "Register" o site deve registrar o novo usuário sem apresentar erros.

### 28. Login Inválido 
* **Descrição:** Verifica se é possível fazer login com usuário inválido
* **Cenário:** Acessar a página "Sign in", preencher os campos "Email address *" e "Password *" com dados aleatórios que não existem no sistema e em seguida clicar no botão "Login". O site deve exibir a mensagem "Invalid email or password", alertando o usuário de que não é possível fazer login com credenciais inválidas.

### 29. Recupera Senha Inválida
* **Descrição:** Verifica se é possível recuperar senha de um usuário inválido
* **Cenário:** Acessar a página "Forgot Password" e preencher o campo de e-mail com dados aleatórios, após clicar no botão "Set New Password" o site deve apresentar a seguinte mensagem "The selected e-mail is invalid.", impedindo o usuário de fazer reset de senha para um usuário que não existe.

### 30. Login Válido
* **Descrição:** Verifica se é possível fazer login corretamente com usuário válido
* **Cenário:** Acessar a página "Sign in", preencher os campos "Email address *" e "Password *" com dados do usuário cadastrado anteriormente e em seguida clicar no botão "Login", o site deve direcionar o usuário para a página inicial de sua conta "My account".

### 31. Nome do Usuário 
* **Descrição:** Verifica se o nome do usuário é apresentado corretamente na tela incial
* **Cenário:** Ao acessar a tela incial do site estando logado, o nome e sobrenome do usuário deve ser exibido no canto superior direito da tela entre os ícones do carrinho e "Contact".

### 32. Lista de Opções da Conta 
* **Descrição:** Verifica se a lista de funcionalidades da conta é apresentada corretamente
* **Cenário:** Ao acessar a tela "My account", deve ser apresentada a mensagem "Here you can manage your profile, favorites and orders." e também as opções ['Favorites', 'Profile', 'Invoices', 'Messages'].

### 33. Adiciona Favorito
* **Descrição:** Verifica se um item favoritado é acessível através de "My favorites"
* **Cenário:** Ao selecionar um produto e clicar em "Add to favourites", o site deve exibir a seguinte mensagem "Product added to your favorites list." e o produto deve ser salvo e listado posteriormente na funcionalidade "My favorites".

### 34. Duplica Favorito
* **Descrição:** Verifica se um item favoritado é duplicável
* **Cenário:** Ao selecionar um produto já favoritado e clicar em "Add to favourites", o site deve exibir a seguinte mensagem "Product already in your favorites list." e o produto não deve ser adicionado novamente em "My favorites".

### 35. Remove Favorito
* **Descrição:**  Verifica se um item favoritado é removível através de "My favorites"
* **Cenário:** Ao acessar "My favorites" deve ser possível remover um item anteriormente favoritado através do botão "**X**", após isso o site deve deixar de exibir o item na listagem da tela.

### 36. Consulta Perfil
* **Descrição:** Verifica dados apresentados em "My profile"
* **Cenário:** Ao acessar a funcionalidade "My profile" e consultar os dados de usuário, todos os dados listados ['First name', 'Last name', 'Date of Birth', 'Address', 'Postcode', 'City', 'State', 'Country', 'Phone', 'Email address', 'Password'] devem ser exatamente iguais aos dados que foram cadastrados durante a criação da conta de usuário.

### 37. Altera Perfil
* **Descrição:** Verifica se é possível alterar os dados apresentados em "My profile"
* **Cenário:** Ao acessar a funcionalidade "My profile" e modificar algum dado de usuário, após clicar em "Update Profile" os novos dados devem ser salvos sem apresentar erro.

### 38. Altera Senha
* **Descrição:** Verifica se é possível alterar a senha do usuário em "My profile"
* **Cenário:** Acessar a funcionalidade "My profile" e modificar a senha do usuário atual para uma nova senha válida, após clicar em "Change Password" o site deve apresentar a mensagem "Your password is successfully updated!" informando que o usuário alterou sua senha com sucesso, o site também deve fazer logout do usuário.

### 39. Altera a Mesma Senha
* **Descrição:** Verifica se o site impede o usuário de alterar a senha para a senha atual
* **Cenário:** Acessar a funcionalidade "My profile" e modificar a senha do usuário atual para a mesma senha e clicar em "Change Password", o site deve exibir a seguinte mensagem "New Password cannot be same as your current password." informando que a nova senha e a atual não podem ser iguais.

### 40. Envia Contato
* **Descrição:** Verifica se é possível fazer o envio de contato através de "Contact"
* **Cenário:** Acessar a página "Contact", preencher todos os campos corretamente e clicar no botão "Send", após isso o site deve apresentar a mensagem "Thanks for your message! We will contact you shortly." informando que a solicitação de contato foi enviada com sucesso.

### 41. Não Preenche Contato
* **Descrição:** Verifica se é possível fazer o envio de contato com dados inválidos através de "Contact"
* **Cenário:** Acessar a página "Contact", não preencher nenhum dos campos e clicar no botão "Send", após isso o site deve apresentar a mensagem "Subject is required" abaixo do campo "Subject" e "Message is required" abaixo do campo "Message", informando que os dois campos são de preenchimento obrigatório.

### 42. Preeche Contato Errado
* **Descrição:** Verifica se é possível fazer o envio de contato preenchendo o campo "Message" de maneira errada
* **Cenário:** Acessar a página "Contact", escolher uma opção para "Subject" e preencher o campo "Message *" com uma mensagem que contenha menos de 50 caracteres, clicar no botão "Send". O site deve apresentar a mensagem "Message must be minimal 50 characters" alertando que o campo de mensagem está mal preenchido.

### 43. Lista Fatura
* **Descrição:** Verifica se é possível consultar a tela "My invoices"
* **Cenário:** Ao acessar a página "My invoices", devem ser apresentadas as seguintes colunas: "Invoice Number", "Billing Address", "Invoice Date" e "Total". 

### 44. Confere Fatura
* **Descrição:** Verifica se é possível consultar os dados de uma fatura 
* **Cenário:** Ao acessar a página "My invoices", deve ser possível consultar uma fatura específica a partir do botão "Details". Dentro dos detalhes da fatura deve conter um botão para fazer download da mesma em PDF, devem ser exibidas as informações de pagamento, endereço da compra, lista de produtos comprados e os dados gerais da compra informando a data, o valor total e código de fatura.
* **Observação:** Para consultar uma fatura é necessário utilizar uma conta de usuário que contenha faturas no histórico.

### 45. Lista Mensagens
* **Descrição:** Verifica se é possível consultar a tela "My messages"
* **Cenário:** Ao acessar a página "My messages", devem ser exibidas para o usuário as mensagens de sua conta caso existam.

### 46. Faz Logout
* **Descrição:** Verifica se é possível fazer logout do site
* **Cenário:** Estando logado em uma conta, quando o usuário acionar a opção "Sign out" o site deve sair imediatamente de sua conta.

### 47. Faz Compra
* **Descrição:** Verifica se é possível fazer uma compra com sucesso
* **Cenário:** Estando logado em uma conta, o usuário deve adicionar produtos no carrinho. Ao acessar o carrinho, deve-se clicarm em "Proceed to checkout" para prosseguir com a compra, na tela "Sign in" deve ser apresentada uma mensagem informando que o usuário já está logado em sua conta, na página "Billing Address" deve conter os dados que foram cadastrados anteriormente durante a criação de usuário, por último na tela "Payment" deve conter várias opções de pagamento ['Bank Transfer', 'Cash on Delivery', 'Credit Card', 'Buy Now Pay Later', 'Gift Card'] após selecionar uma forma de pagamento e clicar em "Confirm", o site deve informar que o pagamento foi feito com sucesso e informar o número da fatura gerada.

### 48. Recupera Senha Válida
* **Descrição:** Verifica se é possível que um usuário válido recupere sua senha
* **Cenário:** Acessa a tela de cadastro de usuário, clica em "Forgot your Password?", digita o email do usuário e clica em "Set new password". 
* **Observação:** O site não apresenta nenhuma confirmação visual de que a senha foi alterada, então é necessário fazer um novo login para identificar se foi alterada.

### 49. Faz Compra Inválida
* **Descrição:** Verifica se o site impede uma compra quando os dados de pagamento são inválidos
* **Cenário:** Estando logado em uma conta, o usuário deve adicionar produtos no carrinho. Ao acessar o carrinho, deve-se clicarm em "Proceed to checkout" para prosseguir com a compra, na tela "Sign in" deve ser apresentada uma mensagem informando que o usuário já está logado em sua conta, na página "Billing Address" deve conter os dados que foram cadastrados anteriormente durante a criação de usuário, por último na tela "Payment" deve ser escolhida uma das duas seguintes formas de pagamento que exigem preenchimento de informações bancárias ['Bank Transfer', 'Credit Card'], após selecionar uma forma de pagamento e preencher todas as informações de maneira errada e clicar em "Confirm", o site deve informar que o pagamento não pode ser processado e informar os erros de preenchimento.
* **Observação:** Somente as opções ['Bank Transfer', 'Credit Card'] validam os dados de pagamento.

### 50. Registra o Mesmo Usuário
* **Descrição:** Verifica se é possível registrar um usuário mais de uma vez
* **Cenário:** Acessar a tela de criação de novo usuário e preencher todos os campos obrigatórios com informações de um usuário já existente, ao clicar em "Register" o site deve impedir o novo usuário de ser registrado.