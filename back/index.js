const express = require("express")
const bodyParser = require("body-parser")
const userRouter = require("./router/user-router")

const mongoose = require("mongoose")
const config = require("./config/key")
const cookieParser = require("cookie-parser")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api/user", userRouter)

// 존재하지 않는 페이지에 대한 에러
app.use((req, res, next) => {
	return next(new ExpressError("페이지를 찾을 수 없습니다", 404))
})

app.listen(5000, () => {
	console.log("Listening on port 5000...")
})

mongoose
	.connect(config.mongoURI, {})
	.then(() => {
		console.log("Database connected")
	})
	.catch((err) => {
		console.log(err)
	})
