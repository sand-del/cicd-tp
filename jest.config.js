module.exports = {
  reporters: [
    'default',
    [
      'jest-allure',
      {
        resultsDir: 'allure-results',
        outputDir: 'allure-report'
      }
    ]
  ]
};