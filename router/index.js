const express = require("express")
const router = express.Router()
const User = require("../models/User")
const ExpressError = require("../models/ExpressError")

router.get("/", (req, res, next) => {
	res.send("홈페이지 입니다.")
})
router.post("/", async (req, res, next) => {
	try {
		const user = new User(req.body)
		await user.save()
		res.json({ success: true })
	} catch (error) {
		return next(new ExpressError("유저를 생성하지 못했습니다", 500))
	}
})

module.exports = router
