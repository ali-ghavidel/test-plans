const { defineConfig } = require("cypress");
const installLogsCollector = require('cypress-log-to-output').install;
module.exports = defineConfig({
  projectId: 'how99y',
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
      return config;
    },
  },
});