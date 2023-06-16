import * as dotenv from 'dotenv';
import sdk from './graphql';
import * as fs from 'fs';
import { Generator } from './utils/Generator';

dotenv.config({ path: '../.env' });

const getDefinitions = async () => {
  const {
    metaobjectDefinitions: { nodes },
  } = await sdk.GetDefinitions();
  const generator = new Generator(nodes);
  const parsed = generator.parse();
  fs.writeFileSync('./src/generated.ts', parsed);
};

getDefinitions();
