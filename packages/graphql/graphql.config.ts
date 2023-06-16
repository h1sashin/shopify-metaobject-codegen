import type { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [`https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`]:
        {
          headers: {
            'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN || '',
          },
        },
    },
  ],
  debug: true,
  documents: ['src/requests.graphql'],
  generates: {
    'src/types/shopify.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        maybeValue: 'T | undefined',
        scalars: {
          Color: 'string',
          DateTime: 'Date',
          HTML: 'string',
          Decimal: 'number',
          JSON: 'Record<string, unknown>',
          URL: 'string',
          UnsignedInt64: 'number',
        },
      },
    },
  },
};

export default config;