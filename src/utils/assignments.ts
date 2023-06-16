import {
  MetaobjectTypesAreas,
  MetaobjectHomePageSections,
  MetaobjectSharedSections,
  metaobjectsTypes,
} from '../cache-simulator';
import { Metaobjects } from '../generated';

export type MetaobjectsTypes<T extends MetaobjectTypesAreas[]> = {
  [K in T[number]]: K extends 'home_page'
    ? MetaobjectHomePageTypes
    : K extends 'product_page'
    ? MetaobjectSharedTypes
    : K extends 'shared'
    ? MetaobjectSharedTypes
    : never;
};
export type MetaobjectHomePageTypes = Pick<Metaobjects, MetaobjectHomePageSections>;

export type MetaobjectSharedTypes = Pick<Metaobjects, MetaobjectSharedSections>;

/**
 * @param area - area of metaobjects to get
 * @param getAssignment - function that returns assignment for a given featureID
 * @param getFromCache - function that returns data from cache
 * @returns object with typed metaobjects for selected sections
 */
export async function getAssignmentsMetaobjects<K extends keyof Metaobjects, T extends MetaobjectTypesAreas[]>({
  area,
  getAssignment,
  getFromCache,
}: {
  area: T;
  getAssignment: (featureId: string) => string | null;
  getFromCache: {
    <F extends K>(query: ['metaobjects', F, string]): Promise<Metaobjects[F]>;
  };
}) {
  const currentAreas = area as MetaobjectTypesAreas[];
  const result = await currentAreas.reduce(async (acc, currentArea) => {
    const types = Object.keys(metaobjectsTypes[currentArea]);
    const currentAreaMetaobjects = await types.reduce(async (acc, key) => {
      const assignment = getAssignment(key);
      let metaobject;
      if (assignment) {
        try {
          metaobject = await getFromCache(['metaobjects', key as K, assignment]);
        } catch {
          metaobject = null;
        }
      }
      return {
        ...(await acc),
        [key]: metaobject,
      };
    }, Promise.resolve({}));

    return {
      ...(await acc),
      [currentArea]: currentAreaMetaobjects,
    };
  }, Promise.resolve({}) as Promise<MetaobjectsTypes<T>>);
  return result;
}
