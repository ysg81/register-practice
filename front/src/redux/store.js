import { applyMiddleware, createStore } from "redux"
import rootReducer from "./rootRedux"
import logger from "redux-logger"
import ReduxThunk from "redux-thunk"

const middleware = [logger, ReduxThunk]
const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store
