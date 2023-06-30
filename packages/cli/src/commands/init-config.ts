import { log } from '@shopify-metaobject-codegen/core';
import * as fs from 'fs';
import path from 'path';
import { Extensions } from '../types/extensions';

export const fn = async (extension: Extensions = Extensions.json, suffix: boolean) => {
  log('info', 'Generating config file');
  const configsDir = path.resolve(__dirname, '..', 'configs');
  try {
    const possibleConfigFiles = Object.values(Extensions)
      .map((ext) => [`.generatorrc.${ext}`, `generator.config.${ext}`])
      .concat(['.generatorrc', 'generator.config'])
      .flat();
    const existingConfigFile = possibleConfigFiles.some((file) => fs.existsSync(path.resolve(process.cwd(), file)));
    if (existingConfigFile) throw new Error('Config file already exists');
    const configFile = fs.readdirSync(configsDir).find((file) => file === `config.${extension}`);
    if (!configFile) throw new Error('Extension not supported');
    const config = fs.readFileSync(path.resolve(configsDir, configFile));
    const fileName = suffix ? `.generatorrc.${extension}` : `generator.${extension}`;
    fs.writeFileSync(path.resolve(process.cwd(), fileName), config);
    log('success', 'Config file generated');
    log('warning', 'Do not forget to fill it!');
  } catch (e) {
    if (e instanceof Error) log('error', e.message);
    else log('error', 'Something went wrong');
  }
};
