import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/register" exact component={RegisterPage} />
				<Route path="/login" exact component={LoginPage} />
				<Route path="/" exact component={Homepage} />
			</Switch>
		</BrowserRouter>
	)
}

export default App
