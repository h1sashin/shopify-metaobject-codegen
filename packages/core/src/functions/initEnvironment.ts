import * as dotenv from 'dotenv';
import path from 'path';

export const initEnvironment = () => {
  console.log(__dirname);
  dotenv.config({ path: path.resolve(process.cwd(), '../../../../.env') });
  console.log('siema', process.env.SHOPIFY_SHOP_NAME);
};

console.log(process.cwd());
