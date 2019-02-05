module.exports = {
  browser: true,
  setupFiles: ['<rootDir>/test/_setup.js'],
  runner: '@jest-runner/electron',
  testEnvironment: '@jest-runner/electron/environment',
}
