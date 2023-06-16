import { parser } from './parser';
import { RequiredGeneratorConfig } from './types';
import { cosmiconfigSync } from 'cosmiconfig';

export const getConfig = () => {
  try {
    cosmiconfigSync('generator', {});
    const result = cosmiconfigSync('generator', {
      searchPlaces: [`generator.config.ts`],
      loaders: {
        '.ts': (filepath) => {
          const config = require(filepath);
          return { config };
        },
      },
    }).search();
    if (!result?.filepath) {
      throw new Error('Config file not found, isEmpty');
    }
    return parser(result.config) as RequiredGeneratorConfig;
  } catch (e) {
    throw e;
  }
};

export { GeneratorConfig } from './types';
