const User = require("../models/User")
const ExpressError = require("../models/ExpressError")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports.register = async (req, res, next) => {
	const { name, email, password } = req.body
	try {
		// salt 생성
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)
		const user = new User({
			name,
			email,
			password: hashedPassword,
		})
		console.log(user)
		await user.save()
		res.json({ success: true, message: "회원가입에 성공하였습니다." })
	} catch (error) {
		return next(new ExpressError("유저를 생성하지 못했습니다", 500))
	}
}

module.exports.login = async (req, res, next) => {
	const { name, email, password } = req.body

	// 유저 정보 찾기
	let user
	try {
		user = await User.findOne({ email })
	} catch (error) {
		console.log(error)
		return next(new ExpressError("유저 찾기 요청을 실패하였습니다.", 500))
	}

	if (!user) {
		return next(new ExpressError("해당 유저를 찾을 수 없습니다.", 500))
	}

	// 로그인 정보 비교
	try {
		const check = await bcrypt.compare(password, user.password)
		if (!check) {
			return next(new ExpressError("로그인 정보가 다릅니다.", 500))
		}
	} catch (error) {
		return next(
			new ExpressError("로그인 정보 비교 요청을 실패하였습니다.", 500),
		)
	}

	// token 생성
	let token
	token = jwt.sign({ email, password }, "mySecretToken", { expiresIn: "1h" })
	try {
		await User.findOneAndUpdate({ email: email }, { $set: { token: token } })
	} catch (error) {
		return next(new ExpressError("토근 생성 및 저장을 실패하였습니다.", 400))
	}
	res
		.cookie("x_auth", token)
		.json({ success: true, message: "로그인에 성공하였습니다.", token })
}

module.exports.logout = async (req, res, next) => {
	const token = req.cookies.x_auth
	let user
	try {
		user = await User.findOne({ token })
	} catch (error) {
		return next(new ExpressError("유저 정보 찾기를 실패하였습니다.", 500))
	}

	const { email, password } = jwt.verify(token, "mySecretToken")
	try {
		await User.findOneAndUpdate(
			{ email: user.email, password: user.password },
			{ $set: { token: "" } },
		)
	} catch (error) {
		return next(
			new ExpressError("유저 토큰 정보 업데이트를 실패하였습니다.", 500),
		)
	}

	res.json({ success: true, message: "로그아웃에 성공하였습니다." })
}
