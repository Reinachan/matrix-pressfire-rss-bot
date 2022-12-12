import { MatrixAuth } from 'matrix-bot-sdk';

const signin = async () => {
	const homeserverUrl = process.env.MATRIX_HOMESERVER_URL;
	const username = process.env.MATRIX_USERNAME;
	const password = process.env.MATRIX_PASSWORD;

	const auth = new MatrixAuth(homeserverUrl);
	const client = await auth.passwordLogin(username, password);

	process.env.MATRIX_ACCESS_TOKEN = client.accessToken;

	return client.accessToken;
};
