import { Generator, getDefinitions } from '@shopify-metaobject-codegen/core';
import { getConfig } from '@shopify-metaobject-codegen/config';
import * as fs from 'fs';
import path from 'path';
const { file } = getConfig();

export const fn = async () => {
  try {
    console.log('Generating definitions...');
    const definitions = await getDefinitions();
    const generator = new Generator(definitions);
    const parsed = generator.parse();
    fs.writeFileSync(path.resolve(process.cwd(), file), parsed);
  } catch (e) {
    if (e instanceof Error) console.error(e.message);
    else console.error('Something went wrong!');
  }
};
