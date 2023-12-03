const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const environmentName = config.env.environmentName || 'bookCard'
      const environmentFilename = `./${environmentName}.settings.json`
      console.log('loading %s', environmentFilename)
      const settings = require(environmentFilename)
      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl
      }
      if(settings.specPattern){
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
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: true,
    json: true,
  },
  },
});
