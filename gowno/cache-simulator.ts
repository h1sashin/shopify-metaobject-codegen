// import { Metaobjects } from './generated';
// import { MetaobjectsTypes, getAssignmentsMetaobjects } from './utils/assignments';
// import { getMetaobjects } from './utils/parser';
// import * as fs from 'fs';

// export type MetaobjectTypesAreas = 'home_page' | 'product_page' | 'shared';

// export type MetaobjectHomePageSections =
//   | 'home_page_additional_banner_to_main_banner'
//   | 'home_page_section_2'
//   | 'home_page_section_3';

// export type MetaobjectProductSections = 'pdp_section_1' | 'pdp_section_2';

// export type MetaobjectSharedSections = 'announcements_bar';

// export const metaobjectsTypes: MetaobjectsTypes<MetaobjectTypesAreas[]> = {
//   home_page: {
//     home_page_additional_banner_to_main_banner: null,
//     home_page_section_2: null,
//     home_page_section_3: null,
//   },
//   shared: {
//     announcements_bar: null,
//   },
// };

// export const getMetaobjectsFn = async () => {
//   // ## SAVING DATA TO LOCAL CACHE ##
//   const allKeys = Object.values(metaobjectsTypes).reduce<(keyof Metaobjects)[]>((p, v) => {
//     const keys = Object.keys(v) as (keyof Metaobjects)[];
//     return [...p, ...keys];
//   }, []);
//   const metaobjects = await getMetaobjects(allKeys);

//   fs.writeFileSync('./src/local-cache.json', JSON.stringify(metaobjects, null, 4));
// };

// getMetaobjectsFn();

// // export const getMetaobjectData = async (keys: (keyof Metaobjects)[]) => {
// //   // ## GETTING DATA FROM LOCAL CACHE ##
// //   const metaobjects = fs.readFileSync('./src/local-cache.json', 'utf-8') as unknown as Metaobjects;

// //   console.log(metaobjects);
// //   const getAssignment = (featureId: string) => {
// //     return ['home-page-section-2-tdrzu2nx', 'barbie-collection'];
// //   };

// //   const getFromCache = async <F extends keyof Metaobjects>(query: ['metaobjects', F, string]) => {
// //     console.log(`Getting from cache: ${query.join('/')}`);
// //     return metaobjects[query.join('/')];
// //   };
// //   // ## GETTING DATA FROM LOCAL CACHE ##

// //   // ## INITIAL STATE ON BENTO ENGINE ##
// //   const result = await getAssignmentsMetaobjects({
// //     area: ['home_page', 'shared'],
// //     getAssignment,
// //     getFromCache,
// //   });

// //   console.log(result.shared.announcements_bar?.display_name);
// // };

// // getMetaobjectsFn();

// // const getHomepageMetaobjects = () => {
// //   const meta = getMetaobject([['homepage_section_2', 'kurwa'], ['homepage_section_3', 'mac']]);

// // }

// const getMetaobject2 = (getFromCache: any, getAssignment: any, ...types: (keyof Metaobjects)[]) => {
//   return types.map((type) => {
//     const featureId = getAssignment(type);
//     if (featureId) {
//       return getFromCache(['metaobjects', type, featureId]);
//     } else {
//       return null;
//     }
//   });
// };
// getMetaobject2(
//   () => {},
//   () => {},
//   'home_page_section_2',
//   'announcements_bar',
//   'connected_product',
// );
