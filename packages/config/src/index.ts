import { log } from '@shopify-metaobject-codegen/core';
import { parser } from './parser';
import { RequiredGeneratorConfig } from './types';
import { cosmiconfigSync } from 'cosmiconfig';
import { TypeScriptLoader } from 'cosmiconfig-typescript-loader';
import { generateSearchPlaces } from './utils/generateSearchPlaces';
import { customLoader } from './utils/customLoader';

/**
 * @description
 * Get config from generator.config.ts
 */
export const getConfig = () => {
  try {
    const moduleName = 'generator';
    const configFilePath = process.cwd();
    const packageProp = moduleName;
    const result = cosmiconfigSync(moduleName, {
      packageProp,
      loaders: {
        '.ts': customLoader('ts'),
        '.yml': customLoader('yaml'),
        '.yaml': customLoader('yaml'),
        '.json': customLoader('json'),
        '.js': customLoader('js'),
        '.cjs': customLoader('js'),
        '.mjs': customLoader('js'),
        '.cts': customLoader('ts'),
        '.mts': customLoader('ts'),
        noExt: customLoader('json'),
      },
      searchPlaces: generateSearchPlaces(moduleName),
    }).search(configFilePath);
    if (!result?.filepath) throw new Error('Config file not found, isEmpty');
    return <RequiredGeneratorConfig>parser(result.config);
  } catch (e) {
    if (e instanceof Error) log('error', e.message);
    log('error', 'Unknown error occured');
  }
};

export type { GeneratorConfig } from './types';
