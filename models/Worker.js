const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
	company: {
		type: String,
		required: true,
	},
	employee: {
		type: String,
		required: true,
	},
	position: {
		type: String,
		required: true,
	},
	salary: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
	},
});

module.exports = Worker = mongoose.model('worker', WorkerSchema);
