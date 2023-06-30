import { ReferenceFragment } from '@shopify-metaobject-codegen/graphql';
import { MetaobjectField, MetaobjectFieldType } from '@shopify-metaobject-codegen/types';

type Values = {
  value?: string;
  reference?: ReferenceFragment;
  references?: ReferenceFragment[];
};

export const parser = <T extends keyof MetaobjectFieldType>(
  field: T,
  { reference, references, value }: Values,
): MetaobjectFieldType[T] | undefined => {
  switch (field) {
    case 'boolean':
      return Boolean(value);
    case 'color':
      return value ?? '';
    case 'multi_line_text_field':
      return value ?? '';
    default:
      return value ?? '';
  }
};
