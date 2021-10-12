import { applyMiddleware, createStore } from "redux"
import rootReducer from "./rootReducer"
import logger from "redux-logger"
import thunk from "redux-thunk"
import history from "./../history"
import { routerMiddleware } from "connected-react-router"

const middleware = [
	logger,
	thunk.withExtraArgument({ history }),
	routerMiddleware(history),
]
const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store
