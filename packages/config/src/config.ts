import { GeneratorConfig } from './types';

export class Config {
  generatorConfig: GeneratorConfig;
  constructor(config: GeneratorConfig) {
    this.generatorConfig = config;
  }

  set setconfig(config: GeneratorConfig) {
    this.generatorConfig = config;
  }

  get getconfig(): GeneratorConfig {
    return this.generatorConfig;
  }
}
