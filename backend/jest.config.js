/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage/jest-reports/',
  collectCoverage: true,
  collectCoverageFrom: ['src/controllers/**/*.{js,ts}', 'src/utils/**/*.{js,ts}'],
  coverageReporters: ['html-spa'],
  clearMocks: true,
  coverageProvider: 'v8',
}; 