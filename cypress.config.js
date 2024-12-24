const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 6000, // Aumenta para 6 segundos o tempo máximo de espera para um resposta
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
