const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Request token
// @access  Public

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		res.json(user);
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server error');
	}
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public

router.post(
	'/',
	[
		check('username', 'Nombre de usuario requerido').not().isEmpty(),
		check('password', 'Contraseña requerida').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { username, password } = req.body;

		try {
			let user = await User.findOne({ username });

			if (!user) {
				return res
					.status(400)
					.json({
						errors: [{ msg: 'El usuario o contraseña son incorrectos' }],
					});
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({
						errors: [{ msg: 'El usuario o contraseña son incorrectos' }],
					});
			}

			// Setting up token

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;

					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('[ ! ] SERVER ERROR');
		}
	}
);

module.exports = router;
