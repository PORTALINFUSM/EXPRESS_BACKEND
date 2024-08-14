import { Schema, model } from 'mongoose';
import { tAuth } from '@/lib/types';

const AuthSchema = new Schema<tAuth>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

export const AuthModel = model<tAuth>('auth', AuthSchema);
