import { log } from '@shopify-metaobject-codegen/core';
import { defaultLoadersSync } from 'cosmiconfig';
import { env } from 'string-env-interpolation';
import yaml from 'yaml';
import jiti from 'jiti';

export const customLoader = (ext: 'json' | 'yaml' | 'js' | 'ts') => (filepath: string, content: string) => {
  if (typeof process !== 'undefined' && 'env' in process) content = env(content);
  if (ext === 'json') return defaultLoadersSync['.json'](filepath, content);
  if (ext === 'yaml') {
    try {
      const result = yaml.parse(content);
      return result;
    } catch (e) {
      if (e instanceof Error) log('error', `YAML Error in ${filepath}: ${e.message}`);
      log('error', `YAML Error in ${filepath}: Unknown error`);
    }
  }
  if (ext === 'js') return defaultLoadersSync['.js'](filepath, content);
  if (ext === 'ts') {
    const jitiLoader = jiti('', { interopDefault: true });
    return jitiLoader(filepath);
  }
};
