import { sdk } from '@shopify-metaobject-codegen/graphql';

export const getDefinitions = async () => {
  const {
    metaobjectDefinitions: { nodes },
  } = await sdk.GetDefinitions();
  return nodes;
};
