// export type Dimension = { value: number; unit: string };
// export type Money = { amount: number; currency: string };
// export type Rating = { value: number; scale_min: number; scale_max: number };
// export type ValueWithUnit = { value: number; unit: string };
// export type Product = { id: string; handle: string; };
// export type Collection = { id: string; handle: string; };
// export type Variant = { id: string; };
// export type Media = { id: string; url: string; };
// export type Page = { id: string; };
// export type MetaObject = { id: string; };
// export type HomepageHero = {
// 	title: string;
// 	button_text: string;
// 	button_link: string;
// 	image?: Media;
// };

// export type Test = {
// 	single_line_text?: string;
// 	list_of_single_line_text?: string[];
// 	multi_line_text?: string;
// 	integer?: number;
// 	list_of_integer?: number;
// 	decimal?: number;
// 	list_of_decimal?: number;
// 	product?: Product;
// 	list_of_product?: Product[];
// 	file?: Media;
// 	list_of_file?: Media[];
// 	date_and_time?: Date;
// 	list_of_date_and_time?: Date[];
// 	date?: Date;
// 	list_of_date?: Date[];
// 	dimension?: Dimension;
// 	list_of_dimension?: Dimension[];
// 	volume?: ValueWithUnit;
// 	list_of_volume?: ValueWithUnit[];
// 	weight?: ValueWithUnit;
// 	list_of_weight?: ValueWithUnit[];
// 	rich_text?: string;
// 	collection?: Collection;
// 	list_of_collection?: Collection;
// 	product_variant?: Variant;
// 	list_of_product_variant?: Variant[];
// 	metaobject?: HomepageHero;
// 	page?: Page;
// 	list_of_page?: Page;
// 	true_or_false?: boolean;
// 	color?: string;
// 	list_of_color?: string[];
// 	rating?: Rating;
// 	list_of_rating?: Rating[];
// 	url?: string;
// 	list_of_url?: string[];
// 	money?: Money;
// 	json?: Record<string, unknown>;
// 	mixed_reference?: HomepageHero;
// 	list_of_metaobject?: HomepageHero[];
// };

// export type Lists = {
// 	mixed_list?: (HomepageHero | Test)[];
// 	metaobject_list?: HomepageHero[];
// };

// export interface Metaobjects {
// 	homepage_hero: HomepageHero;
// 	test: Test;
// 	lists: Lists;
// }
