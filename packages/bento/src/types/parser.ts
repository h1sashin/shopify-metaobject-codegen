import { MetaobjectField, MetaobjectFieldType } from '@shopify-metaobject-codegen/types';
import { ReferenceFragment, MetaobjectField as ShopifyMetaobjectField } from '@shopify-metaobject-codegen/graphql';

// type UnionShopifyMetaobjectField = Omit<ShopifyMetaobjectField, 'type'> & { type: MetaobjectField };

// type ParserReturnType<
//   T extends UnionShopifyMetaobjectField,
//   F extends T['type'],
// > = MetaobjectFieldType[F extends keyof MetaobjectFieldType ? F : never];

// // export type Parser = <T extends UnionShopifyMetaobjectField>(field: T) => ParserReturnType<T, T['type']>;

// export type Parsers = Record<MetaobjectField, Parser>;

export type ParserValues = {
  value?: string;
  reference?: ReferenceFragment;
  references?: ReferenceFragment[];
};
