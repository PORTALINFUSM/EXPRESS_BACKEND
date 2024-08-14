import { Schema, model } from 'mongoose';
import { tUser } from '@/lib/types';

const UserDataSchema = new Schema<tUser>({
	email: { type: String, required: true },
	ramos: [
		{
			type: Schema.ObjectId,
			ref: 'ramo',
		},
	],
	alertas: [
		{
			icon: { type: String, required: true },
			title: { type: String, required: true },
			description: { type: String, required: false },
		},
	],
});

export const UserDataModel = model<tUser>('userdata', UserDataSchema);
