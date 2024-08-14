import { Schema, model } from 'mongoose';
import { tEvent } from '@/lib/types';

const EventSchema = new Schema<tEvent>({
	icon: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: false },
});

export const EventModel = model<tEvent>('event', EventSchema);
