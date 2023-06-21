// import { Parsers } from '../types/parser';

// type GetParsersConfig = {
//   productsKey: string;
//   collectionsKey: string;
// };

// type GetParsers = (config?: GetParsersConfig) => Parsers;

// export const parsers: GetParsers = ({ collectionsKey = 'collections', productsKey = 'products' }) => ({
//   single_line_text_field: ({ value }) => value,
//   multi_line_text_field: ({ value }) => value,
//   number_integer: ({ value }) => parseInt(value!),
//   number_decimal: ({ value }) => parseFloat(value!),
//   product_reference: ({ reference }) => reference,
//   file_reference: ({reference}) => ({})
//   boolean: ({ value }) => value,
// });
