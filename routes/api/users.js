const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public

router.post(
	'/',
	[
		check('username', 'Nombre de usuario requerido').not().isEmpty(),
		check('password', 'Contraseña requerida').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { username, password } = req.body;

		try {
			let user = await User.findOne({ username });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'El usuario ya se encuentra registrado' }] });
			}

			user = new User({
				username,
				password,
			});

			// Encrypting password

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

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
