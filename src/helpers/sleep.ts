const sleep = async (ms: number): Promise<void> => {
	return new Promise((resolve, _) => {
		setTimeout(() => resolve(), ms);
	});
};

export default sleep;
