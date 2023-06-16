export interface ProductReference {
  __typename: 'Product';
  id: string;
}

export interface ProductVariantReference {
  __typename: 'ProductVariant';
  id: string;
}

export interface FileReference {
  __typename: 'File';
  id: string;
}

export interface CollectionReference {
  __typename: 'Collection';
  id: string;
  handle: string;
}

export interface MediaImageReference {
  __typename: 'MediaImage';
  id: string;
  image: {
    url: string;
  };
}

export interface VideoReference {
  __typename: 'Video';
  id: string;
  originalSource: {
    url: string;
  };
}

export interface MetaobjectReference {
  __typename: 'Metaobject';
  id: string;
}
