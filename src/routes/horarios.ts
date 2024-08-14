import { bloqueToNumber } from '@/lib/funcs';
import { tRamo } from '@/lib/types';
import { HorarioModel } from '@/models/horario';
import { RamoModel } from '@/models/ramo';
import { UserDataModel } from '@/models/userdata';
import { Router } from 'express';

const router = Router();

interface Horario_Ramo_data {
	name: string;
	code: string;
	par: number;
	tipo: string;
	dia: string;
	bloque: string;
	sala: string;
}

interface ResData {
	l: Horario_Ramo_data[];
	m: Horario_Ramo_data[];
	x: Horario_Ramo_data[];
	j: Horario_Ramo_data[];
	v: Horario_Ramo_data[];
	s: Horario_Ramo_data[];
	d: Horario_Ramo_data[];
}

router.get('/', async (req, res) => {
	RamoModel;
	//@ts-ignore
	const email: string = req.query['user'];
	if (!email) {
		res.json({
			status: false,
		});
		return;
	}

	const dataDoc = await UserDataModel.findOne({ email: email });
	if (!dataDoc) {
		res.json({ status: false });
		return;
	}

	if (!dataDoc.ramos.length) {
		res.json({ status: true, data: [] });
		return;
	}

	const res_data: ResData = { l: [], m: [], x: [], j: [], v: [], s: [], d: [] };
	const horarios = await HorarioModel.find({
		from: { $in: dataDoc.ramos },
	}).populate('from');

	horarios.sort((a, b) => {
		const a_bloque = bloqueToNumber(a.bloque);
		const b_bloque = bloqueToNumber(b.bloque);
		return a_bloque - b_bloque;
	});

	horarios.forEach((el) => {
		//@ts-ignore
		const ramo: tRamo = el.from;
		const horario: Horario_Ramo_data = {
			name: ramo.name,
			code: ramo.code,
			par: ramo.par,
			tipo: el.tipo,
			dia: el.dia,
			bloque: el.bloque,
			sala: el.sala,
		};
		res_data[el.dia].push(horario);
	});

	res.json({ status: true, data: res_data });
});

export default router;
