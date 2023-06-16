import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../types/shopify';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const withBackoff = (reqInfo: RequestInfo | URL, reqInit: RequestInit | undefined) => {
  const retry = async (delay: number) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetch(reqInfo, reqInit);
  };
  const retryWithBackoff = async (delay: number, retriesLeft: number): Promise<Response> => {
    try {
      return await retry(delay);
    } catch (error) {
      console.log('error in retryWithBackoff');
      if (retriesLeft) return retryWithBackoff(delay * 2, retriesLeft);
      throw error;
    }
  };
  return retryWithBackoff(1000, 3);
};

const generateSdk = () => {
  const client = new GraphQLClient(
    `https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
    {
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN || '',
      },
      // fetch: withBackoff,
    },
  );

  return getSdk(client);
};

const sdk = generateSdk();

export default sdk;
