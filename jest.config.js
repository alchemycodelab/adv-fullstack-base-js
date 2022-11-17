/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  extensionsToTreatAsEsm: ['.jsx'],
  preset: 'ts-jest',
  setupFiles: ['dotenv/config', './setup-tests.js'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    './setup-tests-after.ts',
  ],
  "moduleFileExtensions": [
    "js",
    "jsx"
  ],
  maxWorkers: 1,
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/', // The default, but keep it here since we're overriding.
    '/dist', // Do not test files we've transpiled.
    '/public', // Do not test files we've transpiled.
  ],
  transform: {
    '^.+\\.jsx?': 'babel-jest',
  },
}
