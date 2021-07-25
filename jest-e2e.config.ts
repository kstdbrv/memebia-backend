import type { Config } from '@jest/types';

import baseConfig from './jest.config';

const config: Config.InitialOptions = {
  ...baseConfig,
  maxConcurrency: 0,
  coverageDirectory: './coverage/e2e',
  coverageReporters: ['lcov', 'html', 'text'],
  testRegex: '.e2e-spec.ts$',
};

export default config;
