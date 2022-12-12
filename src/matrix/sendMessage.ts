import { MatrixClient } from 'matrix-bot-sdk';
import { RSSItem } from '../rss.js';

const sendMessage = async (
	client: MatrixClient,
	item: RSSItem,
	roomId: string
) => {
	const image = await client.uploadContentFromUrl(item.media);

	const formattedDate = item.date
		.toLocaleString('no', {
			dateStyle: 'long',
			timeStyle: 'short',
			hour12: true,
		})
		.replace('p.m.', 'pm')
		.replace('a.m.', 'am');

	const formattedTags = item.tags
		.split(',')
		.map((tag) => `<code>${tag}</code>`)
		.join(', ');

	const message = {
		body: `${item.title}\n${
			item.content ? item.content + '\n' : ''
		}\n${formattedDate}\n${item.tags}\n${item.link}`,
		format: 'org.matrix.custom.html',
		formatted_body: `<h1>${item.title}</h1>
    ${item.content ? item.content + '</br>' : ''}
    <img src="${image}">
    <p>
      ${formattedDate}</br>
      ${formattedTags}</br>
      ${item.link}
    </p>
    `,
		msgtype: 'm.text',
	};

	await client.sendMessage(roomId, message);

	console.log(
		`Sent:\n${item.title}\n${item.content}\n\n${formattedDate}\n${item.tags}\n${item.link}`
	);
};

export default sendMessage;
