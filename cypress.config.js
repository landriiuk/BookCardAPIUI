const { defineConfig } = require("cypress");
require('dotenv').config();
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  e2e: {
    experimentalWebKitSupport: true,
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
      const environmentName = config.env.environmentName || 'bookCart'
      const environmentFilename = `./${environmentName}.settings.json`
      console.log('loading %s', environmentFilename)
      const settings = require(environmentFilename)
      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl
      }
      if (settings.specPattern) {
        config.specPattern = settings.specPattern
      }
      if (settings.env) {
        config.env = {
          ...config.env,
          ...settings.env,
        }
      }
      console.log('loaded settings for environment %s', environmentName)

      return config
    },
    env: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    },
    // projectId: "9cxh5i",
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: true,
      json: true,
    },
  },
});
