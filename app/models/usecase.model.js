const mongoose = require('mongoose');

const UsecaseSchema = mongoose.Schema({
    name: String,
    sponsor: String,
	value: String,
	description: String,
	users: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Usecase', UsecaseSchema);