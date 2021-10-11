const express = require("express")
const app = express()

app.get("/", (req, res, next) => {
	res.send("homepage")
})

app.listen(5000, () => {
	console.log("Listening on port 5000...")
})

mongoose
	.connect(
		"mongodb+srv://Yuser:whyky247@cluster0.p9qvo.mongodb.net/register-practice?retryWrites=true&w=majority",
		{},
	)
	.then(() => {
		console.log("Database connected")
	})
	.catch((err) => {
		console.log(err)
	})
