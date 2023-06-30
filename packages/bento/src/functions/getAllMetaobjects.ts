import { GetMetaobjectQuery, generateSdk } from '@shopify-metaobject-codegen/graphql';

type Metaobject = GetMetaobjectQuery['metaobjectByHandle'];

/**
 * @param type - type of metaobjects to get
 * @param endCursor - cursor for pagination
 * @param res - array of metaobjects
 * @returns array of metaobjects
 */
export const getAllMetaobjects = async <T>(
  type: keyof T,
  endCursor?: string,
  res?: string[],
): Promise<Metaobject[]> => {
  const sdk = generateSdk();
  const results = res || [];
  await new Promise((resolve) => setTimeout(resolve, 400));
  const response = await sdk.GetMetaobjectHandles({ type: type as string, after: endCursor });
  const { nodes, pageInfo } = response.metaobjects;
  const result = nodes.map(({ handle }) => handle);
  results.push(...result);
  if (pageInfo.hasNextPage) return getAllMetaobjects(type, pageInfo.endCursor, results);
  return await Promise.all(results.map((handle) => getMetaobject(sdk, type, handle)));
};

/**
 * @param type - type of metaobjects to get
 * @param handle - handle of metaobject to get
 * @returns metaobject
 */
const getMetaobject = async <T>(sdk: any, type: keyof T, handle: string): Promise<Metaobject> => {
  const metaobject = await sdk.GetMetaobject({ handle: { handle, type } });
  return metaobject.metaobjectByHandle;
};

export const getMetaobjects = async <T>(keys: (keyof T)[]) => {
  const nodes = await Promise.all(keys.map((key) => getAllMetaobjects(key)));
  const result = nodes.reduce<Record<string, Metaobject>>((p, v) => {
    const nodesForKey = v.reduce<Record<string, Metaobject>>((pv, cv) => {
      pv[`metaobjects/${cv?.type}/${cv?.handle}`] = cv;
      return pv;
    }, {});
    return { ...p, ...nodesForKey };
  }, {});
  return result;
};
