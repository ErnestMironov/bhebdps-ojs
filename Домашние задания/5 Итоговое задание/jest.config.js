export default {
    // Support ES modules
    transform: {},
    extensionsToTreatAsEsm: ['.js'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/index.js'
    ]
};
