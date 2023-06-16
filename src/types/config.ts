type Field = 'id';
type NonEmptyArray<T> = [T, ...T[]];
export interface QueryFields<T> {
  fields?: NonEmptyArray<T>;
  cursorSize?: number;
}
type ProductField =
  | Field
  | 'handle'
  | `description(truncateAt: ${number})`
  | 'createdAt'
  | 'descriptionHtml'
  | 'isGiftCard'
  | 'onlineStoreUrl'
  | 'productType'
  | 'publishedAt'
  | 'requiresSellingPlan'
  | 'tags'
  | 'title'
  | 'totalInventory'
  | 'updatedAt'
  | 'vendor';
type ImageField = Field | 'altText' | 'height' | 'url' | 'width';
type VariantsField =
  | Field
  | 'availableForSale'
  | 'barcode'
  | 'requiresShipping'
  | 'sku'
  | 'title'
  | 'weight'
  | 'weightUnit'
  | `image${string}`;
type MetafieldsField =
  | Field
  | 'createdAt'
  | 'description'
  | 'key'
  | 'namespace'
  | 'reference'
  | 'type'
  | 'updatedAt'
  | 'value';
export type ProductConfig =
  | {
      fields?: NonEmptyArray<ProductField>;
      images?: undefined;
      variants?: undefined;
      metafields?: undefined;
    }
  | {
      fields?: undefined;
      images?: QueryFields<ImageField>;
      variants?: QueryFields<VariantsField>;
      metafields?: QueryFields<MetafieldsField>;
    };
type CollectionField = Field | 'descriptionHtml' | 'handle' | 'title' | 'updatedAt';
export type CollectionConfig =
  | {
      fields?: NonEmptyArray<CollectionField>;
      products?: undefined;
      metafields?: undefined;
    }
  | {
      fields?: undefined;
      products?: QueryFields<ProductField>;
      metafields?: QueryFields<MetafieldsField>;
    };
export type VariantConfig =
  | {
      fields?: NonEmptyArray<VariantsField>;
      metafields?: undefined;
    }
  | {
      fields?: undefined;
      metafields?: QueryFields<MetafieldsField>;
    };
type MetaobjectField = Field | 'handle' | 'type' | 'updatedAt';
export interface FetchConfiguration {
  collection?: CollectionConfig;
  metaobject?: {
    fields?: NonEmptyArray<MetaobjectField>;
  };
  product?: ProductConfig;
  variant?: VariantConfig;
}
