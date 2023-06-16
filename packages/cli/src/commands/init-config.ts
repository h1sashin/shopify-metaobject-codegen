import * as fs from 'fs';
import path from 'path';

export const fn = async () => {
  const initialConfig = `
  import type { GeneratorConfig } from '@shopify-metaobject-codegen/config';

  const initialConfig: GeneratorConfig = {
    SHOP_NAME: '',
    API_VERSION: '2023-04',
    ADMIN_API_KEY: ''
  }

  export default initialConfig;
  `;

  fs.writeFileSync(path.resolve(process.cwd(), 'generator.config.ts'), initialConfig);
};
