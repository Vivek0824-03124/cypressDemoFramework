const { defineConfig } = require("cypress");
const { configureVisualRegression } = require("cypress-visual-regression");

const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  projectId: "5q61va",
  e2e: {
    setupNodeEvents(on, config) {
      // task to delete the exiting folder
      on("task", {
        deleteFolder(folderPath) {
          if (fs.existsSync(folderPath)) {
            fs.rmSync(folderPath, { recursive: true, force: true });
            console.log(`Deleted folder: ${folderPath}`);
          }
          return null;
        },
      });
      configureVisualRegression(on);
    },
    screenshotsFolder: "./cypress/snapshots/actual",
    env: {
      visualRegressionType: "regression", // Type of regression test (regression or base)
      visualRegressionGenerateDiff: "fail", // Only generate diff image on failure
    },
    watchForFileChanges: false,
    defaultCommandTimeout: 5000,
  },
});
