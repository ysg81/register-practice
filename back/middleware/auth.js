const User = require("../models/User")
const jwt = require("jsonwebtoken")
const ExpressError = require("../models/ExpressError")

module.exports = auth = async (res, req, next) => {
	let token = req.cookies.x_auth
	const { email, password } = jwt.verify(token, "mySecretToken")

	let user
	try {
		user = await User.findOne({ email, password, token: token })
		if (!user) {
			return next(new ExpressError("해당하는 유저가 존재하지 않습니다.", 500))
		}
	} catch (error) {
		return next(new ExpressError("유저 정보를 찾는데 실패하였습니다.", 500))
	}

	req.token = token
	req.user = user
	next()
}
