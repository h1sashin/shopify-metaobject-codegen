import { cosmiconfig } from 'cosmiconfig';
import { Config } from './config';
import { parser } from './parser';
import { GeneratorConfig } from './types';

const explorer = cosmiconfig('generator');

const getConfig = async () => {
  try {
    const cfg = await explorer.search();
    if (!cfg || cfg.isEmpty) throw new Error('Config not found');
    return cfg.config;
  } catch {
    console.error('Config not found, please run `generator init` to create config template');
  }
};

export const config = await getConfig().then<GeneratorConfig>((cfg) => new Config(parser(cfg)).generatorConfig);
