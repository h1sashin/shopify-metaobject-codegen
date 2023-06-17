// import { GetMetaobjectQuery, generateSdk } from '@shopify-metaobject-codegen/graphql';
// type Metaobjects = {};
// type MetaobjectEntry = `metaobjects/${keyof Metaobjects}/${string}`;
// type Metaobject = GetMetaobjectQuery['metaobjectByHandle'];

// /**
//  * @param type - type of metaobjects to get
//  * @param endCursor - cursor for pagination
//  * @param res - array of metaobjects
//  * @returns array of metaobjects
//  */
// const getAllMetaobjects = async (
//   type: keyof Metaobjects,
//   endCursor?: string,
//   res?: string[],
// ): Promise<Metaobject[]> => {
//   const sdk = generateSdk();
//   const results = res || [];
//   await new Promise((resolve) => setTimeout(resolve, 400));
//   const response = await sdk.GetMetaobjectHandles({ type, after: endCursor });
//   const { nodes, pageInfo } = response.metaobjects;
//   const result = nodes.map(({ handle }) => handle);
//   results.push(...result);
//   if (pageInfo.hasNextPage) return getAllMetaobjects(type, pageInfo.endCursor, results);
//   return await Promise.all(results.map((handle) => getMetaobject(sdk, type, handle)));
// };

// /**
//  * @param type - type of metaobjects to get
//  * @param handle - handle of metaobject to get
//  * @returns metaobject
//  */
// const getMetaobject = async (sdk: any, type: keyof Metaobjects, handle: string): Promise<Metaobject> => {
//   const metaobject = await sdk.GetMetaobject({ handle: { handle, type } });
//   return metaobject.metaobjectByHandle;
// };
// export const getMetaobjects = async (keys: (keyof Metaobjects)[]) => {
//   const nodes = await Promise.all(keys.map((key) => getAllMetaobjects(key)));
//   const result = nodes.reduce<Record<MetaobjectEntry, Metaobject>>((p, v) => {
//     const nodesForKey = v.reduce<Record<MetaobjectEntry, Metaobject>>((pv, cv) => {
//       pv[`metaobjects/${cv.type as keyof Metaobjects}/${cv.handle}`] = cv;
//       return pv;
//     }, {});
//     return { ...p, ...nodesForKey };
//   }, {});
//   return result;
// };
