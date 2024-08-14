import { type ObjectId } from 'mongoose';

export interface JWT {
	iss: string;
	sub: string;
	jti: string;
	iat: number;
	exp: number;
	context: {
		user: {
			name: string;
			email: string;
		};
		role: string;
	};
}

export type tEvent = {
	_id: ObjectId;
	icon: string;
	title: string;
	description: string | null;
};

export type tHorario = {
	_id: ObjectId;
	dia: 'l' | 'm' | 'x' | 'j' | 'v' | 's' | 'd';
	tipo: 'catedra' | 'ayudantia' | 'laboratorio' | 'taller';
	bloque: string;
	sala: string;
	from: ObjectId;
};

export type tRamo = {
	_id: ObjectId;
	name: string;
	code: string;
	semestre: string;
	par: number;
};

export type tUser = {
	_id: ObjectId;
	email: string;
	ramos: tRamo[] | ObjectId[];
	alertas: tEvent[];
};

export type tAuth = {
	_id: ObjectId;
	name: string;
	email: string;
	password: string;
};
