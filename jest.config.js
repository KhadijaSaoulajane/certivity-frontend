// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { defaults } = require('jest-config');
// eslint-disable-next-line no-undef
module.exports = {
    roots: ['src'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['<rootDir>/src/**/*.(test|spec).(tsx)'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{tsx}'],
    coverageDirectory: 'test-report/coverage',
    coverageReporters: ["clover", "json", "lcov", "text", "text-summary", "cobertura"],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    setupFilesAfterEnv: ['jest-extended/all'],
    coverageThreshold: {
        global: {
            functions:100, branches:100, lines:100, statements:100
        }}
};