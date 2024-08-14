import { compare, hash } from 'bcryptjs';
import { AuthModel } from '@/models/auth';
import { UserDataModel } from '@/models/userdata';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from 'public.env';
import { tAuth, JWT } from './types';
import { v4 } from 'uuid';

export const log = (msg: string | Array<string>, indent: number) => {
	const spacing = '   '.repeat(indent);
	if (typeof msg === 'string') {
		console.log(spacing + msg);
		return;
	}
	console.log(spacing + msg.join(' '));
};

export const isEmail = (str: String): boolean => {
	return !!str
		.toLowerCase()
		.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};

export const bloqueToNumber = (bloque: string) => {
	switch (bloque) {
		case '1-2': {
			return 1;
		}
		case '3-4': {
			return 2;
		}
		case '5-6': {
			return 3;
		}
		case '7-8': {
			return 4;
		}
		case '9-10': {
			return 5;
		}
		case '11-12': {
			return 6;
		}
		case '13-14': {
			return 7;
		}
		case '15-16': {
			return 8;
		}
	}
	return 0;
};

export const dayToNumber = (day: string) => {
	switch (day) {
		case 'l': {
			return 1;
		}
		case 'm': {
			return 2;
		}
		case 'x': {
			return 3;
		}
		case 'j': {
			return 4;
		}
		case 'v': {
			return 5;
		}
		case 's': {
			return 6;
		}
		case 'd': {
			return 7;
		}
	}
	return 0;
};

export const generateToken = (
	name: string,
	email: string,
	new_user: boolean
): string => {
	const date = new Date(Date.now());
	const iat = date.getTime();
	// 2 hours valid
	date.setHours(date.getHours() + 2);
	const exp = date.getTime();

	const payload: JWT = {
		iss: 'portals-inf-usm',
		sub: name,
		jti: v4(),
		iat: iat,
		exp: exp,
		context: {
			user: {
				name: name,
				email: email,
			},
			role: new_user ? 'new user' : 'user',
		},
	};
	return sign(payload, SECRET_KEY);
};

export const createNewUser = async ({
	email,
	passw,
}: {
	email: string;
	passw: string;
}): Promise<string | false> => {
	const hashPassword = await hash(passw, 12);
	const name = email.substring(0, email.indexOf('@'));
	const authDoc = await AuthModel.create({
		name: name,
		email: email,
		password: hashPassword,
	});
	const userDoc = await UserDataModel.create({
		email: email,
		ramos: [],
		alertas: [],
	});

	try {
		await authDoc.save();
		await userDoc.save();
	} catch {
		return false;
	}

	const token = generateToken(authDoc.name, authDoc.email, true);
	return token;
};

export const compareCredentials = async (
	{ email, passw }: { email: string; passw: string },
	model: tAuth
): Promise<boolean> => {
	return await compare(passw, model.password);
};
