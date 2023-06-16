import { Metaobjects } from '../generated';
import sdk from '../graphql';
import { GetMetaobjectQuery } from '../types/shopify';

type MetaobjectEntry = `metaobjects/${keyof Metaobjects}/${string}`;
type Metaobject = GetMetaobjectQuery['metaobjectByHandle'];

const getAllMetaobjects = async (
  type: keyof Metaobjects,
  endCursor?: string,
  res?: string[],
): Promise<Metaobject[]> => {
  const results = res || [];
  const response = await sdk.GetMetaobjectHandles({ type, after: endCursor });
  const { nodes, pageInfo } = response.metaobjects;
  const result = nodes.map(({ handle }) => handle);
  results.push(...result);
  if (pageInfo.hasNextPage) return getAllMetaobjects(type, pageInfo.endCursor, results);
  return await Promise.all(results.map((handle) => getMetaobject(type, handle)));
};

const getMetaobject = async (type: keyof Metaobjects, handle: string): Promise<Metaobject> => {
  const metaobject = await sdk.GetMetaobject({ handle: { handle, type } });
  return metaobject.metaobjectByHandle;
};

export const getMetaobjects = async (keys: (keyof Metaobjects)[]) => {
  const nodes = await Promise.all(keys.map((key) => getAllMetaobjects(key)));
  const result = nodes.reduce<Record<MetaobjectEntry, Metaobject>>((p, v) => {
    const nodesForKey = v.reduce<Record<MetaobjectEntry, Metaobject>>((pv, cv) => {
      pv[`metaobjects/${cv?.type as keyof Metaobjects}/${cv?.handle || ''}`] = cv;
      return pv;
    }, {});
    return { ...p, ...nodesForKey };
  }, {});
  console.dir(result);
  return result;
};
