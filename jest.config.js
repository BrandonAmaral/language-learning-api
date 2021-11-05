module.exports = {
  roots: ['<rootDir>/tests'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**', '!<rootDir>/src/presentation/errors/**'],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  coveragePathIgnorePatterns: ['index.ts'],
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
