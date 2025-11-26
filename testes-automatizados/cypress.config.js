const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.baseUrl || "http://localhost:5173",

    setupNodeEvents(on, config) {
      // Integrate @cypress/grep plugin for filtering tests by tags
      const { plugin: cypressGrepPlugin } = require("@cypress/grep/plugin");
      cypressGrepPlugin(config);

      return config;
    },

    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/index.js",
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    downloadsFolder: "cypress/downloads",

    // Retry configuration
    retries: {
      runMode: 1,
      openMode: 0,
    },

    // Video and screenshot configuration
    video: true,
    videoOnFailOnly: true,
    screenshotOnRunFailure: true,
    viewportHeight: 1080,
    viewportWidth: 1920,

    // Performance optimizations
    numTestsKeptInMemory: 30,
    experimentalMemoryManagement: true,
  },

  // Global environment variables
  env: {
    baseApiUrl: process.env.baseApiUrl || "http://localhost:3000/api",
  },
});
