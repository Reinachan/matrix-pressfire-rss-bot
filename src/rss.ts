import Parser from 'rss-parser';

type CustomFeed = {};
type CustomItem = {
	tags?: string;
	description?: string;
	'media:content'?: { $?: { url?: string } };
};

const parser: Parser<CustomFeed, CustomItem> = new Parser({
	customFields: {
		item: ['tags', 'description', 'media:content'],
	},
});

export interface RSSItem {
	title: string;
	content?: string;
	media?: string;
	pubDate: string;
	isoDate: string;
	date: Date;
	tags?: string;
	link?: string;
}

const fetchRss = async () => {
	const feed = await parser.parseURL('https://www.pressfire.no/rss.xml');

	let items: RSSItem[] = [];

	for (const item of feed.items) {
		items.push({
			title: item.title,
			content: item.content,
			media: item['media:content']?.['$']?.url,
			pubDate: item.pubDate,
			isoDate: item.isoDate,
			date: new Date(item.isoDate),
			tags: item.tags,
			link: item.link,
		} as RSSItem);
	}

	return items;
};

export default fetchRss;
