module.exports = {
  // Support ES modules
  transform: {},
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  testMatch: ['**/tests/**/*.test.js'],
  coverageThreshold: {
    global: {
      lines: 70
    }
  }
}; 