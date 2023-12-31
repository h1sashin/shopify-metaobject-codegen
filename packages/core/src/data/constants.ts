import { MetaobjectField } from '@shopify-metaobject-codegen/types';

export const fieldTypes: Record<MetaobjectField, string> = {
  boolean: 'boolean',
  color: 'string',
  date: 'Date',
  date_time: 'Date',
  dimension: 'Dimension',
  json: 'Record<string, unknown>',
  money: 'Money',
  multi_line_text_field: 'string',
  number_decimal: 'number',
  number_integer: 'number',
  rating: 'Rating',
  rich_text_field: 'string',
  single_line_text_field: 'string',
  url: 'string',
  volume: 'ValueWithUnit',
  weight: 'ValueWithUnit',
  collection_reference: 'Collection',
  file_reference: 'Media',
  metaobject_reference: 'Metaobject',
  mixed_reference: 'Metaobject | Collection | Media | Page | Product | Variant',
  page_reference: 'Page',
  product_reference: 'Product',
  variant_reference: 'Variant',
};

export const references = {
  Product: `export type Product = { id: string; handle: string; };`,
  Collection: `export type Collection = { id: string; handle: string; };`,
  Variant: `export type Variant = { id: string; };`,
  File: `export type Media = { type: MediaType, src: string, alt?: string };`,
  Page: `export type Page = { id: string; };`,
  Metaobject: `export type Metaobject = { id: string; };`,
};

export const defaultTypes = {
  MediaType: `export type MediaType = 'GenericFile' | 'MediaImage' | 'Video'`,
  Dimension: `export type Dimension = { value: number; unit: string };`,
  Money: `export type Money = { amount: number; currency: string };`,
  Rating: `export type Rating = { value: number; scale_min: number; scale_max: number };`,
  ValueWithUnit: `export type ValueWithUnit = { value: number; unit: string };`,
  ...references,
};
