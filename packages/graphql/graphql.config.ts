import type { CodegenConfig } from '@graphql-codegen/cli';
import { config } from '@shopify-metaobject-codegen/config';
const { SHOP_NAME, API_VERSION, ADMIN_API_KEY } = config;

const graphqlConfig: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [`https://${SHOP_NAME}.myshopify.com/admin/api/${API_VERSION}/graphql.json`]: {
        headers: {
          'X-Shopify-Access-Token': ADMIN_API_KEY,
        },
      },
    },
  ],
  debug: true,
  documents: ['src/requests.graphql'],
  generates: {
    'src/types/index.ts': {
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

export default graphqlConfig;
