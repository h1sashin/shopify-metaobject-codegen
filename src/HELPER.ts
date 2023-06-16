import type { HomepageHero, Metaobjects } from './generated';
import { FetchConfiguration } from './types/config';

export type DefaultMetaobjectsTypes<T extends MetaobjectTypesAreas[]> = {
  [K in T[number]]: K extends 'home_page'
    ? {
        [P in MetaobjectHomePageTypes]: boolean;
      }
    : K extends 'product_page'
    ? {
        [P in MetaobjectProductPageTypes]: boolean;
      }
    : K extends 'shared'
    ? {
        [P in MetaobjectSharedTypes]: boolean;
      }
    : never;
};

export type MetaobjectTypesAreas = 'home_page' | 'product_page' | 'shared';

export type MetaobjectHomePageTypes =
  | 'home_page_additional_banner_to_main_banner'
  | 'home_page_main_banner'
  | 'home_page_home_banner'
  | 'home_page_section_1'
  | 'home_page_section_2'
  | 'home_page_section_3';

export type MetaobjectProductPageTypes = 'pdp_section_1' | 'pdp_section_2';

export type MetaobjectSharedTypes = 'announcement_bar';

export const metaobjectsTypes: DefaultMetaobjectsTypes<MetaobjectTypesAreas[]> = {
  home_page: {
    home_page_additional_banner_to_main_banner: true,
    home_page_main_banner: true,
    home_page_home_banner: true,
    home_page_section_1: true,
    home_page_section_2: true,
    home_page_section_3: true,
  },
  product_page: {
    pdp_section_1: true,
    pdp_section_2: true,
  },
  shared: {
    announcement_bar: true,
  },
};

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
  }, Promise.resolve({}));

  return result;
}

export async function prepareAllMetaobjects(): Promise<any> {
  const metaobjectsKeysArray = Object.entries(metaobjectsTypes).reduce((acc, [key, value]) => {
    const currentAreaTypes = Object.entries(value).reduce((acc, [key, value]) => {
      if (value) {
        acc.push(key);
      }
      return acc;
    }, [] as string[]);
    acc.push(...currentAreaTypes);
    return acc;
  }, [] as string[]);

  const metaobjects = await Promise.all(
    metaobjectsKeysArray.map(async (key) => await getMetaobject(key, undefined, {})),
  );

  return metaobjects.reduce((accumulator, metaobject) => {
    metaobjectsKeysArray.forEach((key) => {
      if (metaobject[key]) {
        const sections = metaobject[key];
        for (const sectionKey in sections) {
          const section = sections[sectionKey];
          accumulator[`metaobjects/${key}/${section.handle}`] = section;
        }
      }
    });
    return accumulator;
  }, {} as any);
}

export const defaultMetaobjectConfig: FetchConfiguration = {
  collection: { fields: ['id', 'handle'] },
  product: { fields: ['id', 'handle'] },
  variant: { fields: ['id'] },
};

export async function getMetaobject(type: string, _key: any, _config?: FetchConfiguration): Promise<any> {}

const dupa = getAssignmentsMetaobjects({
  area: ['home_page', 'product_page', 'shared'],
  getAssignment: (featureId) => {},
  getFromCache: (query) => {
    return {};
  },
});
