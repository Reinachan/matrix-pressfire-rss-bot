declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MATRIX_HOMESERVER_URL: string;
			MATRIX_USERNAME: string;
			MATRIX_PASSWORD: string;
			MATRIX_ACCESS_TOKEN: string;
			MATRIX_ROOM_ID: string;
		}
	}
}

export {};
