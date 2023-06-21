import { Generator, log } from '@shopify-metaobject-codegen/core';
import { getConfig } from '@shopify-metaobject-codegen/config';
import { generateSdk } from '@shopify-metaobject-codegen/graphql';
import * as fs from 'fs';
import path from 'path';

export const fn = async () => {
  try {
    const sdk = generateSdk();
    const config = getConfig();
    log('info', 'Getting definitions');
    const {
      metaobjectDefinitions: { nodes },
    } = await sdk.GetDefinitions();
    log('info', 'Generating definitions');
    const generator = new Generator(nodes);
    const parsed = generator.parse();
    fs.writeFileSync(path.resolve(process.cwd(), config?.file ?? '.generatorrc'), parsed);
    log('success', 'Definitions generated');
  } catch (e) {
    if (e instanceof Error) log('error', e.message);
    else log('error', 'Something went wrong');
  }
};
