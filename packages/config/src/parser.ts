import { GeneratorConfig } from './types';

const configFields: Record<keyof GeneratorConfig, { required: boolean }> = {
  ADMIN_API_KEY: {
    required: true,
  },
  API_VERSION: {
    required: true,
  },
  SHOP_NAME: {
    required: true,
  },
};

export const parser = (config: Record<string, unknown>): GeneratorConfig => {
  const errors: string[] = [];
  const parsedConfig: GeneratorConfig = {} as GeneratorConfig;
  for (const [key, value] of Object.entries(config)) {
    if (configFields[key as keyof GeneratorConfig].required && !value) errors.push(`Config field ${key} is required`);
    if (key in configFields)
      parsedConfig[key as keyof GeneratorConfig] = value as GeneratorConfig[keyof GeneratorConfig];
  }
  if (errors.length) throw new Error(errors.join('\n'));
  return parsedConfig;
};
