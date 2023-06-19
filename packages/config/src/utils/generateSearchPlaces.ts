export const generateSearchPlaces = (moduleName: string) => {
  const extensions = ['json', 'yaml', 'yml', 'js', 'ts'];
  const regular = extensions.map((ext) => `${moduleName}.${ext}`);
  const dot = extensions.map((ext) => `.${moduleName}rc.${ext}`);
  const config = extensions.map((ext) => `${moduleName}.config.${ext}`);

  return [...regular.concat(dot.concat(config)), 'package.json'];
};
