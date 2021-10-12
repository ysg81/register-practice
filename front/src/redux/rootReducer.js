import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import history from "../history"
import auth from "./modules/auth"

const rootReducer = combineReducers({
	auth,
	router: connectRouter(history),
})

export default rootReducer
