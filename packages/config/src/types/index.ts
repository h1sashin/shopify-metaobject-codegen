export interface GeneratorConfig {
  SHOP_NAME: string;
  API_VERSION: string;
  ADMIN_API_KEY: string;
  file?: string;
  typePrefix?: string;
  typeSuffix?: string;
  maybeValue?: string;
}

type Required<T> = {
  [P in keyof T]-?: T[P];
};

export type RequiredGeneratorConfig = Required<GeneratorConfig>;
