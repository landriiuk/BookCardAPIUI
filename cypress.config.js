const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    env: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    }
  },
});
