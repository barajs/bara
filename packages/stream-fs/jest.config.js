module.exports = {
  preset: "ts-jest",
  rootDir: './src',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleDirectories: ['node_modules'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 70,
      lines: 70,
      statements: -30,
    },
  },
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: '../coverage',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/*.+(ts|tsx|js)'],
}
