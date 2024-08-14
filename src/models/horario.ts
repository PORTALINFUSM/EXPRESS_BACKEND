import { Schema, model } from 'mongoose';
import { tHorario } from '@/lib/types';

const HorarioSchema = new Schema<tHorario>({
	tipo: { type: String, required: true },
	dia: { type: String, required: true },
	bloque: { type: String, required: true },
	sala: { type: String, required: true },
	from: { type: Schema.ObjectId, ref: 'ramo' },
});

export const HorarioModel = model<tHorario>('horario', HorarioSchema);
