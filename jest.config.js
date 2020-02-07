module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/result/jest/coverage',
  coverageReporters: ['html'],
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./src/**/*.d.ts',
    '!./src/**/*.spec.ts',
    '!./src/**/*.test.ts',
    '!./src/**/__*__/*',
  ],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './result/jest/html-report',
        filename: 'report.html',
        expand: true,
      },
    ],
  ],
};
