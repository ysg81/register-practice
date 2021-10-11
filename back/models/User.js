const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		maxlength: 50,
	},
	email: {
		type: String,
		unique: 1,
	},
	password: {
		type: String,
	},
	role: {
		type: Number,
		default: 0,
	},
	image: String,
	token: {
		type: String,
	},
	tokenExp: {
		type: Number,
	},
})

module.exports = mongoose.model("User", userSchema)
