const express = require("express")
const bodyParser = require("body-parser")
const indexRouter = require("./router/index-route")
const userRouter = require("./router/user-router")

const mongoose = require("mongoose")

const config = require("./config/key")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/", indexRouter)
app.use("/user", userRouter)

//에러 페이지 핸들링

//에러 페이지 핸들링

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
