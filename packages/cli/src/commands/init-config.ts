import * as fs from 'fs';
import path from 'path';

export const fn = async () => {
  const initialConfig = `
  import { CeneratorConfig } from '@shopify-metaobject-codegen/core';

  const initialConfig: CeneratorConfig = {
    SHOP_NAME: '',
    API_VERSION: '2023-04',
    ADMIN_API_KEY: ''
  }

  export default initialConfig;
  `;

  fs.writeFileSync(path.resolve(process.cwd(), 'generator.config.ts'), initialConfig);
};
