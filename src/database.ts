import { connect } from 'mongoose';
import { log } from '@/lib/funcs';
import { URI } from 'public.env';

const easy_connect = async () => {
	await connect(URI);
	log(['DB:'.bgGreen, 'CONNECTED'.green], 0);
};

export const connectDB = async () => {
	try {
		await easy_connect();
	} catch {
		console.log('DB: ERROR CONNECTING TO DATABASE'.bgRed);
		process.exit(1);
	}
};
