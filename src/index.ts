import * as dotenv from 'dotenv';
dotenv.config();

import { MatrixClient } from 'matrix-bot-sdk';

import { checkLastRead, saveLastRead } from './helpers/lastRead.js';
import sleep from './helpers/sleep.js';
import sendMessage from './matrix/sendMessage.js';
import fetchRss from './rss.js';

const homeserverUrl = process.env.MATRIX_HOMESERVER_URL;
const accessToken = process.env.MATRIX_ACCESS_TOKEN;
const roomId = process.env.MATRIX_ROOM_ID;

const client = new MatrixClient(homeserverUrl, accessToken);

const main = async () => {
	const articles = await fetchRss();

	const newArticles = articles
		.filter((item) => checkLastRead().getTime() < item.date.getTime())
		.reverse();

	let i = 0;

	while (i < newArticles.length) {
		sendMessage(client, newArticles[i], roomId);

		await sleep(2_000);
		i++;
	}

	if (newArticles.length > 0) {
		const newestArticle = newArticles.reduce((p, c) =>
			p.date.getTime() > c.date.getTime() ? p : c
		);

		saveLastRead(newestArticle.date);
	}
};

await main();
setInterval(async () => {
	await main();
}, 60_000);
