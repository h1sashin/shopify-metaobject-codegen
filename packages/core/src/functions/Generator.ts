import { MetaobjectField } from '@shopify-metaobject-codegen/types';
import { defaultTypes, fieldTypes } from '../data/constants';
import { GetDefinitionsQuery } from '@shopify-metaobject-codegen/graphql';
import { getConfig } from '@shopify-metaobject-codegen/config';

type FieldType = MetaobjectField | `list.${MetaobjectField}`;

type Response = GetDefinitionsQuery['metaobjectDefinitions']['nodes'];
type Field = Response[number]['fieldDefinitions'][number];

/**
 * Parse a metaobjects to TS types
 * @param response Metaobjects definitions response
 */
export class Generator {
  /** Parsed response */
  response: Response;
  constructor(response: Response) {
    this.response = response;
  }

  private parseName(name: string, mode: 'key' | 'value' = 'value'): string {
    const config = getConfig();
    const { typePrefix, typeSuffix } = config || {};
    const unified = name.replaceAll(/[^a-zA-Z0-9_\s]/g, '').replaceAll(/[\s|_]+/g, '_');
    if (mode === 'key') {
      return (
        (typePrefix || '') +
        unified
          .split('_')
          .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
          .join('') +
        (typeSuffix || '')
      );
    }
    return unified.toLowerCase();
  }

  private maybe(type: string, required: boolean): string {
    return required ? type : `Maybe<${type}>`;
  }

  private getMetafieldName(metafieldId: string | undefined) {
    return this.parseName(this.response.find(({ id }) => metafieldId === id)?.type || '', 'key');
  }

  private getType(fieldType: FieldType, validations?: Field['validations']): string {
    try {
      let [type, array] = ['null', ''];
      const isList = fieldType.startsWith('list.');
      const singleType = fieldType.replace('list.', '') as MetaobjectField;
      array = isList ? '[]' : '';
      if (['metaobject_reference', 'mixed_reference'].includes(singleType)) {
        if (!validations) return 'null';
        const value = validations[0].value;
        const values = value?.replace(/[\[\]\"]/g, '').split(',');
        if (singleType === 'metaobject_reference' && values?.length === 1) type = this.getMetafieldName(values[0]);
        else if (singleType === 'mixed_reference' && Array.isArray(values)) {
          const types = [...new Set(values.map((referenceId) => this.getMetafieldName(referenceId)).filter(Boolean))];
          if (types.length <= 1) type = types[0];
          else type = `(${types.join(' | ')})`;
        } else type = this.getMetafieldName(validations?.[0]?.value);
      } else type = fieldTypes[singleType];
      return type + array;
    } catch {
      return 'any';
    }
  }

  private parseMetaobjectField(field: Field): string {
    const name = this.parseName(field.name);
    const type = this.getType(field.type.name as FieldType, field.validations);
    const fieldType = this.maybe(type, field.required);
    return `\t${name}: ${fieldType};`;
  }

  private parseMetaobject(metaobject: Response[number]): string {
    const name = this.parseName(metaobject.type, 'key');
    const fields = metaobject.fieldDefinitions.map((field) => this.parseMetaobjectField(field));
    return [`export type ${name} = {`, ...fields, '};'].join('\n');
  }

  private getMetaobjectsList(): string {
    return `export type Metaobjects = {\n${this.response
      .map(({ type }) => `\t${this.parseName(type)}: ${this.parseName(type, 'key')};`)
      .join('\n')}\n}`;
  }

  /** Parse response into types */
  public parse(): string {
    const config = getConfig();
    const defaults = Object.values(defaultTypes);
    const maybe = `type Maybe<T> = ${config?.maybeValue || 'T | null'};`;
    const metaobjects = this.response.map((metaobject) => this.parseMetaobject(metaobject)).join('\n\n');
    const allMetaobjects = `\n${this.getMetaobjectsList()}`;
    return [...defaults, maybe, metaobjects, allMetaobjects].join('\n');
  }
}
