const { defineConfig } = require("cypress");
require('dotenv').config();
const cucumber = require('cypress-cucumber-preprocessor').default
import { configurePlugin } from "cypress-mongodb";

module.exports = defineConfig({
  e2e: {
    experimentalWebKitSupport: true,
    chromeWebSecurity: false,
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
      configurePlugin(on);
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--incognito");
        }
        return launchOptions;
      });
      return config
    },
    env: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
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
