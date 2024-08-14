import { Router } from 'express';
import { AuthModel } from '@/models/auth';
import {
	compareCredentials,
	createNewUser,
	generateToken,
	isEmail,
} from '@/lib/funcs';

const router = Router();

interface AuthData {
	email: string;
	passw: string;
}

// LOGIN
router.post('/login', async (req, res) => {
	const data: AuthData = req.body;

	if (!data.passw || !isEmail(data.email)) {
		res.json({ status: false, msg: 'not valid fields' });
		return;
	}

	const authDoc = await AuthModel.findOne({ email: data.email });
	if (!authDoc) {
		res.json({ status: false, msg: 'email not registered' });
		return;
	}

	const result = await compareCredentials(data, authDoc);
	if (!result) {
		res.json({ status: false, msg: "credentials doesn't match" });
		return;
	}

	const token = generateToken(authDoc.name, authDoc.email, false);

	res.json({
		status: true,
		msg: 'login succesfull',
		redirect: '/home',
		token: token,
	});
});

// REGISTER
router.post('/register', async (req, res) => {
	const data: AuthData = req.body;

	if (!data.passw || !isEmail(data.email)) {
		res.json({ status: false, msg: 'not valid fields' });
		return;
	}

	const emailExists = await AuthModel.countDocuments({ email: data.email });
	if (emailExists) {
		res.json({ status: false, msg: 'email already registered' });
		return;
	}

	const result = await createNewUser(data);
	if (!result) {
		res.json({ status: false, msg: 'error creating account' });
		return;
	}

	res.json({
		status: true,
		msg: 'registration succesfull',
		redirect: '/home',
		token: result,
	});
});

export default router;
