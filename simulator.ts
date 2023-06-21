import { getAssignmentsMetaobjects, getMetaobjects } from './packages/bento/dist';
import { Metaobjects } from './metaobject-definitions';
import * as fs from 'fs';

type WantedMetaobjects = 'home_page_section_2' | 'home_page_section_3';

const metaobjectTypes: Record<WantedMetaobjects, boolean> = {
  home_page_section_2: true,
  home_page_section_3: true,
};

const getValidTypes = (): WantedMetaobjects[] => {
  return Object.entries(metaobjectTypes)
    .filter(([, value]) => value)
    .map(([key]) => key as WantedMetaobjects);
};

const getFromCache = async (path: [string, string, string] | [string, string] | [string]) => {
  const metaobjects = await fs.promises.readFile('./metaobjects.json', 'utf8');
  return JSON.parse(metaobjects)[path.join('/')];
};

const getAssignment = (featureId: string) => {
  return 'save-up-to-70-on-electronics';
};

const simulator = async () => {
  const types = getValidTypes();
  const fetchedMetaobjects = await getMetaobjects(types);

  fs.writeFileSync('./metaobjects.json', JSON.stringify(fetchedMetaobjects, null, 2));

  const metaobjects = await getAssignmentsMetaobjects<Metaobjects, WantedMetaobjects>({
    getAssignment,
    getFromCache,
    types,
  });

  console.dir(metaobjects.home_page_section_3, { depth: null });
};

simulator();
