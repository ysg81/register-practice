const express = require("express")
const router = express.Router()
const User = require("../models/User")
const ExpressError = require("../models/ExpressError")

const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res, next) => {
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
})

router.post("/login", async (req, res, next) => {
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
	res.cookie("x_auth", token)
	res.json({ success: true, message: "로그인에 성공하였습니다." })
})

module.exports = router
