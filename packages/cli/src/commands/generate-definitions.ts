import { sdk } from '@shopify-metaobject-codegen/graphql';
import { Generator } from '@shopify-metaobject-codegen/core';
import * as fs from 'fs';

export const cmd = 'generate-definitions';
export const fn = async () => {
  const {
    metaobjectDefinitions: { nodes },
  } = await sdk.GetDefinitions();
  const generator = new Generator(nodes);
  const parsed = generator.parse();
  fs.writeFileSync('./src/generated.ts', parsed);
  return 'Definitions generated!';
};
