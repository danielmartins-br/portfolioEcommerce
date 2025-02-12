### Automação de Testes para E-commerce

![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Projeto desenvolvido para automação de testes utilizando Cypress. Este repositório contém scripts de testes para verificar as funcionalidades de um site de e-commerce, incluindo fluxos de compra, navegação e gerenciamento de contas.

O meu objetivo principal com o projeto é aprender a utilizar Cypress e praticar o conteúdo visto no curso da escola "Talking About Testing".

#### Funcionalidades
- Teste de Navegação no Site (https://practicesoftwaretesting.com/)
- Testes automatizados para validação de funcionalidades principais.
- Scripts para verificar fluxos críticos, como finalização de compras e navegação entre páginas.
- Configuração de ambiente e exemplos de comandos personalizados.
- ~~Integração com APIs para consultas e validações de dados.~~

#### Tecnologias Usadas
- [Node.js](https://nodejs.org)
- [Cypress](https://www.cypress.io)

#### Estrutura do Repositório
*  **cypress/**: Diretório com os testes organizados por funcionalidade.
* **documentation** Documentação do projeto.
*  **e2e/**: Testes end-to-end.
*  **support/**: Comandos e configurações auxiliares para os testes.
*  **cypress.config.js**: Configuração do Cypress.
*  `README.md`: Descrição do projeto.
*  **package.json**: Gerenciamento de dependências do projeto.

#### Pré-requisitos
- Node.js e npm instalados.
- Cypress configurado no ambiente local.

#### Documentação do Projeto
A documentação para todos os casos de teste implementados encontra-se na pasta ```cypress\documentation\```

#### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/danielmartins-br/portfolioEcommerce.git
2. Acesse a pasta do projeto:
   ```bash
   cd portfolioEcommerce
3. Dentro da pasta instale as dependências:
   ```bash
   npm install
4. Execute o Cypress:
   ```bash
   npx cypress open
5. Dentro do Cypress selecione:
   ```bash
   E2E Testing
6. Selecione um browser:
   ```bash
   Chrome
7. Clique em:
   ```bash
   Start E2E Testing in Chrome
8. Dentro de **Specs** selecione o teste que deseja executar:
   ```bash
   Exemplo: cypress/e2e/NavegacaoSiteSpec.cy.js

#### Formas de Executar o Projeto
Existem várias formas de executar os testes, estando dentro da pasta **portfolioEcommerce** o usuário pode utilizar os seguintes métodos:

* Interface de Linha de Comando (CLI):
Utilize o comando ```npx cypress run``` no terminal. **Dentre todas as opções de execução, essa é a forma padrão.**
Este método é adequeado para execuções em ambientes de integração contínua ou para quem deseja executar todos os testes de uma única vez, ao final da execução de cada teste será gerado um vídeo e capturas de tela da execução do mesmo caso tenha ocorrido alguma falha. Esse comando também permite que o usuário execute os testes usando um navegador específico, basta passar ```--browser``` como parâmetro e em seguida o nome do navegador.
Exemplos: 
```npx cypress run --browser chrome```
```npx cypress run --browser firefox```
---
* Modo Interativo (GUI):
Execute o comando ```npx cypress open``` no terminal para abrir a interface gráfica do Cypress.
Esse modo permite que o usuário selecione e execute os testes de maneira interativa, assim é possível assistir a execução de cada teste pelo navegador, esse modo também é útil nos casos onde um teste está falhando e não se sabe a causa exata, então através dele é possível observar tudo que está sendo feito na tela.
---
* Execução de Testes em Modo Headless:
Adicione a opção ```--headless``` para executar os testes sem abrir a interface do navegador.
Ao executar testes em modo headless, não há sobrecarga visual, o que pode tornar a execução mais rápida. Isso é útil quando há um grande conjunto de testes a serem executados e a velocidade de execução é crucial.
Exemplo: ```npx cypress run --headless```
---
* Execução de Testes Específicos:
Utilize no terminal o comando ```npx cypress run --spec``` para executar arquivos de testes específicos.
Isso é útil ao trabalhar em testes individuais durante o desenvolvimento.
Exemplo: ```npx cypress run --spec cypress/e2e/nome-do-arquivo-spec.js```

##### 🗨️ Nota do Desenvolvedor:
* O projeto agora possui documentação e 56 casos de teste que verificam funcionalidades de navegação do site. Esses testes garantem que elementos como produtos e campos de dados do usuário sejam exibidos corretamente em tela, mas não incluem interações como adicionar produtos ao carrinho ou criar contas.
* Foram desenvolvidos mais 55 testes adicionais cobrindo fluxos completos do site, incluindo criação de usuário, compra de produto, alteração de senha, atualização de dados, entre outros.
* Foi observado que muitos dos problemas que tive durante o desenvolvimento foi por falta de uma base sólida em Javascript, futuramente terei que focar os estudos nessa linguagem para melhorar a qualidade de escrita dos testes.

  **📃 Lista das próximas melhorias:**
   * [X] - ~~Criação de documentação para cada caso de teste referente a navegação no site~~
   * [ ] - Implementação de Page Objects Model para melhorar a legibilidade/organização dos testes
   * [X] - ~~Criar novos casos de teste contemplando mais funcionalidades de navegação no site~~
   * [X] - ~~Criar novos casos de teste que interagem diretamente com as funcionalidades de fluxo do site (criar usuário, preencher carrinho...)~~
   * [X] - ~~Criar documentação para cada um dos novos casos de teste de interação com as funcionalidades de fluxo do site~~
   * [X] - ~~Remover código duplicado dos testes de navegação do site~~
   * [X] - ~~Remover código duplicado dos testes de fluxos do site~~
   * [ ] - Transformar em comando personalizado as mensagens de erro/sucesso, isso irá permitir uma manipulação melhor delas em cada teste.
   * [ ] - Criar documentação para os casos de teste referente ao usuário administrador do site.
   * [ ] - Implementar os casos de teste referente ao administrador do site.
