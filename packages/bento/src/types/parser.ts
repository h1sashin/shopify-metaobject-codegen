import { MetaobjectField } from '@shopify-metaobject-codegen/types';
import { MetaobjectField as ShopifyMetaobjectField } from '@shopify-metaobject-codegen/graphql';

export type Parsers = Record<MetaobjectField, (field: ShopifyMetaobjectField) => any>;
