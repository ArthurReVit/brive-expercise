const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Worker = require('../../models/Worker');

// @route   POST api/workers
// @desc    create new employee
// @access  Private

router.post(
	'/',
	[
		check('company', 'Ingrese la empresa del empleado.').not().isEmpty(),
		check('employee', 'Ingrese el nombre del empleado.').not().isEmpty(),
		check('position', 'Ingrese el puesto del empleado.').not().isEmpty(),
		check('company', 'Ingrese el salario del empleado.').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { company, employee, position, salary } = req.body;

		try {
			const newWorker = new Worker({
				company,
				employee,
				position,
				salary,
			});

			const worker = await newWorker.save();

			res.json(worker);
		} catch (err) {
			console.error(err.message);

			res.status(500).send('Server error');
		}
	}
);

// @route   GET api/workers
// @desc    Get all workers
// @access  Private

router.get('/', async (req, res) => {
	try {
		let workers = await Worker.find();

		res.json(workers);
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server error');
	}
});

// @route   UPDATE api/workers/:id
// @desc    Update worker
// @access  Private

router.put(
	'/:id',
	[
		check('employee', 'Ingrese el nombre del empleado.').not().isEmpty(),
		check('position', 'Ingrese el puesto del empleado.').not().isEmpty(),
		check('salary', 'Ingrese el salario del empleado.').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { employee, position, salary } = req.body;

		try {
			const updatedWorker = {
				employee,
				position,
				salary,
			};

			let worker = await Worker.findByIdAndUpdate(
				req.params.id,
				updatedWorker,
				{ new: true }
			);

			res.json({ worker });
		} catch (err) {
			console.error(err.message);

			res.status(500).send('Server error');
		}
	}
);

router.delete('/:id', async (req, res) => {
	try {
		await Worker.findByIdAndDelete(req.params.id);

		res.json({ msg: 'Empleado eliminado' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server error');
	}
});

module.exports = router;
