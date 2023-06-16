import { getMetaobjects } from './utils/parser';
import * as fs from 'fs';

const getMetaobjectsFn = async () => {
  const metaobjects = await getMetaobjects(['homepage_hero', 'lists', 'test']);

  fs.writeFileSync('./local-cache.json', JSON.stringify(metaobjects, null, 2));
};

getMetaobjectsFn();
