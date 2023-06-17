import { parser } from './parser';
import { RequiredGeneratorConfig } from './types';
import { cosmiconfigSync } from 'cosmiconfig';
import { TypeScriptLoader } from 'cosmiconfig-typescript-loader';

/**
 * @description
 * Get config from generator.config.ts
 */
export const getConfig = () => {
  try {
    cosmiconfigSync('generator', {});
    const result = cosmiconfigSync('generator', {
      searchPlaces: [`generator.config.ts`],
      loaders: {
        '.ts': TypeScriptLoader(),
      },
    }).search();
    if (!result?.filepath) throw new Error('Config file not found, isEmpty');
    return parser(result.config) as RequiredGeneratorConfig;
  } catch (e) {
    throw e;
  }
};

export type { GeneratorConfig } from './types';
