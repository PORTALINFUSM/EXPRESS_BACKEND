import { Schema, model } from 'mongoose';
import { tRamo } from '@/lib/types';

const RamoSchema = new Schema<tRamo>({
	name: { type: String, required: true },
	code: { type: String, required: true },
	semestre: { type: String, required: true },
	par: { type: Number, required: true },
});

export const RamoModel = model<tRamo>('ramo', RamoSchema);
