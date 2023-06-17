type GetFromCache = (
  path: [string, string, string] | [string, string] | [string],
) => Promise<[string, string, string] | [string, string] | [string]>;
type GetAssignment = (featureId: string) => string | null;

/**
 * @param area - area of metaobjects to get
 * @param getAssignment - function that returns assignment for a given featureID
 * @param getFromCache - function that returns data from cache
 * @returns object with typed metaobjects for selected sections
 */
export async function getAssignmentsMetaobjects<T, K extends keyof T>({
  getAssignment,
  getFromCache,
  types,
}: {
  getAssignment: GetAssignment;
  getFromCache: GetFromCache;
  types: K[];
}) {
  const metaobjects = await Promise.all(
    types.map(async (type) => {
      const assignment = getAssignment(type as string);
      if (!assignment) return null;
      const metaobject = await getFromCache(['metaobjects', type as string, assignment]);
      return metaobject;
    }),
  );
  return metaobjects.reduce((acc, metaobject, index) => {
    const type = types[index];
    acc[type] = metaobject as T[K];
    return acc;
  }, {} as Record<K, T[K]>);
}
