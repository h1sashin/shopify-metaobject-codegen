export type Dimension = { value: number; unit: string };
export type Money = { amount: number; currency: string };
export type Rating = { value: number; scale_min: number; scale_max: number };
export type ValueWithUnit = { value: number; unit: string };
export type Product = { id: string; handle: string; };
export type Collection = { id: string; handle: string; };
export type Variant = { id: string; };
export type Media = { id: string; url: string; };
export type Page = { id: string; };
export type MetaObject = { id: string; };
export type HomepageHero = {
	title: string;
	button_text: string;
	button_link: string;
	image: Media | undefined;
};

export type Test = {
	single_line_text: string | undefined;
	list_of_single_line_text: string[] | undefined;
	multi_line_text: string | undefined;
	integer: number | undefined;
	list_of_integer: number | undefined;
	decimal: number | undefined;
	list_of_decimal: number | undefined;
	product: Product | undefined;
	list_of_product: Product[] | undefined;
	file: Media | undefined;
	list_of_file: Media[] | undefined;
	date_and_time: Date | undefined;
	list_of_date_and_time: Date[] | undefined;
	date: Date | undefined;
	list_of_date: Date[] | undefined;
	dimension: Dimension | undefined;
	list_of_dimension: Dimension[] | undefined;
	volume: ValueWithUnit | undefined;
	list_of_volume: ValueWithUnit[] | undefined;
	weight: ValueWithUnit | undefined;
	list_of_weight: ValueWithUnit[] | undefined;
	rich_text: string | undefined;
	collection: Collection | undefined;
	list_of_collection: Collection | undefined;
	product_variant: Variant | undefined;
	list_of_product_variant: Variant[] | undefined;
	metaobject: HomepageHero | undefined;
	page: Page | undefined;
	list_of_page: Page | undefined;
	true_or_false: boolean | undefined;
	color: string | undefined;
	list_of_color: string[] | undefined;
	rating: Rating | undefined;
	list_of_rating: Rating[] | undefined;
	url: string | undefined;
	list_of_url: string[] | undefined;
	money: Money | undefined;
	json: Record<string, unknown> | undefined;
	mixed_reference: HomepageHero | undefined;
	list_of_metaobject: HomepageHero[] | undefined;
};

export type Lists = {
	mixed_list: (HomepageHero | Test)[] | undefined;
	metaobject_list: HomepageHero[] | undefined;
};

export interface Metaobjects {
	homepage_hero: HomepageHero | null;
	test: Test | null;
	lists: Lists | null;
}