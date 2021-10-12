import { ConnectedRouter } from "connected-react-router"
import React from "react"
import { Switch, Route } from "react-router-dom"
import history from "./history"
import Homepage from "./pages/Homepage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route path="/register" exact component={RegisterPage} />
				<Route path="/login" exact component={LoginPage} />
				<Route path="/" component={Homepage} />
			</Switch>
		</ConnectedRouter>
	)
}

export default App
