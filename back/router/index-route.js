const express = require("express")
const router = express.Router()
// const ExpressError = require("../models/ExpressError")

router.get("/", (req, res, next) => {
	res.send("홈페이지 입니다.")
})

module.exports = router
