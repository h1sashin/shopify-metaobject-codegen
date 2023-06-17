import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../types';
import { getConfig } from '@shopify-metaobject-codegen/config';

const withBackoff = (reqInfo: RequestInfo | URL, reqInit: RequestInit | undefined) => {
  const retry = async (delay: number) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetch(reqInfo, reqInit);
  };
  const retryWithBackoff = async (delay: number, retriesLeft: number): Promise<Response> => {
    try {
      return await retry(delay);
    } catch (error) {
      if (retriesLeft) return retryWithBackoff(delay * 2, retriesLeft);
      throw error;
    }
  };
  return retryWithBackoff(1000, 3);
};

export const generateSdk = () => {
  const { ADMIN_API_KEY, API_VERSION, SHOP_NAME } = getConfig();
  const client = new GraphQLClient(`https://${SHOP_NAME}/admin/api/${API_VERSION}/graphql.json`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_API_KEY,
    },
    fetch: withBackoff,
  });
  const sdk = getSdk(client);
  return sdk;
};
