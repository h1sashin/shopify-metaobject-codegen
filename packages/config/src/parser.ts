import { GeneratorConfig } from './types';

const configFields: Record<keyof GeneratorConfig, { required?: boolean; regex?: RegExp; defaultValue?: string }> = {
  ADMIN_API_KEY: {
    required: true,
    regex: /^shpat_[a-z0-9]+$/g,
  },
  API_VERSION: {
    required: true,
    regex: /^\d{4}-(0[1-9]|1[0-2])$/g,
  },
  SHOP_NAME: {
    required: true,
    regex: /^[a-z0-9\-]+\.myshopify\.com$/g,
  },
  file: {
    defaultValue: 'metaobject-definitions.ts',
  },
};

export const parser = (config: Record<string, string>): GeneratorConfig => {
  const errors: string[] = [];
  const parsedConfig: GeneratorConfig = {} as GeneratorConfig;
  for (const [key, value] of Object.entries(config)) {
    if (key in configFields) {
      const { regex, required, defaultValue } = configFields[key as keyof GeneratorConfig];
      if (required && !value) errors.push(`Config field ${key} is required`);
      else if (regex && !value.match(regex)) errors.push(`Config field ${key} has invalid value, expected ${regex}`);
      else
        parsedConfig[key as keyof GeneratorConfig] = (value as GeneratorConfig[keyof GeneratorConfig]) || defaultValue!;
    }
  }
  const requiredKeys = Object.entries(configFields)
    .filter(([, { required }]) => required)
    .map(([key]) => key);
  const missingKeys = requiredKeys.filter((key) => !(key in parsedConfig));
  if (missingKeys.length) errors.push(`Config fields ${missingKeys.join(', ')} are required`);
  if (errors.length) {
    console.log('error', errors.join('\n'));
    process.exit(1);
  }
  return parsedConfig;
};
