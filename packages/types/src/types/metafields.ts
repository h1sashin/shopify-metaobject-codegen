export type MetaobjectField =
  | 'boolean'
  | 'color'
  | 'date'
  | 'date_time'
  | 'dimension'
  | 'json'
  | 'money'
  | 'multi_line_text_field'
  | 'number_decimal'
  | 'number_integer'
  | 'rating'
  | 'rich_text_field'
  | 'single_line_text_field'
  | 'url'
  | 'volume'
  | 'weight'
  | 'collection_reference'
  | 'file_reference'
  | 'metaobject_reference'
  | 'mixed_reference'
  | 'page_reference'
  | 'product_reference'
  | 'variant_reference';

export type ValueWithUnit = {
  value: number;
  unit: string;
};

export type FileTypes = 'GenericFile' | 'MediaImage' | 'Video';

export type Rating = {
  value: number;
  scale_min: number;
  scale_max: number;
};

export type Money = {
  amount: number;
  currency: string;
};

export type File = {
  type: FileTypes;
  url: string;
  alt?: string;
};

export type MetaobjectFieldType = {
  boolean: boolean;
  color: string;
  date: Date;
  date_time: Date;
  dimension: ValueWithUnit;
  json: Record<string, unknown>;
  money: Money;
  multi_line_text_field: string;
  number_decimal: number;
  number_integer: number;
  rating: Rating;
  rich_text_field: string;
  single_line_text_field: string;
  url: string;
  volume: ValueWithUnit;
  weight: ValueWithUnit;
  collection_reference: string;
  file_reference: File;
  metaobject_reference: string;
  mixed_reference: string;
  page_reference: string;
  product_reference: string;
  variant_reference: string;
};
