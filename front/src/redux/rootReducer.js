import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import history from "../history"
import test from "./modules/auth"

const rootReducer = combineReducers({
	test,
	router: connectRouter(history),
})

export default rootReducer
