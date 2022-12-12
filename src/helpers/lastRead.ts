import fs from 'fs';

export const checkLastRead = () => {
	const read = fs.readFileSync('store/last-read.txt', 'utf8');

	return new Date(read);
};

export const saveLastRead = (time: Date) => {
	fs.writeFileSync('store/last-read.txt', time.toISOString());
};
