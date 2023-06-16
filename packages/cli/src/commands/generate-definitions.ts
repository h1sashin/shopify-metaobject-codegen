import { sdk } from '@shopify-metaobject-codegen/graphql';
import { Generator } from '@shopify-metaobject-codegen/core';
import * as fs from 'fs';
import path from 'path';
import { getConfig } from '@shopify-metaobject-codegen/config';
const { file } = getConfig();

export const fn = async () => {
  try {
    console.log('Generating definitions...');
    const {
      metaobjectDefinitions: { nodes },
    } = await sdk.GetDefinitions();
    const generator = new Generator(nodes);
    const parsed = generator.parse();
    fs.writeFileSync(path.resolve(process.cwd(), file), parsed);
  } catch (e) {
    if (e instanceof Error) console.error(e.message);
    else console.error('Something went wrong!');
  }
};
