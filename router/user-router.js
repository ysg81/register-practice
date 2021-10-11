const express = require("express")
const router = express.Router()
const User = require("../models/User")
const ExpressError = require("../models/ExpressError")

router.post("/register", async (req, res, next) => {
	const { name, email, password } = req.body
	try {
		// salt 생성
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)
		const user = new User({
			email,
			password: hashedPassword,
		})
		await user.save()
		res.json({ success: true })
	} catch (error) {
		return next(new ExpressError("유저를 생성하지 못했습니다", 500))
	}
})

router.post("/login", async (req, res, next) => {
	const { name, email, password } = req.body
	let user
	try {
		user = await User.findOne({ email })
	} catch (error) {
		console.log(error)
		return next(new ExpressError("유저 찾기 요청을 실패했습니다.", 500))
	}

	if (!user) {
		return next(new ExpressError("해당 유저를 찾을 수 없습니다.", 500))
	}

	try {
		const check = await bcrypt.compare(password, user.password)
		if (!check) {
			return next(new ExpressError("로그인 정보가 다릅니다.", 500))
		}
	} catch (error) {}
})

module.exports = router
