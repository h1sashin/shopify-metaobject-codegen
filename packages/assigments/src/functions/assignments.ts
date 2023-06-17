import { MetaobjectDefinition } from '@shopify-metaobject-codegen/graphql';
import { GetFromCache, OutsmartlyRenderContext } from '@shopify-metaobject-codegen/bento';

/**
 * @param area - area of metaobjects to get
 * @param getAssignment - function that returns assignment for a given featureID
 * @param getFromCache - function that returns data from cache
 * @returns object with typed metaobjects for selected sections
 */
export async function getAssignmentsMetaobjects<K extends keyof MetaobjectDefinition>({
  getAssignment,
  getFromCache,
  types,
}: {
  getAssignment: OutsmartlyRenderContext['getAssignment'];
  getFromCache: GetFromCache;
  types: (keyof MetaobjectDefinition)[];
}) {
  return await Promise.all(
    types.map(async (type) => {
      const assignment = getAssignment(type);
      if (!assignment) return null;
      const metaobject = await getFromCache(['metaobjects', type, assignment] as unknown as [string, string]);
      return metaobject;
    }),
  );
}
