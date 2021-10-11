import React, { useEffect } from "react"
import axios from "axios"

const Homepage = () => {
	useEffect(() => {
		const res = axios.get("/api/test")
		console.log(res)
	}, [])
	return <div></div>
}

export default Homepage
